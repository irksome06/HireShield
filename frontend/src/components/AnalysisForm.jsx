import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Link as LinkIcon, 
  FileText, 
  Upload, 
  Sparkles, 
  Zap, 
  Trash2, 
  AlertCircle, 
  CheckCircle, 
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { MOCK_SCENARIOS } from '../data/mockScenarios';

export const AnalysisForm = ({ 
  jobMessage, 
  setJobMessage, 
  jobUrl, 
  setJobUrl, 
  selectedImage,
  setSelectedImage,
  onAnalyze, 
  isLoading,
  onSelectScenario
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage({
          file,
          preview: event.target?.result,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage({
          file,
          preview: event.target?.result,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setJobMessage('');
    setJobUrl('');
    setSelectedImage(null);
  };

  return (
    <div className="bg-[#111827]/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl backdrop-blur-sm">
      {/* Header & Scenario Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100">Job Threat Inspection Console</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Submit suspicious job offers, recruiter emails, or WhatsApp/Telegram chats for instant AI entity extraction and deterministic risk triage.
          </p>
        </div>

        {/* Quick Demo Scenarios */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-400 font-mono mr-1">Demo presets:</span>
          {MOCK_SCENARIOS.map((scen) => (
            <button
              key={scen.id}
              type="button"
              onClick={() => onSelectScenario(scen)}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:border-cyan-500/40 cursor-pointer"
            >
              {scen.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onAnalyze(); }} className="mt-5 space-y-4">
        {/* Job URL Input */}
        <div>
          <label className="block text-xs font-semibold uppercase font-mono tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
              Job Post / Recruiter Domain URL (Optional)
            </span>
            <span className="text-[10px] text-slate-500 lowercase">https://...</span>
          </label>
          <div className="relative">
            <input
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="e.g. https://apexcareers-jobs-portal.top/apply or https://company.com/careers"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d131f] border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono transition-colors"
            />
          </div>
        </div>

        {/* Job Message / Textarea */}
        <div>
          <label className="block text-xs font-semibold uppercase font-mono tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Job Message / Email Content / Chat Transcript <span className="text-rose-400">*</span>
            </span>
            <span className="text-[10px] text-slate-500 font-normal">
              {jobMessage.length} characters
            </span>
          </label>
          <textarea
            rows={5}
            value={jobMessage}
            onChange={(e) => setJobMessage(e.target.value)}
            placeholder="Paste the full job email, LinkedIn message, WhatsApp text, or job description here..."
            className="w-full px-3.5 py-3 rounded-xl bg-[#0d131f] border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors font-sans leading-relaxed resize-y"
          />
        </div>

        {/* Screenshot Upload Dropzone (Optional OCR) */}
        <div>
          <label className="block text-xs font-semibold uppercase font-mono tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
              Upload Offer Screenshot (Optional OCR Scan)
            </span>
            <span className="text-[10px] text-cyan-400/80 font-mono">PNG / JPG / WEBP</span>
          </label>

          {!selectedImage ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                dragOver 
                  ? 'border-cyan-400 bg-cyan-950/20' 
                  : 'border-slate-800 hover:border-slate-700 bg-[#0d131f]/60'
              }`}
            >
              <input
                type="file"
                id="screenshot-file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="screenshot-file" className="cursor-pointer flex flex-col items-center justify-center">
                <Upload className="w-6 h-6 text-slate-400 mb-1.5" />
                <p className="text-xs text-slate-300 font-medium">
                  Drag & drop screenshot or <span className="text-cyan-400 underline">browse files</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  HireShield can extract entities directly from offer screenshots via OCR
                </p>
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center space-x-3 truncate">
                <img 
                  src={selectedImage.preview} 
                  alt="Offer Screenshot Preview" 
                  className="w-12 h-12 object-cover rounded-lg border border-slate-700" 
                />
                <div className="truncate">
                  <p className="text-xs font-medium text-slate-200 truncate">{selectedImage.name}</p>
                  <p className="text-[10px] text-emerald-400 font-mono">Ready for entity OCR ingestion</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Remove image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Deterministic Scoring Algorithm Active</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleClear}
              disabled={isLoading || (!jobMessage && !jobUrl && !selectedImage)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={isLoading || (!jobMessage.trim() && !jobUrl.trim() && !selectedImage)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Inspecting Threat Vectors...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Run Scam Intelligence Audit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
