
-- Migration initiale pour Travel Paradise
CREATE TABLE IF NOT EXISTS guide (
    id SERIAL PRIMARY KEY,
    prenom VARCHAR(255) NOT NULL,
    nom VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    statut VARCHAR(50) NOT NULL,
    pays_affectation VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS utilisateur (
    id SERIAL PRIMARY KEY,
    prenom VARCHAR(255) NOT NULL,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS visite (
    id SERIAL PRIMARY KEY,
    lieu VARCHAR(255) NOT NULL,
    pays VARCHAR(255) NOT NULL,
    photo VARCHAR(255),
    debut TIMESTAMP NOT NULL,
    fin TIMESTAMP NOT NULL,
    guide_id INTEGER REFERENCES guide(id) NOT NULL,
    visiteurs JSON DEFAULT '[]',
    statut VARCHAR(100) DEFAULT 'planifiee',
    commentaire TEXT,
    note INTEGER,
    type_activite VARCHAR(100) NOT NULL
);

-- Données de test
INSERT INTO guide (prenom, nom, photo, statut, pays_affectation, email, mot_de_passe) VALUES
('Jean', 'Dupont', null, 'actif', 'France', 'jean.dupont@travelparadise.com', '$2y$10$example_hash'),
('Marie', 'Martin', null, 'actif', 'Belgique', 'marie.martin@travelparadise.com', '$2y$10$example_hash'),
('Ahmed', 'Benali', null, 'actif', 'Maroc', 'ahmed.benali@travelparadise.com', '$2y$10$example_hash');

INSERT INTO utilisateur (prenom, nom, email, role, mot_de_passe) VALUES
('Admin', 'System', 'admin@travelparadise.com', 'admin', '$2y$10$example_hash'),
('Pierre', 'Visiteur', 'pierre@email.com', 'visiteur', '$2y$10$example_hash');

INSERT INTO visite (lieu, pays, debut, fin, guide_id, type_activite, statut) VALUES
('Tour Eiffel', 'France', '2024-12-25 10:00:00', '2024-12-25 12:00:00', 1, 'monument', 'planifiee'),
('Centre historique de Bruges', 'Belgique', '2024-12-26 14:00:00', '2024-12-26 17:00:00', 2, 'ville', 'planifiee'),
('Montagnes de l''Atlas', 'Maroc', '2024-12-27 08:00:00', '2024-12-27 18:00:00', 3, 'montagne', 'planifiee');

