
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';

export const AlertsPanel = () => {
  const alerts = [
    {
      id: "alert-001",
      type: "warning",
      title: "High Memory Usage Detected",
      message: "payment-gateway sandbox consuming 85% memory",
      timestamp: "2 min ago",
      action_required: true
    },
    {
      id: "alert-002",
      type: "info", 
      title: "AI Model Retrained",
      message: "Deploy prediction accuracy improved to 94.2%",
      timestamp: "15 min ago",
      action_required: false
    },
    {
      id: "alert-003",
      type: "success",
      title: "Rollback Completed",
      message: "user-service successfully rolled back to v2.1.2",
      timestamp: "1 hour ago", 
      action_required: false
    },
    {
      id: "alert-004",
      type: "critical",
      title: "Dependency Conflict",
      message: "Incompatible versions detected in notification-service",
      timestamp: "5 min ago",
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
            Smart Alerts
          </div>
          <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/30">
            2 Critical
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => {
          const AlertIcon = getAlertIcon(alert.type);
          return (
            <div key={alert.id} className="p-3 bg-slate-900/50 rounded-lg border border-slate-600/50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start space-x-3">
                  <AlertIcon className="w-4 h-4 mt-0.5 text-slate-400" />
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-200 text-sm">{alert.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{alert.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{alert.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getAlertColor(alert.type)}>
                    {alert.type}
                  </Badge>
                  <Button size="sm" variant="ghost" className="w-6 h-6 p-0 hover:bg-slate-700">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              {alert.action_required && (
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1 border-slate-600 hover:bg-slate-700">
                    Investigate
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-700">
                    Resolve
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
