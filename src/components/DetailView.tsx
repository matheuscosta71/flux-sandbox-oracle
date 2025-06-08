import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Clock, FileText, Terminal, Code, CheckCheck, XCircle } from 'lucide-react';

interface DetailViewProps {
  open: boolean;
  onClose: () => void;
  data: any;
  type: 'prediction' | 'deployment' | 'sandbox';
}

export const DetailView = ({ open, onClose, data, type }: DetailViewProps) => {
  if (!open || !data) return null;

  const renderPredictionDetails = () => (
    <>
      <div className="flex flex-col space-y-1.5 text-center sm:text-left">
        <div className="text-xl font-bold flex items-center">
          {data.status === 'high_risk' && <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />}
          {data.status === 'medium_risk' && <Clock className="w-5 h-5 mr-2 text-yellow-400" />}
          {data.status === 'low_risk' && <CheckCircle className="w-5 h-5 mr-2 text-green-400" />}
          Análise de Implantação: {data.service}
        </div>
        <p className="text-slate-400">
          Análise de IA para implantação agendada para {data.eta}
        </p>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="risks">Fatores de Risco</TabsTrigger>
          <TabsTrigger value="code">Análise de Código</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4 space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200 text-lg">Resumo da Análise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Score de Confiança</p>
                  <div className="flex items-center">
                    <div className="w-full bg-slate-700 rounded-full h-2.5 mr-2">
                      <div 
                        className={`h-2.5 rounded-full ${
                          data.confidence > 80 ? 'bg-green-500' : 
                          data.confidence > 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${data.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-200 font-medium">{data.confidence}%</span>
                  </div>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Nível de Risco</p>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${data.status === 'high_risk' ? 'bg-red-500/20 text-red-300 border-red-500/30' : 
                        data.status === 'medium_risk' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 
                        'bg-green-500/20 text-green-300 border-green-500/30'}
                    `}
                  >
                    {data.status === 'high_risk' ? 'Alto Risco' : 
                     data.status === 'medium_risk' ? 'Risco Médio' : 'Baixo Risco'}
                  </Badge>
                </div>
              </div>
              
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-400 mb-2">Recomendação da IA</p>
                <p className="text-slate-200">{data.recommendation}</p>
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <CheckCheck className="w-4 h-4 mr-2" />
                  Aprovar Recomendação
                </Button>
                <Button variant="outline" className="flex-1 border-slate-600 hover:bg-slate-700">
                  <XCircle className="w-4 h-4 mr-2" />
                  Rejeitar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="risks" className="mt-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200 text-lg">Fatores de Risco Identificados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.risk_factors.map((factor: string, index: number) => (
                <div key={index} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-slate-200 font-medium">{factor}</p>
                      <p className="text-sm text-slate-400 mt-1">
                        A IA detectou este fator com base na análise do código e histórico de implantações.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="code" className="mt-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200 text-lg">Análise de Código</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <p className="text-slate-200 font-medium">Problemas Detectados</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="mt-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200 text-lg">Logs de Implantação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 h-80 overflow-y-auto">
                <p>[2024-06-08 14:15:22] INFO: Iniciando processo de implantação para {data.service}</p>
                <p>[2024-06-08 14:15:23] INFO: Verificando dependências...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );

  const renderDeploymentDetails = () => (
    <>
      <div className="flex flex-col space-y-1.5 text-center sm:text-left">
        <div className="text-xl font-bold flex items-center">
          {data.status === 'success' && <CheckCircle className="w-5 h-5 mr-2 text-green-400" />}
          {data.status === 'failed' && <XCircle className="w-5 h-5 mr-2 text-red-400" />}
          {data.status === 'in_progress' && <Clock className="w-5 h-5 mr-2 text-blue-400" />}
          Detalhes da Implantação: {data.service}
        </div>
        <p className="text-slate-400">
          Versão {data.version} • {data.timestamp}
        </p>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4 space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200 text-lg">Resumo da Implantação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Status</p>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${data.status === 'success' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                        data.status === 'failed' ? 'bg-red-500/20 text-red-300 border-red-500/30' : 
                        'bg-blue-500/20 text-blue-300 border-blue-500/30'}
                    `}
                  >
                    {data.status === 'success' ? 'Sucesso' : 
                     data.status === 'failed' ? 'Falha' : 'Em Progresso'}
                  </Badge>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Duração</p>
                  <p className="text-slate-200 font-medium">{data.duration}</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Score IA</p>
                  <p className="text-slate-200 font-medium">{data.confidence_score}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="mt-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200 text-lg">Logs de Implantação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 h-80 overflow-y-auto">
                <p>[{data.timestamp}] INFO: Iniciando implantação de {data.service} {data.version}</p>
                <p>[{data.timestamp}] INFO: Verificando dependências...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-y-auto py-10">
      <div className="max-w-4xl w-full bg-slate-900 border border-slate-700 text-slate-200 p-6 rounded-lg my-auto mx-4 max-h-[90vh] overflow-y-auto">
        {type === 'prediction' && renderPredictionDetails()}
        {type === 'deployment' && renderDeploymentDetails()}
        
        <div className="absolute top-4 right-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full" 
            onClick={onClose}
          >
            <span className="sr-only">Fechar</span>
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};