'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useGame } from '@/app/game-context';

const CORRECT_ANSWER = 'yeremia';
const COORDINATES = '29 : 11';

export function Stage3() {
  const { setCurrentStage, addCompletedStage } = useGame();
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCinematicTransition, setShowCinematicTransition] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    const answer = input.toLowerCase().trim();
    if (answer === CORRECT_ANSWER || answer === 'jeremiah') {
      setIsCorrect(true);
      addCompletedStage('stage3');
      playSuccessSound();
      setTimeout(() => setShowCinematicTransition(true), 600);
      setTimeout(() => setCurrentStage('final'), 2000);
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
    <div className={`relative w-full h-screen flex flex-col items-center justify-center overflow-hidden transition-all ${shake ? 'shake' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl" />
      </div>

      {/* Flash effect on correct answer */}
      {isCorrect && (
        <motion.div
          className="absolute inset-0 bg-yellow-400/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.6 }}
          pointerEvents="none"
        />
      )}

      {/* Cinematic transition to final stage */}
      {showCinematicTransition && (
        <motion.div
          className="absolute inset-0 bg-yellow-400/40 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
      )}

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
          initial={{ width: '65%' }}
          animate={{ width: '95%' }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-serif text-yellow-100 mb-4">
            STAGE 3 — Koordinat Harapan
          </h1>
        </motion.div>

        {/* Giant Glowing Numbers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex justify-center items-center gap-8 mb-12"
        >
          <motion.div
            className="text-6xl md:text-7xl font-serif text-yellow-300 font-bold"
            animate={{
              textShadow: [
                '0 0 30px rgba(253, 224, 71, 0.5)',
                '0 0 50px rgba(253, 224, 71, 0.8)',
                '0 0 30px rgba(253, 224, 71, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {COORDINATES}
          </motion.div>
        </motion.div>

        {/* Clue Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-yellow-200/80 text-lg mb-12"
        >
          Ini bukan angka biasa. Ini adalah koordinat harapan. Di mana kamu menemukannya?
        </motion.p>

        {/* Input Field */}
        {!isCorrect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mb-8"
          >
            <label className="block text-yellow-200 text-center mb-4 font-serif">
              Buku apa? (nama kitab)
            </label>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tulis jawabanmu…"
              className="w-full px-6 py-4 bg-slate-800/50 border-2 border-yellow-400 text-yellow-100 placeholder-yellow-300/50 rounded-lg text-center text-lg focus:outline-none focus:border-yellow-300 focus:bg-slate-800/70 transition-all"
              autoFocus
            />
            <motion.button
              onClick={handleSubmit}
              disabled={isCorrect}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-slate-900 font-bold rounded-lg shadow-2xl disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Kirim
            </motion.button>
          </motion.div>
        )}

        {/* Correct Answer State */}
        <AnimatePresence>
          {isCorrect && !showCinematicTransition && (
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <p className="text-yellow-200 text-lg mb-4">
                  Menghubungkan semua harapan…
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
