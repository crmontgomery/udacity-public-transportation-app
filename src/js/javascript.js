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

  // -----------------
  // Universal Methods
  // -----------------
  $('#btn-depart').on('click', function(){
    departingFrom = null;
  });

  $('#btn-arrive').on('click', function(){
    if(arrivingAt != null){
      toggleBtn($(arrivingAt), 'hollow');
      arrivingAt = null;
      toggleStations();
    }
  });

  // The day is selected automatically unless the user selects on specifically
  $('#btn-wk-day, #btn-wk-sat, #btn-wk-sun').on('click', function(){
    setDay($(this));
    if(departingFrom != null && arrivingAt != null){
      getSchedule();
    }
  });

  // User selects a station from the list.
  $('#station-container').on('click', '.btn-station', function(){
    var stopId = $(this).attr('id');
    toggleBtn($(this), 'active');
    if(departingFrom == null && arrivingAt == null){
      setDepartLocation(stopId);
      $('#step-1').text('Departing From');
    } else if(departingFrom != null && arrivingAt == null){
      setArrivalLocation(stopId);
      $('#step-2').text('Arriving At');
      getSchedule();
    } 
  });

  function setDepartLocation(stopId)
  {
    departingFrom = stopId;
    $('#btn-depart').text($('#' + stopId).text());
  }

  function setArrivalLocation(stopId)
  {
    arrivingAt = stopId;
    $('#btn-arrive').text($('#' + stopId).text());
  }

  // Stations
  function getStations()
  {
    // TODO: Change to have DATA dropped in rather than obtained from
    var url    = 'core/core.php',
        count  = 0,
        rowNum = 0;

    $.post(url, {method: 'ajax_getStations'}, function(data){
      stationList = data;
      for (var key in data) {
        
        if((count % 3) == 0 || count == 0)
        {
          rowNum++;
          $('<div class="row" id="row-' + rowNum +'"></div>').appendTo('#station-container');
        }
        //appendItems(data[key]['stop_name'], rowNum);
        appendItems(data, rowNum);
        count++;
      }

      function appendItems(data, row)
      {
        $('<div class="col-4-12 station"><button class="btn-station" id="' + data[key]['stop_id'] + '">' + data[key]['stop_name'].replace(" Caltrain", "") + '</button></div>').appendTo('#row-' + row);
      }

      showStations();

    }, 'json');
  }

  // Animates the stations being listed
  function showStations()
  {
    $stations = $('.station');
    var time = 100;

    $stations.each(function() {
      var name = $(this);
      setTimeout(fadeSlow, time, name);
      time += (150);
    });

    //http://stackoverflow.com/questions/10942098/simple-fadein-and-visibility-in-jquery by softwaretech
    function fadeSlow(name)
    {
      name.css('visibility','visible').hide().fadeIn("slow");
    }
  }

  // Used to hide the stations container when trips are displayed
  function toggleStations()
  {
    var primary = $('#station-container');
    if(primary.is(':visible'))
    {
      primary.fadeOut();
    } else if(primary.is(':hidden')){
      primary.fadeIn();
    }
  }

  // Schedule
  function getSchedule()
  {
    if(departingFrom != null && arrivingAt != null)
    {
      var url    = 'core/core.php';
        
      $.post(url, {method: 'ajax_getSchedule', day: dayOfWk, start: departingFrom, stop: arrivingAt}, function(data){
        tripDetails  = data['details'][0];
        tripSchedule = data['schedule'];
        toggleStations();
        toggleSchedule();
      }, 'json');
    }
  }

  function toggleSchedule()
  {
    if($('#schedule-container').text() != '')
    {
      $('#schedule-container').text('');
    }

    var data = tripSchedule,
        count  = 0,
        rowNum = 0;

    if(!isEmpty(data)) {
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
          endRaw = data[key]['end-raw'];

      function appendItems(data, row)
      {
        $(`<div class="col-6-12">
            <div class="row reset">
              <div class="col-3-12 reset">
                <div class="module">
                  <span><small>Departing</small><span> <br/>
                  <span>` + data[key]['start'] + `<span>
                </div>
              </div>
              <div class="col-3-12 reset">
                <div class="module">
                  <span><small>Arriving</small><span> <br/>
                  <span>` + data[key]['end'] + `<span>
                </div>
              </div>
              <div class="col-3-12 reset">
                <div class="module">
                  <span><small>Duration</small><span> <br/>
                  <span>` + data[key]['duration'] + ` Min<span>
                </div>
              </div>
              <div class="col-3-12 reset">
                <div class="module">
                  <span><small>Departing In</small><span> <br/>
                  <span>` + timeRemaining(data[key]['start-raw']) + `<span>
                </div>
              </div>
            </div>
          </div>`).appendTo('#row-schedule-' + row);
      }
    } else {
      $('#schedule-container').text('Sorry! Unfortunately there are not any trains that connect those two stations.');
    }
  }
  
  // ---------
  // Utilities
  // ---------
  function isOnline()
  {
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

  function toggleBtn(btn, className)
  {
    if(btn.hasClass(className))
    {
      btn.removeClass(className);
    } else {
      btn.addClass(className);
    }
  }

  // Time
  function timeRemaining(time)
  {
    var now = splitTime(currentTime),
        next = splitTime(time),
        diff = {hours: null,
                minutes: null};
        
    if(now.hours < next.hours) {
      diff.hours = next.hours-now.hours;
    }

    if(now.minutes < next.minutes){
      diff.minutes = next.minutes-now.minutes;
    } else if(now.minutes >= next.minutes){
      diff.minutes = 60 - (now.minutes-next.minutes);
      diff.hours = diff.hours - 1;
    }

    return diff.hours + 'h ' + diff.minutes + 'm';
  }

  function splitTime(time) {
    var timeSplit = time.split(/:/);
    
    return {
      hours: parseInt(timeSplit[0]), 
      minutes: parseInt(timeSplit[1])
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

  // Days
  function getToday()
  {
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
  // TODO: FIX THIS MESS
  function setDay(userDay)
  {
    var btn = {saturday: '#btn-wk-sat', sunday: '#btn-wk-sun', weekday: '#btn-wk-day'};

    switch('#' + userDay.attr('id')) {
      case btn.saturday:
        dayOfWk = 'saturday';
        if($(btn.saturday).hasClass('hollow')) {
          toggleBtn($(btn.saturday), 'hollow');
          if(!$(btn.sunday).hasClass('hollow'))
          {
            toggleBtn($(btn.sunday), 'hollow');
          }
          if(!$(btn.weekday).hasClass('hollow'))
          {
            toggleBtn($(btn.weekday), 'hollow');
          }
        }
        break;
      case btn.sunday:
        dayOfWk = 'sunday';
        if($(btn.sunday).hasClass('hollow')) {
          toggleBtn($(btn.sunday), 'hollow');
          if(!$(btn.saturday).hasClass('hollow'))
          {
            toggleBtn($(btn.saturday), 'hollow');
          }
          if(!$(btn.weekday).hasClass('hollow'))
          {
            toggleBtn($(btn.weekday), 'hollow');
          }
        }
        break;
      case btn.weekday:
        dayOfWk = 'weekday';
        if($(btn.weekday).hasClass('hollow')) {
          toggleBtn($(btn.weekday), 'hollow');
          if(!$(btn.sunday).hasClass('hollow'))
          {
            toggleBtn($(btn.sunday), 'hollow');
          }
          if(!$(btn.saturday).hasClass('hollow'))
          {
            toggleBtn($(btn.saturday), 'hollow');
          }
        }
        break;
    }
  }


  // --------------
  // Online Methods
  // --------------
  if(isOnline())
  {
    // Online Stuff
    //console.log('Online');
  } 

  // --------------
  // Offline Method
  // --------------
  if(!isOnline())
  {
    // Offline Stuff
    //console.log('Offline');
  }
});
