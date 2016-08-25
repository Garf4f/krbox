// test

var settings = [];
						//0 интервал (сек) 
						//1 текущая коробка (№boxLink)
						//2 режим работы( 0 - список акков; 1 - один акк) 
						//3 номер текущего аккаунта
						//4 список логинов 
						//5 список паролей
						//6 проверка логин пароль ( 0 - не проверен, 1 - не подходин, 2 - подходит)

var viewMenuInfo = {
	boxLink:["новая коробка","осень 2016","сыворотки 2","бобибраун"],
	workMode:["список акков","только 1 акк"],
	check:["xz","error","ok"],
	color:["#F8F8F8","green","white","#E6E6E6"]
}

if (window.localStorage["__settings"]==undefined){
	settings = ['1','0','0','0','','',''];
} else {
	settings = window.localStorage["__settings"].split('/');
}
settings[3]=window.localStorage["__id"]; 	// КРИВО НАДО ПОТОМ ПОДУМАТЬ КАК ПОЧИСТИТЬ

var arr_boxLink=[
	"/box/month/",
	"/box/month/aktualnyy-makiyazh-osen-2016/",
	"/box/month/syvorotki-2/",	
	"/box/month/bobbi-brown/"
];


var boxLink=arr_boxLink[settings[1]];


var akk=takeAkk(settings[3]);


if (document.getElementsByClassName("top-up-auth__wrp")[0]!=undefined){
		
		login(akk);
};


if (window.localStorage["__flag"]=="checkAkks"){

	setTimeout(function() {	checkAkks();}, 500); 

}

viewMenu();


//                                                                 логика переборщика (НАДО ВСЕ ПЕРЕПИСАТЬ)
//=================================================================================================================================================================================================
//=================================================================================================================================================================================================
//=================================================================================================================================================================================================
function ai_on(){
	if (document.getElementById("basket_remaining_time_txt")!=undefined){nextAkk()}; //  нужно сделать проверку фразы коробка уже в корзине вынести под отдельную функцию
	++window.localStorage["__quantity"];
	if (window.localStorage["__quantity"]>150000){window.localStorage["__flag"]="out"};
	if (window.localStorage["__flag"]==undefined) {
		buyBox();
	};
};

function buyBox(){
	if(document.getElementsByClassName('g__no-mob js-box__not-item')[0] && document.getElementsByClassName('g__no-mob js-box__not-item')[0].innerHTML=='Нет в наличии'){ 
		console.log('no in stock'); 
		setTimeout(function() { document.location.href=boxLink; }, settings[0]*1000); 
	} else 
		if (document.getElementsByClassName("top-up_open fb-item__auth-buy g__no-mob")[0] && document.getElementsByClassName("top-up_open fb-item__auth-buy g__no-mob")[0].innerHTML=="Для покупки - авторизуйтесь") {
			console.log('log out'); 
				var text="__" + window.localStorage["__id"] + "__" + window.localStorage["__quantity"] +"__"+"LOGOUT"; 
				window.localStorage[text]=new Date(); 
			++window.localStorage["__id"];	
			setTimeout(function() { document.location.href=boxLink; }, settings[0]*1000);
		} else { 
			if (document.getElementsByClassName("fb-item__link__buy")[0] && document.getElementsByClassName("fb-item__link__buy")[0].innerHTML=="Купить"){ 
				console.log('click'); 	
				document.getElementsByClassName("fb-item__link__buy")[0].click(); 

			//document.getElementsByClassName("fb-time-box_message__cont")[0].innerHTML тут он пишет что товар отсутствует 

				var text="__" + window.localStorage["__id"] + "__" + window.localStorage["__quantity"]; 
				window.localStorage[text]=new Date(); 
				setTimeout(function() { nextAkk();}, 1000*5); 
			} else { 

				if(document.getElementsByClassName("fb-item__auth-buy g__no-mob fb-item__no-link")[0] && document.getElementsByClassName("fb-item__auth-buy g__no-mob fb-item__no-link")[0].innerHTML=="Вы уже оформляли KryginaBox"){
					var text="__" + window.localStorage["__id"] + "__" + window.localStorage["__quantity"] +"__"+"INSTORY"; 
					window.localStorage[text]=new Date(); 
					++window.localStorage["__id"];
					document.location.href="?logout=yes";	
				};

				if(document.getElementsByClassName("fb-item__auth-buy g__no-mob fb-item__no-link")[0] && document.getElementsByClassName("fb-item__auth-buy g__no-mob fb-item__no-link")[0].innerHTML=="Коробка уже в корзине"){
					var text="__" + window.localStorage["__id"] + "__" + window.localStorage["__quantity"] +"__"+"INSTOCK"; 
					window.localStorage[text]=new Date(); 
					++window.localStorage["__id"];
					document.location.href="?logout=yes";	
				};

				if(document.getElementsByClassName("fb-item__auth-buy g__no-mob")[0] && document.getElementsByClassName("fb-item__auth-buy g__no-mob")[0].innerHTML=="Для покупки - подтвердите телефон"){
					var text="__" + window.localStorage["__id"] + "__" + window.localStorage["__quantity"] +"__"+"NOPHONE"; 
					window.localStorage[text]=new Date(); 
					++window.localStorage["__id"];
					document.location.href="?logout=yes";	
				};
				setTimeout(function() { document.location.href=boxLink; }, settings[0]*1000); 
			}; 
		};

};

function nextAkk(){
		if (document.getElementsByClassName("fb-time-box_message__cont")[0].innerHTML[28]=="К"){
			document.location.href=boxLink;
		} else if (settings[2]==0){								//надо стедать , проверка фразы коробка в корзине
			++window.localStorage["__id"];
			document.location.href="?logout=yes";	
		};
};




function takeAkk(id){

	return {log:settings[4].split(';')[id],pas:settings[5].split(';')[id],check:settings[6].split(';')[id]};

}

function login(akk){
	document.getElementsByName("USER_LOGIN")[0].value=akk.log;
	document.getElementsByName("USER_PASSWORD")[0].value=akk.pas;
	document.getElementsByName("Login")[0].click();
};




//																	ВЬЮХА
//=================================================================================================================================================================================================
//=================================================================================================================================================================================================
//=================================================================================================================================================================================================

function viewMenu(){

	var divMenuBlock=document.createElement("div");
	divMenuBlock.setAttribute("id", "divMenuBlock");
	divMenuBlock.setAttribute("style", "position:absolute; top:0px; right:0px; width:100%;z-index:102;font-weight: bold;");

	showDivMenuBar(divMenuBlock);
	
	if (window.localStorage["__flag"]=="settings") showDivSettings(divMenuBlock);

	document.getElementsByTagName("body")[0].appendChild(divMenuBlock);

};


// ТУЛБАР   ПОЧИСТИТЬ КОМЕНТЫ

	function showDivMenuBar(divMenuBlock){

		var text='';

		text+='<div id="divMenuBar" style="position:relative; width:100%;height:25px;background:green; color:'+viewMenuInfo.color[2]+'; ">';
		text+='Акк: ' + document.cookie.split("RIX_SM_LOGIN=")[1].split("%")[0]+'   ///   ';
		text+='Коробка: ' + viewMenuInfo.boxLink[settings[1]] + '   ///   ';
		text+='Интервал: ' + settings[0] + ' сек.   ///   ';
		text+='Режим: ' + viewMenuInfo.workMode[settings[2]] +  '  ///   ';
		text+='Проверка: ' + window.localStorage["__quantity"];
			
			text+='<div id="divMenuBarSettings" style="position:absolute; top:0px; right:80px; width:100px;height:25px;background:green;" onclick="divMenuBarClickSettings()">';
			text+='Настройки | ';
			text+='</div>';
		
			text+='<div id="divMenuBarExit" style="position:absolute; top:0px; right:5px; width:60px;height:25px;background:green;" onclick="divMenuBarClickExit()">';
			text+='Выход';
			text+='</div>';



		text+='</div>';
		
		divMenuBlock.innerHTML=text;


	}

	function divMenuBarClickSettings(){
		
		if (window.localStorage["__flag"]==undefined){
			window.localStorage["__flag"]="settings";
		} else if(window.localStorage["__flag"]=="settings"){
			settingsSaveButtonClick();
			localStorage.removeItem("__flag"); // сырой вариант
			document.location.reload();
		};

	};

	function divMenuBarClickExit(){
		
		document.location.href="?logout=yes";	

	};


//визуальная часть вьюхи

	function showDivSettings(divMenuBlock){
		
		var divMenuWarp=document.createElement("div");
		divMenuWarp.setAttribute("id", "divMenuWarp");
		divMenuWarp.setAttribute("style", "padding:10px; position:relative; border:1px solid black; width:100%;	 background:"+viewMenuInfo.color[0]+";");
		
		addSettingsInterval(divMenuWarp);
		addSettingsWorkMode(divMenuWarp);
		addSettingsBoxLink(divMenuWarp);

		addSettingsLogin(divMenuWarp);
		addSettingsCurrentAkk(divMenuWarp);


		//addSettingsButtonCheckAkks(divMenuWarp);
		showAkkList(divMenuWarp);
		
		
		divMenuBlock.appendChild(divMenuWarp);
	}



	// БЛОКИ НАСТРОЕК МОЖНО ПЕРЕПИСАТЬ БЕЗ creatElement

	function addSettingsInterval(divMenuWarp){

		var divInterval = document.createElement("div");
		divInterval.setAttribute("id", "divInterval");

		
		var text='Интервал <input id="inputInterval" onchange="settingsSaveButtonClick();" type="number" style="width:40px; text-align:center;" value="' + settings[0]+ '">	';

		divInterval.innerHTML=text;
		divMenuWarp.appendChild(divInterval);
	}

	function addSettingsBoxLink(divMenuWarp){

		var divBoxLink = document.createElement("div");	
		divBoxLink.setAttribute("id", "divBoxLink");
		
		var text='';
		for (var i=0;i<arr_boxLink.length;i++){

			text+='<option ';
			if (i==settings[1]){text+='selected ';};
			text+=' value="' + i +'">' + viewMenuInfo.boxLink[i] + '</option>';
		}

		text = '<br>Коробка <select id="boxLink" onchange="changeBoxLink(this)">' + text + '  </select>';
		divBoxLink.innerHTML = text;

		divMenuWarp.appendChild(divBoxLink);
	}

	function addSettingsWorkMode(divMenuWarp){
		
		var divWorkMode = document.createElement("div");	
		divWorkMode.setAttribute("id", "divWorkMode");	
		var text='';
		text+='<br><input ';
		if (settings[2]==1) {text+='checked'};
		text+=' id="workMode" type="checkbox" onclick="changeWorkMode()"> ' + viewMenuInfo.workMode[1];

		divWorkMode.innerHTML = text;
		divMenuWarp.appendChild(divWorkMode);
	}


	function addSettingsLogin(divMenuWarp){
		var divSettingsLogin = document.createElement("div");	
		divSettingsLogin.setAttribute("id", "divSettingsLogin");

		var text='';
		text+='<br>Добавить Акк(и) <input id="settingLogin"> ';
		text+='<input type="button" id="divSettingsLoginSubmit" value="добавить" onclick="addAkkInAkkList()">';

		divSettingsLogin.innerHTML = text;
		divMenuWarp.appendChild(divSettingsLogin);
	}

	function addSettingsCurrentAkk(divMenuWarp){
		var divSettingsCurrentAkk = document.createElement("div");
		divSettingsCurrentAkk.setAttribute("id", "divSettingsCurrentAkk");

		
		var text='<br>№ текущего акка <input id="currentAkk" onchange="settingsSaveButtonClick();" type="number" style=" width:40px;text-align:center;" value="' + settings[3]+ '">';

		divSettingsCurrentAkk.innerHTML=text;
		divMenuWarp.appendChild(divSettingsCurrentAkk);

	}


	function showAkkList(divMenuWarp){
		if (document.getElementById("showAkkList")) {document.getElementById("showAkkList").remove();};
		
		if(settings[6]!=""){
			var text='';
			text+='<div id="showAkkList" style="padding:10px; border:1px solid black; position:absolute; top:30px; right:50px; text-align:center; background:'+viewMenuInfo.color[0]+';"><table align="center" border="2px">';
			text+='   <tr>    <th style="width:30px">#</th>    <th style="width:230px">Log</th>    <th style="width:230px">Pas</th>    <th style="width:30px">Check</th>   </tr>';
			for (var i=0;i<settings[4].split(";").length-1;i++){
				text+='<tr onclick="addEditMenu('+i+',divMenuWarp)"';
				if (i==settings[3]){text+=' style="background:'+ viewMenuInfo.color[1]+';color:'+viewMenuInfo.color[2]+'"'}
				text+='>';
		
				text+='<td>'+ i+'</td>';
				text+='<td>'+ takeAkk(i).log +'</td>';
				text+='<td>'+ takeAkk(i).pas +'</td>';
				text+='<td>'+ viewMenuInfo.check[takeAkk(i).check] +'</td>';
		
				text+='</tr>';
			}
		
			text+='</table>'+addSettingsButtonCheckAkks() +'<br></div>';
		
		
			divMenuWarp.innerHTML+=text;
		}

	}

	function addEditMenu(id, divMenuWarp){
		closeEditAkkMenu();

		if (document.getElementById("editMenu")) {document.getElementById("editMenu").remove();};
		var text='<div id="editMenu" style="padding:10px; position:absolute;z-index:200; left:'+event.clientX+'px;top:'+event.clientY+'px; background:'+viewMenuInfo.color[3]+';">';
		text+='log: <input style="position:absolute; right:10px;" id="logEditMenu" value="'+ settings[4].split(';')[id]+'"><br><br>';
		text+='pas: <input style=" position:absolute; right:10px;" id="pasEditMenu" value="'+ settings[5].split(';')[id]+'"><br><br>';
		text+='<input type="button" id="editAkk" onclick="editCurrentAkk('+ id + ')" value="Изменить"> ';
		text+='<input type="button" id="deleteAkk" onclick="deleteCurrentAkk('+ id + ')" value="Удалить"> ';
		text+='<input type="button" id="closeEditAkkMenu" onclick="closeEditAkkMenu()" value="Закрыть"><br>';

		text+='</div>';
		console.log(text);
		divMenuWarp.innerHTML+=text;


	}

	function addSettingsButtonCheckAkks(/*divMenuWarp*/){
		
		/*var divSettingsButtonCheckAkks = document.createElement("div");*/

		var text='<br><input type="button" id="settingsButtonCheckAkks" onclick="checkAkksModeOn()" value="Проверить акки"> <input type="button" id="deleteAllAkks" onclick="deleteAllAkks()" value="Очистить список"><br>';

		return text;
		/*divSettingsButtonCheckAkks.innerHTML = text;
		divMenuWarp.appendChild(divSettingsButtonCheckAkks);*/
	}


//функции основных настроек

	function setInteval(){

		settings[0] = document.getElementById('inputInterval').value;

	}

	function changeBoxLink(id){

		settings[1]=id.selectedIndex;
		console.log(id.selectedIndex);
		settingsSaveButtonClick();
	}

	function changeWorkMode(id){

		if (document.getElementById("workMode").checked) {
			settings[2]=1;
				console.log(true);
		} else {
			settings[2]=0;
			console.log(false);

		}

		settingsSaveButtonClick();

	}

	function addAkkInAkkList(){

		if(document.getElementById('settingLogin').value.indexOf('	') + 1){
			for (var i=0;i<document.getElementById('settingLogin').value.split(' ').length;i++){
				settings[4]+=document.getElementById('settingLogin').value.split(' ')[i].split('	')[0] + ";";
				settings[5]+=document.getElementById('settingLogin').value.split(' ')[i].split('	')[1] + ";";
				settings[6]+= 0 + ";";
			
			}
			document.getElementById('settingLogin').value="";
			settingsSaveButtonClick();
		}
	}

	function setCurrentAkk(){

		window.localStorage["__id"] = document.getElementById('currentAkk').value;
		settings[3]=window.localStorage["__id"];

	}


//работа со списком аков
	function checkAkksModeOn(){

		window.localStorage["__flag"]="checkAkks";
		window.localStorage["__id"]=0;
		divMenuBarClickExit();

	}

	function checkAkks(){		////пеерписать через чек на Конкретный акк, а потом чек перебором всех аки
								if(document.getElementsByClassName("fb-item__auth-buy g__no-mob fb-item__no-link")[0] && document.getElementsByClassName("fb-item__auth-buy g__no-mob fb-item__no-link")[0].innerHTML=="Вы уже оформляли KryginaBox"){
									var text="__" + window.localStorage["__id"] + "__" + window.localStorage["__quantity"] +"__"+"INSTORY"; 
									window.localStorage[text]=new Date(); 
								};

								if(document.getElementsByClassName("fb-item__auth-buy g__no-mob fb-item__no-link")[0] && document.getElementsByClassName("fb-item__auth-buy g__no-mob fb-item__no-link")[0].innerHTML=="Коробка уже в корзине"){
									var text="__" + window.localStorage["__id"] + "__" + window.localStorage["__quantity"] +"__"+"INSTOCK"; 
									window.localStorage[text]=new Date(); 
								};

								if(document.getElementsByClassName("fb-item__auth-buy g__no-mob")[0] && document.getElementsByClassName("fb-item__auth-buy g__no-mob")[0].innerHTML=="Для покупки - подтвердите телефон"){
									var text="__" + window.localStorage["__id"] + "__" + window.localStorage["__quantity"] +"__"+"NOPHONE"; 
									window.localStorage[text]=new Date(); 
								};
		var checkStr=settings[6].split(';');

		if (document.getElementsByClassName("top-up-auth__wrp")[0]!=undefined) {
			checkStr[settings[3]]=1;
		} else { 
			checkStr[settings[3]]=2;
		}
		settings[6]=checkStr.join(';');
		window.localStorage["__settings"]=settings.join('/');
		
		if (window.localStorage["__id"]<settings[5].split(';').length-2){
			++window.localStorage["__id"];
			divMenuBarClickExit();	
		} else {
			window.localStorage["__flag"]="settings";
			window.localStorage["__id"]=0;
			divMenuBarClickExit();
		}

	}

	function deleteAllAkks(){

		
		settings[4]="";
		settings[5]="";
		settings[6]="";
		settingsSaveButtonClick();
		closeEditAkkMenu();
		

	}

	function editCurrentAkk(id){
		
		if(settings[4].split(';')[id]!=document.getElementById("logEditMenu").value||settings[5].split(';')[id]!=document.getElementById("pasEditMenu").value){
			var text="";
			text=settings[4].split(';')
			text.splice(id,1,document.getElementById("logEditMenu").value);
			settings[4]=text.join(';');
				
			text=settings[5].split(';')
			text.splice(id,1,document.getElementById("pasEditMenu").value);
			settings[5]=text.join(';');	

			text=settings[6].split(';')
			text.splice(id,1,"0");
			settings[6]=text.join(';');	

			settingsSaveButtonClick();
		}
		closeEditAkkMenu();


	}

	function deleteCurrentAkk(id){
		closeEditAkkMenu();

		var text="";
		for (var i=4;i<7;i++){
			text=settings[i].split(';')
			text.splice(id,1);
			settings[i]=text.join(';');
		}
		settingsSaveButtonClick();

	}

	function closeEditAkkMenu(){

		if (document.getElementById("editMenu")) {document.getElementById("editMenu").remove();};

	}


//сохранение изменений настроек

	function changeStats(){
		document.getElementById("inputInterval").value=settings[0];
		document.getElementById("boxLink").value=settings[1];
		document.getElementById("workMode").checked=settings[2];
		document.getElementById("currentAkk").value=settings[3];
	}

	function settingsSaveButtonClick(){
		setInteval();
		setCurrentAkk();

		window.localStorage["__settings"]=settings.join('/');

		showAkkList(divMenuWarp);
		changeStats();

	}



// в разработка

// всплывающее окно с ошибкой типа aller
// написать логику смены акк при кривом пасе или коробки в корзине или в старом заказе

