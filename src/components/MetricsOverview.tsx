
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export const MetricsOverview = () => {
  const metrics = [
    {
      title: "Taxa de Sucesso",
      value: "94.2%",
      change: "+2.3%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-400"
    },
    {
      title: "Tempo Médio",
      value: "12.4min",
      change: "-18%",
      trend: "down",
      icon: Clock,
      color: "text-blue-400"
    },
    {
      title: "Sandboxes Ativos",
      value: "7",
      change: "+3",
      trend: "up",
      icon: Activity,
      color: "text-purple-400"
    },
    {
      title: "Falhas Previstas",
      value: "2",
      change: "-5",
      trend: "down",
      icon: AlertTriangle,
      color: "text-orange-400"
    }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-slate-200 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-400" />
          Métricas do Sistema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="p-4 bg-slate-900/50 rounded-lg border border-slate-600/50">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      metric.trend === 'up' 
                        ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                        : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                    }`}
                  >
                    {metric.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {metric.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-slate-200">{metric.value}</p>
                  <p className="text-sm text-slate-400">{metric.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
