
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MapPin, Users, Calendar } from "lucide-react";

interface User {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  role: 'admin' | 'guide' | 'visiteur';
  paysAffectation?: string;
}

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Comptes de démonstration
  const demoAccounts = [
    { email: 'jean.dupont@travelparadise.com', password: 'password123', role: 'guide' as const },
    { email: 'admin@travelparadise.com', password: 'admin123', role: 'admin' as const },
    { email: 'pierre@email.com', password: 'visiteur123', role: 'visiteur' as const }
  ];

  const handleLogin = () => {
    const account = demoAccounts.find(acc => acc.email === email && acc.password === password);
    
    if (account) {
      const user: User = {
        id: 1,
        prenom: account.role === 'guide' ? 'Jean' : account.role === 'admin' ? 'Marie' : 'Pierre',
        nom: account.role === 'guide' ? 'Dupont' : account.role === 'admin' ? 'Martin' : 'Durand',
        email: account.email,
        role: account.role,
        paysAffectation: account.role === 'guide' ? 'France' : undefined
      };
      onLogin(user);
    } else {
      alert('Identifiants incorrects');
    }
  };

  const handleRegister = () => {
    if (!prenom || !nom || !email || !password || !confirmPassword) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    if (demoAccounts.find(acc => acc.email === email)) {
      alert('Un compte avec cet email existe déjà');
      return;
    }

    // Créer un nouveau compte visiteur
    const newUser: User = {
      id: Date.now(), // ID temporaire
      prenom,
      nom,
      email,
      role: 'visiteur'
    };

    alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
    
    // Revenir au mode connexion
    setIsRegistering(false);
    setPrenom('');
    setNom('');
    setConfirmPassword('');
    setPassword('');
    setEmail('');
  };

  const fillDemo = (role: 'guide' | 'admin' | 'visiteur') => {
    const account = demoAccounts.find(acc => acc.role === role)!;
    setEmail(account.email);
    setPassword(account.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <MapPin className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Travel Paradise</CardTitle>
          <CardDescription>
            {isRegistering ? 'Créer un nouveau compte' : 'Application de Gestion Touristique'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isRegistering ? (
            // Formulaire d'inscription
            <>
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Votre prénom"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Votre nom"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <Button onClick={handleRegister} className="w-full">
                Créer le compte
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsRegistering(false)} 
                className="w-full"
              >
                Retour à la connexion
              </Button>
            </>
          ) : (
            // Formulaire de connexion
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                Se connecter
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setIsRegistering(true)} 
                className="w-full"
              >
                Créer un compte
              </Button>
              
              <div className="mt-6 border-t pt-4">
                <p className="text-sm text-gray-600 text-center mb-3">Comptes de démonstration :</p>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => fillDemo('guide')}
                    className="w-full text-left justify-start"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Guide - Jean Dupont
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => fillDemo('admin')}
                    className="w-full text-left justify-start"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Admin - Marie Martin
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => fillDemo('visiteur')}
                    className="w-full text-left justify-start"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Visiteur - Pierre Durand
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;