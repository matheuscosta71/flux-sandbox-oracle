import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, CheckCircle2, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';

interface AlertActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: {
    id: string;
    type: string;
    title: string;
    message: string;
    timestamp: string;
  } | null;
  action: 'investigate' | 'resolve';
}

export const AlertActionModal = ({ isOpen, onClose, alert, action }: AlertActionModalProps) => {
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  if (!alert) return null;

  const handleAction = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-slate-200 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-400 flex items-center">
            {action === 'investigate' ? (
              <Search className="w-5 h-5 mr-2" />
            ) : (
              <CheckCircle2 className="w-5 h-5 mr-2" />
            )}
            {action === 'investigate' ? 'Investigar Alerta' : 'Resolver Alerta'}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {alert.title}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-2" onValueChange={setActiveTab}>
          <TabsList className="bg-slate-700/50">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="actions">Ações</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="p-4 bg-slate-700/20 rounded-md mt-2">
            <div className="space-y-4">
              <div className="bg-slate-900 rounded-md p-4 border border-slate-700">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Tipo:</span>
                    <span className={`${
                      alert.type === 'critical' ? 'text-red-400' : 
                      alert.type === 'warning' ? 'text-yellow-400' : 
                      alert.type === 'info' ? 'text-blue-400' : 
                      'text-green-400'
                    } flex items-center`}>
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {alert.type === 'warning' ? 'Aviso' : 
                       alert.type === 'info' ? 'Informação' : 
                       alert.type === 'success' ? 'Sucesso' : 
                       alert.type === 'critical' ? 'Crítico' : alert.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Mensagem:</span>
                    <span className="text-slate-200">{alert.message}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Detectado:</span>
                    <span className="text-slate-200">{alert.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="actions" className="p-4 bg-slate-700/20 rounded-md mt-2">
            <div className="space-y-4">
              {completed ? (
                <div className="bg-green-900/20 border border-green-500/30 rounded-md p-4 text-center">
                  <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-300 font-medium">
                    {action === 'investigate' ? 'Investigação concluída' : 'Problema resolvido'} com sucesso!
                  </p>
                </div>
              ) : (
                <div className="bg-slate-900 rounded-md p-4 border border-slate-700">
                  <h3 className="font-medium text-slate-200 mb-2">
                    {action === 'investigate' ? 'Iniciar investigação' : 'Resolver problema'}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {action === 'investigate' 
                      ? 'Isso iniciará um diagnóstico automático do problema reportado.'
                      : 'Isso aplicará as correções recomendadas para resolver o problema.'}
                  </p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleAction}
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {action === 'investigate' ? 'Investigando...' : 'Resolvendo...'}
                      </>
                    ) : (
                      <>
                        {action === 'investigate' ? (
                          <Search className="w-4 h-4 mr-2" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                        )}
                        {action === 'investigate' ? 'Iniciar Investigação' : 'Resolver Problema'}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="logs" className="p-4 bg-slate-700/20 rounded-md mt-2">
            <div className="bg-black rounded-md p-3 font-mono text-sm text-green-400 h-48 overflow-y-auto">
              <p>[{new Date().toISOString()}] Iniciando análise do alerta #{alert.id}</p>
              <p>[{new Date().toISOString()}] Verificando serviços relacionados...</p>
              <p>[{new Date().toISOString()}] Coletando métricas de sistema</p>
              <p>[{new Date().toISOString()}] Analisando logs de aplicação</p>
              {completed && (
                <>
                  <p>[{new Date().toISOString()}] Problema identificado: {alert.message}</p>
                  <p>[{new Date().toISOString()}] Aplicando correções recomendadas</p>
                  <p>[{new Date().toISOString()}] Verificando resultado</p>
                  <p>[{new Date().toISOString()}] <span className="text-green-400">✓</span> Operação concluída com sucesso</p>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button 
            variant="outline" 
            className="border-slate-600 hover:bg-slate-700"
            onClick={onClose}
          >
            Fechar
          </Button>
          {completed && (
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={onClose}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Concluir
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};