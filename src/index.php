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
      <span id="title">Transportation App: Test 1</span>
    </div>
  </header>
  <main>
    <div class="row" id="action">
      <div class="container">
        <div class="col-4-12" id="depart">
          <div id="depart-step-text">Step 1</div>
          <button class="set"><i class="material-icons">train</i> <span>Departing from</span></button>
        </div>
        <div class="col-4-12" id="arrive">
          <div id="arrive-step-text">Step 2</div>
          <button class=""><i class="material-icons">place</i> <span>Arriving At</span></button>
        </div>
        <div class="col-4-12" id="date">
          <div id="date-step-text">Step 3</div>
          <button class=""><i class="material-icons">date_range</i> <span>When</span></button>
        </div>  
      </div>
    </div>
    <div class="row">
      <div class="container" id="content">
        <ul id="list">
        <ul>
      </div>
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