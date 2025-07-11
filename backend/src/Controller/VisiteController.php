<?php

namespace App\Controller;

use App\Entity\Visite;
use App\Entity\Guide;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/visites')]
class VisiteController extends AbstractController
{
    #[Route('', name: 'get_visites', methods: ['GET'])]
    public function getVisites(EntityManagerInterface $em): JsonResponse
    {
        $visites = $em->getRepository(Visite::class)->findAll();

        $data = [];
        foreach ($visites as $visite) {
            $data[] = [
                'id' => $visite->getId(),
                'lieu' => $visite->getLieu(),
                'pays' => $visite->getPays(),
                'photo' => $visite->getPhoto(),
                'debut' => $visite->getDebut()->format('Y-m-d H:i:s'),
                'fin' => $visite->getFin()->format('Y-m-d H:i:s'),
                'guide' => [
                    'id' => $visite->getGuide()->getId(),
                    'prenom' => $visite->getGuide()->getPrenom(),
                    'nom' => $visite->getGuide()->getNom(),
                ],
                'visiteurs' => $visite->getVisiteurs(),
                'statut' => $visite->getStatut(),
                'typeActivite' => $visite->getTypeActivite(),
                'note' => $visite->getNote(),
                'commentaire' => $visite->getCommentaire(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/guide/{guideId}', name: 'get_visites_by_guide', methods: ['GET'])]
    public function getVisitesByGuide(int $guideId, EntityManagerInterface $em): JsonResponse
    {
        $guide = $em->getRepository(Guide::class)->find($guideId);
        if (!$guide) {
            return $this->json(['error' => 'Guide non trouvé'], 404);
        }

        $visites = $em->getRepository(Visite::class)->findBy(['guide' => $guide]);

        $data = [];
        foreach ($visites as $visite) {
            $data[] = [
                'id' => $visite->getId(),
                'lieu' => $visite->getLieu(),
                'pays' => $visite->getPays(),
                'debut' => $visite->getDebut()->format('Y-m-d H:i:s'),
                'fin' => $visite->getFin()->format('Y-m-d H:i:s'),
                'visiteurs' => $visite->getVisiteurs(),
                'statut' => $visite->getStatut(),
                'typeActivite' => $visite->getTypeActivite(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/{id}/cloturer', name: 'cloturer_visite', methods: ['POST'])]
    public function cloturerVisite(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $visite = $em->getRepository(Visite::class)->find($id);
        if (!$visite) {
            return $this->json(['error' => 'Visite non trouvée'], 404);
        }

        $data = json_decode($request->getContent(), true);

        // Validation note (optionnelle)
        if (isset($data['note']) && !is_numeric($data['note'])) {
            return $this->json(['error' => 'Note invalide'], 400);
        }

        $visite->setStatut('terminee');
        $visite->setCommentaire($data['commentaire'] ?? '');
        $visite->setNote($data['note'] ?? null);

        $em->flush();

        return $this->json(['success' => true, 'message' => 'Visite clôturée avec succès']);
    }

    #[Route('', name: 'create_visite', methods: ['POST'])]
    public function createVisite(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $requiredFields = ['lieu', 'pays', 'debut', 'fin', 'guideId', 'typeActivite'];
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                return $this->json(['error' => "Le champ '$field' est requis."], 400);
            }
        }

        try {
            $debut = new \DateTime($data['debut']);
            $fin = new \DateTime($data['fin']);
        } catch (\Exception $e) {
            return $this->json(['error' => 'Format de date invalide.'], 400);
        }

        if ($fin < $debut) {
            return $this->json(['error' => 'La date de fin doit être postérieure à la date de début.'], 400);
        }

        $guide = $em->getRepository(Guide::class)->find($data['guideId']);
        if (!$guide) {
            return $this->json(['error' => 'Guide non trouvé'], 404);
        }

        $visite = new Visite();
        $visite->setLieu($data['lieu']);
        $visite->setPays($data['pays']);
        $visite->setPhoto($data['photo'] ?? null);
        $visite->setDebut($debut);
        $visite->setFin($fin);
        $visite->setGuide($guide);
        $visite->setVisiteurs($data['visiteurs'] ?? []);
        $visite->setTypeActivite($data['typeActivite']);
        $visite->setStatut('en_cours'); // statut par défaut

        $em->persist($visite);
        $em->flush();

        return $this->json(['success' => true, 'id' => $visite->getId()]);
    }
}
