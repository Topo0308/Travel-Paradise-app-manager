
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, MapPin, TrendingUp, Star } from "lucide-react";

interface User {
  id: number;
  prenom: string;
  nom: string;
  role: string;
}

interface AdminInterfaceProps {
  user: User;
  onLogout: () => void;
}

const AdminInterface = ({ user, onLogout }: AdminInterfaceProps) => {
  // Données de démonstration
  const guides = [
    { id: 1, prenom: 'Jean', nom: 'Dupont', statut: 'actif', paysAffectation: 'France', visites: 12 },
    { id: 2, prenom: 'Maria', nom: 'Garcia', statut: 'actif', paysAffectation: 'Espagne', visites: 8 },
    { id: 3, prenom: 'Ahmed', nom: 'Hassan', statut: 'en_repos', paysAffectation: 'Maroc', visites: 15 }
  ];

  const visites = [
    { id: 1, lieu: 'Tour Eiffel', pays: 'France', guide: 'Jean Dupont', visiteurs: 15, statut: 'terminee', note: 4.8 },
    { id: 2, lieu: 'Sagrada Familia', pays: 'Espagne', guide: 'Maria Garcia', visiteurs: 12, statut: 'en_cours', note: null },
    { id: 3, lieu: 'Atlas Mountains', pays: 'Maroc', guide: 'Ahmed Hassan', visiteurs: 8, statut: 'planifiee', note: null }
  ];

  const statistiques = {
    totalVisites: 156,
    visitesEnCours: 3,
    totalGuides: 8,
    tauxPresence: 92,
    noteMoyenne: 4.6
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'actif': return 'bg-green-500';
      case 'en_repos': return 'bg-orange-500';
      case 'en_cours': return 'bg-blue-500';
      case 'terminee': return 'bg-gray-500';
      case 'planifiee': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Interface Administration</h1>
            <p className="text-gray-600">Bonjour {user.prenom} {user.nom}</p>
          </div>
          <Button onClick={onLogout} variant="outline">
            Déconnexion
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Total Visites</p>
                  <p className="text-2xl font-bold">{statistiques.totalVisites}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">En cours</p>
                  <p className="text-2xl font-bold">{statistiques.visitesEnCours}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Guides actifs</p>
                  <p className="text-2xl font-bold">{statistiques.totalGuides}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Taux présence</p>
                  <p className="text-2xl font-bold">{statistiques.tauxPresence}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">Note moyenne</p>
                  <p className="text-2xl font-bold">{statistiques.noteMoyenne}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets */}
        <Tabs defaultValue="guides" className="space-y-4">
          <TabsList>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="visites">Visites</TabsTrigger>
            <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="guides">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Gestion des Guides</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {guides.map((guide) => (
                    <div key={guide.id} className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{guide.prenom} {guide.nom}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span>📍 {guide.paysAffectation}</span>
                          <span>🗓️ {guide.visites} visites</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(guide.statut)}>
                        {guide.statut === 'actif' ? 'Actif' : 'En repos'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visites">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Gestion des Visites</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {visites.map((visite) => (
                    <div key={visite.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold">{visite.lieu}</h3>
                            <Badge className={getStatusColor(visite.statut)}>
                              {visite.statut.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <span>🌍 {visite.pays}</span>
                            <span>👨‍🏫 {visite.guide}</span>
                            <span>👥 {visite.visiteurs} visiteurs</span>
                            {visite.note && <span>⭐ {visite.note}/5</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistiques">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visites par mois</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Janvier</span>
                      <span className="font-bold">45 visites</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Février</span>
                      <span className="font-bold">52 visites</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mars</span>
                      <span className="font-bold">59 visites</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Destinations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>🇫🇷 France</span>
                      <span className="font-bold">68 visites</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🇪🇸 Espagne</span>
                      <span className="font-bold">45 visites</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🇲🇦 Maroc</span>
                      <span className="font-bold">43 visites</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminInterface;
