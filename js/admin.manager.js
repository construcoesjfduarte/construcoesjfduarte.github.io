// const server = "https://construcoesjfduarte.herokuapp.com/api";
const server = "http://localhost:3000/api";

function getSessionStatus(){
    $.ajax({
		url: server + "/admin",
		type: "GET",
		data: {},
		dataType: "json",
		success: function(data) {
            console.log(data);
            //document.body.classList.toggle("not-ready");
            //document.getElementById("admin-content").innerHTML = "";
		},
		error: function(data){			
			console.log(data);
		}
	});
}

getSessionStatus();