
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Searchbar } from 'react-native-paper';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export default function VisiteurHome({ route }) {
  const { user } = route.params;
  const [visites, setVisites] = useState([]);
  const [filteredVisites, setFilteredVisites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchVisites();
  }, []);

  useEffect(() => {
    filterVisites();
  }, [searchQuery, visites]);

  const fetchVisites = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/visites`);
      const visitesDisponibles = response.data.filter(v => v.statut === 'planifiee');
      setVisites(visitesDisponibles);
    } catch (error) {
      console.error('Erreur fetch visites:', error);
    }
  };

  const filterVisites = () => {
    if (!searchQuery) {
      setFilteredVisites(visites);
    } else {
      const filtered = visites.filter(visite =>
        visite.lieu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visite.pays.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visite.typeActivite.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVisites(filtered);
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      'plage': '🏖️',
      'ville': '🏰',
      'montagne': '⛰️',
      'musee': '🖼️',
      'monument': '🌉',
      'parc': '🏞️',
      'site_historique': '🕌'
    };
    return icons[type] || '📍';
  };

  const reserverVisite = async (visiteId) => {
    // Logique de réservation à implémenter
    console.log('Réservation visite:', visiteId);
  };

  const renderVisite = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title style={styles.lieu}>
            {getTypeIcon(item.typeActivite)} {item.lieu}
          </Title>
        </View>
        
        <Paragraph style={styles.pays}>📍 {item.pays}</Paragraph>
        <Paragraph style={styles.activite}>🎯 {item.typeActivite}</Paragraph>
        
        <View style={styles.timeContainer}>
          <Text style={styles.time}>
            📅 {new Date(item.debut).toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </Text>
          <Text style={styles.time}>
            🕐 {new Date(item.debut).toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            })} - {new Date(item.fin).toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
        
        <Paragraph style={styles.guide}>
          👨‍🏫 Guide: {item.guide.prenom} {item.guide.nom}
        </Paragraph>
        
        <Button
          mode="contained"
          onPress={() => reserverVisite(item.id)}
          style={styles.button}
        >
          Réserver cette visite
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title>Bienvenue {user.prenom} ! 🌍</Title>
          <Paragraph>Découvrez nos visites disponibles</Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Rechercher par lieu, pays ou activité..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <FlatList
        data={filteredVisites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVisite}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerCard: {
    margin: 15,
    marginBottom: 10,
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  searchbar: {
    elevation: 2,
  },
  listContainer: {
    padding: 15,
    paddingTop: 5,
  },
  card: {
    marginBottom: 15,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 10,
  },
  lieu: {
    fontSize: 18,
    color: '#2196F3',
  },
  pays: {
    color: '#666',
    marginBottom: 5,
  },
  activite: {
    color: '#666',
    marginBottom: 10,
  },
  timeContainer: {
    marginBottom: 10,
  },
  time: {
    color: '#888',
    fontSize: 14,
    marginBottom: 3,
  },
  guide: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});
