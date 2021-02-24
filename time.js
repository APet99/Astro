displayTime = data => {
    let html = "";
    html += `<h4 style="color: lightgoldenrodyellow"> ${data}</h4>`;

    // display HTML
    $("#time").html(html);
};


setInterval(
    function getTime(){

        fetch('http://worldtimeapi.org/api/America/Los_Angeles')
            .then(response => response.json())
            .then( json => displayTime(json.datetime))
            .catch( e => displayError(e) );
    },1000);