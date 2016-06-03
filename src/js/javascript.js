$(document).ready(function(){
    collapseData();
    
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