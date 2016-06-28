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

  // <div class="col-4-12 station' . $break . '" id="' . $key . '">
                
  //   <i class="material-icons">train</i>
  //   <span>'
  //   . $station .
  //   '</span>
  // </ul>   
  // </div>


  // // Source: Steve, http://stackoverflow.com/questions/10931197/make-a-live-clock-with-existing-time-in-div-with-javascript
  // setInterval(function(){
  //     document.getElementById("time").innerHTML = (new Date()).toLocaleTimeString();
  // }, 1000);
  
  // $('table tr:first-child').on('click', function(){
  //     toggleData($(this));
  // });
  
  // function toggleData(table)
  // {
  //     $(table).parents('table').find('tr').not('tr:first-child, tr:nth-child(2)').toggle();
  // }
  
  // function collapseData()
  // {
  //     $('table').find('tr').not('tr:first-child, tr:nth-child(2)').toggle();
  // }
});
