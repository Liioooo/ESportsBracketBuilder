<?php

namespace ESportsBracketBuilder\Api\ApiActions\ActionDescribers;

use Doctrine\ORM\EntityManager;

class ApiAction
{

    protected $entityManager;

    public function __construct(EntityManager $entityManager) {
        $this->entityManager = $entityManager;
    }
}