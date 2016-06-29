$(document).ready(function(){
  //isOnline() ? console.log('Online') : console.log('Offline');

  var build = (function(){

    function createJsonFromTxt()
    {
      getData('buildJson');
    }

    function getStations()
    {
      getData('getStations');
    }

    function displayStations(data)
    {
      console.log(data);
    }

    return {
      createJson: createJsonFromTxt,
      getStations: getStations,
      displayStations: displayStations
    };
  })();

  var view = (function(){

    function viewStations()
    {
      $.getJSON('data/json/stops.json', function(data) {
        for (var key in data) {
          appendItems(data[key]['stop_id'] + ': ' + data[key]['stop_name']);
        }
      });
    }

    function appendItems(data)
    {
      var ul = document.getElementById("list");
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(data));
      ul.appendChild(li);
    }


    return {
      stations: viewStations
    };
  })();

    view.stations();
    build.createJson();

  //build.getStations();

  /**
   * Queries the server for specific data
   * @param {String} action 
   * @param {String} variable
   * @return {Object} JSON
   */
  function getData(action, variable)
  {
    var url = 'core/ajax.php',
      file = variable || null;

      var theData = null;

    $.post(url, {method: action, filename: file}, function(data){
    }).success(function(data){

      switch(action) {
        case 'getStations':
             build.displayStations(data);
             break;
        case 'buildJson':
             build.displayStations(data);
             break;
        default:
             console.log('default');
      }
      
    }).fail(function(e){
      console.log(e);
    }, 'json');
  }

  function isOnline()
  {
    return navigator.onLine ? true : false; 
  }
});
