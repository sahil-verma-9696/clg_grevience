let x = document.getElementById("x-input");
let y = document.getElementById("y-input");
let btn = document.getElementById("compare");
let ans = document.getElementById("answer");
let q2Ans = document.getElementById("q2-ans");

function compare(){
    if(x.value > y.value){
        ans.innerHTML = "x is greator";
    }else{
        ans.innerHTML = "y is greator";
    }
}

// question - 2

function question2() {
    let a = prompt("enter a ");
    let b = prompt("enter b ");
    let c = prompt("enter c ");

    ans = parseInt(a)+parseInt(b)+parseInt(c);
 
    ans < 0 ? q2Ans.innerHTML = "the sign is -":q2Ans.innerHTML = "the sign is +"


}