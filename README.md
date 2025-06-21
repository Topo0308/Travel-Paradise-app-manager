
# Travel Paradise - Application Mobile de Gestion Touristique

## 🌍 Description
Travel Paradise est une application mobile centralisée pour la gestion des visites touristiques à l'échelle internationale.

## 🏗️ Architecture
- **Frontend**: React Native avec Expo
- **Backend**: Symfony 6.3 (API REST)
- **Base de données**: PostgreSQL
- **Conteneurisation**: Docker

## 🚀 Installation et lancement

### Prérequis
- Docker et Docker Compose
- Node.js 18+ (pour le développement local)

### Lancement avec Docker
```bash
# Cloner le projet
git clone <repository-url>
cd travel-paradise

# Lancer tous les services
docker-compose up -d

# Créer la base de données (première fois)
docker-compose exec backend php bin/console doctrine:database:create
docker-compose exec backend php bin/console doctrine:migrations:migrate

# Charger les données de test
docker-compose exec postgres psql -U admin -d travel_paradise -f /migrations/001_initial_schema.sql
```

### Accès aux services
- **Frontend Mobile**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **PostgreSQL**: localhost:5432

## 👤 Comptes de test

### Guide
- Email: jean.dupont@travelparadise.com
- Mot de passe: password123

### Administrateur  
- Email: admin@travelparadise.com
- Mot de passe: admin123

### Visiteur
- Email: pierre@email.com
- Mot de passe: visiteur123

## 📱 Fonctionnalités

### Guide
- ✅ Consultation du calendrier des visites
- ✅ Gestion de la liste d'appel
- ✅ Clôture des visites avec commentaires

### Administrateur
- ✅ Vue d'ensemble des guides
- ✅ Gestion des visites
- ✅ Statistiques détaillées

### Visiteur
- ✅ Recherche et consultation des visites
- ✅ Réservation de créneaux
- ✅ Évaluation des visites

## 🗺️ Lieux intégrés
- 🏖️ Plages (Blankenberge, Belgique)
- 🏰 Villes historiques (Bruges, Belgique)
- ⛰️ Montagnes (Atlas, Maroc)
- 🖼️ Musées (Louvre, France)
- 🌉 Monuments (Tour Eiffel, France)
- 🏞️ Parcs nationaux (Yosemite, USA)
- 🕌 Sites historiques (Petra, Jordanie)

## 🔧 Développement

### Backend (Symfony)
```bash
cd backend
composer install
symfony server:start
```

### Frontend (React Native)
```bash
cd frontend
npm install
npm start
```

## 📚 API Endpoints

### Authentification
- POST `/api/auth/login` - Connexion
- POST `/api/auth/register` - Inscription

### Visites
- GET `/api/visites` - Liste des visites
- GET `/api/visites/guide/{id}` - Visites d'un guide
- POST `/api/visites/{id}/cloturer` - Clôturer une visite
- POST `/api/visites` - Créer une visite

### Guides
- GET `/api/guides` - Liste des guides
- POST `/api/guides` - Créer un guide

## 🐳 Structure Docker
```
travel-paradise/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   └── src/
├── frontend/
│   ├── Dockerfile
│   └── screens/
└── README.md
```

## 📈 Prochaines fonctionnalités
- 🔔 Notifications push
- 🗺️ Géolocalisation en temps réel
- 💳 Système de paiement intégré
- 📊 Analytics avancées
- 🌐 Support multilingue
