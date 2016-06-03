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
    
    function debug($array)
    {
        print '<pre>';
        print_r($array);
        print '</pre>';
    }
}

$transport = new Transport();
$dataList = $transport->getDataList();
