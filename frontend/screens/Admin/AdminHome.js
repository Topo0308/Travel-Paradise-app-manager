
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Text, Appbar, Tabs, TabScreen } from 'react-native-paper';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export default function AdminHome({ route }) {
  const { user } = route.params;
  const [guides, setGuides] = useState([]);
  const [visites, setVisites] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [guidesRes, visitesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/guides`),
        axios.get(`${API_BASE_URL}/visites`)
      ]);
      
      setGuides(guidesRes.data);
      setVisites(visitesRes.data);
      
      // Calcul des statistiques
      const totalVisites = visitesRes.data.length;
      const visitesTerminees = visitesRes.data.filter(v => v.statut === 'terminee').length;
      const notesMoyenne = visitesRes.data
        .filter(v => v.note)
        .reduce((acc, v) => acc + v.note, 0) / visitesRes.data.filter(v => v.note).length || 0;

      setStats({
        totalVisites,
        visitesTerminees,
        notesMoyenne: notesMoyenne.toFixed(1),
        tauxReussite: ((visitesTerminees / totalVisites) * 100).toFixed(1)
      });
    } catch (error) {
      console.error('Erreur fetch data:', error);
    }
  };

  const renderGuide = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.prenom} {item.nom}</Title>
        <Paragraph>📍 {item.paysAffectation}</Paragraph>
        <Paragraph>📧 {item.email}</Paragraph>
        <Text style={[styles.statut, { 
          backgroundColor: item.statut === 'actif' ? '#4CAF50' : '#FF9800' 
        }]}>
          {item.statut}
        </Text>
      </Card.Content>
    </Card>
  );

  const renderVisite = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.lieu}</Title>
        <Paragraph>🌍 {item.pays}</Paragraph>
        <Paragraph>👨‍🏫 {item.guide.prenom} {item.guide.nom}</Paragraph>
        <Paragraph>👥 {item.visiteurs.length} visiteurs</Paragraph>
        <Text style={[styles.statut, { 
          backgroundColor: item.statut === 'terminee' ? '#4CAF50' : '#2196F3' 
        }]}>
          {item.statut}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title>Administration - {user.prenom} {user.nom}</Title>
          <Paragraph>Tableau de bord Travel Paradise</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.statsCard}>
        <Card.Content>
          <Title>📊 Statistiques</Title>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.totalVisites}</Text>
              <Text style={styles.statLabel}>Total visites</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.visitesTerminees}</Text>
              <Text style={styles.statLabel}>Terminées</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.notesMoyenne}</Text>
              <Text style={styles.statLabel}>Note moyenne</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.tauxReussite}%</Text>
              <Text style={styles.statLabel}>Taux réussite</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.tabContainer}>
        <Title style={styles.sectionTitle}>👨‍🏫 Guides ({guides.length})</Title>
        <FlatList
          data={guides}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGuide}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        <Title style={styles.sectionTitle}>🗺️ Visites ({visites.length})</Title>
        <FlatList
          data={visites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderVisite}
          contentContainerStyle={styles.listContainer}
        />
      </View>
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
  statsCard: {
    margin: 15,
    marginTop: 0,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  tabContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
  },
  sectionTitle: {
    marginVertical: 10,
    color: '#333',
  },
  card: {
    marginBottom: 10,
    marginRight: 10,
    minWidth: 200,
  },
  horizontalList: {
    paddingBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  statut: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 5,
  },
});
