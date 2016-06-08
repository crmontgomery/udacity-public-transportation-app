<?php

require_once('core.php');

$core = new Core();

if(isset($_POST['method']) && method_exists($core, $_POST['method'])) {
    $method = $_POST['method'];
    //$filename = isset($_POST['filename']) &&  ? $_POST['filename'] : null;
    $filename = $_POST['filename'];
    // White list for accessing php functions through ajax
    switch($method) {
        case ajaxGetDataFromFile :
            echo $core->ajaxGetDataFromFile($filename);
            break;
    }
}


