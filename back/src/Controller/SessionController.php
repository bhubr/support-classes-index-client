<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 11/10/17
 * Time: 16:07
 * PHP version 7
 */

namespace App\Controller;

use App\Model\SessionManager;

/**
 * Class SessionController
 *
 */
class SessionController extends AbstractController
{


    /**
     * Display item listing
     *
     * @return string
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function index()
    {
        $sessionManager = new sessionManager();
        $sessions = $sessionManager->selectAll();

        return json_encode($sessions);
    }


    /**
     * Display item informations specified by $id
     *
     * @param int $id
     * @return string
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function show(int $id)
    {
        $sessionManager = new sessionManager();
        $item = $sessionManager->selectOneById($id);

        return $this->twig->render('Item/show.html.twig', ['item' => $item]);
    }


    /**
     * Display item edition page specified by $id
     *
     * @param int $id
     * @return string
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function edit(int $id): string
    {
        $sessionManager = new sessionManager();
        $item = $sessionManager->selectOneById($id);

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $item['title'] = $_POST['title'];
            $sessionManager->update($item);
        }

        return $this->twig->render('Item/edit.html.twig', ['item' => $item]);
    }


    /**
     * Display item creation page
     *
     * @return string
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function create()
    {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $sessionManager = new sessionManager();
            $session = [
                'title' => $this->jsonInput['title'],
                'description' => $this->jsonInput['description'],
                'language' => $this->jsonInput['language'],
                'created_at' => $this->jsonInput['date'],
            ];
            $id = $sessionManager->insert($session);
            $session['id'] = $id;
            $protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.1');

            header($protocol . ' 201 Created');
            return json_encode($session);
        }

        return $this->twig->render('Item/add.html.twig');
    }


    /**
     * Handle item deletion
     *
     * @param int $id
     */
    public function delete(int $id)
    {
        $sessionManager = new sessionManager();
        $sessionManager->delete($id);
        header('Location:/item/index');
    }
}
