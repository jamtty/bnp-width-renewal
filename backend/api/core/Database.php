<?php
/**
 * PDO 데이터베이스 연결 싱글톤
 */
class Database
{
    private static ?PDO $instance = null;

    private function __construct() {}
    private function __clone() {}

    public static function getInstance(): PDO
    {
        if (self::$instance === null) {
            $host    = Env::get('DB_HOST', 'localhost');
            $dbname  = Env::get('DB_NAME');
            $user    = Env::get('DB_USER');
            $pass    = Env::get('DB_PASS');
            $charset = Env::get('DB_CHARSET', 'utf8mb4');

            $dsn = "mysql:host={$host};dbname={$dbname};charset={$charset}";

            self::$instance = new PDO($dsn, $user, $pass, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::MYSQL_ATTR_FOUND_ROWS   => true,  // 변경 없어도 일치 행 수 반환
            ]);
        }

        return self::$instance;
    }
}
