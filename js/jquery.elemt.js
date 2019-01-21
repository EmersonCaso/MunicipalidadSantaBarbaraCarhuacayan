;(function($){var m=$.scrollTo=function(b,h,f){$(window).scrollTo(b,h,f)};m.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1};m.window=function(b){return $(window).scrollable()};$.fn.scrollable=function(){return this.map(function(){var b=this,h=!b.nodeName||$.inArray(b.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!h)return b;var f=(b.contentWindow||b).document||b.ownerDocument||b;return $.browser.safari||f.compatMode=='BackCompat'?f.body:f.documentElement})};$.fn.scrollTo=function(l,j,a){if(typeof j=='object'){a=j;j=0}if(typeof a=='function')a={onAfter:a};if(l=='max')l=9e9;a=$.extend({},m.defaults,a);j=j||a.speed||a.duration;a.queue=a.queue&&a.axis.length>1;if(a.queue)j/=2;a.offset=n(a.offset);a.over=n(a.over);return this.scrollable().each(function(){var k=this,o=$(k),d=l,p,g={},q=o.is('html,body');switch(typeof d){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px)?$/.test(d)){d=n(d);break}d=$(d,this);case'object':if(d.is||d.style)p=(d=$(d)).offset()}$.each(a.axis.split(''),function(b,h){var f=h=='x'?'Left':'Top',i=f.toLowerCase(),c='scroll'+f,r=k[c],s=h=='x'?'Width':'Height';if(p){g[c]=p[i]+(q?0:r-o.offset()[i]);if(a.margin){g[c]-=parseInt(d.css('margin'+f))||0;g[c]-=parseInt(d.css('border'+f+'Width'))||0}g[c]+=a.offset[i]||0;if(a.over[i])g[c]+=d[s.toLowerCase()]()*a.over[i]}else g[c]=d[i];if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],u(s));if(!b&&a.queue){if(r!=g[c])t(a.onAfterFirst);delete g[c]}});t(a.onAfter);function t(b){o.animate(g,j,a.easing,b&&function(){b.call(this,l,a)})};function u(b){var h='scroll'+b;if(!q)return k[h];var f='client'+b,i=k.ownerDocument.documentElement,c=k.ownerDocument.body;return Math.max(i[h],c[h])-Math.min(i[f],c[f])}}).end()};function n(b){return typeof b=='object'?b:{top:b,left:b}}})(jQuery);
/********/
(function($){$.fn.columnize=function(options){var defaults={width:400,columns:false,buildOnce:false,overflow:false,doneFunc:function(){},target:false,ignoreImageLoading:true,float:"left",lastNeverTallest:false};var options=$.extend(defaults,options);return this.each(function(){var $inBox=options.target?$(options.target):$(this);var maxHeight=$(this).height();var $cache=$('<div></div>');var lastWidth=0;var columnizing=false;$cache.append($(this).children().clone(true));if(!options.ignoreImageLoading&&!options.target){if(!$inBox.data("imageLoaded")){$inBox.data("imageLoaded",true);if($(this).find("img").length>0){var func=function($inBox,$cache){return function(){if(!$inBox.data("firstImageLoaded")){$inBox.data("firstImageLoaded","true");$inBox.empty().append($cache.children().clone(true));$inBox.columnize(options);}}}($(this),$cache);$(this).find("img").one("load",func);$(this).find("img").one("abort",func);return;}}}
$inBox.empty();columnizeIt();if(!options.buildOnce){$(window).resize(function(){if(!options.buildOnce&&$.browser.msie){if($inBox.data("timeout")){clearTimeout($inBox.data("timeout"));}
$inBox.data("timeout",setTimeout(columnizeIt,200));}else if(!options.buildOnce){columnizeIt();}else{}});}
function columnize($putInHere,$pullOutHere,$parentColumn,height){while($parentColumn.height()<height&&$pullOutHere[0].childNodes.length){$putInHere.append($pullOutHere[0].childNodes[0]);}
if($putInHere[0].childNodes.length==0)return;var kids=$putInHere[0].childNodes;var lastKid=kids[kids.length-1];$putInHere[0].removeChild(lastKid);var $item=$(lastKid);if($item[0].nodeType==3){var oText=$item[0].nodeValue;var counter2=options.width/18;if(options.accuracy)
counter2=options.accuracy;var columnText;var latestTextNode=null;while($parentColumn.height()<height&&oText.length){if(oText.indexOf(' ',counter2)!='-1'){columnText=oText.substring(0,oText.indexOf(' ',counter2));}else{columnText=oText;}
latestTextNode=document.createTextNode(columnText);$putInHere.append(latestTextNode);if(oText.length>counter2){oText=oText.substring(oText.indexOf(' ',counter2));}else{oText="";}}
if($parentColumn.height()>=height&&latestTextNode!=null){$putInHere[0].removeChild(latestTextNode);oText=latestTextNode.nodeValue+oText;}
if(oText.length){$item[0].nodeValue=oText;}else{return false;}}
if($pullOutHere.children().length){$pullOutHere.prepend($item);}else{$pullOutHere.append($item);}
return $item[0].nodeType==3;}
function split($putInHere,$pullOutHere,$parentColumn,height){if($pullOutHere.children().length){$cloneMe=$pullOutHere.children(":first");$clone=$cloneMe.clone(true);if($clone.attr("nodeType")==1&&!$clone.hasClass("dontend")){$putInHere.append($clone);if($clone.is("img")&&$parentColumn.height()<height+20){$cloneMe.remove();}else if(!$cloneMe.hasClass("dontsplit")&&$parentColumn.height()<height+20){$cloneMe.remove();}else if($clone.is("img")||$cloneMe.hasClass("dontsplit")){$clone.remove();}else{$clone.empty();if(!columnize($clone,$cloneMe,$parentColumn,height)){if($cloneMe.children().length){split($clone,$cloneMe,$parentColumn,height);}}
if($clone.get(0).childNodes.length==0){$clone.remove();}}}}}
function singleColumnizeIt(){if($inBox.data("columnized")&&$inBox.children().length==1){return;}
$inBox.data("columnized",true);$inBox.data("columnizing",true);$inBox.empty();$inBox.append($("<div class='first last column' style='width:98%; padding: 3px; float: "+options.float+";'></div>"));$col=$inBox.children().eq($inBox.children().length-1);$destroyable=$cache.clone(true);if(options.overflow){targetHeight=options.overflow.height;columnize($col,$destroyable,$col,targetHeight);if(!$destroyable.children().find(":first-child").hasClass("dontend")){split($col,$destroyable,$col,targetHeight);}
while(checkDontEndColumn($col.children(":last").length&&$col.children(":last").get(0))){var $lastKid=$col.children(":last");$lastKid.remove();$destroyable.prepend($lastKid);}
var html="";var div=document.createElement('DIV');while($destroyable[0].childNodes.length>0){var kid=$destroyable[0].childNodes[0];for(var i=0;i<kid.attributes.length;i++){if(kid.attributes[i].nodeName.indexOf("jQuery")==0){kid.removeAttribute(kid.attributes[i].nodeName);}}
div.innerHTML="";div.appendChild($destroyable[0].childNodes[0]);html+=div.innerHTML;}
var overflow=$(options.overflow.id)[0];overflow.innerHTML=html;}else{$col.append($destroyable);}
$inBox.data("columnizing",false);if(options.overflow){options.overflow.doneFunc();}}
function checkDontEndColumn(dom){if(dom.nodeType!=1)return false;if($(dom).hasClass("dontend"))return true;if(dom.childNodes.length==0)return false;return checkDontEndColumn(dom.childNodes[dom.childNodes.length-1]);}
function columnizeIt(){if(lastWidth==$inBox.width())return;lastWidth=$inBox.width();var numCols=Math.round($inBox.width()/options.width);if(options.columns)numCols=options.columns;if(numCols<=1){return singleColumnizeIt();}
if($inBox.data("columnizing"))return;$inBox.data("columnized",true);$inBox.data("columnizing",true);$inBox.empty();$inBox.append($("<div style='width:"+(Math.round(100/numCols)-2)+"%; padding: 3px; float: "+options.float+";'></div>"));$col=$inBox.children(":last");$col.append($cache.clone());maxHeight=$col.height();$inBox.empty();var targetHeight=maxHeight/numCols;var firstTime=true;var maxLoops=3;var scrollHorizontally=false;if(options.overflow){maxLoops=1;targetHeight=options.overflow.height;}else if(options.height&&options.width){maxLoops=1;targetHeight=options.height;scrollHorizontally=true;}
for(var loopCount=0;loopCount<maxLoops;loopCount++){$inBox.empty();var $destroyable;try{$destroyable=$cache.clone(true);}catch(e){$destroyable=$cache.clone();}
$destroyable.css("visibility","hidden");for(var i=0;i<numCols;i++){var className=(i==0)?"first column":"column";var className=(i==numCols-1)?("last "+className):className;$inBox.append($("<div class='"+className+"' style='width:"+(Math.round(100/numCols)-2)+"%; float: "+options.float+";'></div>"));}
var i=0;while(i<numCols-(options.overflow?0:1)||scrollHorizontally&&$destroyable.children().length){if($inBox.children().length<=i){$inBox.append($("<div class='"+className+"' style='width:"+(Math.round(100/numCols)-2)+"%; float: "+options.float+";'></div>"));}
var $col=$inBox.children().eq(i);columnize($col,$destroyable,$col,targetHeight);if(!$destroyable.children().find(":first-child").hasClass("dontend")){split($col,$destroyable,$col,targetHeight);}else{}
while(checkDontEndColumn($col.children(":last").length&&$col.children(":last").get(0))){var $lastKid=$col.children(":last");$lastKid.remove();$destroyable.prepend($lastKid);}
i++;}
if(options.overflow&&!scrollHorizontally){var IE6=false;var IE7=(document.all)&&(navigator.appVersion.indexOf("MSIE 7.")!=-1);if(IE6||IE7){var html="";var div=document.createElement('DIV');while($destroyable[0].childNodes.length>0){var kid=$destroyable[0].childNodes[0];for(var i=0;i<kid.attributes.length;i++){if(kid.attributes[i].nodeName.indexOf("jQuery")==0){kid.removeAttribute(kid.attributes[i].nodeName);}}
div.innerHTML="";div.appendChild($destroyable[0].childNodes[0]);html+=div.innerHTML;}
var overflow=$(options.overflow.id)[0];overflow.innerHTML=html;}else{$(options.overflow.id).empty().append($destroyable.children().clone(true));}}else if(!scrollHorizontally){$col=$inBox.children().eq($inBox.children().length-1);while($destroyable.children().length)$col.append($destroyable.children(":first"));var afterH=$col.height();var diff=afterH-targetHeight;var totalH=0;var min=10000000;var max=0;var lastIsMax=false;$inBox.children().each(function($inBox){return function($item){var h=$inBox.children().eq($item).height();lastIsMax=false;totalH+=h;if(h>max){max=h;lastIsMax=true;}
if(h<min)min=h;}}($inBox));var avgH=totalH/numCols;if(options.lastNeverTallest&&lastIsMax){targetHeight=targetHeight+30;if(loopCount==maxLoops-1)maxLoops++;}else if(max-min>30){targetHeight=avgH+30;}else if(Math.abs(avgH-targetHeight)>20){targetHeight=avgH;}else{loopCount=maxLoops;}}else{$inBox.children().each(function(i){$col=$inBox.children().eq(i);$col.width(options.width+"px");if(i==0){$col.addClass("first");}else if(i==$inBox.children().length-1){$col.addClass("last");}else{$col.removeClass("first");$col.removeClass("last");}});$inBox.width($inBox.children().length*options.width+"px");}
$inBox.append($("<br style='clear:both;'>"));}
$inBox.find('.column').find(':first.removeiffirst').remove();$inBox.find('.column').find(':last.removeiflast').remove();$inBox.data("columnizing",false);if(options.overflow){options.overflow.doneFunc();}
options.doneFunc();}});};})(jQuery);
/*****/

function mclose(){
	$.pageslide.close();
	createCookie("vco",0,1);
}
/* Menu */

var ddsmoothmenu={

arrowimages: {down:['downarrowclass', '../images/down.gif'], right:['rightarrowclass', '../images/right.gif']},
transition: {overtime:300, outtime:300}, //duration of slide in/ out animation, in milliseconds
shadow: {enable:false, offsetx:5, offsety:5}, //enable shadow?
showhidedelay: {showdelay: 100, hidedelay: 200}, //set delay in milliseconds before sub menus appear and disappear, respectively

  
detectwebkit: navigator.userAgent.toLowerCase().indexOf("applewebkit")!=-1, //detect WebKit browsers (Safari, Chrome etc)
detectie6: document.all && !window.XMLHttpRequest,
css3support: window.msPerformance || (!document.all && document.querySelector), //detect browsers that support CSS3 box shadows (ie9+ or FF3.5+, Safari3+, Chrome etc)

getajaxmenu:function($, setting){ //function to fetch external page containing the panel DIVs
	var $menucontainer=$('#'+setting.contentsource[0]) //reference empty div on page that will hold menu
	$menucontainer.html("Loading Menu...")
	$.ajax({
		url: setting.contentsource[1], //path to external menu file
		async: true,
		error:function(ajaxrequest){
			$menucontainer.html('Error fetching content. Server Response: '+ajaxrequest.responseText)
		},
		success:function(content){
			$menucontainer.html(content)
			ddsmoothmenu.buildmenu($, setting)
		}
	})
},


buildmenu:function($, setting){
	var smoothmenu=ddsmoothmenu
	var $mainmenu=$("#"+setting.mainmenuid+">ul") //reference main menu UL
	$mainmenu.parent().get(0).className=setting.classname || "ddsmoothmenu"
	var $headers=$mainmenu.find("ul").parent()
	$headers.hover(
		function(e){
			$(this).children('a:eq(0)').addClass('selected')
		},
		function(e){
			$(this).children('a:eq(0)').removeClass('selected')
		}
	)
	$headers.each(function(i){ //loop through each LI header
		var $curobj=$(this).css({zIndex: 100-i}) //reference current LI header
		var $subul=$(this).find('ul:eq(0)').css({display:'block'})
		$subul.data('timers', {})
		this._dimensions={w:this.offsetWidth, h:this.offsetHeight, subulw:$subul.outerWidth(), subulh:$subul.outerHeight()}
		this.istopheader=$curobj.parents("ul").length==1? true : false //is top level header?
		$subul.css({top:this.istopheader && setting.orientation!='v'? this._dimensions.h+"px" : 0})
		$curobj.children("a:eq(0)").css(this.istopheader? {paddingRight: smoothmenu.arrowimages.down[2]} : {}).append( //add arrow images
			'<span class="' + (this.istopheader && setting.orientation!='v'? smoothmenu.arrowimages.down[0] : smoothmenu.arrowimages.right[0])
			+ '" style="border:0;" ></span>'
		)
		if (smoothmenu.shadow.enable && !smoothmenu.css3support){ //if shadows enabled and browser doesn't support CSS3 box shadows
			this._shadowoffset={x:(this.istopheader?$subul.offset().left+smoothmenu.shadow.offsetx : this._dimensions.w), y:(this.istopheader? $subul.offset().top+smoothmenu.shadow.offsety : $curobj.position().top)} //store this shadow's offsets
			if (this.istopheader)
				$parentshadow=$(document.body)
			else{
				var $parentLi=$curobj.parents("li:eq(0)")
				$parentshadow=$parentLi.get(0).$shadow
			}
			this.$shadow=$('<div class="ddshadow'+(this.istopheader? ' toplevelshadow' : '')+'"></div>').prependTo($parentshadow).css({left:this._shadowoffset.x+'px', top:this._shadowoffset.y+'px'})  //insert shadow DIV and set it to parent node for the next shadow div
		}
		$curobj.hover(
			function(e){
				var $targetul=$subul //reference UL to reveal
				var header=$curobj.get(0) //reference header LI as DOM object
				clearTimeout($targetul.data('timers').hidetimer)
				$targetul.data('timers').showtimer=setTimeout(function(){
					header._offsets={left:$curobj.offset().left, top:$curobj.offset().top}
					var menuleft=header.istopheader && setting.orientation!='v'? 0 : header._dimensions.w
					menuleft=(header._offsets.left+menuleft+header._dimensions.subulw>$(window).width())? (header.istopheader && setting.orientation!='v'? -header._dimensions.subulw+header._dimensions.w : -header._dimensions.w) : menuleft //calculate this sub menu's offsets from its parent
					if ($targetul.queue().length<=1){ //if 1 or less queued animations
						$targetul.css({left:menuleft+"px", width:header._dimensions.subulw+'px'}).animate({height:'show',opacity:'show'}, ddsmoothmenu.transition.overtime)
						if (smoothmenu.shadow.enable && !smoothmenu.css3support){
							var shadowleft=header.istopheader? $targetul.offset().left+ddsmoothmenu.shadow.offsetx : menuleft
							var shadowtop=header.istopheader?$targetul.offset().top+smoothmenu.shadow.offsety : header._shadowoffset.y
							if (!header.istopheader && ddsmoothmenu.detectwebkit){ //in WebKit browsers, restore shadow's opacity to full
								header.$shadow.css({opacity:1})
							}
							header.$shadow.css({overflow:'', width:header._dimensions.subulw+'px', left:shadowleft+'px', top:shadowtop+'px'}).animate({height:header._dimensions.subulh+'px'}, ddsmoothmenu.transition.overtime)
						}
					}
				}, ddsmoothmenu.showhidedelay.showdelay)
			},
			function(e){
				var $targetul=$subul
				var header=$curobj.get(0)
				clearTimeout($targetul.data('timers').showtimer)
				$targetul.data('timers').hidetimer=setTimeout(function(){
					$targetul.animate({height:'hide', opacity:'hide'}, ddsmoothmenu.transition.outtime)
					if (smoothmenu.shadow.enable && !smoothmenu.css3support){
						if (ddsmoothmenu.detectwebkit){ //in WebKit browsers, set first child shadow's opacity to 0, as "overflow:hidden" doesn't work in them
							header.$shadow.children('div:eq(0)').css({opacity:0})
						}
						header.$shadow.css({overflow:'hidden'}).animate({height:0}, ddsmoothmenu.transition.outtime)
					}
				}, ddsmoothmenu.showhidedelay.hidedelay)
			}
		) //end hover
	}) //end $headers.each()
	if (smoothmenu.shadow.enable && smoothmenu.css3support){ //if shadows enabled and browser supports CSS3 shadows
		var $toplevelul=$('#'+setting.mainmenuid+' ul li ul')
		var css3shadow=parseInt(smoothmenu.shadow.offsetx)+"px "+parseInt(smoothmenu.shadow.offsety)+"px 5px #aaa" //construct CSS3 box-shadow value
		var shadowprop=["boxShadow", "MozBoxShadow", "WebkitBoxShadow", "MsBoxShadow"] //possible vendor specific CSS3 shadow properties
		for (var i=0; i<shadowprop.length; i++){
			$toplevelul.css(shadowprop[i], css3shadow)
		}
	}
	$mainmenu.find("ul").css({display:'none', visibility:'visible'})
},

init:function(setting){
	if (typeof setting.customtheme=="object" && setting.customtheme.length==2){ //override default menu colors (default/hover) with custom set?
		var mainmenuid='#'+setting.mainmenuid
		var mainselector=(setting.orientation=="v")? mainmenuid : mainmenuid+', '+mainmenuid
		document.write('<style type="text/css">\n'
			+mainselector+' ul li a {background:'+setting.customtheme[0]+';}\n'
			+mainmenuid+' ul li a:hover {background:'+setting.customtheme[1]+';}\n'
		+'</style>')
	}
	this.shadow.enable=(document.all && !window.XMLHttpRequest)? false : this.shadow.enable //in IE6, always disable shadow
	jQuery(document).ready(function($){ //ajax menu?
		if (typeof setting.contentsource=="object"){ //if external ajax menu
			ddsmoothmenu.getajaxmenu($, setting)
		}
		else{ //else if markup menu
			ddsmoothmenu.buildmenu($, setting)
		}
	})
}

} //end ddsmoothmenu variable
/*****/

jQuery(document).ready(function(){
$(".tootltip-popup a").hover(function() {
	$(this).next("em").css("left", $(this).width()/2-$(this).next("em").width()/2);
	$(this).next("em").stop(true, true).animate({opacity: "show", top: "-100"}, "slow");
}, function() {
	$(this).next("em").animate({opacity: "hide", top: "-90"}, "fast");
});
(jQuery)});

/*****/
(function($){
  
  //GROWL OBJECT

  $.Growl = {
    _statsCount: 0,
    show: function(options){
    
      var settings = $.extend({
        "id": ("gs"+$.Growl._statsCount++),
        "icon": false,
        "title": false,
        "message": "",
        "cls": "",
        "speed": 500,
        "timeout":5000
      },options);
      
      if($("#"+settings.id).length!=0){
        $("#"+settings.id).remove();
      }
      
      //append status
      this._getContainer().prepend(
        '<div id="'+settings.id+'" class="growlstatus '+settings.cls+'" style="display:none;"><div class="growlstatusclose"></div>'+settings.message+'</div>'
      );
      
      var status = $("#"+settings.id);
      
      //bind close button
      status.find(".growlstatusclose").bind('click',function(){
        $.Growl.close($(this).parent().attr("id"),true,settings.speed);
      });
      
      //show title
      if(settings.title!==false){
        $("#"+settings.id).prepend('<div class="growltitle">'+settings.title+'</div>');
      }
      
      //show icon
      if(settings.icon!==false){
        
        status.addClass("growlwithicon");
        status.addClass("growlicon_"+settings.icon);
      }
      
      status
      //do not hide on hover
      .hover(
        function(){
          $(this).addClass("growlhover");
        },
        function(){
          $(this).removeClass("growlhover");
          if(settings.timeout!==false){
            window.setTimeout("$.Growl.close('"+settings.id+"')", settings.timeout);
          }
        }
      )      
      //show status+handle timeout
      .fadeIn(settings.speed,function(){
        if(settings.timeout!==false){
          window.setTimeout("$.Growl.close('"+settings.id+"')", settings.timeout);
        }
      });
      
      return settings.id;
    },
    
    close: function(id,force,speed){
      if(arguments.length==0){
        $(".growlstatus",this._getContainer()).hide().remove();
      }else{
          if(!$("#"+id).hasClass("growlhover") || force){
              $("#"+id).animate({opacity:"0.0"}, speed);
              $("#"+id).slideUp(function(){
                  $(this).remove();
				  /**cokiE*/
				  createCookie(id,1,1);
            })
          }
      }
    
    },
    
    _getContainer: function(){
      
      if($("#growlcontainer").length==0) {
        $("body").append('<div id="growlcontainer"></div>');
      }
      
      return $("#growlcontainer");
      
    }
  
  };
  
  
  //HELPER FUNCTIONS
  //--------------------------------------------------------------------
  //
  // none for now

})(jQuery);
/************/
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}