$(document).ready(function(){
  //isOnline() ? console.log('Online') : console.log('Offline');

  var buildJSONFiles = (function(){

    function createJsonFromTxt()
    {
      getData('buildJson');
    }

    function getStations()
    {
      getData('getStations');
    }

    return {
      createJson: createJsonFromTxt,
      getStations: getStations
    };
  })();

  //buildJSONFiles.createJson();
  console.log(buildJSONFiles.getStations());

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

    $.post(url, {method: action, filename: file}, function(data){
    }).success(function(data){
      console.log(data);
      return data;
    }).fail(function(e){
      console.log(e);
      return e;
    });
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
