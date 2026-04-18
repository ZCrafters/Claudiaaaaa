'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGame } from '@/app/game-context';

export function LandingStage() {
  const { setCurrentStage, orbClickCount, incrementOrbClick } = useGame();
  const [showButton, setShowButton] = useState(false);
  const [hiddenMessage, setHiddenMessage] = useState(false);

  useEffect(() => {
    // Show button after 2 seconds
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (orbClickCount === 5) {
      setHiddenMessage(true);
      setTimeout(() => setHiddenMessage(false), 2000);
    }
  }, [orbClickCount]);

  const handleOrbClick = () => {
    incrementOrbClick();
  };

  return (
    <div className="stage-shell flex items-center justify-center">
      {/* Glowing gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />

      {/* Central glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="stage-content flex flex-col items-center justify-center text-center">
        {/* Glowing Orb */}
        <motion.div
          className="relative mb-8 sm:mb-12 cursor-pointer"
          onClick={handleOrbClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-2xl"
            animate={{
              boxShadow: [
                '0 0 60px 20px rgba(250, 204, 21, 0.3)',
                '0 0 80px 30px rgba(250, 204, 21, 0.5)',
                '0 0 60px 20px rgba(250, 204, 21, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-white/10 opacity-50"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Main text - word by word animation */}
        <div className="mb-8 flex min-h-16 items-center justify-center sm:mb-12 sm:h-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="px-3 font-serif text-xl leading-snug text-yellow-100 sm:px-4 sm:text-2xl md:text-3xl lg:text-4xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.6 }}
            >
              Ada{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              sesuatu{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              yang{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              ingin{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              aku{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
            >
              tunjukkan{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
            >
              padamu…
            </motion.span>
          </motion.div>
        </div>

        {/* Start Button */}
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            onClick={() => setCurrentStage('stage1')}
            className="stage-button text-sm tracking-wide sm:text-lg"
            whileHover={{
              boxShadow: '0 0 30px rgba(250, 204, 21, 0.6)',
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Mulai Perjalananmu →
          </motion.button>
        )}

        {/* Hidden Easter Egg Message */}
        {hiddenMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-12 px-4 text-xs italic leading-relaxed text-yellow-200 sm:bottom-16 sm:text-sm"
          >
            Kamu sudah dekat… terus melangkah.
          </motion.div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
          initial={{ width: 0 }}
          animate={{ width: '5%' }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
