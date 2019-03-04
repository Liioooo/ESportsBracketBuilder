<?php

namespace ESportsBracketBuilder\Api\ApiActions\ActionDescribers;


interface ApiActionInterface
{
    public function runAction($params, ?string $userID): object;
    public function requiresAuthentication(): bool;
}