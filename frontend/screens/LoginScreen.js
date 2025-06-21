
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>🌍 Travel Paradise</Title>
          <Paragraph style={styles.subtitle}>Connexion à votre espace</Paragraph>
          
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
