let status = {
    navbarSolid: false
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