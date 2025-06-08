
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { MetricsOverview } from '@/components/MetricsOverview';
import { DeploymentPredictions } from '@/components/DeploymentPredictions';
import { SandboxManager } from '@/components/SandboxManager';
import { DeploymentHistory } from '@/components/DeploymentHistory';
import { AlertsPanel } from '@/components/AlertsPanel';
import { GovernanceBanner } from '@/components/GovernanceBanner';

const Index = () => {
  const [showGovBanner, setShowGovBanner] = useState(true);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Faixa de Governança */}
      <GovernanceBanner showBanner={showGovBanner} setShowBanner={setShowGovBanner} />
      
      <div className="container mx-auto p-6 space-y-6">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MetricsOverview />
            <DeploymentPredictions />
            <DeploymentHistory />
          </div>
          
          <div className="space-y-6">
            <AlertsPanel />
            <SandboxManager />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
