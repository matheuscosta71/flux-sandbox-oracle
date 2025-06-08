
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { DetailView } from './DetailView';
import { ApprovalDialog } from './ApprovalDialog';
import { DocumentationView } from './DocumentationView';

export const DeploymentPredictions = () => {
  const [selectedPrediction, setSelectedPrediction] = useState<any>(null);
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [documentationViewOpen, setDocumentationViewOpen] = useState(false);
  
  const predictions = [
    {
      id: "pred-001",
      service: "user-service-v2.1.4",
      confidence: 92,
      status: "high_risk",
      risk_factors: ["Migração de banco de dados detectada", "Janela de pico de tráfego", "Incompatibilidade de dependências"],
      recommendation: "Atrasar implantação em 2 horas ou usar estratégia segura de rollback",
      eta: "15:30 UTC"
    },
    {
      id: "pred-002", 
      service: "payment-gateway-v1.8.2",
      confidence: 78,
      status: "medium_risk",
      risk_factors: ["Pequenas alterações na API", "Invalidação de cache necessária"],
      recommendation: "Prosseguir com monitoramento avançado",
      eta: "16:45 UTC"
    },
    {
      id: "pred-003",
      service: "notification-service-v3.0.1",
      confidence: 96,
      status: "low_risk",
      risk_factors: ["Apenas alterações compatíveis com versões anteriores"],
      recommendation: "Seguro para prosseguir",
      eta: "14:20 UTC"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high_risk': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium_risk': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low_risk': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'high_risk': return AlertTriangle;
      case 'medium_risk': return Clock;
      case 'low_risk': return CheckCircle;
      default: return Brain;
    }
  };

  return (
    <>
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-200 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-400" />
            Previsões de Implantação IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3 md:space-y-4">
          {predictions.map((prediction) => {
            const StatusIcon = getStatusIcon(prediction.status);
            return (
              <div key={prediction.id} className="p-2 sm:p-3 md:p-4 bg-slate-900/50 rounded-lg border border-slate-600/50">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-3">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <StatusIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    <div>
                      <h4 className="font-semibold text-slate-200 text-sm sm:text-base">{prediction.service}</h4>
                      <p className="text-xs sm:text-sm text-slate-400">ETA: {prediction.eta}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${getStatusColor(prediction.status)}`}>
                      {prediction.status === 'high_risk' ? 'alto risco' : 
                     prediction.status === 'medium_risk' ? 'risco médio' : 
                     prediction.status === 'low_risk' ? 'baixo risco' : 
                     prediction.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
                      <TrendingUp className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                      {prediction.confidence}%
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
                  <p className="text-xs sm:text-sm text-slate-300">
                    <strong>Fatores de Risco:</strong>
                  </p>
                  <ul className="text-[10px] sm:text-xs text-slate-400 space-y-0.5 sm:space-y-1">
                    {prediction.risk_factors.map((factor, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-slate-500 rounded-full mr-1 sm:mr-2"></span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <p className="text-xs sm:text-sm text-slate-300">
                    <strong>Recomendação:</strong> <span className="text-slate-400">{prediction.recommendation}</span>
                  </p>
                  <div className="flex space-x-2 self-end sm:self-auto">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs border-slate-600 hover:bg-slate-700 h-7 sm:h-8 px-2 sm:px-3"
                      onClick={() => {
                        setSelectedPrediction(prediction);
                        setDetailViewOpen(true);
                      }}
                    >
                      Ver Detalhes
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs border-green-600 text-green-400 hover:bg-green-900/20 h-7 sm:h-8 px-2 sm:px-3"
                      onClick={() => {
                        setSelectedPrediction(prediction);
                        setApprovalDialogOpen(true);
                      }}
                    >
                      Aprovar
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
      
      {/* Modal de detalhes */}
      <DetailView 
        open={detailViewOpen}
        onClose={() => setDetailViewOpen(false)}
        data={selectedPrediction}
        type="prediction"
      />
      
      {/* Diálogo de aprovação */}
      {selectedPrediction && (
        <ApprovalDialog
          open={approvalDialogOpen}
          onClose={() => setApprovalDialogOpen(false)}
          onApprove={() => {
            setApprovalDialogOpen(false);
            alert("Recomendação aprovada com sucesso!");
          }}
          onReject={() => {
            setApprovalDialogOpen(false);
            alert("Recomendação rejeitada!");
          }}
          recommendation={selectedPrediction.recommendation}
          service={selectedPrediction.service}
        />
      )}
      
      {/* Visualização de documentação */}
      {selectedPrediction && (
        <DocumentationView
          open={documentationViewOpen}
          onClose={() => setDocumentationViewOpen(false)}
          service={selectedPrediction.service}
        />
      )}
    </>
  );
};
