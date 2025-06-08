
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react';

export const DeploymentHistory = () => {
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
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-slate-200 flex items-center justify-between">
          <div className="flex items-center">
            <History className="w-5 h-5 mr-2 text-green-400" />
            Deployment History
          </div>
          <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-700">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {deployments.map((deployment) => {
          const StatusIcon = getStatusIcon(deployment.status);
          return (
            <div key={deployment.id} className="p-4 bg-slate-900/50 rounded-lg border border-slate-600/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <StatusIcon className="w-5 h-5 text-slate-400" />
                  <div>
                    <h4 className="font-semibold text-slate-200">
                      {deployment.service} <ArrowRight className="w-3 h-3 inline mx-1" /> {deployment.version}
                    </h4>
                    <p className="text-xs text-slate-400">{deployment.timestamp}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(deployment.status)}>
                  {deployment.status.replace('_', ' ')}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <span className="text-slate-400">Duration:</span>
                  <p className="text-slate-200">{deployment.duration}</p>
                </div>
                <div>
                  <span className="text-slate-400">AI Score:</span>
                  <p className="text-slate-200">{deployment.confidence_score}%</p>
                </div>
                <div>
                  <span className="text-slate-400">Rollback:</span>
                  <p className={deployment.rollback_available ? "text-green-300" : "text-slate-400"}>
                    {deployment.rollback_available ? "Available" : "N/A"}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-700">
                  View Logs
                </Button>
                {deployment.rollback_available && (
                  <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-700">
                    Rollback
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
