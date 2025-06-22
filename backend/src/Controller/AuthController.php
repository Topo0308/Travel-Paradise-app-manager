
<?php

namespace App\Controller;

use App\Entity\Guide;
use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Psr\Log\LoggerInterface;

#[Route('/api/auth')]
class AuthController extends AbstractController
{
    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $em, LoggerInterface $logger): JsonResponse
    {
        $logger->info('=== DEBUT LOGIN ===');
        
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        $logger->info('Login attempt', [
            'email' => $email,
            'password_length' => strlen($password),
            'raw_data' => $data
        ]);

        if (empty($email) || empty($password)) {
            $logger->warning('Empty email or password');
            return $this->json(['success' => false, 'message' => 'Email et mot de passe requis'], 400);
        }

        // Vérification utilisateur
        $logger->info('Recherche utilisateur avec email: ' . $email);
        $user = $em->getRepository(Utilisateur::class)->findOneBy(['email' => $email]);
        
        if ($user) {
            $logger->info('Utilisateur trouvé', [
                'id' => $user->getId(),
                'role' => $user->getRole(),
                'stored_password_hash' => substr($user->getMotDePasse(), 0, 20) . '...'
            ]);
            
            $passwordCheck = password_verify($password, $user->getMotDePasse());
            $logger->info('Vérification mot de passe utilisateur: ' . ($passwordCheck ? 'SUCCESS' : 'FAILED'));
            
            if ($passwordCheck) {
                $response = [
                    'success' => true,
                    'user' => [
                        'id' => $user->getId(),
                        'prenom' => $user->getPrenom(),
                        'nom' => $user->getNom(),
                        'email' => $user->getEmail(),
                        'role' => $user->getRole()
                    ]
                ];
                $logger->info('Login utilisateur réussi', $response);
                return $this->json($response);
            }
        } else {
            $logger->info('Aucun utilisateur trouvé avec cet email');
        }

        // Vérification guide
        $logger->info('Recherche guide avec email: ' . $email);
        $guide = $em->getRepository(Guide::class)->findOneBy(['email' => $email]);
        
        if ($guide) {
            $logger->info('Guide trouvé', [
                'id' => $guide->getId(),
                'pays' => $guide->getPaysAffectation(),
                'stored_password_hash' => substr($guide->getMotDePasse(), 0, 20) . '...'
            ]);
            
            $passwordCheck = password_verify($password, $guide->getMotDePasse());
            $logger->info('Vérification mot de passe guide: ' . ($passwordCheck ? 'SUCCESS' : 'FAILED'));
            
            if ($passwordCheck) {
                $response = [
                    'success' => true,
                    'user' => [
                        'id' => $guide->getId(),
                        'prenom' => $guide->getPrenom(),
                        'nom' => $guide->getNom(),
                        'email' => $guide->getEmail(),
                        'role' => 'guide',
                        'paysAffectation' => $guide->getPaysAffectation()
                    ]
                ];
                $logger->info('Login guide réussi', $response);
                return $this->json($response);
            }
        } else {
            $logger->info('Aucun guide trouvé avec cet email');
        }

        $logger->warning('Échec de connexion - identifiants incorrects');
        return $this->json(['success' => false, 'message' => 'Identifiants incorrects'], 401);
    }

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $em, LoggerInterface $logger): JsonResponse
    {
        $logger->info('=== DEBUT REGISTER ===');
        
        $data = json_decode($request->getContent(), true);
        $logger->info('Données d\'inscription reçues', $data);

        // Validation des données
        $required = ['prenom', 'nom', 'email', 'password'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                $logger->warning('Champ manquant: ' . $field);
                return $this->json(['success' => false, 'message' => "Le champ $field est requis"], 400);
            }
        }

        // Vérifier si l'email existe déjà
        $existingUser = $em->getRepository(Utilisateur::class)->findOneBy(['email' => $data['email']]);
        $existingGuide = $em->getRepository(Guide::class)->findOneBy(['email' => $data['email']]);
        
        if ($existingUser || $existingGuide) {
            $logger->warning('Email déjà utilisé: ' . $data['email']);
            return $this->json(['success' => false, 'message' => 'Cet email est déjà utilisé'], 409);
        }

        try {
            $user = new Utilisateur();
            $user->setPrenom($data['prenom']);
            $user->setNom($data['nom']);
            $user->setEmail($data['email']);
            $user->setRole($data['role'] ?? 'visiteur');
            
            $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
            $user->setMotDePasse($hashedPassword);
            
            $logger->info('Création utilisateur', [
                'email' => $data['email'],
                'role' => $user->getRole(),
                'password_hash' => substr($hashedPassword, 0, 20) . '...'
            ]);

            $em->persist($user);
            $em->flush();

            $logger->info('Utilisateur créé avec succès', ['id' => $user->getId()]);
            
            return $this->json([
                'success' => true, 
                'message' => 'Utilisateur créé avec succès',
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'role' => $user->getRole()
                ]
            ]);
            
        } catch (\Exception $e) {
            $logger->error('Erreur lors de la création utilisateur', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return $this->json(['success' => false, 'message' => 'Erreur lors de la création du compte'], 500);
        }
    }
}
