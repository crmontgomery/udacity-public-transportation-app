$(document).ready(function(){
    //collapseData();
    
    
    function isOnline()
    {
        return navigator.onLine ? true : false; 
    }

    //isOnline() ? console.log('Online') : console.log('Offline');

    var buildOfflineFiles = (function(){

        function createJsonFromTxt()
        {
            postGet('ajaxGetDataFromFile');
        }

        function getFileList()
        {
            postGet('ajaxGetDataFromFile', 'agency.txt');
        }

        return {
            getFileList: getFileList
        };
    })();

    buildOfflineFiles.getFileList();

    function postGet(action, variable)
    {
        var url = 'core/ajax.php',
            file = variable || null;
        $.post(url, {method: action, filename: file}, function(data){
            console.log('Processed: ' + action);
        }).success(function(data){
            console.log(data);
            return data;
        }).fail(function(e){
            console.log(e);
            return e;
        });
    }


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

