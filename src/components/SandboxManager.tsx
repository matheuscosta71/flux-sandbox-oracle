
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Box, Play, Square, RotateCcw, Cpu, HardDrive } from 'lucide-react';
import { SandboxConnectModal } from '@/components/SandboxConnectModal';
import { toast } from '@/components/ui/use-toast';

export const SandboxManager = () => {
  const [selectedSandbox, setSelectedSandbox] = useState<any>(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const sandboxes = [
    {
      id: "sb-001",
      name: "user-service-test",
      status: "running",
      uptime: "2h 34m",
      cpu: "45%",
      memory: "1.2GB",
      region: "us-west-1"
    },
    {
      id: "sb-002", 
      name: "payment-gateway-staging",
      status: "idle",
      uptime: "12m",
      cpu: "12%",
      memory: "0.8GB",
      region: "us-east-1"
    },
    {
      id: "sb-003",
      name: "notification-preview",
      status: "provisioning",
      uptime: "-",
      cpu: "-",
      memory: "-",
      region: "eu-central-1"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'idle': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'provisioning': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const handleConnect = (sandbox: any) => {
    setSelectedSandbox(sandbox);
    setIsConnectModalOpen(true);
  };

  const handleRestart = (sandbox: any) => {
    toast({
      title: "Reiniciando sandbox",
      description: `${sandbox.name} está sendo reiniciado...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Sandbox reiniciado",
        description: `${sandbox.name} foi reiniciado com sucesso!`,
        variant: "success",
      });
    }, 1500);
  };

  const handleStop = (sandbox: any) => {
    toast({
      title: "Parando sandbox",
      description: `${sandbox.name} está sendo parado...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Sandbox parado",
        description: `${sandbox.name} foi parado com sucesso!`,
      });
    }, 1500);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-slate-200 flex items-center justify-between">
          <div className="flex items-center">
            <Box className="w-5 h-5 mr-2 text-orange-400" />
            Sandboxes 4AI
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-slate-600 hover:bg-slate-700 text-slate-200 font-medium"
            onClick={() => toast({
              title: "Criando novo sandbox",
              description: "Iniciando provisionamento de um novo ambiente...",
            })}
          >
            <Play className="w-3 h-3 mr-1" />
            Novo Sandbox
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3">
        {sandboxes.map((sandbox) => (
          <div key={sandbox.id} className="p-2 sm:p-3 bg-slate-900/50 rounded-lg border border-slate-600/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-1 sm:mb-2">
              <h4 className="font-medium text-slate-200 text-sm sm:text-base">{sandbox.name}</h4>
              <Badge variant="outline" className={`text-xs ${getStatusColor(sandbox.status)}`}>
                {sandbox.status === 'running' ? 'em execução' : 
                 sandbox.status === 'idle' ? 'ocioso' : 
                 sandbox.status === 'provisioning' ? 'provisionando' : sandbox.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-xs text-slate-400 mb-2 sm:mb-3">
              <div className="flex items-center">
                <Cpu className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                CPU: {sandbox.cpu}
              </div>
              <div className="flex items-center">
                <HardDrive className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                RAM: {sandbox.memory}
              </div>
              <div className="col-span-2">
                <strong>Região:</strong> {sandbox.region}
              </div>
              <div className="col-span-2">
                <strong>Tempo ativo:</strong> {sandbox.uptime}
              </div>
            </div>
            
            <div className="flex space-x-1 sm:space-x-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 text-xs border-slate-600 hover:bg-slate-700 h-7 sm:h-8 px-2 sm:px-3"
                onClick={() => handleConnect(sandbox)}
              >
                <Play className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                <span className="hidden xs:inline">Conectar</span>
                <span className="xs:hidden">Con</span>
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-slate-600 hover:bg-slate-700 h-7 sm:h-8 w-7 sm:w-8 p-0"
                onClick={() => handleRestart(sandbox)}
              >
                <RotateCcw className="w-2 h-2 sm:w-3 sm:h-3" />
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-slate-600 hover:bg-slate-700 h-7 sm:h-8 w-7 sm:w-8 p-0"
                onClick={() => handleStop(sandbox)}
              >
                <Square className="w-2 h-2 sm:w-3 sm:h-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      
      {/* Modal de conexão ao sandbox */}
      <SandboxConnectModal 
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        sandbox={selectedSandbox}
      />
    </Card>
  );
};
