<?php 
include('core/core.php')
?>

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Public Transportation App</title>
  <meta name="viewport" content="width=device-width" />
  <meta name="description" content="A publice transportation app.">
  <meta name="author" content="Corey R. Montgomery">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="css/stylesheet.css" rel="stylesheet" >
</head>
<body>
  <header>
    <div class="container">
      <span id="title">Transportation App</span>
    </div>
  </header>
  <main>
    <div class="row-x" id="hero">
      <div class="container">
        <div class="row">
          <div class="col-4-12">
            <div class="module">
              <div><small>Step 1</small></div>
              <button>Departing From:</button>
            </div>
          </div> <!-- /step 1 -->
          <div class="col-4-12">
            <div class="module">
              <div><small>Step 2</small></div>
              <button>Arriving At</button>
            </div>
          </div><!-- /step 1 -->
          <div class="col-4-12">
            <div class="module">
              <div><small>Step 3</small></div>
              <div class="row">
                <div class="col-6-12">
                  <button>Weekday</button>
                </div>
                <div class="col-6-12">
                  <button>Weekend</button>
                </div>
              </div>
            </div>
          </div><!-- /step 1 -->
        </div><!-- /row -->
      </div> <!-- /container -->
    </div> <!-- /row-x hero -->
    <div class="container" id="primary-content">
      <div class="row">
          <div class="col-3-12">
            <div class="module">
              Stop 1
            </div>
          </div> <!-- /stop 1 -->
          <div class="col-3-12">
            <div class="module">
              Stop 2
            </div>
          </div><!-- /stop 2 -->
          <div class="col-3-12">
            <div class="module">
              Stop 3
            </div>
          </div><!-- /stop 3 -->
          <div class="col-3-12">
            <div class="module">
              Stop 4
            </div>
          </div><!-- /stop 4 -->
        </div><!-- /row -->
    </div>
  </main>
  <footer>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script src="js/javascript.min.js"></script>
    <div class="container text-center" id="footer">
      Corey R. Montgomery
    </div>
  </footer>
</body>
</html>