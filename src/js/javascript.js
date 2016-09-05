$(document).ready(function(){
  var departingFrom = null,
      arrivingAt    = null,
      dayOfWk       = null,
      currentTime   = null,
      stationList   = [],
      tripDetails   = [],
      tripSchedule  = [];

  // Build methods
  getStations();
  getToday();
  startTime();

  // Js media queries
  // https://www.sitepoint.com/javascript-media-queries/
  // media query event handler
  if (matchMedia) {
    var mq = window.matchMedia("(max-width: 740px)");
    mq.addListener(widthChange);
    widthChange(mq);
  }

  // media query change
  function widthChange(mq) {
    if (mq.matches) {
      // less than 740
      
    } else {
      // bigger than 740

    }
  }

  // -----------------
  // Universal Methods
  // -----------------
  $('#btn-hide-missed-trains').on('click', function(){
    // Empty for now
  });

  $('#btn-depart').on('click', function() {
    if(departingFrom != null){
      changeStation(departingFrom, 'departingFrom');
    }
  });

  $('#btn-arrive').on('click', function() {
    if(arrivingAt != null){
      changeStation(arrivingAt, 'arrivingAt');
    }
  });

  // The day is selected automatically unless the user selects one specifically
  $('#btn-wk-day, #btn-wk-sat, #btn-wk-sun').on('click', function() {
    setDay($(this));
    if(departingFrom != null && arrivingAt != null) {
      getSchedule();
    }
  });

  // User selects a station from the list.
  $('#station-container').on('click', '.btn-station', function() {
    var stopId = $(this).attr('id');
    
    toggleBtn($(this), 'active');

    if(departingFrom == null && arrivingAt == null) {
      setDepartLocation(stopId);
      $('#step-1').text('Departing From');
    } else if (departingFrom != null && arrivingAt == null) {
      setArrivalLocation(stopId);
      $('#step-2').text('Arriving At');
      getSchedule();
    } else if (departingFrom == null && arrivingAt != null) {
      // empty
    }
  });

  function setDepartLocation(stopId) {
    departingFrom = stopId;
    $('#btn-depart').text($('#' + stopId).text());
  }

  function setArrivalLocation(stopId) {
    arrivingAt = stopId;
    $('#btn-arrive').text($('#' + stopId).text());
  }

  // TODO: Fix
  function changeStation(btn, target) {
      toggleBtn($('#' + btn), 'active');
      if(target == 'departingFrom') {
        departingFrom = null;
      } else if (target == 'arriveAt') {
        arriveAt = null;
      }
      toggleStations();
  }

  function transitionContent(obj) {
    var stations = obj,
        time = 100;

    stations.each(function() {
      var name = $(this);
      setTimeout(fadeSlow, time, name);
      time += (150);
    });

    //http://stackoverflow.com/questions/10942098/simple-fadein-and-visibility-in-jquery by softwaretech
    function fadeSlow(name) {
      name.css('visibility','visible').hide().fadeIn("slow");
    }
  }

  // Used to swap stations and trips back and forth
  function toggleContent() {

  }

  // Stations------------------------------------------------------------------------------------------
  function getStations() {
    // TODO: Change to have DATA dropped in rather than obtained from
    var url = 'core/core.php';

    $.post(url, {method: 'ajax_getStations'}, function(data) {
      stationList = data;
      loadStations();
    }, 'json');
  }

  // Uses station data to load content in divs
  function loadStations() {
      var count  = 0,
          rowNum = 0,
          col    = 3;
      //TODO: Fix to comform to standards
      for (var key in stationList) {
        if((count % col) == 0 || count == 0) {
          rowNum++;
          $('<div class="row" id="row-' + rowNum +'"></div>').appendTo('#station-container');
        }
        appendItems(stationList, rowNum, 4);
        count++;
      }

      function appendItems(data, row, col) {
        var width = col;
        $('<div class="col-' + width + '-12 station"><button class="btn-station" id="' + data[key]['stop_id'] + '">' + data[key]['stop_name'].replace(" Caltrain", "") + '</button></div>').appendTo('#row-' + row);
      }
      transitionContent($('.station'));
  }

  // Used to hide the stations container when trips are displayed
  function toggleStations() {
    var primary = $('#station-container');
    if(primary.is(':visible'))
    {
      primary.fadeOut('fast');
    } else if(primary.is(':hidden')){
      primary.fadeIn();
    }
  }

  // Schedule------------------------------------------------------------------------------------------
  function getSchedule() {
    if(departingFrom != null && arrivingAt != null)
    {
      var url    = 'core/core.php';
        
      $.post(url, {method: 'ajax_getSchedule', day: dayOfWk, start: departingFrom, stop: arrivingAt}, function(data){
        tripDetails  = data['details'][0];
        tripSchedule = data['schedule'];
        toggleStations();
        toggleSchedule();
      }, 'json').fail(function(e) {
        console.log(e);
      });
    }
  }

  function toggleSchedule() {
    var data   = tripSchedule,
        count  = 0,
        rowNum = 0;

    if(!isEmpty(data)) {

      $('#schedule-container').find('*').not('#empty-message').remove();

      $('#trip-fare').text(tripDetails['price'] + 'USD');

      $('#btn-hide-missed-trains').fadeOut(function() {
        $(this).text("Hide Missed Trains").fadeIn();
      });

      for (var key in data) {
        if((count % 2) == 0 || count == 0)
        {
          rowNum++;
          $('<div class="row" id="row-schedule-' + rowNum +'"></div>').appendTo('#schedule-container');
        }
        appendItems(data, rowNum);
        count++;
      }

      var startRaw = data[key]['start-raw'],
          endRaw   = data[key]['end-raw'];

      function appendItems(data, row) {
        $(`<div class="col-6-12 trip` + (timeRemaining(data[key]['start-raw']) != '--' ? `` : ` hollow`) + `" id="trip-id-` + data[key]['trip_id'] + `">
            <div class="row reset stack">
              <div class="col-2-12 reset">
                <div class="border-top-bottom-left module text-center">
                  <span><small>Train</small><span><br/>
                  <span>` + data[key]['trip_id'] + `<span>
                </div>
              </div>
              <div class="col-10-12 reset">
                <div class="row reset stack">
                  <div class="col-3-12 reset">
                    <div class="border-top-bottom module">
                      <span><small>Departs</small><span> <br/>
                      <span>` + data[key]['start'] + `<span>
                    </div>
                  </div>
                  <div class="col-3-12 reset">
                    <div class="border-top-bottom module">
                      <span><small>Arrives</small><span> <br/>
                      <span>` + data[key]['end'] + `<span>
                    </div>
                  </div>
                  <div class="col-3-12 reset">
                    <div class="border-top-bottom module">
                      <span><small>Duration</small><span> <br/>
                      <span>` + data[key]['duration'] + ` Min<span>
                    </div>
                  </div>
                  <div class="col-3-12 reset">
                    <div class="border-top-right-bottom module">
                      <span><small>Departing</small><span> <br/>
                      <span>` + timeRemaining(data[key]['start-raw']) + `<span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`).appendTo('#row-schedule-' + row);
      }
      transitionContent($('.trip'), 'normal');
    } else {
      $('#empty-message').fadeIn('slow');
    }
  }

  // ---------
  // Utilities
  // ---------
  function isOnline() {
    return navigator.onLine ? true : false; 
  }

  // http://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object by christoph and mb21
  function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
  }

  function toggleBtn(btn, className) {
    if(btn.hasClass(className)) {
      btn.removeClass(className);
    } else {
      btn.addClass(className);
    }
  }

  // Time------------------------------------------------------------------------------------------
  function timeRemaining(time) {
    var now = splitTime(currentTime),
        next = splitTime(time),
        diff = {
          hours:   null,
          minutes: null
        };
        
    if(now.hours < next.hours) {
      diff.hours = next.hours-now.hours;
    }

    if(now.minutes < next.minutes) {
      diff.minutes = next.minutes-now.minutes;
    } else if(now.minutes >= next.minutes){
      diff.minutes = 60 - (now.minutes-next.minutes);
      diff.hours = diff.hours - 1;
    }

    if ((diff.hours < 0 || diff.hours == null)) {
      return '--';  
    } else if (diff.hours == 0) {
      return diff.minutes + 'm';
    } else {
      return diff.hours + 'h ' + diff.minutes + 'm';
    }
    
  }

  function splitTime(time) {
    var timeSplit = time.split(/:/),
        hrs = parseInt(timeSplit[0]),
        min   = parseInt(timeSplit[1]);
    
    if(hrs > 24) {
      hrs = hrs - 24;
    } else if (hrs == 24) {
      hrs = 0;
    }

    return {
      hours:   hrs, 
      minutes: min
    };
  }

  // http://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    currentTime = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 1000);
  }

  function checkTime(i) {
      if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
      return i;
  }

  // Days------------------------------------------------------------------------------------------
  function getToday() {
    //http://stackoverflow.com/questions/1181219/determine-if-a-date-is-a-saturday-or-a-sunday-using-javascript by andrew moore
    var today = new Date();
    if(today.getDay() == 6){
      var btnSat = $('#btn-wk-sat');
      toggleBtn(btnSat, 'hollow');
      dayOfWk = 'saturday';
    } else if (today.getDay() == 0) {
      var btnSat = $('#btn-wk-sun');
      toggleBtn(btnSat, 'hollow');
      dayOfWk = 'sunday';
    } else if(today.getDay() >= 1 || today.getDay() <= 5) {
      var btnSat = $('#btn-wk-day');
      toggleBtn(btnSat, 'hollow');
      dayOfWk = 'weekday';
    }
  }

  // User Override
  function setDay(userDay) {
    var btn = {
      saturday: '#btn-wk-sat', 
      sunday:   '#btn-wk-sun', 
      weekday:  '#btn-wk-day'
    };

    switch('#' + userDay.attr('id')) {
      case btn.saturday:
        dayOfWk = 'saturday';
        $('#step-3').text('For this weekend');
        break;
      case btn.sunday:
        dayOfWk = 'sunday';
        $('#step-3').text('For this weekend');
        break;
      case btn.weekday:
        dayOfWk = 'weekday';
        $('#step-3').text('For this week');
        break;
    }

    toggleBtnHollow(btn, dayOfWk);

    function toggleBtnHollow(btn, day) {
      var today = day;
      for (var key in btn) {
        if(today == key && $(btn[key]).hasClass('hollow')) {
          // Today
          toggleBtn($(btn[key]), 'hollow');
        } else if(today != key && !$(btn[key]).hasClass('hollow')) {
          // Not today
          toggleBtn($(btn[key]), 'hollow');
        }
      }
    }
  }

  // --------------
  // Online Methods
  // --------------
  if(isOnline()) {
    // Online Stuff
    //console.log('Online');
  } 

  // --------------
  // Offline Method
  // --------------
  if(!isOnline()) {
    // Offline Stuff
    //console.log('Offline');
  }
});
