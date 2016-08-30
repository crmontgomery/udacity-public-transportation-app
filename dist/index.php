<?php
// Remove after done testing 
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
  <link href="css/stylesheet.css" rel="stylesheet" >
</head>
<body>
  <header>
    <div class="container">
      <div class="row stack">
        <div class="col-6-12">
          <button type="button" id="btn-title">Transportation App</button>
        </div>
        <div class="col-6-12 text-right">
          <button type="button" id="btn-hide-missed-trains">&nbsp;</button>
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="row-x" id="hero">
      <div class="container">
        <div class="row">
          <div class="col-4-12"><!-- step 1 -->
            <div class="module">
              <div><small id="step-1">Step 1</small></div>
              <button type="button" id="btn-depart" data-target="">Departing From:</button>
            </div>
          </div> <!-- /step 1 -->
          <div class="col-4-12"><!-- step 2 -->
            <div class="module unfocus">
              <div><small id="step-2">Step 2</small></div>
              <button type="button" id="btn-arrive" data-target="">Arriving At</button>
            </div>
          </div><!-- /step 2 -->
          <div class="col-4-12"><!-- step 3 -->
            <div class="module unfocus">
              <div><small id="step-3">For Today</small></div>
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
    <div class="row-x border-bottom" id="trip-details-row">
      <div class="container"> <!-- information container-->
        <div class="row" id="trip-details">
          <div class="col-6-12" id="title"><!-- title -->
            <h3>Train Stations</h3>
          </div><!-- /title -->
          <div class="col-6-12" id="trip-meta">
            <div class="row">
              <div class="col-4-12">
                <span><small>Next Train</small><span> <br/>
                <span id="">3hr 27min<span>
              </div>
              <div class="col-4-12">
                <span><small>Remaining</small><span> <br/>
                <span id="">32<span>
              </div>
              <div class="col-4-12">
                <span><small>Fare</small><span> <br/>
                <span id="trip-fare">$8.95 USD<span>
              </div>
            </div>
          </div>
        </div><!-- /trip-details -->
      </div><!-- /container -->
    </div> <!-- /row-x title-information -->
    <div class="container" id="primary-container">
      <div class="row-x" id="schedule-container">
        <div class="row" id="empty-message">
          <div class="col-12-12 text-center">
            Sorry! It appears there are not any connection trains between those two stations.
          </div>
        </div>
      </div>
      <div id="station-container"></div>
    </div> <!-- /primary-container -->
  </main>
  <footer>
    <script src="js/jquery-3.1.0.min.js"></script>
    <script src="js/javascript.min.js"></script>
    <div class="container text-center" id="footer">
      &nbsp;
    </div>
  </footer>
</body>
</html>