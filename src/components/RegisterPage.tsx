import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { buildApiUrl, API_CONFIG, API_OPTIONS } from '@/config/api';

interface RegisterPageProps {
  onBackToLogin: () => void;
  onRegisterSuccess: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onBackToLogin, onRegisterSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { prenom, nom, email, password, confirmPassword } = formData;

    // Validation frontend
    if (!prenom || !nom || !email || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Veuillez entrer un email valide');
      return;
    }

    setLoading(true);
    setError('');

    console.log('🚀 Tentative d\'inscription...', { 
      prenom, 
      nom, 
      email,
      url: buildApiUrl(API_CONFIG.ENDPOINTS.REGISTER)
    });

    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.REGISTER), {
        method: 'POST',
        ...API_OPTIONS,
        body: JSON.stringify({
          prenom,
          nom,
          email,
          password,
          role: 'visiteur'
        }),
      });

      console.log('📝 Réponse inscription:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      const data = await response.json();
      console.log('📋 Données inscription reçues:', data);

      if (response.ok && data.success) {
        setSuccess('Compte créé avec succès ! Redirection vers la connexion...');
        
        // Reset du formulaire
        setFormData({
          prenom: '',
          nom: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

        // Redirection après 2 secondes
        setTimeout(() => {
          onRegisterSuccess();
        }, 2000);

      } else {
        setError(data.message || 'Erreur lors de la création du compte');
      }
    } catch (error) {
      console.error('❌ Erreur d\'inscription détaillée:', error);
      setError(`Erreur de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">
            🌍 Travel Paradise
          </CardTitle>
          <p className="text-gray-600">
            Créer un nouveau compte
          </p>
          <div className="text-xs text-gray-400 mt-2">
            Backend: http://192.168.129.33:8000
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription className="text-green-600">{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="prenom">Prénom *</Label>
              <Input
                id="prenom"
                type="text"
                value={formData.prenom}
                onChange={(e) => handleInputChange('prenom', e.target.value)}
                required
                placeholder="Jean"
              />
            </div>

            <div>
              <Label htmlFor="nom">Nom *</Label>
              <Input
                id="nom"
                type="text"
                value={formData.nom}
                onChange={(e) => handleInputChange('nom', e.target.value)}
                required
                placeholder="Dupont"
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                placeholder="jean.dupont@example.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Mot de passe *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                placeholder="Au moins 6 caractères"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
                placeholder="Répétez votre mot de passe"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Création en cours...' : 'Créer mon compte'}
            </Button>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={onBackToLogin}
              disabled={loading}
            >
              Retour à la connexion
            </Button>
          </form>

          <div className="text-xs text-center text-gray-500 mt-4">
            En créant un compte, vous acceptez nos conditions d'utilisation
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
