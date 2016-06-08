<?php

class Core
{

    function getDataFromFile($filename)
    {
        $array = array();
        $txtFile  = "../data/" . $filename;
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
        // $results = $this->parseArrayForJson($fileKeys[0], $array);
        // return json_encode($results);
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

    private function createJsonFiles($filename, $data)
    {
        // check if file exists
        // if file does not exist, write the json to it
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

    function testJson()
    {
        echo 'TestJson';
    }

    function test()
    {
        return 'This is a test';
    }
}