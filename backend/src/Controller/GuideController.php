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

        return $this->json(['success' => true, 'id' => $guide->getId()]);
    }
}
