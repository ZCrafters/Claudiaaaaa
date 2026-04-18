'use client';

import { GameProvider, useGame } from './game-context';
import { ParticleBackground } from '@/components/particle-background';
import { LandingStage } from '@/components/landing-stage';
import { Stage1 } from '@/components/stage1';
import { Stage2 } from '@/components/stage2';
import { Stage3 } from '@/components/stage3';
import { FinalStage } from '@/components/final-stage';

function GameContent() {
  const { currentStage } = useGame();

  return (
    <>
      <ParticleBackground />
      {currentStage === 'landing' && <LandingStage />}
      {currentStage === 'stage1' && <Stage1 />}
      {currentStage === 'stage2' && <Stage2 />}
      {currentStage === 'stage3' && <Stage3 />}
      {currentStage === 'final' && <FinalStage />}
    </>
  );
}

export default function Home() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
