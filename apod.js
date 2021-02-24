//return date string in YYYY-MM-DD format
const getDateString = date => 
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;



const displayPicture = data => {
    let html = "";
    if(data.error) {      // error - display message
        html += `<span class="error">${data.error.message}/span>`;
    }
    else if (data.code) {  // problem - display message
        html += `<span class="error">${data.msg}</span`;
    }
    else {                  // sucesss display image/video data
        html += `<h3>${data.title}</h3>`;
        const width = 700;
        switch (data.media_type) {
            case "image":
                html += `<img class="card-img-top" src="${data.url}" width=${width} alt="NASA photo.jpg">`;
                break;
            case "video":
                html += `<iframe class="card-img-top" src=${data.url} frameborder="0" allowfullscreen></iframe>`;
                break;
            default:
                html += `<img class="card-img-top" src="images/notavailable.png" width="$(width)" alt="NASA photo.jpg">`;
    }

    // date and copyright
    html += `<div>${data.date}`;
    if (data.copyright) {
        html += `<span class="right card-subtitle">&copy; ${data.copyright}</span>`;
    }
    html += "</div>";

    // explanation
    html += `<p class="card-text">${data.explanation}</p>`;

  }

  // display HTML
  $("#display").html(html);

};


const displayError = error => {
    let html = `<span class="error">${error.message}</span>`;
    $("#display").html(html);
};


$(document).ready( () => {
    const today = new Date();
    let dateStr = getDateString(today);

    const dateTextbox = $("#date");
    dateTextbox.val(dateStr);

    const dateRoverTextbox = $("#dateRover");
    dateRoverTextbox.val(dateStr);

    dateTextbox.focus();

    $("#view_button").click( () => {
        dateStr = $("#date").val();
        const dateObj = new Date(dateStr);

        if(dateObj == "Invalid Date") {
            const msg = "Please enter valid date in YYYY-MM-DD format."
            $("#display").html(`<span class="error">${msg}</span>`);
        }
        else {
            dateStr = getDateString(dateObj);

            // build URL for API request
            const domain = `https://api.nasa.gov/planetary/apod`;
            const request = `?api_key=GHCC4shai8NP23f0OzVuRfmST5Uzjts6CO9qrs2M&date=${dateStr}`;
            const url = domain + request;

            fetch(url)
                .then(response => response.json())
                .then( json => displayPicture(json))
                .catch( e => displayError(e) );
        }
        $("#date").focus();
    });
});
// CBU Lat:33.928258
// CBU Lon: -117.425327
//(33.928258, -117.425327)
//key GHCC4shai8NP23f0OzVuRfmST5Uzjts6CO9qrs2M