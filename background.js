console.log('f')
var bgUI = {}
var sessionStates={};
var globalState={
	garr: []
}

function LoadGarr()
{
	//var garrTmp="http://www.google.com.ua/;3496721405;google#http://www.youtube.com/;2236007247;youtube#http://www.wikipedia.org/;1103662420;wiki#http://www.rsdn.ru/forum/src/2259506.1.aspx;3171053432;c++,array#http://www.w3schools.com/js/js_obj_array.asp;552656854;javascript,array#http://www.youtube.com/watch?v=WCfR6nZ7qzA;119120339;youtube,Trance,Superstar,ORIGINAL#http://www.youtube.com/watch?v=COf0Av_in8M&feature=related;2325531332;youtube,Trance,Just Love#http://www.youtube.com/watch?v=Ool4gyrJpM0&feature=related;1559964339;youtube,Trance,Flying High#http://www.youtube.com/watch?v=5Cva3Jf-_DM&feature=related;4207527565;youtube,Trance,Bad Boy#http://www.youtube.com/watch?v=RGNGiVCbKOc&feature=related;3113212593;youtube,Trance,Bad Boy,Club,Mix#http://www.youtube.com/watch?v=t37ZTIXWjus&feature=related;2514991228;youtube,Trance,Bad Boy,Pulsedriver,remix#http://www.youtube.com/watch?v=E1mU6h4Xdxc;355730241;youtube,Rihanna,Disturbia#http://www.youtube.com/watch?v=booKP974B0k&feature=channel;862430592;youtube,Shakira,She Wolf#http://www.youtube.com/watch?feature=iv&v=dlEdFJpQ8-c&annotation_id=annotation_170139;990324447;youtube,Rihanna,S&M,Lyrics#http://www.youtube.com/watch?v=Tio51WbvtDY;2512784320;youtube,Emilia de Poret,Pick Me Up#http://www.youtube.com/watch?v=pyJ8IywDvxA;3000314267;youtube,The Birthday Massacre,Happy Birthday,Lyrics#http://www.youtube.com/watch?v=9WxlIqBM3wk;1233402216;youtube,Pulsedriver,Galaxy#http://www.youtube.com/watch?v=04ulaukDpiE;3076464604;youtube,Trance,Beds are burning#http://maps.google.com.ua/maps?hl=ru&tab=wl;2257950720;google,maps#http://images.google.com/imghp?hl=ru;4261896152;google,images#http://www.google.com/chrome?hl=ru&brand=CHMI;1703891597;google,chrome,download#http://en.wikipedia.org/wiki/Main_Page;707337708;wiki,en#http://de.wikipedia.org/wiki/Wikipedia:Hauptseite;29662062;wiki,de#http://it.wikipedia.org/wiki/Pagina_principale;603670049;wiki,it#http://pl.wikipedia.org/wiki/Strona_g%C5%82%C3%B3wna;1766380656;wiki,pl#http://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0;4140584211;wiki,ru#http://en.wikipedia.org/wiki/JavaScript;2096752508;wiki,en,javascript#http://ru.wikipedia.org/wiki/JavaScript;4107036794;wiki,ru,javascript#http://mozilla-russia.org/;3737991518;ru,mozilla,firefox,download#http://www.apple.com/safari/download/;3990455274;en,safary,download#http://twitter.com/mozilla_russia;1673934550;ru,mozilla,twitter#http://twitter.com/;4052153918;twitter#http://kino-dom.tv/;1452641284;series,online,kino-dom#http://www.adultmult.ru/;1348446750;adultmult,anime,online#http://www.adultmult.ru/html/robot_chicken.html;3747293679;adultmult,anime,online,Robot Chicken#http://www.adultmult.ru/html/robot_chicken_1s.html;1806827148;adultmult,anime,online,Robot Chicken,s01#http://www.adultmult.ru/html/robot_chicken_2s.html;1151140465;adultmult,anime,online,Robot Chicken,s02#http://www.adultmult.ru/html/robot_chicken_3s.html;3507693626;adultmult,anime,online,Robot Chicken,s03#http://www.adultmult.ru/html/robot_chicken_4s.html;1639814999;adultmult,anime,online,Robot Chicken,s04#http://www.adultmult.ru/html/robot_chicken_5s.html;3632356592;adultmult,anime,online,Robot Chicken,s05#http://twitter.com/adultmult;2511886712;adultmult,twitter#https://addons.mozilla.org/ru/firefox/;1877127016;ru,addons,firefox#http://blog.twitter.com/;968639594;twitter,blog#http://www.yandex.ua/;184450480;yandex,ua#http://nigma.ru/;3408235457;nigma,ru#http://www.youtube.com/watch?v=N6O2ncUKvlg;3617341027;youtube,Just A Dream#http://www.youtube.com/watch?v=SkyfRu-dpvc;3249273778;youtube,Just A Dream,Lyrics#http://www.youtube.com/watch?v=vlesKtSGiLY&feature=rec-LGOUT-exp_fresh+div-1r-5-HM;1378658449;youtube,Final Fantasy#http://www.youtube.com/watch?v=5Cva3Jf-_DM&feature=related;4207527565;youtube,Trance,Bad Boy#http://ru.wikipedia.org/wiki/DDR3_SDRAM;2802745248;wiki,ru,DDR3#http://www.tigir.com/opacity.htm;2574765875;opacity,javascript,CSS#http://en.wikipedia.org/wiki/Shakira;1673170686;wiki,Shakira,en#http://ru.wikipedia.org/wiki/%D0%A8%D0%B0%D0%BA%D0%B8%D1%80%D0%B0;2867995230;wiki,Shakira,ru".split("#");
	var garrTmp="http://www.shoutcast.com;1813585337;shoutcast,online,radio#http://www.shoutcast.com/radio/Dance%20Pop;1437308249;shoutcast,radio,online,dance,pop#javascript:void(ws = new WebSocket('ws://127.0.0.1:81'),ws.onopen = function(){console.log('Connection opened...'),ws.onmessage = function(evt){console.log(evt.data),document.querySelector('.dirbg .playbutton').click()}},ws.onclose = function() { console.log('Connection closed...') });811360737;shoutcast,radio,online,dance,pop,!continue_play#http://www.youtube.com/;2236007247;youtube#http://www.wikipedia.org/;1103662420;wiki#http://www.rsdn.ru/forum/src/2259506.1.aspx;3171053432;c++,array#http://www.w3schools.com/js/js_obj_array.asp;552656854;javascript,array#http://www.youtube.com/watch?v=WCfR6nZ7qzA;119120339;youtube,Trance,Superstar,ORIGINAL#http://www.youtube.com/watch?v=COf0Av_in8M&feature=related;2325531332;youtube,Trance,Just Love#http://www.youtube.com/watch?v=Ool4gyrJpM0&feature=related;1559964339;youtube,Trance,Flying High#http://www.youtube.com/watch?v=5Cva3Jf-_DM&feature=related;4207527565;youtube,Trance,Bad Boy#http://www.youtube.com/watch?v=RGNGiVCbKOc&feature=related;3113212593;youtube,Trance,Bad Boy,Club,Mix#http://www.youtube.com/watch?v=t37ZTIXWjus&feature=related;2514991228;youtube,Trance,Bad Boy,Pulsedriver,remix#http://www.youtube.com/watch?v=E1mU6h4Xdxc;355730241;youtube,Rihanna,Disturbia#http://www.youtube.com/watch?v=booKP974B0k&feature=channel;862430592;youtube,Shakira,She Wolf#http://www.youtube.com/watch?feature=iv&v=dlEdFJpQ8-c&annotation_id=annotation_170139;990324447;youtube,Rihanna,S&M,Lyrics#http://www.youtube.com/watch?v=Tio51WbvtDY;2512784320;youtube,Emilia de Poret,Pick Me Up#http://www.youtube.com/watch?v=pyJ8IywDvxA;3000314267;youtube,The Birthday Massacre,Happy Birthday,Lyrics#http://www.youtube.com/watch?v=9WxlIqBM3wk;1233402216;youtube,Pulsedriver,Galaxy#http://www.youtube.com/watch?v=04ulaukDpiE;3076464604;youtube,Trance,Beds are burning#http://maps.google.com.ua/maps?hl=ru&tab=wl;2257950720;google,maps#http://images.google.com/imghp?hl=ru;4261896152;google,images#http://www.google.com/chrome?hl=ru&brand=CHMI;1703891597;google,chrome,download#http://en.wikipedia.org/wiki/Main_Page;707337708;wiki,en#http://de.wikipedia.org/wiki/Wikipedia:Hauptseite;29662062;wiki,de#http://it.wikipedia.org/wiki/Pagina_principale;603670049;wiki,it#http://pl.wikipedia.org/wiki/Strona_g%C5%82%C3%B3wna;1766380656;wiki,pl#http://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0;4140584211;wiki,ru#http://en.wikipedia.org/wiki/JavaScript;2096752508;wiki,en,javascript#http://ru.wikipedia.org/wiki/JavaScript;4107036794;wiki,ru,javascript#http://mozilla-russia.org/;3737991518;ru,mozilla,firefox,download#http://www.apple.com/safari/download/;3990455274;en,safary,download#http://twitter.com/mozilla_russia;1673934550;ru,mozilla,twitter#http://twitter.com/;4052153918;twitter#http://kino-dom.tv/;1452641284;series,online,kino-dom#http://www.adultmult.ru/;1348446750;adultmult,anime,online#http://www.adultmult.ru/html/robot_chicken.html;3747293679;adultmult,anime,online,Robot Chicken#http://www.adultmult.ru/html/robot_chicken_1s.html;1806827148;adultmult,anime,online,Robot Chicken,s01#http://www.adultmult.ru/html/robot_chicken_2s.html;1151140465;adultmult,anime,online,Robot Chicken,s02#http://www.adultmult.ru/html/robot_chicken_3s.html;3507693626;adultmult,anime,online,Robot Chicken,s03#http://www.adultmult.ru/html/robot_chicken_4s.html;1639814999;adultmult,anime,online,Robot Chicken,s04#http://www.adultmult.ru/html/robot_chicken_5s.html;3632356592;adultmult,anime,online,Robot Chicken,s05#http://twitter.com/adultmult;2511886712;adultmult,twitter#https://addons.mozilla.org/ru/firefox/;1877127016;ru,addons,firefox#http://blog.twitter.com/;968639594;twitter,blog#http://www.yandex.ua/;184450480;yandex,ua#http://nigma.ru/;3408235457;nigma,ru#http://www.youtube.com/watch?v=N6O2ncUKvlg;3617341027;youtube,Just A Dream#http://www.youtube.com/watch?v=SkyfRu-dpvc;3249273778;youtube,Just A Dream,Lyrics#http://www.youtube.com/watch?v=vlesKtSGiLY&feature=rec-LGOUT-exp_fresh+div-1r-5-HM;1378658449;youtube,Final Fantasy#http://www.youtube.com/watch?v=5Cva3Jf-_DM&feature=related;4207527565;youtube,Trance,Bad Boy#http://ru.wikipedia.org/wiki/DDR3_SDRAM;2802745248;wiki,ru,DDR3#http://www.tigir.com/opacity.htm;2574765875;opacity,javascript,CSS#http://en.wikipedia.org/wiki/Shakira;1673170686;wiki,Shakira,en#http://ru.wikipedia.org/wiki/%D0%A8%D0%B0%D0%BA%D0%B8%D1%80%D0%B0;2867995230;wiki,Shakira,ru".split("#");
	return garrTmp;
}

		/*
		function GetPageTags(garr,wnd)//p
		{
			var strAddr = wnd.location.toString();
			var arrPageTags = [];
			var i = findAddr(strAddr, garr);
			if( i>=0 ){
				arrPageTags = garr[i].tags;
			}else{
				var arrTags = extTagsOfAddr(strAddr);
				if( arrTags.length>0 ){
					insertGarr(strAddr, arrTags);
					arrPageTags = arrTags;
				}
			}
			return arrPageTags;
		}
*/

function isArray(a)
{
	return Object.prototype.toString.apply(a) === '[object Array]';
}

		function fnv1a(text)
		{
		    var hash = 2166136261;
		    for (var i = 0; i < text.length; ++i)
		    {
		        hash ^= text.charCodeAt(i);
		        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
		    }
		    return hash >>> 0;
		}

		function findAddr(addr, garr)
		{
			var str = addr.toString();
			for (var i = 0; i < garr.length; i++) {
				if( garr[i].hashAddr == fnv1a(str) ){
					if( garr[i].addr == str ){
						return i;
					}
				}
			}
			return -1;
		}


		// function makeGarr(garrStr)//g
		// {
			// var garr = [];
			// var str = "";
			// var arr = [];
			// var arrTags;
			// for(var i in garrStr ){
				// str = garrStr[i];
				// arr = str.split(";");
				// arrTags = arr[2].split(",");
				// garr.push({
					// addr: arr[0],
					// hashAddr: arr[1],
					// tags: arrTags
				// });
			// }
			// garr.reverse();
			// return garr;
		// }
		
		
		function setGlob(bgUI, strName)
		{
			var obj = globalState[strName];
			var strObj = JSON.stringify(obj);
			bgUI.window.localStorage.setItem("MyTagCloud_"+strName, strObj);
		}
		

		function getGlob(bgUI, strName, defObj)
		{
			var strObj = bgUI.window.localStorage.getItem("MyTagCloud_"+strName);
			//alert(strObj)
			var obj = JSON.parse(strObj);
			if( typeof(obj)=="undefined" || obj==null ){
				obj = defObj;
			}
			return obj;
		}
		
		function makeStrLastMembered(strAddr, arrPageTags)
		{
			var strNow = "";
			if( arrPageTags.length>0 ){
				strNow = strAddr+";"+fnv1a(strAddr)+";"+arrPageTags.join(" ");
			}
			return strNow;
		}
    
    function sort_params(url){
      var pars1=url.split('?')
      var par1=pars1[1]
      if(par1){
        var pars2=par1.split('#')
          pars2[0] = pars2[0].split('&').sort().join('&')
        par1 = pars2.join('#')
        pars1[1] = par1
      }
      return pars1.join('?')
    }
		
function CreateBgUI()
{
	var bgUI = {};
	bgUI.window = window;
	return bgUI;
}

bgUI = CreateBgUI();

//var garr = makeGarr(LoadGarr());
//globalState.garr = garr//getGlob(bgUI, "garr", garr);

function queryPageTags(url, arrPageTags, tab)
{
	if( arrPageTags !== null ){
    var url_norm = sort_params(url)
		//sessionStates[tab.id].page[url].arrPageTags = arrPageTags;
    sessionStates[tab.id].arrPageTags = arrPageTags;
		var i = findAddr(url_norm, globalState.garr);
    var is_exist = i >= 0
    var must_exist = arrPageTags.length > 0
    
    var rec = {
      addr: url_norm,
      hashAddr: fnv1a(url_norm),
      tags: arrPageTags
    }
    
    if (is_exist && must_exist){
      //replace
      globalState.garr[i] = rec
    }
    
    if (is_exist && !must_exist){
      //delete
      globalState.garr.splice(i,1);
    }
    
    if (!is_exist && must_exist){
      //insert
      globalState.garr.push(rec);
    }
    
    var is_modified = is_exist || must_exist
    //console.log(is_modified,bgUI,garr)
		if(is_modified) setGlob(bgUI, "garr")
	}
	//return sessionStates[tab.id].page[url].arrPageTags;
  return sessionStates[tab.id].arrPageTags;
}

function queryTagsBySomeAddrs(arrAddrObj)
{
	var res = {};
	for ( var addr in arrAddrObj ) {
		var addrObj = arrAddrObj[addr];
		res[addr] = {};
		if (addrObj.hasOwnProperty("tags") ){
			res[addr]["tags"] = {};
			res[addr].tags = globalState.garr[i].tags;
		}
	}
	return res;
}

function onTabCreate(tab)
{
	sessionStates[tab.id] = {
		bMustDisplay: null,
		bMustFocusTxtTags: null,
		strLastMembered: "",
		arrSelectedTag: null,
		page: null
	}
}

function onTabUpdate(tab)
{
	if(!sessionStates[tab.id]) onTabCreate(tab);
  var url_norm = sort_params(tab.url)
	sessionStates[tab.id].page = {};
	//sessionStates[tab.id].page[tab.url] = {};
	var i = findAddr(url_norm, globalState.garr);
	if( i>=0 ){
		sessionStates[tab.id].arrPageTags = globalState.garr[i].tags;
                //sessionStates[tab.id].page[tab.url].arrPageTags = globalState.garr[i].tags;
		//sessionStates[tab.id].strLastMembered = makeStrLastMembered(tab.url, globalState.garr[i].tags);
	}else{
		sessionStates[tab.id].arrPageTags = [];
	}
}

// function update_str_last_remembered(tab, url){
	// if(!sessionStates[tab.id]) onTabCreate(tab);
	// var i = findAddr(url, globalState.garr);
	// if( i>=0 ){
		// sessionStates[tab.id].strLastMembered = makeStrLastMembered(url, globalState.garr[i].tags);
	// }
// }

function onMsg(msg, tab)
{
	var answer = {};
  if (msg.hasOwnProperty("page") ){
		answer["page"] = {};
		if( msg.page.hasOwnProperty("arrPageTags") &&
      msg.page.hasOwnProperty("url")){
      //garr modification
			answer.page["arrPageTags"] = queryPageTags(msg.page.url, msg.page.arrPageTags, tab);
		}
		// if( msg.page.hasOwnProperty("url") ){
			// answer.page["url"] = tab.url;
		// }
	}
	if (msg.hasOwnProperty("global") ){
		answer["global"] = {};
		if (msg.global.hasOwnProperty("garr") ){
			if( msg.global.garr === null ){
				answer.global["garr"] = globalState.garr;
			} else {
				answer.global["garr"] = {};
				if (msg.global.garr.hasOwnProperty("addrs") ){
					answer.global.garr["addrs"] = {};
					if( msg.global.garr.addrs !== null ){
						answer.global.garr.addrs = queryTagsBySomeAddrs(msg.global.garr.addrs);
					}
				}
			}
		}
	}
	if (msg.hasOwnProperty("session")){
		var sess = {};
		for ( var prop in msg.session ) {
			if( msg.session[prop] === null ){
				if( !sessionStates[tab.id].hasOwnProperty(prop) ){
					sessionStates[tab.id][prop]=null;
				}
			}else{
				sessionStates[tab.id][prop] = msg.session[prop];
			}
			sess[prop] = sessionStates[tab.id][prop];
		}
		answer["session"] = sess;
	}
	return answer;
}