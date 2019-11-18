function getHTTPobject(){
	let xhr;
	if(window.XMLHttpRequest){
	xhr = new XMLHttpRequest();
	}
	else if(window.ActiveXObject){
	 xhr = new ActiveXObject("Msxml12.XMLHTTP");
	}
	return xhr;
}
// function to reuse the data again and again and making an ajax call 
function ajaxCall(dataUrl,outputel,callback){
const request = getHTTPobject();
outputel.innerHTML = "Loading..."
request.onreadystatechange = function(){
	if(request.readyState === 4 && request.status === 200){
		let contacts = JSON.parse(request.responseText)
		if(typeof callback == "function")
			callback(contacts)
  }
}
request.open("GET",dataUrl,true);
request.send(null);
}

// wrap everything under anonymous function
(function(){
	let target = document.getElementById('output');
	let btn = document.getElementById('get-all');
	let search = document.getElementById('q');
	let searchForm = document.getElementById('search-form');
const adr = {
	search: function(e){
		
		let output = document.getElementById('output');
		ajaxCall('data/information.json',output,function(data){  
		let list = data.info;
		let count = list.length;
		e.preventDefault();
		target.innerHTML = ' ';
		if(count > 0 && search.value !== ""){
			for(let i = 0; i<count ; i++){
				const obj = list[i],
				isFound = obj.name.indexOf(search.value);
			
			if(isFound !== -1){
			target.innerHTML += '<p>' + obj.name + ',<a href="mailto:' + obj.email + '">' + obj.email +'</a><p>';
				}
			}
		}
	});			
  },
	getAllContacts : function(){
		let output = document.getElementById('output');
		ajaxCall('data/information.json',output,function(data){
		let list = data.info;
		let count = list.length;
		target.innerHTML = ' ';
		if(count > 0){
			for(let i = 0; i<count ; i++){
				const obj = list[i];
				target.innerHTML += '<p>' + obj.name + ',<a href="mailto:' + obj.email + '">' + obj.email +'</a><p>';
			}
		}
	});
  },
	addActiveSection : function(){
	this.parentNode.setAttribute("class","active")
},
	  removeActiveSection : function(){
	  this.parentNode.removeAttribute("class")
	  },
	addHovering : function(){
		searchForm.setAttribute("class","hovering")
	},
	removeHovering : function(){
		searchForm.removeAttribute("class")
	}
	 
}

btn.addEventListener("click", adr.getAllContacts,false);
search.addEventListener("focus",adr.addActiveSection,false);
search.addEventListener("blur",adr.removeActiveSection,false);
searchForm.addEventListener("mouseover",adr.addHovering,false);
searchForm.addEventListener("mouseout",adr.removeHovering,false);
searchForm.addEventListener("submit",adr.search,false);
searchForm.addEventListener("keyup",adr.search,false);

})();