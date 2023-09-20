let y = document.getElementById("inp-2")
let x = document.getElementById("inp-1")
let ans = document.getElementById("ans")



function addition() {
    parseInt(y.value)
    parseInt(x.value)
    if (x.value === "" || y.value === "") {
        alert("please fill the input fileds")
    } else {
        ans.innerHTML = parseInt(y.value) + parseInt(x.value);
    }
}

function subtraction() {
    parseInt(y.value)
    parseInt(x.value)
    if (x.value === "" || y.value === "") {
        alert("please fill the input fileds")
    } else {
        ans.innerHTML = parseInt(x.value) - parseInt(y.value);
    }
}

function multiplication() {
    parseInt(y.value)
    parseInt(x.value)
    if (x.value === "" || y.value === "") {
        alert("please fill the input fileds")
    } else {
        ans.innerHTML = parseInt(y.value) * parseInt(x.value);
    }
}

function division() {
    parseInt(y.value)
    parseInt(x.value)
    if (x.value === "" || y.value === "") {
        {
            alert("please fill the input fileds")
        }
    } else if (parseInt(y.value) == 0) { 
        alert("you can not divide with 0")
    } 
    else {
        ans.innerHTML = parseInt(y.value) / parseInt(x.value);
    }
}