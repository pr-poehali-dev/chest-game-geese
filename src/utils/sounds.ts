const SOUND_ENABLED = true;

const playSound = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  if (!SOUND_ENABLED) return;
  
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    console.warn('Sound playback failed:', error);
  }
};

export const sounds = {
  chestOpen: () => {
    playSound(523, 0.1);
    setTimeout(() => playSound(659, 0.1), 100);
    setTimeout(() => playSound(784, 0.2), 200);
  },
  
  rewardCommon: () => {
    playSound(440, 0.15);
  },
  
  rewardRare: () => {
    playSound(523, 0.1);
    setTimeout(() => playSound(659, 0.15), 100);
  },
  
  rewardEpic: () => {
    playSound(523, 0.1);
    setTimeout(() => playSound(659, 0.1), 80);
    setTimeout(() => playSound(784, 0.1), 160);
    setTimeout(() => playSound(880, 0.2), 240);
  },
  
  rewardLegendary: () => {
    playSound(523, 0.1);
    setTimeout(() => playSound(659, 0.1), 70);
    setTimeout(() => playSound(784, 0.1), 140);
    setTimeout(() => playSound(1047, 0.1), 210);
    setTimeout(() => playSound(1319, 0.3), 280);
  },
  
  sell: () => {
    playSound(330, 0.1);
    setTimeout(() => playSound(392, 0.15), 100);
  },
  
  dailyReward: () => {
    playSound(659, 0.1);
    setTimeout(() => playSound(784, 0.1), 100);
    setTimeout(() => playSound(880, 0.1), 200);
    setTimeout(() => playSound(1047, 0.25), 300);
  },
  
  error: () => {
    playSound(200, 0.2, 'sawtooth');
  }
};
