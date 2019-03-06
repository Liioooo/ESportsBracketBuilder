<?php

namespace ESportsBracketBuilder\Api\ApiActions;


use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiAction;
use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiActionInterface;

class GetPlayers extends ApiAction implements ApiActionInterface
{

    public function runAction($params, ?string $userID): object
    {
        $resp = new \stdClass();

        if(!isset($params->bracketId)) {
            $resp->error = 'required fields not given';
            return $resp;
        }

        $bracket = $this->entityManager->getRepository('ESportsBracketBuilder\Entities\Bracket')
            ->findOneBy(array(
                'user' => $userID,
                'id' => $params->bracketId
            ));
        if($bracket == null) {
            $resp->error = 'noSuchBracket';
            return $resp;
        }

        $resp->players = $bracket->getPlayersArray();
        return $resp;
    }

    public function requiresAuthentication(): bool
    {
        return true;
    }
}