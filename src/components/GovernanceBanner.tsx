import React from 'react';
import { Shield, BookOpen, ExternalLink, X, AlertCircle } from 'lucide-react';

interface GovernanceBannerProps {
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
}

export const GovernanceBanner = ({ showBanner, setShowBanner }: GovernanceBannerProps) => {
  if (!showBanner) return null;
  
  return (
    <div className="bg-gradient-to-r from-amber-600 to-amber-500 shadow-lg relative overflow-hidden">
      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 rotate-90 opacity-10 text-white text-8xl font-black">
        TESTE
      </div>
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 -rotate-90 opacity-10 text-white text-8xl font-black">
        TESTE
      </div>
      
      <div className="container mx-auto py-2 md:py-3 px-3 md:px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="h-6 w-6 text-white" />
              <AlertCircle className="h-4 w-4 text-white absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm md:text-base">Ambiente de Teste - Governança e Processos de IA</h3>
              <p className="text-amber-100 text-xs md:text-sm">
                Você está usando um ambiente de teste. Conheça nossos processos de governança
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3 self-end md:self-auto">
            <span className="hidden md:inline-block px-2 py-1 text-xs bg-red-500/20 border border-red-500/40 text-white rounded-md font-medium">
              Ambiente de Teste
            </span>
            <a 
              href="https://github.com/matheuscosta71/flux-sandbox-oracle" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1 bg-white text-amber-700 hover:bg-amber-100 px-2 py-1 rounded-md text-xs font-medium transition-colors"
            >
              <BookOpen className="h-3 w-3" />
              <span className="hidden sm:inline">Documentação</span>
              <span className="sm:hidden">Docs</span>
              <ExternalLink className="h-2 w-2" />
            </a>
            <button 
              onClick={() => setShowBanner(false)}
              className="p-1.5 rounded-full bg-amber-700/20 hover:bg-amber-700/40 text-white transition-colors"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};