
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Calendar, Users, Star } from "lucide-react";

interface User {
  id: number;
  prenom: string;
  nom: string;
  role: string;
}

interface VisiteurInterfaceProps {
  user: User;
  onLogout: () => void;
}

const VisiteurInterface = ({ user, onLogout }: VisiteurInterfaceProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tous');

  // Données de démonstration
  const visites = [
    {
      id: 1,
      lieu: "Tour Eiffel",
      pays: "France",
      photo: "🗼",
      debut: "2024-01-20 09:00:00",
      fin: "2024-01-20 11:00:00",
      guide: "Jean Dupont",
      placesDisponibles: 5,
      typeActivite: "Monument",
      prix: 25,
      note: 4.8,
      description: "Découvrez le symbole de Paris avec une visite guidée exceptionnelle"
    },
    {
      id: 2,
      lieu: "Musée du Louvre",
      pays: "France", 
      photo: "🖼️",
      debut: "2024-01-21 14:00:00",
      fin: "2024-01-21 16:00:00",
      guide: "Marie Dubois",
      placesDisponibles: 8,
      typeActivite: "Musée",
      prix: 35,
      note: 4.9,
      description: "Explorez les chefs-d'œuvre du plus grand musée du monde"
    },
    {
      id: 3,
      lieu: "Plage de Blankenberge",
      pays: "Belgique",
      photo: "🏖️",
      debut: "2024-01-22 10:00:00", 
      fin: "2024-01-22 15:00:00",
      guide: "Thomas Van Berg",
      placesDisponibles: 12,
      typeActivite: "Plage",
      prix: 20,
      note: 4.6,
      description: "Journée détente sur la côte belge avec activités nautiques"
    },
    {
      id: 4,
      lieu: "Montagnes de l'Atlas",
      pays: "Maroc",
      photo: "⛰️",
      debut: "2024-01-25 08:00:00",
      fin: "2024-01-25 18:00:00",
      guide: "Ahmed Hassan",
      placesDisponibles: 6,
      typeActivite: "Montagne",
      prix: 45,
      note: 4.7,
      description: "Randonnée authentique dans les montagnes berbères"
    }
  ];

  const categories = [
    { id: 'tous', label: 'Tous', icon: '🌍' },
    { id: 'Monument', label: 'Monuments', icon: '🏛️' },
    { id: 'Musée', label: 'Musées', icon: '🖼️' },
    { id: 'Plage', label: 'Plages', icon: '🏖️' },
    { id: 'Montagne', label: 'Montagnes', icon: '⛰️' }
  ];

  const filteredVisites = visites.filter(visite => {
    const matchesSearch = visite.lieu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visite.pays.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'tous' || visite.typeActivite === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReserver = (visite: any) => {
    alert(`Réservation confirmée pour "${visite.lieu}" le ${new Date(visite.debut).toLocaleDateString()} !`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Découvrir les Visites</h1>
            <p className="text-gray-600">Bonjour {user.prenom} {user.nom}</p>
          </div>
          <Button onClick={onLogout} variant="outline">
            Déconnexion
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Barre de recherche */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un lieu ou un pays..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Catégories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2"
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </Button>
          ))}
        </div>

        {/* Liste des visites */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVisites.map((visite) => (
            <Card key={visite.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center">
                  <div className="text-6xl mb-2">{visite.photo}</div>
                  <h3 className="text-xl font-bold text-white">{visite.lieu}</h3>
                  <p className="text-blue-100">{visite.pays}</p>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{visite.typeActivite}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{visite.note}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">{visite.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(visite.debut).toLocaleDateString()}</span>
                      <span className="text-gray-400">
                        {new Date(visite.debut).toLocaleTimeString().slice(0,5)} - 
                        {new Date(visite.fin).toLocaleTimeString().slice(0,5)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{visite.placesDisponibles} places disponibles</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>Guide: {visite.guide}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-xl font-bold text-green-600">{visite.prix}€</span>
                    <Button 
                      onClick={() => handleReserver(visite)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Réserver
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVisites.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">Aucune visite trouvée pour vos critères de recherche.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VisiteurInterface;
