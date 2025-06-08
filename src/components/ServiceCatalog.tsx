
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Download, 
  Settings, 
  Plus, 
  MoreHorizontal,
  Github,
  User,
  Zap,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Users,
  Code
} from 'lucide-react';
import { GovernanceBanner } from '@/components/GovernanceBanner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const ServiceCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSquad, setSelectedSquad] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showGovBanner, setShowGovBanner] = useState(true);

  const squads = [
    {
      id: 1,
      name: "Squad Alpha",
      products: [
        {
          id: "alpha-1",
          name: "Portal Cliente"
        },
        {
          id: "alpha-2",
          name: "API Gateway"
        }
      ]
    },
    {
      id: 2,
      name: "Squad Beta",
      products: [
        {
          id: "beta-1",
          name: "Sistema de Pagamentos"
        },
        {
          id: "beta-2",
          name: "Autenticação"
        }
      ]
    },
    {
      id: 3,
      name: "Squad Gamma",
      products: [
        {
          id: "gamma-1",
          name: "Análise de Dados"
        },
        {
          id: "gamma-2",
          name: "Dashboard BI"
        }
      ]
    }
  ];

  const services = [
    {
      id: 1,
      title: "Admin",
      tier: "Mission Critical",
      onCall: "Anton Sitwat",
      lifecycle: "Deprecated",
      language: "Python",
      lastCommitter: "Anton Sitwat",
      avatar: "AS",
      squad: "Squad Alpha",
      product: "Portal Cliente",
      devStatus: "Em Desenvolvimento"
    },
    {
      id: 2,
      title: "Order",
      tier: "Customer Facing",
      onCall: "Michael Molina",
      lifecycle: "Production",
      language: "Java",
      lastCommitter: "Gary Zhu",
      avatar: "MM",
      squad: "Squad Alpha",
      product: "API Gateway",
      devStatus: "Concluído"
    },
    {
      id: 3,
      title: "Payment",
      tier: "Internal Service",
      onCall: "Alexander Ma",
      lifecycle: "Production",
      language: "Java",
      lastCommitter: "Daniyel Mosh",
      avatar: "AM",
      squad: "Squad Beta",
      product: "Sistema de Pagamentos",
      devStatus: "Em Testes"
    },
    {
      id: 4,
      title: "Frontend",
      tier: "Customer Facing",
      onCall: "Daniyel Moshe",
      lifecycle: "Production",
      language: "Python",
      lastCommitter: "Yu Panya",
      avatar: "DM",
      squad: "Squad Beta",
      product: "Autenticação",
      devStatus: "Em Desenvolvimento"
    },
    {
      id: 5,
      title: "Currency",
      tier: "Internal Service",
      onCall: "Gary Zhu",
      lifecycle: "Production",
      language: "Java",
      lastCommitter: "Anton Sitwat",
      avatar: "GZ",
      squad: "Squad Gamma",
      product: "Análise de Dados",
      devStatus: "Concluído"
    },
    {
      id: 6,
      title: "Analytics",
      tier: "Internal Service",
      onCall: "Maria Silva",
      lifecycle: "Development",
      language: "Python",
      lastCommitter: "Maria Silva",
      avatar: "MS",
      squad: "Squad Gamma",
      product: "Dashboard BI",
      devStatus: "Em Planejamento"
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Mission Critical': return 'bg-red-500/20 text-red-300 border-red-500/30'; // Missão Crítica
      case 'Customer Facing': return 'bg-green-500/20 text-green-300 border-green-500/30'; // Voltado ao Cliente
      case 'Internal Service': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'; // Serviço Interno
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getLifecycleColor = (lifecycle: string) => {
    switch (lifecycle) {
      case 'Production': return 'bg-green-500/20 text-green-300 border-green-500/30'; // Produção
      case 'Deprecated': return 'bg-red-500/20 text-red-300 border-red-500/30'; // Descontinuado
      case 'Development': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'; // Desenvolvimento
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'Python': return 'bg-yellow-600/20 text-yellow-300 border-yellow-600/30';
      case 'Java': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getDevStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Em Testes': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Em Desenvolvimento': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Em Planejamento': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const filteredServices = services.filter(service => {
    // Filtro por texto de busca
    const matchesSearch = 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.tier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.language.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por squad selecionado
    const matchesSquad = selectedSquad ? service.squad === selectedSquad : true;
    
    // Filtro por produto selecionado
    const matchesProduct = selectedProduct ? service.product === selectedProduct : true;
    
    return matchesSearch && matchesSquad && matchesProduct;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Faixa de Governança */}
      <GovernanceBanner showBanner={showGovBanner} setShowBanner={setShowGovBanner} />
      
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">4AI</span>
              </div>
              <h1 className="text-3xl font-bold" style={{ color: "#54c56c" }}>
                Catálogo de Serviços
              </h1>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-slate-600 hover:bg-slate-700"
              onClick={() => window.history.back()}
            >
              <ChevronDown className="w-4 h-4 mr-2 rotate-90" />
              Voltar
            </Button>
          </div>
          <p className="text-slate-400">
            Este é um catálogo de software. Explore um serviço para ver contexto e dependências, recursos, CI/CD e mais, bem como scorecards associados a ele.
          </p>
        </div>

        {/* Search and Actions */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Pesquisar colunas"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-slate-600 text-slate-200 placeholder-slate-400"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700">
                      <Users className="w-4 h-4 mr-2" />
                      {selectedSquad || "Squads"}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-800 border-slate-700 text-slate-200">
                    <DropdownMenuLabel>Selecione um Squad</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem 
                      className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                      onClick={() => {
                        setSelectedSquad(null);
                        setSelectedProduct(null);
                      }}
                    >
                      Todos os Squads
                    </DropdownMenuItem>
                    {squads.map(squad => (
                      <DropdownMenuItem 
                        key={squad.id}
                        className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                        onClick={() => {
                          setSelectedSquad(squad.name);
                          setSelectedProduct(null);
                        }}
                      >
                        {squad.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {selectedSquad && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700">
                        <Code className="w-4 h-4 mr-2" />
                        {selectedProduct || "Produtos"}
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-800 border-slate-700 text-slate-200">
                      <DropdownMenuLabel>Produtos de {selectedSquad}</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      <DropdownMenuItem 
                        className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                        onClick={() => setSelectedProduct(null)}
                      >
                        Todos os Produtos
                      </DropdownMenuItem>
                      {squads
                        .find(squad => squad.name === selectedSquad)?.products
                        .map(product => (
                          <DropdownMenuItem 
                            key={product.id}
                            className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                            onClick={() => setSelectedProduct(product.name)}
                          >
                            {product.name}
                          </DropdownMenuItem>
                        ))
                      }
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-slate-600 hover:bg-slate-700"
                  onClick={() => {
                    setSelectedSquad(null);
                    setSelectedProduct(null);
                  }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Table */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Título</TableHead>
                  <TableHead className="text-slate-300">Squad</TableHead>
                  <TableHead className="text-slate-300">Produto</TableHead>
                  <TableHead className="text-slate-300">Status Dev</TableHead>
                  <TableHead className="text-slate-300">Responsável</TableHead>
                  <TableHead className="text-slate-300">Ciclo de Vida</TableHead>
                  <TableHead className="text-slate-300">Linguagem</TableHead>
                  <TableHead className="text-slate-300">Último Committer</TableHead>

                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id} className="border-slate-700 hover:bg-slate-700/30">
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-slate-600 rounded flex items-center justify-center">
                          <span className="text-xs text-slate-300">🔧</span>
                        </div>
                        <span className="text-blue-400 font-medium">{service.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {service.squad}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {service.product}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getDevStatusColor(service.devStatus)}>
                        {service.devStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-medium">{service.avatar}</span>
                        </div>
                        <span className="text-slate-300">{service.onCall}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getLifecycleColor(service.lifecycle)}>
                        {service.lifecycle === 'Production' ? 'Produção' : 
                         service.lifecycle === 'Deprecated' ? 'Descontinuado' : 
                         service.lifecycle === 'Development' ? 'Desenvolvimento' : service.lifecycle}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getLanguageColor(service.language)}>
                        {service.language}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-medium">{service.lastCommitter.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <span className="text-slate-300">{service.lastCommitter}</span>
                      </div>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-4">
          <div className="text-sm text-slate-400">
            {filteredServices.length} resultados
          </div>
        </div>
      </div>
    </div>
  );
};
