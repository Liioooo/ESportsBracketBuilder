<?php

namespace ESportsBracketBuilder\Api;

use Firebase\JWT\JWT;

class JWTManagement
{
    static public function generateToken(int $userId): string {

    }

    static function verifyToken(): ?string {
        return $_SERVER['HTTP_AUTHORIZATION'];
    }
}
