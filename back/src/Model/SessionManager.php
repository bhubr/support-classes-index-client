<?php
/**
 * Created by PhpStorm.
 * User: sylvain
 * Date: 07/03/18
 * Time: 18:20
 * PHP version 7
 */

namespace App\Model;

/**
 *
 */
class SessionManager extends AbstractManager
{
    /**
     *
     */
    const TABLE = 'session';

    /**
     *  Initializes this class.
     */
    public function __construct()
    {
        parent::__construct(self::TABLE);
    }

    /**
     * @param array $session
     * @return int
     */
    public function insert(array $session): int
    {
        // prepared request
        $statement = $this->pdo->prepare(
            "INSERT INTO " . self::TABLE . " (`title`, `description`, `language`, `created_at`) VALUES "
            . "(:title, :description, :language, :created_at)"
        );
        $statement->bindValue('title', $session['title'], \PDO::PARAM_STR);
        $statement->bindValue('description', $session['description'], \PDO::PARAM_STR);
        $statement->bindValue('language', $session['language'], \PDO::PARAM_STR);
        $statement->bindValue('created_at', $session['created_at'], \PDO::PARAM_STR);

        if ($statement->execute()) {
            return (int) $this->pdo->lastInsertId();
        }
    }

    /**
     * @param int $id
     */
    public function delete(int $id): void
    {
        // prepared request
        $statement = $this->pdo->prepare("DELETE FROM " . self::TABLE . " WHERE id=:id");
        $statement->bindValue('id', $id, \PDO::PARAM_INT);
        $statement->execute();
    }

    /**
     * @param array $session
     * @return bool
     */
    public function update(array $session): bool
    {

        // prepared request
        $statement = $this->pdo->prepare(
            "UPDATE " . self::TABLE . " SET `title` = :title, `description` = :description, `created_at` = :created_at, `language` = :language WHERE id=:id"
        );
        $statement->bindValue('id', $session['id'], \PDO::PARAM_INT);
        $statement->bindValue('title', $session['title'], \PDO::PARAM_STR);
        $statement->bindValue('description', $session['description'], \PDO::PARAM_STR);
        $statement->bindValue('language', $session['language'], \PDO::PARAM_STR);
        $statement->bindValue('created_at', $session['created_at'], \PDO::PARAM_STR);

        return $statement->execute();
    }
}
