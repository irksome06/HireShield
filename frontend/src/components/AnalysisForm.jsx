import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Link as LinkIcon, 
  FileText, 
  Upload, 
  Trash2, 
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  HelpCircle
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
  const [activeTab, setActiveTab] = useState('text'); // 'text', 'url', 'image'
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

  const hasContent = !!jobMessage.trim() || !!jobUrl.trim() || !!selectedImage;

  return (
    <div className="bg-[#111827]/95 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md">
      
      {/* Header & Quick Example Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 pb-4 border-b border-slate-800/80">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span>Check a Job Offer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Paste the job text, enter a link, or upload an image to find out if it's safe.
          </p>
        </div>

        {/* Friendly Preset Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 mr-0.5">Try an example:</span>
          {MOCK_SCENARIOS.map((scen) => (
            <button
              key={scen.id}
              type="button"
              onClick={() => onSelectScenario(scen)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:border-cyan-500/50 cursor-pointer"
            >
              {scen.id.includes('equipment') ? '🚨 $350 Fee Scam' : scen.id.includes('telegram') ? '⚠️ Telegram Scam' : '✅ Real Job Offer'}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onAnalyze(); }} className="mt-5 space-y-4">
        
        {/* Main Job Message Textarea */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Job Message / Email Text / Chat</span>
            </label>
            <span className="text-[11px] text-slate-500">
              {jobMessage.length} characters
            </span>
          </div>
          <textarea
            rows={4}
            value={jobMessage}
            onChange={(e) => setJobMessage(e.target.value)}
            placeholder="Paste the email, LinkedIn message, WhatsApp text, or job description you received..."
            className="w-full px-4 py-3 rounded-2xl bg-[#0a0e17] border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors leading-relaxed resize-y"
          />
        </div>

        {/* Optional Secondary Inputs: URL & Screenshot in 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          
          {/* Job URL Input */}
          <div>
            <label className="text-xs font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                Job Website or Portal Link <span className="text-slate-500 font-normal">(Optional)</span>
              </span>
            </label>
            <input
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="e.g. https://company-careers.top or https://company.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0e17] border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors font-mono"
            />
          </div>

          {/* Screenshot Upload Dropzone */}
          <div>
            <label className="text-xs font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                Upload Offer Screenshot <span className="text-slate-500 font-normal">(Optional)</span>
              </span>
            </label>

            {!selectedImage ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border border-dashed rounded-xl px-3 py-2 text-center cursor-pointer transition-colors ${
                  dragOver 
                    ? 'border-cyan-400 bg-cyan-950/20' 
                    : 'border-slate-800 hover:border-slate-700 bg-[#0a0e17]/80'
                }`}
              >
                <input
                  type="file"
                  id="screenshot-file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="screenshot-file" className="cursor-pointer flex items-center justify-center gap-2 py-0.5">
                  <Upload className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-300">
                    Click to attach or <span className="text-cyan-400 underline">drag screenshot</span>
                  </span>
                </label>
              </div>
            ) : (
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#0a0e17] border border-slate-800">
                <div className="flex items-center space-x-2.5 truncate">
                  <img 
                    src={selectedImage.preview} 
                    alt="Offer Screenshot" 
                    className="w-8 h-8 object-cover rounded-lg border border-slate-700" 
                  />
                  <span className="text-xs font-medium text-slate-200 truncate">{selectedImage.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="p-1 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Action Bar */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>100% Free, Private & Instant Security Scan</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {hasContent && (
              <button
                type="button"
                onClick={handleClear}
                disabled={isLoading}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading || !hasContent}
              className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-40 cursor-pointer"
            >
              <span>Check This Job</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
