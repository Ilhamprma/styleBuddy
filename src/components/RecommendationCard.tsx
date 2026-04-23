import { motion } from 'motion/react';
import { Recommendation } from '@/src/services/geminiService';
import { CheckCircle2, XCircle, Info, RefreshCcw } from 'lucide-react';

interface RecommendationCardProps {
  data: Recommendation;
  onReset: () => void;
}

export default function RecommendationCard({ data, onReset }: RecommendationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-12"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl font-display font-black text-brand-primary tracking-tighter">{data.title}</h2>
        <p className="text-lg md:text-xl text-brand-ink/60 max-w-2xl mx-auto font-medium">{data.analysis}</p>
        
        {/* Color Advice Section */}
        <div className="mt-8 p-6 bg-brand-light-accent/20 rounded-[24px] md:rounded-[32px] border-2 border-brand-light-accent inline-block">
          <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-brand-accent mb-2">Color Palette Harmony</h4>
          <p className="text-xs md:text-sm font-bold text-brand-primary leading-relaxed">{data.colorAdvice}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="p-6 md:p-8 bg-white rounded-[32px] md:rounded-[40px] shadow-xl border-4 border-brand-light-accent space-y-6">
          <h3 className="flex items-center gap-2 text-lg md:text-xl font-black uppercase tracking-widest text-brand-secondary">
            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
            Style Strengths
          </h3>
          <ul className="space-y-4 text-sm md:text-base">
            {data.doList.map((item, i) => (
              <li key={i} className="flex gap-3 text-brand-ink/80 font-bold">
                <span className="shrink-0 w-6 h-6 rounded-full bg-brand-secondary/10 text-brand-secondary flex items-center justify-center text-[10px] md:text-xs font-black">{i+1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 md:p-8 bg-white rounded-[32px] md:rounded-[40px] shadow-xl border-4 border-brand-light-accent space-y-6">
          <h3 className="flex items-center gap-2 text-lg md:text-xl font-black uppercase tracking-widest text-brand-accent">
            <XCircle className="w-5 h-5 md:w-6 md:h-6" />
            Consider Avoiding
          </h3>
          <ul className="space-y-4 text-sm md:text-base">
            {data.dontList.map((item, i) => (
              <li key={i} className="flex gap-3 text-brand-ink/80 font-bold">
                <span className="shrink-0 w-6 h-6 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center text-[10px] md:text-xs font-black">{i+1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-6 md:space-y-8 bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-xl border-4 border-brand-light-accent">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-brand-primary uppercase tracking-tight">Suggested Pieces</h2>
          <span className="text-xs md:text-sm font-bold text-gray-400">Match Results</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {data.suggestedPieces.map((piece, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="group relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden bg-brand-light-accent/20 border-2 border-transparent hover:border-brand-accent transition-all duration-300"
            >
              <img 
                src={`https://loremflickr.com/600/800/fashion,clothing,${encodeURIComponent(piece)}/all`}
                alt={piece}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('images.unsplash.com')) {
                    target.src = 'https://images.unsplash.com/photo-1515886657611-283d200fb3e7?auto=format&fit=crop&q=80&w=800';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 to-transparent flex items-end p-4 md:p-6">
                <span className="text-white font-black text-[10px] md:text-xs uppercase tracking-widest">{piece}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Polite Feedback Area */}
        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-brand-muted rounded-[24px] md:rounded-3xl flex flex-col sm:flex-row items-center gap-4 border-2 border-brand-light-accent">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-accent flex-shrink-0 flex items-center justify-center text-white shadow-lg">
            <Info className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <p className="text-xs md:text-sm text-[#825341] leading-snug text-center sm:text-left">
            <strong className="text-brand-primary font-black uppercase tracking-wider text-[10px] md:text-xs">Friendly Note:</strong> We've optimized these recommendations to ensure you feel light and comfortable while maintaining your unique aesthetic!
          </p>
        </div>
      </div>

      <div className="p-10 bg-brand-primary text-white rounded-[4rem] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
          <Info className="w-32 h-32" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-4 block">Horas' Note</span>
          <p className="text-2xl font-serif italic mb-8">"{data.horasComment}"</p>
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 bg-white text-brand-primary rounded-full font-bold hover:bg-brand-accent transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            Start Over
          </button>
        </div>
      </div>
    </motion.div>
  );
}
