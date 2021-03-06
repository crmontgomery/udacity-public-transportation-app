$(document).ready(function(){
  var departingFrom = null,
      arrivingAt    = null,
      dayOfWek      = null,
      stationList = [];

  getStations();
  getToday();

  // -----------------
  // Universal Methods
  // -----------------
  $('#btn-depart').on('click', function(){
  });

  $('#btn-arrive').on('click', function(){
  });

  $('#btn-wk-day, #btn-wk-sat, #btn-wk-sun').on('click', function(){
    toggleBtn($(this), 'hollow');
  });

  $('#primary-container').on('click', '.btn-station', function(){
    var stopId = $(this).attr('id');
    toggleBtn($(this), 'active');
    setDepartLocation(stopId);

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

  function setDepartLocation(stopId)
  {

  }

  function getToday()
  {
    //http://stackoverflow.com/questions/1181219/determine-if-a-date-is-a-saturday-or-a-sunday-using-javascript by andrew moore
    var today = new Date();
    if(today.getDay() == 6){
      var btnSat = $('#btn-wk-sat');
      toggleBtn(btnSat, 'hollow');
    } else if (today.getDay() == 0) {
      var btnSat = $('#btn-wk-sun');
      toggleBtn(btnSat, 'hollow');
    } else if(today.getDay() >= 1 || today.getDay() <= 5) {
      var btnSat = $('#btn-wk-day');
      toggleBtn(btnSat, 'hollow');
    }
  }

  setToday();

  // User Override
  function setToday()
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

  // var build = (function(){

  //   function createJsonFromTxt()
  //   {
  //     getData('buildJson');
  //   }

  //   function getStations()
  //   {
  //     getData('getStations');
  //   }

  //   function displayStations(data)
  //   {
  //     console.log(data);
  //   }

  //   return {
  //     createJson: createJsonFromTxt,
  //     getStations: getStations,
  //     displayStations: displayStations
  //   };
  // })();

  // var view = (function(){

  //   function viewStations()
  //   {
  //     $.getJSON('data/json/stops.json', function(data) {
  //       for (var key in data) {
  //         appendItems(data[key]['stop_id'] + ': ' + data[key]['stop_name']);
  //       }
  //     });
  //   }

  //   function appendItems(data)
  //   {
  //     var ul = document.getElementById("list");
  //     var li = document.createElement("li");
  //     li.appendChild(document.createTextNode(data));
  //     ul.appendChild(li);
  //   }

  //   return {
  //     stations: viewStations
  //   };
  // })();
  
  // // build.createJson();
  // // view.stations();
  
  // //build.getStations();

  // /**
  //  * Queries the server for specific data
  //  * @param {String} action 
  //  * @param {String} variable
  //  * @return {Object} JSON
  //  */
  // function getData(action, variable)
  // {
  //   var url = 'core/ajax.php',
  //     file = variable || null;

  //     var theData = null;

  //   $.post(url, {method: action, filename: file}, function(data){
  //   }).success(function(data){

  //     switch(action) {
  //       case 'getStations':
  //            build.displayStations(data);
  //            break;
  //       case 'buildJson':
  //            build.displayStations(data);
  //            break;
  //       default:
  //            console.log('default');
  //     }
      
  //   }).fail(function(e){
  //     console.log(e);
  //   }, 'json');
  // }

  // function isOnline()
  // {
  //   return navigator.onLine ? true : false; 
  // }
});


// function getStations()
//   {
//     // TODO: Change to have DATA dropped in rather than obtained from
//     var url    = 'core/core.php',
//         count  = 0,
//         rowNum = 0;

//     $.post(url, {method: 'ajax_getStations'}, function(data){
//       stationList = data;
//       for (var key in data) {
        
//         if((count % 3) == 0 || count == 0)
//         {
//           rowNum++;
//           $('<div class="row" id="row-' + rowNum +'"></div>').appendTo('#primary-container');
//         }
//         appendItems(data[key]['stop_name'], rowNum);
//         count++;
//       }

//       function appendItems(data, row)
//       {
//         $('<div class="col-4-12 station"><button class="btn-station" >' + data + '</button></div>').appendTo('#row-' + row);
//       }

//       showStations();

//     }, 'json');
    
//   }
