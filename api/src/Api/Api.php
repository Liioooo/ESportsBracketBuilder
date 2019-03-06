<?php

namespace ESportsBracketBuilder\Api;

use Doctrine\ORM\EntityManager;
use ESportsBracketBuilder\Api\Jwt\JwtException;
use ESportsBracketBuilder\Api\Jwt\JWTManagement;

class Api
{
    private $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
        header("content-type: application/json");
        $rawData = file_get_contents('php://input');
        $parsedRequestData = $this->validateAndParseRequest($rawData);
        $this->processApi($parsedRequestData);
    }

    private function validateAndParseRequest(string $rawRequestData) {
        if($_SERVER['REQUEST_METHOD'] != 'POST') {
            $this->throwError(ResponseCodes::$METHOD_NOT_ALLOWED, 'Method is not POST');
        }
        if($_SERVER['CONTENT_TYPE'] != 'application/json') {
            $this->throwError(ResponseCodes::$UNSUPPORTED_MEDIA_TYPE, 'Content-Type must be application/json');
        }
        $parsedRequest = json_decode($rawRequestData);
        if($parsedRequest == null) {
            $this->throwError(ResponseCodes::$BAD_REQUEST, 'Json is invalid');
        }
        if(!isset($parsedRequest->apiAction) || $parsedRequest->apiAction == '') {
            $this->throwError(ResponseCodes::$BAD_REQUEST, 'ApiAction is required');
        }
        if(!isset($parsedRequest->params) || !is_object($parsedRequest->params)) {
            $this->throwError(ResponseCodes::$BAD_REQUEST, 'API Params are required');
        }
        return $parsedRequest;
    }

    private function processApi($requestData) {
        try {
            $class = new \ReflectionClass('ESportsBracketBuilder\\Api\\ApiActions\\' . ucfirst($requestData->apiAction));
            $action = $class->newInstanceArgs([$this->entityManager]);
            $userId = null;
            if($action->requiresAuthentication()) {
                $userId = JWTManagement::verifyToken();
            }
            $this->returnResponse($action->runAction($requestData->params, $userId));
        } catch (\ReflectionException $exception) {
            $this->throwError(ResponseCodes::$NOT_FOUND, 'Api not found');
        } catch (JwtException $exception) {
            $this->throwError(ResponseCodes::$FORBIDDEN, $exception->getMessage());
        }
    }

    private function returnResponse($response) {
        http_response_code(200);
        $response = array(
            'status' => 'success',
            'response' => $response
        );
        $this->sendResponse($response);
    }

    private function throwError(int $code, string $message) {
        http_response_code($code);
        $response = array(
            'status' => 'error',
            'message' => $message
        );
        $this->sendResponse($response);
    }

    private function sendResponse($response) {
        echo json_encode($response);
        exit();
    }
}
