<?php
/**
 * Created by PhpStorm.
 * User: aurelwcs
 * Date: 08/04/19
 * Time: 18:40
 */

namespace App\Controller;

use GuzzleHttp\Client;
use \Firebase\JWT\JWT;

class AuthController extends AbstractController
{

    /**
     * Display home page
     *
     * @return string
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function code()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            header('HTTP/1.1 405 Method Not Allowed');
            exit;
        }

        $client = new Client([
            'base_uri' => 'https://odyssey.wildcodeschool.com',
            'timeout' => 2.0,
        ]);
        $token_args = [
            'grant_type' => 'authorization_code',
            'client_id' => $_ENV['OAUTH_CLIENT_ID'],
            'client_secret' => $_ENV['OAUTH_CLIENT_SECRET'],
            'redirect_uri' => $_ENV['OAUTH_REDIRECT_URI'],
            'code' => $this->jsonInput['code'],
        ];
        $tokenRes = $client->request('POST', '/oauth/token', [
            'form_params' => $token_args,
        ]);
        $tokenData = json_decode($tokenRes->getBody()->getContents(), true);
        $accessToken = $tokenData['access_token'];
        $profileRes = $client->request('GET', '/api/v2/me', [
            'headers' => [
                'Authorization' => "Bearer $accessToken",
            ],
        ]);
        $profile = json_decode($profileRes->getBody()->getContents(), true);
        $payload = [
            'id' => $profile['id'],
            'email' => $profile['email'],
            'firstname' => $profile['firstname'],
            'isTrainer' => in_array('trainer', $profile['roles']),
        ];
        $jwt = JWT::encode($payload, $_ENV['JWT_SECRET']);
        setcookie('jwt', $jwt, [
            'httponly' => true,
        ]);
        header('Content-Type: application/json');
        echo json_encode($payload);
    }

    public function me()
    {
        if (!isset($_COOKIE['jwt'])) {
            header('HTTP/1.1 401 Unauthorized');
            exit;
        }
        $decoded = JWT::decode($_COOKIE['jwt'], $_ENV['JWT_SECRET'], ['HS256']);
        header('Content-Type: application/json');
        return json_encode($decoded);
    }

    public function logout()
    {
        setcookie('jwt', '', time() - 3600);
    }
}
