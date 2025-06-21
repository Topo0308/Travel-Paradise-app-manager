
<?php

namespace App\Controller;

use App\Entity\Guide;
use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/auth')]
class AuthController extends AbstractController
{
    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        // Vérification utilisateur
        $user = $em->getRepository(Utilisateur::class)->findOneBy(['email' => $email]);
        if ($user && password_verify($password, $user->getMotDePasse())) {
            return $this->json([
                'success' => true,
                'user' => [
                    'id' => $user->getId(),
                    'prenom' => $user->getPrenom(),
                    'nom' => $user->getNom(),
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
                    'prenom' => $guide->getPrenom(),
                    'nom' => $guide->getNom(),
                    'email' => $guide->getEmail(),
                    'role' => 'guide',
                    'paysAffectation' => $guide->getPaysAffectation()
                ]
            ]);
        }

        return $this->json(['success' => false, 'message' => 'Identifiants incorrects'], 401);
    }

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        $user = new Utilisateur();
        $user->setPrenom($data['prenom']);
        $user->setNom($data['nom']);
        $user->setEmail($data['email']);
        $user->setRole($data['role'] ?? 'visiteur');
        $user->setMotDePasse(password_hash($data['password'], PASSWORD_DEFAULT));

        $em->persist($user);
        $em->flush();

        return $this->json(['success' => true, 'message' => 'Utilisateur créé avec succès']);
    }
}
