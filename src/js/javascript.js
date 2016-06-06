$(document).ready(function(){
    collapseData();
    
    // Source: Steve, http://stackoverflow.com/questions/10931197/make-a-live-clock-with-existing-time-in-div-with-javascript
    setInterval(function(){
        document.getElementById("time").innerHTML = (new Date()).toLocaleTimeString();
    }, 1000);
    
    $('table tr:first-child').on('click', function(){
        toggleData($(this));
    });
    
    function toggleData(table)
    {
        $(table).parents('table').find('tr').not('tr:first-child, tr:nth-child(2)').toggle();
    }
    
    function collapseData()
    {
        $('table').find('tr').not('tr:first-child, tr:nth-child(2)').toggle();
    }
});