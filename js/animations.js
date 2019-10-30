let status = {
    navbarSolid: false,
    homeTop: 0,
    aboutTop: $("#sobre").offset().top
}

function scrollTo(position){
    var speed = 600;
    $('html,body').animate({
        scrollTop: position
    }, speed);
}

document.getElementById("navbar-toggler").addEventListener('click', function(event){
    this.getElementsByClassName("icon")[0].classList.toggle("close");
    document.getElementById("navbar").classList.toggle("open");
})

window.addEventListener('scroll', function(_event){

    let navbarHeight = document.getElementById("navbar").offsetHeight;
    
    if(this.scrollY < this.innerHeight - navbarHeight && status.navbarSolid){
        document.getElementById("navbar").classList.toggle("solid");
        status.navbarSolid = false;
    }
    else if(this.scrollY >= this.innerHeight - navbarHeight && !status.navbarSolid){
        document.getElementById("navbar").classList.toggle("solid");
        status.navbarSolid = true;
    }
});

let homeLink = document.getElementById("home-link");
let aboutLink = document.getElementById("about-link");

homeLink.addEventListener('click', function(event){
    event.preventDefault();
    scrollTo(status.homeTop);
});

aboutLink.addEventListener('click', function(event){
    event.preventDefault();
    scrollTo(status.aboutTop);
});