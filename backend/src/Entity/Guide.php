
<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
class Guide
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[ORM\Column(type: 'string', length: 255)]
    private string $prenom;

    #[ORM\Column(type: 'string', length: 255)]
    private string $nom;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $photo = null;

    #[ORM\Column(type: 'string', length: 50)]
    private string $statut;

    #[ORM\Column(type: 'string', length: 255)]
    private string $paysAffectation;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private string $email;

    #[ORM\Column(type: 'string')]
    private string $motDePasse;

    #[ORM\OneToMany(mappedBy: 'guide', targetEntity: Visite::class)]
    private Collection $visites;

    public function __construct()
    {
        $this->visites = new ArrayCollection();
    }

    // Getters et Setters
    public function getId(): int { return $this->id; }
    
    public function getPrenom(): string { return $this->prenom; }
    public function setPrenom(string $prenom): self { $this->prenom = $prenom; return $this; }
    
    public function getNom(): string { return $this->nom; }
    public function setNom(string $nom): self { $this->nom = $nom; return $this; }
    
    public function getPhoto(): ?string { return $this->photo; }
    public function setPhoto(?string $photo): self { $this->photo = $photo; return $this; }
    
    public function getStatut(): string { return $this->statut; }
    public function setStatut(string $statut): self { $this->statut = $statut; return $this; }
    
    public function getPaysAffectation(): string { return $this->paysAffectation; }
    public function setPaysAffectation(string $paysAffectation): self { $this->paysAffectation = $paysAffectation; return $this; }
    
    public function getEmail(): string { return $this->email; }
    public function setEmail(string $email): self { $this->email = $email; return $this; }
    
    public function getMotDePasse(): string { return $this->motDePasse; }
    public function setMotDePasse(string $motDePasse): self { $this->motDePasse = $motDePasse; return $this; }
    
    public function getVisites(): Collection { return $this->visites; }
}
