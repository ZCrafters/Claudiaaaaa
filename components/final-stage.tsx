'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useGame } from '@/app/game-context';
import { FlowerAnimation } from './flower-animation';

const FULL_VERSE = `Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.`;
const VERSE_REFERENCE = 'Yeremia 29:11';
const PERSONAL_MESSAGE = 'Dan aku percaya, kamu adalah bagian dari hari depan itu yang ingin aku jalani bersamamu. Mau nggak, jadi bagian dari perjalananku?';
const SURPRISE_MESSAGE = 'Ada yang mau aku tunjukkin ke kamu…';

export function FinalStage() {
  const { setCurrentStage } = useGame();
  const [showVerse, setShowVerse] = useState(false);
  const [showDivider, setShowDivider] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showSurpriseMessage, setShowSurpriseMessage] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [showFlowers, setShowFlowers] = useState(false);

  useEffect(() => {
    const verseTimer = setTimeout(() => setShowVerse(true), 500);
    const dividerTimer = setTimeout(() => setShowDivider(true), FULL_VERSE.length * 50 + 1000);
    const messageTimer = setTimeout(() => setShowMessage(true), FULL_VERSE.length * 50 + 2000);
    const surpriseTimer = setTimeout(() => {
      triggerConfetti();
      setShowSurpriseMessage(true);
    }, FULL_VERSE.length * 50 + 3500);

    return () => {
      clearTimeout(verseTimer);
      clearTimeout(dividerTimer);
      clearTimeout(messageTimer);
      clearTimeout(surpriseTimer);
    };
  }, []);

  const handleSurpriseClick = () => {
    setShowFlowers(true);
  };

  const triggerConfetti = () => {
    const newConfetti = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setConfetti(newConfetti);

    // Play chime sound
    playChimeSound();

    setTimeout(() => setConfetti([]), 3000);
  };

  const playChimeSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 (C major chord)

    notes.forEach((freq, i) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);

      oscillator.start(audioContext.currentTime + i * 0.05);
      oscillator.stop(audioContext.currentTime + 0.8);
    });
  };



  // Show flower animation if triggered
  if (showFlowers) {
    return <FlowerAnimation />;
  }

  return (
    <div className="stage-shell flex flex-col items-center justify-center">
      {/* Animated gold gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-slate-950 to-black"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Confetti pieces */}
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          initial={{ x: `${piece.x}%`, y: `${piece.y}%`, opacity: 1 }}
          animate={{
            x: `${piece.x + (Math.random() - 0.5) * 100}%`,
            y: window.innerHeight + 50,
            opacity: 0,
          }}
          transition={{ duration: 2, ease: 'easeIn' }}
          style={{ pointerEvents: 'none' }}
        />
      ))}

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
          initial={{ width: '95%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="stage-content max-w-2xl px-2 sm:px-4">
        {/* The Verse */}
        {showVerse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-12 text-center"
          >
            <div className="mb-4 font-serif text-lg leading-relaxed text-yellow-100 sm:mb-6 sm:text-2xl md:text-3xl">
              {FULL_VERSE.split('').map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <p className="font-serif italic leading-relaxed text-yellow-200/80">— {VERSE_REFERENCE}</p>
          </motion.div>
        )}

        {/* Divider Line */}
        {showDivider && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent my-8 sm:my-12"
            style={{ originX: 0.5 }}
          />
        )}

        {/* Personal Message */}
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="mx-auto max-w-2xl text-base leading-relaxed text-yellow-100 sm:text-xl md:text-2xl">
              {PERSONAL_MESSAGE.split('').map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.02 }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Surprise Message */}
        {showSurpriseMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-8 sm:mt-12"
          >
            <motion.button
              onClick={handleSurpriseClick}
               className="inline-block max-w-sm cursor-pointer rounded-lg border border-yellow-400 bg-yellow-400/20 px-6 py-4 transition-all hover:bg-yellow-400/30 sm:px-8 sm:py-6"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(250, 204, 21, 0.3)',
                  '0 0 40px rgba(250, 204, 21, 0.6)',
                  '0 0 20px rgba(250, 204, 21, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p className="text-yellow-100 text-lg sm:text-2xl font-serif">
                {SURPRISE_MESSAGE.split('').map((char, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </p>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
