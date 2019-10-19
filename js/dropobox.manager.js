let ready = {
	page: false,
	server: false
}


$.ajax({
    url: "http://localhost:3000/api/albuns",
    type: "GET",
    data: {},
    dataType: "json",
    success: function(data) {
		console.log(data);
		ready.server = true;
    },
    error: function(data){
        console.error(data);
    }
});
