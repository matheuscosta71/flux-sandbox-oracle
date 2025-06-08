import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, FileText } from 'lucide-react';

interface ApprovalDialogProps {
  open: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  recommendation: string;
  service: string;
}

export const ApprovalDialog = ({ 
  open, 
  onClose, 
  onApprove, 
  onReject, 
  recommendation,
  service
}: ApprovalDialogProps) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-y-auto py-10">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 text-slate-200 p-6 rounded-lg my-auto mx-4 relative">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <div className="text-xl font-bold flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            Aprovação de Recomendação
          </div>
          <p className="text-slate-400">
            Revise a recomendação da IA para {service} antes de aprovar
          </p>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-full absolute top-3 right-3" 
          onClick={onClose}
        >
          <span className="sr-only">Fechar</span>
          <XCircle className="h-4 w-4" />
        </Button>
        
        <div className="my-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-slate-300 mb-2 font-medium">Recomendação da IA:</p>
          <p className="text-slate-400">{recommendation}</p>
        </div>
        
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
          <p className="text-yellow-300 text-sm">
            Aprovar esta recomendação irá documentar a decisão e aplicar as alterações sugeridas pela IA.
            Todas as ações serão registradas para fins de governança de TI.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-end">
          <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700" onClick={onClose}>
            <FileText className="w-4 h-4 mr-1" />
            Revisar
          </Button>
          <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-900/20" onClick={onReject}>
            <XCircle className="w-4 h-4 mr-1" />
            Rejeitar
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={onApprove}>
            <CheckCircle className="w-4 h-4 mr-1" />
            Aprovar
          </Button>
        </div>
      </div>
    </div>
  );
};