import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import HorasGuide from './components/HorasGuide';
import StyleWizard from './components/StyleWizard';
import RecommendationCard from './components/RecommendationCard';
import StyleLibrary from './components/StyleLibrary';
import { UserProfile, Recommendation, getStylingRecommendation } from './services/geminiService';

type ViewState = 'welcome' | 'wizard' | 'loading' | 'results';

export default function App() {
  const [view, setView] = useState<ViewState>('welcome');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const startJourney = () => setView('wizard');

  const handleComplete = async (userProfile: UserProfile) => {
    setProfile(userProfile);
    setView('loading');
    try {
      const result = await getStylingRecommendation(userProfile);
      setRecommendation(result);
      setView('results');
    } catch (err) {
      console.error(err);
      setView('wizard'); // Fallback
    }
  };

  const handleReset = () => {
    setProfile(null);
    setRecommendation(null);
    setView('welcome');
  };

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-brand-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-4 md:p-8 flex justify-between items-center bg-brand-muted/80 backdrop-blur-md">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-accent rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
          <h1 className="font-display font-black text-xl md:text-3xl tracking-tight text-brand-primary">STYLEBUDDY</h1>
        </div>
        <nav className="flex gap-2">
          <button 
            onClick={startJourney}
            className="px-4 py-2 md:px-6 md:py-2 rounded-full bg-brand-primary text-white text-xs md:text-base font-bold shadow-md hover:scale-105 transition-transform"
          >
            Analyze Me
          </button>
          <button className="hidden sm:block px-6 py-2 rounded-full bg-white border-2 border-gray-100 font-bold text-gray-400">Collection</button>
        </nav>
      </nav>

      <main className="pt-24 md:pt-32 pb-24 px-4 md:px-6 container mx-auto">
        <AnimatePresence mode="wait">
          {view === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="max-w-4xl w-full">
                <HorasGuide context="a user who just opened the app for the first time" />
                
                <div className="text-center mt-12 md:mt-20 space-y-6 md:space-y-8">
                  <h1 className="text-[14vw] md:text-8xl font-display font-black leading-[0.9] text-brand-primary tracking-tighter">
                    Crafting your <br />
                    <span className="text-brand-accent italic">perfect identity.</span>
                  </h1>
                  <p className="max-w-xl mx-auto text-lg md:text-xl text-brand-ink/60 font-medium px-4">
                    An AI-led styling experience that understands your body, 
                    respects your choices, and polishes your presence.
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startJourney}
                    className="group relative inline-flex items-center gap-4 px-8 py-5 md:px-12 md:py-6 bg-brand-primary text-white rounded-[32px] md:rounded-[40px] text-lg md:text-xl font-bold overflow-hidden shadow-2xl shadow-brand-primary/20"
                  >
                    <span className="relative z-10">Begin Style Journey</span>
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                    <div className="absolute inset-0 bg-brand-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </motion.button>
                </div>
                  <div className="pt-24 md:pt-32 w-full">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2 mb-10 md:mb-16">
                      <div>
                        <h3 className="text-3xl md:text-5xl font-display font-black text-brand-primary tracking-tight">Curated Trends</h3>
                        <p className="text-brand-ink/60 font-medium mt-2">Real-world inspirations for your journey.</p>
                      </div>
                      <p className="text-[10px] font-black tracking-[0.3em] text-brand-accent uppercase bg-brand-accent/10 px-4 py-2 rounded-full w-fit">Horas Collection 2024</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                      {[
                        { id: '1483985988355-763728e1935b', name: 'Milan Street' },
                        { id: '1490481651871-ab68de25d43d', name: 'Parisian Chic' },
                        { id: '1539106602058-637ca670ff4c', name: 'Modern Tailor' },
                        { id: '1521335629791-ce4aec67dd15', name: 'Luxe Minimal' }
                      ].map((img, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i }}
                          whileHover={{ y: -10 }}
                          className={`group relative aspect-[10/14] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl bg-brand-light-accent/20 ${i % 2 === 1 ? 'md:translate-y-12' : ''}`}
                        >
                          <img 
                            src={`https://images.unsplash.com/photo-${img.id}?auto=format&fit=crop&q=80&w=800`} 
                            alt={img.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1515886657611-283d200fb3e7?auto=format&fit=crop&q=80&w=800';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                            <span className="text-white font-black text-[10px] uppercase tracking-widest bg-brand-accent px-3 py-1 rounded-full w-fit mb-2">{img.name}</span>
                            <p className="text-white/80 text-xs font-bold leading-tight">View matching silhouettes</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
              </div>

              <div className="w-full mt-32">
                <StyleLibrary />
              </div>
            </motion.div>
          )}

          {view === 'wizard' && (
            <motion.div
              key="wizard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HorasGuide context="explaining the questionnaire to the user" />
              <StyleWizard onComplete={handleComplete} />
            </motion.div>
          )}

          {view === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[50vh]"
            >
              <HorasGuide context="analyzing data" isThinking />
              <div className="mt-12 w-64 h-1 bg-brand-primary/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-brand-accent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </div>
            </motion.div>
          )}

          {view === 'results' && recommendation && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HorasGuide context="presenting styling recommendations" />
              <RecommendationCard data={recommendation} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-primary/5 py-12 px-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium text-brand-primary/40 gap-6">
        <p>© 2026 HORAS STYLIST. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8 uppercase tracking-widest">
          <a href="#" className="hover:text-brand-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
