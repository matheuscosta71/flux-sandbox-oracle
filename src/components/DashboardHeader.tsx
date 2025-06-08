
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Shield, Home, BookOpen } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/20 backdrop-blur-sm">
      <div className="p-3 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                4AI
              </h1>
              <p className="text-sm md:text-base text-slate-200 font-medium">Inteligência de Implantação com IA</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-3 md:mt-0">
            <div className="flex items-center gap-2">
              <Button 
                variant={location.pathname === '/' ? 'default' : 'outline'} 
                size="sm" 
                className={location.pathname === '/' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-600 hover:bg-slate-700'}
                onClick={() => navigate('/')}
              >
                <Home className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Painel</span>
                <span className="sm:hidden">Home</span>
              </Button>
              <Button 
                variant={location.pathname === '/catalog' ? 'default' : 'outline'} 
                size="sm" 
                className={location.pathname === '/catalog' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-600 hover:bg-slate-700'}
                onClick={() => navigate('/catalog')}
              >
                <BookOpen className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Catálogo de Serviços</span>
                <span className="sm:hidden">Catálogo</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
                <Zap className="w-3 h-3 mr-1" />
                <span className="hidden xs:inline">IA Ativa</span>
                <span className="xs:hidden">IA</span>
              </Badge>
              
              <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Shield className="w-3 h-3 mr-1" />
                <span className="hidden xs:inline">Sandbox Pronto</span>
                <span className="xs:hidden">Sandbox</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
