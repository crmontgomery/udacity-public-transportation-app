$(document).ready(function(){
  var departingFrom = null,
      arrivingAt    = null,
      dayOfWk       = null,
      currentTime   = null,
      stationList   = [],
      tripDetails   = [],
      tripSchedule  = [];

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
    arrivingAt = null;
  });

  $('#btn-wk-day, #btn-wk-sat, #btn-wk-sun').on('click', function(){
    setDay($(this));
    getSchedule();
  });

  $('#primary-container').on('click', '.btn-station', function(){
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

  function isOnline()
  {
    return navigator.onLine ? true : false; 
  }

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
        $('<div class="col-4-12 station"><button class="btn-station" id="' + data[key]['stop_id'] + '">' + data[key]['stop_name'] + '</button></div>').appendTo('#row-' + row);
      }

      showStations();

    }, 'json');
    
  }

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
                <span><small>Departing at</small><span> <br/>
                <span>` + data[key]['start'] + `<span>
              </div>
            </div>
            <div class="col-3-12 reset">
              <div class="module">
                <span><small>Arriving at</small><span> <br/>
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
                <span>` + (Date.parse('01/01/2011 ' + currentTime.h + ':' + currentTime.m + ':' + currentTime.s) - Date.parse('01/01/2011 ' + data[key]['start-raw'])) + `<span>
              </div>
            </div>
          </div>
        </div>`).appendTo('#row-schedule-' + row);
    }
  }

  function timeToSeconds(time) {
    time = time.split(/:/);
    time[0] * 3600 + time[1] * 60 + time[2];
  }

  function toMin(sec)
  {
    return sec;
  }

  function showStations()
  {
    $stations = $('.station');
    var time = 100;

    $stations.each(function() {
      var name = $(this);
      setTimeout(test, time, name);
      time += (150);
    });

    //http://stackoverflow.com/questions/10942098/simple-fadein-and-visibility-in-jquery by softwaretech
    function test(name)
    {
      name.css('visibility','visible').hide().fadeIn("slow");
    }
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
    console.log('Online');
  } 

  // --------------
  // Offline Method
  // --------------
  if(!isOnline())
  {
    // Offline Stuff
    console.log('Offline');
  }

  

  // http://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    // document.getElementById('time').innerHTML =
    // h + ":" + m + ":" + s;
    currentTime = h + ":" + m + ":" + s;
    console.log(currentTime);
    var t = setTimeout(startTime, 1000);
    
    

  }
  function checkTime(i) {
      if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
      return i;
  }

});
