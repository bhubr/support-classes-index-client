<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 11/10/17
 * Time: 15:38
 * PHP version 7
 */

namespace App\Controller;

/**
 *
 */
abstract class AbstractController
{

    /**
     *  Initializes this class.
     */
    public function __construct()
    {
        if (isset($_POST)) {
            $this->jsonInput = json_decode(file_get_contents('php://input'), true);
        }
    }
}
