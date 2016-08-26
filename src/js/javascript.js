$(document).ready(function(){
  var departingFrom = null,
      arrivingAt    = null,
      dayOfWk       = null,
      stationList = [];

  getStations();
  getToday();

  // -----------------
  // Universal Methods
  // -----------------
  $('#btn-depart').on('click', function(){
    departingFrom = null;
    toggleStations();
  });

  $('#btn-arrive').on('click', function(){
    arrivingAt = null;
  });

  $('#btn-wk-day, #btn-wk-sat, #btn-wk-sun').on('click', function(){
    toggleBtn($(this), 'hollow');
  });

  $('#primary-container').on('click', '.btn-station', function(){
    var stopId = $(this).attr('id');
    toggleBtn($(this), 'active');
    if(departingFrom == null && arrivingAt == null){
      setDepartLocation(stopId);
    } else if(departingFrom != null && arrivingAt == null){
      setArrivalLocation(stopId);
      toggleStations();
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
          $('<div class="row" id="row-' + rowNum +'"></div>').appendTo('#primary-container');
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
    var primary = $('#primary-container');
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
    $('#btn-depart').text(stopId);
  }

  function setArrivalLocation(stopId)
  {
    departingFrom = stopId;
    $('#btn-arrive').text(stopId);
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

  setToday();

  // User Override
  function setToday(userDay)
  {
    var btn = ['#btn-wk-sat', '#btn-wk-sun', '#btn-wk-day'];
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

});
