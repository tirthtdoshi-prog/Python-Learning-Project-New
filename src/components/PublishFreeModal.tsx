import React, { useState } from 'react';
import {
  Download,
  Share2,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  X,
  Sparkles,
  Globe,
  HardDrive,
  Rocket,
  ShieldCheck,
} from 'lucide-react';

interface PublishFreeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublishFreeModal: React.FC<PublishFreeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">Publish 100% Free</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950 font-extrabold text-[10px]">
                  Zero Cloud Billing Required
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                No Google Cloud Project, credit card, or billing setup needed.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Why you don't need Google Cloud Billing */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-sm">You Do Not Need Google Cloud Project or Billing</span>
              <p className="text-slate-600 mt-1">
                The Google AI Studio top-bar "Publish" button prompts for a Google Cloud Project with a paid billing account. You do <strong>not</strong> need to click that button or pay anything. This application is 100% client-side and can be shared or hosted completely free using the options below.
              </p>
            </div>
          </div>

          {/* Option 1: Direct Live Web Link */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-600" />
                <span className="font-extrabold text-sm text-slate-800">Option 1: Instant Live Web Link</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold">
                Already Online
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Your website is already running live. Anyone with this web address can open, use, and learn on the platform immediately:
            </p>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-mono text-slate-700 select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Option 2: 1-Click Download Standalone ZIP */}
          <div className="p-5 rounded-2xl border border-purple-200 bg-purple-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-purple-600" />
                <span className="font-extrabold text-sm text-slate-800">Option 2: Download Standalone Website (ZIP)</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                100% Offline Capable
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Download the complete pre-built static website package. It contains <code className="bg-purple-100 px-1 py-0.5 rounded font-mono text-[11px]">index.html</code>, assets, and all curriculum data.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="/python_learning_academy_standalone.zip"
                download="python_learning_academy_standalone.zip"
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-200 transition-all hover:scale-102 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Standalone ZIP (Free)</span>
              </a>
            </div>
          </div>

          {/* Option 3: Free 1-Click Drag-and-Drop Hosting */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="font-extrabold text-sm text-slate-800">
                Option 3: Free Zero-Billing Hosting Services
              </span>
            </div>
            <p className="text-xs text-slate-600">
              You can deploy the downloaded ZIP to any of these free static web hosts in under 30 seconds with <strong>zero billing accounts</strong>:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-extrabold text-slate-800 block">Netlify Drop</span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Drag & drop the downloaded folder directly into <strong className="text-slate-700">app.netlify.com/drop</strong>.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-extrabold text-slate-800 block">Vercel</span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Connect GitHub or run <code className="bg-slate-200 px-1 rounded text-[10px]">vercel deploy</code> for instant global CDN.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-extrabold text-slate-800 block">GitHub Pages</span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Push to a repository and enable GitHub Pages in Settings → 100% free forever.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            Python Learning Academy • 100% Free & Open Client-Side Platform
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
