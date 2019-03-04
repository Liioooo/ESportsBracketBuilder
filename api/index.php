<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

require_once "vendor/autoload.php";

require_once 'db_connection_params.php';

$isDevMode = true;
$config = Setup::createAnnotationMetadataConfiguration(array(__DIR__."/src"), $isDevMode);

$entityManager = EntityManager::create($connectionParams, $config);

new \ESportsBracketBuilder\Api\Api($entityManager);