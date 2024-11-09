import {dj} from './museclassesprod.js';
import {playlist} from './museclassesprod.js';
import {song} from './museclassesprod.js';

//quality of life vars
let untitledcounter = 0;
let btnid = 0;
let selectedpl;
const upArrow = '&uarr;';
const downArrow = '&darr;';

let djlist =[];
let dj1 = new dj("somebody",["1/2/3 3:00-4:00","2/2/3 1:00-6:00"],[new playlist("p1",[new song("s1","artist X","album X",[[0,0],[0,5]]), new song("s2","artist Y","album Y",[[0,0],[0,10]])])]);
let dj2 = new dj("somebodyelse",["1/3/3 3:00-4:00","2/3/3 1:00-6:00"],[new playlist("p1",[new song("s21","artist X2","album X",[[0,0],[0,5]]), new song("s22","artist Y2","album Y",[[0,0],[0,10]])])]);
djlist.push(dj1);
djlist.push(dj2);
console.log(djlist);

function clear_cardlist_playlist() {
	let cardlist_playlist = document.getElementById("playlist_selector_container");
	console.log(cardlist_playlist.children);
	let djlistform = document.querySelector("#djlistform");
	let children = cardlist_playlist.children;
	let childrensize = children.length;
	for (let i=1; i<childrensize; i++){//for somereason this removes everyother child.... I have absolutely no idea why.... just run 4 times to make sure....
			children[1].remove();//remove the element after the first element N times, where N is the number of elements-1
	}
	//now the cardlist is clean and ready for repopulating
}
function clear_cardlist_songlist(){
	let cardlist_songlist = document.getElementById("cardlist_songlist");
	console.log(cardlist_songlist.children);
	let djlistform = document.querySelector("#djlistform");
	let children = cardlist_songlist.children;
	let childrensize = children.length;
	for (let i=0; i<childrensize; i++){//for somereason this removes everyother child.... I have absolutely no idea why.... just run 4 times to make sure....
			children[0].remove();//remove the first element N times, where N is the number of elements-1
	}
	//now the cardlist is clean and ready for repopulating
}
function populate_cardlist_playlist() {
	let cardlist_playlist = document.getElementById("playlist_selector_container");
	console.log(cardlist_playlist.children);
	let djlistform = document.querySelector("#djlistform");
	let djcur = djlist.find((dj) => dj.name == djlistform.value);
	console.log(djcur);
	for (let pl of djcur.playlists){
		const plcard = document.createElement('div');
		plcard.classList.add("playlistcard");
		const plcardname = document.createElement('p');
		plcardname.textContent=pl.name;
		plcard.appendChild(plcardname);
		const btnelem = document.createElement('button');
		btnelem.classList.add("button");
		btnelem.id = "btn"+btnid;
		//add event listener to generated buttons here...
		btnelem.addEventListener('click', ()=>{
			selectedpl = pl;
			console.log(selectedpl);
			refresh_cardlist_songlist();
		});
		btnelem.textContent = "Edit";
		plcard.appendChild(btnelem);
		
		cardlist_playlist.appendChild(plcard);
	}
	
	const pladdercard = document.createElement('div');
	pladdercard.classList.add("playlistcard");
	const plcardname = document.createElement('p');
	plcardname.textContent="...";
	pladdercard.appendChild(plcardname);
	const btnelem = document.createElement('button');
	btnelem.classList.add("button");
	btnelem.id = "btn_pl_adder";
	btnelem.textContent = "Add";
	btnelem.addEventListener('click', ()=>{
		let newplname;
		newplname = prompt("Enter name of new playlist:", "Untitled");
		if (newplname == null || newplname == ""){newplname = "Untitled"+untitledcounter; untitledcounter++}
		let newpl = new playlist(newplname,[]);
		djcur.playlists.push(newpl);
		selectedpl = newpl;
		refresh_cardlist_playlist();//THIS ISN'T CYCLICAL, don't worry about it
		refresh_cardlist_songlist();//changing selected playlist, need to reflect that in the songlist box 
	});
	pladdercard.appendChild(btnelem);
	
	cardlist_playlist.appendChild(pladdercard);
	
	
}
function populate_cardlist_songlist(){
	let cardlist_songlist = document.getElementById("cardlist_songlist");
	console.log(cardlist_songlist.children);
	let djlistform = document.querySelector("#djlistform");
	let songlisttag = document.getElementById("songlist_nametag");
	songlisttag.textContent = selectedpl.name+" songs:";
	console.log(selectedpl.name)
	for (let song of selectedpl.songs){
		const songcard = document.createElement('div');
		songcard.classList.add("songcard");
		const songcardtitle = document.createElement('p');
		songcardtitle.textContent = song.name;
		songcard.appendChild(songcardtitle);
		const songcardtimeslot = document.createElement('p');
		songcardtimeslot.textContent = song.timeslot[0][0]+":"+song.timeslot[0][1]+" - "+song.timeslot[1][0]+":"+song.timeslot[1][1];//translate timeslot data to readable timecodes
		songcard.appendChild(songcardtimeslot);
		//button shiftup 
		
		const btnelemup = document.createElement('button');
		btnelemup.classList.add("button");
		btnelemup.id = "btn"+btnid;
		btnelemup.innerHTML = upArrow;
		btnelemup.addEventListener('click', ()=>{
			//reorder to shift element up
			let song1;
			let song2;
			for (let i=0;i<selectedpl.songs.length;i++){
				if(selectedpl.songs[i]==song&&i>0){
					song1=i;
					song2=i-1;
				}
			}
			
			const temp = selectedpl.songs[song1];
			selectedpl.songs[song1] = selectedpl.songs[song2];
			selectedpl.songs[song2] = temp;
			let nexttimeslot1 = [[],[]];//deep copy
			nexttimeslot1[0].push(selectedpl.songs[song1].timeslot[0][0]);
			nexttimeslot1[0].push(selectedpl.songs[song1].timeslot[0][1]);
			nexttimeslot1[1].push(selectedpl.songs[song1].timeslot[1][0]);
			nexttimeslot1[1].push(selectedpl.songs[song1].timeslot[1][1]);
			let nexttimeslot2 = [[],[]];//deep copy
			nexttimeslot2[0].push(selectedpl.songs[song2].timeslot[0][0]);
			nexttimeslot2[0].push(selectedpl.songs[song2].timeslot[0][1]);
			nexttimeslot2[1].push(selectedpl.songs[song2].timeslot[1][0]);
			nexttimeslot2[1].push(selectedpl.songs[song2].timeslot[1][1]);
			
			selectedpl.songs[song1].timeslot=nexttimeslot2;
			selectedpl.songs[song2].timeslot=nexttimeslot1;
			refresh_cardlist_songlist();
		});
		songcard.appendChild(btnelemup);
		//button shiftdown
		const btnelemdown = document.createElement('button');
		btnelemdown.classList.add("button");
		btnelemdown.id = "btn"+btnid;
		btnelemdown.innerHTML = downArrow;
		btnelemdown.addEventListener('click', ()=>{
			//reorder to shift element down
			let song1;
			let song2;
			for (let i=0;i<selectedpl.songs.length;i++){
				if(selectedpl.songs[i]==song&&i<selectedpl.songs.length-1){
					song1=i;
					song2=i+1;
				}
			}
			
			const temp = selectedpl.songs[song1];
			selectedpl.songs[song1] = selectedpl.songs[song2];
			selectedpl.songs[song2] = temp;
			let nexttimeslot1 = [[],[]];//deep copy
			nexttimeslot1[0].push(selectedpl.songs[song1].timeslot[0][0]);
			nexttimeslot1[0].push(selectedpl.songs[song1].timeslot[0][1]);
			nexttimeslot1[1].push(selectedpl.songs[song1].timeslot[1][0]);
			nexttimeslot1[1].push(selectedpl.songs[song1].timeslot[1][1]);
			let nexttimeslot2 = [[],[]];//deep copy
			nexttimeslot2[0].push(selectedpl.songs[song2].timeslot[0][0]);
			nexttimeslot2[0].push(selectedpl.songs[song2].timeslot[0][1]);
			nexttimeslot2[1].push(selectedpl.songs[song2].timeslot[1][0]);
			nexttimeslot2[1].push(selectedpl.songs[song2].timeslot[1][1]);
			
			selectedpl.songs[song1].timeslot=nexttimeslot2;
			selectedpl.songs[song2].timeslot=nexttimeslot1;
			refresh_cardlist_songlist();
			
		});
		songcard.appendChild(btnelemdown);
		
		cardlist_songlist.appendChild(songcard);
		
	}
}
function refresh_cardlist_playlist(){
	clear_cardlist_playlist();
	populate_cardlist_playlist();
}
function refresh_cardlist_songlist(){
	clear_cardlist_songlist();
	populate_cardlist_songlist();
}
function addsong(name,artist,album){//when db gets set up, rewrite this to submit a new song to db and then refresh (refreshing pulls from db)
	if(name==""||album==""||artist==""){
		alert("Failed to add song, please ensure all fields are filled out.");
		refresh_cardlist_songlist();
	}
	else{
		let nexttimeslot;
		if(selectedpl.songs.length>0){
			nexttimeslot = [[],[]];//deep copy
			nexttimeslot[0].push(selectedpl.songs[selectedpl.songs.length - 1].timeslot[1][0]);
			nexttimeslot[0].push(selectedpl.songs[selectedpl.songs.length - 1].timeslot[1][1]);
			nexttimeslot[1].push(selectedpl.songs[selectedpl.songs.length - 1].timeslot[1][0]);
			nexttimeslot[1].push(selectedpl.songs[selectedpl.songs.length - 1].timeslot[1][1]);
		
			if (nexttimeslot[1][1]<55){console.log('a');nexttimeslot[1][1]+=5;}//we can optimize this to use song lengths eventually, for now I don't have time.
			else{nexttimeslot[1] = [nexttimeslot[1][0]+1,0];}
		}
		else{
			nexttimeslot = [[0,0],[0,5]];
		}
		selectedpl.songs.push(new song(name,artist,album,nexttimeslot));
		refresh_cardlist_songlist();
	}
}
document.addEventListener("DOMContentLoaded", function () {//wait for document to load b4 playing with dom
	let djlistform = document.querySelector("#djlistform");
	for (let djitem of djlist){//add all dj's to dropdown
		const item = document.createElement('option');
		item.value = djitem.name;
		item.textContent = djitem.name;
		djlistform.appendChild(item);
	}
	
	let playlistdjnametag = document.querySelector("#playlistdjnametag");
	playlistdjnametag.textContent = "DJ "+ djlist[0].name + "'s playlists:";
	refresh_cardlist_playlist();
	selectedpl = djlist[0].playlists[0];
	refresh_cardlist_songlist();
	//let djdropdown = document.querySelector("#djlistform");
	//playlist cardlist dj name matches selected dj
	djlistform.addEventListener('click', () => {
		playlistdjnametag.textContent = "DJ "+ djlistform.value + "'s playlists:";
		let djcur = djlist.find((dj) => dj.name == djlistform.value);
		selectedpl = djcur.playlists[0];
		refresh_cardlist_playlist(); //refresh playlist cards to show playlists for selected dj
		refresh_cardlist_songlist(); //refresh songlist to have first playlist auto selected (never not editing a playlist, never editing someone elses playlist)
	});
	let songaddbtn = document.getElementById('submitbtn'); //this event handler is relatively naiive, but that's ok because we handle everything well anyways
	songaddbtn.addEventListener('click', () => {
		let sname = document.getElementById("sname").value;
		let albumname = document.getElementById("albumname").value;
		let artistname = document.getElementById("artistname").value;
		addsong(sname,artistname,albumname); 
	});
}
);
