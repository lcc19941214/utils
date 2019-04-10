/**
 * responsive是一个H5页面终端适配方案，了解更多请访问wiki
 * https://wiki.bytedance.com/pages/viewpage.action?pageId=46958167
 * @param  {[Object]} win [window]
 * @param  {[Object]} res [responsive]
 */
;(function(win, res) {
    var doc = win.document,
        docElem = doc.documentElement,
        metaElem = doc.querySelector("meta[name='viewport']"),
        responsiveElem = doc.querySelector("meta[name='responsive']"),
        wdpr = Math.floor(win.devicePixelRatio) || 1, // 解决浏览器各种奇葩dpr
        dprs = [1,2,3],  
        dpr = 0,
        scale = 0,
        tid = 0;

    // 判断浏览器是否支持页面缩放
    res.isScalable = isScalable = (function() {
        if(win.isPGC) {
            return false;
        }
        var isIos = win.navigator.appVersion.match(/iphone/gi),
            isAndroid = win.navigator.appVersion.match(/android/gi),
            isChrome = !!win.chrome; // 判断是不是chrome浏览器，不包括webview
        var ua = win.navigator.userAgent,
            weixin = ua.match(/MicroMessenger\/([\d\.]+)/i);
        if (isIos) {
            var version = ua.match(/(iPhone\sOS)\s([\d_]+)/);
            return parseFloat(version[2]) < 7 ? false : true;
        } else if (isAndroid) {
                var kernelVersion = ua.match(/AppleWebKit\/([\d\.]+)/i),
                UC = ua.match(/UCBrowser\/([\d\.]+)/i),
                QQ = ua.match(/MQQBrowser\/([\d\.]+)/i),
                chrome = ua.match(/Chrome\/([\d\.]+)/i),
                MI = ua.match(/MiuiBrowser/i);
            if (kernelVersion && parseFloat(kernelVersion[1]) >= 537.36 && MI) {
                return true;
            } else if (UC && parseFloat(UC[1]) >= 9.6|| weixin && parseFloat(weixin[1]) >= 6.1) {
               return true;
            } else if(chrome && parseFloat(chrome[1]) >= 30.0 && isChrome){
               return true;
            }else {
                return false;
            }
            return false;
        } else {
            return false;
        }
    })();

    // 获取自定义dpr
    if (responsiveElem && isScalable) {
        content = responsiveElem.getAttribute("content");
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = Math.floor(initialDpr[1]);
            }
        }
    }

    if (!dpr) {
        if(isScalable){
            dpr = dprs.indexOf(wdpr)> -1 ? wdpr : 3;
        }else{
            dpr = 1;
        }
    }
   
    res.dpr = dpr;
    res.scale = scale = 1 / dpr;
    if (!metaElem) {
        var width = scale == 1 ? "width=device-width, " : "";
        metaElem = doc.createElement('meta');
        metaElem.setAttribute('name', 'viewport');
        metaElem.setAttribute('content', width+'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docElem.firstElementChild) {
            docElem.firstElementChild.appendChild(metaElem);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaElem);   
            doc.write(wrap.innerHTML);
        }
    }
    // scaleLock为true时禁止页面再次缩放
    res.changeScale = function(d,scaleLock) {
        if(d != "initial"){
            if(!this.isScalable) {
                this.dpr = 1;
                return;
            }else {
                var d = Math.floor(d) || wdpr;
                this.dpr = dprs.indexOf(d)> -1 ? d : 3;
            }
            this.scale = (1 / this.dpr).toFixed(2);
            this.scaleLock = scaleLock || false;
            
            var metaWidth = this.scale == '1.00' ? 'device-width' : win.innerWidth;
            metaElem.setAttribute("content", "width="+metaWidth+",initial-scale=" + this.scale + ", maximum-scale=" + this.scale + ", minimum-scale=" + this.scale + ", user-scalable=no");
        }
        this.baseFontSize = docElem.getBoundingClientRect().width / 10;
        this.baseFontSize = Math.max(this.baseFontSize, 32);
        docElem.style.fontSize = this.baseFontSize + "px";
        
        // 设置data-dpr便于css hack
        docElem.setAttribute("data-dpr", this.dpr);
    }

    // 解决部分android机在initial-scale不为1时，出现横向滚动条的bug
    docElem.getBoundingClientRect().width > win.innerWidth ? res.changeScale() : res.changeScale("initial");
    
    doc.addEventListener('DOMContentLoaded', function(e) {
        doc.body.style.fontSize = 12 * dpr + 'px';
    }, false);

    win.addEventListener("orientationchange", function(e) {
        clearTimeout(tid);
        if(!res.scaleLock && !window.isPGC){
            tid = setTimeout(res.changeScale,300);
        }
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            if(!res.scaleLock && !window.isPGC){
                tid = setTimeout(res.changeScale,300);
            }
        }
    }, false);

    // 辅助函数
    res.rem2px = function(v) {
        var val = parseFloat(v) *this.dpr * this.baseFontSize;
        if (typeof v === "string" && v.match(/rem$/)) {
            val += "px";
        }
        return val;
    }

    res.px2rem = function(v) {
        var val = parseFloat(v) *this.dpr / this.baseFontSize;
        if (typeof v === "string" && v.match(/px$/)) {
            val += "rem";
        }
        return val;
    }

    res.px2px = function (v) {
        var val = parseFloat(v)*this.dpr;
        if(typeof v === "string" && v.match(/px$/)) {
            val += "px";
        }
        return val;
    }
})(window, window.responsive || (window.responsive = {}));
