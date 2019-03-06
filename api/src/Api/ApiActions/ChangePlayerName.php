<?php

namespace ESportsBracketBuilder\Api\ApiActions;


use Doctrine\Common\Collections\Criteria;
use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiAction;
use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiActionInterface;

class ChangePlayerName extends ApiAction implements ApiActionInterface
{

    public function runAction($params, ?string $userID): object
    {
        $resp = new \stdClass();

        if(!isset($params->bracketId) || !isset($params->playerId) || !isset($params->newName)) {
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

        $playerCriteria = Criteria::create()
            ->where(Criteria::expr()->eq('id', $params->playerId));
        $player = $bracket->getPlayers()->matching($playerCriteria)[0];

        $player->setName($params->newName);
        $this->entityManager->flush();
        $resp ->newName = $params->newName;
        return $resp;
    }

    public function requiresAuthentication(): bool
    {
        return true;
    }
}