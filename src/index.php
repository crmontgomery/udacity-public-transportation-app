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
          <div class="col-4-12"><!-- step 1 -->
            <div class="module">
              <div><small>Step 1</small></div>
              <button type="button" id="btn-depart" data-target="">Departing From:</button>
            </div>
          </div> <!-- /step 1 -->
          <div class="col-4-12"><!-- step 2 -->
            <div class="module unfocus">
              <div><small>Step 2</small></div>
              <button type="button" id="btn-arrive" data-target="">Arriving At</button>
            </div>
          </div><!-- /step 2 -->
          <div class="col-4-12"><!-- step 3 -->
            <div class="module unfocus">
              <div><small>Step 3</small></div>
              <div class="row">
                <div class="col-6-12">
                  <button class="hollow" id="btn-wk-day">Weekday</button>
                </div>
                <div class="col-6-12">
                  <div class="row">
                    <div class="col-6-12">
                      <button class="hollow" id="btn-wk-sat">Sat.</button>
                    </div>
                    <div class="col-6-12">
                      <button class="hollow" id="btn-wk-sun">Sun.</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- /step 3 -->
        </div><!-- /row -->
      </div> <!-- /container -->
    </div> <!-- /row-x hero -->

    <div class="container" id="primary-container">
    </div> <!-- /primary-container -->
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