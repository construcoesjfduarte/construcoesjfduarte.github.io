let status = {
    navbarSolid: false
}


document.getElementById("navbar-toggler").addEventListener('click', function(event){
    this.getElementsByClassName("icon")[0].classList.toggle("close");
    document.getElementById("navbar").classList.toggle("open");
})

window.addEventListener('scroll', function(event){

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


// $.ajax({
//     url: "http://localhost:3000/api/emails/send",
//     type: "POST",
//     data: {name: "Web Test", email: "drs.falcao@gmail.com"},
//     dataType: "json",
//     success: function(data) {
//         console.log(data);
        
//     },
//     error: function(data){
//         console.error(data);

//     }
// });
