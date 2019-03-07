<?php

namespace ESportsBracketBuilder\Api\Jwt;

use Firebase\JWT\JWT;

class JWTManagement
{
    static public function generateToken(int $userId): string {
        $expireTime = time() + (2 * 60 * 60);
        $keyPayload = [
            'iss' => 'e-sports-bracket-builder-liiiioooo',
            'iat' => time(),
            'exp' => $expireTime,
            'sub' => $userId,
            'login_ip' => self::getRealIpAddr()
        ];
        return JWT::encode($keyPayload, getenv("JWT_SECRET_KEY"), 'HS512');
    }

    static public function verifyToken(): ?string {
        $token = self::getToken();
        if ($token == null) {
            throw new JwtException('No token was sent');
        }
        $payload = null;
        try {
            $payload = JWT::decode($token, getenv("JWT_SECRET_KEY"), ['HS512']);
        } catch (\Exception $exception) {
            throw new JwtException($exception->getMessage());
        }
        if($payload->login_ip != self::getRealIpAddr()) {
            throw new JwtException('IP Address has changed');
        }
        return $payload->sub;
    }

    static private function getToken(): ?string {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        }
        else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        }
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }

    static private function getRealIpAddr(): string
    {
        if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
        {
            $ip=$_SERVER['HTTP_CLIENT_IP'];
        }
        elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
        {
            $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
        }
        else
        {
            $ip=$_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }
}
