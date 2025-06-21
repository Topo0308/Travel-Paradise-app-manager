
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, Text, FAB, Portal, Dialog } from 'react-native-paper';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export default function GuideHome({ route }) {
  const { user } = route.params;
  const [visites, setVisites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVisite, setSelectedVisite] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  const fetchVisites = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/visites/guide/${user.id}`);
      setVisites(response.data);
    } catch (error) {
      console.error('Erreur fetch visites:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisites();
  }, []);

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'planifiee': return '#FFC107';
      case 'en_cours': return '#2196F3';
      case 'terminee': return '#4CAF50';
      default: return '#757575';
    }
  };

  const getStatutText = (statut) => {
    switch (statut) {
      case 'planifiee': return 'Planifiée';
      case 'en_cours': return 'En cours';
      case 'terminee': return 'Terminée';
      default: return statut;
    }
  };

  const cloturerVisite = async (visiteId) => {
    try {
      await axios.post(`${API_BASE_URL}/visites/${visiteId}/cloturer`, {
        commentaire: 'Visite terminée avec succès',
        note: 5
      });
      fetchVisites();
      setDialogVisible(false);
    } catch (error) {
      console.error('Erreur clôture visite:', error);
    }
  };

  const renderVisite = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title style={styles.lieu}>{item.lieu}</Title>
          <Text style={[styles.statut, { backgroundColor: getStatutColor(item.statut) }]}>
            {getStatutText(item.statut)}
          </Text>
        </View>
        
        <Paragraph style={styles.pays}>📍 {item.pays}</Paragraph>
        <Paragraph style={styles.activite}>🎯 {item.typeActivite}</Paragraph>
        
        <View style={styles.timeContainer}>
          <Text style={styles.time}>🕐 {new Date(item.debut).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</Text>
          <Text style={styles.time}>🕐 {new Date(item.fin).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</Text>
        </View>
        
        <Paragraph style={styles.visiteurs}>
          👥 {item.visiteurs.length} visiteur(s)
        </Paragraph>
        
        {item.statut !== 'terminee' && (
          <Button
            mode="contained"
            onPress={() => {
              setSelectedVisite(item);
              setDialogVisible(true);
            }}
            style={styles.button}
          >
            Clôturer la visite
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title>Bonjour {user.prenom} {user.nom} 👋</Title>
          <Paragraph>Pays d'affectation: {user.paysAffectation}</Paragraph>
        </Card.Content>
      </Card>

      <FlatList
        data={visites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVisite}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchVisites} />
        }
        contentContainerStyle={styles.listContainer}
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Clôturer la visite</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Êtes-vous sûr de vouloir clôturer la visite "{selectedVisite?.lieu}" ?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Annuler</Button>
            <Button onPress={() => cloturerVisite(selectedVisite?.id)}>
              Confirmer
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  listContainer: {
    padding: 15,
    paddingTop: 5,
  },
  card: {
    marginBottom: 15,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  lieu: {
    flex: 1,
    fontSize: 18,
    color: '#2196F3',
  },
  statut: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
  visiteurs: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});
