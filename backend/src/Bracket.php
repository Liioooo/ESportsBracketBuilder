<?php

namespace ESportsBracketBuilder;

/**
 * @Entity @Table(name="brackets")
 **/
class Bracket
{
    /**
     * @var int
     * @Id @Column(type="integer") @GeneratedValue
     */
    protected $id;

    /**
     * @OneToMany(targetEntity="Game", mappedBy="bracket")
     * @var Game[]
     **/
    protected $games = null;

    /**
     * @ManyToOne(targetEntity="User", inversedBy="assignedBracket")
     **/
    protected $user;

    /**
     * @var string
     * @Column(type="string")
     */
    protected $name;

    public function setUser(User $user)
    {
        $user->assignedBracket($this);
        $this->user = $user;
    }

    public function assignedGame(Game $game)
    {
        $this->games[] = $game;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getGames(): array
    {
        return $this->games;
    }

    public function getUser(): User
    {
        return $this->user;
    }

}
