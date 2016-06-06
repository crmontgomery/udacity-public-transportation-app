<?php
 require_once('core/core.php'); ?> 

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
          <div class="col-3-12" id="action">
            <div class="row" id="time">
              &nbsp;
            </div>
            <ul>
              <li><button class=""><i class="material-icons">train</i> <span>Departing from</span></button></li>
              <li>So. San Francisco Caltrain Station</li>
              <li><button class=""><i class="material-icons">place</i> <span>Arriving at</span></button></li>  
            </ul>
            
          </div>
          <div class="col-9-12" id="content">
            <?php
 $transport->renderStations(); ?> 
          </div>
      </div>
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