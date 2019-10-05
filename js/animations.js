let status = {
    active: "home-link"
}

function scrollTo(position){
    var speed = 600;
    
    $('html,body').animate({
        scrollTop: position
    }, speed);
}

let homeLink = document.getElementById("home-link");
homeLink.addEventListener('click', function(event){
    scrollTo(0);
});

homeLink.click();

let aboutLink = document.getElementById("about-link");
aboutLink.addEventListener('click', function(event){
    let top = $("#about-div").offset().top - 110;
    scrollTo(top);
});

