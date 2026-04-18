'use client';

import React, { createContext, useContext, useState } from 'react';

type Stage = 'landing' | 'stage1' | 'stage2' | 'stage3' | 'final';

interface GameContextType {
  currentStage: Stage;
  setCurrentStage: (stage: Stage) => void;
  completedStages: Stage[];
  addCompletedStage: (stage: Stage) => void;
  orbClickCount: number;
  incrementOrbClick: () => void;
  resetOrbClick: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [currentStage, setCurrentStage] = useState<Stage>('landing');
  const [completedStages, setCompletedStages] = useState<Stage[]>([]);
  const [orbClickCount, setOrbClickCount] = useState(0);

  const addCompletedStage = (stage: Stage) => {
    if (!completedStages.includes(stage)) {
      setCompletedStages([...completedStages, stage]);
    }
  };

  const incrementOrbClick = () => {
    setOrbClickCount(orbClickCount + 1);
  };

  const resetOrbClick = () => {
    setOrbClickCount(0);
  };

  return (
    <GameContext.Provider
      value={{
        currentStage,
        setCurrentStage,
        completedStages,
        addCompletedStage,
        orbClickCount,
        incrementOrbClick,
        resetOrbClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
