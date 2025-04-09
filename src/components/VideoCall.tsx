import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mic, MicOff, Video, VideoOff, Bot } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

interface VideoCallProps {
  doctorId: number | null;
  onEnd: () => void;
}

export function VideoCall({ doctorId, onEnd }: VideoCallProps) {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isConnecting, setIsConnecting] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (doctorId) {
      const interval = setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);

      // Initialize camera
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setTimeout(() => setIsConnecting(false), 2000); // Simulate connection delay
        })
        .catch(err => console.error('Error accessing camera:', err));

      return () => {
        clearInterval(interval);
        // Clean up video stream
        if (videoRef.current?.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [doctorId]);

  if (!doctorId) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black"
      >
        <div className="relative h-full w-full">
          {/* Remote Video (Full Screen) */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
            {isConnecting ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              >
                <Bot className="w-16 h-16 text-emerald-400 animate-bounce" />
                <span className="text-2xl text-white/80">Connecting to your doctor...</span>
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl text-white/80">Doctor's video will appear here</span>
              </div>
            )}
          </div>

          {/* Local Video (Picture-in-Picture) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute bottom-24 right-4 h-48 w-32 overflow-hidden rounded-2xl bg-gray-800 shadow-xl ring-2 ring-emerald-500/50"
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
            />
            {!isVideoEnabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90">
                <VideoOff className="h-8 w-8 text-white/80" />
              </div>
            )}
          </motion.div>

          {/* Call Duration */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-4 top-4 rounded-full bg-black/40 px-4 py-2 backdrop-blur-sm ring-1 ring-white/10"
          >
            <span className="text-sm font-medium text-white">
              {format(duration * 1000, 'mm:ss')}
            </span>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 bg-gradient-to-t from-black p-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMuted(!isMuted)}
              className={cn(
                "rounded-full p-4 transition-colors ring-1 ring-white/20",
                isMuted ? "bg-red-600" : "bg-white/10 hover:bg-white/20"
              )}
            >
              {isMuted ? (
                <MicOff className="h-6 w-6 text-white" />
              ) : (
                <Mic className="h-6 w-6 text-white" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEnd}
              className="rounded-full bg-red-600 p-6 transition-transform hover:bg-red-700 ring-2 ring-red-500/50"
            >
              <Phone className="h-6 w-6 text-white" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              className={cn(
                "rounded-full p-4 transition-colors ring-1 ring-white/20",
                !isVideoEnabled ? "bg-red-600" : "bg-white/10 hover:bg-white/20"
              )}
            >
              {isVideoEnabled ? (
                <Video className="h-6 w-6 text-white" />
              ) : (
                <VideoOff className="h-6 w-6 text-white" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}