<?php

//require_once('core.php');

class Core
{

    function __construct()
    {
        $this->buildJson();
    }

    function buildJson()
    {
        // check that data is there
        // check that txt files jsonExist
        // get file list
        // convert file into json
        //   create new json file
    }

    private function parseArrayForJson($keys, $data)
    {
        $json = array(); 
        $array = $data;
        $fileKeys = $keys;

        foreach($array as $key => $items){
          $keyCount = 0;
          $test = array();
          foreach($items as $key => $item){
              $test[$fileKeys[$keyCount]] = $item;
              $keyCount++;
          }
          $json[] = $test;
        }

        return $json;
    }

    private function createJsonFile($filename, $data)
    {
        $folder = '../data/json';

        // check if JSON folder exists
        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }

        // check if file exists
        if(!$this->jsonExists($filename)){
            // if file does not exist, write the json to it
            $file = fopen($folder . '/' .  $filename, 'w');
            fwrite($file, json_encode($data));
            fclose($file);
        }
    }

    function jsonExist($filename)
    {
        return file_exists($filename) ? true : false;
    }

    function getDataFromFile($filename)
    {
        $array = array();
        $txtFile  = "../data/txt/" . $filename;
        $contents = file($txtFile, FILE_IGNORE_NEW_LINES);
        $firstRow = true;
        $fileKeys = array();

        foreach($contents as $item){
            if($firstRow){
                $fileKeys[] = explode(',', $item);
                $firstRow = false;
            } else {
                $array[] = explode(',', $item);
            }
        }
        
        return array($array, $fileKeys);
    }

    function ajaxGetDataFromFile($filename)
    {
        $txtFile  = "../data/txt/" . $filename;
        try{
            if(file_exists($txtFile)){
                $array = array();
                $contents = file($txtFile, FILE_IGNORE_NEW_LINES);
                $firstRow = true;
                $fileKeys = array();

                foreach($contents as $item){
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

    function ajaxGetStations()
    {
        return json_encode($this->getStations());
    }

    function getDataList()
    {
        $files = scandir('./data/');
        
        foreach($files as $key => $file){
            if($file == '.' || $file == '..'){
                unset($files[$key]);
            }    
        }
        
        return array_values($files);
    }
    
    function getStations()
    {
        $stations = $this->getDataFromFile('stops.txt');
        $stationList = [];
        foreach($stations as $station){
            $stationList[$station[0]] = $station[2];
        }
        
        unset($stationList['stop_id']);
        
        return array_unique($stationList);
    }
    
    function renderList($data)
    {
        $length = count($data);
        $length = $length - 1;
        $i = 0;

        foreach($data as $fkey => $array){
          foreach($array as $key => $item){
            print '<td>' . $item . '</td>
            ';
          }

          if($length != $i){
            print '</tr><tr>
            ';
          }
          
          $i++;
        }
    }
    
    function renderStations()
    {
        $stations = $this->getStations();
        $breakOn = 3;
        $i = 0;
        
        foreach($stations as $key => $station){
            $i++;
            $break = ($i % $breakOn == 0 && $i != 0) ? ' break' : '' ;
            print '
                <div class="col-4-12 station' . $break . '" id="' . $key . '">
                  
                    <i class="material-icons">train</i>
                    <span>'
                    . $station .
                    '</span>
                  </ul>   
                 </div>
            
            ';
            
            if($break){
                print '<div class="shame-break">&nbsp;</div>';
            }
            
        }
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
        case getDataFromFile :
            echo $core->ajaxGetDataFromFile($filename);
            break;
        case getFileList :
            echo $core->getFileList();
            break;
        case buildJson :
            echo $core->buildJson();
            break;
        case getStations :
            echo $core->ajaxGetStations();
            break;
    }
}
