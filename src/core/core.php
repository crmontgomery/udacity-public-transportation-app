<?php

namespace Core;

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

        if(empty($this->_isDatabaseLoaded()))
        {
            $this->_loadDatabase();
        }
    }

    private function _loadDatabase()
    {
        try {
            // Get file list
            $fileList = $this-_>getDataList();

            // Loop through the filelist
            foreach($fileList as $file)
            {
                $this->_prepFileForDatabase($file);
            } 

            $this->_isDatabaseLoaded(true);
        } catch(Exception $e) {
            echo $e;
        }
    }

    private function _prepFileForDatabase($file, $upload = true)
    {
        try {
            // Get the data from the file
            $fileData = $this->_getDataFromFile($file);
            // Get the file keys
            $keys = $fileData[0][0];
            // Get the file data
            $data = $fileData[1];
            // Use the file keys to create a json array
            $json = $this->_parseArrayForJson($keys, $data);
            // Use the json array to load the database
            if($upload){
                $this->_addTransportDataToDb($file, $json);
            }
            return $json;
        } catch(Exception $e) {
            return $e;
        }
    }

    private function _addTransportDataToDb($tableName, $json)
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

    private function _isDatabaseLoaded($loaded = false)
    {
        if($loaded)
        {
            $table = 'settings';
            $data  = array(
                    'data_loaded'     => 1
                    );

            $this->db->insert($table, $data);
        } else {
            $sql = 'SELECT * 
                    FROM settings';

            return $this->db->select($sql);
        }
    }

    private function _parseArrayForJson($keys, $data)
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

    private function _getDataFromFile($filename)
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
                $firstRow   = false;
            } else {
                $array[] = explode(',', $item);
            }
        }
        
        return array($fileKeys, $array);
    }

    private function _getDataList()
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

    private function _getFare($route, $origin, $destination)
    {
        $sql = 'SELECT fare_id
                  FROM fare_rules
                 WHERE route_id = :route 
                   AND origin_id = :origin 
                   AND destination_id = :destination';

        $binds = array(
                    ':route'       => $route,
                    ':origin'      => $origin,
                    ':destination' => $destination
                 );

        $fareId = $this->db->select($sql, $binds);
        
        $sql = 'SELECT price
                  FROM fare_attributes
                 WHERE fare_id = :fareId';

        $binds = array(
                    ':fareId' => $fareId[0]['fare_id']
                 );

        return $this->db->select($sql, $binds);
    }

    // ajax 
    function ajax_getStations()
    {
        $sql = '  SELECT * 
                    FROM stops
                   WHERE location_type = 1
                ORDER BY stop_name ASC';

        $stations = $this->db->select($sql);

        return json_encode($stations, JSON_FORCE_OBJECT);
    }

    function ajax_getSchedule($start, $end, $dayPlain)
    {
        $day = null;
        switch($dayPlain) {
            case 'saturday' :
                $day = 'CT-16APR-Caltrain-Saturday-02';
                break;
            case 'sunday' :
                $day = 'CT-16APR-Caltrain-Sunday-02';
                break;
            case 'weekday' :
                $day = 'CT-16APR-Caltrain-Weekday-01';
                break;

        }

        $sql = '   SELECT a.trip_id, a.arrival_time, a.departure_time, a.stop_id, a. stop_sequence,
                          b.stop_name, b.parent_station, b.wheelchair_boarding, b.zone_id,
                          c.route_id, c.service_id, c.trip_short_name
                     FROM stop_times a
                          LEFT JOIN stops b ON a.stop_id = b.stop_id
                          LEFT JOIN trips c ON a.trip_id = c.trip_id
                    WHERE b.parent_station = :start AND c.service_id = :day';

        $binds = array(
                    ':start' => $start,
                    ':day'   => $day
                 );

        $startTrains = $this->db->select($sql, $binds);

        $sql = '  SELECT a.trip_id, a.arrival_time, a.departure_time, a.stop_id, a. stop_sequence,
                         b.stop_name, b.parent_station, b.wheelchair_boarding, b.zone_id,
                         c.route_id, c.service_id, c.trip_short_name
                    FROM stop_times a
                         LEFT JOIN stops b ON a.stop_id = b.stop_id
                         LEFT JOIN trips c ON a.trip_id = c.trip_id
                   WHERE b.parent_station = :end AND c.service_id = :day';

        $binds = array(
                    ':end' => $end,
                    ':day' => $day
                 );

        $endTrains    = $this->db->select($sql, $binds);
        $tripSchedule = array();
        $tripDetails  = array();
        $detailsSet   = false;

        foreach($startTrains as $trainA)
        {
            foreach($endTrains as $trainB)
            {
                if($trainA['trip_id'] == $trainB['trip_id'] && $trainA['stop_sequence'] < $trainB['stop_sequence'])
                {
                    $price = $this->_getFare($trainA['route_id'], $trainA['zone_id'], $trainB['zone_id']);

                    if(!$detailsSet)
                    {
                        $tripDetails[] = array(
                            'station start' => $trainA['stop_name'],
                            'station end'   => $trainB['stop_name'],
                            'price'         => '$' . $price[0]['price']
                        );
                        $detailsSet = true;
                    }

                    $tripSchedule[] = array(
                        'trip_id'   => $trainA['trip_short_name'],
                        'start'     => date("g:i a", strtotime($trainA['arrival_time'])),
                        'start-raw' => $trainA['arrival_time'],
                        'end'       => date("g:i a", strtotime($trainB['arrival_time'])),
                        'end-raw'   => $trainB['arrival_time'],
                        'duration'  => (strtotime($trainB['arrival_time']) - strtotime($trainA['arrival_time'])) / 60
                    );
                }
            }
        }
        // return array($tripDetails, $tripSchedule);
        return json_encode(array('details' => $tripDetails, 'schedule' => $tripSchedule), JSON_FORCE_OBJECT);
    }

    function debug($array)
    {
        print '<pre>';
        print_r($array);
        print '</pre>';
    }
}

$core = new Core();

// White list for accessing php functions through ajax
if(isset($_POST['method']) && method_exists($core, $_POST['method'])) {
    $method = $_POST['method'];
    
    switch($method) {
        case 'ajax_getStations':
            echo $core->ajax_getStations();
            break;
        case 'ajax_getSchedule':
            echo $core->ajax_getSchedule($_POST['start'], $_POST['stop'], $_POST['day']);
            break;
    }
}
