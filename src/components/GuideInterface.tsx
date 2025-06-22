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

interface GuideInterfaceProps {
  user: User;
  onLogout: () => void;
}

const GuideInterface: React.FC<GuideInterfaceProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Guide - Bienvenue {user.prenom} {user.nom}
            {user.paysAffectation && (
              <span className="text-sm text-gray-600 block">
                Pays d'affectation: {user.paysAffectation}
              </span>
            )}
          </h1>
          <Button onClick={onLogout} variant="outline">
            Déconnexion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Mes visites</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Gérer mes visites guidées</p>
              <Button className="w-full">Voir mes visites</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Consulter mon planning</p>
              <Button className="w-full">Voir le planning</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GuideInterface;