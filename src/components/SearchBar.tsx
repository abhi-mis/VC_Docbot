import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-xs group"
    >
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-emerald-500/10 blur-sm"
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <motion.div
          animate={{
            rotate: value ? [0, 360] : 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <Search className="h-4 w-4 text-emerald-400/50" />
        </motion.div>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className="w-full rounded-full bg-transparent py-2 pl-9 pr-3 text-sm text-white/90 
                 transition-all duration-300
                 border border-emerald-500/20
                 focus:border-emerald-500/40 focus:outline-none focus:ring-0
                 placeholder:text-emerald-500/30"
      />
      {value && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange('')}
            className="rounded-full p-1 hover:bg-emerald-500/10"
          >
            <svg className="h-3 w-3 text-emerald-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}