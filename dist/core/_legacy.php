// OLD
    function buildJson()
    {
        $files = $this->_getDataList();
        
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

    function fileExist($filename)
    {
        return file_exists($filename) ? true : false;
    }

    function ajaxGetDataFromFile($filename)
    {
        $txtFile  = "../data/txt/" . $filename;
        try{
            if(file_exists($txtFile))
            {
                $array    = array();
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
                
                $results = $this->_parseArrayForJson($fileKeys[0], $array);
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
        $stations    = $this->getDataFromFile('stops.txt');
        $stationList = [];
        foreach($stations[0] as $station){
            $stationTemp         = array();
            $stationTemp['id']   = $station[0];
            $stationTemp['name'] = $station[2];
            $stationList[]       = $stationTemp;
        }
        
        //return array_unique($stationList);
        return $stationList;
    }