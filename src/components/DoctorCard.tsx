import { motion } from 'framer-motion';
import { Phone, PhoneOff, Star, Clock, Award } from 'lucide-react';
import { cn } from '../lib/utils';

interface DoctorCardProps {
  doctor: {
    id: number;
    name: string;
    specialty: string;
    image: string;
    isOnline: boolean;
  };
  onCall: (id: number) => void;
}

export function DoctorCard({ doctor, onCall }: DoctorCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl",
        "border border-white/20 p-6",
        "transition-all duration-300",
        "group"
      )}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={false}
      />

      <motion.div
        initial={false}
        animate={{ scale: doctor.isOnline ? 1 : 0.98, opacity: doctor.isOnline ? 1 : 0.8 }}
        className="relative z-10"
      >
        <div className="absolute right-0 top-0 flex items-center gap-2">
          {/* <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-lg"> */}
            <span className="text-xs font-small text-white/80">
              {doctor.isOnline ? 'Available Now' : 'Offline'}
            </span>
            <span className={cn(
              "flex h-3 w-3 rounded-full",
              doctor.isOnline ? "bg-emerald-500" : "bg-red-500"
            )} />
          {/* </div> */}
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <div className="relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-24 w-24 rounded-xl object-cover shadow-lg ring-2 ring-white/20"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 rounded-xl ring-2 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              />
            </div>
            {doctor.isOnline && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-2 -top-2"
              >
                <div className="relative">
                  <Award className="h-6 w-6 text-emerald-400" fill="currentColor" />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 text-emerald-400 blur-sm"
                  >
                    <Award className="h-6 w-6" fill="currentColor" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
          <div className="flex-1">
            <motion.h3
              layout
              className="text-xl font-semibold text-white"
            >
              {doctor.name}
            </motion.h3>
            <motion.p
              layout
              className="text-sm text-emerald-400 font-medium"
            >
              {doctor.specialty}
            </motion.p>
            <motion.div layout className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star
                      className="h-4 w-4"
                      fill={i < 4 ? "currentColor" : "none"}
                      color={i < 4 ? "#34D399" : "#6B7280"}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                <span>Available 24/7</span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCall(doctor.id)}
          disabled={!doctor.isOnline}
          className={cn(
            "mt-6 w-full rounded-xl px-4 py-3",
            "flex items-center justify-center gap-2",
            "text-sm font-medium transition-all duration-300",
            doctor.isOnline
              ? "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-emerald-500/25"
              : "bg-gray-600/50 cursor-not-allowed text-gray-300"
          )}
        >
          {doctor.isOnline ? (
            <>
              <Phone className="h-4 w-4" />
              Start Consultation
            </>
          ) : (
            <>
              <PhoneOff className="h-4 w-4" />
              Currently Unavailable
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}