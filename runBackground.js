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
	
	onTabUpdate(tab);
	port.postMessage({document: null});
});
