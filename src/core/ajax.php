<?php

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

    function TEMP_build()
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

    function createJsonFile($filename, $data)
    {
        $folder = $_SERVER['DOCUMENT_ROOT'] . '/data/json';

        // check if JSON folder exists
        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }

        $filename = substr($filename, 0, strpos($filename, '.'));
        $filename = $filename . '.json';
        // check if file exists
        if(!file_exists($folder . '/' . $filename)){
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
        return json_encode($this->getStations(), JSON_FORCE_OBJECT);
    }

    function getDataList()
    {
        $files = scandir('../data/txt');
        
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
        foreach($stations[0] as $station){
            $stationTemp = array();
            $stationTemp['id'] = $station[0];
            $stationTemp['name'] = $station[2];
            $stationList[] = $stationTemp;
        }
        
        //return array_unique($stationList);
        return $stationList;
    }
    
    // function renderList($data)
    // {
    //     $length = count($data);
    //     $length = $length - 1;
    //     $i = 0;

    //     foreach($data as $fkey => $array){
    //       foreach($array as $key => $item){
    //         print '<td>' . $item . '</td>
    //         ';
    //       }

    //       if($length != $i){
    //         print '</tr><tr>
    //         ';
    //       }
          
    //       $i++;
    //     }
    // }
    
    // function renderStations()
    // {
    //     $stations = $this->getStations();
    //     $breakOn = 3;
    //     $i = 0;
        
    //     foreach($stations as $key => $station){
    //         $i++;
    //         $break = ($i % $breakOn == 0 && $i != 0) ? ' break' : '' ;
    //         print '
    //             <div class="col-4-12 station' . $break . '" id="' . $key . '">
                  
    //                 <i class="material-icons">train</i>
    //                 <span>'
    //                 . $station .
    //                 '</span>
    //               </ul>   
    //              </div>
            
    //         ';
            
    //         if($break){
    //             print '<div class="shame-break">&nbsp;</div>';
    //         }
            
    //     }
    // }
    
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
            echo $core->TEMP_build();
            break;
        case getStations :
            echo $core->ajaxGetStations();
            break;
    }
}
