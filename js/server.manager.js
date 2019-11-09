let ready = {
	page: false,
	server: false
}

let display = {
	max: 0,
	index: 0
}

/**
 * Removes the initial loading page
 */
function setPageReady(){
	document.body.classList.toggle("not-ready");
	document.getElementById("loader").classList.toggle("hidden");
}

function isDisplayingAlbum(){
	return document.getElementById('album-screen').style.display === 'block';
}

function displayNext(){

	if(display.index < display.max){
		container = document.getElementById('album-image-display-container');
		container.getElementsByTagName('img')[display.index].classList.toggle("hidden");
		container.getElementsByTagName('img')[++display.index].classList.toggle("hidden");
	}

}

function displayLast(){

	if(display.index > 0){
		container = document.getElementById('album-image-display-container');
		container.getElementsByTagName('img')[display.index].classList.toggle("hidden");
		container.getElementsByTagName('img')[--display.index].classList.toggle("hidden");
	}

}

document.onkeydown = function(event){
	if(isDisplayingAlbum())
		switch(event.code){
			case "ArrowRight":
				displayNext();
				break;

			case "ArrowLeft":
				displayLast();
				break;	
		}

}

function detectswipe(el,func) {
	swipe_det = new Object();
	swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
	var min_x = 30;  //min x swipe for horizontal swipe
	var max_x = 30;  //max x difference for vertical swipe
	var min_y = 50;  //min y swipe for vertical swipe
	var max_y = 60;  //max y difference for horizontal swipe
	var direc = "";
	ele = document.getElementById(el);
	ele.addEventListener('touchstart',function(e){
	  var t = e.touches[0];
	  swipe_det.sX = t.screenX; 
	  swipe_det.sY = t.screenY;
	},false);
	ele.addEventListener('touchmove',function(e){
	  e.preventDefault();
	  var t = e.touches[0];
	  swipe_det.eX = t.screenX; 
	  swipe_det.eY = t.screenY;    
	},false);
	ele.addEventListener('touchend',function(e){
	  //horizontal detection
	  if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
		if(swipe_det.eX > swipe_det.sX) direc = "r";
		else direc = "l";
	  }
	  //vertical detection
	  else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
		if(swipe_det.eY > swipe_det.sY) direc = "d";
		else direc = "u";
	  }
  
	  if (direc != "") {
		if(typeof func == 'function') func(el,direc);
	  }
	  direc = "";
	  swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
	},false);  
}
  
function swipeHandler(_el,d) {
	switch(d){
		case 'l':
			displayNext();
			break;
		case 'r':
			displayLast();
			break;
		default:
			break;				 
	}

}



function showAlbum(album){
	let container = document.getElementById('album-image-display-container');
	container.innerHTML = "";
	document.getElementById('album-screen').style.display = "block";
	display.index = 0;
	display.max = album.files.length - 1;
	document.body.classList.toggle("not-ready");

	album.files.forEach(file => {
		let image = document.createElement("img");
		image.classList.add('album-image-display', 'hidden');
		image.src = file.link;
		container.appendChild(image);
	});

	container.getElementsByTagName('img')[0].classList.toggle("hidden");
}


/**
 * Display the information sent by the server 
 * @param {Array} data data sent by the server
 */
function displayAlbuns(data){
	let container = document.getElementById("albuns-container");

	for(let i=0; i<data.albuns.length; i++){
		let index = -1;

		for(let k=0; k<data.albuns[i].files.length; k++){
			if(data.albuns[i].files[k].name.match(/capa.*/)){
				index = k;
			}
		}
		data.albuns[i].files.splice(index, 1);
	}

	data.albuns.forEach(album => {
		if(album.cover != null && album.files.length > 0){
			let albumC = document.createElement("div");
			albumC.classList.add("album", "col-6", "col-md-4", "col-lg-4");
			albumC.addEventListener('click', function(){
				showAlbum(album);
			}, false)
				
			let square = document.createElement("div");
			square.classList.add("crop-image-1-1");
				
			let cover = document.createElement("img");
			cover.classList.add("album-image");

			cover.src = album.cover;
	
			let name = document.createElement("p");
			name.classList.add("album-name");
			name.textContent = album.name;
	
			square.appendChild(cover);
			square.appendChild(name);
			albumC.appendChild(square);
			container.appendChild(albumC);
		}
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
	detectswipe('album-screen',swipeHandler); 
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
