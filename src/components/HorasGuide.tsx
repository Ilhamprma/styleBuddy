import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getHorasGreeting } from '@/src/services/geminiService';

interface HorasGuideProps {
  context: string;
  isThinking?: boolean;
}

export default function HorasGuide({ context, isThinking }: HorasGuideProps) {
  const [greeting, setGreeting] = useState("Hello! I'm Horas, your personal style guide.");

  useEffect(() => {
    async function loadGreeting() {
      try {
        const text = await getHorasGreeting(context);
        setGreeting(text);
      } catch (err) {
        console.error(err);
      }
    }
    loadGreeting();
  }, [context]);

  return (
    <div className="relative flex items-center gap-6 p-6 bg-brand-primary rounded-[40px] shadow-xl">
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shrink-0 shadow-inner border-4 border-brand-accent overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#FFF9F2] opacity-50" />
        <motion.div 
          animate={{ scale: isThinking ? [1, 1.2, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="relative z-10"
        >
          {/* Simple Vector Representation of Horas as in design */}
          <svg viewBox="0 0 100 100" className="w-16 h-16">
            <circle cx="50" cy="50" r="45" fill="#FFF9F2" />
            <circle cx="35" cy="45" r="5" fill="#297373" />
            <circle cx="65" cy="45" r="5" fill="#297373" />
            <path d="M35 70 Q50 85 65 70" stroke="#FF8552" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M20 25 Q35 15 50 25" stroke="#FF8552" strokeWidth="5" fill="none" />
          </svg>
        </motion.div>
      </motion.div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-black text-brand-light-accent">Horas says...</span>
          {isThinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-1"
            >
              <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
              <div className="w-1 h-1 bg-white rounded-full animate-bounce delay-75" />
              <div className="w-1 h-1 bg-white rounded-full animate-bounce delay-150" />
            </motion.div>
          )}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={greeting}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-white text-sm font-medium leading-relaxed"
          >
            {isThinking ? "Just a moment, I'm analyzing your perfect look..." : `"${greeting}"`}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-brand-accent rotate-45 rounded-sm" />
    </div>
  );
}
