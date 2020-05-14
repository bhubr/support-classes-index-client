<?php
use Symfony\Component\Dotenv\Dotenv;

$dotenv = new Dotenv();
$envFile = realpath(__DIR__ . '/../.env');
$dotenv->load($envFile);
