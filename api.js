$(document).ready(function() {
    $.ajax({
        url: "http://srgrintsys003.grintsys.com:8090/category/all"
    }).then(function(data) {

        for(var d in data)
        {
            console.log(d);
        }
       //$('.greeting-id').append(data.id);
       //$('.greeting-content').append(data.content);
    });
});