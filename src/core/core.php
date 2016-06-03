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
    
    function renderList($array, $length )
    {
        foreach($array as $key => $item){
            echo $item . ' - ';
            if(($key % $length) == 0 && $key != 0) {
                print 'BREAK <br />';
                
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
