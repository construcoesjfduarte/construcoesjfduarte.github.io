let status = {
    animation: false,
    active: "erro323464",
    homeTop: 0,
    aboutTop: $("#about-div").offset().top - 110,
    portefolioTop: $("#portefolio-div").offset().top - 110,
    contactsTop: $("#contacts-div").offset().top - 110,

}

let homeLink = document.getElementById("home-link");
let aboutLink = document.getElementById("about-link");
let portefolioLink = document.getElementById("portefolio-link");
let contactsLink = document.getElementById("contacts-link");


function scrollTo(position){
    var speed = 600;
    status.animation = true;
    $('html,body').animate({
        scrollTop: position
    }, speed, function(){
        status.animation = false;
    });
}

function changeActive(id){

    if(document.getElementById(status.active)){
        document.getElementById(status.active).parentElement.classList.remove("active");
    }
    document.getElementById(id).parentElement.classList.add("active");
    status.active = id;
}


homeLink.addEventListener('click', function(_event){
    scrollTo(status.homeTop);
    changeActive(this.id);
});

aboutLink.addEventListener('click', function(_event){
    scrollTo(status.aboutTop);
    changeActive(this.id);
});


portefolioLink.addEventListener('click', function(_event){
    scrollTo(status.portefolioTop);
    changeActive(this.id);
});


contactsLink.addEventListener('click', function(_event){
    scrollTo(status.contactsTop);
    changeActive(this.id);
});


window.addEventListener('scroll', function(){
    let position = window.scrollY;
    
    if(!status.animation){
        if(position >= status.contactsTop){
            changeActive(contactsLink.id);
        }
        else if(position >= status.portefolioTop){
            changeActive(portefolioLink.id);
        }
        else if(position >= status.aboutTop){
            changeActive(aboutLink.id);
        }
        else changeActive(homeLink.id);
    }
});

scrollTo(0);
changeActive(homeLink.id);

