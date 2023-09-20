let x = document.getElementById("x-input");
let y = document.getElementById("y-input");
let btn = document.getElementById("compare");
let ans = document.getElementById("answer");
let q2Ans = document.getElementById("q2-ans");
let q3Ans = document.getElementById("q3-ans");
let q4Ans = document.getElementById("q4-ans");
let q5Ans = document.getElementById("q5-ans");

function compare() {
    if (x.value > y.value) {
        ans.innerHTML = "x is greator";
    } else {
        ans.innerHTML = "y is greator";
    }
}

// question - 2

function question2() {
    let a = prompt("enter a ");
    let b = prompt("enter b ");
    let c = prompt("enter c ");

    ans = parseInt(a) + parseInt(b) + parseInt(c);

    ans < 0 ? q2Ans.innerHTML = "the sign is -" : q2Ans.innerHTML = "the sign is +"


}
// question - 3

function question3() {
    let arr = [-5, -2, -6, 0, -1]
    arr.sort((a, b) => a - b);
    q3Ans.innerHTML = arr[arr.length - 1]

}question3()

// question - 4

function question4() {

    for (let index = 0; index < 15; index++) {

        let newElement = document.createElement("p");

        if (index % 2 == 0)
            newElement.innerHTML = index + " is even"
        else
            newElement.innerHTML = index + " is odd"
        q4Ans.appendChild(newElement);

    }

}question4()

// question - 5

function question5() {
    for (let index = 0; index < 6; index++) {
        for (let j = 0; j < index; j++) {
            document.write("*")
        }
        document.write("<br>")
    }
}question5()