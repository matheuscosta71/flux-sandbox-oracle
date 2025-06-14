
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';
import { AlertActionModal } from '@/components/AlertActionModal';
import { toast } from '@/components/ui/use-toast';

export const AlertsPanel = () => {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<'investigate' | 'resolve'>('investigate');
  const alerts = [
    {
      id: "alert-001",
      type: "warning",
      title: "Alto Uso de Memória Detectado",
      message: "sandbox payment-gateway consumindo 85% de memória",
      timestamp: "2 min atrás",
      action_required: true
    },
    {
      id: "alert-002",
      type: "info", 
      title: "Modelo de IA Retreinado",
      message: "Precisão de previsão de implantação melhorada para 94.2%",
      timestamp: "15 min atrás",
      action_required: false
    },
    {
      id: "alert-003",
      type: "success",
      title: "Rollback Concluído",
      message: "user-service revertido com sucesso para v2.1.2",
      timestamp: "1 hora atrás", 
      action_required: false
    },
    {
      id: "alert-004",
      type: "critical",
      title: "Conflito de Dependência",
      message: "Versões incompatíveis detectadas em notification-service",
      timestamp: "5 min atrás",
      action_required: true
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'warning': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'info': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'success': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
      case 'warning': 
        return AlertTriangle;
      case 'info': 
        return Info;
      case 'success': 
        return CheckCircle;
      default: 
        return Bell;
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-slate-200 flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-yellow-400" />
            Alertas Inteligentes
          </div>
          <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/30">
            2 Críticos
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3">
        {alerts.map((alert) => {
          const AlertIcon = getAlertIcon(alert.type);
          return (
            <div key={alert.id} className="p-2 sm:p-3 bg-slate-900/50 rounded-lg border border-slate-600/50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:mb-2">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <AlertIcon className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 text-slate-400" />
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-200 text-xs sm:text-sm">{alert.title}</h4>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">{alert.message}</p>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">{alert.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 self-end sm:self-start">
                  <Badge variant="outline" className={`text-[10px] sm:text-xs ${getAlertColor(alert.type)}`}>
                    {alert.type === 'warning' ? 'aviso' : 
                     alert.type === 'info' ? 'info' : 
                     alert.type === 'success' ? 'sucesso' : 
                     alert.type === 'critical' ? 'crítico' : alert.type}
                  </Badge>
                  <Button size="sm" variant="ghost" className="w-5 h-5 sm:w-6 sm:h-6 p-0 hover:bg-slate-700">
                    <X className="w-2 h-2 sm:w-3 sm:h-3" />
                  </Button>
                </div>
              </div>
              
              {alert.action_required && (
                <div className="flex space-x-2 mt-2 sm:mt-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-xs border-slate-600 hover:bg-slate-700 h-7 sm:h-8 px-2 sm:px-3"
                    onClick={() => {
                      setSelectedAlert(alert);
                      setCurrentAction('investigate');
                      setIsActionModalOpen(true);
                    }}
                  >
                    Investigar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs border-slate-600 hover:bg-slate-700 h-7 sm:h-8 px-2 sm:px-3"
                    onClick={() => {
                      setSelectedAlert(alert);
                      setCurrentAction('resolve');
                      setIsActionModalOpen(true);
                    }}
                  >
                    Resolver
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
      
      {/* Modal de ação de alerta */}
      <AlertActionModal 
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        alert={selectedAlert}
        action={currentAction}
      />
    </Card>
  );
};
