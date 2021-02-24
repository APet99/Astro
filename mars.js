//return date string in YYYY-MM-DD format
const getRoverDateString = date =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;



const displayRoverPicture = data => {
    let html = "";
    html += `<img class="card-img-top" src="${data.img_src}"  width="700" alt="NASA photo.jpg"> <br><br>`;

    // display HTML
    $("#displayRover").html(html);

    html += `<p class="card-subtitle">Rover: ${data.rover.name} </br>
            Earth Date: ${data.earth_date}</br>
            
            </p>`
    $("#displayRover").html(html);
};



$(document).ready( () => {
    const today = new Date();
    let dateStr = getRoverDateString(today);

    const dateRoverTextbox = $("#dateRover");
    dateRoverTextbox.val(dateStr);

    dateRoverTextbox.focus();

    $("#view_buttonRover").click( () => {
        dateStrRover = $("#dateRover").val();
        const dateObj = new Date(dateStrRover);

        if(dateObj == "Invalid Date") {
            const msg = "Please enter valid date in YYYY-MM-DD format."
            $("#displayRover").html(`<span class="error">${msg}</span>`);
        }
        else {
            dateStrRover = getRoverDateString(dateObj);
            console.log(dateStrRover)

            const roverDomain = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`;
            const roverRequest = `?earth_date=${dateStrRover}&camera=FHAZ&api_key=GHCC4shai8NP23f0OzVuRfmST5Uzjts6CO9qrs2M`;
            const roverUrl = roverDomain + roverRequest;

            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.addEventListener('load', function(e) {
                var responseBody = e.target.response.photos[0]; // only retrieves the first image if multiple are received.
                console.log(responseBody);
                var response = e.target.response.photos[0].img_src; // only retrieves the first image if multiple are received.

                displayRoverPicture(responseBody)
                // displayRoverPicture(response2)
            });
            xhr.addEventListener('error', function(e) {
                console.error('Request errored with status', e.target.status);
            });
            xhr.open('GET', roverUrl);
            xhr.send();

        }
        $("#dateRover").focus();
    });
});
// CBU Lat:33.928258
// CBU Lon: -117.425327
//(33.928258, -117.425327)
//key GHCC4shai8NP23f0OzVuRfmST5Uzjts6CO9qrs2M