import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ChestAnimation from '@/components/ChestAnimation';
import { toast } from 'sonner';

interface Goose {
  id: string;
  name: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
}

const GOOSE_COLLECTION: Goose[] = [
  { id: '1', name: 'Обычный гусь', emoji: '🪿', rarity: 'common', description: 'Самый обычный гусь' },
  { id: '2', name: 'Белый гусь', emoji: '🦆', rarity: 'common', description: 'Белоснежный красавец' },
  { id: '3', name: 'Утка-гусь', emoji: '🦢', rarity: 'common', description: 'Элегантный лебедь' },
  { id: '4', name: 'Золотой гусь', emoji: '🐤', rarity: 'rare', description: 'Приносит удачу!' },
  { id: '5', name: 'Космический гусь', emoji: '🚀', rarity: 'rare', description: 'Межгалактический путешественник' },
  { id: '6', name: 'Королевский гусь', emoji: '👑', rarity: 'epic', description: 'Гусь голубых кровей' },
  { id: '7', name: 'Радужный гусь', emoji: '🌈', rarity: 'epic', description: 'Переливается всеми цветами' },
  { id: '8', name: 'Легендарный гусь', emoji: '⭐', rarity: 'legendary', description: 'Невероятно редкий!' },
  { id: '9', name: 'Алмазный гусь', emoji: '💎', rarity: 'legendary', description: 'Сияет как бриллиант' },
];

const RARITY_CHANCES = {
  common: 60,
  rare: 25,
  epic: 12,
  legendary: 3,
};

const RARITY_COLORS = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-amber-400 to-amber-600',
};

interface HomePageProps {
  eggs: number;
  setEggs: (eggs: number) => void;
  geese: Goose[];
  setGeese: (geese: Goose[]) => void;
  achievements: string[];
  setAchievements: (achievements: string[]) => void;
}

export default function HomePage({ eggs, setEggs, geese, setGeese, achievements, setAchievements }: HomePageProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [revealedGoose, setRevealedGoose] = useState<Goose | null>(null);

  const getRandomGoose = (): Goose => {
    const random = Math.random() * 100;
    let cumulativeChance = 0;
    let selectedRarity: keyof typeof RARITY_CHANCES = 'common';

    for (const [rarity, chance] of Object.entries(RARITY_CHANCES)) {
      cumulativeChance += chance;
      if (random <= cumulativeChance) {
        selectedRarity = rarity as keyof typeof RARITY_CHANCES;
        break;
      }
    }

    const geeseOfRarity = GOOSE_COLLECTION.filter(g => g.rarity === selectedRarity);
    return geeseOfRarity[Math.floor(Math.random() * geeseOfRarity.length)];
  };

  const checkAchievements = (newGeese: Goose[]) => {
    const uniqueGeese = new Set(newGeese.map(g => g.id));
    const newAchievements = [...achievements];

    if (uniqueGeese.size >= 3 && !achievements.includes('collector_3')) {
      newAchievements.push('collector_3');
      toast.success('🏆 Достижение: Коллекционер новичок!');
    }
    if (uniqueGeese.size >= 5 && !achievements.includes('collector_5')) {
      newAchievements.push('collector_5');
      toast.success('🏆 Достижение: Опытный коллекционер!');
    }
    if (uniqueGeese.size >= 9 && !achievements.includes('collector_all')) {
      newAchievements.push('collector_all');
      toast.success('🏆 Достижение: Мастер коллекций!');
    }

    const hasLegendary = newGeese.some(g => g.rarity === 'legendary');
    if (hasLegendary && !achievements.includes('legendary_hunter')) {
      newAchievements.push('legendary_hunter');
      toast.success('🏆 Достижение: Охотник за легендами!');
    }

    setAchievements(newAchievements);
  };

  const openChest = async () => {
    if (eggs < 100) {
      toast.error('Недостаточно яиц! Нужно 100 🥚');
      return;
    }

    setIsOpening(true);
    setEggs(eggs - 100);

    setTimeout(() => {
      const newGoose = getRandomGoose();
      setRevealedGoose(newGoose);
      
      const newGeese = [...geese, { ...newGoose, caughtAt: Date.now() }];
      setGeese(newGeese);
      checkAchievements(newGeese);

      const rarityMessages = {
        common: 'Неплохо!',
        rare: 'Редкая находка! ✨',
        epic: 'Эпическая удача! 🎉',
        legendary: 'ЛЕГЕНДАРНЫЙ ГУСЬ! 🌟🎊',
      };

      toast.success(rarityMessages[newGoose.rarity]);
    }, 2000);
  };

  const closeReveal = () => {
    setIsOpening(false);
    setRevealedGoose(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold text-gray-800">Открывай сундуки!</h2>
          <p className="text-xl text-gray-600">Собери всех гусей и получи достижения</p>
        </div>

        <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-2xl">
          <div className="flex flex-col items-center gap-8">
            <ChestAnimation isOpening={isOpening} />
            
            <Button
              onClick={openChest}
              disabled={isOpening || eggs < 100}
              size="lg"
              className="text-xl px-12 py-8 bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform shadow-lg"
            >
              {isOpening ? (
                <span className="flex items-center gap-2">
                  <Icon name="Loader2" className="animate-spin" size={24} />
                  Открываем...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  <span className="text-3xl">📦</span>
                  Открыть сундук (100 🥚)
                </span>
              )}
            </Button>

            <div className="text-center text-sm text-gray-500">
              <p>Шансы выпадения:</p>
              <div className="flex gap-4 justify-center mt-2 flex-wrap">
                <span className="px-3 py-1 bg-gray-100 rounded-full">Обычный: 60%</span>
                <span className="px-3 py-1 bg-blue-100 rounded-full">Редкий: 25%</span>
                <span className="px-3 py-1 bg-purple-100 rounded-full">Эпический: 12%</span>
                <span className="px-3 py-1 bg-amber-100 rounded-full">Легендарный: 3%</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GOOSE_COLLECTION.map((goose) => {
            const owned = geese.filter(g => g.id === goose.id).length;
            return (
              <Card 
                key={goose.id} 
                className={`p-4 text-center transition-all hover:scale-105 ${
                  owned > 0 ? 'bg-white shadow-lg' : 'bg-gray-100 opacity-50'
                }`}
              >
                <div className="text-5xl mb-2">{owned > 0 ? goose.emoji : '❓'}</div>
                <h3 className="font-semibold text-sm">{owned > 0 ? goose.name : '???'}</h3>
                {owned > 0 && (
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${RARITY_COLORS[goose.rarity]} text-white`}>
                      {goose.rarity}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">x{owned}</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {revealedGoose && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
          onClick={closeReveal}
        >
          <Card className="p-12 max-w-md mx-4 text-center animate-scale-in shadow-2xl">
            <div className="text-8xl mb-6 animate-bounce">{revealedGoose.emoji}</div>
            <h2 className="text-3xl font-bold mb-2">{revealedGoose.name}</h2>
            <p className="text-gray-600 mb-4">{revealedGoose.description}</p>
            <div className={`inline-block px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r ${RARITY_COLORS[revealedGoose.rarity]} mb-6`}>
              {revealedGoose.rarity.toUpperCase()}
            </div>
            <Button onClick={closeReveal} className="w-full">
              Продолжить
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
