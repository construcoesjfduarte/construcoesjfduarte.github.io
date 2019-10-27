let ready = {
	page: false,
	server: false
}

function setPageReady(){
	document.body.classList.toggle("not-ready");
	document.getElementById("loader").classList.toggle("hidden");
}


window.onload = function(){
	ready.page = true;

	if(ready.page && ready.server){
		setPageReady();
	}

}

$.ajax({
    url: "http://localhost:3000/api/albuns",
    // url: "https://contrucoes-jf-duarte.herokuapp.com/api/albuns",
    type: "GET",
    data: {},
    dataType: "json",
    success: function(data) {
		console.log(data);
		ready.server = true;

		if(ready.page && ready.server){
			setPageReady();
		}


    },
    error: function(data){
        console.error(data);
    }
});

