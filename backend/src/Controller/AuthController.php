<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use App\Entity\Utilisateur;
use App\Entity\Guide;

#[Route('/auth')]
class AuthController extends AbstractController
{
    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $em, LoggerInterface $logger): JsonResponse
    {
        $logger->info('=== DEBUT LOGIN ===');
        
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (empty($email) || empty($password)) {
            return $this->json(['success' => false, 'message' => 'Email et mot de passe requis'], 400);
        }

        // Vérification utilisateur
        $user = $em->getRepository(Utilisateur::class)->findOneBy(['email' => $email]);
        
        if ($user && password_verify($password, $user->getMotDePasse())) {
            return $this->json([
                'success' => true,
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'role' => $user->getRole()
                ]
            ]);
        }

        // Vérification guide
        $guide = $em->getRepository(Guide::class)->findOneBy(['email' => $email]);

        if ($guide && password_verify($password, $guide->getMotDePasse())) {
            return $this->json([
                'success' => true,
                'user' => [
                    'id' => $guide->getId(),
                    'email' => $guide->getEmail(),
                    'role' => 'guide'
                ]
            ]);
        }

        return $this->json(['success' => false, 'message' => 'Identifiants incorrects'], 401);
    }

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $em, LoggerInterface $logger): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $required = ['prenom', 'nom', 'email', 'password'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                return $this->json(['success' => false, 'message' => "Le champ $field est requis"], 400);
            }
        }

        // Vérifier si l'email existe déjà
        $existingUser = $em->getRepository(Utilisateur::class)->findOneBy(['email' => $data['email']]);
        $existingGuide = $em->getRepository(Guide::class)->findOneBy(['email' => $data['email']]);
        
        if ($existingUser || $existingGuide) {
            return $this->json(['success' => false, 'message' => 'Cet email est déjà utilisé'], 409);
        }

        try {
            $user = new Utilisateur();
            $user->setPrenom($data['prenom']);
            $user->setNom($data['nom']);
            $user->setEmail($data['email']);
            $user->setRole($data['role'] ?? 'visiteur');
            $user->setMotDePasse(password_hash($data['password'], PASSWORD_DEFAULT));

            $em->persist($user);
            $em->flush();

            return $this->json([
                'success' => true,
                'message' => 'Inscription réussie',
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'role' => $user->getRole()
                ]
            ]);

        } catch (\Exception $e) {
            return $this->json(['success' => false, 'message' => 'Erreur serveur'], 500);
        }
    }
}