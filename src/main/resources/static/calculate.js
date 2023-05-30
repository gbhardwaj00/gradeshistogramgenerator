var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03, 49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

var gradeBounds = document.getElementsByClassName("gradeBound");
var bars = document.getElementsByClassName("length");
var addGrade = document.getElementById("addGrade");
var histogram = document.getElementById("histogram");

//delete this later
var bars2 = document.getElementsByClassName("bar");

function adjusHistogram() {
    for(index in bars){
        bars[index].innerHTML = "";
    }
    for (index in grades) {
        var currentGrade = grades[index];
        var higherThan = 0;
        while(currentGrade < parseFloat(gradeBounds[higherThan].value) && higherThan < gradeBounds.length - 1){
            higherThan++;
        }
        if(higherThan === 0) {
            bars[0].innerHTML += 'O';
            continue;
        }
        else {
            bars[higherThan - 1].innerHTML += 'O';
        }
    }
};

function deleteOldvalues() {
    for(var index = 0; index < gradeBounds.length; index++) {
        gradeBounds[index].oldValue = NaN;
    }
}

function boundChanged(input) {
    gradeBounds = document.getElementsByClassName("gradeBound");
    if(input.value == "") {
        alert("Bounds must be in descending order, please enter a valid bound value");
        input.value = input.oldValue;
        deleteOldvalues();
        input.blur();
        return;
    }
    var i = 0;
    while(parseFloat(gradeBounds[i].value) != input.value && i < gradeBounds.length - 1){
            i++;
    }
    console.log(i);
    if(isNaN(parseFloat(gradeBounds[i].oldValue))) {
        i++;
        while(parseFloat(gradeBounds[i].value) != input.value && i < gradeBounds.length - 1){
            i++;
        }
    }
    console.log(i);
    if(i < gradeBounds.length - 1) {
        if(parseFloat(gradeBounds[i].value) <= parseFloat(gradeBounds[i + 1].value)){
            console.log("Loop 1");
            alert("Bounds must be in descending order, please enter a valid bound value");
            gradeBounds[i].value = input.oldValue;
        }
    }
    if(i > 0) {
        if(parseFloat(gradeBounds[i].value) >= parseFloat(gradeBounds[i - 1].value)){
            console.log("Loop 2");
            alert("Bounds must be in descending order, please enter a valid bound value");
            gradeBounds[i].value = input.oldValue;
        }
    }
    deleteOldvalues();
    gradeBounds[i].blur()
    adjusHistogram();
}

adjusHistogram();


addGrade.addEventListener("keyup", (e) => {
    if(e.key == "Enter") {
        if(parseFloat(addGrade.value) > parseFloat(gradeBounds[0].value) || parseFloat(addGrade.value) < parseFloat(gradeBounds[gradeBounds.length - 1].value)){
            alert("New grade is out of bounds");
            addGrade.value = "";
            return;
        }
        else {
            grades.push(parseFloat(addGrade.value));
            adjusHistogram();
        }
    }
});
