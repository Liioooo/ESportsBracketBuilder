<?php

namespace ESportsBracketBuilder\Api\ApiActions;


use Doctrine\Common\Collections\ArrayCollection;
use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiAction;
use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiActionInterface;
use ESportsBracketBuilder\Entities\Bracket;

class GetBrackets extends ApiAction implements ApiActionInterface
{

    public function runAction($params, ?string $userID): object
    {
        $brackets = $this->entityManager->getRepository('ESportsBracketBuilder\Entities\Bracket')
            ->findBy(array(
                'user' => $userID,
            ));

        $brackets = new ArrayCollection($brackets);
        $brackets = $brackets->map(function (Bracket $val) {
           $mapped = new \stdClass();
           $mapped->id = $val->getId();
           $mapped->name = $val->getName();
           return $mapped;
        });

        $resp = new \stdClass();
        $resp->brackets = $brackets->toArray();
        return $resp;
    }

    public function requiresAuthentication(): bool
    {
       return true;
    }
}