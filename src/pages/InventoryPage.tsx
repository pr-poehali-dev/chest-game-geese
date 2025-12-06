import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Goose {
  id: string;
  name: string;
  emoji?: string;
  image?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
  reward: number;
  caughtAt?: number;
}

const ACHIEVEMENTS = [
  { id: 'collector_3', name: 'Коллекционер новичок', description: 'Собрать 3 разных гуся', icon: '🏅' },
  { id: 'collector_5', name: 'Опытный коллекционер', description: 'Собрать 5 разных гусей', icon: '🎖️' },
  { id: 'collector_all', name: 'Мастер коллекций', description: 'Собрать всех гусей', icon: '👑' },
  { id: 'legendary_hunter', name: 'Охотник за легендами', description: 'Получить легендарного гуся', icon: '⭐' },
];

const RARITY_COLORS = {
  common: 'bg-gray-100 text-gray-800',
  rare: 'bg-blue-100 text-blue-800',
  epic: 'bg-purple-100 text-purple-800',
  legendary: 'bg-amber-100 text-amber-800',
};

interface InventoryPageProps {
  geese: Goose[];
  achievements: string[];
}

export default function InventoryPage({ geese, achievements }: InventoryPageProps) {
  const uniqueGeese = Array.from(new Set(geese.map(g => g.id))).map(id => {
    const goose = geese.find(g => g.id === id)!;
    const count = geese.filter(g => g.id === id).length;
    return { ...goose, count };
  });

  const totalGeese = geese.length;
  const uniqueCount = uniqueGeese.length;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-gray-800">Твоя коллекция</h2>
          <p className="text-xl text-gray-600">
            Собрано: {uniqueCount} из 6 уникальных гусей | Всего открыто: {totalGeese}
          </p>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Icon name="Trophy" className="text-amber-500" />
            Достижения
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {ACHIEVEMENTS.map((achievement) => {
              const unlocked = achievements.includes(achievement.id);
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    unlocked
                      ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300 shadow-md'
                      : 'bg-gray-50 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{unlocked ? achievement.icon : '🔒'}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{achievement.name}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {unlocked && (
                      <Icon name="CheckCircle2" className="text-green-500" size={24} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🪿</span>
            Мои гуси
          </h3>
          {uniqueGeese.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Icon name="PackageOpen" size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-xl">Пока что коллекция пуста</p>
              <p>Открой первый сундук!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uniqueGeese
                .sort((a, b) => {
                  const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
                  return rarityOrder[a.rarity] - rarityOrder[b.rarity];
                })
                .map((goose) => (
                  <Card key={goose.id} className="p-6 hover:scale-105 transition-transform shadow-lg">
                    <div className="text-center">
                      {goose.image ? (
                        <img 
                          src={goose.image} 
                          alt={goose.name}
                          className="w-32 h-32 mx-auto object-contain mb-3"
                        />
                      ) : (
                        <div className="text-6xl mb-3">{goose.emoji}</div>
                      )}
                      <h4 className="font-bold text-lg mb-1">{goose.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{goose.description}</p>
                      <div className="flex items-center justify-center gap-2">
                        <Badge className={RARITY_COLORS[goose.rarity]}>
                          {goose.rarity}
                        </Badge>
                        <Badge variant="secondary">
                          x{goose.count}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}