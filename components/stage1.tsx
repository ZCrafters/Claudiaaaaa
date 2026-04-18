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
        setTimeout(() => {
          setShake(false);
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
    <div className={`stage-shell flex flex-col items-center justify-center transition-all ${shake ? 'shake' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl" style={{ background: 'rgba(250,204,21,0.04)' }} />
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

      <div className="stage-content max-w-3xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center sm:mb-8"
        >
          <h1 className="stage-title mb-4">
            STAGE 1 — Arah yang Hilang
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto max-w-md text-center text-sm leading-relaxed text-yellow-200/75 sm:text-base"
          >
            Tidak semua arah membawa terang. Susun kata yang membentuk jalan menuju masa depan.
          </motion.p>
        </motion.div>

        {/* Word Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-7 flex min-h-[5rem] flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {availableWords.map((word, idx) => (
            <motion.button
              key={word}
              onClick={() => handleWordClick(word)}
              className="cursor-pointer rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4 text-base font-bold tracking-wider text-slate-900 shadow-lg transition-all duration-200 hover:from-yellow-400 hover:to-yellow-500 sm:px-7 sm:py-4 sm:text-lg"
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.94 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + idx * 0.07 }}
            >
              {word}
            </motion.button>
          ))}
          {availableWords.length === 0 && !isCorrect && (
            <span className="text-xs text-yellow-300/40 italic">Semua kata sudah dipilih</span>
          )}
        </motion.div>

        {/* Drop Zone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-5 rounded-2xl border-2 border-yellow-400/30 bg-slate-800/40 p-4 backdrop-blur-sm sm:p-6"
        >
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-yellow-400/50 sm:mb-4">
            Urutan kata
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {Array.from({ length: NUM_SLOTS }).map((_, idx) => (
              <motion.div
                key={idx}
                className="flex min-h-[4.5rem] items-center justify-center rounded-xl border-2 border-dashed bg-slate-900/50 p-1 sm:min-h-[5.5rem]"
                animate={{
                  borderColor:
                    selectedWords[idx] && selectedWords[idx] === CORRECT_ORDER[idx]
                      ? 'rgba(34, 197, 94, 0.7)'
                      : selectedWords[idx]
                      ? 'rgba(250, 204, 21, 0.55)'
                      : 'rgba(253, 224, 71, 0.2)',
                  backgroundColor:
                    selectedWords[idx] && selectedWords[idx] === CORRECT_ORDER[idx]
                      ? 'rgba(34, 197, 94, 0.08)'
                      : 'rgba(0,0,0,0)',
                }}
              >
                {selectedWords[idx] ? (
                  <motion.button
                    onClick={() => handleRemoveWord(idx)}
                    className="w-full rounded-lg bg-yellow-500 px-2 py-2 text-xs font-bold text-slate-900 transition-colors hover:bg-yellow-400 sm:text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    {selectedWords[idx]}
                  </motion.button>
                ) : (
                  <span className="select-none text-xs text-yellow-300/25">
                    {idx + 1}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Helper text */}
        {!isCorrect && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mb-4 text-center text-xs text-yellow-300/35"
          >
            Klik kata untuk memilih · Klik slot untuk mengembalikan
          </motion.p>
        )}

        {/* Success + Clue */}
        <AnimatePresence>
          {isCorrect && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div className="mb-6">
                <div className="inline-block rounded-xl border border-green-500 bg-green-500/20 px-6 py-3">
                  <p className="text-lg font-bold text-green-300">✓ Benar!</p>
                </div>
              </motion.div>

              {showClue && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <p className="mb-8 text-base italic leading-relaxed text-yellow-200 sm:text-lg">
                    Ada seseorang yang sudah tahu jalan itu sejak awal…
                  </p>
                  <motion.button
                    onClick={() => setCurrentStage('stage2')}
                    className="stage-button text-base sm:text-lg"
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
