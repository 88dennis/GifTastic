// create an array of strings named topics; will use animals

// app should take the topics in this array and create a buttons in the HTML
//take topics
//pass topics into array
//the array should be a button

//* Try using a loop that appends a button for each string in the array.

//When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

//get 10 static, non animated images from the giphy API
//When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
// onclick
// make a switch images

//buttons will go this array
var myGifs = ["Joker", "Blackbeard", "Magneto", "Thanos", "Frieza", "Android 18", "Dark Phoenix", "Cat Woman", "Poison Ivy", "Harley Quinn"];


function myGifInfo(event) {

    $('#giphy-container').html(' ');
    
    var villain = $(this).attr("data-name");// will use this for the search on API
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + villain + "&limit=9&api_key=lwyXR0cQ0Oqg4vaafNHcFmYbJqF2E20u";

    //get the API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response); //to check the content of the response at console log
        var results = response.data;//use this var for getting the response using the for loop

        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var vilDiv = $("<div>"); //just making a div for the villain img
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                
                var villainImg = $("<img>");
                villainImg.attr("data-still", results[i].images.fixed_height_still.url);
                villainImg.attr("data-state", "still");
                villainImg.attr("data-animate", results[i].images.fixed_height.url);
                
                villainImg.attr("src", results[i].images.fixed_height.url);
                vilDiv.append(p);
                vilDiv.append(villainImg);
                $("#giphy-container").prepend(vilDiv);

                villainImg.on("click", function() {
                    // The attr is to get or set the value of any attribute on our HTML element
                      var state = $(this).attr("data-state");
                      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                      // Then, set the image's data-state to animate
                      // Else set src to the data-still value
                      if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                      } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                      }
                });
            }
        }
    }, function (e) {
        alert(JSON.stringify(e));
    });
}
//function to display the buttons
function displayButtons() {
    $("#buttons-container").empty();

    for (var i = 0; i < myGifs.length; i++) {
        var gifButton = $("<button>");
        gifButton.addClass("myGif btn btn-dark");
        gifButton.attr("data-name", myGifs[i]);
        gifButton.text(myGifs[i]);
        gifButton.css("background-color", makeRandomColor())
        $("#buttons-container").append(gifButton);
    }
}

function makeRandomColor() {
    return "rgb(" + Math.random()*125 + 
    ", "+ Math.random()*125  + 
    " , "+ Math.random()*125 +")"
}

$("#add-gifs").on("click", function(event){
    event.preventDefault();
    var villain = $("#gif-input").val().trim();

    if (villain !== "") {
        myGifs.unshift(villain);
    }
    
    displayButtons();
});

$(document).on("click", ".myGif", myGifInfo);

displayButtons();
