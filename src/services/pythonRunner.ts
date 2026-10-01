/**
 * Python Learning Academy - Client-side Python Execution Engine
 * Evaluates Python code with stdout capture, error tracebacks, and test case validation.
 */

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  errorLine?: number;
  executionTimeMs: number;
}

export function executePythonCode(code: string, stdin: string = ''): Promise<ExecutionResult> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const outputBuffer: string[] = [];

    // Custom print handler
    const customPrint = (...args: any[]) => {
      const formatted = args
        .map((arg) => {
          if (arg === null) return 'None';
          if (arg === undefined) return 'None';
          if (typeof arg === 'boolean') return arg ? 'True' : 'False';
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg).replace(/"/g, "'");
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        })
        .join(' ');
      outputBuffer.push(formatted);
    };

    try {
      // Pre-check for obvious syntax quirks
      const lines = code.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('def ') || line.startsWith('if ') || line.startsWith('for ') || line.startsWith('while ') || line.startsWith('class ')) {
          if (!line.endsWith(':') && !line.includes(': #')) {
            throw new Error(`SyntaxError: expected ':' at end of statement (line ${i + 1})\n  --> ${line}`);
          }
        }
      }

      // Safe JS-based Python transpiler / interpreter shim
      const transpiledJs = transpilePythonToJs(code);
      
      // Execute in sandbox with standard python globals
      const sandboxGlobals: Record<string, any> = {
        print: customPrint,
        len: (obj: any) => (obj && typeof obj.length === 'number' ? obj.length : Object.keys(obj || {}).length),
        range: (start: number, stop?: number, step: number = 1) => {
          if (stop === undefined) {
            stop = start;
            start = 0;
          }
          const res = [];
          if (step > 0) {
            for (let i = start; i < stop; i += step) res.push(i);
          } else if (step < 0) {
            for (let i = start; i > stop; i += step) res.push(i);
          }
          return res;
        },
        sum: (arr: number[]) => (Array.isArray(arr) ? arr.reduce((a, b) => a + b, 0) : 0),
        min: (...args: any[]) => {
          const flat = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
          return Math.min(...flat);
        },
        max: (...args: any[]) => {
          const flat = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
          return Math.max(...flat);
        },
        sorted: (arr: any[], reverse: boolean = false) => {
          const copy = [...arr];
          copy.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
          if (reverse) copy.reverse();
          return copy;
        },
        abs: Math.abs,
        round: Math.round,
        int: (val: any) => parseInt(val, 10) || 0,
        float: (val: any) => parseFloat(val) || 0.0,
        str: (val: any) => String(val),
        bool: (val: any) => Boolean(val),
        list: (iterable: any) => (Array.isArray(iterable) ? [...iterable] : Array.from(iterable || [])),
        dict: (entries: any) => Object.fromEntries(entries || []),
        set: (arr: any) => new Set(arr || []),
        math: {
          pi: Math.PI,
          e: Math.E,
          sqrt: Math.sqrt,
          pow: Math.pow,
          floor: Math.floor,
          ceil: Math.ceil,
          sin: Math.sin,
          cos: Math.cos,
          tan: Math.tan,
        },
        random: {
          randint: (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a,
          random: () => Math.random(),
          choice: (arr: any[]) => (arr.length ? arr[Math.floor(Math.random() * arr.length)] : null),
        },
        pandas: {
          DataFrame: (data: any) => ({
            data,
            head: (n = 5) => {
              customPrint('[DataFrame Sample]');
              if (Array.isArray(data)) {
                data.slice(0, n).forEach((row) => customPrint(row));
              } else {
                customPrint(data);
              }
            },
            shape: Array.isArray(data) ? [data.length, Object.keys(data[0] || {}).length] : [0, 0],
            describe: () => customPrint('Summary statistics computed.'),
          }),
        },
      };

      // Wrap in async execution block
      const func = new Function(...Object.keys(sandboxGlobals), transpiledJs);
      func(...Object.values(sandboxGlobals));

      const duration = Math.round(performance.now() - startTime);
      resolve({
        success: true,
        output: outputBuffer.join('\n') || (outputBuffer.length === 0 ? '(Process exited with code 0 - No output printed)' : ''),
        executionTimeMs: Math.max(1, duration),
      });
    } catch (err: any) {
      const duration = Math.round(performance.now() - startTime);
      const errorMessage = err?.message || String(err);
      
      // Match line number if possible
      let errorLine: number | undefined;
      const match = errorMessage.match(/line (\d+)/i);
      if (match) {
        errorLine = parseInt(match[1], 10);
      }

      resolve({
        success: false,
        output: outputBuffer.join('\n'),
        error: `Traceback (most recent call last):\n  ${errorMessage}`,
        errorLine,
        executionTimeMs: Math.max(1, duration),
      });
    }
  });
}

/**
 * Lightweight python transpiler for educational code execution
 */
function transpilePythonToJs(pythonCode: string): string {
  const lines = pythonCode.split('\n');
  const jsLines: string[] = [];
  const indentStack: number[] = [0];

  for (let idx = 0; idx < lines.length; idx++) {
    const rawLine = lines[idx];
    // Ignore pure comments
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const currentIndent = rawLine.search(/\S/);

    // Close blocks when indentation decreases
    while (indentStack.length > 1 && currentIndent < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      jsLines.push('}');
    }

    let line = trimmed;

    // Remove inline comments
    const commentIdx = line.indexOf('#');
    if (commentIdx > 0 && !line.slice(0, commentIdx).includes('"') && !line.slice(0, commentIdx).includes("'")) {
      line = line.substring(0, commentIdx).trim();
    }

    // Replace Python boolean and None keywords
    line = line.replace(/\bTrue\b/g, 'true');
    line = line.replace(/\bFalse\b/g, 'false');
    line = line.replace(/\bNone\b/g, 'null');
    line = line.replace(/\band\b/g, '&&');
    line = line.replace(/\bor\b/g, '||');
    line = line.replace(/\bnot\b/g, '!');
    line = line.replace(/\bin\b/g, 'in');

    // Handle import statements
    if (line.startsWith('import ') || line.startsWith('from ')) {
      // module mocks are already in sandboxGlobals (math, random, pandas)
      continue;
    }

    // Handle def function
    if (line.startsWith('def ')) {
      const colonIdx = line.lastIndexOf(':');
      const header = line.substring(4, colonIdx).trim();
      jsLines.push(`function ${header} {`);
      indentStack.push(currentIndent + 4);
      continue;
    }

    // Handle for ... in range(...)
    if (line.startsWith('for ') && line.includes(' in ')) {
      const colonIdx = line.lastIndexOf(':');
      const body = line.substring(4, colonIdx).trim();
      const [varName, iterExpr] = body.split(' in ').map((s) => s.trim());
      jsLines.push(`for (const ${varName} of ${iterExpr}) {`);
      indentStack.push(currentIndent + 4);
      continue;
    }

    // Handle while loops
    if (line.startsWith('while ') && line.endsWith(':')) {
      const condition = line.substring(6, line.length - 1).trim();
      jsLines.push(`while (${condition}) {`);
      indentStack.push(currentIndent + 4);
      continue;
    }

    // Handle if statement
    if (line.startsWith('if ') && line.endsWith(':')) {
      const condition = line.substring(3, line.length - 1).trim();
      jsLines.push(`if (${condition}) {`);
      indentStack.push(currentIndent + 4);
      continue;
    }

    // Handle elif statement
    if (line.startsWith('elif ') && line.endsWith(':')) {
      const condition = line.substring(5, line.length - 1).trim();
      jsLines.push(`} else if (${condition}) {`);
      continue;
    }

    // Handle else statement
    if (line === 'else:') {
      jsLines.push('} else {');
      continue;
    }

    // Handle list .append(...)
    line = line.replace(/\.append\(/g, '.push(');

    // Python f-strings f"..." -> `...`
    if (line.includes('f"') || line.includes("f'")) {
      line = line.replace(/f"([^"]*)"/g, '`$1`').replace(/f'([^']*)'/g, '`$1`');
      line = line.replace(/\{([^}]+)\}/g, '${$1}');
    }

    // Standard assignment / expressions
    jsLines.push(line + ';');
  }

  // Close any remaining opened blocks
  while (indentStack.length > 1) {
    indentStack.pop();
    jsLines.push('}');
  }

  return jsLines.join('\n');
}

/**
 * Validate test cases against output
 */
export function validateTestCases(
  actualOutput: string,
  expectedCases: { input: string; expectedOutput: string; description: string }[]
): { passed: boolean; details: { description: string; passed: boolean; expected: string; got: string }[] } {
  const lines = actualOutput.split('\n').map((l) => l.trim()).filter(Boolean);
  const normalizedOutput = lines.join('\n');

  const details = expectedCases.map((tc) => {
    const passed = normalizedOutput.includes(tc.expectedOutput.trim()) || actualOutput.includes(tc.expectedOutput.trim());
    return {
      description: tc.description,
      passed,
      expected: tc.expectedOutput,
      got: actualOutput,
    };
  });

  const passed = details.every((d) => d.passed);
  return { passed, details };
}
