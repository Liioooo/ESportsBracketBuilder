<?php

namespace ESportsBracketBuilder\Api\ApiActions;


use Doctrine\Common\Collections\ArrayCollection;
use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiAction;
use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiActionInterface;
use ESportsBracketBuilder\Entities\Bracket;
use ESportsBracketBuilder\Entities\Game;
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

        $user = $this->entityManager->find('ESportsBracketBuilder\Entities\User', $userID);

        $userHasBracketWithName = $this->entityManager->getRepository('ESportsBracketBuilder\Entities\Bracket')
            ->findBy(array(
                'user' => $userID,
                'name' => $params->bracketName
            ));

        if($userHasBracketWithName != null) {
            $resp->error = 'hasBracketWithName';
            return $resp;
        }

        $bracket = new Bracket();
        $bracket->setName($params->bracketName);
        $bracket->setUser($user);

        // Add Players to Bracket
        foreach ($params->players as $player) {
            if(!isset($player->name)) {
                $this->entityManager->clear();
                $resp->error = 'required fields not given';
                return $resp;
            }
            $playerObj = new Player();
            $playerObj->setName($player->name);
            $playerObj->setBracket($bracket);
        }

        //Add Games to Bracket / randomize Games
        $randomizedPlayers = $bracket->getPlayers()->toArray();
        shuffle($randomizedPlayers);
        $randomizedPlayers = new ArrayCollection($randomizedPlayers);
        for ($i = 0; $i < $randomizedPlayers->count(); $i += 2) {
            $game = new Game();
            $game->setPositionInRound($i / 2);
            $game->setPlayer1($randomizedPlayers[$i]);
            $game->setPlayer2($randomizedPlayers[$i + 1]);
            $game->setRoundInBracket(0);
            $game->setBracket($bracket);
        }

        $this->entityManager->persist($bracket);
        $this->entityManager->flush();

        $resp = $bracket;
        return $resp;
    }

    public function requiresAuthentication(): bool
    {
        return true;
    }
}
