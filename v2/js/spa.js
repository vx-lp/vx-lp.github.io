(function () {
    /***************** CONSTANTS ******************/
    const URLS = {
        qa: {
            domain: 'lptag-dev.dev.lprnd.net',
            tagjs: 'lptag-dev.dev.lprnd.net'
        },
        alpha: {
            domain: 'lptag-a.liveperson.net',
            tagjs: 'lptag-a.liveperson.net'
        },
        ga: {
            domain: 'lptag.liveperson.net',
            tagjs: 'lptag.liveperson.net'
        }
    }
    const LP_MONITOR = 'window.lpTag=window.lpTag||{},"undefined"==typeof window.lpTag._tagCount?(window.lpTag={site:"{{site}}"||"",section:lpTag.section||"",tagletSection:lpTag.tagletSection||null,autoStart:lpTag.autoStart!==!1,ovr:lpTag.ovr||{domain: "{{domain}}", tagjs: "{{tagjs}}"},_v:"1.7.0",_tagCount:1,protocol:"https:",events:{bind:function(t,e,i){lpTag.defer(function(){lpTag.events.bind(t,e,i)},0)},trigger:function(t,e,i){lpTag.defer(function(){lpTag.events.trigger(t,e,i)},1)}},defer:function(t,e){0==e?(this._defB=this._defB||[],this._defB.push(t)):1==e?(this._defT=this._defT||[],this._defT.push(t)):(this._defL=this._defL||[],this._defL.push(t))},load:function(t,e,i){var n=this;setTimeout(function(){n._load(t,e,i)},0)},_load:function(t,e,i){var n=t;t||(n=this.protocol+"//"+(this.ovr&&this.ovr.domain?this.ovr.domain:"lptag.liveperson.net")+"/tag/tag.js?site="+this.site);var a=document.createElement("script");a.setAttribute("charset",e?e:"UTF-8"),i&&a.setAttribute("id",i),a.setAttribute("src",n),document.getElementsByTagName("head").item(0).appendChild(a)},init:function(){this._timing=this._timing||{},this._timing.start=(new Date).getTime();var t=this;window.attachEvent?window.attachEvent("onload",function(){t._domReady("domReady")}):(window.addEventListener("DOMContentLoaded",function(){t._domReady("contReady")},!1),window.addEventListener("load",function(){t._domReady("domReady")},!1)),"undefined"==typeof window._lptStop&&this.load()},start:function(){this.autoStart=!0},_domReady:function(t){this.isDom||(this.isDom=!0,this.events.trigger("LPT","DOM_READY",{t:t})),this._timing[t]=(new Date).getTime()},vars:lpTag.vars||[],dbs:lpTag.dbs||[],ctn:lpTag.ctn||[],sdes:lpTag.sdes||[],ev:lpTag.ev||[]},lpTag.init()):window.lpTag._tagCount+=1;';
    /*******************CONSTANTS END***************/

    function SPA() {
        this.init();
        this.initUI();
        this.render();
        this.bindUIEvents();
    }

    SPA.prototype.init = function () {
        const queryParams = window.location.search;
        const queryParamsObj = new URLSearchParams(queryParams);
        this.data = {
            accNum: queryParamsObj.get('account'),
            env: queryParamsObj.get('env') || 'alpha',
            state: 'login',
            userName: ''
        };
        this.isAccFromURL = !!this.data.accNum;
        if (this.isAccFromURL) {
            this.injectLPTagMonitor(this.data.env);
        }
    };

    SPA.prototype.injectLPTagMonitor = function (env) {
        const script = document.createElement('script');
        script.innerHTML = LP_MONITOR
            .replace('{{site}}', this.data.accNum)
            .replace('{{domain}}', URLS[env].domain)
            .replace('{{tagjs}}', URLS[env].tagjs);
        document.head.appendChild(script);
    }

    SPA.prototype.initUI = function () {
        this.ui = {
            accNumInputEl: document.querySelector('#lp_account'),
            injectBtnEl: document.querySelector('#lp_btn_inject'),
            loginBtnEl: document.querySelector('#lp_btn_login'),
            userNameInputEl: document.querySelector('#lp_username')
        };
    };

    SPA.prototype.render = function () {
        if (this.isAccFromURL) {
            this.ui.accNumInputEl.value = this.data.accNum;
        } else {
            this.ui.accNumInputEl.value = "";
        }
    };

    SPA.prototype.bindUIEvents = function () {

        this.ui.accNumInputEl.addEventListener('input', function (e) {
            this.data.accNum = e.target.value.trim();
        }.bind(this));

        this.ui.userNameInputEl.addEventListener('input', function (e) {
            this.data.userName = e.target.valueOf.trim();
        })

        this.ui.injectBtnEl.addEventListener('click', function (e) {
            const url = new URL(window.location);
            e.preventDefault();
            url.searchParams.set('account', this.data.accNum);
            if (this.isAccFromURL) {
                window.location.href = window.location.href.replace(/account=(.+)?(&|$)/, 'account=' + this.data.accNum);
            } else {
                const url = new URL()
                if (window.location.href.match(/\?.+/)) {
                    history.pushState(null, window.location.href + '&account=' + this.data.accNum)
                    window.location.replace(window.location.href + '&account=' + this.data.accNum);
                } else {
                    window.location.href = window.location.href + '?account=' + this.data.accNum;
                }
            }
        }.bind(this));

        this.ui.loginBtnEl.addEventListener('click', this.loginLogout.bind(this));

    };

    SPA.prototype.loginLogout = function (e) {
        e.preventDefault();
        window.lpTag = window.lpTag || {};
        window.lpTag.identities = window.lpTag.identities || [];
        if (this.data.state === "login") {
            this.ui.loginBtnEl.innerText = "LOGOUT";
            this.data.state = "logout";
        } else {
            this.data.userName = "";
            this.ui.userNameInputEl.value = "";
            this.ui.loginBtnEl.innerText = "LOGIN";
            this.data.state = "login";
        }
    }

    new SPA();

})();