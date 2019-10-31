let ready = {
	page: false,
	server: false
}

/**
 * Removes the initial loading page
 */
function setPageReady(){
	document.body.classList.toggle("not-ready");
	document.getElementById("loader").classList.toggle("hidden");
}

/**
 * Display the information sent by the server 
 * @param {Array} data data sent by the server
 */
function displayAlbuns(data){
	let container = document.getElementById("albuns-container");
	data.albuns.forEach(album => {
		let albumC = document.createElement("div");
		albumC.classList.add("album", "col-6", "col-md-4", "col-lg-4");
			
		let square = document.createElement("div");
		square.classList.add("crop-image-1-1");
			
		let cover = document.createElement("img");
		cover.classList.add("album-image");
		const arrayBufferView = new Uint8Array( album.cover.data );
		var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
		var urlCreator = window.URL || window.webkitURL;
		var imageUrl = urlCreator.createObjectURL( blob );
		cover.src = imageUrl;

		let name = document.createElement("p");
		name.classList.add("album-name");
		name.textContent = album.name;

		square.appendChild(cover);
		square.appendChild(name);
		albumC.appendChild(square);
		container.appendChild(albumC);

	});
}

/**
 * Window listener. Sets the page as ready
 */
window.onload = function(){
	ready.page = true;

	if(ready.page && ready.server){
		setPageReady();
	}
}

/**
 * Sends a request for the server, asking the information about the albuns
 */
function getAlbunsFromServer(){
	$.ajax({
		// url: "http://localhost:3000/api/albuns",
		url: "https://contrucoes-jf-duarte.herokuapp.com/api/albuns",
		type: "GET",
		data: {},
		dataType: "json",
		success: function(data) {
			console.log(data);
			displayAlbuns(data);
	
			ready.server = true;
			if(ready.page && ready.server){
				setPageReady();
			}
	
		},
		error: function(data){
			console.error(data);
		}
	});
}

getAlbunsFromServer();