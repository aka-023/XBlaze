$(document).ready(function(){
    $('.clothes-slider').slick({
        autoplay:true,
        slidesToShow:3,
        slidesToScroll:1,
        prevArrow:".prev-btn",
        nextArrow:".next-btn",
    });
});

//timer starts here
var dest= new Date("apr 31,2024 13:00:00").getTime();

var x = setInterval(function(){

var now= new Date().getTime();
var diff=dest - now;//in milli second
//now converting it into days,hrs,mins and second

var days = Math.floor(diff/(60*60*24*1000));

var hours = Math.floor((diff %(1000*60*60*24)) / (1000*60*60));

var minutes = Math.floor((diff % (1000*60*60)) / (1000*60));

var second = Math.floor((diff % (1000*60)) / 1000); 

document.getElementById("day").innerHTML = days; 
document.getElementById("hrs").innerHTML = hours;
document.getElementById("mins").innerHTML = minutes;
document.getElementById("sec").innerHTML = second;

}, 1000 );

function showPopup() {
    var popup = document.getElementById("productPopup");
    popup.style.display = "block";
}

function closePopup() {
    var popup = document.getElementById("productPopup");
    popup.style.display = "none";
}
function showToast() {
    var toast = document.getElementById("toast");
    toast.classList.remove("hidden");

setTimeout(function() {
    toast.classList.add("hidden");
    }, 3000); // 3000 milliseconds = 3 seconds, adjust as needed
}