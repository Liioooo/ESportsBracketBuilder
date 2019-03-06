<?php

namespace ESportsBracketBuilder\Api\ApiActions;


use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiAction;
use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiActionInterface;
use ESportsBracketBuilder\Entities\Bracket;
use ESportsBracketBuilder\Entities\Player;

class CreateBracket extends ApiAction implements ApiActionInterface
{

    public function runAction($params, ?string $userID): object
    {
        $resp = new \stdClass();

        if(!isset($params->bracketName) || !isset($params->players) || !is_array($params->players)) {
            $resp->error = 'required fields not given';
            return $resp;
        }
        $count = count($params->players);
        if(!($count == 2 || $count == 4 || $count == 8 || $count == 16)) {
            $resp->error = 'wrong player amount';
            return $resp;
        }

        $bracket = new Bracket();
        $bracket->setName($params->bracketName);
        $user = $this->entityManager->find('ESportsBracketBuilder\Entities\User', $userID);

        $userBrackets = $this->entityManager->getRepository('ESportsBracketBuilder\Entities\Bracket')
            ->findBy(array('user' => $userID));

        foreach ($userBrackets as $userBracket) {
            if($userBracket->getName() == $params->bracketName) {
                $resp->error = 'hasBracketWithName';
                return $resp;
            }
        }

        $bracket->setUser($user);
        foreach ($params->players as $player) {
            if(!isset($player->name)) {
                $this->entityManager->clear();
                $resp->error = 'required fields not given';
                return $resp;
            }
            $playerObj = new Player();
            $playerObj->setName($player->name);
            $this->entityManager->persist($playerObj);
        }
        $this->entityManager->persist($bracket);
        $this->entityManager->flush();

        $resp->bracketName = $bracket->getName();
        return $resp;
    }

    public function requiresAuthentication(): bool
    {
        return true;
    }
}
