let status = {
    navbarSolid: false,
    scrollSpeed: 600,
    lastScroll: 0,
    animation: false
}

let counter = 0;
/**
 * Create scroll animation to the given position-y
 * @param {Number} position position-y to scroll to
 */
function scrollTo(position){

    status.animation = true;

    $('html,body').animate({
        scrollTop: position
    }, status.scrollSpeed, function(){
        status.animation = false;
        document.body.classList.toggle("not-ready");
    });
}

/**
 * Navbar toggler event listener. Changes the display of the toggler and open/closes 
 * the navbar 
 */
document.getElementById("navbar-toggler").addEventListener('click', function(_event){
    this.getElementsByClassName("icon")[0].classList.toggle("close");
    document.getElementById("navbar").classList.toggle("open");
})

/**
 * Window event listener. Changes the navbar opacity scrolling down
 */
window.addEventListener('scroll', function(_event){

    let navbarHeight = document.getElementById("navbar").offsetHeight;
    
    if(this.scrollY < this.innerHeight * 2 - navbarHeight && status.navbarSolid){
        document.getElementById("navbar").classList.toggle("solid");
        status.navbarSolid = false;
    }
    else if(this.scrollY >= this.innerHeight * 2 - navbarHeight && !status.navbarSolid){
        document.getElementById("navbar").classList.toggle("solid");
        status.navbarSolid = true;
    }

    let top = this.innerHeight - this.scrollY;
    top = (top <= 0) ? top : 0;
    document.getElementById("home").style.top = top + "px";
    document.getElementById("home-front").style.top = top + "px";

    let percentage = (this.scrollY - this.innerHeight)  / ( this.innerHeight * 2);
    percentage = (percentage > 1) ? 1 : (percentage < 0) ? 0 : percentage * 2.2;
    document.getElementById("home-front").style.opacity = 1 - percentage;
    document.getElementById("home").style.opacity = 1 - percentage;

    if(!status.animation){
        const delta = this.scrollY - status.lastScroll;
        
        const minScrollZone = this.innerHeight * 0.5;
        const maxScrollZone = this.innerHeight * 1.5;

        if(this.scrollY >= minScrollZone && this.scrollY < maxScrollZone){
            if(delta > 0) {
                scrollTo($("#sobre").offset().top);
                // this.console.log("%c Scroll down", "color: green;")
            }
            else if(delta < 0) {
                scrollTo(0);
                // this.console.log("%c Scroll up", "color: red;")
            }

        }
    }

    status.lastScroll = this.scrollY;

});

/**
 * Brand link event listener. Scroll to homePage on click (with animation)
 */
document.getElementById("brand-link").addEventListener('click', function(event){
    event.preventDefault();
    scrollTo(0);
});

/**
 * Home link event listener. Scroll to homePage on click (with animation)
 */
document.getElementById("home-link").addEventListener('click', function(event){
    event.preventDefault();
    scrollTo(0);
});

/**
 * About link event listener. Scroll to aboutPage on click (with animation)
 */
document.getElementById("about-link").addEventListener('click', function(event){
    event.preventDefault();
    scrollTo($("#sobre").offset().top);
});

/**
 * Portfolio link event listener. Scroll to portefolioPage on click (with animation)
 */
document.getElementById("portfolio-link").addEventListener('click', function(event){
    event.preventDefault();
    scrollTo($("#portefolio").offset().top);
});

/**
 * Portfolio link event listener. Scroll to portefolioPage on click (with animation)
 */
document.getElementById("contacts-link").addEventListener('click', function(event){
    event.preventDefault();
    scrollTo($("#contactos").offset().top + 5);
});