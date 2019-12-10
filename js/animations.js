let status = {
    navbarSolid: false,
    scrollSpeed: 600,
    counter: 0
}

/**
 * Create scroll animation to the given position-y
 * @param {Number} position position-y to scroll to
 */
function scrollTo(position){

    $('html,body').animate({
        scrollTop: position
    }, status.scrollSpeed);
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
    
    if(this.scrollY < this.innerHeight * 1.5 - navbarHeight && status.navbarSolid){
        document.getElementById("navbar").classList.toggle("solid");
        status.navbarSolid = false;
    }
    else if(this.scrollY >= this.innerHeight * 1.5   - navbarHeight && !status.navbarSolid){
        document.getElementById("navbar").classList.toggle("solid");
        status.navbarSolid = true;
    }
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