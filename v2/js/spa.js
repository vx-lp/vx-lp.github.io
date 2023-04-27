(function () {
    /***************** CONSTANTS ******************/
    const ENV_URLS = {
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
    };

    const TEST_PAGE_LOCATIONS = {
        qa: 'lpwmqa',
        alpha: 'lpwma',
        ga: 'lpwm'
    }

    const LP_MONITOR = 'window.lpTag=window.lpTag||{},"undefined"==typeof window.lpTag._tagCount?(window.lpTag={site:"{{site}}"||"",section:lpTag.section||"",tagletSection:lpTag.tagletSection||null,autoStart:lpTag.autoStart!==!1,ovr:lpTag.ovr||{domain: "{{domain}}", tagjs: "{{tagjs}}"},_v:"1.7.0",_tagCount:1,protocol:"https:",events:{bind:function(t,e,i){lpTag.defer(function(){lpTag.events.bind(t,e,i)},0)},trigger:function(t,e,i){lpTag.defer(function(){lpTag.events.trigger(t,e,i)},1)}},defer:function(t,e){0==e?(this._defB=this._defB||[],this._defB.push(t)):1==e?(this._defT=this._defT||[],this._defT.push(t)):(this._defL=this._defL||[],this._defL.push(t))},load:function(t,e,i){var n=this;setTimeout(function(){n._load(t,e,i)},0)},_load:function(t,e,i){var n=t;t||(n=this.protocol+"//"+(this.ovr&&this.ovr.domain?this.ovr.domain:"lptag.liveperson.net")+"/tag/tag.js?site="+this.site);var a=document.createElement("script");a.setAttribute("charset",e?e:"UTF-8"),i&&a.setAttribute("id",i),a.setAttribute("src",n),document.getElementsByTagName("head").item(0).appendChild(a)},init:function(){this._timing=this._timing||{},this._timing.start=(new Date).getTime();var t=this;window.attachEvent?window.attachEvent("onload",function(){t._domReady("domReady")}):(window.addEventListener("DOMContentLoaded",function(){t._domReady("contReady")},!1),window.addEventListener("load",function(){t._domReady("domReady")},!1)),"undefined"==typeof window._lptStop&&this.load()},start:function(){this.autoStart=!0},_domReady:function(t){this.isDom||(this.isDom=!0,this.events.trigger("LPT","DOM_READY",{t:t})),this._timing[t]=(new Date).getTime()},vars:lpTag.vars||[],dbs:lpTag.dbs||[],ctn:lpTag.ctn||[],sdes:lpTag.sdes||[],ev:lpTag.ev||[]},lpTag.init()):window.lpTag._tagCount+=1;';
    /*******************CONSTANTS END***************/

    let userName = '';

    function SPA() {
        this.init();
        this.initUI();
        this.render();
        this.bindUIEvents();
    }

    SPA.prototype.init = function () {
        const queryParams = window.location.search;
        const queryParamsObj = new URLSearchParams(queryParams);

        window.lpTag = window.lpTag || {};
        this.data = {
            accNum: queryParamsObj.get('account'),
            env: queryParamsObj.get('env') || 'alpha',
            action: queryParamsObj.get('username') ? 'logout' : 'login',
            userName: queryParamsObj.get('username') || '',
            isAsyncIdentity: queryParamsObj.get('async_identity') === 'true',
            isSecureIdentity: queryParamsObj.get('secure_identity') === 'true'
        };

        if (this.data.accNum) {
            this.injectLPTagMonitor(this.data.env);
        }

        if (this.data.userName) {
            userName = this.data.userName;
            this.toggleIdentities('login');
            this.isInitialRunWithUsername = true;
        }

    };

    SPA.prototype.injectLPTagMonitor = function (env) {
        const script = document.createElement('script');
        script.innerHTML = LP_MONITOR
            .replace('{{site}}', this.data.accNum)
            .replace('{{domain}}', ENV_URLS[env].domain)
            .replace('{{tagjs}}', ENV_URLS[env].tagjs);
        document.head.appendChild(script);
    }

    SPA.prototype.initUI = function () {
        this.ui = {
            backLink: document.querySelector('#back-link'),
            envSelectEl: document.querySelector('#environment-select'),
            accNumInputEl: document.querySelector('#lp_account'),
            injectBtnEl: document.querySelector('#lp_btn_inject'),
            loginBtnEl: document.querySelector('#lp_btn_login'),
            userNameInputEl: document.querySelector('#lp_username'),
            identityCheckAreaEl: document.querySelector('#identity-check-area'),
            asyncIdentityCheckbox: document.querySelector('#use-async-identity'),
            secureIdentityCheckbox: document.querySelector('#use-secure-identity')
        };
    };

    SPA.prototype.render = function () {
        this.ui.accNumInputEl.value = this.data.accNum;
        this.ui.envSelectEl.value = this.data.env;
        this.ui.userNameInputEl.value = this.data.userName;
        this.ui.backLink.setAttribute('href', '../' + TEST_PAGE_LOCATIONS[this.data.env]);
        if (this.isInitialRunWithUsername) {
            this.data.action = 'logout';
            this.ui.loginBtnEl.innerText = 'LOGOUT';
            this.isInitialRunWithUsername = false;
        }
        if (this.data.userName) {
            this.ui.identityCheckAreaEl.classList.remove('hidden');
        } else {
            this.ui.identityCheckAreaEl.classList.add('hidden');
        }
        this.ui.secureIdentityCheckbox.checked = !!this.data.isSecureIdentity;
        this.ui.asyncIdentityCheckbox.checked = !!this.data.isAsyncIdentity;
    };

    SPA.prototype.bindUIEvents = function () {

        this.ui.accNumInputEl.addEventListener('input', function (e) {
            this.data.accNum = e.target.value.trim();
        }.bind(this));

        this.ui.userNameInputEl.addEventListener('input', function (e) {
            this.data.userName = e.target.value.trim();
            userName = this.data.userName;
            this.render();
        }.bind(this));

        this.ui.injectBtnEl.addEventListener('click', function (e) {
            const url = new URL(window.location);
            e.preventDefault();
            if (!this.data.accNum) {
                alert('Account is missed');
                return;
            }
            url.searchParams.set('account', this.data.accNum);
            url.searchParams.set('env', this.data.env);
            if (this.data.userName) {
                url.searchParams.set('username', this.data.userName);
            } else {
                url.searchParams.delete('username');
            }
            window.location.replace(url);
        }.bind(this));

        this.ui.loginBtnEl.addEventListener('click', this.loginLogout.bind(this));

        this.ui.envSelectEl.addEventListener('change', function (e) {
            this.data.env = e.target.value;
            this.data.accNum = '';
            this.render();
        }.bind(this));

        this.ui.asyncIdentityCheckbox.addEventListener('change', function (e) {
            if (e.target.checked) {
                this.data.isAsyncIdentity = true;
                setQueryParam('async_identity', this.data.isAsyncIdentity);
            } else {
                this.data.isAsyncIdentity = false;
                removeQueryParam('async_identity');
            }
            this.render();
        }.bind(this));

        this.ui.secureIdentityCheckbox.addEventListener('change', function (e) {
            if (e.target.checked) {
                this.data.isSecureIdentity = true;
                setQueryParam('secure_identity', this.data.isSecureIdentity);
            } else {
                this.data.isSecureIdentity = false;
                removeQueryParam('secure_identity');
            }
            this.render();
        }.bind(this));

    };

    SPA.prototype.loginLogout = function (e) {
        e.preventDefault();
        if (this.data.accNum.trim().length === 0) {
            return;
        }
        if (this.data.action === 'login' && !this.data.userName) {
            return;
        }
        window.lpTag = window.lpTag || {};
        window.lpTag.identities = window.lpTag.identities || [];
        this.callNewPage();
        if (this.data.action === 'login') {
            this.data.action = 'logout';
            this.ui.loginBtnEl.innerText = 'LOGOUT';
            if (this.data.userName) {
                setQueryParam('async_identity', this.data.isAsyncIdentity);
                setQueryParam('secure_identity', this.data.isSecureIdentity);
                setQueryParam('username', this.data.userName);
            }
        } else {
            this.data.userName = '';
            userName = '';
            this.data.isSecureIdentity = false;
            this.data.isAsyncIdentity = false;
            this.data.action = 'login';
            this.ui.userNameInputEl.value = '';
            this.ui.secureIdentityCheckbox.checked = false;
            this.ui.asyncIdentityCheckbox.checked = false;
            this.ui.identityCheckAreaEl.classList.add('hidden');
            this.ui.loginBtnEl.innerText = 'LOGIN';
            removeQueryParam('username');
            removeQueryParam('async_identity');
            removeQueryParam('secure_identity');
        }
    }

    SPA.prototype.callNewPage = function () {
        this.toggleIdentities(this.data.action);
        lpTag.newPage(window.location.href);
    }

    SPA.prototype.toggleIdentities = function (action) {
        const self = this;
        lpTag.identities = lpTag.identities || [];
        lpTag.sdes = lpTag.sdes || [];
        if (action === 'login') {
            lpTag.identities.push(getAuthData);
            lpTag.sdes.push({type: 'ctmrinfo', info: {customerId: 'lpTest' + userName}});
            this.setAuthMethods();
        } else {
            let index = lpTag.identities.indexOf(getAuthData);
            if (index > -1) {
                lpTag.identities.splice(index, 1);
            }
            this.removeAuthMethods();
        }
    }

    SPA.prototype.setAuthMethods = function () {
        var self = this;

        function authMethod(callback) {
            if (self.data.isSecureIdentity) {
                callback({ssoKey: userName, redirect_uri: window.location.href});
            } else {
                callback(userName);
            }
        }

        window.LPJsMethodName = authMethod;
        window.LPGetAuthenticationToken = authMethod;
    }

    SPA.prototype.removeAuthMethods = function () {
        delete window.LPJsMethodName;
        delete window.LPGetAuthenticationToken;
    }

    const app = new SPA();

    //Helper functions

    function getAuthData (callback) {
        if (userName) {
            const authData = {
                iss: 'LivePerson',
                acr: 'loa1'
            }
            if (app.data.isSecureIdentity) {
                authData.tkn = userName;
                authData.redirect_uri = window.location.href;
            } else {
                authData.sub = userName;
            }
            if (app.data.isAsyncIdentity) {
                setTimeout(function () {
                    callback(authData);
                }, 1500);
            } else {
                callback(authData);
            }
        } else {
            callback(null);
        }
    }

    function setQueryParam(name, value) {
        const queryParams = window.location.search;
        const queryParamsObj = new URLSearchParams(queryParams);
        const url = window.location.href;
        queryParamsObj.set(name, value);
        history.pushState({}, '', url.replace(/\?.+$/, '?' + queryParamsObj.toString()));
    }

    function removeQueryParam(name) {
        const queryParams = window.location.search;
        const queryParamsObj = new URLSearchParams(queryParams);
        const url = window.location.href;
        if (queryParamsObj.has(name)) {
            queryParamsObj.delete(name);
            history.pushState({}, '', url.replace(/\?.+$/, '?' + queryParamsObj.toString()));
        }
    }
})();
