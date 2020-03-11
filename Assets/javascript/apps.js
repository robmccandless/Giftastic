//api key AkcId49tl4eCGTpCo20nE4R9RvbT2g4u
//create 10 animal buttons
//make each button show ten gifs of the animal listed on the button when clicked
//make button static or still until clicked on, which will then animate.
//clicking on the button will then revert back to still or a static image.
//create variable called topics
//create buttons in html
//under every gif dispaly its rating
//add button for user to add topic to array

// Initial array of animals
var animalsArray = ["dog", "cat", "skunk", "rabbit", "monkey", "bear", "deer", "bird", "snake", "camel"];
// displayAnimalInfo function re-renders the HTML to display the appropriate content


function displayAnimalInfo() {
    console.log(this)

    //   var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=AkcId49tl4eCGTpCo20nE4R9RvbT2g4u&limit=5");
    //   xhr.done(function(data) {
    //      console.log("success got data", data);
    //  });

    // Creates AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        for (var i = 0; i < response.data.length; i++) {

            // Creates a div to hold the animal pic
            var elem = response.data[i]

            var animalDiv = $("<div>");
            // Retrieves the Rating Data
            var rating = elem.rating;
            // Creates an element to have the rating displayed
            var ratingDiv = $("<div>").text(rating);
            // Displays the rating
            animalDiv.append(ratingDiv);

            // Creates an element to hold the image
            var imageA = $("<img>").attr("src", elem.images.downsized_still.url);
            imageA.attr("srcAlt", elem.images.downsized.url)
            imageA.addClass("imgGif")
                // Appends the image
            animalDiv.append(imageA);
            // Puts the new animal above the previous animal.
            $("#animal-view").prepend(animalDiv)
        }
    });
}
// Function for displaying animal data
function renderButtons() {

    // Deletes the animal prior to adding new animal
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of animals
    for (var i = 0; i < animalsArray.length; i++) {
        // Then dynamicaly generates buttons for each animal in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of animal to our button
        a.addClass("animal");
        // Added a data-attribute
        a.attr("data-name", animalsArray[i]);
        // Provided the initial button text
        a.text(animalsArray[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

function switchImg() {
    console.log(this)
    var src = $(this).attr("src")
    var srcA = $(this).attr("srcalt")
    $(this).attr("src", srcA)
    $(this).attr("srcalt", src)
}
// This function handles events where the add animal button is clicked
$("#add-animal").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var animal = $("#animal-input").val().trim();
    // The animal from the textbox is then added to our array
    animalsArray.push(animal);
    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
});
// Adding click event listeners to all elements with a class of "animal"
$(document).on("click", ".animal", displayAnimalInfo);
// Calling the renderButtons function to display the intial buttons

$(document).on("click", ".imgGif", switchImg)
renderButtons();