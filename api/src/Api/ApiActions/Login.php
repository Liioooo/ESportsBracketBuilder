<?php

namespace ESportsBracketBuilder\Api\ApiActions;


use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiAction;
use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiActionInterface;

class Login extends ApiAction implements ApiActionInterface
{

    public function runAction($params, ?string $userID): object
    {
        $resp = new \stdClass();
        $resp->lel = 'kek';
        return $resp;
    }

    public function requiresAuthentication(): bool
    {
        return false;
    }
}