
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
  CheckCircle
} from 'lucide-react';
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

  const services = [
    {
      id: 1,
      title: "Admin",
      tier: "Mission Critical",
      onCall: "Anton Sitwat",
      lifecycle: "Deprecated",
      language: "Python",
      lastCommitter: "Anton Sitwat",
      avatar: "AS"
    },
    {
      id: 2,
      title: "Order",
      tier: "Customer Facing",
      onCall: "Michael Molina",
      lifecycle: "Production",
      language: "GO",
      lastCommitter: "Gary Zhu",
      avatar: "MM"
    },
    {
      id: 3,
      title: "Payment",
      tier: "Internal Service",
      onCall: "Alexander Ma",
      lifecycle: "Production",
      language: "GO",
      lastCommitter: "Daniyel Mosh",
      avatar: "AM"
    },
    {
      id: 4,
      title: "Frontend",
      tier: "Customer Facing",
      onCall: "Daniyel Moshe",
      lifecycle: "Production",
      language: "React",
      lastCommitter: "Yu Panya",
      avatar: "DM"
    },
    {
      id: 5,
      title: "Currency",
      tier: "Internal Service",
      onCall: "Gary Zhu",
      lifecycle: "Production",
      language: "GO",
      lastCommitter: "Anton Sitwat",
      avatar: "GZ"
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Mission Critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Customer Facing': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Internal Service': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getLifecycleColor = (lifecycle: string) => {
    switch (lifecycle) {
      case 'Production': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Deprecated': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Development': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'Python': return 'bg-yellow-600/20 text-yellow-300 border-yellow-600/30';
      case 'GO': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'React': return 'bg-blue-400/20 text-blue-300 border-blue-400/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.tier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">4AI</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              Service Catalog
            </h1>
          </div>
          <p className="text-slate-400">
            This is a software catalog. Drill down into a service to see context and dependencies, resources, CI/CD and more, as well as scorecards associated with it.
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
                    placeholder="Search columns"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-slate-600 text-slate-200 placeholder-slate-400"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Service
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
                  <TableHead className="text-slate-300">Title</TableHead>
                  <TableHead className="text-slate-300">Tier</TableHead>
                  <TableHead className="text-slate-300">URL</TableHead>
                  <TableHead className="text-slate-300">On Call</TableHead>
                  <TableHead className="text-slate-300">Lifecycle</TableHead>
                  <TableHead className="text-slate-300">Language</TableHead>
                  <TableHead className="text-slate-300">Monitor Dashboards</TableHead>
                  <TableHead className="text-slate-300">Last Committer</TableHead>
                  <TableHead className="text-slate-300">Property</TableHead>
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
                      <Badge variant="outline" className={getTierColor(service.tier)}>
                        {service.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Github className="w-4 h-4 text-slate-400" />
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
                        {service.lifecycle}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getLanguageColor(service.language)}>
                        {service.language}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-medium">{service.lastCommitter.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <span className="text-slate-300">{service.lastCommitter}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-slate-700">
                          <MoreHorizontal className="w-4 h-4 text-slate-400" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-4 text-sm text-slate-400">
          {filteredServices.length} results
        </div>
      </div>
    </div>
  );
};
