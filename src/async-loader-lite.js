(function(w) {

	var e, $, AC;

	w.acReadyEvents = w.acReadyEvents || [];

	if(w.acOnReady) {
		e = w.acOnReady;
		w.acReadyEvents.push(e);
		w.acOnReady = undefined;
	}

	if(w.postScriptLoad) { 
		w.postScriptLoad(); 
		return; 
	}

	w.jqReady = false;
	w.acReady = false;

	w.loadScript = function(url, callback) {
		var js,
				d = w.document,
				head = d.getElementsByTagName('head')[0];

		js = d.createElement('script');
		js.async = true;
		js.src = url;

		if(callback) {
			js.onload = callback;
			js.onreadystatechange = function() { 
				if(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
					callback();
					js.onload = js.onreadystatechange = null;
					head.removeChild(js);
				}
			}
		}

		head.appendChild(js);
	};

	w.postScriptLoad = function() {
		if(!w.jqReady || !w.acReady) { 
			setTimeout(w.postScriptLoad, 60); 
			return; 
		}
		while(w.acReadyEvents.length > 0) {
			var fn = w.acReadyEvents.pop();
			fn();
		}
	};

	$ = w.jQuery;
	if($) {
		w.jqReady = true;
	} else {
		w.loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js", function() { w.jqReady = true;	});
	}

	AC = w.AC;
	if(AC) {
		w.acReady = true;
	} else {
		w.loadScript("https://localhost/store/inc/clientapi/ac-client-api.min.js", function() { w.acReady = true; });
	}

	w.postScriptLoad();

}(window));
