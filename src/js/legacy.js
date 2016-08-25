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