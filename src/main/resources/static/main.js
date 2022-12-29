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
