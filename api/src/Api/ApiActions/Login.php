<?php

namespace ESportsBracketBuilder\Api\ApiActions;

use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiAction;
use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiActionInterface;
use ESportsBracketBuilder\Api\Jwt\JWTManagement;

class Login extends ApiAction implements ApiActionInterface
{

    public function runAction($params, ?string $userID): object
    {
        $resp = new \stdClass();

        if(!isset($params->email) || !isset($params->password)) {
            $resp->loginError = 'required fields not given';
            return $resp;
        }

        $user = $this->entityManager
            ->getRepository('ESportsBracketBuilder\Entities\User')
            ->findOneBy(array('email' => $params->email));

        if($user == null) {
            $resp->loginError = 'doesNotExist';
            return $resp;
        }

        if(!$user->checkPassword($params->password)) {
            $resp->loginError = 'invalidPW';
            return $resp;
        }

        $resp->token = JWTManagement::generateToken($user->getId());
        return $resp;
    }

    public function requiresAuthentication(): bool
    {
        return false;
    }
}
