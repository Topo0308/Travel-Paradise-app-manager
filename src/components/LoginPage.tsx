import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { buildApiUrl, API_CONFIG, API_OPTIONS } from '@/config/api';

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

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // États connexion
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // États inscription
  const [registerData, setRegisterData] = useState({
    prenom: '',
    nom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    setError('');
    
    console.log('Tentative de connexion...', { email, url: buildApiUrl(API_CONFIG.ENDPOINTS.LOGIN) });

    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.LOGIN), {
        method: 'POST',
        ...API_OPTIONS,
        body: JSON.stringify({ email, password }),
      });

      console.log('Réponse reçue:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Données reçues:', data);

      if (data.success) {
        console.log('Connexion réussie:', data.user);
        onLogin(data.user);
      } else {
        setError(data.message || 'Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Erreur de connexion au serveur. Vérifiez que le backend est démarré sur le port 8000.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { prenom, nom, email, password, confirmPassword } = registerData;

    if (!prenom || !nom || !email || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    setError('');

    console.log('Tentative d\'inscription...', { prenom, nom, email });

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

      console.log('Réponse inscription:', response.status);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Données inscription:', data);

      if (data.success) {
        setSuccess('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        setIsRegistering(false);
        setRegisterData({
          prenom: '',
          nom: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        setError(data.message || 'Erreur lors de la création du compte');
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      setError('Erreur de connexion au serveur. Vérifiez que le backend est démarré sur le port 8000.');
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      console.log('Test de connexion au backend...');
      const response = await fetch('http://localhost:8000/api', {
        method: 'GET',
        ...API_OPTIONS,
      });
      console.log('Test de connexion:', response.status, response.statusText);
    } catch (error) {
      console.error('Test de connexion échoué:', error);
    }
  };

  // Test de connexion au montage du composant
  React.useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">
            🌍 Travel Paradise
          </CardTitle>
          <p className="text-gray-600">
            {isRegistering ? 'Créer un nouveau compte' : 'Connexion à votre espace'}
          </p>
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

          {isRegistering ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  type="text"
                  value={registerData.prenom}
                  onChange={(e) => setRegisterData({...registerData, prenom: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  type="text"
                  value={registerData.nom}
                  onChange={(e) => setRegisterData({...registerData, nom: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="register-password">Mot de passe</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Création...' : 'Créer le compte'}
              </Button>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => setIsRegistering(false)}
              >
                Retour à la connexion
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => setIsRegistering(true)}
              >
                Créer un compte
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
