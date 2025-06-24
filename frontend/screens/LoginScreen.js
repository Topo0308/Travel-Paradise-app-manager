import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;
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
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });

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
        Alert.alert('Erreur', 'Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      Alert.alert('Erreur', 'Problème de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    if (!prenom || !nom || !email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    // Ici, tu peux appeler ton API d'inscription, ou faire autre chose
    Alert.alert('Succès', 'Compte créé ! Vous pouvez maintenant vous connecter.');

    // Reset et retour au login
    setIsRegistering(false);
    setPrenom('');
    setNom('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
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
                label="Prénom"
                value={prenom}
                onChangeText={setPrenom}
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Nom"
                value={nom}
                onChangeText={setNom}
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry
              />
              <TextInput
                label="Confirmer le mot de passe"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry
              />
              <Button
                mode="contained"
                onPress={handleRegister}
                loading={loading}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Créer le compte
              </Button>
              <Button
                mode="text"
                onPress={() => setIsRegistering(false)}
                style={styles.button}
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
              />
              <TextInput
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry
              />
              <Button
                mode="contained"
                onPress={handleLogin}
                loading={loading}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Se connecter
              </Button>
              <Button
                mode="outlined"
                onPress={() => setIsRegistering(true)}
                style={styles.button}
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
    marginBottom: 30,
    color: '#666',
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
