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

interface AdminInterfaceProps {
  user: User;
  onLogout: () => void;
}

const AdminInterface: React.FC<AdminInterfaceProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Administration - Bienvenue {user.prenom} {user.nom}
          </h1>
          <Button onClick={onLogout} variant="outline">
            Déconnexion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Gérer les comptes utilisateurs</p>
              <Button className="w-full">Accéder</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestion des guides</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Gérer les guides touristiques</p>
              <Button className="w-full">Accéder</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestion des visites</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Gérer les visites et réservations</p>
              <Button className="w-full">Accéder</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminInterface;