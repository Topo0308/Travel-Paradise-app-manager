import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface User {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  role: 'admin' | 'guide' | 'visiteur';
  paysAffectation?: string;
}

interface VisiteurInterfaceProps {
  user: User;
  onLogout: () => void;
}

const VisiteurInterface: React.FC<VisiteurInterfaceProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Visiteur - Bienvenue {user.prenom} {user.nom}
          </h1>
          <Button onClick={onLogout} variant="outline">
            Déconnexion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Découvrir les destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Explorer nos destinations</p>
              <Button className="w-full">Découvrir</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Réserver une visite</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Réserver une visite guidée</p>
              <Button className="w-full">Réserver</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mes réservations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Voir mes réservations</p>
              <Button className="w-full">Mes réservations</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VisiteurInterface;