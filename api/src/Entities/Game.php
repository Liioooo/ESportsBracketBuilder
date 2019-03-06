<?php

namespace ESportsBracketBuilder\Entities;
/**
 * @Entity @Table(name="games")
 */
class Game
{

    /**
     * @var int
     * @Id @Column(type="integer") @GeneratedValue
     */
    protected $id;

    /**
     * @var int
     * @OneToOne(targetEntity="Player")
     * @JoinColumn(name="player1_id", referencedColumnName="id")
     */
    protected $player1;

    /**
     * @var int
     * @OneToOne(targetEntity="Player")
     * @JoinColumn(name="player2_id", referencedColumnName="id")
     */
    protected $player2;

    /**
     * @var int
     * @Column(type="integer")
     */
    protected $player1Points;

    /**
     * @var int
     * @Column(type="integer")
     */
    protected $player2Points;

    /**
     * @ManyToOne(targetEntity="Bracket", inversedBy="assignedGame")
     **/
    protected $bracket;

    /**
     * @var int
     * @Column(type="integer")
     */
    protected $roundInBracket;

    public function getId(): int
    {
        return $this->id;
    }

    public function getPlayer1(): Player
    {
        return $this->player1;
    }

    public function setPlayer1(Player $player1): void
    {
        $this->player1 = $player1;
    }

    public function getPlayer2(): Player
    {
        return $this->player2;
    }

    public function setPlayer2(Player $player2): void
    {
        $this->player2 = $player2;
    }

    public function getPlayer1Points(): int
    {
        return $this->player1Points;
    }

    public function setPlayer1Points(int $player1Points): void
    {
        $this->player1Points = $player1Points;
    }

    public function getPlayer2Points(): int
    {
        return $this->player2Points;
    }

    public function setPlayer2Points(int $player2Points): void
    {
        $this->player2Points = $player2Points;
    }

    public function setBracket(Bracket $bracket)
    {
        $bracket->assignedGame($this);
        $this->bracket = $bracket;
    }

    public function getBracket(): Bracket
    {
        return $this->bracket;
    }

    public function getRoundInBracket(): int
    {
        return $this->roundInBracket;
    }

    public function setRoundInBracket(int $roundInBracket): void
    {
        $this->roundInBracket = $roundInBracket;
    }

}
