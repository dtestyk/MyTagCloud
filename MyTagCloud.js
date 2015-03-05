﻿//use underscore.js
//add modifiers via bookmarklets
//modifier for tags subset


//use Object.observe
//  show changes
//  store changes

//arrSelectedTag => garrSelected => arrTag
//arrSelectedTag n arrTag = empty
//additionTags < arrTag
//arrSelectedTag u additionTags => url

//
//global consts
//

const DOWNLOAD_KEY_CODE = 77
const PREV_SELECTED_PAGE_KEY_CODE = 38
const NEXT_SELECTED_PAGE_KEY_CODE = 40

//
//global vars
//
		var garr = [];
    //[{tags:[''], hashAddr:0, addr:''}]
//
//session vars
//

		var sess = {};
    //sess: {
    //  bMustDisplay:false,
    //  bMustFocusTxtTags:false,
    //  arrSelectedTag: [{tag:'', has:false}],
    //  strLastMembered:''
    //}

//
//page vars
//
		var UI = {};
		var garrSelected = [];
		var iRecAddition = 0;
    var garr_selected_only = []
    var index_selected_only = 0
    
    //arrPageTags
    
    //arrTag: [{tag:'',n:0});

    
//
//common functions
//
		function isArray(a)
		{
			return Object.prototype.toString.apply(a) === '[object Array]';
		}
		
		function addHandler(object, event, handler)
		{
			if ( typeof(object.addEventListener) != "undefined" ){
				object.addEventListener(event, handler, false);
			}else if( typeof(object.attachEvent) != "undefined" ){
				object.attachEvent("on" + event, handler);
			}else{
				throw "Incompatible browser";
			}
		}
		
		function addWheelHandler(object, handler)
		{
			function wheel(event)
			{
				var delta = 0;
				if( !event )event = UI.window.event;
				if( event.wheelDelta ){
						delta = event.wheelDelta/120;
						if( UI.window.opera )delta = -delta;
				} else if( event.detail ){
						delta = -event.detail/3;
				}
				if( delta ){
					handler(delta);
				}
				if( event.preventDefault )event.preventDefault();
				event.returnValue = false;
			}
			
			if( object.addEventListener ){
				object.addEventListener('DOMMouseScroll', wheel, false);
			}
			object.onmousewheel = wheel;
		}
		
		function oc(a)
		{
		  var o = {};
		  for(var i=0;i<a.length;i++)
		  {
			o[a[i]]='';
		  }
		  return o;
		}
		
		function getSize(obj) {
			var size = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) size++;
			}
			return size;
		}
		
		function indexOfObj(arr,fld,val) {
		  for (var i = 0; i < arr.length; i++) {
        if (arr[i][fld] == val) return i;
      }
		  return -1;
		}
		
		function IsTopWindow(wnd)
		{
			return (wnd.top == wnd);
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
		
		function display(obj, bFlag)
		{
			if( bFlag ){
				obj.style.display = "inline";
			}else{
				obj.style.display = "none";
			}
		}
		
		function getOpacityProperty(UI)
		{
			if(typeof(UI.doc.body) == "object"){
				if (typeof(UI.doc.body.style.opacity) == 'string')
					return 'opacity';
				else if (typeof(UI.doc.body.style.MozOpacity) == 'string')
					return 'MozOpacity';
				else if (typeof(UI.doc.body.style.KhtmlOpacity) == 'string')
					return 'KhtmlOpacity';
				else if (UI.doc.body.filters)
					return 'filter';
			}
			return false;
		}
		
		function setElementOpacity(UI, elem, nOpacity)
		{
			var opacityProp = getOpacityProperty(UI);
			if (!elem || !opacityProp) return; 
			if( opacityProp=="filter" ){
				nOpacity *= 100;
				var oAlpha = elem.filters['DXImageTransform.Microsoft.alpha'] || elem.filters.alpha;
				if (oAlpha) oAlpha.opacity = nOpacity;
				else elem.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity="+nOpacity+")";
			}
			else
			elem.style[opacityProp] = nOpacity;
		}
		
		function getDocumentWindow(doc)
		{
			if( typeof(doc.parentWindow)=="object" ){
				return doc.parentWindow;
			} else if( typeof(doc.defaultView)=="object" ){
				return doc.defaultView;
			} else {
				return false;
			}
		}
		
		function getDocumentBody(doc)
		{
			if(typeof(doc.getElementsByTagName("body")[0])=="object" ){
				return doc.getElementsByTagName("body")[0];
			}else if(typeof(doc.body)=="object" ){
				return doc.body;
			}else{
				return false;
			}
		}
		
		function setText(UI, obj, str)
		{
			if(UI.doc.all){
				obj.innerText = str;
			}else{
				obj.textContent = str;
			}
		}
		
		function getText(UI, obj)
		{
			if(UI.doc.all){
				return obj.innerText;
			}else{
				return obj.textContent;
			}
		}

		function navigateURL(UI, addr)
		{
			if( typeof(UI.window.navigate) != "undefined" ){
				UI.window.navigate(addr);
			}else{
				UI.window.location = addr;
			}
		}

		function setSess(UI, sess, strName)
		{
			var obj = sess[strName];
			var strObj = JSON.stringify(obj);
			UI.window.sessionStorage.setItem("MyTagCloud_"+strName, strObj);
		}
		

		function getSess(UI, strName, defObj)
		{
			var strObj = UI.window.sessionStorage.getItem("MyTagCloud_"+strName);
			////
			var obj = JSON.parse(strObj);
			if( typeof(obj)=="undefined" || obj==null ){
				obj = defObj;
			}
			return obj;
		}

//
//data functions
//
		function setTabSess(strName)
		{
			var obj = sess[strName];
			var msg={
				session:{}
			};
			msg.session[strName]=obj;
			port.postMessage(msg);
		}

		function getAllSess(UI)
		{
			return {
				bMustDisplay: getSess(UI, "bMustDisplay", true),
				bMustFocusTxtTags: getSess(UI, "bMustFocusTxtTags", false),
				arrSelectedTag: getSess(UI, "arrSelectedTag", []),
			};
		}

		function garrSelect(garr, arrSelectedTag)//p
		{
		//need request to other peers
			var strTag;
			var i, j;
			var isOk;
			var garrSelected = [];
			for( i=0; i<garr.length; i++ ){
				if( typeof(garr[i]) != "function" ){
					isOk = true;
					for( j=0; j<arrSelectedTag.length;j++ ){
						isOk &= ((arrSelectedTag[j].tag in oc(garr[i].tags)) == arrSelectedTag[j].has);
					}
					if( isOk ){
						garrSelected.push(garr[i]);
					}
				}
			}
			garrSelected.sort(function(a,b){
				return (a.tags.length - b.tags.length) ;
			});
			return garrSelected;
		}
		
		function arrTagCreate(garrSelected, arrSelectedTag)//p
		{
			var strTag;
			var i, j, jj;
			var arrTag = [];
			for( i=0; i<garrSelected.length; i++){
				if( typeof garrSelected[i] != "function" ){
					for( j=0; j<garrSelected[i].tags.length; j++) {
						strTag = garrSelected[i].tags[j];
						if( typeof strTag != "function" ){
							if( indexOfObj(arrSelectedTag,"tag",strTag)<0 ){
								jj = indexOfObj(arrTag,"tag",strTag);
								if( jj < 0 ){
									arrTag.push({
										tag: strTag,
										n: 1
									});
								} else {
									++arrTag[jj].n;
								}
							}
						}
					}
				}
			}
			return arrTag;
		}
		
		function findAddr(addr, garr)
		{
		//UI.window.alert(str+"  "+fnv1a(str)+"  " )
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
		function tagSelectFunc(arrSelectedTag, strTag)
		{
			if( indexOfObj(arrSelectedTag,"tag",strTag)<0 ){
				arrSelectedTag.push({
					tag: strTag,
					has: true
				});
			}
			return arrSelectedTag;
		}
    
		function get_garr_selected_only(garrSelected, arrSelectedTag)
		{
      var garr_selected_only = []
			for(var iRec=0; iRec<garrSelected.length; iRec++) {
				if( typeof garrSelected[iRec] != "function" ){
          var related = garrSelected[iRec]
          var tags_related = related.tags
          var is_tags_match = true
          for(var j=0; j<tags_related.length; j++){
            var strTag = tags_related[j]
            var is_related_selected = indexOfObj(arrSelectedTag,"tag",strTag)>=0
					  is_tags_match &= is_related_selected
          }
          if(is_tags_match) garr_selected_only.push(related)
				}
			}
			return garr_selected_only
		}
    
    function get_index_selected_only(get_garr_selected_only, curr_url)
		{
			for(var i=0; i<get_garr_selected_only.length; i++) {
        var related = garrSelected[i]
        var tags_related = related.tags
        var is_now = related.addr == curr_url
        if(is_now) return i
			}
			return -1
		}
    
//
//data actions
//
		function extTagsOfAddr(strAddr)
		{
			var arrTags = [];
			//request to other peers to find Tags of Addr
			return arrTags;
		}
		
		function tagSelect(strTag)
		{
			tagSelectFunc(sess.arrSelectedTag, strTag);
			setTabSess("arrSelectedTag");
		}
		function tagSelectArr(arrTags)
		{
			for( var i=0; i<arrTags.length; i++ ){
				tagSelectFunc(sess.arrSelectedTag, arrTags[i]);
			}
			setTabSess("arrSelectedTag");
		}
		function tagInvert(strTag)
		{
			var i = indexOfObj(sess.arrSelectedTag,"tag",strTag);
			if( sess.arrSelectedTag[i].has ){
				sess.arrSelectedTag[i].has = false;
			}else{
				sess.arrSelectedTag.splice(i, 1);
			}
			setTabSess("arrSelectedTag");
		}
		function delNotHas(arrSelectedTag)
		{
			for( var i=0; i<arrSelectedTag.length; i++ ){
				if( !arrSelectedTag[i].has ){
					arrSelectedTag.splice(i, 1);
					--i;
				}
			}
		}
		function commitSelect(arrTags)
		{
			if(arrTags.length > 0){
				for( var i in sess.arrSelectedTag ){
					sess.arrSelectedTag[i].has=( sess.arrSelectedTag[i].tag in oc(arrTags) );
				}
				for( var i=0; i<arrTags.length; i++ ){
					tagSelectFunc(sess.arrSelectedTag, arrTags[i]);
				}
				//delNotHas(sess.arrSelectedTag);
				setTabSess("arrSelectedTag");
			}
		}
		// function insertGarr(url, tags)
		// {
			// garr.unshift({
				// addr: url,
				// hashAddr: fnv1a(url),
				// tags: tags
			// });
		// }
    
    function download_garr(){
      var str_text = JSON.stringify(garr, null, 2)
      var str_file_name = 'config.json'

      var a = document.createElement('a')
      a.download = str_file_name;
      var oUrl = URL.createObjectURL(new Blob([str_text], {type: 'text/json'}))
      a.href = oUrl
      a.click()
      delete a
      URL.revokeObjectURL(oUrl)
    }
    
    function update_str_last_membered(garr_selected_only, index_selected_only){
      if(garr_selected_only.length > 0 && index_selected_only >= 0){
        var selected = garr_selected_only[index_selected_only]
        sess.strLastMembered = selected.tags.join(' ')
        setTabSess("strLastMembered");
      }
    }

//
//UI handlers
//
		function tagHold(event)
		{
			var obj=(typeof(UI.window.event)!='undefined')?UI.window.event.srcElement:this;
			var strTag = getText(UI, obj);
			tagInvert(strTag);
			ShowAllButPage();
			if( UI.ospTagAddition.innerHTML=="" ){
				ShowPage();
			}
		}
		
		function tagSelectClick(event)
		{
			var obj=(typeof(UI.window.event)!='undefined')?UI.window.event.srcElement:this;
			var strTag = getText(UI, obj);
			tagSelect(strTag);
			ShowAllButPage();
			if( UI.ospTagAddition.innerHTML=="" ){
				ShowPage();
			}
			return true;
		}
		
		function nextAddition(delta)
		{
			var nRecAddition = garrSelected.length;
			if( delta < 0 ){
				iRecAddition = (iRecAddition+1)%nRecAddition;
			} else if( delta > 0 ){
				iRecAddition = (iRecAddition-1+nRecAddition)%nRecAddition;
			}
			ShowAddition(iRecAddition);
		}
		
		function makeFull()
		{
			var additionTags = UI.ospTagAddition.getElementsByTagName("a");
			var strTag;
			var arrTags = [];
			for(var i=0; i<additionTags.length; i++) {
				strTag = getText(UI, additionTags[i]);
				arrTags.push(strTag);
			}
			delNotHas(sess.arrSelectedTag);
			tagSelectArr(arrTags);
			ShowAll();
		}
		
		function remember()
		{
			var strTags = UI.otxTags.value;
			var arrPageTags = strTags
        .split(" ")
        .map(function(s){return s.trim()})
        .filter(function(e){return Boolean(e)});
        
			var curr_url = UI.window.location.toString();
      var str_page_tags = arrPageTags.join(" ");
			//var strNow = strAddr+";"+fnv1a(strAddr)+";"+arrPageTags.join(" ");
			//UI.window.alert("remember\n"+strNow)
			port.postMessage({
				global: {
					garr: null
				},
				session: {
          bMustFocusTxtTags: false,
					strLastMembered: str_page_tags
				},
				page: {
          // used for saving in garr
          url: curr_url,
					arrPageTags: arrPageTags
				}
			});
		}
		
		function cbDisplayChange()
		{
			sess.bMustDisplay = UI.ocbDisplay.checked;
			setTabSess("bMustDisplay");
		}
    
    function on_document_key_down(e)
		{
			if(e.ctrlKey && e.keyCode == DOWNLOAD_KEY_CODE) download_garr()
		}
    
    function on_txt_tags_key_down(e){
      if(
        e.keyCode != PREV_SELECTED_PAGE_KEY_CODE &&
        e.keyCode != NEXT_SELECTED_PAGE_KEY_CODE
      ){
        return
      }
      e.preventDefault()
      var n = garr_selected_only.length
			if(e.keyCode == PREV_SELECTED_PAGE_KEY_CODE){
        var i_prev = Math.max(0, index_selected_only-1)
        ShowSelectedPage(garr_selected_only, i_prev)
      }
      if(e.keyCode == NEXT_SELECTED_PAGE_KEY_CODE){
        var i_next = Math.max(n-1, index_selected_only+1)
        ShowSelectedPage(garr_selected_only, i_next)
      }
		}
//
//UI build
//
		function CreateUI(docIn)
		{
			var UI = {};
			UI.doc = docIn;
			UI.window = getDocumentWindow(UI.doc);
			var oBody = getDocumentBody(UI.doc);
			UI.odvHead = UI.doc.createElement("div");
				UI.odvHead.style.cursor="default";
				UI.odvHead.style.width="100%";
				UI.odvHead.style.position='fixed';
				UI.odvHead.style.zIndex=2147483643;
				UI.odvHead.style.left="0px";
				UI.odvHead.style.top="0px";
				UI.odvHead.style.textAlign='left';
				UI.odvHead.style.margin="0px";
				UI.odvHead.style.padding="0px";
				UI.odvTagSelect = UI.doc.createElement("div");
					//UI.odvTagSelect.style.zIndex=2147483644;
					UI.odvTagSelect.style.textAlign='left';
					UI.odvTagSelect.style.fontSize="20px";
					UI.ospTagSelect = UI.doc.createElement("span");
						//UI.ospTagSelect.style.zIndex=2147483645;
						UI.ospTagSelect.style.textAlign='left';
					UI.odvTagSelect.appendChild(UI.ospTagSelect);
					UI.obtnComplite = UI.doc.createElement("input");
						//UI.obtnComplite.style.zIndex=2147483645;
						UI.obtnComplite.type="button";
						UI.obtnComplite.value=">>";
						UI.obtnComplite.title="complite";
					UI.odvTagSelect.appendChild(UI.obtnComplite);
					UI.ospTagAddition = UI.doc.createElement("span");
						//UI.ospTagAddition.style.zIndex=2147483645;
						UI.ospTagAddition.style.textAlign='left';
					UI.odvTagSelect.appendChild(UI.ospTagAddition);
					
					UI.ospModifiers = UI.doc.createElement("span");
					UI.ospModifiers.innerHTML = "test"
					UI.odvTagSelect.appendChild(UI.ospModifiers);
					
					
				UI.odvHead.appendChild(UI.odvTagSelect);
				var ohr = UI.doc.createElement("hr");
				UI.odvHead.appendChild(ohr);
				UI.odvTagCloud = UI.doc.createElement("div");
				UI.odvHead.appendChild(UI.odvTagCloud);
			oBody.insertBefore(UI.odvHead,oBody.firstChild);
			//oBody.appendChild(UI.odvHead);
			
			UI.odvFooter = UI.doc.createElement("div");
        UI.odvFooter.style.position="fixed";
        UI.odvFooter.style.zIndex=2147483646;
        UI.odvFooter.style.left="0px";
        UI.odvFooter.style.bottom="0px";
        UI.odvFooter.style.width="100%";
          
				UI.odvResult = UI.doc.createElement("div");
        UI.odvResult.style.textAlign = 'left'
				UI.odvFooter.appendChild(UI.odvResult);
        //UI.ohrTagCloud = UI.doc.createElement("hr");
        //UI.odvFooter.appendChild(UI.ohrTagCloud);
        
				UI.otxTags = UI.doc.createElement("input");
					UI.otxTags.type="text";
					UI.otxTags.style.width="100%";
				UI.odvFooter.appendChild(UI.otxTags);
			oBody.appendChild(UI.odvFooter);
			
			UI.ocbDisplay = UI.doc.createElement("input");
				UI.ocbDisplay.type="checkbox";
				UI.ocbDisplay.title="display";
				UI.ocbDisplay.style.position="fixed";
				UI.ocbDisplay.style.zIndex=2147483647;
				UI.ocbDisplay.style.right='0px';
				UI.ocbDisplay.style.top='0px';
			oBody.insertBefore(UI.ocbDisplay,oBody.firstChild);
			//oBody.appendChild(UI.ocbDisplay);
			return UI;
		}
		
		function setStyles(UI)
		{
			UI.odvHead.style.backgroundColor="#f0f7ff";
			setElementOpacity(UI, UI.odvHead, 0.85);
			UI.otxTags.style.backgroundColor="#f0f7ff";
			UI.otxTags.style.border="none";
			setElementOpacity(UI, UI.otxTags, 0.85);
			setElementOpacity(UI, UI.ocbDisplay, 0.5);
		}
		
		function bindEvents(UI)
		{
			addHandler(UI.obtnComplite, "click", makeFull);
			addHandler(UI.otxTags, "blur", remember);
      addHandler(UI.otxTags, "keydown", on_txt_tags_key_down);
			addWheelHandler(UI.odvTagSelect, nextAddition);
			addHandler(UI.ocbDisplay, "click", cbDisplayChange);
      addHandler(UI.doc, "keydown", on_document_key_down);
		}
//
//show
//
		function ShowInput(sess)
		{
			if( sess.strLastMembered != "" ){
				UI.otxTags.value = sess.strLastMembered
        //.split(";")[2];
			}else{
				UI.otxTags.value = "";
			}
		}
		
		function ShowSelected(arrSelectedTag)
		{
			UI.ospTagSelect.innerHTML = "";
			UI.ospModifiers.innerHTML = "";
			var oBr = null;
			for(var i=0; i<arrSelectedTag.length; i++ ){
        var text = arrSelectedTag[i].tag;
				var o = UI.doc.createElement("a");
          setText(UI, o, text);
          o.href="javascript:void(0);";
          addHandler(o,'click',tagHold);
          if( arrSelectedTag[i].has ){
            o.style.backgroundColor = "#ffffff";
          } else {
            o.style.backgroundColor = "#88ddff";
          }
          oBr = UI.doc.createTextNode(" ");
					
				if(text[0] == '!'){
          UI.ospModifiers.appendChild(o);
          UI.ospModifiers.appendChild(oBr);
        }else{
          UI.ospTagSelect.appendChild(o);
          UI.ospTagSelect.appendChild(oBr);
        }
			}
			//if( oBr )UI.ospTagSelect.removeChild(oBr);//??for ospModifiers
			return true;
		}
		
		function ShowCloud(arrTag)
		{
			var arrTagSortByN = arrTag.slice();
			arrTagSortByN.sort(function(a,b){
				return (a.n - b.n);
			});
			
			for(var j=i=0,n=arrTagSortByN.length; i<n;++i){
				if( (i>0) && (arrTagSortByN[i-1].n != arrTagSortByN[i].n) )j=i;
				// изменяется массив arrTagSortByN, изменения отражаются на arrTag
				arrTagSortByN[i].iSize = j/n;
			}
			
			UI.odvTagCloud.innerHTML="";
			var oBr = null;
			for(var i=0; i<arrTag.length; i++) {
				if( typeof(arrTag[i]) != "function" ){
					var o = UI.doc.createElement("a");
					o.style.fontSize=(100+Math.floor(arrTag[i].iSize*61.8)).toString()+"%";
					//o.style.color="#0000ff";
					setText(UI, o, arrTag[i].tag);
					addHandler(o,'click',tagSelectClick);
					o.href="javascript:void(0);";
					UI.odvTagCloud.appendChild(o);
					oBr = UI.doc.createTextNode(" ");
					UI.odvTagCloud.appendChild(oBr);
				}
			}
			if( oBr )UI.odvTagCloud.removeChild(oBr);
			//var bFlag = (UI.odvTagCloud.innerHTML!="");
			//display(UI.ohrTagCloud, bFlag);
		}
    
    function ShowResults(garr_selected_only, index_selected_only)
		{
			UI.odvResult.innerHTML="";
			var oBr = null;
			for(var i=0; i<garr_selected_only.length; i++) {
        var is_now = i == index_selected_only
        var selected = garr_selected_only[i]
        oPointer = UI.doc.createElement("span");
        oPointer.innerHTML = is_now? '&gt;': '&nbsp;&nbsp;'
        UI.odvResult.appendChild(oPointer);
        
        var o = UI.doc.createElement("span");
        var url_view = selected.addr.replace(/^http:\/\//, '')
        setText(UI, o, url_view);
        //o.href=selected.addr;
        UI.odvResult.appendChild(o);
        oBr = UI.doc.createElement("br");
        UI.odvResult.appendChild(oBr);
			}
			if( oBr )UI.odvResult.removeChild(oBr);
		}
		
		function ShowAddition(iRec)
		{
			var strTag;
			UI.ospTagAddition.innerHTML="";
			if( garrSelected.length > 0 ){
				iRec %= garrSelected.length;
				iRec += garrSelected.length;
				iRec %= garrSelected.length;
				var oBr = null;
				for(var j=0; j<garrSelected[iRec].tags.length; j++) {
					strTag = garrSelected[iRec].tags[j];
					if( indexOfObj(sess.arrSelectedTag,"tag",strTag)<0 ){
						var o = UI.doc.createElement("a");
							o.style.color = "#777777";
							setText(UI, o, strTag);
							addHandler(o,'click',tagSelectClick);
							o.href="javascript:void(0);";
						UI.ospTagAddition.appendChild(o);
						oBr = UI.doc.createTextNode(" ");
						UI.ospTagAddition.appendChild(oBr);
					}
				}
				if( oBr )UI.ospTagAddition.removeChild(oBr);
			}
		}
		
		function ShowPage()
		{
			if( typeof(garrSelected[iRecAddition])!="undefined" ){
				if( UI.window.location.toString() != garrSelected[iRecAddition].addr ){
					navigateURL(UI, garrSelected[iRecAddition].addr);
				}
			}
		}
    
    function ShowSelectedPage(garr_selected_only, index)
		{
      var selected = garr_selected_only[index]
			if( typeof selected !="undefined" ){
				if( UI.window.location.toString() != selected.addr ){
          sess["bMustFocusTxtTags"] = true
          setTabSess("bMustFocusTxtTags");
					navigateURL(UI, selected.addr);
				}
			}
		}
		
		function ShowAllButPage()
		{
			//var arrSelectedTag = getSess(UI, "arrSelectedTag", []);
			ShowSelected(sess.arrSelectedTag);
      //related records
			garrSelected = garrSelect(garr, sess.arrSelectedTag);
      //remove tags from sess.arrSelectedTag
			var arrTag = arrTagCreate(garrSelected, sess.arrSelectedTag);
			ShowCloud(arrTag);
      var curr_url = UI.window.location.toString();
      //leave only tags from sess.arrSelectedTag
      garr_selected_only = get_garr_selected_only(garrSelected, sess.arrSelectedTag)
      index_selected_only = get_index_selected_only(garr_selected_only, curr_url)
			ShowResults(garr_selected_only, index_selected_only);
      update_str_last_membered(garr_selected_only, index_selected_only)

			iRecAddition = 0;
			ShowAddition(iRecAddition);
		}
		
		function ShowAll()
		{
			ShowAllButPage();
			ShowPage();
		}

		function ShowDisplay(sess)
		{
      UI.ocbDisplay.checked = sess.bMustDisplay;
			display(UI.odvHead, sess.bMustDisplay);
			display(UI.odvFooter, sess.bMustDisplay);
		}

		function focus_txt_tags(must_focus){
			if(must_focus) UI.otxTags.focus()
		}


//
//message passing
//
	function onMsg(msg)
	{
		//alert(JSON.stringify(msg));
		if( msg.hasOwnProperty("document") ){
			var doc = document;
			if( IsTopWindow(getDocumentWindow(doc)) ){
				UI = CreateUI(doc);
				setStyles(UI);
				bindEvents(UI);
				var url = UI.window.location.toString()
				sess = getAllSess(UI);
				port.postMessage({
					global: {
						garr: null
					},
					session: {
						bMustDisplay: null,
						bMustFocusTxtTags: null,
						arrSelectedTag: null,
						strLastMembered: null
					},
					page: {
						arrPageTags: null,
            url: url
					}
				});
			}
		}
		
		if( msg.hasOwnProperty("session") ){
			for ( var prop in msg.session ) {
				if( msg.session[prop] !== null ){
					sess[prop] = msg.session[prop];
					setSess(UI, sess, prop);
				}
			}
		}
		
		if( msg.hasOwnProperty("global") ){
			if( msg.global.hasOwnProperty("garr") ){
				if( isArray(msg.global.garr) ){
					garr = msg.global.garr;
          console.log(JSON.stringify(garr).split('},').join('},\n'))
				}
			}
		}
		
		if( msg.hasOwnProperty("page") ){
		//alert(sess.strLastMembered+"   "+JSON.stringify(msg.page))
			if(
				msg.page.hasOwnProperty("arrPageTags") &&
				msg.page.arrPageTags !== null
			){
				if( isArray(msg.page.arrPageTags) ){
					commitSelect(msg.page.arrPageTags);
                                        ShowAllButPage();
				}
			}
		}
		
		if( msg.hasOwnProperty("session") ){
			if( msg.session.hasOwnProperty("bMustDisplay") ){
        sess.bMustDisplay = msg.session.bMustDisplay
				ShowDisplay(sess);
			}
			if( msg.session.hasOwnProperty("bMustFocusTxtTags") ){
        sess.bMustFocusTxtTags = msg.session.bMustFocusTxtTags
				focus_txt_tags(sess.bMustFocusTxtTags)
			}
			if( msg.session.hasOwnProperty("arrSelectedTag") ){
				ShowAllButPage();
			}
			if( msg.session.hasOwnProperty("strLastMembered") ){
				sess.strLastMembered = msg.session.strLastMembered;
				ShowInput(msg.session);
			}
		}
	}