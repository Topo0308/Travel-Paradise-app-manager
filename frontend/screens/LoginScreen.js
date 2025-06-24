import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import { API_BASE_URL } from './constants';

export default function LoginScreen({ navigation }) {
  const [isRegistering, setIsRegistering] = useState(false);

  // États communs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // États inscription
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    console.log('🔑 Tentative de connexion mobile...', { email, url: `${API_BASE_URL}/auth/login` });

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });

      console.log('📱 Réponse mobile:', response.data);

      if (response.data.success) {
        const user = response.data.user;
        
        switch (user.role) {
          case 'admin':
            navigation.navigate('AdminHome', { user });
            break;
          case 'guide':
            navigation.navigate('GuideHome', { user });
            break;
          case 'visiteur':
            navigation.navigate('VisiteurHome', { user });
            break;
          default:
            Alert.alert('Erreur', 'Rôle utilisateur non reconnu');
        }
      } else {
        Alert.alert('Erreur', response.data.message || 'Identifiants incorrects');
      }
    } catch (error) {
      console.error('❌ Erreur de connexion mobile:', error);
      Alert.alert('Erreur', 'Problème de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!prenom || !nom || !email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide');
      return;
    }

    setLoading(true);
    console.log('🚀 Tentative d\'inscription mobile...', { prenom, nom, email, url: `${API_BASE_URL}/auth/register` });

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        prenom,
        nom,
        email,
        password,
        role: 'visiteur'
      });

      console.log('📝 Réponse inscription mobile:', response.data);

      if (response.data.success) {
        Alert.alert('Succès', 'Compte créé avec succès ! Vous pouvez maintenant vous connecter.', [
          {
            text: 'OK',
            onPress: () => {
              // Reset et retour au login
              setIsRegistering(false);
              setPrenom('');
              setNom('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
            }
          }
        ]);
      } else {
        Alert.alert('Erreur', response.data.message || 'Erreur lors de la création du compte');
      }
    } catch (error) {
      console.error('❌ Erreur d\'inscription mobile:', error);
      let errorMessage = 'Erreur de connexion au serveur';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      Alert.alert('Erreur', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>🌍 Travel Paradise</Title>
          <Paragraph style={styles.subtitle}>
            {isRegistering ? 'Créer un nouveau compte' : 'Connexion à votre espace'}
          </Paragraph>

          {isRegistering ? (
            <>
              <TextInput
                label="Prénom *"
                value={prenom}
                onChangeText={setPrenom}
                mode="outlined"
                style={styles.input}
                placeholder="Jean"
              />
              <TextInput
                label="Nom *"
                value={nom}
                onChangeText={setNom}
                mode="outlined"
                style={styles.input}
                placeholder="Dupont"
              />
              <TextInput
                label="Email *"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="jean.dupont@example.com"
              />
              <TextInput
                label="Mot de passe *"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry
                placeholder="Au moins 6 caractères"
              />
              <TextInput
                label="Confirmer le mot de passe *"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry
                placeholder="Répétez votre mot de passe"
              />
              <Button
                mode="contained"
                onPress={handleRegister}
                loading={loading}
                style={styles.button}
                contentStyle={styles.buttonContent}
                disabled={loading}
              >
                Créer mon compte
              </Button>
              <Button
                mode="text"
                onPress={() => setIsRegistering(false)}
                style={styles.button}
                disabled={loading}
              >
                Retour à la connexion
              </Button>
            </>
          ) : (
            <>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="admin@test.com"
              />
              <TextInput
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry
                placeholder="password"
              />
              <Button
                mode="contained"
                onPress={handleLogin}
                loading={loading}
                style={styles.button}
                contentStyle={styles.buttonContent}
                disabled={loading}
              >
                Se connecter
              </Button>
              <Button
                mode="outlined"
                onPress={() => setIsRegistering(true)}
                style={styles.button}
                disabled={loading}
              >
                Créer un compte
              </Button>
            </>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 10,
    color: '#2196F3',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  testAccountsContainer: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  testAccountsTitle: {
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 5,
  },
  testAccountsText: {
    fontSize: 12,
    color: '#1976d2',
    marginBottom: 2,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  buttonContent: {
    height: 50,
  },
});