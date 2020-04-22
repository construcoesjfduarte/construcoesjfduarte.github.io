const server = "http://localhost:3000/api";


function handlerSubmission(){
    document.getElementById('loginForm').addEventListener('submit', function(event){
        event.preventDefault();
        const password = this.getElementsByTagName("input")[0].value;

        const body = document.getElementById("login-card-body");
    
        body.children[0].classList.toggle("hidden");
        body.children[1].classList.toggle("hidden");

        let form = this;

        $.ajax({
            url: server + "/admin/atualizar",
            type: "POST",
            data: {password},
            dataType: "json",
            statusCode: {
                401: function() {
                    body.children[1].classList.toggle("hidden");
                    body.children[0].classList.toggle("hidden");
                    form.reset();
                    form.getElementsByTagName("input")[0].placeholder = "password incorreta";
                },
                200: function(data){
                    body.innerHTML = data.html;

                },
                500: function(){
                    body.children[1].classList.toggle("hidden");
                    body.children[0].classList.toggle("hidden");
                    form.reset();
                }
            }
        });

    })

}

function getSessionStatus(){
    $.ajax({
		url: server + "/admin",
		type: "GET",
		data: {},
		dataType: "json",
		statusCode: {
			200: function(data){
                document.getElementById("admin-content").innerHTML = data.html;
                handlerSubmission();
			}
		}
	});
}

getSessionStatus();