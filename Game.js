// variables
var button1;
var button2;
var button3;
var button4;
var answer;
var dictionary;
var vol;
var signal;
var library;
var rubber;
var img;
var userID;
var scorecard;
var librarynum;

function Rubber(canvasID) {
	this.canvas = $('#canvas');
	this.ctx = this.canvas[0].getContext('2d');
	this.width = this.canvas[0].width;
	this.height = this.canvas[0].height;
	this.rect = this.canvas[0].getBoundingClientRect();
	this.background = '#43B4FB';
	this.canvas.css('cursor','pointer');
	this.ctx.font = '64pt Arial';
	this.ctx.textAlign = 'center';
	this.imgFolder = 'Images/';
	this.trackp = new Background(this, 'trackp', 'plain');
	this.tracks = new Background(this, 'tracks', 'plain');
	this.grass = new Background(this, 'grass', 'scroll');
	this.stands = new Background(this, 'stands', 'scroll');
	this.fans = new Background(this, 'fans', 'scroll');
	this.cloud1 = new Background(this, 'wcloudsg', 'scroll');
	this.clouds = [];
	for(var i = 0; i < 3; i++){
		this.clouds[i] = new Background(this, 'wcloudsg', 'scroll');
	}
	this.mountains = new Background(this, 'mountains', 'scroll');
	this.player = new Player(this, 'lucas', 'stand', 'female');
	this.shadow = new Player(this, 'Shadow', 'stand', 'female');
}

function Background(rubber, name, state){
	this.rubber = rubber;
	this.canvasBounds = rubber.canvas[0].getBoundingClientRect();
	this.ctx = rubber.canvas[0].getContext('2d');
	this.img = document.createElement('img');
	this.imgName = 'Images/backgroundSprite.png';
	this.name = name;
	this.img.src=this.imgName;
	this.boundingWidth = this.img.width;
	this.boundingHeight = this.img.height;
	this.state = state;
	this.stateCount = null;
	this.sourceWidth = null;
	this.sourceHeight = null;
	this.sourceX = null;
	this.sourceY = null;
	this.x = 0;
	this.y = 0;
	this.offsetX = 0;
	this.offsetY = 0;
	this.velY = 0;
	this.velX = 0;
	this.scaleWitdth = 0;
	this.scaleHeight = 0;
	this.setSource(this);
}


Background.prototype.setSource = function(){
	switch(this.name){
	case 'trackp':
		this.sourceWidth = 28;
		this.sourceHeight = 24;
		this.sourceX = 3;
		this.sourceY = 17;
		this.scaleWidth = 0;
		this.scaleHeight = 0;
		this.y = this.rubber.height-this.sourceHeight;
		break;
	case 'tracks':
		this.sourceWidth = 28;
		this.sourceHeight = 24;
		this.sourceX = 3;
		this.sourceY = 17;
		this.scaleWidth = 0;
		this.scaleHeight = 0;
		this.y = this.rubber.trackp.y-(this.sourceHeight-5);
		break;
	case 'grass':
		this.sourceWidth = 245;
		this.sourceHeight = 24;
		this.sourceX = 4;
		this.sourceY = 86;
		this.scaleWidth = 0;
		this.scaleHeight = 0;
		this.x = this.rubber.width-this.sourceWidth;
		this.y = this.rubber.tracks.y-this.sourceHeight;
		break;
	case 'stands':
		this.sourceWidth = 23;
		this.sourceHeight = 27;
		this.sourceX = 91;
		this.sourceY = 110;
		this.scaleWidth = 0;
		this.scaleHeight = 0;
		this.x = this.rubber.width-this.sourceWidth;
		this.y = this.rubber.grass.y-this.sourceHeight;
		break;
	case 'fans':
		this.sourceWidth = 25;
		this.sourceHeight = 22;
		this.sourceX = 120;
		this.sourceY = 110;
		this.scaleWidth = 0;
		this.scaleHeight = 0;
		this.x = this.rubber.width-this.sourceWidth;
		this.y = this.rubber.stands.y-this.sourceHeight;
		break;
	case 'mountains':
		this.sourceWidth = 78;
		this.sourceHeight = 26;
		this.sourceX = 114;
		this.sourceY = 149;
		this.scaleWidth = 0;
		this.scaleHeight = 0;
		this.x = this.rubber.width-this.sourceWidth;
		this.y = this.rubber.fans.y-this.sourceHeight;
		break;
	case 'wcloudsg':
		this.sourceWidth = 60;
		this.sourceHeight = 45;
		this.sourceX = 60;
		this.sourceY = 392;
		this.scaleWidth = 45;
		this.scaleHeight = 35;
		this.x = this.rubber.width-this.sourceWidth;
		this.y = this.rubber.stands.y-this.sourceHeight - 7;
	}
}

Background.prototype.draw = function(){
	this.checkSource();		
	this.ctx.drawImage(this.img,this.sourceX,this.sourceY,this.sourceWidth,this.sourceHeight,(this.x+this.offsetX),(this.y+this.offsetY),(this.sourceWidth-this.scaleWidth),(this.sourceHeight-this.scaleHeight));
}

Background.prototype.checkSource = function(){
	switch(this.name){
	case 'track':
		switch(this.state){
		case 'plain':
			this.sourceY = 17;
			this.stateCount = 1;
			break;
		}
		break;
	case 'grass':
		this.sourceY = 86;
		this.stateCount = 1;
		break;
	case 'stands':
		this.sourceY = 110;
		this.stateCount = 1;
		break;
	case 'fans':
		this.sourceY = 110;
		this.stateCount = 1;
		break;
	case 'mountains':
		this.sourceY = 149;
		this.stateCount = 1;
		break;
	case 'wcloudsg':
		this.sourceY = 392;
		this.stateCount = 1;
		//this.offsetY += Math.random();
	}
}

Background.prototype.stretch = function(){
	this.state = 'plain';
	while(this.x < this.rubber.width){
		this.x += this.sourceWidth;
		this.draw();
	}
	this.x = 0;
}

Background.prototype.scroll = function(){
	this.state = 'scroll';
	switch(this.name){
	case 'track':
		this.offsetX = 0;
		break;
	case 'grass':
		this.offsetX -= 4;
		break;
	case 'stands':
		this.offsetX -= 2;
		break;
	case 'fans':
		this.offsetX -= 2;
		break;
	case 'mountains':
		this.offsetX -= 1;
		break;
	case 'wcloudsg':
		this.offsetX -= 2;
	}
	while((this.x+this.offsetX) < this.rubber.width){
		this.x += this.sourceWidth;
		/*
			if(this.name == 'wcloudsg'){
			if((this.y+this.offsetY) <= 0)
	this.offsetY -= Math.random();
			else if((this.y+this.offsetY) < this.rubber.fans.y)
	this.offsetY += Math.random();
		} 
*/	 
		this.draw();
	}
	this.x = 0;
}

function Player(rubber, name, state, gender){
	this.rubber = rubber;
	this.canvasBounds = rubber.canvas[0].getBoundingClientRect();
	this.ctx = rubber.canvas[0].getContext('2d');
	this.img = document.createElement('img');
	this.name = name;
	this.gender = gender;
	if(this.name == 'Shadow')
		this.imgName = this.rubber.imgFolder.concat(this.gender.concat(this.name.concat('Character.png')));
	else
		this.imgName = this.rubber.imgFolder.concat(this.gender.concat('Character.png'));
	this.img.src=this.imgName;
	this.boundingWidth = this.img.width;
	this.boundingHeight = this.img.height;
	this.state = state;
	this.stateCount = null;
	this.sourceWidth = null;
	this.sourceHeight = null;
	this.sourceX = null;
	this.sourceY = null;
	this.x = 0;
	this.y = 0;
	this.offsetX = 0;
	this.offsetY = 0;
	this.velY = 0;
	this.velX = 0;
	this.Multiplier = 0;
	this.setSource(this);
}

Player.prototype.setState = function(state){
	this.state = state;
}

Player.prototype.setSource = function(){
	switch(this.name){
	case 'lucas':
		this.sourceWidth = 40;
		this.sourceHeight = 50;
		this.sourceX = this.sourceWidth;
		this.sourceY = 0;
		this.y = this.boundingHeight-this.sourceHeight;
		this.Multiplier = (3 * Math.random());
		break;
	case 'Shadow':
		this.sourceWidth = 40;
		this.sourceHeight = 50;
		this.sourceX = this.sourceWidth;
		this.sourceY = 0;
		this.y = this.boundingHeight-((this.rubber.trackp.y-7)-this.sourceHeight);
		this.Multiplier = (3 * Math.random());
		break;
	}

}

Player.prototype.checkSource = function(){
	switch(this.name){
	case 'lucas':
		switch(this.state){
		case 'stand':
			this.sourceY = 0
			this.stateCount = 3;
			this.stand();
			break;
		case 'run':
			this.Multiplier = (3 * Math.random());
			this.sourceY = this.sourceHeight;
			this.stateCount = 7;
			this.run();
			break;
		case 'jump':
			this.Multiplier = (3 * Math.random());
			this.sourceY = this.sourceHeight;
			this.stateCount = 7;
			this.jump();
			//this.sourceY = this.sourceHeight * 2;
			//this.stateCount = 8;
			//this.jump();
			break;
		}
	break;
	case 'Shadow':
		switch(this.state){
		case 'stand':
			this.sourceY = 0
			this.stateCount = 3;
			this.stand();
			break;
		case 'run':
			this.Multiplier = (3 * Math.random());
			this.sourceY = this.sourceHeight;
			this.stateCount = 7;
			this.run();
			break;
		case 'jump':
			this.Multiplier = (3 * Math.random());
			this.sourceY = this.sourceHeight;
			this.stateCount = 7;
			this.jump();
			//this.sourceY = this.sourceHeight * 2;
			//this.stateCount = 8;
			//this.jump();
			break;
		}
	break;
	}
	if((this.sourceX % (this.sourceWidth * this.stateCount)) == 0){
		this.sourceX = this.sourceWidth;
	}
	else{
		this.sourceX += this.sourceWidth;
	}
}

Player.prototype.stand = function(){
	this.state = 'stand';
}

Player.prototype.run = function(){
	this.state = 'run';
	if(this.x < ((this.rubber.width-(this.sourceWidth))/3)){
		if(this.velX < 9){
			this.velX += (3 + this.Multiplier);
		}
	}
	else if(this.x > (((this.rubber.width-(this.sourceWidth))/3)*2)){
		if(this.velX > -9){
			this.velX -= (3 + this.Multiplier);
		}
	}
	this.x += this.velX;
}

Player.prototype.jump = function(){ //contains error, needs work
	this.state = 'jump';

	if(this.x < ((this.rubber.width-(this.sourceWidth))/3)){
		if(this.velX < 8){
			this.velX = 8;
		}
	}
/*	else if(this.x > (((this.rubber.width-(this.sourceWidth))/3)*2)){
	 if(this.velX > -9){
			this.velX = 3;
		}
	}
*/
	if(this.velX < 0)
		this.velX = 8;
	this.x += this.velX;

	if(this.y > this.rubber.height/3){		
		if(this.velY < 16){
			this.velY -= 2;
		}
		this.y += this.velY;
	}
	else{
		if(this.y < this.boundingHeight-this.sourceHeight){
			this.velY += 2;
		}
		this.y += this.velY;
	}

	if(this.y == this.boundingHeight-this.sourceHeight){
		this.rubber.player.setState('run');
		return;
	}
}

Player.prototype.draw = function(){
	this.checkSource();		
	this.ctx.drawImage(this.img,this.sourceX,this.sourceY,this.sourceWidth,this.sourceHeight,(this.x+this.offsetX),(this.y+this.offsetY),this.sourceWidth,this.sourceHeight);
	}

Rubber.prototype.draw = function(){
	this.ctx.clearRect(0,0,this.width,this.height);
	this.ctx.fillStyle = this.background;
	this.ctx.fillRect(0,0,this.width,this.height);
	this.mountains.draw();
	this.mountains.scroll();
	//this.cloud1.draw();
	//this.cloud1.scroll();
	for(var i = 0; i < 3; i++){
		this.clouds[i].draw();
		this.clouds[i].scroll();
	}
	this.fans.draw();
	this.fans.scroll();
	this.stands.draw();
	this.stands.scroll();
	this.grass.draw();
	this.grass.scroll();
	this.tracks.draw();
	this.tracks.stretch();
	this.trackp.draw();
	this.trackp.stretch();
	this.shadow.draw();
	this.player.draw();
}

// main
$(document).ready(function(){
	initComponents();
});

// methods
function initComponents()
{
	// initialize the login screen
	initLogin();

	// initialize canvas
	rubber = new Rubber();

	rubber.player.setState("run");
	rubber.shadow.setState("run");
	setInterval(function(){rubber.draw()}, 133);

	// initialize buttons
	initButtons();
	library = document.getElementById('library');
}

function initLogin()
{
	// create login box
	var loginpage = document.getElementById('loginpage');
	loginpage.style.backgroundColor = '#5F5FDD';
	loginpage.style.position = 'absolute';
	loginpage.style.height = '600px';
	loginpage.style.width = '98%';
	loginpage.style.left = '0%';
	loginpage.style.top = '0%';

	// create game title
	title = document.getElementById('title');
	title.style.position = 'absolute';
	title.style.textAlign = 'center';
	title.style.fontSize = '60px';
	title.style.color = '#FFBE33';
	title.style.height = '20%';
	title.style.width = '80%';
	title.style.left = '10%';
	title.style.top = '15px';

	// create login box
	loginbox = document.getElementById('loginbody');
	loginbox.style.position = 'relative';
	loginbox.style.fontSize = '40px';
	loginbox.style.textAlign = 'center';
	loginbox.style.backgroundColor = '#E0E0E0';
	loginbox.style.height = '350px';
	loginbox.style.width = '50%';
	loginbox.style.left = '25%';
	loginbox.style.top = '150px';

	// create login input fields
	var logininputs = document.getElementById('loginfields');
	logininputs.style.position = 'relative';
	logininputs.style.top = '60px';
	logininputs.style.textAlign = 'center';

	// create login label2
	loginlabel2 = document.getElementById('loginlabel2');
	loginlabel2.style.fontSize = '18px';

	// create login label3
	loginlabel3 = document.getElementById('loginlabel3');
	loginlabel3.style.fontSize = '18px';

	// create login label error
	loginlabelerror = document.getElementById('loginlabelerror');
	loginlabelerror.style.fontSize = '12px';
	loginlabelerror.style.color = '#FF0000';
	loginlabelerror.style.textAlign = 'center';
	loginlabelerror.innerHTML = 'ERROR: The username or password was invalid. Please try again.';
	loginlabelerror.style.visibility = 'hidden';

	// create login field1
	loginfield1 = document.getElementById('loginfield1');
	loginfield1.style.fontSize = '18px';

	// create login field2
	loginfield2 = document.getElementById('loginfield2');
	loginfield2.style.fontSize = '18px';

	// create login button
	loginbutton = document.getElementById('loginbutton');
	loginbutton.style.position = 'absolute';
	loginbutton.style.fontSize = '20px';
	loginbutton.style.height = '10%';
	loginbutton.style.width = '20%';
	loginbutton.style.left = '65%';
	loginbutton.style.top = '75%';
}

function login()
{
	// attempt login
	loginRequest(loginfield1.value, loginfield2.value);
}

function loginRequest(username, password) {
	// check browser type
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
		if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
			// check login
			if (xmlhttp.responseText == '1') { // teacher
				// hide login page
				var loginpage = document.getElementById('loginpage');
				loginpage.style.visibility = 'hidden';
		
				// show teacher page
				var gamepage = document.getElementById('teacherpage');
				teacherpage.style.visibility = 'visible';
			} else if (xmlhttp.responseText == '2') { // student
				// load student user
				loadStudent(username, password);

				// hide login page
				var loginpage = document.getElementById('loginpage');
				loginpage.style.visibility = 'hidden';
				var loginerror = document.getElementById('loginlabelerror');
				loginerror.style.visibility = 'hidden';
		
				// show game page
				var gamepage = document.getElementById('gamepage');
				gamepage.style.visibility = 'visible';
			} else {
				// show error message
				loginlabelerror.style.visibility = 'visible';
			}
		}
	}

	//*

	// call php function
	xmlhttp.open("GET","login.php?username="+username+"&password="+password,true);
	xmlhttp.send();
	
	/*/
	
	//hide login page
	var loginpage = document.getElementById('loginpage');
	loginpage.style.visibility = 'hidden';
	
	// show game page
	var gamepage = document.getElementById('gamepage');
	gamepage.style.visibility = 'visible';

	// load student user
	loadStudent(username, password);

	//*/
}

function loadStudent(username, password) {
	// check browser type
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
		if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
			// initialize dictionaries
			parseUser(xmlhttp.responseText);

			// check browser type
			if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp = new XMLHttpRequest();
			} else { // code for IE6, IE5
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}

			xmlhttp.onreadystatechange = function() {
				if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
					// initialize dictionaries
					loadLibrary(xmlhttp.responseText);
				}
			}

			// call php function
			xmlhttp.open("GET","studentLibrary.php?",true);
			xmlhttp.send();
		}
	}

	// call php function
	xmlhttp.open("GET","loadUser.php?username="+username+"&password="+password,true);
	xmlhttp.send();
}

function parseUser(tempstring) {
	// log user ID
	userID = 0;
	userID = +tempstring;
}

function loadLibrary(stringarray) {
	// make string into array
	var libraryarray = stringarray.split("$");
	var namearray = libraryarray[0].split(" ");
	var IDarray = libraryarray[1].split(" ");

	// loop through name array
	for (var i = 0; i < namearray.length; i++) {
		// create an object
		var tempbutton = document.createElement('button');
		tempbutton.id = 'k' + i;
		tempbutton.holdnum = parseInt(IDarray[i], 10);
		tempbutton.fontSize = '20px';
		tempbutton.onclick = function() {loadDictionary(this.holdnum);};
		tempbutton.innerHTML = namearray[i];
		library.appendChild(tempbutton);
	}

	loadDictionary(+IDarray[0]);
}

function wait(milliseconds)
{
	var starttime = new Date().getTime();
	while ((new Date().getTime() - starttime) < milliseconds)
	{
		//console.log("sleeping: "+(new Date().getTime() - starttime));
	}
}

function initStatistics(){
		// create button
	var temp = document.createElement("TEXTAREA");
	var attempt = 0;
	var t = document.createTextNode(attempt);
			
	temp.appendChild(t);
	stats.appendChild(temp);

}

function initButtons()
{
	// set button properties
	button1 = document.getElementById('button1');
	button1.style.position = 'absolute';
	button1.innerHTML = "button1";
	button1.style.fontSize = '20pt';
	button1.style.height = '20%';
	button1.style.width = '20%';
	button1.style.left = '25%';
	button1.style.top = '25%';

	button2 = document.getElementById('button2');
	button2.style.position = 'absolute';
	button2.innerHTML = "button2";
	button2.style.fontSize = '20pt';
	button2.style.height = '20%';
	button2.style.width = '20%';
	button2.style.left = '55%';
	button2.style.top = '25%';

	button3 = document.getElementById('button3');
	button3.style.position = 'absolute';
	button3.innerHTML = "button3";
	button3.style.fontSize = '20pt';
	button3.style.height = '20%';
	button3.style.width = '20%';
	button3.style.left = '25%';
	button3.style.top = '55%';

	button4 = document.getElementById('button4');
	button4.style.position = 'absolute';
	button4.innerHTML = "button4";
	button4.style.fontSize = '20pt';
	button4.style.height = '20%';
	button4.style.width = '20%';
	button4.style.left = '55%';
	button4.style.top = '55%';
	
	// set redo button
	var redo = document.getElementById('replay');
	redo.style.position = 'absolute';
	redo.style.fontSize = '20pt';
	redo.style.height = '20%';
	redo.style.width = '18%';
	redo.style.left = '3%';
	redo.style.top = '66%';
	redo.onclick = function() {
		var answord = '';
		switch (answer)
		{
		case 1:
			answord = button1.innerHTML;
			break;
		case 2:
			answord = button2.innerHTML;
			break;
		case 3:
			answord = button3.innerHTML;
			break;
		case 4:
			answord = button4.innerHTML;
			break;
		}
		var audio = new Audio();
		audio.src =('audio.php?tl=en&q=Which%20is%20'+answord);
		audio.play();
	};

	// set library field
	library = document.getElementById('library');
	library.style.position = 'absolute';
	library.style.height = '60%';
	library.style.width = '18%';
	library.style.left = '3%';
	library.style.top = '3%';

	vol = 0;
	dictionary = [];
	dictionary[0] = {words: []};
}

function loadDictionary(ID) {
	// check browser type
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
		if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
			// check response
			initDictionary(xmlhttp.responseText);
		}
	}

	// call php function
	xmlhttp.open("GET","getDictionary.php?dictionaryID="+ID,true);
	xmlhttp.send();
}

function initDictionary(stringarray)
{
	// seperate string array
	var dictarray = stringarray.split("$");
	var writtenarray = dictarray[0].split(" ");
	var readarray = dictarray[1].split(" ");

	// initialize the dictionary
	dictionary[0] = {words: []};

	// loop through words
	for (var i = 0; i < writtenarray.length; i++) {
		// add word
		dictionary[0].words[i] = [writtenarray[i], readarray[i]];
	}

	// start a race
	start();
}

function start()
{
	wait(500);

	// create list
	var tempnum;
	var templist = new Array();
	templist[0] = Math.floor(Math.random() * dictionary[vol].words.length);
	for (var i = 1; i < 4; i++)
	{
		var ts = false;
		tempnum = Math.floor(Math.random() * dictionary[vol].words.length);
		
		while (!ts)
		{
			tempnum = Math.floor(Math.random() * dictionary[vol].words.length);
			
			ts = true;
			for(var j = 0; j < templist.length; j++)
			{
	if (tempnum == templist[j])
	{
		ts = false;
	} 
			}
		}
		
		templist[i] = tempnum;
	}

	// set buttons
	button1.innerHTML = dictionary[vol].words[templist[0]][0];
	button1.phonetic = dictionary[vol].words[templist[0]][1];
	button2.innerHTML = dictionary[vol].words[templist[1]][0];
	button2.phonetic = dictionary[vol].words[templist[1]][1];
	button3.innerHTML = dictionary[vol].words[templist[2]][0];
	button3.phonetic = dictionary[vol].words[templist[2]][1];
	button4.innerHTML = dictionary[vol].words[templist[3]][0];
	button4.phonetic = dictionary[vol].words[templist[3]][1];

	// set answer
	answer = Math.floor(Math.random() * 4) + 1;
	
	// say word
	var answord = '';
	switch (answer)
	{
	case 1:
		answord = button1.phonetic;
		break;
	case 2:
		answord = button2.phonetic;
		break;
	case 3:
		answord = button3.phonetic;
		break;
	case 4:
		answord = button4.phonetic;
		break;
	}
	var audio = new Audio();
	// took out http://demo.thewynngroup.net/ to test
	audio.src =('audio.php?tl=en&q=Which%20is%20'+answord);
	audio.play();
	
	console.log('ans:'+answer);
}

function guess(g)
{
	// put up click blocker
	var block = document.createElement('button');
	document.getElementsByTagName('body')[0].appendChild(block);
	block.innerHTML = 'test';
	block.style.position = 'absolute';
	block.style.height = '80%';
	block.style.width = '80%';
	block.style.left = '10%';
	block.style.top = '10%';
	
	// log word
	var word = '';
	switch (g)
	{
	case 1:
		word = button1.phonetic;
		//rubber.player.setState("jump");
		break;
	case 2:
		word = button2.phonetic;
		//rubber.player.setState("jump");
		break;
	case 3:
		word = button3.phonetic;
		//rubber.player.setState("jump");
		break;
	case 4:
		word = button4.phonetic;
		//rubber.player.setState("jump");
		break;
	}
	
	// log answer
	var answord = '';
	switch (answer)
	{
	case 1:
		answord = button1.phonetic;
		break;
	case 2:
		answord = button2.phonetic;
		break;
	case 3:
		answord = button3.phonetic;
		break;
	case 4:
		answord = button4.phonetic;
		break;
	}
	
	// check answer
	if (answer == g)
	{
		// correct
		signal = document.createElement('button');
		document.getElementsByTagName('body')[0].appendChild(signal);
		signal.style.position = 'absolute';
		signal.innerHTML = "Congratulations!";
		signal.style.fontSize = '20pt';
		signal.style.height = '20%';
		signal.style.left = '40%';
		signal.style.top = '40%';
		
		var audio = new Audio();
		audio.src =('audio.php?tl=en&q=Correct!%20That%20is%20'+word);
		audio.onended = function() {start();signal.remove();};
		audio.play();
		
		signal.onclick = function(){this.remove();};
	} else
	{
		// incorrect
		signal = document.createElement('button');
		document.getElementsByTagName('body')[0].appendChild(signal);
		signal.style.position = 'absolute';
		signal.innerHTML = "Woops! try again";
		signal.style.fontSize = '20pt';
		signal.style.height = '20%';
		signal.style.left = '40%';
		signal.style.top = '40%';
		
		var audio = new Audio();
		audio.src =('audio.php?tl=en&q=That%20is%20'+word+'.%20Try%20again... ');
		audio.onended = function() {
			audio.src =('audio.php?ie=utf-8&tl=en&q=Which%20is%20'+answord+'?');
			audio.onended = function() {
	signal.remove();
			};
			audio.play();
			signal.remove();
		};
		audio.play();

		signal.onclick = function(){this.remove();};
	}
	
	// remove click block
	block.parentNode.removeChild(block);
}

function wait(milliseconds)
{
	var starttime = new Date().getTime();
	while ((new Date().getTime() - starttime) < milliseconds)
	{
		//console.log("sleeping: "+(new Date().getTime() - starttime));
	}
}
