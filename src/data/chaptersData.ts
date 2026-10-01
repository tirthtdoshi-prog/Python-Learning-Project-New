import { Chapter, Announcement } from '../types';

export const INITIAL_CHAPTERS: Chapter[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'Python Introduction',
    subtitle: 'What is Python & Why Learn It',
    durationMinutes: 15,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Welcome to Python: Overview, History & Simplicity',
    notes: `### 🌸 Welcome to Python!

Python is a friendly, high-level programming language created by **Guido van Rossum** in 1991. It is designed to be as readable and clear as plain English sentences.

#### Why Students Love Python:
1. **Readable & Clean:** Minimal punctuation and clean indentation make it effortless to learn.
2. **Versatile:** Used for School Projects, Web Applications, Data Science, Artificial Intelligence, and Automation.
3. **Huge Community:** Thousands of friendly tutorials, books, and open-source packages.

\`\`\`python
# Your very first Python line
print("Hello, Python Learning Academy!")
\`\`\`

Python code is executed line-by-line by the Python interpreter. You don't need complicated boilerplate!`,
    examples: [
      {
        title: 'Printing Your Greeting',
        code: `print("Welcome to your coding journey!")\nprint("Python is easy and fun to learn.")`,
        explanation: 'The `print()` function displays text onto the student console screen.',
      },
      {
        title: 'Simple Math with Python',
        code: `print(5 + 3)\nprint(10 * 2)`,
        explanation: 'Python can calculate arithmetic operations like a fast digital calculator.',
      },
    ],
    practiceTemplate: `# Write your name and print a friendly welcome message
student_name = "Alex"
print(f"Hello {student_name}, welcome to Python Learning Academy!")`,
    practiceExpectedOutput: 'Hello Alex, welcome to Python Learning Academy!',
    assignment: {
      title: 'Personal Intro Script',
      problemStatement: 'Print three lines: your name, your favorite subject, and your goal in learning Python.',
      starterCode: `# Write three print statements below:
print("Name: Alex")
# Add favorite subject and goal:
`,
      solutionCode: `print("Name: Alex")\nprint("Subject: Computer Science")\nprint("Goal: Build my own software!")`,
      hints: ['Use three separate print() calls on different lines.'],
    },
    quiz: {
      id: 'quiz-1',
      chapterId: 'step-1',
      chapterStep: 1,
      title: 'Python Introduction Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q1-1',
          type: 'mcq',
          question: 'Who created the Python programming language?',
          options: ['Guido van Rossum', 'James Gosling', 'Dennis Ritchie', 'Bjarne Stroustrup'],
          correctAnswer: 'Guido van Rossum',
          explanation: 'Guido van Rossum created Python and released it in 1991.',
        },
        {
          id: 'q1-2',
          type: 'true_false',
          question: 'True or False: Python is designed to be readable and beginner-friendly.',
          correctAnswer: true,
          explanation: 'Python prioritizes readability and uses clean indentation.',
        },
        {
          id: 'q1-3',
          type: 'fill_blank',
          question: 'Which built-in function is used to output text onto the screen in Python?',
          correctAnswer: 'print',
          explanation: 'The print() function sends text or values to the console.',
        },
      ],
    },
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'Python Installation',
    subtitle: 'Setting up Python & VS Code',
    durationMinutes: 20,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Installing Python 3 and Visual Studio Code',
    notes: `### 💻 Installing Python on Your Computer

Setting up Python is simple and quick:

1. **Download Python:** Visit [python.org](https://www.python.org) and download the latest Python 3 version.
2. **Add to PATH:** On Windows, make sure to check the box **"Add Python to PATH"** before clicking Install.
3. **Verify in Terminal:** Open your Command Prompt or Terminal and type:
   \`\`\`bash
   python --version
   \`\`\`
4. **Code Editor:** Install **VS Code** (Visual Studio Code) with the official Python extension for a smooth student coding experience.

Inside Python Learning Academy, you can also practice directly in our in-browser code editor without any installation!`,
    examples: [
      {
        title: 'Running Python in Interactive Mode (REPL)',
        code: `>>> 2 + 3\n5\n>>> "Py" + "thon"\n'Python'`,
        explanation: 'The Python REPL allows you to test quick one-liners interactively.',
      },
    ],
    practiceTemplate: `# Test your interactive Python environment
version_check = "Python 3 is installed and ready"
print(version_check)`,
    assignment: {
      title: 'Environment Confirmation',
      problemStatement: 'Create a script that prints "Setup Complete" and the current year.',
      starterCode: `print("Setup Complete")\n# Print year:`,
      solutionCode: `print("Setup Complete")\nprint(2026)`,
      hints: ['You can print numbers directly like print(2026)'],
    },
    quiz: {
      id: 'quiz-2',
      chapterId: 'step-2',
      chapterStep: 2,
      title: 'Installation & Setup Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q2-1',
          type: 'mcq',
          question: 'What important checkbox should you tick when installing Python on Windows?',
          options: ['Add Python to PATH', 'Install Games', 'Disable Antivirus', 'Format Hard Drive'],
          correctAnswer: 'Add Python to PATH',
          explanation: 'Adding Python to PATH allows you to run "python" from any terminal directory.',
        },
        {
          id: 'q2-2',
          type: 'true_false',
          question: 'You can test Python code right inside Python Learning Academy without installing software.',
          correctAnswer: true,
          explanation: 'Our in-browser practice lab executes Python directly in your browser.',
        },
      ],
    },
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'Variables',
    subtitle: 'Storing Information in Memory',
    durationMinutes: 20,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Variables & Memory: Storing Student Data',
    notes: `### 📦 Variables in Python

A variable is like a **labeled jar** in your study room. You put a value inside the jar and use its label whenever you need it.

\`\`\`python
# Creating variables
student_name = "Tirth"
student_age = 18
is_enrolled = True
\`\`\`

#### Rules for Variable Names:
- Must begin with a letter or underscore (\`_\`).
- Cannot start with a number.
- Can only contain letters, numbers, and underscores.
- Are **case-sensitive** (\`age\` and \`Age\` are different variables).
- Follow Python's snake_case convention (e.g. \`student_score\`).`,
    examples: [
      {
        title: 'Assigning & Printing Variables',
        code: `book_title = "Little Prince"\npages = 96\nprint("Reading:", book_title)\nprint("Total Pages:", pages)`,
        explanation: 'Variables hold values that can be passed to functions.',
      },
    ],
    practiceTemplate: `# Store your age and favorite subject in variables, then print them
my_age = 19
my_subject = "Mathematics"

print("Age:", my_age)
print("Subject:", my_subject)`,
    assignment: {
      title: 'Student ID Card Variables',
      problemStatement: 'Define variables student_name, roll_no, and school_name. Print them in a neat format.',
      starterCode: `student_name = "Maya"\nroll_no = 104\n# Add school_name and print them:`,
      solutionCode: `student_name = "Maya"\nroll_no = 104\nschool_name = "Greenwood High"\nprint(student_name, roll_no, school_name)`,
      hints: ['Use print() with commas to print multiple variables.'],
    },
    quiz: {
      id: 'quiz-3',
      chapterId: 'step-3',
      chapterStep: 3,
      title: 'Variables Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q3-1',
          type: 'mcq',
          question: 'Which of the following is a valid Python variable name?',
          options: ['student_score', '2nd_student', 'student-score', 'class'],
          correctAnswer: 'student_score',
          explanation: 'Variables cannot start with numbers, cannot contain hyphens, and cannot be Python keywords like "class".',
        },
        {
          id: 'q3-2',
          type: 'fill_blank',
          question: 'Are Python variable names case-sensitive? (yes or no)',
          correctAnswer: 'yes',
          explanation: 'Yes, Python variables are case-sensitive.',
        },
      ],
    },
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: 'Data Types',
    subtitle: 'Integers, Floats, Strings, and Booleans',
    durationMinutes: 25,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Understanding Fundamental Data Types',
    notes: `### 🔢 Fundamental Python Data Types

Every value in Python belongs to a data type. You can check a value's type using \`type()\`:

1. **int (Integer):** Whole numbers without decimals (e.g. \`10\`, \`-5\`, \`100\`).
2. **float (Floating Point):** Numbers with decimal points (e.g. \`3.14\`, \`9.8\`, \`0.5\`).
3. **str (String):** Text wrapped in quotes (e.g. \`"Python"\`, \`'Academy'\`).
4. **bool (Boolean):** Truth values, either \`True\` or \`False\`.

\`\`\`python
score = 95           # int
percentage = 95.5    # float
grade = "A"          # str
passed = True        # bool

print(type(score))   # <class 'int'>
\`\`\``,
    examples: [
      {
        title: 'Type Checking and Conversion',
        code: `num_text = "50"\nnum_int = int(num_text)\nprint(num_int + 10)`,
        explanation: 'Convert strings into integers using int() to perform mathematical addition.',
      },
    ],
    practiceTemplate: `# Explore data types
current_grade = 10
gpa = 3.95
student_name = "Rohan"
is_active = True

print(type(current_grade))
print(type(gpa))
print(type(student_name))
print(type(is_active))`,
    assignment: {
      title: 'Data Type Identification',
      problemStatement: 'Create 4 variables of types int, float, str, and bool. Print their types using type().',
      starterCode: `a = 42\nb = 3.14\nc = "Python"\nd = False\n# Print types:`,
      solutionCode: `a = 42\nb = 3.14\nc = "Python"\nd = False\nprint(type(a))\nprint(type(b))\nprint(type(c))\nprint(type(d))`,
      hints: ['Use print(type(a)) for each variable.'],
    },
    quiz: {
      id: 'quiz-4',
      chapterId: 'step-4',
      chapterStep: 4,
      title: 'Data Types Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q4-1',
          type: 'mcq',
          question: 'What is the data type of the value 3.14159?',
          options: ['float', 'int', 'str', 'bool'],
          correctAnswer: 'float',
          explanation: 'Numbers with fractional decimal points are floating-point numbers (float).',
        },
        {
          id: 'q4-2',
          type: 'true_false',
          question: 'True or False: "100" wrapped in quotation marks is treated as an integer in Python.',
          correctAnswer: false,
          explanation: 'Anything surrounded by quotes is a string (str).',
        },
      ],
    },
  },
  {
    id: 'step-5',
    stepNumber: 5,
    title: 'Operators',
    subtitle: 'Arithmetic, Comparison, and Logical Operators',
    durationMinutes: 20,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Working with Python Operators',
    notes: `### ⚡ Operators in Python

Operators perform operations on variables and values.

#### 1. Arithmetic Operators:
- \`+\` Addition: \`10 + 5 = 15\`
- \`-\` Subtraction: \`10 - 5 = 5\`
- \`*\` Multiplication: \`10 * 5 = 50\`
- \`/\` Division: \`10 / 4 = 2.5\`
- \`//\` Floor Division: \`10 // 4 = 2\`
- \`%\` Modulus (Remainder): \`10 % 3 = 1\`
- \`**\` Exponent (Power): \`2 ** 3 = 8\`

#### 2. Comparison Operators:
\`==\` (equal), \`!=\` (not equal), \`>\`, \`<\`, \`>=\`, \`<=\`.

#### 3. Logical Operators:
\`and\`, \`or\`, \`not\`.`,
    examples: [
      {
        title: 'Calculating Discounts',
        code: `price = 200\ndiscount = 0.15\nfinal_price = price - (price * discount)\nprint("Final Price:", final_price)`,
        explanation: 'Combining multiplication and subtraction with operator precedence.',
      },
    ],
    practiceTemplate: `# Calculate area of a rectangle
length = 12
width = 8
area = length * width
perimeter = 2 * (length + width)

print("Area:", area)
print("Perimeter:", perimeter)`,
    assignment: {
      title: 'Remainder & Power Operator',
      problemStatement: 'Given number = 25, compute its remainder when divided by 4, and compute 5 squared (5^2).',
      starterCode: `number = 25\n# Calculate rem and power:\n`,
      solutionCode: `number = 25\nrem = number % 4\npow_val = 5 ** 2\nprint("Remainder:", rem)\nprint("Power:", pow_val)`,
      hints: ['Use % for remainder and ** for exponent.'],
    },
    quiz: {
      id: 'quiz-5',
      chapterId: 'step-5',
      chapterStep: 5,
      title: 'Operators Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q5-1',
          type: 'mcq',
          question: 'What is the output of 7 // 2 in Python?',
          options: ['3', '3.5', '4', '1'],
          correctAnswer: '3',
          explanation: '// is integer (floor) division, which discards the decimal fraction.',
        },
      ],
    },
  },
  {
    id: 'step-6',
    stepNumber: 6,
    title: 'Input Output',
    subtitle: 'Getting Student Input & Formatted Printing',
    durationMinutes: 20,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'User Interaction: input() and f-strings',
    notes: `### 💬 Input & Output in Python

Interactive programs talk with users:

1. **input():** Pauses the program and waits for the user to type text. It **always returns a string**.
2. **f-strings (Formatted String Literals):** The cleanest and most aesthetic way to format output in Python:

\`\`\`python
name = "Maya"
score = 98
print(f"Student {name} scored {score}% in Python!")
\`\`\`

If you need numbers from \`input()\`, remember to wrap it with \`int()\` or \`float()\`:
\`\`\`python
age = int("18")
\`\`\``,
    examples: [
      {
        title: 'f-string Formatting',
        code: `item = "Notebook"\nprice = 4.50\nprint(f"Item: {item} | Price: \${price:.2f}")`,
        explanation: 'f-strings allow direct expression embedding and decimal rounding with :.2f.',
      },
    ],
    practiceTemplate: `# Practice with formatted strings
student = "Ananya"
marks = 94.5
print(f"Report Card: {student} received {marks}/100!")`,
    assignment: {
      title: 'Greeting Card Generator',
      problemStatement: 'Create variables for recipient and holiday name. Print a warm greeting using an f-string.',
      starterCode: `recipient = "Dear Friend"\nevent = "Happy Learning Day"\n# Print greeting:`,
      solutionCode: `recipient = "Dear Friend"\nevent = "Happy Learning Day"\nprint(f"{event}, {recipient}! Have a wonderful study session.")`,
      hints: ['Use f"..." syntax with curly brackets.'],
    },
    quiz: {
      id: 'quiz-6',
      chapterId: 'step-6',
      chapterStep: 6,
      title: 'Input Output Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q6-1',
          type: 'mcq',
          question: 'What data type does Python\'s built-in input() function always return?',
          options: ['str (string)', 'int', 'float', 'bool'],
          correctAnswer: 'str (string)',
          explanation: 'input() always reads input as text (str).',
        },
      ],
    },
  },
  {
    id: 'step-7',
    stepNumber: 7,
    title: 'Conditional Statements',
    subtitle: 'if, elif, and else Decision Making',
    durationMinutes: 25,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Decision Making: if, elif, else in Python',
    notes: `### 🔀 Conditional Statements (Decision Making)

Conditionals allow your code to make smart choices based on facts!

\`\`\`python
score = 85

if score >= 90:
    print("Grade: A - Outstanding!")
elif score >= 75:
    print("Grade: B - Great work!")
elif score >= 50:
    print("Grade: C - Passed!")
else:
    print("Keep practicing!")
\`\`\`

#### Notice Indentation:
In Python, indentation (4 spaces) is essential. It defines which block belongs to each conditional branch!`,
    examples: [
      {
        title: 'Checking Odd or Even',
        code: `num = 14\nif num % 2 == 0:\n    print(f"{num} is Even")\nelse:\n    print(f"{num} is Odd")`,
        explanation: 'Modulo operator checks divisibility by 2.',
      },
    ],
    practiceTemplate: `# Weather activity advisor
temperature = 22

if temperature > 28:
    print("Stay hydrated and study inside!")
elif temperature >= 18:
    print("Pleasant day for an outdoor study break.")
else:
    print("Grab a warm sweater!")`,
    assignment: {
      title: 'Pass or Fail Checker',
      problemStatement: 'Given marks = 62, print "Passed" if marks >= 50, otherwise print "Needs Improvement".',
      starterCode: `marks = 62\n# Write if-else condition:`,
      solutionCode: `marks = 62\nif marks >= 50:\n    print("Passed")\nelse:\n    print("Needs Improvement")`,
      hints: ['Use if marks >= 50: followed by an indented print statement.'],
    },
    quiz: {
      id: 'quiz-7',
      chapterId: 'step-7',
      chapterStep: 7,
      title: 'Conditional Statements Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q7-1',
          type: 'mcq',
          question: 'Which keyword represents "else if" in Python?',
          options: ['elif', 'elseif', 'else if', 'if else'],
          correctAnswer: 'elif',
          explanation: 'Python uses the keyword "elif" for else-if checks.',
        },
      ],
    },
  },
  {
    id: 'step-8',
    stepNumber: 8,
    title: 'Loops',
    subtitle: 'Automating Repetition with for and while',
    durationMinutes: 25,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Loops: for, while, and range()',
    notes: `### 🔁 Loops in Python

Loops save time by repeating instructions automatically without copying code.

#### 1. For Loop with range()
\`\`\`python
# Count from 1 to 5
for i in range(1, 6):
    print("Study session", i)
\`\`\`

#### 2. While Loop
\`\`\`python
count = 3
while count > 0:
    print(count)
    count = count - 1
print("Launch!")
\`\`\``,
    examples: [
      {
        title: 'Summing Numbers 1 to 10',
        code: `total = 0\nfor i in range(1, 11):\n    total = total + i\nprint("Total Sum:", total)`,
        explanation: 'Loop iterates from 1 to 10 and accumulates the running total.',
      },
    ],
    practiceTemplate: `# Print multiplication table for 5
number = 5
for i in range(1, 11):
    print(f"{number} x {i} = {number * i}")`,
    assignment: {
      title: 'Count Down Timer',
      problemStatement: 'Write a while loop starting from 5 down to 1, printing each number.',
      starterCode: `n = 5\n# Write while loop here:`,
      solutionCode: `n = 5\nwhile n >= 1:\n    print(n)\n    n = n - 1`,
      hints: ['Make sure to decrement n in each iteration so it does not loop forever.'],
    },
    quiz: {
      id: 'quiz-8',
      chapterId: 'step-8',
      chapterStep: 8,
      title: 'Loops Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q8-1',
          type: 'mcq',
          question: 'What numbers are generated by range(1, 4)?',
          options: ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3', '2, 3, 4'],
          correctAnswer: '1, 2, 3',
          explanation: 'range(start, stop) stops right before reaching the stop number.',
        },
      ],
    },
  },
  {
    id: 'step-9',
    stepNumber: 9,
    title: 'Functions',
    subtitle: 'Reusable Code Blocks and Parameters',
    durationMinutes: 25,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Functions: Defining, Calling, and Returning Values',
    notes: `### 🧩 Functions in Python

A function is a reusable block of code that performs a specific task. You define it once and call it whenever needed!

\`\`\`python
def greet_student(name):
    """Greets the student with a warm welcome."""
    return f"Welcome to class, {name}!"

message = greet_student("Tirth")
print(message)
\`\`\`

#### Key Concepts:
- \`def\` keyword defines the function.
- Parameters go inside the parentheses.
- \`return\` sends a value back to where the function was called.`,
    examples: [
      {
        title: 'Calculating Circle Area',
        code: `def circle_area(radius):\n    return 3.14159 * (radius ** 2)\n\nprint("Radius 5 area:", circle_area(5))`,
        explanation: 'Encapsulates the mathematical formula into a clean, reusable function.',
      },
    ],
    practiceTemplate: `# Define a function to calculate square of a number
def square(n):
    return n * n

print("Square of 7 is:", square(7))
print("Square of 9 is:", square(9))`,
    assignment: {
      title: 'Average Calculator Function',
      problemStatement: 'Write a function calculate_average(a, b, c) that returns the average of three numbers.',
      starterCode: `def calculate_average(a, b, c):\n    # Return average:\n    pass\n\nprint(calculate_average(10, 20, 30))`,
      solutionCode: `def calculate_average(a, b, c):\n    return (a + b + c) / 3\n\nprint(calculate_average(10, 20, 30))`,
      hints: ['Add all three numbers and divide by 3.'],
    },
    quiz: {
      id: 'quiz-9',
      chapterId: 'step-9',
      chapterStep: 9,
      title: 'Functions Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q9-1',
          type: 'mcq',
          question: 'Which keyword is used to define a function in Python?',
          options: ['def', 'func', 'function', 'define'],
          correctAnswer: 'def',
          explanation: '"def" is Python\'s keyword for defining a function.',
        },
      ],
    },
  },
  {
    id: 'step-10',
    stepNumber: 10,
    title: 'Lists',
    subtitle: 'Ordered Collections of Items',
    durationMinutes: 25,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Working with Python Lists',
    notes: `### 📋 Lists in Python

A list is an **ordered, changeable (mutable)** collection of items. Lists are created using square brackets \`[]\`.

\`\`\`python
fruits = ["Apple", "Banana", "Mango"]

# Accessing by index (starts at 0)
print(fruits[0])  # Apple

# Adding an item
fruits.append("Orange")

# Length of list
print(len(fruits)) # 4
\`\`\``,
    examples: [
      {
        title: 'Looping Through a List',
        code: `subjects = ["Python", "Math", "Science"]\nfor sub in subjects:\n    print("I enjoy studying", sub)`,
        explanation: 'For loops iterate effortlessly over every item in a list.',
      },
    ],
    practiceTemplate: `# Practice with Lists
study_playlist = ["Focus Piano", "Gentle Rain", "Aesthetic Beats"]
study_playlist.append("Nature Sounds")

for track in study_playlist:
    print("Now Playing:", track)`,
    assignment: {
      title: 'List Operations',
      problemStatement: 'Create a list of 3 colors. Add a fourth color using append() and print the second color.',
      starterCode: `colors = ["Blue", "Green", "Yellow"]\n# Append a color and print colors[1]:`,
      solutionCode: `colors = ["Blue", "Green", "Yellow"]\ncolors.append("Purple")\nprint(colors[1])`,
      hints: ['Remember lists start at index 0, so index 1 is the second item.'],
    },
    quiz: {
      id: 'quiz-10',
      chapterId: 'step-10',
      chapterStep: 10,
      title: 'Lists Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q10-1',
          type: 'mcq',
          question: 'What is the index of the first element in a Python list?',
          options: ['0', '1', '-1', 'null'],
          correctAnswer: '0',
          explanation: 'Python uses 0-based indexing.',
        },
      ],
    },
  },
  {
    id: 'step-11',
    stepNumber: 11,
    title: 'Tuples',
    subtitle: 'Immutable Ordered Sequences',
    durationMinutes: 20,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Tuples: Safe, Unchangeable Collections',
    notes: `### 🔒 Tuples in Python

A tuple is like a list, but **immutable** (cannot be changed after creation). Tuples are defined using round parentheses \`()\`.

\`\`\`python
# Screen dimensions or geographical coordinates
coordinates = (1920, 1080)
print(coordinates[0]) # 1920
\`\`\`

#### Why Use Tuples?
- **Data Safety:** Prevent accidental modifications.
- **Fast:** Tuples are slightly faster than lists in memory.`,
    examples: [
      {
        title: 'Unpacking a Tuple',
        code: `point = (10, 20)\nx, y = point\nprint("X coordinate:", x)\nprint("Y coordinate:", y)`,
        explanation: 'Assigning values from a tuple directly into individual variables is called tuple unpacking.',
      },
    ],
    practiceTemplate: `# RGB Color Tuple
sky_blue = (56, 189, 248)
r, g, b = sky_blue
print(f"Red: {r}, Green: {g}, Blue: {b}")`,
    assignment: {
      title: 'Tuple Creation and Access',
      problemStatement: 'Create a tuple with three days ("Mon", "Tue", "Wed") and print the last day.',
      starterCode: `days = ("Mon", "Tue", "Wed")\n# Print last day:`,
      solutionCode: `days = ("Mon", "Tue", "Wed")\nprint(days[-1])`,
      hints: ['You can use index -1 to access the last element.'],
    },
    quiz: {
      id: 'quiz-11',
      chapterId: 'step-11',
      chapterStep: 11,
      title: 'Tuples Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q11-1',
          type: 'true_false',
          question: 'True or False: You can change the elements of a tuple after creating it.',
          correctAnswer: false,
          explanation: 'Tuples are immutable; their values cannot be changed or re-assigned.',
        },
      ],
    },
  },
  {
    id: 'step-12',
    stepNumber: 12,
    title: 'Dictionaries',
    subtitle: 'Key-Value Pairs for Structured Data',
    durationMinutes: 25,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Dictionaries: Storing Information with Keys',
    notes: `### 📖 Dictionaries in Python

A dictionary stores data in **key-value pairs**, just like a real language dictionary connects a word to its definition. Dictionaries use curly braces \`{}\`.

\`\`\`python
student = {
    "name": "Tirth",
    "course": "Python Academy",
    "score": 98
}

print(student["name"])   # Tirth
student["grade"] = "A+"  # Adding a new key-value pair
\`\`\``,
    examples: [
      {
        title: 'Iterating Through Dictionary Items',
        code: `capitals = {"France": "Paris", "Japan": "Tokyo", "India": "New Delhi"}\nfor country, city in capitals.items():\n    print(f"The capital of {country} is {city}")`,
        explanation: '.items() yields both the key and value simultaneously.',
      },
    ],
    practiceTemplate: `# Student profile dictionary
profile = {
    "username": "tirth",
    "chapters_completed": 18,
    "has_certificate": True
}

print("Student:", profile["username"])
print("Chapters Done:", profile["chapters_completed"])`,
    assignment: {
      title: 'Book Dictionary',
      problemStatement: 'Create a dictionary for a book with keys "title" and "author". Print the title.',
      starterCode: `book = {"title": "Python for Beginners", "author": "John"}\n# Print title:`,
      solutionCode: `book = {"title": "Python for Beginners", "author": "John"}\nprint(book["title"])`,
      hints: ['Access the key using book["title"].'],
    },
    quiz: {
      id: 'quiz-12',
      chapterId: 'step-12',
      chapterStep: 12,
      title: 'Dictionaries Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q12-1',
          type: 'mcq',
          question: 'Which brackets are used to define a Python dictionary?',
          options: ['Curly braces {}', 'Square brackets []', 'Parentheses ()', 'Angle brackets <>'],
          correctAnswer: 'Curly braces {}',
          explanation: 'Dictionaries use curly braces {} with key: value pairs.',
        },
      ],
    },
  },
  {
    id: 'step-13',
    stepNumber: 13,
    title: 'Sets',
    subtitle: 'Unique Unordered Collections',
    durationMinutes: 20,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Sets: Uniqueness & Mathematical Operations',
    notes: `### 🪴 Sets in Python

A set is an **unordered collection of unique items**. Duplicate elements are automatically discarded!

\`\`\`python
# Notice duplicates are removed:
tags = {"python", "coding", "python", "school"}
print(tags) # {'python', 'coding', 'school'}
\`\`\`

#### Common Set Operations:
- Union (\`|\`): Items in either set.
- Intersection (\`&\`): Items common to both sets.
- Difference (\`-\`): Items in first set but not second.`,
    examples: [
      {
        title: 'Removing Duplicates from a List',
        code: `raw_numbers = [1, 2, 2, 3, 4, 4, 5]\nunique_numbers = list(set(raw_numbers))\nprint("Unique:", unique_numbers)`,
        explanation: 'Converting to a set and back to a list quickly strips all duplicate entries.',
      },
    ],
    practiceTemplate: `# Set Operations
set_a = {1, 2, 3, 4}
set_b = {3, 4, 5, 6}

print("Union:", set_a | set_b)
print("Intersection:", set_a & set_b)`,
    assignment: {
      title: 'Find Unique Words',
      problemStatement: 'Convert the list ["apple", "banana", "apple", "cherry"] to a set and print its length.',
      starterCode: `items = ["apple", "banana", "apple", "cherry"]\n# Convert to set and print len:`,
      solutionCode: `items = ["apple", "banana", "apple", "cherry"]\nunique = set(items)\nprint(len(unique))`,
      hints: ['use set(items) and len().'],
    },
    quiz: {
      id: 'quiz-13',
      chapterId: 'step-13',
      chapterStep: 13,
      title: 'Sets Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q13-1',
          type: 'true_false',
          question: 'True or False: Sets allow duplicate elements.',
          correctAnswer: false,
          explanation: 'Sets only store distinct, unique elements.',
        },
      ],
    },
  },
  {
    id: 'step-14',
    stepNumber: 14,
    title: 'File Handling',
    subtitle: 'Reading and Writing Text Files',
    durationMinutes: 25,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Working with Files: Reading, Writing, and with-blocks',
    notes: `### 📁 File Handling in Python

Python makes working with files on your disk effortless using the \`open()\` function and the \`with\` statement.

\`\`\`python
# Writing to a file:
with open("notes.txt", "w") as file:
    file.write("Python Learning Academy is wonderful!")

# Reading from a file:
with open("notes.txt", "r") as file:
    content = file.read()
    print(content)
\`\`\`

Using \`with open(...)\` guarantees that the file is safely closed even if an unexpected error occurs!`,
    examples: [
      {
        title: 'Appending to a File',
        code: `# Simulated appending
study_log = ["Chapter 1 done", "Chapter 2 done"]
for entry in study_log:
    print(f"Writing log: {entry}")`,
        explanation: 'Appending allows adding new log lines without deleting previous text.',
      },
    ],
    practiceTemplate: `# File handling simulation
lines = ["Line 1: Variables", "Line 2: Data Types", "Line 3: File Handling"]
for idx, line in enumerate(lines, 1):
    print(f"[File] {line}")`,
    assignment: {
      title: 'Study Note Writer',
      problemStatement: 'Simulate saving 3 student study topics into a list and printing each with a checkmark.',
      starterCode: `topics = ["Variables", "Loops", "Files"]\n# Print each topic:`,
      solutionCode: `topics = ["Variables", "Loops", "Files"]\nfor t in topics:\n    print(f"Saved: {t} ✓")`,
      hints: ['Loop over the topics list.'],
    },
    quiz: {
      id: 'quiz-14',
      chapterId: 'step-14',
      chapterStep: 14,
      title: 'File Handling Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q14-1',
          type: 'mcq',
          question: 'Which mode is used to append data to an existing file without overwriting it?',
          options: ['"a"', '"w"', '"r"', '"x"'],
          correctAnswer: '"a"',
          explanation: '"a" stands for append mode.',
        },
      ],
    },
  },
  {
    id: 'step-15',
    stepNumber: 15,
    title: 'Exception Handling',
    subtitle: 'try, except, and finally for Robust Code',
    durationMinutes: 25,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Catching Errors Gently: try / except in Python',
    notes: `### 🛡️ Exception Handling in Python

Exceptions happen when an unexpected condition arises during execution (e.g. dividing by zero, or file not found). Instead of crashing, Python lets you handle errors gracefully!

\`\`\`python
try:
    number = int("hello")
except ValueError:
    print("Friendly notice: Please provide digits instead of words!")
finally:
    print("Process complete.")
\`\`\``,
    examples: [
      {
        title: 'Safe Division Function',
        code: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Cannot divide by zero!"\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))`,
        explanation: 'Prevents runtime crash by catching ZeroDivisionError.',
      },
    ],
    practiceTemplate: `# Try-except practice
try:
    result = 100 / 0
except ZeroDivisionError:
    result = "Handled gracefully!"

print("Result:", result)`,
    assignment: {
      title: 'Integer Conversion Safety',
      problemStatement: 'Write a try-except block that tries to convert "abc" to int and catches ValueError.',
      starterCode: `text = "abc"\n# Wrap int(text) in try-except:`,
      solutionCode: `text = "abc"\ntry:\n    val = int(text)\nexcept ValueError:\n    print("Caught ValueError successfully")`,
      hints: ['Catch ValueError inside the except clause.'],
    },
    quiz: {
      id: 'quiz-15',
      chapterId: 'step-15',
      chapterStep: 15,
      title: 'Exception Handling Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q15-1',
          type: 'mcq',
          question: 'What block of code runs regardless of whether an exception occurred or not?',
          options: ['finally', 'catch', 'always', 'else'],
          correctAnswer: 'finally',
          explanation: 'The finally block executes unconditionally.',
        },
      ],
    },
  },
  {
    id: 'step-16',
    stepNumber: 16,
    title: 'Object Oriented Programming',
    subtitle: 'Classes, Objects, Methods, and Attributes',
    durationMinutes: 30,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Object Oriented Python: Classes & Blueprints',
    notes: `### 🏛️ Object Oriented Programming (OOP)

OOP organizes code into **classes** (blueprints) and **objects** (individual instances).

\`\`\`python
class Student:
    def __init__(self, name, roll_no):
        self.name = name
        self.roll_no = roll_no

    def introduce(self):
        print(f"Hi, I am {self.name} (Roll No: {self.roll_no})")

student1 = Student("Tirth", 101)
student1.introduce()
\`\`\`

#### Key Terms:
- **Class:** The template/blueprint.
- **Object:** The actual created item in memory.
- **__init__:** The initializer method called when a new object is created.
- **self:** Refers to the current object instance.`,
    examples: [
      {
        title: 'Book Class Example',
        code: `class Book:\n    def __init__(self, title, pages):\n        self.title = title\n        self.pages = pages\n\nb = Book("Python 101", 200)\nprint("Created:", b.title, "with", b.pages, "pages")`,
        explanation: 'Models real world entities with attributes and properties.',
      },
    ],
    practiceTemplate: `# Create a Pet class
class Pet:
    def __init__(self, name, animal_type):
        self.name = name
        self.animal_type = animal_type

    def speak(self):
        print(f"{self.name} the {self.animal_type} says hello!")

my_pet = Pet("Daisy", "Bunny")
my_pet.speak()`,
    assignment: {
      title: 'Circle Class',
      problemStatement: 'Create a class Circle with attribute radius and a method area() returning 3.14 * radius * radius.',
      starterCode: `class Circle:\n    # Define __init__ and area():\n    pass\n\nc = Circle(5)\nprint(c.area())`,
      solutionCode: `class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self):\n        return 3.14 * self.radius * self.radius\n\nc = Circle(5)\nprint(c.area())`,
      hints: ['Define def area(self): return 3.14 * self.radius ** 2.'],
    },
    quiz: {
      id: 'quiz-16',
      chapterId: 'step-16',
      chapterStep: 16,
      title: 'Object Oriented Programming Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q16-1',
          type: 'mcq',
          question: 'What is the name of Python\'s special constructor method?',
          options: ['__init__', '__new__', '__construct__', '__start__'],
          correctAnswer: '__init__',
          explanation: '__init__ is the initializer method for instances in Python.',
        },
      ],
    },
  },
  {
    id: 'step-17',
    stepNumber: 17,
    title: 'Mini Projects',
    subtitle: 'Hands-On Practical Code Projects',
    durationMinutes: 35,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Building Mini Projects: Calculator, Password Generator & Word Counter',
    notes: `### 🛠️ Mini Projects

Now that you know Python syntax, data structures, and functions, it's time to build practical mini applications!

#### Mini Project Ideas:
1. **Interactive Password Generator:** Combines random letters, digits, and special characters.
2. **Word & Character Frequency Counter:** Analyzes essays and reports top keywords.
3. **Student Grade Book:** Calculates GPA and prints aesthetic report cards.

\`\`\`python
# Mini Project: Word Counter
def word_stats(text):
    words = text.split()
    return {
        "word_count": len(words),
        "char_count": len(text),
        "unique_words": len(set(words))
    }

sample = "python is fun and python is powerful"
print(word_stats(sample))
\`\`\``,
    examples: [
      {
        title: 'Number Guessing Logic',
        code: `secret_number = 7\nguess = 7\nif guess == secret_number:\n    print("🎉 Congratulations! Correct guess.")`,
        explanation: 'Simple game evaluation logic using conditionals.',
      },
    ],
    practiceTemplate: `# Mini Project: Simple Bill Splitter
def split_bill(total, people, tip_percent=10):
    total_with_tip = total + (total * (tip_percent / 100))
    return round(total_with_tip / people, 2)

print("Each person pays: $", split_bill(100, 4, 15))`,
    assignment: {
      title: 'Student Grade Evaluator Project',
      problemStatement: 'Write a function evaluate_student(scores) that returns the average score and whether they passed (avg >= 60).',
      starterCode: `def evaluate_student(scores):\n    # Return dict with avg and passed:\n    pass\n\nprint(evaluate_student([80, 90, 70]))`,
      solutionCode: `def evaluate_student(scores):\n    avg = sum(scores) / len(scores)\n    return {"average": avg, "passed": avg >= 60}\n\nprint(evaluate_student([80, 90, 70]))`,
      hints: ['Use sum(scores) / len(scores).'],
    },
    quiz: {
      id: 'quiz-17',
      chapterId: 'step-17',
      chapterStep: 17,
      title: 'Mini Projects Quiz',
      timeLimitSeconds: 120,
      questions: [
        {
          id: 'q17-1',
          type: 'mcq',
          question: 'Which string method splits a sentence into a list of words?',
          options: ['.split()', '.break()', '.divide()', '.slice()'],
          correctAnswer: '.split()',
          explanation: '.split() breaks text separated by whitespace into a list.',
        },
      ],
    },
  },
  {
    id: 'step-18',
    stepNumber: 18,
    title: 'Final Project',
    subtitle: 'Academy Capstone Graduation Project',
    durationMinutes: 45,
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    videoTitle: 'Capstone Final Project: Full Student Academy Management System',
    notes: `### 🎓 Final Project: Academy Graduation!

Congratulations on reaching the ultimate milestone of Python Learning Academy! You are now prepared to build an end-to-end Python system.

#### The Capstone Challenge:
Build a **Student Task & Study Tracker** using:
- Classes and Object Oriented Design
- Collections (Lists, Dictionaries)
- Functions and Return Values
- Error Handling and Safe Operations

\`\`\`python
# Academy Capstone: Study Planner System
class StudyPlanner:
    def __init__(self, student_name):
        self.student_name = student_name
        self.completed_steps = []

    def complete_step(self, step_title):
        self.completed_steps.append(step_title)
        print(f"⭐ {self.student_name} completed: {step_title}!")

    def summary(self):
        print(f"Total Steps Completed: {len(self.completed_steps)}/18")

planner = StudyPlanner("Tirth")
planner.complete_step("Python Introduction")
planner.complete_step("Final Project")
planner.summary()
\`\`\`

Completing this final project unlocks your official **Python Learning Academy Graduation Certificate**!`,
    examples: [
      {
        title: 'Complete OOP System with Validation',
        code: `class AcademyCourse:\n    def __init__(self, name):\n        self.name = name\n        self.students = []\n    def enroll(self, student):\n        self.students.append(student)\n\nc = AcademyCourse("Python Mastery")\nc.enroll("Maya")\nprint("Enrolled:", c.students)`,
        explanation: 'Combines classes, collections, and methods.',
      },
    ],
    practiceTemplate: `# Final Project: Academy Task Manager
class TaskManager:
    def __init__(self):
        self.tasks = []

    def add_task(self, task):
        self.tasks.append(task)
        print(f"Added task: {task}")

    def show_tasks(self):
        print("Your Academy Study Tasks:")
        for idx, t in enumerate(self.tasks, 1):
            print(f"{idx}. {t} ✓")

manager = TaskManager()
manager.add_task("Finish all 18 Roadmap Levels")
manager.add_task("Claim Academy Certificate")
manager.show_tasks()`,
    assignment: {
      title: 'Academy Capstone Project Submission',
      problemStatement: 'Build a class BankAccount with methods deposit(amount), withdraw(amount), and get_balance(). Prevent withdrawing more than the balance.',
      starterCode: `class BankAccount:\n    # Define __init__, deposit, withdraw, get_balance:\n    pass\n`,
      solutionCode: `class BankAccount:\n    def __init__(self, initial=0):\n        self.balance = initial\n    def deposit(self, amt):\n        self.balance += amt\n    def withdraw(self, amt):\n        if amt <= self.balance:\n            self.balance -= amt\n            return True\n        return False\n    def get_balance(self):\n        return self.balance\n\nacc = BankAccount(100)\nacc.deposit(50)\nacc.withdraw(30)\nprint("Final Balance:", acc.get_balance())`,
      hints: ['Store balance in self.balance and check condition before subtraction.'],
    },
    quiz: {
      id: 'quiz-18',
      chapterId: 'step-18',
      chapterStep: 18,
      title: 'Academy Graduation Quiz',
      timeLimitSeconds: 150,
      questions: [
        {
          id: 'q18-1',
          type: 'true_false',
          question: 'Completing all 18 roadmap levels qualifies you for the official Python Learning Academy Certificate.',
          correctAnswer: true,
          explanation: 'Yes! After finishing all 18 levels you can claim your verified completion certificate.',
        },
        {
          id: 'q18-2',
          type: 'mcq',
          question: 'What is the primary benefit of Python\'s clean syntax and readability?',
          options: ['Faster learning curve and maintainable code', 'Requires less RAM to install', 'Only runs on one OS', 'Disables all errors'],
          correctAnswer: 'Faster learning curve and maintainable code',
          explanation: 'Python emphasizes developer productivity and readability.',
        },
      ],
    },
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: '🌸 Welcome to the 18-Level Learning Roadmap!',
    content: 'Follow PyBuddy along our curved adventure roadmap from Python Introduction to your Final Capstone Project.',
    date: 'September 2026',
    category: 'Notice',
  },
  {
    id: 'ann-2',
    title: '🐻 Meet PyBuddy: Your Learning Companion',
    content: 'PyBuddy will walk, celebrate, and dance as you complete each chapter on your educational journey!',
    date: 'September 2026',
    category: 'Update',
  },
  {
    id: 'ann-3',
    title: '🏆 Certificates Now Verifiable for 18 Levels',
    content: 'Upon completing your 18 chapters and quizzes, you can instantly generate and download your personalized completion diploma.',
    date: 'September 2026',
    category: 'Notice',
  },
];
