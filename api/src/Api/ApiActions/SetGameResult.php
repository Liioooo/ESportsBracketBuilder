<?php
/**
 * Created by PhpStorm.
 * User: LeoP
 * Date: 06.03.2019
 * Time: 15:27
 */

namespace ESportsBracketBuilder\Api\ApiActions;


use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiAction;
use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiActionInterface;
use ESportsBracketBuilder\Entities\Game;

class SetGameResult extends ApiAction implements ApiActionInterface
{

    public function runAction($params, ?string $userID): object
    {
        $resp = new \stdClass();

        if(!isset($params->bracketId) || !isset($params->gameId) || !isset($params->player1Points) || !isset($params->player2Points)) {
            $resp->error = 'required fields not given';
            return $resp;
        }

        $bracket = $this->entityManager->getRepository('ESportsBracketBuilder\Entities\Bracket')
            ->findOneBy(array(
                'user' => $userID,
                'id' => $params->bracketId
            ));

        if($bracket == null) {
            $resp->error = 'noSuchGame';
            return $resp;
        }
        $game = $this->entityManager->getRepository('ESportsBracketBuilder\Entities\Game')
            ->findOneBy(array(
                'bracket' => $params->bracketId,
                'id' => $params->gameId
            ));

        if( $game->getPlayer1Points() != null ||  $game->getPlayer2Points() != null) {
            $resp->error = 'Unable to modify results';
            return $resp;
        }
        $game->setPlayer1Points($params->player1Points);
        $game->setPlayer2Points($params->player2Points);

        $nextGame = $this->entityManager->getRepository('ESportsBracketBuilder\Entities\Game')
            ->findOneBy(array(
                'bracket' => $params->bracketId,
                'roundInBracket' => $game->getRoundInBracket() + 1,
                'positionInRound' => intdiv($game->getPositionInRound(), 2)
            ));

        $countOfGames = $this->entityManager->getRepository('ESportsBracketBuilder\Entities\Game')->count(
            array(
                'bracket' => $params->bracketId,
            ));

        $isLastGame = ($countOfGames == 1 && $game->getRoundInBracket() == 0) ||
                      ($countOfGames == 3 && $game->getRoundInBracket() == 1) ||
                      ($countOfGames == 7 && $game->getRoundInBracket() == 2) ||
                      ($countOfGames == 15 && $game->getRoundInBracket() == 3);

        if(!$isLastGame) {
            if($nextGame == null) {
                $nextGame = new Game();
                $nextGame->setRoundInBracket($game->getRoundInBracket() + 1);
                $nextGame->setPositionInRound(intdiv($game->getPositionInRound(), 2));
                $nextGame->setPlayer1($game->getWinner());
                $nextGame->setBracket($bracket);
                $this->entityManager->persist($nextGame);
            } else {
                $nextGame->setPlayer2($game->getWinner());
            }
        }

        $this->entityManager->flush();
        return $bracket;
    }

    public function requiresAuthentication(): bool
    {
        return true;
    }
}