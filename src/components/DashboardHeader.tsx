
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Settings, Zap, Shield } from 'lucide-react';

export const DashboardHeader = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/20 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Flux Oracle
              </h1>
              <p className="text-slate-400">AI-Powered Deployment Intelligence</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
              <Zap className="w-3 h-3 mr-1" />
              AI Active
            </Badge>
            
            <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Shield className="w-3 h-3 mr-1" />
              Sandbox Ready
            </Badge>
            
            <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
