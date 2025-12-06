import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import Icon from '@/components/ui/icon';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [eggs, setEggs] = useState(300);
  const [geese, setGeese] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20">
            <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <h1 className="text-2xl font-bold text-primary">🪿 Goose Box</h1>
                  <div className="flex gap-4">
                    <Link 
                      to="/" 
                      className="px-4 py-2 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                    >
                      Главная
                    </Link>
                    <Link 
                      to="/inventory" 
                      className="px-4 py-2 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                    >
                      Инвентарь
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-amber-100 px-6 py-2 rounded-full flex items-center gap-2 shadow-md">
                    <span className="text-2xl">🥚</span>
                    <span className="text-xl font-bold text-amber-900">{eggs}</span>
                  </div>
                  <div className="bg-purple-100 px-6 py-2 rounded-full flex items-center gap-2 shadow-md">
                    <Icon name="Trophy" size={20} className="text-purple-700" />
                    <span className="text-xl font-bold text-purple-900">{achievements.length}</span>
                  </div>
                </div>
              </div>
            </nav>

            <Routes>
              <Route 
                path="/" 
                element={
                  <HomePage 
                    eggs={eggs} 
                    setEggs={setEggs} 
                    geese={geese} 
                    setGeese={setGeese}
                    achievements={achievements}
                    setAchievements={setAchievements}
                  />
                } 
              />
              <Route 
                path="/inventory" 
                element={
                  <InventoryPage 
                    geese={geese} 
                    achievements={achievements}
                  />
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;