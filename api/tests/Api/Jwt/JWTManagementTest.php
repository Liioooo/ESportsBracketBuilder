<?php

use \PHPUnit\Framework\TestCase;
use ESportsBracketBuilder\Api\Jwt\JWTManagement;
use ESportsBracketBuilder\Api\Jwt\JwtException;

class JWTManagementTest extends TestCase
{

    public function setUp(): void
    {
        putenv('JWT_SECRET_KEY=testToken');
        $_SERVER['REMOTE_ADDR'] = '127.0.0.1';
    }

    public function testGenerateToken() {
        $token = JWTManagement::generateToken(0);
        $this->assertIsString($token);
        return $token;
    }

    /**
     * @depends testGenerateToken
     */
    public function testVerifyTokenCorrect(string $token) {
        $_SERVER["Authorization"] = 'Bearer ' . $token;

        $userId = JWTManagement::verifyToken();
        $this->assertSame('0', $userId);
    }

    public function testVerifyTokenNoToken() {
        unset($_SERVER["Authorization"]);

        $this->expectException(JwtException::class);
        $this->expectExceptionMessage('No token was sent');

        JWTManagement::verifyToken();
    }

    public function testVerifyTokenInvalid() {
        $this->expectException(JwtException::class);

        $_SERVER["Authorization"] = 'Bearer jalfhsdjhfkjsdhf.sdfasdfdsf.5s4df56';
        JWTManagement::verifyToken();
    }
}