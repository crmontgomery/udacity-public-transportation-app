<?php

class Transport 
{

    function getDataFromFile($filename)
    {
        $array;
        $txtFile  = "./data/" . $filename;
        $contents = file($txtFile, FILE_IGNORE_NEW_LINES);
        
        foreach($contents as $item){
            $array[] = explode(',', $item);
        }
        
        return $array;
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

$transport = new Transport();
$dataList = $transport->getDataList();
$stations = $transport->getStations();
