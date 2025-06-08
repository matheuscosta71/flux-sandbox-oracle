import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Code, CheckCircle, AlertTriangle, XCircle, GitPullRequest } from 'lucide-react';

interface DocumentationViewProps {
  open: boolean;
  onClose: () => void;
  service: string;
}

export const DocumentationView = ({ open, onClose, service }: DocumentationViewProps) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-y-auto py-10">
      <div className="max-w-4xl w-full bg-slate-900 border border-slate-700 text-slate-200 p-6 rounded-lg my-auto mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <div className="text-xl font-bold flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-400" />
            Documentação: {service}
          </div>
          <p className="text-slate-400">
            Documentação completa de erros, implementações e pipeline
          </p>
        </div>

        <Tabs defaultValue="errors" className="mt-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="errors">Erros</TabsTrigger>
            <TabsTrigger value="implementation">Implementação</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="governance">Governança</TabsTrigger>
          </TabsList>
          
          <TabsContent value="errors" className="mt-4 space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200 text-lg">Erros Detectados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-start space-x-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <h3 className="text-slate-200 font-medium">Vazamento de Memória</h3>
                      <p className="text-sm text-slate-400 mt-1">
                        Detectado em <code className="text-yellow-300">service/handler.go:156</code>
                      </p>
                    </div>
                    <Badge className="ml-auto bg-red-500/20 text-red-300 border-red-500/30">
                      Crítico
                    </Badge>
                  </div>
                  <div className="ml-8 space-y-2">
                    <p className="text-slate-400 text-sm">
                      O recurso não está sendo liberado corretamente após o uso, causando vazamento de memória.
                    </p>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                      <pre>{`func processRequest(req *Request) *Response {
  conn := pool.Get()
  // Problema: conn nunca é devolvido ao pool
  data := fetchData(conn)
  return buildResponse(data)
}`}</pre>
                    </div>
                    <div className="flex items-start mt-2">
                      <Code className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                      <p className="text-green-300 text-sm">
                        Solução: Adicionar <code className="text-yellow-300">defer conn.Close()</code> após obter a conexão
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-start space-x-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <h3 className="text-slate-200 font-medium">SQL Injection Vulnerável</h3>
                      <p className="text-sm text-slate-400 mt-1">
                        Detectado em <code className="text-yellow-300">db/queries.go:78</code>
                      </p>
                    </div>
                    <Badge className="ml-auto bg-red-500/20 text-red-300 border-red-500/30">
                      Crítico
                    </Badge>
                  </div>
                  <div className="ml-8 space-y-2">
                    <p className="text-slate-400 text-sm">
                      Consulta SQL não parametrizada pode permitir injeção de SQL.
                    </p>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                      <pre>{`func GetUserByID(id string) *User {
  query := "SELECT * FROM users WHERE id = " + id
  // Problema: concatenação direta de entrada do usuário
  rows, _ := db.Query(query)
  // ...
}`}</pre>
                    </div>
                    <div className="flex items-start mt-2">
                      <Code className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                      <p className="text-green-300 text-sm">
                        Solução: Usar consultas parametrizadas <code className="text-yellow-300">db.Query("SELECT * FROM users WHERE id = ?", id)</code>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="implementation" className="mt-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200 text-lg">Sugestões de Implementação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-start space-x-3 mb-3">
                    <GitPullRequest className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="text-slate-200 font-medium">Atualização de Dependências</h3>
                      <Badge className="ml-2 bg-green-500/20 text-green-300 border-green-500/30">
                        Aprovado
                      </Badge>
                    </div>
                  </div>
                  <div className="ml-8 space-y-2">
                    <p className="text-slate-400 text-sm">
                      Atualizar a dependência logger para v1.3.1 para corrigir vulnerabilidades de segurança.
                    </p>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                      <pre>{`// go.mod
module myapp

require (
  github.com/example/logger v1.2.3 // Versão vulnerável
  // ...
)

// Atualizar para:
// github.com/example/logger v1.3.1`}</pre>
                    </div>
                    <div className="flex items-start mt-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                      <p className="text-green-300 text-sm">
                        Implementação aprovada por: Maria Silva em 08/06/2024
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pipeline" className="mt-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200 text-lg">Pipeline CI/CD</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-slate-200 font-medium mb-3">Status da Pipeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-slate-300">Testes Unitários</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        Passou (127/130)
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="governance" className="mt-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200 text-lg">Governança de TI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-slate-200 font-medium mb-3">Conformidade</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-slate-300">LGPD</p>
                        <p className="text-xs text-slate-400">Dados pessoais protegidos conforme requisitos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
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