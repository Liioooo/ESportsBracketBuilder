<?php

namespace ESportsBracketBuilder\Entities;
/**
 * @Entity @Table(name="users")
 **/
class User
{
    /**
     * @var int
     * @Id @Column(type="integer") @GeneratedValue
     */
    protected $id;

    /**
     * @var string
     * @Column(type="string")
     */
    protected $password;

    /**
     * @var string
     * @Column(type="string")
     */
    protected $email;

    /**
     * @OneToMany(targetEntity="Bracket", mappedBy="user")
     * @var Bracket[]
     **/
    protected $brackets = null;

    public function getId(): int
    {
        return $this->id;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function assignedBracket(Bracket $bracket)
    {
        $this->brackets[] = $bracket;
    }

    public function getBrackets(): array
    {
        return $this->brackets;
    }

}
