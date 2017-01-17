(function(e,t,n,i){var r=n(e),a=n(t),o=n.fancybox=function(){o.open.apply(this,arguments)},s=navigator.userAgent.match(/msie/),l=null,c=t.createTouch!==i,u=function(e){return e&&e.hasOwnProperty&&e instanceof n},d=function(e){return e&&"string"===n.type(e)},p=function(e){return d(e)&&e.indexOf("%")>0},h=function(e,t){var n=parseInt(e,10)||0;return t&&p(e)&&(n*=o.getViewport()[t]/100),Math.ceil(n)},m=function(e,t){return h(e,t)+"px"};n.extend(o,{version:"2.1.4",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!c,fitToView:!0,aspectRatio:!1,topRatio:.5,leftRatio:.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3e3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+(s?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:n.noop,beforeLoad:n.noop,afterLoad:n.noop,beforeShow:n.noop,afterShow:n.noop,beforeChange:n.noop,beforeClose:n.noop,afterClose:n.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(e,t){return e&&(n.isPlainObject(t)||(t={}),!1!==o.close(!0))?(n.isArray(e)||(e=u(e)?n(e).get():[e]),n.each(e,function(r,a){var s,l,c,p,h,m={};"object"===n.type(a)&&(a.nodeType&&(a=n(a)),u(a)?(m={href:a.data("fancybox-href")||a.attr("href"),title:a.data("fancybox-title")||a.attr("title"),isDom:!0,element:a},n.metadata&&n.extend(!0,m,a.metadata())):m=a),s=t.href||m.href||(d(a)?a:null),l=t.title!==i?t.title:m.title||"",p=(c=t.content||m.content)?"html":t.type||m.type,!p&&m.isDom&&(p=a.data("fancybox-type"),p||(p=(p=a.prop("class").match(/fancybox\.(\w+)/))?p[1]:null)),d(s)&&(p||(o.isImage(s)?p="image":o.isSWF(s)?p="swf":"#"===s.charAt(0)?p="inline":d(a)&&(p="html",c=a)),"ajax"===p&&(h=s.split(/\s+/,2),s=h.shift(),h=h.shift())),c||("inline"===p?s?c=n(d(s)?s.replace(/.*(?=#[^\s]+$)/,""):s):m.isDom&&(c=a):"html"===p?c=s:!p&&!s&&m.isDom&&(p="inline",c=a)),n.extend(m,{href:s,type:p,content:c,title:l,selector:h}),e[r]=m}),o.opts=n.extend(!0,{},o.defaults,t),t.keys!==i&&(o.opts.keys=t.keys?n.extend({},o.defaults.keys,t.keys):!1),o.group=e,o._start(o.opts.index)):void 0},cancel:function(){var e=o.coming;e&&!1!==o.trigger("onCancel")&&(o.hideLoading(),o.ajaxLoad&&o.ajaxLoad.abort(),o.ajaxLoad=null,o.imgPreload&&(o.imgPreload.onload=o.imgPreload.onerror=null),e.wrap&&e.wrap.stop(!0,!0).trigger("onReset").remove(),o.coming=null,o.current||o._afterZoomOut(e))},close:function(e){o.cancel(),!1!==o.trigger("beforeClose")&&(o.unbindEvents(),o.isActive&&(o.isOpen&&!0!==e?(o.isOpen=o.isOpened=!1,o.isClosing=!0,n(".fancybox-item, .fancybox-nav").remove(),o.wrap.stop(!0,!0).removeClass("fancybox-opened"),o.transitions[o.current.closeMethod]()):(n(".fancybox-wrap").stop(!0).trigger("onReset").remove(),o._afterZoomOut())))},play:function(e){var t=function(){clearTimeout(o.player.timer)},i=function(){t(),o.current&&o.player.isActive&&(o.player.timer=setTimeout(o.next,o.current.playSpeed))},r=function(){t(),n("body").unbind(".player"),o.player.isActive=!1,o.trigger("onPlayEnd")};!0===e||!o.player.isActive&&!1!==e?o.current&&(o.current.loop||o.current.index<o.group.length-1)&&(o.player.isActive=!0,n("body").bind({"afterShow.player onUpdate.player":i,"onCancel.player beforeClose.player":r,"beforeLoad.player":t}),i(),o.trigger("onPlayStart")):r()},next:function(e){var t=o.current;t&&(d(e)||(e=t.direction.next),o.jumpto(t.index+1,e,"next"))},prev:function(e){var t=o.current;t&&(d(e)||(e=t.direction.prev),o.jumpto(t.index-1,e,"prev"))},jumpto:function(e,t,n){var r=o.current;r&&(e=h(e),o.direction=t||r.direction[e>=r.index?"next":"prev"],o.router=n||"jumpto",r.loop&&(0>e&&(e=r.group.length+e%r.group.length),e%=r.group.length),r.group[e]!==i&&(o.cancel(),o._start(e)))},reposition:function(e,t){var i,r=o.current,a=r?r.wrap:null;a&&(i=o._getPosition(t),e&&"scroll"===e.type?(delete i.position,a.stop(!0,!0).animate(i,200)):(a.css(i),r.pos=n.extend({},r.dim,i)))},update:function(e){var t=e&&e.type,n=!t||"orientationchange"===t;n&&(clearTimeout(l),l=null),o.isOpen&&!l&&(l=setTimeout(function(){var i=o.current;i&&!o.isClosing&&(o.wrap.removeClass("fancybox-tmp"),(n||"load"===t||"resize"===t&&i.autoResize)&&o._setDimension(),"scroll"===t&&i.canShrink||o.reposition(e),o.trigger("onUpdate"),l=null)},n&&!c?0:300))},toggle:function(e){o.isOpen&&(o.current.fitToView="boolean"===n.type(e)?e:!o.current.fitToView,c&&(o.wrap.removeAttr("style").addClass("fancybox-tmp"),o.trigger("onUpdate")),o.update())},hideLoading:function(){a.unbind(".loading"),n("#fancybox-loading").remove()},showLoading:function(){var e,t;o.hideLoading(),e=n('<div id="fancybox-loading"><div></div></div>').click(o.cancel).appendTo("body"),a.bind("keydown.loading",function(e){27===(e.which||e.keyCode)&&(e.preventDefault(),o.cancel())}),o.defaults.fixed||(t=o.getViewport(),e.css({position:"absolute",top:.5*t.h+t.y,left:.5*t.w+t.x}))},getViewport:function(){var t=o.current&&o.current.locked||!1,n={x:r.scrollLeft(),y:r.scrollTop()};return t?(n.w=t[0].clientWidth,n.h=t[0].clientHeight):(n.w=c&&e.innerWidth?e.innerWidth:r.width(),n.h=c&&e.innerHeight?e.innerHeight:r.height()),n},unbindEvents:function(){o.wrap&&u(o.wrap)&&o.wrap.unbind(".fb"),a.unbind(".fb"),r.unbind(".fb")},bindEvents:function(){var e,t=o.current;t&&(r.bind("orientationchange.fb"+(c?"":" resize.fb")+(t.autoCenter&&!t.locked?" scroll.fb":""),o.update),(e=t.keys)&&a.bind("keydown.fb",function(r){var a=r.which||r.keyCode,s=r.target||r.srcElement;return 27===a&&o.coming?!1:(!(r.ctrlKey||r.altKey||r.shiftKey||r.metaKey||s&&(s.type||n(s).is("[contenteditable]"))||!n.each(e,function(e,s){return t.group.length>1&&s[a]!==i?(o[e](s[a]),r.preventDefault(),!1):n.inArray(a,s)>-1?(o[e](),r.preventDefault(),!1):void 0})),void 0)}),n.fn.mousewheel&&t.mouseWheel&&o.wrap.bind("mousewheel.fb",function(e,i,r,a){for(var s=n(e.target||null),l=!1;s.length&&!l&&!s.is(".fancybox-skin")&&!s.is(".fancybox-wrap");)l=s[0]&&!(s[0].style.overflow&&"hidden"===s[0].style.overflow)&&(s[0].clientWidth&&s[0].scrollWidth>s[0].clientWidth||s[0].clientHeight&&s[0].scrollHeight>s[0].clientHeight),s=n(s).parent();0!==i&&!l&&o.group.length>1&&!t.canShrink&&(a>0||r>0?o.prev(a>0?"down":"left"):(0>a||0>r)&&o.next(0>a?"up":"right"),e.preventDefault())}))},trigger:function(e,t){var i,r=t||o.coming||o.current;if(r){if(n.isFunction(r[e])&&(i=r[e].apply(r,Array.prototype.slice.call(arguments,1))),!1===i)return!1;r.helpers&&n.each(r.helpers,function(t,i){i&&o.helpers[t]&&n.isFunction(o.helpers[t][e])&&(i=n.extend(!0,{},o.helpers[t].defaults,i),o.helpers[t][e](i,r))}),n.event.trigger(e+".fb")}},isImage:function(e){return d(e)&&e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i)},isSWF:function(e){return d(e)&&e.match(/\.(swf)((\?|#).*)?$/i)},_start:function(e){var t,i,r={};if(e=h(e),t=o.group[e]||null,!t)return!1;if(r=n.extend(!0,{},o.opts,t),t=r.margin,i=r.padding,"number"===n.type(t)&&(r.margin=[t,t,t,t]),"number"===n.type(i)&&(r.padding=[i,i,i,i]),r.modal&&n.extend(!0,r,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}}),r.autoSize&&(r.autoWidth=r.autoHeight=!0),"auto"===r.width&&(r.autoWidth=!0),"auto"===r.height&&(r.autoHeight=!0),r.group=o.group,r.index=e,o.coming=r,!1===o.trigger("beforeLoad"))o.coming=null;else{if(i=r.type,t=r.href,!i)return o.coming=null,o.current&&o.router&&"jumpto"!==o.router?(o.current.index=e,o[o.router](o.direction)):!1;if(o.isActive=!0,("image"===i||"swf"===i)&&(r.autoHeight=r.autoWidth=!1,r.scrolling="visible"),"image"===i&&(r.aspectRatio=!0),"iframe"===i&&c&&(r.scrolling="scroll"),r.wrap=n(r.tpl.wrap).addClass("fancybox-"+(c?"mobile":"desktop")+" fancybox-type-"+i+" fancybox-tmp "+r.wrapCSS).appendTo(r.parent||"body"),n.extend(r,{skin:n(".fancybox-skin",r.wrap),outer:n(".fancybox-outer",r.wrap),inner:n(".fancybox-inner",r.wrap)}),n.each(["Top","Right","Bottom","Left"],function(e,t){r.skin.css("padding"+t,m(r.padding[e]))}),o.trigger("onReady"),"inline"===i||"html"===i){if(!r.content||!r.content.length)return o._error("content")}else if(!t)return o._error("href");"image"===i?o._loadImage():"ajax"===i?o._loadAjax():"iframe"===i?o._loadIframe():o._afterLoad()}},_error:function(e){n.extend(o.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:e,content:o.coming.tpl.error}),o._afterLoad()},_loadImage:function(){var e=o.imgPreload=new Image;e.onload=function(){this.onload=this.onerror=null,o.coming.width=this.width,o.coming.height=this.height,o._afterLoad()},e.onerror=function(){this.onload=this.onerror=null,o._error("image")},e.src=o.coming.href,!0!==e.complete&&o.showLoading()},_loadAjax:function(){var e=o.coming;o.showLoading(),o.ajaxLoad=n.ajax(n.extend({},e.ajax,{url:e.href,error:function(e,t){o.coming&&"abort"!==t?o._error("ajax",e):o.hideLoading()},success:function(t,n){"success"===n&&(e.content=t,o._afterLoad())}}))},_loadIframe:function(){var e=o.coming,t=n(e.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",c?"auto":e.iframe.scrolling).attr("src",e.href);n(e.wrap).bind("onReset",function(){try{n(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(e){}}),e.iframe.preload&&(o.showLoading(),t.one("load",function(){n(this).data("ready",1),c||n(this).bind("load.fb",o.update),n(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),o._afterLoad()})),e.content=t.appendTo(e.inner),e.iframe.preload||o._afterLoad()},_preloadImages:function(){var e,t,n=o.group,i=o.current,r=n.length,a=i.preload?Math.min(i.preload,r-1):0;for(t=1;a>=t;t+=1)e=n[(i.index+t)%r],"image"===e.type&&e.href&&((new Image).src=e.href)},_afterLoad:function(){var e,t,i,r,a,s=o.coming,l=o.current;if(o.hideLoading(),s&&!1!==o.isActive)if(!1===o.trigger("afterLoad",s,l))s.wrap.stop(!0).trigger("onReset").remove(),o.coming=null;else{switch(l&&(o.trigger("beforeChange",l),l.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()),o.unbindEvents(),e=s.content,t=s.type,i=s.scrolling,n.extend(o,{wrap:s.wrap,skin:s.skin,outer:s.outer,inner:s.inner,current:s,previous:l}),r=s.href,t){case"inline":case"ajax":case"html":s.selector?e=n("<div>").html(e).find(s.selector):u(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",n('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),s.wrap.bind("onReset",function(){n(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case"image":e=s.tpl.image.replace("{href}",r);break;case"swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+r+'"></param>',a="",n.each(s.swf,function(t,n){e+='<param name="'+t+'" value="'+n+'"></param>',a+=" "+t+'="'+n+'"'}),e+='<embed src="'+r+'" type="application/x-shockwave-flash" width="100%" height="100%"'+a+"></embed></object>"}(!u(e)||!e.parent().is(s.inner))&&s.inner.append(e),o.trigger("beforeShow"),s.inner.css("overflow","yes"===i?"scroll":"no"===i?"hidden":i),o._setDimension(),o.reposition(),o.isOpen=!1,o.coming=null,o.bindEvents(),o.isOpened?l.prevMethod&&o.transitions[l.prevMethod]():n(".fancybox-wrap").not(s.wrap).stop(!0).trigger("onReset").remove(),o.transitions[o.isOpened?s.nextMethod:s.openMethod](),o._preloadImages()}},_setDimension:function(){var e,t,i,r,a,s,l,c,u,d=o.getViewport(),g=0,f=!1,b=!1,f=o.wrap,v=o.skin,y=o.inner,_=o.current,b=_.width,k=_.height,w=_.minWidth,x=_.minHeight,E=_.maxWidth,C=_.maxHeight,T=_.scrolling,S=_.scrollOutside?_.scrollbarWidth:0,A=_.margin,R=h(A[1]+A[3]),I=h(A[0]+A[2]);if(f.add(v).add(y).width("auto").height("auto").removeClass("fancybox-tmp"),A=h(v.outerWidth(!0)-v.width()),e=h(v.outerHeight(!0)-v.height()),t=R+A,i=I+e,r=p(b)?(d.w-t)*h(b)/100:b,a=p(k)?(d.h-i)*h(k)/100:k,"iframe"===_.type){if(u=_.content,_.autoHeight&&1===u.data("ready"))try{u[0].contentWindow.document.location&&(y.width(r).height(9999),s=u.contents().find("body"),S&&s.css("overflow-x","hidden"),a=s.height())}catch(D){}}else(_.autoWidth||_.autoHeight)&&(y.addClass("fancybox-tmp"),_.autoWidth||y.width(r),_.autoHeight||y.height(a),_.autoWidth&&(r=y.width()),_.autoHeight&&(a=y.height()),y.removeClass("fancybox-tmp"));if(b=h(r),k=h(a),c=r/a,w=h(p(w)?h(w,"w")-t:w),E=h(p(E)?h(E,"w")-t:E),x=h(p(x)?h(x,"h")-i:x),C=h(p(C)?h(C,"h")-i:C),s=E,l=C,_.fitToView&&(E=Math.min(d.w-t,E),C=Math.min(d.h-i,C)),t=d.w-R,I=d.h-I,_.aspectRatio?(b>E&&(b=E,k=h(b/c)),k>C&&(k=C,b=h(k*c)),w>b&&(b=w,k=h(b/c)),x>k&&(k=x,b=h(k*c))):(b=Math.max(w,Math.min(b,E)),_.autoHeight&&"iframe"!==_.type&&(y.width(b),k=y.height()),k=Math.max(x,Math.min(k,C))),_.fitToView)if(y.width(b).height(k),f.width(b+A),d=f.width(),R=f.height(),_.aspectRatio)for(;(d>t||R>I)&&b>w&&k>x&&!(g++>19);)k=Math.max(x,Math.min(C,k-10)),b=h(k*c),w>b&&(b=w,k=h(b/c)),b>E&&(b=E,k=h(b/c)),y.width(b).height(k),f.width(b+A),d=f.width(),R=f.height();else b=Math.max(w,Math.min(b,b-(d-t))),k=Math.max(x,Math.min(k,k-(R-I)));S&&"auto"===T&&a>k&&t>b+A+S&&(b+=S),y.width(b).height(k),f.width(b+A),d=f.width(),R=f.height(),f=(d>t||R>I)&&b>w&&k>x,b=_.aspectRatio?s>b&&l>k&&r>b&&a>k:(s>b||l>k)&&(r>b||a>k),n.extend(_,{dim:{width:m(d),height:m(R)},origWidth:r,origHeight:a,canShrink:f,canExpand:b,wPadding:A,hPadding:e,wrapSpace:R-v.outerHeight(!0),skinSpace:v.height()-k}),!u&&_.autoHeight&&k>x&&C>k&&!b&&y.height("auto")},_getPosition:function(e){var t=o.current,n=o.getViewport(),i=t.margin,r=o.wrap.width()+i[1]+i[3],a=o.wrap.height()+i[0]+i[2],i={position:"absolute",top:i[0],left:i[3]};return t.autoCenter&&t.fixed&&!e&&n.h>=a&&n.w>=r?i.position="fixed":t.locked||(i.top+=n.y,i.left+=n.x),i.top=m(Math.max(i.top,i.top+(n.h-a)*t.topRatio)),i.left=m(Math.max(i.left,i.left+(n.w-r)*t.leftRatio)),i},_afterZoomIn:function(){var e=o.current;e&&(o.isOpen=o.isOpened=!0,o.wrap.css("overflow","visible").addClass("fancybox-opened"),o.update(),(e.closeClick||e.nextClick&&o.group.length>1)&&o.inner.css("cursor","pointer").bind("click.fb",function(t){!n(t.target).is("a")&&!n(t.target).parent().is("a")&&(t.preventDefault(),o[e.closeClick?"close":"next"]())}),e.closeBtn&&n(e.tpl.closeBtn).appendTo(o.skin).bind("click.fb",function(e){e.preventDefault(),o.close()}),e.arrows&&o.group.length>1&&((e.loop||e.index>0)&&n(e.tpl.prev).appendTo(o.outer).bind("click.fb",o.prev),(e.loop||e.index<o.group.length-1)&&n(e.tpl.next).appendTo(o.outer).bind("click.fb",o.next)),o.trigger("afterShow"),e.loop||e.index!==e.group.length-1?o.opts.autoPlay&&!o.player.isActive&&(o.opts.autoPlay=!1,o.play()):o.play(!1))},_afterZoomOut:function(e){e=e||o.current,n(".fancybox-wrap").trigger("onReset").remove(),n.extend(o,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null}),o.trigger("afterClose",e)}}),o.transitions={getOrigPosition:function(){var e=o.current,t=e.element,n=e.orig,i={},r=50,a=50,s=e.hPadding,l=e.wPadding,c=o.getViewport();return!n&&e.isDom&&t.is(":visible")&&(n=t.find("img:first"),n.length||(n=t)),u(n)?(i=n.offset(),n.is("img")&&(r=n.outerWidth(),a=n.outerHeight())):(i.top=c.y+(c.h-a)*e.topRatio,i.left=c.x+(c.w-r)*e.leftRatio),("fixed"===o.wrap.css("position")||e.locked)&&(i.top-=c.y,i.left-=c.x),i={top:m(i.top-s*e.topRatio),left:m(i.left-l*e.leftRatio),width:m(r+l),height:m(a+s)}},step:function(e,t){var n,i,r=t.prop;i=o.current;var a=i.wrapSpace,s=i.skinSpace;("width"===r||"height"===r)&&(n=t.end===t.start?1:(e-t.start)/(t.end-t.start),o.isClosing&&(n=1-n),i="width"===r?i.wPadding:i.hPadding,i=e-i,o.skin[r](h("width"===r?i:i-a*n)),o.inner[r](h("width"===r?i:i-a*n-s*n)))},zoomIn:function(){var e=o.current,t=e.pos,i=e.openEffect,r="elastic"===i,a=n.extend({opacity:1},t);delete a.position,r?(t=this.getOrigPosition(),e.openOpacity&&(t.opacity=.1)):"fade"===i&&(t.opacity=.1),o.wrap.css(t).animate(a,{duration:"none"===i?0:e.openSpeed,easing:e.openEasing,step:r?this.step:null,complete:o._afterZoomIn})},zoomOut:function(){var e=o.current,t=e.closeEffect,n="elastic"===t,i={opacity:.1};n&&(i=this.getOrigPosition(),e.closeOpacity&&(i.opacity=.1)),o.wrap.animate(i,{duration:"none"===t?0:e.closeSpeed,easing:e.closeEasing,step:n?this.step:null,complete:o._afterZoomOut})},changeIn:function(){var e,t=o.current,n=t.nextEffect,i=t.pos,r={opacity:1},a=o.direction;i.opacity=.1,"elastic"===n&&(e="down"===a||"up"===a?"top":"left","down"===a||"right"===a?(i[e]=m(h(i[e])-200),r[e]="+=200px"):(i[e]=m(h(i[e])+200),r[e]="-=200px")),"none"===n?o._afterZoomIn():o.wrap.css(i).animate(r,{duration:t.nextSpeed,easing:t.nextEasing,complete:o._afterZoomIn})},changeOut:function(){var e=o.previous,t=e.prevEffect,i={opacity:.1},r=o.direction;"elastic"===t&&(i["down"===r||"up"===r?"top":"left"]=("up"===r||"left"===r?"-":"+")+"=200px"),e.wrap.animate(i,{duration:"none"===t?0:e.prevSpeed,easing:e.prevEasing,complete:function(){n(this).trigger("onReset").remove()}})}},o.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!c,fixed:!0},overlay:null,fixed:!1,create:function(e){e=n.extend({},this.defaults,e),this.overlay&&this.close(),this.overlay=n('<div class="fancybox-overlay"></div>').appendTo("body"),this.fixed=!1,e.fixed&&o.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(e){var t=this;e=n.extend({},this.defaults,e),this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(e),this.fixed||(r.bind("resize.overlay",n.proxy(this.update,this)),this.update()),e.closeClick&&this.overlay.bind("click.overlay",function(e){n(e.target).hasClass("fancybox-overlay")&&(o.isActive?o.close():t.close())}),this.overlay.css(e.css).show()},close:function(){n(".fancybox-overlay").remove(),r.unbind("resize.overlay"),this.overlay=null,!1!==this.margin&&(n("body").css("margin-right",this.margin),this.margin=!1),this.el&&this.el.removeClass("fancybox-lock")},update:function(){var e,n="100%";this.overlay.width(n).height("100%"),s?(e=Math.max(t.documentElement.offsetWidth,t.body.offsetWidth),a.width()>e&&(n=a.width())):a.width()>r.width()&&(n=a.width()),this.overlay.width(n).height(a.height())},onReady:function(e,i){n(".fancybox-overlay").stop(!0,!0),this.overlay||(this.margin=a.height()>r.height()||"scroll"===n("body").css("overflow-y")?n("body").css("margin-right"):!1,this.el=t.all&&!t.querySelector?n("html"):n("body"),this.create(e)),e.locked&&this.fixed&&(i.locked=this.overlay.append(i.wrap),i.fixed=!1),!0===e.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(e,t){t.locked&&(this.el.addClass("fancybox-lock"),!1!==this.margin&&n("body").css("margin-right",h(this.margin)+t.scrollbarWidth)),this.open(e)},onUpdate:function(){this.fixed||this.update()},afterClose:function(e){this.overlay&&!o.isActive&&this.overlay.fadeOut(e.speedOut,n.proxy(this.close,this))}},o.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(e){var t=o.current,i=t.title,r=e.type;if(n.isFunction(i)&&(i=i.call(t.element,t)),d(i)&&""!==n.trim(i)){switch(t=n('<div class="fancybox-title fancybox-title-'+r+'-wrap">'+i+"</div>"),r){case"inside":r=o.skin;break;case"outside":r=o.wrap;break;case"over":r=o.inner;break;default:r=o.skin,t.appendTo("body"),s&&t.width(t.width()),t.wrapInner('<span class="child"></span>'),o.current.margin[2]+=Math.abs(h(t.css("margin-bottom")))}t["top"===e.position?"prependTo":"appendTo"](r)}}},n.fn.fancybox=function(e){var t,i=n(this),r=this.selector||"",s=function(a){var s,l,c=n(this).blur(),u=t;!(a.ctrlKey||a.altKey||a.shiftKey||a.metaKey||c.is(".fancybox-wrap")||(s=e.groupAttr||"data-fancybox-group",l=c.attr(s),l||(s="rel",l=c.get(0)[s]),l&&""!==l&&"nofollow"!==l&&(c=r.length?n(r):i,c=c.filter("["+s+'="'+l+'"]'),u=c.index(this)),e.index=u,!1===o.open(c,e)||!a.preventDefault()))};return e=e||{},t=e.index||0,r&&!1!==e.live?a.undelegate(r,"click.fb-start").delegate(r+":not('.fancybox-item, .fancybox-nav')","click.fb-start",s):i.unbind("click.fb-start").bind("click.fb-start",s),this.filter("[data-fancybox-start=1]").trigger("click"),this},a.ready(function(){if(n.scrollbarWidth===i&&(n.scrollbarWidth=function(){var e=n('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),t=e.children(),t=t.innerWidth()-t.height(99).innerWidth();return e.remove(),t}),n.support.fixedPosition===i){var e=n.support,t=n('<div style="position:fixed;top:20px;"></div>').appendTo("body"),r=20===t[0].offsetTop||15===t[0].offsetTop;t.remove(),e.fixedPosition=r}n.extend(o.defaults,{scrollbarWidth:n.scrollbarWidth(),fixed:n.support.fixedPosition,parent:n("body")})})})(window,document,jQuery);