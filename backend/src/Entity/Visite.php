
<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Visite
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[ORM\Column(type: 'string', length: 255)]
    private string $lieu;

    #[ORM\Column(type: 'string', length: 255)]
    private string $pays;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $photo = null;

    #[ORM\Column(type: 'datetime')]
    private \DateTime $debut;

    #[ORM\Column(type: 'datetime')]
    private \DateTime $fin;

    #[ORM\ManyToOne(targetEntity: Guide::class, inversedBy: 'visites')]
    #[ORM\JoinColumn(nullable: false)]
    private Guide $guide;

    #[ORM\Column(type: 'json')]
    private array $visiteurs = [];

    #[ORM\Column(type: 'string', length: 100)]
    private string $statut = 'planifiee';

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $commentaire = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $note = null;

    #[ORM\Column(type: 'string', length: 100)]
    private string $typeActivite;

    // Getters et Setters
    public function getId(): int { return $this->id; }
    
    public function getLieu(): string { return $this->lieu; }
    public function setLieu(string $lieu): self { $this->lieu = $lieu; return $this; }
    
    public function getPays(): string { return $this->pays; }
    public function setPays(string $pays): self { $this->pays = $pays; return $this; }
    
    public function getPhoto(): ?string { return $this->photo; }
    public function setPhoto(?string $photo): self { $this->photo = $photo; return $this; }
    
    public function getDebut(): \DateTime { return $this->debut; }
    public function setDebut(\DateTime $debut): self { $this->debut = $debut; return $this; }
    
    public function getFin(): \DateTime { return $this->fin; }
    public function setFin(\DateTime $fin): self { $this->fin = $fin; return $this; }
    
    public function getGuide(): Guide { return $this->guide; }
    public function setGuide(Guide $guide): self { $this->guide = $guide; return $this; }
    
    public function getVisiteurs(): array { return $this->visiteurs; }
    public function setVisiteurs(array $visiteurs): self { $this->visiteurs = $visiteurs; return $this; }
    
    public function getStatut(): string { return $this->statut; }
    public function setStatut(string $statut): self { $this->statut = $statut; return $this; }
    
    public function getCommentaire(): ?string { return $this->commentaire; }
    public function setCommentaire(?string $commentaire): self { $this->commentaire = $commentaire; return $this; }
    
    public function getNote(): ?int { return $this->note; }
    public function setNote(?int $note): self { $this->note = $note; return $this; }
    
    public function getTypeActivite(): string { return $this->typeActivite; }
    public function setTypeActivite(string $typeActivite): self { $this->typeActivite = $typeActivite; return $this; }
}
