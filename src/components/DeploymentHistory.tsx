
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, CheckCircle, XCircle, Clock, ArrowRight, FileText } from 'lucide-react';
import { DetailView } from './DetailView';
import { DocumentationView } from './DocumentationView';

export const DeploymentHistory = () => {
  const [selectedDeployment, setSelectedDeployment] = useState<any>(null);
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [documentationViewOpen, setDocumentationViewOpen] = useState(false);
  const deployments = [
    {
      id: "dep-001",
      service: "user-service",
      version: "v2.1.3",
      status: "success",
      duration: "8m 32s",
      timestamp: "2024-06-08 14:23:15",
      confidence_score: 89,
      rollback_available: true
    },
    {
      id: "dep-002",
      service: "payment-gateway", 
      version: "v1.8.1",
      status: "failed",
      duration: "12m 45s",
      timestamp: "2024-06-08 13:45:22",
      confidence_score: 34,
      rollback_available: true
    },
    {
      id: "dep-003",
      service: "notification-service",
      version: "v3.0.0",
      status: "success",
      duration: "6m 18s", 
      timestamp: "2024-06-08 12:30:10",
      confidence_score: 95,
      rollback_available: false
    },
    {
      id: "dep-004",
      service: "auth-service",
      version: "v1.4.2",
      status: "in_progress",
      duration: "3m 22s",
      timestamp: "2024-06-08 15:10:30",
      confidence_score: 78,
      rollback_available: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'failed': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'in_progress': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'failed': return XCircle;
      case 'in_progress': return Clock;
      default: return Clock;
    }
  };

  return (
    <>
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-200 flex items-center justify-between">
            <div className="flex items-center">
              <History className="w-5 h-5 mr-2 text-green-400" />
              Histórico de Implantações
            </div>
            <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-700">
              Ver Todos
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3">
          {deployments.map((deployment) => {
            const StatusIcon = getStatusIcon(deployment.status);
            return (
              <div key={deployment.id} className="p-2 sm:p-3 md:p-4 bg-slate-900/50 rounded-lg border border-slate-600/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2 sm:mb-3">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <StatusIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    <div>
                      <h4 className="font-semibold text-slate-200 text-sm sm:text-base">
                        {deployment.service} <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 inline mx-0.5 sm:mx-1" /> {deployment.version}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-400">{deployment.timestamp}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(deployment.status)}`}>
                    {deployment.status === 'success' ? 'sucesso' : 
                     deployment.status === 'failed' ? 'falha' : 
                     deployment.status === 'in_progress' ? 'em progresso' : 
                     deployment.status.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-1 sm:gap-4 text-xs sm:text-sm mb-2 sm:mb-3">
                  <div>
                    <span className="text-slate-400 text-[10px] sm:text-xs">Duração:</span>
                    <p className="text-slate-200">{deployment.duration}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] sm:text-xs">Score IA:</span>
                    <p className="text-slate-200">{deployment.confidence_score}%</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] sm:text-xs">Rollback:</span>
                    <p className={deployment.rollback_available ? "text-green-300" : "text-slate-400"}>
                      {deployment.rollback_available ? "Disponível" : "N/A"}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs border-slate-600 hover:bg-slate-700 h-7 sm:h-8 px-2 sm:px-3"
                      onClick={() => {
                        setSelectedDeployment(deployment);
                        setDetailViewOpen(true);
                      }}
                    >
                      Ver Logs
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs border-slate-600 hover:bg-slate-700 h-7 sm:h-8 px-2 sm:px-3"
                      onClick={() => {
                        setSelectedDeployment(deployment);
                        setDocumentationViewOpen(true);
                      }}
                    >
                      <FileText className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                      Docs
                    </Button>
                  </div>
                  {deployment.rollback_available && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs border-slate-600 hover:bg-slate-700 h-7 sm:h-8 px-2 sm:px-3"
                    >
                      Reverter
                    </Button>
                  )}
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
        data={selectedDeployment}
        type="deployment"
      />
      
      {/* Visualização de documentação */}
      {selectedDeployment && (
        <DocumentationView
          open={documentationViewOpen}
          onClose={() => setDocumentationViewOpen(false)}
          service={selectedDeployment.service}
        />
      )}
    </>
  );
};
