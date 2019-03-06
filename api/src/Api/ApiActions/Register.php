<?php

namespace ESportsBracketBuilder\Api\ApiActions;

use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiAction;
use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiActionInterface;
use ESportsBracketBuilder\Api\Jwt\JWTManagement;
use ESportsBracketBuilder\Entities\User;

class Register extends ApiAction implements ApiActionInterface
{

    public function runAction($params, ?string $userID): object
    {
        $resp = new \stdClass();

        if(!isset($params->email) || !isset($params->password)) {
            $resp->loginError = 'required fields not given';
            return $resp;
        }

        if ($this->entityManager
            ->getRepository('ESportsBracketBuilder\Entities\User')
            ->findOneBy(array('email' => $params->email)) != null
        ) {
            $resp->loginError = 'User already exists';
            return $resp;
        }

        $user = new User();
        $user->setPassword($params->password);
        $user->setEmail($params->email);
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $resp->token = JWTManagement::generateToken($user->getId());
        return $resp;
    }

    public function requiresAuthentication(): bool
    {
        return false;
    }
}
