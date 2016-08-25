
if (window.localStorage["__quantity"] == undefined) {window.localStorage["__quantity"]=1};
if (window.localStorage["__id"] == undefined) {window.localStorage["__id"]=0};

if (window.localStorage["__flag"]==undefined) {
	setTimeout(function() {
			if (window.localStorage["__flag"]==undefined){
				document.location.reload();
			}
}, 1000*60);
};




$.get(chrome.extension.getURL('/injected.js'), 
    function(data) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = data;
        document.getElementsByTagName("head")[0].appendChild(script);
        document.getElementsByTagName("body")[0].setAttribute("onload", "ai_on();");

    }
);

