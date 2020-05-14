<?php
/**
 * Created by PhpStorm.
 * User: aurelwcs
 * Date: 08/04/19
 * Time: 18:40
 */

namespace App\Controller;

class HomeController extends AbstractController
{

    /**
     * Display home page
     *
     * @return string
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function index()
    {
        $frontPath = realpath(__DIR__ . '/../../../front/build');
        if (!$frontPath) return '<h1>No build dir in front</h1>';
        $frontIndex = $frontPath . '/index.html';
        return file_get_contents($frontIndex);
    }
}
