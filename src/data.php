<?php
  require_once('core/core.php');
?> 

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Public Transportation App</title>
  <meta name="description" content="A publice transportation app.">
  <meta name="author" content="Corey R. Montgomery">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="<?php echo (file_exists('css/stylesheet.min.css')) ? 'css/stylesheet.min.css' : 'css/stylesheet.css' ?>" rel="stylesheet" >
</head>

<body>
  <header>
    <div class="container">
      <span id="title">Transportation App</span>
    </div>
  </header>
  <main>
    <div class="row">
      <div class="container">
        <?php 
        echo 'Stuff';
        $transport->debug($transport->getDataFromFile($dataList[2]));

        ?>
      </div>
    </div>
    <div class="row">
      <div class="container">

        <?php
          // for($i=0; $i < count($dataList); $i++){
            
          //   print '<table>
          //           <tr><td>' . $dataList[$i] . '</td></tr>
          //           <tr>';
          //   $transport->renderList($transport->getDataFromFile($dataList[$i]));
          //   print '  </tr>
          //       </table>
          //       ';
          // }
        ?> 


    </div>
  </main>
  <footer>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script src="<?php echo (file_exists('js/javascript.min.js')) ? 'js/javascript.min.js' : 'js/javascript.js' ?>"></script>
    <div class="container text-center">
      Corey R. Montgomery
    </div>
  </footer>
</body>
</html>