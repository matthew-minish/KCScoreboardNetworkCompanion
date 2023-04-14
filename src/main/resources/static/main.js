var blueBoysPoints = 0;
var greenBoysPoints = 0;
var orangeBoysPoints = 0;
var redBoysPoints = 0;
var yellowBoysPoints = 0;
var blueGirlsPoints = 0;
var greenGirlsPoints = 0;
var orangeGirlsPoints = 0;
var redGirlsPoints = 0;
var yellowGirlsPoints = 0;

function blueBoysPointsChange(val) { blueBoysPoints += val; refreshPoints(); }
function greenBoysPointsChange(val) { greenBoysPoints += val; refreshPoints(); }
function orangeBoysPointsChange(val) { orangeBoysPoints += val; refreshPoints(); }
function redBoysPointsChange(val) { redBoysPoints += val; refreshPoints(); }
function yellowBoysPointsChange(val) { yellowBoysPoints += val; refreshPoints(); }
function blueGirlsPointsChange(val) { blueGirlsPoints += val; refreshPoints(); }
function greenGirlsPointsChange(val) { greenGirlsPoints += val; refreshPoints(); }
function orangeGirlsPointsChange(val) { orangeGirlsPoints += val; refreshPoints(); }
function redGirlsPointsChange(val) { redGirlsPoints += val; refreshPoints(); }
function yellowGirlsPointsChange(val) { yellowGirlsPoints += val; refreshPoints(); }

function allPointsChange(val) { 
    blueBoysPoints += val;
    greenBoysPoints += val;
    orangeBoysPoints += val;
    redBoysPoints += val;
    yellowBoysPoints += val;
    blueGirlsPoints += val;
    greenGirlsPoints += val;
    orangeGirlsPoints += val;
    redGirlsPoints += val;
    yellowGirlsPoints += val;
    refreshPoints(); 
}

function refreshPoints()
{
    document.getElementById('blueBoysLabel').innerText = blueBoysPoints;
    document.getElementById('greenBoysLabel').innerText = greenBoysPoints;
    document.getElementById('orangeBoysLabel').innerText = orangeBoysPoints;
    document.getElementById('redBoysLabel').innerText = redBoysPoints;
    document.getElementById('yellowBoysLabel').innerText = yellowBoysPoints;
    document.getElementById('blueGirlsLabel').innerText = blueGirlsPoints;
    document.getElementById('greenGirlsLabel').innerText = greenGirlsPoints;
    document.getElementById('orangeGirlsLabel').innerText = orangeGirlsPoints;
    document.getElementById('redGirlsLabel').innerText = redGirlsPoints;
    document.getElementById('yellowGirlsLabel').innerText = yellowGirlsPoints;

    localStorage.setItem('blueBoysPoints', blueBoysPoints);
    localStorage.setItem('greenBoysPoints', greenBoysPoints);
    localStorage.setItem('orangeBoysPoints', orangeBoysPoints);
    localStorage.setItem('redBoysPoints', redBoysPoints);
    localStorage.setItem('yellowBoysPoints', yellowBoysPoints);
    localStorage.setItem('blueGirlsPoints', blueGirlsPoints);
    localStorage.setItem('greenGirlsPoints', greenGirlsPoints);
    localStorage.setItem('orangeGirlsPoints', orangeGirlsPoints);
    localStorage.setItem('redGirlsPoints', redGirlsPoints);
    localStorage.setItem('yellowGirlsPoints', yellowGirlsPoints);
}

function collectChanges()
{
    return {
        "Blue Boys": blueBoysPoints,
        "Green Boys": greenBoysPoints,
        "Orange Boys": orangeBoysPoints,
        "Red Boys": redBoysPoints,
        "Yellow Boys": yellowBoysPoints,
        "Blue Girls": blueGirlsPoints,
        "Green Girls": greenGirlsPoints,
        "Orange Girls": orangeGirlsPoints,
        "Red Girls": redGirlsPoints,
        "Yellow Girls": yellowGirlsPoints,
    }
}

function changePoints()
{
    fetch("/changepointsprotected", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({  
          "password": document.getElementById("password-input").value,
          "pointChanges": collectChanges()
      })
    }).then(res => {
        res.text().then(value => {
            document.getElementById("submit-message").innerText = value;
        });
        localStorage.setItem("password", document.getElementById("password-input").value)
        if (res.status == 200){
            blueBoysPoints = 0;
            greenBoysPoints = 0;
            orangeBoysPoints = 0;
            redBoysPoints = 0;
            yellowBoysPoints = 0;
            blueGirlsPoints = 0;
            greenGirlsPoints = 0;
            orangeGirlsPoints = 0;
            redGirlsPoints = 0;
            yellowGirlsPoints = 0;
            refreshPoints();
        }
    });
    
}

window.onload =  function() {
    let storedPassword = localStorage.getItem("password");
    if(storedPassword) {
        console.log("Previous password found, auto-filling...")
        document.getElementById("password-input").value = storedPassword;
    }
    blueBoysPoints = parseInt(localStorage.getItem('blueBoysPoints') ?? '0') ?? 0;
    greenBoysPoints = parseInt(localStorage.getItem('greenBoysPoints') ?? '0') ?? 0;
    orangeBoysPoints = parseInt(localStorage.getItem('orangeBoysPoints') ?? '0') ?? 0;
    redBoysPoints = parseInt(localStorage.getItem('redBoysPoints') ?? '0') ?? 0;
    yellowBoysPoints = parseInt(localStorage.getItem('yellowBoysPoints') ?? '0') ?? 0;
    blueGirlsPoints = parseInt(localStorage.getItem('blueGirlsPoints') ?? '0') ?? 0;
    greenGirlsPoints = parseInt(localStorage.getItem('greenGirlsPoints') ?? '0') ?? 0;
    orangeGirlsPoints = parseInt(localStorage.getItem('orangeGirlsPoints') ?? '0') ?? 0;
    redGirlsPoints = parseInt(localStorage.getItem('redGirlsPoints') ?? '0') ?? 0;
    yellowGirlsPoints = parseInt(localStorage.getItem('yellowGirlsPoints') ?? '0') ?? 0;
    refreshPoints();
}
