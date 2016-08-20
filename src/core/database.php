<?php

class Database extends PDO
{

	public function __construct($DB_TYPE, $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS) 
	{
		parent::__construct($DB_TYPE . ':host=' . $DB_HOST . ';dbname=' . $DB_NAME, $DB_USER, $DB_PASS);
		parent::setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}

	// Runs a query on the selected database
	function select ($sql, $data = null, $fetchMode = PDO::FETCH_ASSOC)
	{
		try {
			$query = $this->prepare($sql);

			if($data != null) {
				foreach($data as $key => &$value) {
					$query->bindParam($key, $value);
				}
			}

			$query->execute();
			return $query->fetchAll($fetchMode);
		} catch(Exception $e) {
			return $e->getMessage();
		}
	}

	// inserts new data into the database
	function insert($table, $data)
	{
		try {
			ksort($data);
			$fieldNames  = '`' . implode('`, `', array_keys($data)) . '`';
			$fieldValues = ':' . implode(', :', array_keys($data));

			$insert = $this->prepare("INSERT INTO $table ($fieldNames) VALUES ($fieldValues)");
			foreach($data as $key => &$value) {
				$insert->bindParam($key, $value);
			}

			$insert->execute();
		} catch(Exception $e) {
			return $e->getMessage();
		}
	}

	// submits an update to the database
	function update($table, $data, $where)
	{
		ksort($data);
		$fieldDetails = null;

		foreach ($data as $key => $value) {
			$fieldDetails .= "`$key` = :$key,";
		}

		$fieldDetails = rtrim($fieldDetails, ', ');
		$update       = $this->prepare("UPDATE $table SET $fieldDetails WHERE $where");

		foreach($data as $key => $value) {
			$update->bindValue($key, $value);
		}

		$update->execute();
	}
}