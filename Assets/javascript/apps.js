//make true/false buttons or multiple choice
//create timer 
//limit time to 10 seconds for each question
//Or 120 seconds for intire game
//create alert for number of questions correct
//limit button to only one selection
//create countdown timer

var questions = [{
        q: "18+9=27",
        a: "true"

    },
    {
        q: "11+9=21",
        a: "false"

    },
    {
        q: "30+3=33",
        a: "true"

    },
    {
        q: "5+5=11",
        a: "false"

    },
    {
        q: "2+2=4",
        a: "true"

    },
    {
        q: "60*10=120",
        a: "false"

    },

]
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var responses = {};
var countdown = questions.length * 3;
$("#timer").text(countdown)

//document.getElementById("timer").textContent = countdown

var timerID = setInterval(count, 1000)

function count() {
    countdown--
    $("#timer").text(countdown)

    if (countdown === 0) {
        alert("time out")
        clearInterval(timerID)
        showResults()
    }
}

function showQuestions() {

    for (var i = 0; i < questions.length; i++) {

        $("#quiz").append(`<h3>${questions[i].q}</h3>`)
        $("#quiz").append(`<button class="res" index=${i} value="true">True</button>`)
        $("#quiz").append(`<button class="res" index=${i} value="false">False</button>`)
    }

    //document.getElementsByClassName("res").addEventlistener("click", function(){})

    $(".res").on("click", function() {

        console.log(this)
        var index = $(this).attr("index")
        var res = $(this).attr("value")
        console.log(index, res)
        responses[index] = res


    })
}

$("#end").on("click", function() {
    console.log(responses)
    showResults()
})

function showResults() {
    $("#quiz").empty()
    $("#submit").empty()
    for (key in responses) {
        if (questions[key].a === responses[key]) {
            correct++
        } else {
            incorrect++
        }

    }
    unanswered = questions.length - correct - incorrect
    console.log(correct, incorrect, unanswered)
    $("#results").append(`<h2>Correct: ${correct}</h2>`)
    $("#results").append(`<h2>Incorrect: ${incorrect}</h2>`)
    $("#results").append(`<h2>No responded: ${unanswered}</h2>`)
}

// show the questions
showQuestions();