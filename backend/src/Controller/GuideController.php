<?php

namespace App\Controller;

use App\Entity\Guide;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/guides')]
class GuideController extends AbstractController
{
    #[Route('', name: 'get_guides', methods: ['GET'])]
    public function getGuides(EntityManagerInterface $em): JsonResponse
    {
        $guides = $em->getRepository(Guide::class)->findAll();

        $data = [];
        foreach ($guides as $guide) {
            $data[] = [
                'id' => $guide->getId(),
                'prenom' => $guide->getPrenom(),
                'nom' => $guide->getNom(),
                'photo' => $guide->getPhoto(),
                'statut' => $guide->getStatut(),
                'paysAffectation' => $guide->getPaysAffectation(),
                'email' => $guide->getEmail()
            ];
        }

        return $this->json($data);
    }

    #[Route('', name: 'create_guide', methods: ['POST'])]
    public function createGuide(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Vérification des champs obligatoires
        $requiredFields = ['prenom', 'nom', 'statut', 'paysAffectation', 'email', 'password'];
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                return $this->json([
                    'success' => false,
                    'message' => "Le champ '$field' est requis."
                ], 400);
            }
        }

        // Vérification email format basique
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->json([
                'success' => false,
                'message' => "L'email fourni n'est pas valide."
            ], 400);
        }

        // Vérifier si email existe déjà
        $existingGuide = $em->getRepository(Guide::class)->findOneBy(['email' => $data['email']]);
        if ($existingGuide) {
            return $this->json([
                'success' => false,
                'message' => "Un guide avec cet email existe déjà."
            ], 409);
        }

        try {
            $guide = new Guide();
            $guide->setPrenom($data['prenom']);
            $guide->setNom($data['nom']);
            $guide->setPhoto($data['photo'] ?? null);
            $guide->setStatut($data['statut']);
            $guide->setPaysAffectation($data['paysAffectation']);
            $guide->setEmail($data['email']);
            $guide->setMotDePasse(password_hash($data['password'], PASSWORD_DEFAULT));

            $em->persist($guide);
            $em->flush();

            return $this->json([
                'success' => true,
                'id' => $guide->getId(),
                'message' => 'Guide créé avec succès.'
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'success' => false,
                'message' => 'Erreur lors de la création du guide.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
