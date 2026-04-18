'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useGame } from '@/app/game-context';

const WORDS = ['TIMUR', 'GELAP', 'TERANG', 'HARAPAN', 'JALAN', 'MASA DEPAN'];
const CORRECT_ORDER = ['JALAN', 'TERANG', 'MASA DEPAN', 'HARAPAN'];
const NUM_SLOTS = 4;

export function Stage1() {
  const { setCurrentStage, addCompletedStage } = useGame();
  const [availableWords, setAvailableWords] = useState(WORDS);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (selectedWords.length === NUM_SLOTS) {
      const isCurrentCorrect = selectedWords.every(
        (word, idx) => word === CORRECT_ORDER[idx]
      );
      if (isCurrentCorrect) {
        setIsCorrect(true);
        addCompletedStage('stage1');
        playSuccessSound();
        setTimeout(() => setShowClue(true), 600);
      } else {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        // Remove last word and mark error
        setTimeout(() => {
          setSelectedWords(selectedWords.slice(0, -1));
          setAvailableWords([...availableWords, selectedWords[selectedWords.length - 1]]);
        }, 500);
      }
    }
  }, [selectedWords]);

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

  const handleWordClick = (word: string) => {
    if (isCorrect) return;
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((w) => w !== word));
  };

  const handleRemoveWord = (index: number) => {
    const word = selectedWords[index];
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
    setAvailableWords([...availableWords, word]);
  };

  return (
    <div className={`relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden transition-all py-8 sm:py-12 px-4 sm:px-6 ${shake ? 'shake' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 sm:w-96 h-64 sm:h-96 bg-yellow-400/3 rounded-full blur-3xl" />
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
          initial={{ width: '5%' }}
          animate={{ width: '35%' }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-yellow-100 mb-2 sm:mb-4">
            STAGE 1 — Arah yang Hilang
          </h1>
        </motion.div>

        {/* Instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-yellow-200/80 text-sm sm:text-base md:text-lg mb-8 sm:mb-12 px-4"
        >
          Tidak semua arah membawa terang. Susun kata yang membentuk jalan menuju masa depan.
        </motion.p>

        {/* Word Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-12"
        >
          {availableWords.map((word, idx) => (
            <motion.button
              key={word}
              onClick={() => handleWordClick(word)}
              className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 font-bold text-xs sm:text-sm rounded-lg transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
            >
              {word}
            </motion.button>
          ))}
        </motion.div>

        {/* Drop Zone */}
        <div className="bg-slate-800/50 border-2 border-yellow-400/50 rounded-lg p-4 sm:p-8 mb-6 sm:mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {Array.from({ length: NUM_SLOTS }).map((_, idx) => (
              <motion.div
                key={idx}
                className="aspect-square bg-slate-900/50 border-2 border-dashed border-yellow-300/50 rounded-lg flex items-center justify-center min-h-12 sm:min-h-16 relative"
                animate={{
                  borderColor:
                    selectedWords[idx] && selectedWords[idx] === CORRECT_ORDER[idx]
                      ? 'rgba(34, 197, 94, 0.7)'
                      : 'rgba(253, 224, 71, 0.5)',
                }}
              >
                {selectedWords[idx] ? (
                  <motion.button
                    onClick={() => handleRemoveWord(idx)}
                    className="px-2 sm:px-3 py-1 sm:py-2 bg-yellow-500 text-slate-900 font-bold rounded text-xs sm:text-sm cursor-pointer hover:bg-yellow-400 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    {selectedWords[idx]}
                  </motion.button>
                ) : (
                  <span className="text-yellow-300/50 text-xs">Slot {idx + 1}</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success Message and Clue */}
        <AnimatePresence>
          {isCorrect && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div className="mb-6">
                <div className="inline-block px-6 py-3 bg-green-500/20 border border-green-500 rounded-lg">
                  <p className="text-green-300 font-bold">Benar!</p>
                </div>
              </motion.div>

              {showClue && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <p className="text-yellow-200 italic mb-8">
                    Ada seseorang yang sudah tahu jalan itu sejak awal…
                  </p>
                  <motion.button
                    onClick={() => setCurrentStage('stage2')}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-slate-900 font-bold text-lg rounded-lg shadow-2xl"
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
