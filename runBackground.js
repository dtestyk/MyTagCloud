console.log('d')


var xhr = function(url, params) {
  return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest()
      xhr.responseType = params&&params.responseType || xhr.responseType
      xhr.timeout = params&&params.timeout || xhr.timeout
      var method = params&&params.method || "GET"
      var data = params&&params.data
      var mime = params&&params.mime
      xhr.open(method, url)
      if(mime) xhr.overrideMimeType(mime)
      xhr.onload = function() {
          if (xhr.status === 200 || xhr.status === 204) {
              resolve(xhr.response)
          } else {
              reject(new Error(xhr.statusText))
          }
      }
      xhr.onerror = function() {
          reject(new Error("network error"))
      }
      xhr.ontimeout = function() {
          reject(new Error("network timeout"));
      }
      if(data) xhr.send(data)
      else xhr.send()
  })
}

chrome.tabs.onCreated.addListener(function(tab){
	onTabCreate(tab);
});

chrome.extension.onConnect.addListener(function(port){
	port.onMessage.addListener(function(msg){
		port.postMessage(onMsg(msg, tab));
	});
	
	var tab = {
		id: port.sender.tab.id,
		url: port.sender.tab.url
	}
	
  
  xhr(chrome.extension.getURL('config.json'))
  .then(function(response){
     // alert(response)
    
    var str_json_garr = response
    var garr = JSON.parse(str_json_garr)
    garr.reverse()
    globalState.garr = getGlob(bgUI, "garr", garr)
    
    onTabUpdate(tab);
    port.postMessage({document: null});
  })
});
