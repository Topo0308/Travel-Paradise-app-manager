
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface User {
  id: number;
  prenom: string;
  nom: string;
  role: string;
}

interface GuideInterfaceProps {
  user: User;
  onLogout: () => void;
}

const GuideInterface = ({ user, onLogout }: GuideInterfaceProps) => {
  const [selectedVisite, setSelectedVisite] = useState<any>(null);
  const [commentaire, setCommentaire] = useState('');

  // Données de démonstration
  const visites = [
    {
      id: 1,
      lieu: "Tour Eiffel",
      pays: "France",
      debut: "2024-01-15 09:00:00",
      fin: "2024-01-15 11:00:00",
      visiteurs: ["Marie Dubois", "Jean Martin", "Sophie Leroux"],
      statut: "en_cours",
      typeActivite: "Visite guidée"
    },
    {
      id: 2,
      lieu: "Musée du Louvre", 
      pays: "France",
      debut: "2024-01-15 14:00:00",
      fin: "2024-01-15 16:00:00",
      visiteurs: ["Pierre Durand", "Lucie Moreau"],
      statut: "planifiee",
      typeActivite: "Visite culturelle"
    },
    {
      id: 3,
      lieu: "Château de Versailles",
      pays: "France", 
      debut: "2024-01-14 10:00:00",
      fin: "2024-01-14 12:00:00",
      visiteurs: ["Anna Silva", "Marco Rossi", "Elena Garcia"],
      statut: "terminee",
      typeActivite: "Visite historique"
    }
  ];

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'en_cours': return 'bg-green-500';
      case 'planifiee': return 'bg-blue-500';
      case 'terminee': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'en_cours': return 'En cours';
      case 'planifiee': return 'Planifiée';
      case 'terminee': return 'Terminée';
      default: return statut;
    }
  };

  const handleCloturer = () => {
    alert(`Visite "${selectedVisite?.lieu}" clôturée avec succès !`);
    setSelectedVisite(null);
    setCommentaire('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Interface Guide</h1>
            <p className="text-gray-600">Bonjour {user.prenom} {user.nom}</p>
          </div>
          <Button onClick={onLogout} variant="outline">
            Déconnexion
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Visites aujourd'hui</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Visiteurs total</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Visites terminées</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des visites */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Mes Visites</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {visites.map((visite) => (
                <div key={visite.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{visite.lieu}</h3>
                        <Badge className={getStatusColor(visite.statut)}>
                          {getStatusText(visite.statut)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{visite.pays}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(visite.debut).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{visite.visiteurs.length} visiteurs</span>
                        </div>
                        <div>
                          <span className="font-medium">{visite.typeActivite}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Visiteurs:</p>
                        <p className="text-sm text-gray-600">{visite.visiteurs.join(', ')}</p>
                      </div>
                    </div>
                    
                    {visite.statut === 'en_cours' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            onClick={() => setSelectedVisite(visite)}
                            className="ml-4"
                          >
                            Clôturer
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Clôturer la visite - {visite.lieu}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="commentaire">Commentaire de fin de visite</Label>
                              <Textarea
                                id="commentaire"
                                value={commentaire}
                                onChange={(e) => setCommentaire(e.target.value)}
                                placeholder="Ajoutez vos observations sur la visite..."
                                className="mt-1"
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" onClick={() => setSelectedVisite(null)}>
                                Annuler
                              </Button>
                              <Button onClick={handleCloturer}>
                                Clôturer la visite
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuideInterface;
