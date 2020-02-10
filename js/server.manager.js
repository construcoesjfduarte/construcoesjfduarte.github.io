const servers = ["http://localhost:3000/api", "https://construcoesjfduarte.herokuapp.com/api"];
// const servers = ["https://construcoesjfduarte.herokuapp.com/api"];
let serverIndex = 0;


let handleErrors = {
	connectionError: 0,
	maxConnectionErrors: 3,
	notReadyError: 0,
	maxNotReadyErrors: 10
};

let display = {
	album: null,
	max: 0,
	index: 0
}



/**
 * Returns true if the album display is visible and false otherwise
 */
function isDisplayingAlbum(){
	return document.getElementById('album-screen').style.display === 'block';
}

function displayNext(){

	if(display.index < display.max){
		container = document.getElementById('album-image-display-container');
		container.getElementsByTagName('img')[display.index].classList.toggle("hidden");
		container.getElementsByTagName('img')[++display.index].classList.toggle("hidden");
		let albumCounter = document.getElementById('album-image-counter');
		albumCounter.getElementsByTagName('span')[0].innerHTML = display.index + 1;
		const avgRating = display.album.files[display.index].rating;
		const userRating = display.album.files[display.index].ratingUser;
		updateRatingDisplay(avgRating, userRating);
		updateArrows();
	}

}

function displayLast(){

	if(display.index > 0){
		container = document.getElementById('album-image-display-container');
		container.getElementsByTagName('img')[display.index].classList.toggle("hidden");
		container.getElementsByTagName('img')[--display.index].classList.toggle("hidden");
		let albumCounter = document.getElementById('album-image-counter');
		albumCounter.getElementsByTagName('span')[0].innerHTML = display.index + 1;
		const avgRating = display.album.files[display.index].rating;
		const userRating = display.album.files[display.index].ratingUser;
		updateRatingDisplay(avgRating, userRating);
		updateArrows();
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

function ratePhoto(albumID, photoID, rate){
	$.ajax({
		url: servers[serverIndex] + "/albuns/"+albumID+"/photos/"+photoID+"/rating/"+rate,
		type: "POST",
		data: {},
		dataType: "json",
		success: function(_data) {
			//console.log(data);
		},
		error: function(_data){
			//console.error(data);
		}
	});
}

function updateRatingDisplay(avgRating, userRating ){

	let ratingContainer = document.getElementById('album-rating');
	
	// Update avg rating
	let avgRatingContainer = ratingContainer.getElementsByClassName('album-rating-avg')[0];
	avgRatingContainer.innerHTML = avgRating.toFixed(2);

	// Update user rating
	let userRatingContainer = ratingContainer.getElementsByClassName('stars')[0];
	userRatingContainer.innerHTML = "";
	
	for(let i=0; i<5; i++){
		let star = document.createElement("i");
		star.classList.add('fa-star', 'star');
		
		
		star.addEventListener('click', function(){
			const rate = 5-i;
			let file = display.album.files[display.index];
			let rating = 0;

			if(file.ratingUser === 0){
				// new rate
				rating = (file.nrVotes * file.rating + rate)/ (file.nrVotes + 1);
				file.nrVotes++;
			}
			else {
				// update rate
				rating = (file.nrVotes * file.rating - file.ratingUser + rate) / file.nrVotes;
			}

			file.rating = rating;
			file.ratingUser = rate;
			//const rating = (file.nrVotes * file.rating - file. + rate) / file.nrVotes;

			updateRatingDisplay(rating, rate);
			ratePhoto(display.album.id, file.id, rate);



		})
		
		if(i < 5-userRating){
			star.classList.add('far');
		}
		else {
			star.classList.add('fas');
		}

		userRatingContainer.appendChild(star);
	}

}

function updateArrows(){
	// Update left
	let arrowLeft = document.getElementById("album-arrow-last");
	if(display.index === 0){
		arrowLeft.classList.add("hidden");
	}
	else {
		arrowLeft.classList.remove("hidden");
	}

	// Update right
	let arrowRight = document.getElementById("album-arrow-next");
	if(display.index === display.max){
		arrowRight.classList.add("hidden");
	}
	else{
		arrowRight.classList.remove("hidden");
	}
}


function showAlbum(album){
	let container = document.getElementById('album-image-display-container');
	let albumCounter = document.getElementById('album-image-counter');
	albumCounter.getElementsByTagName('span')[0].innerHTML = 1;
	
	display.album = album;
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

	albumCounter.getElementsByTagName('span')[1].innerHTML = display.max + 1;
	container.getElementsByTagName('img')[0].classList.toggle("hidden");

	updateRatingDisplay(album.files[0].rating, album.files[0].ratingUser);
	updateArrows();
}


/**
 * Display the information sent by the server 
 * @param {Array} data data sent by the server
 */
function displayAlbuns(data){
	let container = document.getElementById("albuns-container");
	container.innerHTML = "";

	for(let i=0; i<data.albuns.length; i++){
		let index = -1;

		for(let k=0; k<data.albuns[i].files.length; k++){
			if(data.albuns[i].files[k].name.match(/capa.*/)){
				index = k;
			}
		}

		if( index !== -1){
			data.albuns[i].files.splice(index, 1);
		}
	}

	data.albuns.forEach(album => {
		if(album.cover != null && album.files.length > 0){
			let albumC = document.createElement("div");
			albumC.classList.add("album", "col-12", "col-sm-6", "col-md-4", "col-lg-3");

				
			let square = document.createElement("div");
			square.classList.add("crop-image-1-1");
				
			let cover = document.createElement("img");
			cover.classList.add("album-image");
			cover.src = album.cover;
	
			let name = document.createElement("div");
			name.classList.add("album-name");
			
			let nameClick = document.createElement("div");
			nameClick.classList.add("album-name-click");
			nameClick.addEventListener('click', function(){
				showAlbum(album);
			}, false);

			let nameP = document.createElement("p");
			nameP.textContent = album.name;

			let showMore = document.createElement("p");
			showMore.classList.add("show-more");
			showMore.textContent = "Ver mais";

			let clickMobile = document.createElement("div");
			clickMobile.classList.add("album-click-mobile");
			clickMobile.addEventListener('click', function(){
				showAlbum(album);
			}, false);

			name.appendChild(nameClick);
			name.appendChild(nameP);
			name.appendChild(showMore);
			name.appendChild(clickMobile);
			square.appendChild(cover);
			square.appendChild(name);
			albumC.appendChild(square);
			container.appendChild(albumC);
		}
	});
}

function changeServer(){
	if(serverIndex + 1 <  servers.length){
		serverIndex++;
		getAlbunsFromServer();
	}
	else {
		// NENHUM server disponível
		document.getElementById("portfolio-text").remove();
		let container = document.getElementById("albuns-container");
		container.innerHTML = "";

		let content = document.createElement("p");
		content.innerText = "Devido a uma falha na ligação com os nossos servidores, não é possível"
		+ " a apresentação do portefólio.\n Por favor, tente novamente mais tarde.\n\n As nossas sinceras desculpas,\n";


		let teamName = document.createElement("span");
		teamName.innerText = "Construções JF Duarte";
		teamName.style.fontWeight = "bold";
		teamName.style.fontStyle = "italic";
		
		content.appendChild(teamName);
		container.appendChild(content);

		const container1 = document.getElementById("notifications-panel");
    	let notification = document.createElement("div");
		notification.classList.add("notification", "failure");
		
		let content1 = document.createElement("div");
    	content1.classList.add("notification-content");
    	let msg = "Falha ao ligar ao servidor. Algumas funções poderão estar indisponíveis de momento";
		content1.textContent = msg;
		
		let close = document.createElement("div");
		close.classList.add("notification-close");
		close.addEventListener("click", function(){
			notification.remove();
		}, false);
	
		let closeI = document.createElement("i");
		closeI.classList.add("fas", "fa-times");
		close.appendChild(closeI);
	
		notification.appendChild(content1);
		notification.appendChild(close);
		container1.appendChild(notification);
	
	
		setTimeout(function(){
			notification.remove();
		}, 6000);

	}
}

/**
 * Sends a request for the server, asking the information about the albuns
 */
function getAlbunsFromServer(){
	$.ajax({
		url: servers[serverIndex] + "/albuns",
		type: "GET",
		data: {},
		dataType: "json",
		success: function(data) {
			displayAlbuns(data);
		},
		error: function(data){			
			switch(data.status){
				case 501:
					handleErrors.notReadyError++;
					if(handleErrors.notReadyError < handleErrors.maxConnectionErrors){
						setTimeout(getAlbunsFromServer, 1000);
					}
					else changeServer();
					break;
				case 0:
					handleErrors.connectionError++;
					if(handleErrors.connectionError < handleErrors.maxConnectionErrors){
						setTimeout(getAlbunsFromServer, 1000);
					}
					else changeServer();
					break;		
			}
		}
	});
}

getAlbunsFromServer();
detectswipe('album-screen',swipeHandler);

document.getElementById("album-arrow-last").addEventListener('click', function(){
	displayLast();
});

document.getElementById("album-arrow-next").addEventListener('click', function(){
	displayNext();
});	

