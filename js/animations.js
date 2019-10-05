let status = {
    active: "erro323464",
    homeTop: 0,
    homeSize: $("#home-div").outerHeight(),
    aboutTop: $("#about-div").offset().top,
    aboutSize: $("#about-div").outerHeight(),
    portefolioTop: $("#portefolio-div").offset().top,
    portefolioSize: $("#portefolio-div").outerHeight(),
    contactsTop: $("#contacts-div").offset().top,
    contactsSize: $("#contacts-div").outerHeight(),
    lastPosition: 9809789863785763
}

let homeLink = document.getElementById("home-link");
let aboutLink = document.getElementById("about-link");
let portefolioLink = document.getElementById("portefolio-link");
let contactsLink = document.getElementById("contacts-link");

function scrollTo(position){
    var speed = 600;
    $('html,body').animate({
        scrollTop: position
    }, speed, function(){
        status.lastPosition = position;
    });
}

function changeActive(id){

    if(status.active != id){

        if(document.getElementById(status.active)){
            document.getElementById(status.active).parentElement.classList.remove("active");
        }
        document.getElementById(id).parentElement.classList.add("active");
        status.active = id;

        switch (id) {
            case "home-link":
                window.location.hash = "inicio";
                break;
            case "about-link":
                window.location.hash = "sobre";
                break;
            case "portefolio-link":
                window.location.hash = "portefolio";
                break;
            case "contacts-link":
                window.location.hash = "contactos";
                break;
        
            default:
                break;
        }
    }
}

function pixeisInFrame(h1Top, h1Down, h2Top, h2Down){

    let result;

    if(h2Top > h1Down || h1Top > h2Down){
        result = 0;
    }
    else {
        let inf = Math.max(h1Top,h2Top);
        let sup = Math.min(h1Down,h2Down);

        result = sup - inf;
    }
    return result;

}

function compare(a, b ) {
    if ( a.pxs > b.pxs ){
      return -1;
    }
    if ( a.pxs < b.pxs ){
      return 1;
    }
    return 0;
  }

homeLink.addEventListener('click', function(_event){
    scrollTo(status.homeTop);
});

aboutLink.addEventListener('click', function(_event){
    scrollTo(status.aboutTop);
});


portefolioLink.addEventListener('click', function(_event){
    scrollTo(status.portefolioTop);
});


contactsLink.addEventListener('click', function(_event){
    scrollTo(status.contactsTop);
});


window.addEventListener('scroll', function(event){
    
    let position = this.scrollY;
    let position1 = position + this.innerHeight;


    let pxHome = pixeisInFrame(position, position1, status.homeTop, status.homeTop + status.homeSize);
    let pxAbout = pixeisInFrame(position, position1, status.aboutTop, status.aboutTop + status.aboutSize);
    let pxPortefolio = pixeisInFrame(position, position1, status.portefolioTop, status.portefolioTop + status.portefolioSize);
    let pxContacts = pixeisInFrame(position, position1, status.contactsTop, status.contactsTop + status.contactsSize);


    let divs = [
        {id: homeLink.id, pxs: pxHome},
        {id: aboutLink.id, pxs: pxAbout},
        {id: portefolioLink.id, pxs: pxPortefolio},
        {id: contactsLink.id, pxs: pxContacts}

    ];

    let active = divs.sort(compare)[0].id;
    changeActive(active);
});

scrollTo(0);
changeActive(homeLink.id);

