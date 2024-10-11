const hashMap = new Map();
var loginButton = document.getElementsByClassName("loginButton")[0];
var signup = document.getElementsByClassName("signup")[0];
var usernameS = document.getElementById("usernameS");
var passwordS = document.getElementById("passwordS");
var signupButton = document.getElementById("signup2");
var apiList = [];
var subMain = document.getElementsByClassName("subMain")[0];
var showExcercise = document.getElementsByClassName("showExcercise");
var mainContainer = document.getElementsByClassName("mainContainer");
var containerInfo;
var currPage = 1;
var closeX = document.getElementById("closeX");
var prev = document.getElementById("prev");
var storeData=[];
var temp={};




	var table1=document.createElement("table");
var counter=1;
if(localStorage.getItem(localStorage.getItem("u")+"table1")!=null){
	//table1=JSON.parse(localStorage.getItem("table1")).theTable;
		var tableVal=JSON.parse(localStorage.getItem(localStorage.getItem("u")+"table1"));
		storeData=tableVal;
		formHeaders(tableVal[0].obj1);
		
		tableVal.map((single)=>{
			
			var x=reconstructTable(single,counter);
			table1.appendChild(x);
			counter++;
		});
		alert(tableVal[0].obj1.sets);
	}
console.log(tableVal);
	
function reconstructTable(singleVal,counter){
	//var table1=document.createElement("table");
	var tr=document.createElement("tr");
	var td=document.createElement("td");

	var tdA=document.createElement("td");
	var tdB=document.createElement("td");
	
	tdA.innerHTML=counter;
	tr.appendChild(tdA);

	tdB.innerHTML=singleVal.name;
	tr.appendChild(tdB);
	var entries=Object.entries(singleVal.obj1);
	
	for(var i=0;i<entries.length;i++){
		var td1=document.createElement("td");
		td1.innerHTML=entries[i][1];
		tr.appendChild(td1);
	}
	
	return tr;
}

//localStorage.removeItem("table1");
var currentUser;

//var user="";
//hide popup screen and show menu again
if (closeX) {
	closeX.addEventListener("click", () => {
		backToMain(true);
		
	});
}

 
function backToMain(clearMain){
	if(clearMain){
	mainContainer[0].style.visibility = "visible";
	}
	showExcercise[0].style.visibility = "hidden";
	containerInfo.innerHTML = "";
}

function loadApi(){
//when api loads
load1().then(result => {
	//display it on the screen
	apiList = result;
	currentUser=localStorage.getItem("u");
	loadMain();


});
}
loadApi();

function loadMain() {
	
	if (subMain) {

		subMain.innerHTML = "";
		//filters out all the difficulty categories
		var category = displayApi(apiList);

		//for each filtered category,displays the category on the screen

		category.map((val) => {
			showDifficulty(val);
		});

	}
}
//filter out the difficulty categories function________________________________________________________________________________
function displayApi(apiList) {

	var category = [];
	for (var i = 0; i < apiList.length; i++) {
		category[i] = apiList[i].difficulty;
	}

	category = category.filter((val, index, arr) => {
		return arr.indexOf(val) === index;
	});
	return category;
}

//displays the difficulty categories on the screen function________________________________________________________________________________
function showDifficulty(val) {

	var box1;
	var header1;
	var subApiList;
	box1 = document.createElement("div");
	header1 = document.createElement("h3")
	header1.innerHTML = val;
	box1.appendChild(header1);
	box1.setAttribute("class", "box");
	box1.addEventListener("click", () => {

		subApiList = loadExcercise(val);
		subMain.innerHTML = "";
		//displays the workout on the screen function 2nd page
		displayWorkout2(subApiList);


	})
	subMain.appendChild(box1);
	if (box1.style.width < "50px") {
		header1.style.fontSize = "15px";
	}
}
//displays the workout on the screen function 2nd page function________________________________________________________________________________
function displayWorkout2(list1) {
	var box1;
	var header1;


	var workouts = list1.map((val) => {
		box1 = document.createElement("div");
		header1 = document.createElement("h3")
		header1.innerHTML = val.name;
		box1.setAttribute("class", "box");
		box1.classList.add("box1");
		box1.addEventListener("click", () => {

			mainContainer[0].style.visibility = "hidden";
			showExcercise[0].style.visibility = "visible";

			displayEverythingPopUp(val);


		})
		box1.appendChild(header1);
		subMain.appendChild(box1);

	});

}

//display function on pop up screen________________________________________________________________________________
function displayEverythingPopUp(val) {//manual
	containerInfo = document.createElement("div");
	if (currPage == 1) {


		var header = document.createElement("h2");
		var headerMuscle = document.createElement("h3");
		var headerType = document.createElement("h3");
		var instructions = document.createElement("p");

		header.innerHTML = val.name;
		headerMuscle.innerHTML = "Muscles: " + val.muscle;
		headerType.innerHTML = val.type;
		instructions.innerHTML = val.instructions;

		containerInfo.appendChild(header);
		containerInfo.appendChild(headerMuscle);
		containerInfo.appendChild(headerType);
		containerInfo.appendChild(instructions);

	}
		//form
	else {

		var header = document.createElement("h1");
		var header2 = document.createElement("h3");
		var form1 = document.createElement("form");
		var submitForm = document.createElement("button");

		header.innerHTML = "record your workout";
		header2.innerHTML = "excercise type: " + val.name;
		submitForm.innerHTML = "submit";


		form1.setAttribute("id", "form1");
		submitForm.setAttribute("id", "submitForm");

		containerInfo.appendChild(header);
		containerInfo.appendChild(header2);
		containerInfo.appendChild(form1);
		pairLabelInput("weight used", form1, "number");
		pairLabelInput("reps", form1, "number");
		pairLabelInput("sets", form1, "number");
		pairLabelInput("rest time", form1, "number");
		pairLabelInput("notes", form1, "textArea");
		form1.appendChild(submitForm);

		containerInfo.appendChild(form1);
		submitForm.addEventListener("click",(event)=>{
			event.preventDefault();
			loadMain();
			subMain.innerHTML="";

				createTable(form1);


			dealWithRecordedExcercise(form1,val.name);
			
			
			
		})
	}
	showExcercise[0].appendChild(containerInfo);
}

function showTable(){

	subMain.innerHTML="";
	subMain.appendChild(table1);

}
var newHeader=true;

function createTable(form1){
	
	var obj1=FormToObject(form1);
	if(newHeader){
		newHeader=false;
		

	}
	
}
var workoutNum=1;
	workoutNum=counter;
//keys gives you back only keys,entries gives you back both

function nameAndNumberHeader(tr){
	var th=document.createElement("th");
	th.innerHTML="workout number";
	tr.appendChild(th);
	
	th=document.createElement("th");
	th.innerHTML="name";
	tr.appendChild(th);

	return tr;
}

function formHeaders(val){
	
	var tr=document.createElement("tr");
	tr=nameAndNumberHeader(tr);
	var keys=Object.keys(val);

	for(var i=0;i<keys.length;i++){
		var th=document.createElement("th");

		th.innerHTML=keys[i];
		tr.appendChild(th);
	}
	table1.appendChild(tr);
}

function nameAndNumberData(tr1,valName){

	var td=document.createElement("td");
	td.innerHTML=workoutNum;
	
	tr1.appendChild(td);
	
	td=document.createElement("td");
	td.innerHTML=valName;
	tr1.appendChild(td);

	temp.num=workoutNum;
	temp.name=valName;

	storeData.push(temp);
	localStorage.setItem(localStorage.getItem("u")+"table1",JSON.stringify(storeData));
	alert(storeData);
	if(workoutNum>4){
		table1.style.maxHeight="100%";
	}

	workoutNum++;
return tr1;
}
function addRowToTable(val,valName){
	//var table1=document.createElement("table");
	
	var entries=Object.entries(val);
	
	var tr1=document.createElement("tr");
		tr1=nameAndNumberData(tr1,valName);
	
		for(var j=0;j<entries.length;j++){
			var td=document.createElement("td");
			td.innerHTML=entries[j][1];
			tr1.appendChild(td);  
		}

	//if there isn't a table,add table
	table1.appendChild(tr1);
	if(!subMain.contains(table1)){
	subMain.appendChild(table1);
	}
	
}


function FormToObject(form1){
	var x=Array.from(form1.elements);
	var obj1=createExcerciseObject(x);
	return obj1;
}
function dealWithRecordedExcercise(form1,valName){
	var obj1=FormToObject(form1);
	backToMain(true);
	if(localStorage.getItem("u")+"table1"==null){
	formHeaders(obj1);
	}
	addRowToTable(obj1,valName);
	
	alert(currentUser);
}

function createExcerciseObject(list1){
	temp={};
	var obj1={
		
		weight:list1[0].value,
		reps:list1[1].value,
		sets:list1[2].value,
		rest:list1[3].value,
		notes:list1[4].value,
	};
	temp.obj1=obj1;
	return obj1;
	
}
function pairLabelInput(labelText, form1, inputType) {
	var div1 = document.createElement("div");
	var label1 = document.createElement("label");
	if (inputType != "textArea") {
		var input1 = document.createElement("input");
	}
	else {
		var input1 = document.createElement("textarea");
	}
	label1.innerHTML = labelText;
	label1.setAttribute("for", "eleInput1");
	input1.setAttribute("id", "ele1Input1");
	input1.setAttribute("type", inputType);
	div1.appendChild(label1);
	div1.appendChild(input1);
	form1.appendChild(div1);


	return form1;
}
//----------------------------------------------loading api----------------------------------------------------------------
function loadExcercise(val) {
	
	var subApiList = apiList.filter((value) => {

		return value.difficulty == val;
	});
	//alert(subApiList.length);
	return subApiList;
}

//loadapi
async function load1() {
	var storeData = [];
	var category = [];
	var key = "dLzTdCWw3L/WoxIqIo2MiA==l3v6QHO3TygFFRzu"
	try {
		const response = await fetch("https://api.api-ninjas.com/v1/exercises", {
			method: 'GET',
			headers: {
				'X-Api-Key': key,
			},
		});

		if (!response) {
			alert("no");
		}

		const data = await response.json();

		storeData = data;
		console.log(storeData);

		for (var i = 0; i < storeData.length; i++) {
			category[i] = storeData[i].difficulty;
		}

		category = category.filter((val, index, arr) => {
			return arr.indexOf(val) === index;
		});

		console.log(category);


	}
	catch (error) {
		alert(error);

	}
	return storeData;
}

//---------------------------------------------------------login----------------------------------------------------------------------------


if (localStorage.getItem("store1") != null && localStorage.getItem("store2") != null) {

	var Vlist = localStorage.getItem("store1").split(',');
	var Klist = localStorage.getItem("store2").split(',');

	//creating hash map username and password
	for (var i = 0; i < Klist.length; i++) {
		hashMap.set(Klist[i], Vlist[i]);
	}

}
// switch to sign up page
if (signup) {
	signup.addEventListener("click", function(event) {
		event.preventDefault();
	
		location.href = "index2.html";


	});
}

//check whether user already exists if not adds user to hashmap
if (signupButton) {

	signupButton.addEventListener("click", function(event) {

		event.preventDefault();
		var check = hashMap.has(usernameS.value);
		if (!check) {

			hashMap.set(usernameS.value, passwordS.value);

			saveToLocal();

		}
		else {
			alert("already exists");
		}

	});
}

function saveToLocal() {
	var v = Array.from(hashMap.values());
	var k = Array.from(hashMap.keys());
	localStorage.setItem("store1", v);
	local2 = localStorage.setItem("store2", k);
}
//localStorage.clear();

//login page
//add event listener to the login button
if (loginButton) {

	loginButton.addEventListener("click", (event) => {

		event.preventDefault();

		var getUser = document.getElementById("usernameL");
		var getPass = document.getElementById("passwordL");

		if (location.href = "index.html") {
			if (checkLogin(getUser.value, getPass.value)) {
				
				window.location.href = "main.html";

			}
		}
	});
}

function checkLogin(username, password) {

	var exists = false;
	//get passwords
	var t = localStorage.getItem("store1");
	t = t.split(',');
	//get usernames
	var n = localStorage.getItem("store2");
	n = n.split(',');

	if (hashMap.has(username) && hashMap.get(username) == password) {
		
		exists = true;
		localStorage.setItem("u", username);
		
	}


	if (exists) {
		
		
		return true;
		
	}
	else {
		return false;
	}

}


var store;
var options = document.getElementsByClassName("options");
for (var i = 0; i < options.length; i++) {
	options[i].addEventListener("click", (val) => {
		if (store != null || store != undefined) {
			store.style.hover = "white";
			store.style.color = "black";
		}
		val.target.style.color = "red";
		store = val.target;
		
	});
}
function excerciseManual() {
	currPage = 1;
	loadMain();
}

function recordExcercise() {
	currPage = 2;
	loadMain();
}






function switchToLogin() {
	location.href = "/";
}