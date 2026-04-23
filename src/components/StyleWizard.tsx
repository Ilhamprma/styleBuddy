import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Info, Check } from 'lucide-react';
import { UserProfile } from '@/src/services/geminiService';

interface StyleWizardProps {
  onComplete: (profile: UserProfile) => void;
}

const STYLE_OPTIONS = ['Minimalist', 'Streetwear', 'Business Casual', 'Bohemian', 'Preppy', 'Grunge', 'Y2K', 'Luxury'];
const OCCASIONS = [ 'Daily Wear', 'Job Interview', 'Wedding Guest', 'Date Night', 'Formal Gala', 'Holiday/Travel' ];
const SKIN_TONES = [
  { name: 'Fair', color: '#FDF0E5' },
  { name: 'Light', color: '#F8DABB' },
  { name: 'Medium', color: '#E5A073' },
  { name: 'Tan', color: '#B87852' },
  { name: 'Deep', color: '#5C3821' }
];

export default function StyleWizard({ onComplete }: StyleWizardProps) {
  const [step, setStep] = useState(1);
  const [showTorsoInfo, setShowTorsoInfo] = useState(false);
  const [formData, setFormData] = useState<UserProfile>({
    height: 170,
    weight: 65,
    torsoType: 'balanced',
    preferences: [],
    skinTone: 'Medium',
    occasion: 'Daily Wear'
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const togglePreference = (style: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(style)
        ? prev.preferences.filter(p => p !== style)
        : [...prev.preferences, style]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto py-8 md:py-12 px-2 md:px-0">
      <div className="mb-8 md:mb-12 overflow-hidden h-1.5 md:h-2 bg-brand-primary/10 rounded-full">
        <motion.div 
          className="h-full bg-brand-accent rounded-full"
          animate={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-[32px] md:rounded-[40px] p-6 md:p-10 space-y-6 md:space-y-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-2 flex items-center gap-2">
                <span className="text-brand-accent">01</span> Body Metrics
              </h2>
              <p className="text-sm md:text-base text-brand-ink/60">Your height and weight help me understand your proportions.</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2 text-brand-ink">
                <label className="block text-[10px] md:text-sm font-bold text-gray-500 uppercase tracking-wider">Height (cm)</label>
                <div className="flex items-center gap-4 md:gap-6">
                  <input 
                    type="range" 
                    min="140" 
                    max="220"
                    value={formData.height}
                    onChange={e => setFormData({ ...formData, height: Number(e.target.value) })}
                    className="w-full accent-brand-accent h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="font-black text-brand-primary text-xl md:text-2xl w-12 md:w-16 text-right">{formData.height}</span>
                </div>
              </div>
              <div className="space-y-2 text-brand-ink">
                <label className="block text-[10px] md:text-sm font-bold text-gray-500 uppercase tracking-wider">Weight (kg)</label>
                <div className="flex items-center gap-4 md:gap-6">
                  <input 
                    type="range" 
                    min="40" 
                    max="150"
                    value={formData.weight}
                    onChange={e => setFormData({ ...formData, weight: Number(e.target.value) })}
                    className="w-full accent-brand-accent h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="font-black text-brand-primary text-xl md:text-2xl w-12 md:w-16 text-right">{formData.weight}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-[32px] md:rounded-[40px] p-6 md:p-10 space-y-6 md:space-y-8"
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2">
                  <span className="text-brand-accent">02</span> Torso Balance
                </h2>
                <button 
                  onClick={() => setShowTorsoInfo(!showTorsoInfo)}
                  className="w-fit text-[10px] md:text-xs bg-brand-secondary text-white px-3 py-1 rounded-full font-bold hover:scale-105 transition-transform"
                >
                  What's this?
                </button>
              </div>
              <p className="text-sm md:text-base text-brand-ink/60">This detail is key for recommending silhouettes.</p>
            </div>

            <AnimatePresence>
              {showTorsoInfo && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 md:p-6 bg-brand-muted rounded-2xl border-2 border-brand-light-accent text-xs md:text-sm space-y-3">
                    <p><strong>How to check:</strong> Measure from your armpit to your waist, and your waist to your hip bone.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              {(['long', 'balanced', 'short'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, torsoType: type })}
                  className={`flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-base md:text-lg transition-all ${
                    formData.torsoType === type 
                      ? 'bg-brand-secondary text-white shadow-lg scale-102 sm:scale-105' 
                      : 'bg-white border-2 border-brand-secondary/30 text-brand-primary'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-[32px] md:rounded-[40px] p-6 md:p-10 space-y-6 md:space-y-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2">
                <span className="text-brand-accent">03</span> Style Vibe
              </h2>
              <p className="text-sm md:text-base text-brand-ink/60">Select categories that resonate with you.</p>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {STYLE_OPTIONS.map(style => (
                <button
                  key={style}
                  onClick={() => togglePreference(style)}
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-black text-xs md:text-sm transition-all shadow-sm ${
                    formData.preferences.includes(style)
                      ? 'bg-brand-primary text-white scale-105'
                      : 'bg-brand-light-accent/30 text-brand-accent hover:bg-brand-light-accent/50'
                  }`}
                >
                  {style}
                </button>
              ))}
              {/* Display custom added styles that aren't in STYLE_OPTIONS */}
              {formData.preferences.filter(p => !STYLE_OPTIONS.includes(p)).map(style => (
                <button
                  key={style}
                  onClick={() => togglePreference(style)}
                  className="px-4 py-2 md:px-6 md:py-3 rounded-full font-black text-xs md:text-sm transition-all shadow-sm bg-brand-primary text-white scale-105"
                >
                  {style}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t-2 border-brand-light-accent/30">
              <p className="text-[10px] md:text-xs font-black text-brand-primary/40 uppercase tracking-widest mb-3">Or type your own style...</p>
              <input 
                type="text"
                placeholder="e.g. Cyberpunk..."
                className="w-full px-4 py-3 md:px-6 md:py-4 bg-white border-2 border-brand-light-accent/50 rounded-xl md:rounded-2xl outline-none focus:border-brand-primary transition-all font-bold text-sm md:text-base"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = e.currentTarget.value.trim();
                    if (val && !formData.preferences.includes(val)) {
                      togglePreference(val);
                      e.currentTarget.value = '';
                    }
                  }
                }}
              />
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-[32px] md:rounded-[40px] p-6 md:p-10 space-y-6 md:space-y-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-2 flex items-center gap-2">
                <span className="text-brand-accent">04</span> Color Palette
              </h2>
              <p className="text-sm md:text-base text-brand-ink/60">Identify your skin tone for color harmony.</p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {SKIN_TONES.map(tone => (
                <button
                  key={tone.name}
                  onClick={() => setFormData({ ...formData, skinTone: tone.name })}
                  className={`flex flex-col items-center gap-2 p-2 rounded-xl md:rounded-2xl transition-all ${
                    formData.skinTone === tone.name ? 'bg-brand-primary/10 ring-2 ring-brand-primary' : 'hover:bg-gray-100'
                  }`}
                >
                  <div 
                    className="w-full aspect-square rounded-lg md:rounded-xl shadow-inner" 
                    style={{ backgroundColor: tone.color }} 
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest">{tone.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-[32px] md:rounded-[40px] p-6 md:p-10 space-y-6 md:space-y-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-2 flex items-center gap-2">
                <span className="text-brand-accent">05</span> Target Occasion
              </h2>
              <p className="text-sm md:text-base text-brand-ink/60">What are we dressing for today?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {OCCASIONS.map(occ => (
                <button
                  key={occ}
                  onClick={() => setFormData({ ...formData, occasion: occ })}
                  className={`px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm transition-all shadow-sm ${
                    formData.occasion === occ
                      ? 'bg-brand-secondary text-white scale-102 sm:scale-105'
                      : 'bg-white border-2 border-brand-secondary/10 text-brand-primary'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 md:mt-12 flex items-center justify-between gap-4">
        {step > 1 ? (
          <button 
            onClick={prevStep}
            className="flex items-center gap-1 md:gap-2 px-4 md:px-8 py-3 md:py-4 text-brand-primary font-black uppercase text-[10px] md:text-sm tracking-widest hover:text-brand-accent transition-colors"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            Back
          </button>
        ) : <div />}

        {step < 5 ? (
          <button 
            onClick={nextStep}
            className="flex items-center gap-1 md:gap-2 px-6 md:px-10 py-3 md:py-4 bg-brand-primary text-white rounded-full hover:bg-brand-accent transition-all font-black uppercase text-[10px] md:text-sm tracking-widest shadow-xl shadow-brand-primary/20"
          >
            Next
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        ) : (
          <button 
            onClick={() => onComplete(formData)}
            className="flex items-center gap-1 md:gap-2 px-6 md:px-10 py-3 md:py-4 bg-brand-accent text-white rounded-full hover:scale-105 active:scale-95 transition-all font-black uppercase text-[10px] md:text-sm tracking-widest shadow-xl shadow-brand-accent/30"
          >
            Reveal
            <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
