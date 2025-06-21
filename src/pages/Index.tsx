
import React, { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import GuideInterface from '@/components/GuideInterface';
import AdminInterface from '@/components/AdminInterface';
import VisiteurInterface from '@/components/VisiteurInterface';

interface User {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  role: 'admin' | 'guide' | 'visiteur';
  paysAffectation?: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  switch (user.role) {
    case 'guide':
      return <GuideInterface user={user} onLogout={handleLogout} />;
    case 'admin':
      return <AdminInterface user={user} onLogout={handleLogout} />;
    case 'visiteur':
      return <VisiteurInterface user={user} onLogout={handleLogout} />;
    default:
      return <div>Rôle non reconnu</div>;
  }
};

export default Index;
