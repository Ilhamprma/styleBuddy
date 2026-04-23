import { motion } from 'motion/react';
import { Search, Filter } from 'lucide-react';

const LIBRARY_ITEMS = [
  { id: 1, name: 'Parisian Chic', category: 'Casual', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Urban Techwear', category: 'Streetwear', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Minimalist Workwear', category: 'Formal', image: 'https://images.unsplash.com/photo-1492211517036-7c980a37549c?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Sustainable Linen', category: 'Casual', image: 'https://images.unsplash.com/photo-1539109132314-d49c02d70165?auto=format&fit=crop&q=80&w=800' },
  { id: 5, name: 'Bespoke Tailoring', category: 'Formal', image: 'https://images.unsplash.com/photo-1594932224010-75f2a77bd5fa?auto=format&fit=crop&q=80&w=800' },
  { id: 6, name: 'Street Avant-Garde', category: 'Streetwear', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800' },
];

export default function StyleLibrary() {
  return (
    <div className="space-y-12 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-2">
          <h2 className="text-5xl font-serif">Style Library</h2>
          <p className="text-brand-primary/60">Explore curated aesthetics from around the globe.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary/30" />
            <input 
              type="text" 
              placeholder="Search aesthetics..." 
              className="pl-12 pr-6 py-3 bg-white border-2 border-brand-light-accent rounded-full outline-none focus:border-brand-primary transition-colors font-bold"
            />
          </div>
          <button className="p-3 bg-brand-primary text-white rounded-full hover:bg-brand-accent transition-colors shadow-lg">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {LIBRARY_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden mb-6 relative border-4 border-transparent group-hover:border-brand-accent transition-colors">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 bg-brand-primary text-white backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest">
                  {item.category}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-brand-primary group-hover:text-brand-accent transition-colors">{item.name}</h3>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Explore Collection →</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
