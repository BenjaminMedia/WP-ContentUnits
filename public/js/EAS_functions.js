EAS_flash=1;EAS_proto="http:";if(location.protocol=="https:"){EAS_proto="https:"}EAS_server=EAS_proto+"//eas4.emediate.eu";function EAS_uuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(d){var b=Math.random()*16|0,a=d=="x"?b:(b&3|8);return a.toString(16)})}try{if(typeof parent.EAS_pageviewid!=="undefined"){EAS_pageviewid=parent.EAS_pageviewid}else{EAS_pageviewid=EAS_uuid();if(typeof window.frameElement.EAS_src!=="undefined"){parent.EAS_pageviewid=EAS_pageviewid}}if(window.frameElement.EAS_src.indexOf("pageviewid")==-1){window.frameElement.EAS_src+=";pageviewid="+EAS_pageviewid}}catch(e){if(typeof EAS_pageviewid==="undefined"){EAS_pageviewid=EAS_uuid()}}(function(c){if(typeof c.eas_debug_mode!=="undefined"){return}try{var a=c.top.location.href.split("?")[1];if(a){a=a.split("#")[0].split("&");for(var b in a){if(a[b]&&a[b].split("=")[0]=="eas_debug_mode"){c.eas_debug_mode=(a[b].split("=")[1]=="true")}}}}catch(d){}}(window));function EAS_load(a){document.write('<script type="text/javascript" src="'+a+'"><\/script>')}function EAS_load_script(b,f,d){d=d||document;var c=d.getElementsByTagName("head")[0];var a=d.createElement("script");a.type="text/javascript";a.src=b;a.onreadystatechange=function(){if(a.readyState=="complete"){f()}};a.onload=f;c.appendChild(a)}function EAS_init(d,c){var a=new Date().getTime();var b=EAS_server+"/eas?target=_blank&EASformat=jsvars&EAScus="+d+"&ord="+a;EAS_detect_flash();b+="&EASflash="+EAS_flash;if(c){b+="&"+c}if(b.indexOf("pageviewid")==-1){b+="&pageviewid="+EAS_pageviewid}b+=eas.hlp.getCxProfileCookieData();EAS_load(b)}function EAS_detect_flash(){if(EAS_flash>1){return}var j=11;var d=(navigator.userAgent.indexOf("Opera")!=-1)?true:false;var g=(navigator.appVersion.indexOf("MSIE")!=-1)?true:false;var c=(navigator.appVersion.indexOf("Windows")!=-1)?true:false;if(g&&c&&!d){document.write('<SCRIPT LANGUAGE="VBScript"> \n');document.write("on error resume next \nDim eas_flobj("+j+") \n");for(var f=2;f<=j;f++){document.write("Set eas_flobj("+f+') = CreateObject("ShockwaveFlash.ShockwaveFlash.'+f+'") \n');document.write("if(IsObject(eas_flobj("+f+"))) Then EAS_flash="+f+" \n")}document.write("</SCRIPT> \n")}else{if(navigator.plugins){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var h=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";var a=navigator.plugins["Shockwave Flash"+h].description;var b=parseInt(a.substr(a.indexOf(".")-2,2),10);if(b>1){EAS_flash=b}}}}}function EAS_embed_flash(b,p,a,h,g,r,d,s){var l="",j,m="",k=[],f="eas_"+new Date().getTime()+""+Math.floor(Math.random()*11),c=(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.userAgent.indexOf("Opera")==-1);if(h){var q,o,n;k=h.split(",");for(j=0;j<k.length;j++){q=k[j].indexOf("=");o=k[j].substring(0,q);n=k[j].substring(q+1,k[j].length);if(o.toLowerCase()=="flashvars"){if(typeof g==="undefined"){g=n}else{g+="&"+n}}else{l+='<param name="'+o+'" value="'+n+'" />'}}}if(r&&d){k=r.split(",");for(j=0;j<k.length;j++){g+=(g?"&":"")+k[j]+"="+d+k[j]}}if(g){l+='<param name="FlashVars" value="'+g+'" />'}if(c){m='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+b+'" height="'+p+'" id="'+f+'" name="'+f+'"><param name="movie" value="'+a+'" />';m+=l;m+="</object>"}else{m+='<object type="application/x-shockwave-flash" data="'+a+'" width="'+b+'" height="'+p+'" id="'+f+'" name="'+f+'">';m+=l;m+="</object>"}if(s){container=document.createElement("div");container.innerHTML=m;return container.firstChild}else{document.write(m);return f}}function EAS_show_flash(c,b,d,a){EAS_embed_flash(c,b,d,a)}function EAS_statistics(){if(typeof EAS_cu==="undefined"){return}document.write('<img width="1" height="1" src="'+EAS_server+"/eas?cu="+EAS_cu+";ord="+(new Date()).getTime()+'">')}function EAS_load_fif(c){if(typeof c!=="object"){c={divId:arguments[0],fifSrc:arguments[1],easSrc:arguments[2],width:arguments[3],height:arguments[4],fixedSrc:arguments[5],adjustSize:arguments[6]}}var d=document.createElement("iframe");var i=document.getElementById(c.divId);d.src=c.fifSrc;d.style.width=c.width+"px";d.style.height=c.height+"px";d.style.margin=0;d.style.borderWidth=0;d.style.padding=0;d.scrolling="no";d.frameBorder=0;d.allowTransparency="true";var a=(c.fixedSrc)?c.easSrc:c.easSrc+";fif=y";a+=eas.hlp.getCxProfileCookieData();d.EAS_src=a;if(c.adjustSize){var h=200;var g=15;var f=0;var b=function b(){var q=d.contentDocument||d.contentWindow.document;var r=q.getElementsByTagName("a");var m=null;var n;var o;var p=q.body.clientWidth;var s=q.body.clientHeight;var l;var j;for(var k=r.length-1;k>=0;k--){l=r[k];m=l.getElementsByTagName("*");j=m[0];if(m.length===1&&j.tagName.toLowerCase()==="img"){j.style.display="block";l.style.display="inline-block";n=j.clientWidth;o=j.clientHeight;if(p<n){q.body.style.minWidth=n+"px"}if(s<o){q.body.style.minHeight=o+"px"}}}if(p&&s&&(p!=d.clientWidth||s!=d.clientHeight)){d.style.width=p+"px";d.style.height=s+"px";i.style.width=d.style.width;i.style.height=d.style.height}if(f++<g){setTimeout(b,h)}};d.onload=b}i.appendChild(d)}function EAS_create_iframe(d,c,a,f){var b=document.createElement("iframe"),f=f||"javascript:false";b.src=f;b.style.width=c+"px";b.style.height=a+"px";b.style.margin="0px";b.style.borderWidth="0px";b.style.padding="0px";b.scrolling="no";b.frameBorder="0";b.allowTransparency="true";d.appendChild(b);return b}function EAS_resize_fif(c,b,a){if(typeof inDapIF!=="undefined"){var d=window.frameElement;var f=d.parentNode;if(c){d._width=d.style.width;d._height=d.style.height;d.style.width=b+"px";d.style.height=a+"px"}else{d.style.width=d._width;d.style.height=d._height}f.style.width=d.style.width;f.style.height=d.style.height}}function EAS_ism(id,width,height,minVisibleRatio,url,interval,maxLogInterval,activeTimeout,maxDuration,impTime,date){this.elementId=id;this.width=width;this.height=height;this.minVisibleRatio=minVisibleRatio;this.logUrl=url;this.interval=interval;this.logInterval=0;this.maxLogInterval=maxLogInterval;this.activeTimeout=activeTimeout;this.maxDuration=maxDuration;this.isActive=true;this.activeDuration=0;this.loggedDuration=0;this.totalDuration=0;this.lastActive=0;this.lastLogged=0;this.logEnabled=true;this.debugEnabled=this.getDebug();this.impTime=impTime;this.date=date;this.updateLogInterval=(function(){var f0=1,f1=1;return function(){var f=f0+f1;f0=f1;f1=f;this.logInterval=Math.min(f0*this.interval,this.maxLogInterval)}})();var _this=this,w=window,d=document;if(typeof inDapIF!=="undefined"){w=window.top;d=parent.document}if(
/*@cc_on!@*/
false){this.addEventHandler(d,"focusin",function(){_this.setActive()});this.addEventHandler(d,"focusout",function(){_this.setInactive()})}else{this.addEventHandler(w,"focus",function(){_this.setActive()});this.addEventHandler(w,"blur",function(){_this.setInactive()})}this.addEventHandler(w,"scroll",function(){_this.setActive()});this.addEventHandler(w,"resize",function(){_this.setActive()});this.intervalInstance=setInterval(function(){_this.update()},_this.interval);if(this.debugEnabled){ismElem=document.getElementById(this.elementId);debugWidth=(this.width)-2;if(debugWidth<100){debugWidth=100}this.debugDiv=document.createElement("div");this.debugDiv.style.background="#20AA4F";this.debugDiv.style.position="absolute";this.debugDiv.style.top="0px";this.debugDiv.style.left="0px";this.debugDiv.style.width=debugWidth+"px";this.debugDiv.style.fontSize="10px";this.debugDiv.style.fontFamily="Verdana";this.debugDiv.style.color="#000";this.debugDiv.style.border="1px solid white";this.debugDiv.style.zIndex="1000";ismElem.appendChild(this.debugDiv)}}EAS_ism.prototype.addEventHandler=function(a,c,b){if(a.addEventListener){a.addEventListener(c,b,false)}else{if(a.attachEvent){a.attachEvent("on"+c,b)}}};EAS_ism.prototype.setActive=function(){this.isActive=true;this.lastActive=this.activeDuration};EAS_ism.prototype.setInactive=function(){this.isActive=false};EAS_ism.prototype.getPosition=function(c){var b=document.getElementById(c);if(typeof inDapIF!=="undefined"){b=window.frameElement.parentNode}var a=b.getBoundingClientRect();return{top:a.top,right:a.left+this.width,bottom:a.top+this.height,left:a.left}};EAS_ism.prototype.getWindowSize=function(){var b={width:0,height:0};var a=window;var c=document;if(typeof inDapIF!=="undefined"){a=window.top;c=parent.document}if(typeof a.top.innerWidth==="number"){b.width=a.top.innerWidth;b.height=a.top.innerHeight}else{if(c.documentElement&&(c.documentElement.clientWidth||c.documentElement.clientHeight)){b.width=c.documentElement.clientWidth;b.height=c.documentElement.clientHeight}else{if(c.body&&(c.body.clientWidth||c.body.clientHeight)){b.width=c.body.clientWidth;b.height=c.body.clientHeight}}}return b};EAS_ism.prototype.isHidden=function(c,a){function d(f){return(f.right-f.left)*(f.bottom-f.top)}var b=d(a);a.left=Math.max(0,a.left);a.right=Math.min(a.right,c.width);a.top=Math.max(0,a.top);a.bottom=Math.min(a.bottom,c.height);return(d(a)/b<this.minVisibleRatio)};EAS_ism.prototype.log=function(d){if(d<=0){return}var c=this.logUrl+"&time="+d+"&impTime="+this.impTime+"&date="+this.date;if(this.lastLogged==0){c+="&first"}var a=document.getElementById("EAS_ism");var b=document.createElement("script");b.setAttribute("type","text/javascript");b.setAttribute("id","EAS_ism");b.setAttribute("src",c);if(a==null){document.getElementsByTagName("head")[0].appendChild(b)}else{document.getElementsByTagName("head")[0].replaceChild(b,a)}this.logEnabled=false;this.lastLogged=this.totalDuration;this.updateLogInterval()};EAS_ism.prototype.parseResponse=function(a){if("stop" in a&&!a.stop){this.loggedDuration=this.activeDuration;this.logEnabled=true}};EAS_ism.prototype.update=function(){var b=false;if(this.isActive){if(this.activeDuration>=this.maxDuration||this.activeDuration-this.lastActive>=this.activeTimeout){this.setInactive()}else{var d=document.getElementById(this.elementId);if(!d){this.clearInstance();return}var a=this.getPosition(this.elementId);var c=this.getWindowSize();if(!this.isHidden(c,a)){this.activeDuration+=this.interval;b=true}}}if(this.logEnabled&&this.lastLogged<this.maxDuration){this.totalDuration+=this.interval;if(this.totalDuration-this.lastLogged>=this.logInterval){this.log(this.activeDuration-this.loggedDuration)}}if(this.debugEnabled){this.debug(b)}};EAS_ism.prototype.clearInstance=function clearInstance(){var a=this.elementId+"_fun";clearInterval(this.intervalInstance);if(window[a]){delete window[a]}};EAS_ism.prototype.getDebug=function(){if(typeof EAS_debug_ism!=="undefined"){return EAS_debug_ism}var a="";var b=document;if(typeof inDapIF!=="undefined"){b=parent.document}if(typeof b.cookie!=="undefined"){a=(a=b.cookie.match(new RegExp("(^|;|\\s)eas_debug_ism=([^;]+);?")))?a[2]:""}if(a==""){return false}return true};EAS_ism.prototype.debug=function(a){if(this.debugEnabled&&typeof this.debugDiv!=="undefined"){pos=this.getPosition(this.elementId);if(pos.top<0&&pos.bottom>0){this.debugDiv.style.top=(-pos.top)+"px"}else{this.debugDiv.style.top="0px"}this.debugDiv.innerHTML="&nbsp;"+(this.isActive?"Active":"Idle")+(this.isActive?" and "+(a?"visible":"hidden"):"")+"<br/>&nbsp;In-screen time: "+(this.activeDuration/1000)+(this.logInterval?", Log interval: "+(this.logInterval/1000):"")}};if(!window.eas||!window.eas.hlp){window.eas=window.eas||{};window.eas.hlp={version:"1.2.4",isIE:(navigator.appVersion.indexOf("MSIE")!=-1),win:window.top,doc:function doc(){try{return window.top.document}catch(a){if(window.console&&window.console.error){console.error("File EAS_tag.1.0.js is included inside regular iframe.")}return document}}(),handleError:function handleError(a){if(typeof eas_debug_mode!="undefined"&&eas_debug_mode){eas.hlp.isIE?eas.hlp.error(a.name+": "+a.description):eas.hlp.error({name:a.name,stack:a.stack})}},handleWarn:function handleWarn(a){if(typeof eas_debug_mode!="undefined"&&eas_debug_mode){eas.hlp.isIE?eas.hlp.log(a.name+": "+a.description):eas.hlp.log({name:a.name,stack:a.stack})}},log:function log(a){if(typeof eas_debug_mode!="undefined"&&eas_debug_mode){if(eas.hlp.isIE){if(typeof(console)!="undefined"&&!!console.dir){console.dir(a)}else{if(typeof(console)!="undefined"&&!!console.log&&typeof(JSON)!="undefined"){console.log(JSON.stringify(a))}else{}}}else{console.log(a)}}},error:function error(a){if(typeof eas_debug_mode!="undefined"&&eas_debug_mode){(typeof(console)!="undefined"&&!!console.error)?console.error(a):eas.hlp.log(a)}},getScrollX:function getScrollX(){return window.top.document.body.scrollLeft||window.top.document.documentElement.scrollLeft},getScrollY:function getScrollY(){return window.top.document.body.scrollTop||window.top.document.documentElement.scrollTop},getScreenWidth:function getScreenWidth(){return window.top.innerWidth||parent.document.documentElement.clientWidth||parent.document.documentElement.getElementsByTagName("body")[0].clientWidth},getScreenHeight:function getScreenHeight(){return window.top.innerHeight||parent.document.documentElement.clientHeight||parent.document.documentElement.getElementsByTagName("body")[0].clientHeight},getDocumentHeight:function getDocumentHeight(){return parent.document.documentElement.offsetHeight},getDocumentWidth:function getDocumentWidth(){return parent.document.documentElement.offsetWidth},getFlash:function getFlash(a){if(eas.hlp.isIE){return(window.top||window)[a]||window[a]}else{return(parent.document||document)[a]||document[a]}},contains:function contains(a,b){return a.contains?a.contains(b):!!(a.compareDocumentPosition(b)&16)},addEvent:function addEvent(f,g,d){if(!f||!g||!d){return}if(!f.window&&f.length){for(var b=f.length-1;b>=0;b--){eas.hlp.addEvent(f[b],g,d)}return}if(g.indexOf(" ")>0){var a=g.split(" ");for(var b=a.length-1;b>=0;b--){eas.hlp.addEvent(f,a[b],d)}return}if((g==="mouseenter"||g==="mouseleave")&&(typeof d==="function")){var j=(g==="mouseenter");var h=j?"fromElement":"toElement";var c=function c(l){l=l||window.event;var k=l.target||l.srcElement;var i=l.relatedTarget||l[h];if((f===k||eas.hlp.contains(f,k))&&!eas.hlp.contains(f,i)){d.call(this,l)}};g=j?"mouseover":"mouseout";eas.hlp.addEvent(f,g,c);return c}if(f.addEventListener){f.addEventListener(g,d,false)}else{if(f!=window.top&&f.attachEvent){f.attachEvent("on"+g,d)}else{f["on"+g]=d}}},removeEvent:function removeEvent(d,f,c){if(!d||!f){return}if(!d.window&&d.length){for(var b=d.length-1;b>=0;b--){eas.hlp.removeEvent(d[b],f,c)}return}if(f.indexOf(" ")>0){var a=f.split(" ");for(var b=a.length-1;b>=0;b--){eas.hlp.removeEvent(d,a[b],c)}return}try{if(f==="mouseenter"){f="mouseover"}else{if(f==="mouseleave"){f="mouseout"}}if(d.addEventListener&&c){d.removeEventListener(f,c,false)}else{if(d!=window.top&&d.attachEvent&&c){d.detachEvent("on"+f,c)}else{d["on"+f]=null}}}catch(g){}},triggerEvent:function triggerEvent(b,a,f){var c;try{if(document.createEvent){c=document.createEvent("Event");c.initEvent(a,true,true)}else{c=document.createEventObject();c.eventType=a}c.eventName=a;c.customParams=f;if(document.createEvent){b.dispatchEvent(c)}else{b.fireEvent("on"+c.eventType,c)}}catch(d){eas.hlp.handleError(d)}},preventDefault:function preventDefault(a,c){try{c=c||window;a=a||c.event;if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}}catch(b){}},addFlashListener:function addFlashListener(b,a){try{a=a||window;if(!eas.hlp.win.eas_flashListeners){eas.hlp.win.eas_flashListeners=[]}var d={func:b,context:a};eas.hlp.win.eas_flashListeners.push(d);if(!a.eas_recieveFromFlash){a.eas_recieveFromFlash=eas.hlp.recieveFromFlash;if(a!==eas.hlp.win&&!eas.hlp.win.eas_recieveFromFlash){eas.hlp.win.eas_recieveFromFlash=eas.hlp.recieveFromFlash}}}catch(c){eas.hlp.handleError(c)}},removeFlashListener:function removeFlashListener(c){try{if(!eas.hlp.win.eas_flashListeners){return false}var b=eas.hlp.win.eas_flashListeners;for(var a in b){if(b[a]&&b[a].func==c){delete b[a]}}}catch(d){eas.hlp.handleError(d)}},recieveFromFlash:function recieveFromFlash(a,f,g){try{eas.hlp.log({msg:"Recieved from flash",name:a,command:f,cu_id:g});var c=eas.hlp.win.eas_flashListeners;if(c&&c.length){for(var b in c){c[b].func.call(c[b].context,a,f,g)}}else{eas.hlp.log("No flash listeners registered")}}catch(d){eas.hlp.handleError(d)}},getPos:function getPos(d,b){var a=window,g,c;try{c=d.getBoundingClientRect();g={left:c.left+eas.hlp.getScrollX(),right:c.right+eas.hlp.getScrollX(),top:c.top+eas.hlp.getScrollY(),bottom:c.bottom+eas.hlp.getScrollY()};if(b){while(a!=window.top){d=a.frameElement;a=parent.window;c=d.getBoundingClientRect();g.left+=c.left;g.right+=c.left;g.top+=c.top;g.bottom+=c.top}}}catch(f){eas.hlp.handleError(f)}return g},createDelegate:function createDelegate(b,c){var a=Array.prototype.slice.call(arguments,2);return function(){return c.apply(b,a.length>0?Array.prototype.slice.call(arguments,0).concat(a):arguments)}},setCookie:function setCookie(a,c,g,f,b,d){document.cookie=a+"="+escape(c)+(g?";expires="+new Date(new Date().getTime()+g*1000*60*60*24).toUTCString():"")+(f?";path="+f:"")+(b?";domain="+b:"")+(d?";secure":"")},getCookie:function getCookie(b){var h=document.cookie.split(";");var c="";var f="";var g="";var d=false;for(var a=0;a<h.length;a++){c=h[a].split("=");f=c[0].replace(/^\s+|\s+$/g,"");if(f==b){d=true;if(c.length>1){g=unescape(c[1].replace(/^\s+|\s+$/g,""))}return g;break}c=null;f=""}if(!d){return null}},getScrollbarWidth:function getScrollbarWidth(f){f=f||document;var d=f.createElement("div");d.style.visibility="hidden";d.style.width="100px";f.body.appendChild(d);var b=d.offsetWidth;d.style.overflow="scroll";var a=f.createElement("div");a.style.width="100%";d.appendChild(a);var c=a.offsetWidth;d.parentNode.removeChild(d);return b-c},lockScroll:function lockScroll(f){f=f||window;var d=f.document;var c=d.documentElement;var a=d.body;var b=[f.pageXOffset||c.scrollLeft||a.scrollLeft,f.pageYOffset||c.scrollTop||a.scrollTop];c.setAttribute("data-scroll-position",b);c.setAttribute("data-previous-padding-right",c.style.paddingRight);c.setAttribute("data-previous-overflow",c.style.overflow);c.setAttribute("data-previous-height",c.style.height);a.setAttribute("data-previous-overflow",a.style.overflow);a.setAttribute("data-previous-height",a.style.height);c.style.height=a.style.height="100%";c.style.overflow=a.style.overflow="hidden";c.style.paddingRight=eas.hlp.getScrollbarWidth(d)+"px";f.scrollTo(b[0],b[1])},unlockScroll:function unlockScroll(f){f=f||window;var d=f.document;var c=d.documentElement;var a=d.body;var b=c.getAttribute("data-scroll-position").split(",");c.style.overflow=c.getAttribute("data-previous-overflow");c.style.height=c.getAttribute("data-previous-height");c.style.paddingRight=c.getAttribute("data-previous-padding-right");a.style.overflow=a.getAttribute("data-previous-overflow");a.style.height=a.getAttribute("data-previous-height");c.removeAttribute("data-scroll-position");c.removeAttribute("data-previous-overflow");c.removeAttribute("data-previous-height");c.removeAttribute("data-previous-padding-right");a.removeAttribute("data-previous-overflow");a.removeAttribute("data-previous-height");f.scrollTo(b[0],b[1])},textNodesUnder:function textNodesUnder(c){c=c||document.documentElement;var b=[];if(document.createTreeWalker){var d;var a=document.createTreeWalker(c,NodeFilter.SHOW_TEXT,null,false);while(d=a.nextNode()){b.push(d)}}else{for(c=c.firstChild;c;c=c.nextSibling){if(c.nodeType==3){b.push(c)}else{b=b.concat(eas.hlp.textNodesUnder(c))}}}return b},loadStyle:function loadStyle(b,c){c=c||document;var a=document.createElement("link");a.setAttribute("rel","stylesheet");a.setAttribute("type","text/css");a.setAttribute("href",b);c.getElementsByTagName("head")[0].appendChild(a)},addStyle:function addStyle(a,c,g){if(!a||!c){return}g=g||document;var b=g.createElement("style");var f=a+"{"+c+"}";b.setAttribute("type","text/css");if(b.styleSheet){b.styleSheet.cssText=f}else{var d=g.createTextNode(f);b.appendChild(d)}g.getElementsByTagName("head")[0].appendChild(b)},addLinks:function addLinks(m,u,l,h,n){if(!m){return}try{if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(z,A){var j;if(this==null){throw new TypeError('"this" is null or not defined')}var C=Object(this);var i=C.length>>>0;if(i===0){return -1}var D=+A||0;if(Math.abs(D)===Infinity){D=0}if(D>=i){return -1}j=Math.max(D>=0?D:i-Math.abs(D),0);while(j<i){var B;if(j in C&&C[j]===z){return j}j++}return -1}}for(var w=m.length-1;w>=0;w--){m[w]=m[w].trim()}n=n||eas.hlp.doc.body;var c=eas.hlp.textNodesUnder(n);var r=[];for(var w=c.length-1;w>=0;w--){for(var t=m.length-1;t>=0;t--){if(c[w].nodeValue.indexOf(m[t])>=0){var x=true;for(var f=c[w];f;f=f.parentNode){if(u.indexOf(f.tagName&&f.tagName.toLowerCase())>=0){x=false;break}}if(x){var b=true;for(var s=r.length-1;s>=0;s--){if(r[s]==c[w]){b=false;break}}if(b){r.push(c[w])}}}}}var a=[];for(var w=r.length-1;w>=0;w--){var q=[];for(var t=m.length-1;t>=0;t--){var p=new RegExp("\\b"+m[t]+"\\b","ig");r[w].nodeValue.replace(p,function(i,j){q.push({offset:j,length:i.length})})}q.sort(function(j,i){return j.offset-i.offset});var d=r[w];var g=0;for(var t=0;t<q.length;t++){var b=d.splitText(q[t].offset-g);var o=b.splitText(q[t].length);var v=document.createElement("a");v.target="_blank";v.href=l;v.className=h;d.parentNode.insertBefore(v,b);v.appendChild(b.parentNode.removeChild(b));d.parentNode.normalize();d=o;g+=(q[t].offset-g)+q[t].length;a.push(v)}}return a}catch(y){eas.hlp.handleError(y)}},getCxProfileCookieData:function getCxProfileCookieData(){var a="";var d=eas.hlp.getCookie("cx_profile_data"),b;if(d&&d!="undefined"){try{b=JSON.parse(d)}catch(f){eas.hlp.error("EAS_tag: cannot parse cx_profile_data");eas.hlp.log(d)}for(var c in b){a+="&EAST"+c+"="+b[c].join("|")}}try{if(window.cX&&cX.library){a+="&prnd="+encodeURIComponent(cX.library.m_rnd);a+="&sid="+encodeURIComponent(cX.library.m_siteId);a+="&usi="+encodeURIComponent(cX.getUserId());cX.Array.forEach(cX.library.m_externalUserIds.slice(0,5),function(g,h){a+="&eid"+h+"="+encodeURIComponent(g.id);a+="&eit"+h+"="+encodeURIComponent(g.type)})}}catch(f){}return a},trackEvent:function trackEvent(f,h,d,a){try{var c=EAS_server+"/eas?cu="+f+"&camp="+h+"&no="+d+"&ord="+(new Date().getTime())+"&EASevent="+a;var b=new Image();b.src=c}catch(g){eas.hlp.handleError(g)}},createSwipeSymbol:function createSwipeSymbol(g){var q=g.parentWidth||200;var l=g.parentHeight||100;var p=document.createElement("div");var c="swipe";var a=document.createElement("div");var k=document.createElement("div");var h=document.createElement("div");var o=document.createElement("div");var b=document.createElement("style");document.head.appendChild(b);var n=b.sheet;var f=document.body.textContent?"textContent":"innerText";var m;p.style.position="relative";p.style.maxWidth="170px";p.style.minWidth="130px";p.style.width=(q/1.4)+"px";p.style.height="36px";p.style.margin="0 auto 40px";p.style.overflow="visible";p.style.paddingTop="22px";p.style.zIndex=1000;p.style.color="#fefefe";p.style.fontWeight="bold";p.style.textTransform="uppercase";p.style.fontFamily="Arial, sans-serif";p.style.border="2px solid #fefefe";p.style.borderRadius=h.style.borderRadius=(l/2)+"px/"+(l/2)+"px";h.style.width="100%";h.style.height="100%";h.style.position="absolute";h.style.background="#000000";h.style.opacity="0.3";h.style.textAlign=o.style.textAlign="center";h.style.top=0;o[f]=c;o.style.zIndex=100;o.style.position="relative";a.className="eas_swipe_left_arrow";k.className="eas_swipe_right_arrow";m=[".eas_swipe_left_arrow, .eas_swipe_right_arrow { position: absolute; top: 50%; background-color: #fefefe; text-align: left; width: 1em; height: 1em; border-top-right-radius: 30%; z-index: 100; } ",".eas_swipe_left_arrow:before, .eas_swipe_left_arrow:after, .eas_swipe_right_arrow:before, .eas_swipe_right_arrow:after { content: ''; position: absolute; background-color: inherit; width: 1em; height: 1em; border-top-right-radius: 30%; } ",".eas_swipe_left_arrow { right: 74%; margin-top: -0.7em;-webkit-transform: rotate(-30deg) skewX(-30deg) scale(1,.866); transform: rotate(-30deg) skewX(-30deg) scale(1,.866); } ",".eas_swipe_right_arrow { left: 80%; margin-top: -0.4em;-webkit-transform: rotate(30deg) skewX(-30deg) scale(1,.866); transform: rotate(30deg) skewX(-30deg) scale(1,.866); } ",".eas_swipe_left_arrow:before, .eas_swipe_right_arrow:before { -webkit-transform: rotate(-135deg) skewX(-45deg) scale(1.414,.707) translate(0,-50%); transform: rotate(-135deg) skewX(-45deg) scale(1.414,.707) translate(0,-50%); } ",".eas_swipe_left_arrow:after, .eas_swipe_right_arrow:after { -webkit-transform: rotate(135deg) skewY(-45deg) scale(.707,1.414) translate(50%); transform: rotate(135deg) skewY(-45deg) scale(.707,1.414) translate(50%); }"];for(var j=0,d=m.length;j<d;j++){n.insertRule(m[j],0)}p.appendChild(a);p.appendChild(k);p.appendChild(h);p.appendChild(o);return p}}};
function EAS_load_fif(divId, fifSrc, easSrc, width, height, fixedSrc) {
    var d = document;
    var fif = d.createElement("iframe");
    var div = d.getElementById(divId);

    fif.src = fifSrc;
    fif.style.width = width + "px";
    fif.style.height = height + "px";
    fif.style.margin = "0px";
    fif.style.borderWidth = "0px";
    fif.style.padding = "0px";
    fif.scrolling = "no";
    fif.frameBorder = "0";
    fif.allowTransparency = "true";
    easSrc = (fixedSrc) ? easSrc : easSrc + ";fif=y";
    easSrc += EAS_getCxProfileCookieData();
    fif.EAS_src = easSrc;
    div.appendChild(fif);
}

function EAS_getCookie(check_name) {
    var a_all_cookies = document.cookie.split(';');
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false;

    for (var i = 0; i < a_all_cookies.length; i++) {
        a_temp_cookie = a_all_cookies[i].split('=');

        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

        if (cookie_name == check_name) {
            b_cookie_found = true;
            if (a_temp_cookie.length > 1) {
                cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
            }
            return cookie_value;
        }

        a_temp_cookie = null;
        cookie_name = '';
    }

    if (!b_cookie_found) {
        return null;
    }
}

function EAS_getCxProfileCookieData() {
    var result = '';
    if (typeof EAS_getCookie != 'undefined') {
        var data = EAS_getCookie('cx_profile_data'),
            dataObj;
        if (data && data != 'undefined') {
            try {
                dataObj = JSON.parse(data);
            } catch (e) {
                if (window.console && console.error) {
                    console.error('EAS_fif: cannot parse cx_profile_data');
                    console.log(data);
                }

            }
            for (var category in dataObj) {
                result += '&EAST' + category + '=' + dataObj[category].join('|');
            }
        }
    }
    return result;
}
(function( $ ) {
    $(function() {
        var defaultOffsets = [];
        var maxScrolls = [];

        $.stickybanners = function(elements) {
            $.each(elements, function() {
                var container = $($(this).data('container'));
                var offset = ((($(this).data('offset') && $(this).data('offset') > 0)) ? $(this).data('offset') : $(this).offset().top);

                defaultOffsets.push(offset);

                var max = 0;
                var container = $(this).data('container');
                if(container != '') {
                    container = $(container);
                    if(container.length > 0) {
                        max = (container.offset().top + container.outerHeight()) - $(this).outerHeight();
                    }
                }

                maxScrolls.push(max);
            });

            var checkBanner = function() {
                elements.each(function(i) {
                    var el = $(this);
                    var defaultOffset = defaultOffsets[i];
                    var maxScroll = maxScrolls[i];

                    if(maxScroll > 0) {
                        if($(window).scrollTop() > maxScroll && !el.hasClass('max')) {
                            el.removeClass('fixed').addClass('max');
                        }

                        if($(window).scrollTop() < maxScroll && el.hasClass('max')) {
                            el.removeClass('max');
                        }
                    }

                    if($(window).scrollTop() < defaultOffset && el.hasClass('fixed')) {
                        el.removeClass('fixed');
                    }

                    if($(window).scrollTop() > defaultOffset && !el.hasClass('fixed') && !el.hasClass('max')) {
                        el.addClass('fixed');
                    }
                });
            };

            $(document).off('scroll.stickybanners').on('scroll.stickybanners', function() {
                checkBanner();
            });

            // Initialize so it displays banners when offset < scroll
            checkBanner();
        };

        $.stickybanners($('[data-listen="sticky-banner"]'));

        $(window).off('resize.stickybanners').on('resize.stickybanners', function() {
            $.stickybanners($('[data-listen="sticky-banner"]'));
        });
    });

    /*
     This script makes sure that side banners in the middle of the page
     become fixed when scrolled into view, and reset when scrolled to top
     (to avoid clashing with the horseshoe banners).
     */
    $(document).on('page:change', function() {

        var $banner = $('[data-listen="sticky-banner"]'),
            docHeight = $(document).height();

        if ($banner.children().length && docHeight > 2200) {
            StickyBanner.init({
                $banner: $banner
            });
        } else {
            $banner.hide();
        }
    });

    console.log('inside Sticky Banner');

    var StickyBanner = (function() {
        var s;

        return {
            init: function(settings) {
                s = settings;

                var self = this;

                $(document).on('scroll', function() {

                    if (self.isScrolledIntoView(s.$banner)) {
                        s.$banner.removeClass('static');
                    }

                    if (s.$banner.offset().top < 800) {
                        s.$banner.fadeOut('slow', function() {
                            s.$banner.addClass('static').fadeIn().css('top', 0);
                        });
                    }
                });

            },
            isScrolledIntoView: function(elem) {
                var docViewTop = $(window).scrollTop(),
                    elemTop = $(elem).offset().top;

                if (elemTop < docViewTop) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    })();
})(jQuery);
//# sourceMappingURL=EAS_functions.js.map
