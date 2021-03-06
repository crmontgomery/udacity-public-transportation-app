<?php

class Core
{
    function __construct()
    {
        require 'database.php';
        date_default_timezone_set('America/Los_Angeles');

        try {
            $this->db = new Database('mysql', 'localhost', 'transport_app', 'root', 'mysql');
		} catch(Exception $e) {
			echo $e;
			exit;
		}

        if(empty($this->isDatabaseLoaded()))
        {
            $this->loadDatabase();
        }
    }

    function loadDatabase()
    {
        try {
            // Get file list
            $fileList = $this->getDataList();

            // Loop through the filelist
            foreach($fileList as $file)
            {
                $this->prepFileForDatabase($file);
            } 

            $this->isDatabaseLoaded(true);
        } catch(Exception $e) {
            echo $e;
        }
    }

    function prepFileForDatabase($file, $upload = true)
    {
        try {
            // Get the data from the file
            $fileData = $this->getDataFromFile($file);
            // Get the file keys
            $keys = $fileData[0][0];
            // Get the file data
            $data = $fileData[1];
            // Use the file keys to create a json array
            $json = $this->parseArrayForJson($keys, $data);
            // Use the json array to load the database
            if($upload){
                $this->addTransportDataToDb($file, $json);
            }
            return $json;
        } catch(Exception $e) {
            return $e;
        }
        
    }

    function addTransportDataToDb($tableName, $json)
    {
        try{
            $table = substr($tableName, 0, strpos($tableName, '.'));;
    
            foreach($json as $record)
            {
                $data = array();
                foreach($record as $key => $item)
                {
                    $data[$key] = trim($item,'"');;
                }

                echo $this->db->insert($table, $data);
            }

        } catch(Exception $e) {
            echo $e;
        }
        
    }

    function isDatabaseLoaded($loaded = false)
    {
        if($loaded)
        {
            $table = 'settings';
            $data = array(
                    'data_loaded'     => 1
                    );

            $this->db->insert($table, $data);
        } else {
            $sql = 'SELECT * 
                    FROM settings';

            return $this->db->select($sql);
        }
        
    }

    private function parseArrayForJson($keys, $data)
    {
        $json = array(); 
        $array = $data;
        $fileKeys = $keys;

        foreach($array as $key => $items)
        {
          $keyCount = 0;
          $test = array();
          foreach($items as $key => $item)
          {
              $test[$fileKeys[$keyCount]] = $item;
              $keyCount++;
          }
          $json[] = $test;
        }

        return $json;
    }

    function getDataFromFile($filename)
    {
        $array = array();
        // $txtFile  = "../data/txt/" . $filename;
        $txtFile  = "data/txt/" . $filename; // For NATIVE PHP
        $contents = file($txtFile, FILE_IGNORE_NEW_LINES);
        $firstRow = true;
        $fileKeys = array();

        foreach($contents as $item)
        {
            if($firstRow){
                $fileKeys[] = explode(',', $item);
                $firstRow = false;
            } else {
                $array[] = explode(',', $item);
            }
        }
        
        return array($fileKeys, $array);
    }

    function getDataList()
    {
        //$files = scandir('../data/txt');
        $files = scandir('data/txt');
        
        foreach($files as $key => $file){
            if($file == '.' || $file == '..'){
                unset($files[$key]);
            }    
        }
        
        return array_values($files);
    }

    // ajax 
    function ajax_getStations()
    {
        $sql = 'SELECT * 
                FROM   stops
                WHERE  location_type = 1';

        $stations = $this->db->select($sql);

        return json_encode($stations, JSON_FORCE_OBJECT);
    }


    // OLD

    function buildJson()
    {
        $files = $this->getDataList();
        
        try {
            foreach($files as $file) {
                $json = $this->ajaxGetDataFromFile($file);
                $this->createJsonFile($file, $json);
            }
        } catch(Exception $e) {
            echo $e;
        }
    }

    

    function createJsonFile($filename, $data)
    {
        // $folder = $_SERVER['DOCUMENT_ROOT'] . '/data/json';
        $folder = '../data/json';
        echo $folder;
        // check if JSON folder exists
        if (!file_exists($folder))
        {
            mkdir($folder, 0777, true);
        }

        $filename = substr($filename, 0, strpos($filename, '.'));
        $filename = $filename . '.json';
        // check if file exists
        if(!file_exists($folder . '/' . $filename))
        {
            // if file does not exist, write the json to it
            try {
                $path = $folder . '/' .  $filename;
                $file = fopen($path, 'a+');
                fwrite($file, $data);
                fclose($file);
                chmod($path, 0777);
            } catch(Exception $e){
                echo 'Error ' . $e;
            }
        }
    }

    function pain($filename)
    {
        return file_exists($filename) ? true : false;
    }

    

    function ajaxGetDataFromFile($filename)
    {
        $txtFile  = "../data/txt/" . $filename;
        try{
            if(file_exists($txtFile))
            {
                $array = array();
                $contents = file($txtFile, FILE_IGNORE_NEW_LINES);
                $firstRow = true;
                $fileKeys = array();

                foreach($contents as $item)
                {
                    if($firstRow){
                        $fileKeys[] = explode(',', $item);
                        $firstRow = false;
                    } else {
                        $array[] = explode(',', $item);
                    }
                }
                
                $results = $this->parseArrayForJson($fileKeys[0], $array);
                return json_encode($results);

            } else {
                return 'The file "' . $filename . '" does not exist.';
            }

        } catch(Exception $e) {
            return $e;
        }
    }


    
    
    function getStations()
    {
        $stations = $this->getDataFromFile('stops.txt');
        $stationList = [];
        foreach($stations[0] as $station){
            $stationTemp = array();
            $stationTemp['id'] = $station[0];
            $stationTemp['name'] = $station[2];
            $stationList[] = $stationTemp;
        }
        
        //return array_unique($stationList);
        return $stationList;
    }
    
    function debug($array)
    {
        print '<pre>';
        print_r($array);
        print '</pre>';
    }

}

$core = new Core();

if(isset($_POST['method']) && method_exists($core, $_POST['method'])) {
    $method = $_POST['method'];
    //$filename = isset($_POST['filename']) &&  ? $_POST['filename'] : null;
    $filename = $_POST['filename'];
    // White list for accessing php functions through ajax
    switch($method) {
        case 'getDataFromFile':
            echo $core->ajaxGetDataFromFile($filename);
            break;
        case 'getFileList':
            echo $core->getFileList();
            break;
        case 'buildJson':
            echo $core->buildJson();
            break;
        case 'ajax_getStations':
            echo $core->ajax_getStations();
            break;
    }
}
