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
class ResourceManager extends AbstractManager
{
    /**
     *
     */
    const TABLE = 'resource';

    /**
     *  Initializes this class.
     */
    public function __construct()
    {
        parent::__construct(self::TABLE);
    }

    /**
     * @param array $item
     * @return int
     */
    public function insert(array $resource): int
    {
        // prepared request
        $statement = $this->pdo->prepare("INSERT INTO " . self::TABLE . " (`title`, `link`, `session_id`) VALUES (:title, :link, :session_id)");
        $statement->bindValue('title', $resource['title'], \PDO::PARAM_STR);
        $statement->bindValue('link', $resource['link'], \PDO::PARAM_STR);
        $statement->bindValue('session_id', $resource['session_id'], \PDO::PARAM_INT);

        if ($statement->execute()) {
            return (int) $this->pdo->lastInsertId();
        }
    }

    /**
     * @param array $resource
     * @return bool
     */
    public function update(array $resource): bool
    {

        // prepared request
        $statement = $this->pdo->prepare("UPDATE " . self::TABLE . " SET `title` = :title, `link` = :link WHERE id=:id");
        $statement->bindValue('id', $resource['id'], \PDO::PARAM_INT);
        $statement->bindValue('title', $resource['title'], \PDO::PARAM_STR);
        $statement->bindValue('link', $resource['link'], \PDO::PARAM_STR);

        return $statement->execute();
    }
}
