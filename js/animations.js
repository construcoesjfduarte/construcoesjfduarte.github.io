let status = {
    navbarSolid: false,
    scrollSpeed: 600
}

function scrollTo(position){
    $('html,body').animate({
        scrollTop: position
    }, status.scrollSpeed);
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
let portefolioLink = document.getElementById("portefolio-link");

homeLink.addEventListener('click', function(event){
    event.preventDefault();
    scrollTo(0);
});

aboutLink.addEventListener('click', function(event){
    event.preventDefault();
    scrollTo($("#sobre").offset().top);
});

portefolioLink.addEventListener('click', function(event){
    event.preventDefault();
    scrollTo($("#portefolio").offset().top);
});