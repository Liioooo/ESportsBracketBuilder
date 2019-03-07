<?php

namespace ESportsBracketBuilder\Api\ApiActions;


use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiAction;
use ESportsBracketBuilder\Api\ApiActions\ActionDescribers\ApiActionInterface;

class DoesUserExist extends ApiAction implements ApiActionInterface
{

    public function runAction($params, ?string $userID): object
    {
        $resp = new \stdClass();

        if(!isset($params->email)) {
            $resp->error = 'required fields not given';
            return $resp;
        }

        $user = $this->entityManager->getRepository('ESportsBracketBuilder\Entities\User')
            ->findOneBy(array(
                'email' => $params->email
            ));

        $resp->available = true;
        if($user != null) {
            $resp->available = false;
        }

        return $resp;
    }

    public function requiresAuthentication(): bool
    {
        return false;
    }
}
