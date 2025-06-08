import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Terminal, Cpu, HardDrive, Clock, Globe, CheckCircle } from 'lucide-react';

interface SandboxConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  sandbox: {
    id: string;
    name: string;
    status: string;
    uptime: string;
    cpu: string;
    memory: string;
    region: string;
  } | null;
}

export const SandboxConnectModal = ({ isOpen, onClose, sandbox }: SandboxConnectModalProps) => {
  if (!sandbox) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-slate-200 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-400 flex items-center">
            <Terminal className="w-5 h-5 mr-2" />
            Conectando ao Sandbox
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Estabelecendo conexão com {sandbox.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-slate-900 rounded-md p-4 border border-slate-700">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-green-400 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Conectado
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Região:</span>
                <span className="text-slate-200 flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  {sandbox.region}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-400">CPU:</span>
                <span className="text-slate-200 flex items-center">
                  <Cpu className="w-4 h-4 mr-1" />
                  {sandbox.cpu}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Memória:</span>
                <span className="text-slate-200 flex items-center">
                  <HardDrive className="w-4 h-4 mr-1" />
                  {sandbox.memory}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tempo ativo:</span>
                <span className="text-slate-200 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {sandbox.uptime}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-black rounded-md p-3 font-mono text-sm text-green-400">
            <p>$ ssh user@{sandbox.name}.sandbox</p>
            <p>Conectado ao ambiente {sandbox.name}</p>
            <p>Inicializando serviços...</p>
            <p className="flex items-center">
              <span className="inline-block w-2 h-4 bg-green-400 animate-pulse mr-1"></span>
              Pronto para uso
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            className="border-slate-600 hover:bg-slate-700"
            onClick={onClose}
          >
            Fechar
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Abrir Terminal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};