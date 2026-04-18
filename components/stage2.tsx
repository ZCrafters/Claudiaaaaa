'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useGame } from '@/app/game-context';

const CORRECT_ANSWER = 'tuhan';
const VERSE_PARTIAL =
  'Sebab Aku ini mengetahui rancangan-rancangan…';

export function Stage2() {
  const { setCurrentStage, addCompletedStage } = useGame();
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showVerse, setShowVerse] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    const answer = input.toLowerCase().trim();
    if (answer === CORRECT_ANSWER) {
      setIsCorrect(true);
      addCompletedStage('stage2');
      playSuccessSound();
      setTimeout(() => setShowVerse(true), 600);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setInput('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const playSuccessSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={`stage-shell flex flex-col items-center justify-center transition-all ${shake ? 'shake' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl" />
      </div>

      {/* Flash effect on correct answer */}
      {isCorrect && (
        <motion.div
          className="absolute inset-0 bg-yellow-400/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.6 }}
        />
      )}

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
          initial={{ width: '35%' }}
          animate={{ width: '65%' }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="stage-content max-w-2xl px-2 sm:px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12"
        >
          <h1 className="stage-title mb-4">
            STAGE 2 — Siapa yang Tahu?
          </h1>
        </motion.div>

        {/* Atmospheric Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-10 space-y-4 text-center sm:mb-12"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="stage-lead text-base sm:text-lg"
          >
            Dia tahu sebelum kamu tahu.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="stage-lead text-base sm:text-lg"
          >
            Dia melihat sebelum kamu berjalan.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="font-serif text-xl leading-snug text-yellow-100 sm:text-2xl"
          >
            Siapakah Dia?
          </motion.p>
        </motion.div>

        {/* Input Field */}
        {!isCorrect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mb-8"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tulis jawabanmu…"
               className="w-full rounded-lg border-2 border-yellow-400 bg-slate-800/50 px-6 py-4 text-center text-base leading-relaxed text-yellow-100 placeholder-yellow-300/50 transition-all focus:border-yellow-300 focus:bg-slate-800/70 focus:outline-none sm:text-lg"
               autoFocus
             />
             <motion.button
               onClick={handleSubmit}
               disabled={isCorrect}
               className="stage-button mt-4 w-full disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Kirim
            </motion.button>
          </motion.div>
        )}

        {/* Correct Answer State */}
        <AnimatePresence>
          {isCorrect && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div className="mb-8">
                <div className="inline-block px-6 py-3 bg-green-500/20 border border-green-500 rounded-lg">
                  <p className="text-green-300 font-bold">Benar!</p>
                </div>
              </motion.div>

              {showVerse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                   <motion.div className="mb-8 font-serif text-lg italic leading-relaxed text-yellow-100 sm:text-xl">
                    {VERSE_PARTIAL.split('').map((char, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 3 }}
                     className="mb-8 text-yellow-300/50"
                  >
                    (Pesan belum lengkap...)
                  </motion.p>

                  <motion.button
                    onClick={() => setCurrentStage('stage3')}
                     className="stage-button text-lg"
                    whileHover={{
                      boxShadow: '0 0 30px rgba(250, 204, 21, 0.6)',
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Lanjut →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
