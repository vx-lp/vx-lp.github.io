(function App() {
    let settings = getURLParams(window.location.search) || {};

    const STORAGE_KEY = 'csp';

    const environmentMap = {
        qa : {
            tagDomain: 'lptag-dev.dev.lprnd.net',
        },
        alpha : {
            tagDomain : 'lptag-a.liveperson.net',
        },
        prod : {
            tagDomain : 'lptag.liveperson.net',
        }
    };

    document.querySelector('#account').textContent = settings.account;
    document.querySelector('#env').textContent = settings.env;

    const form = document.forms.csp;
    const formValues = getCSPFromStorage();
    const cspString = getCSPStringFromObj(formValues);

    setFormValues(formValues);
    setCspPolicy(cspString);

    loadLPTag(settings.account, settings.env);
    document.querySelector('#resetCSP').addEventListener('click', function (e) {
        e.preventDefault();
        form.reset();
        let cspData = getCSPDataFromForm(form);
        localStorage.setItem('csp', JSON.stringify(cspData));
        window.location.reload();
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let cspData = getCSPDataFromForm(e.target);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(cspData));
        window.location.reload();
    });

    function setCspPolicy(cspString) {
        const cspEl = document.createElement('meta');
        cspEl.setAttribute("http-equiv","Content-Security-Policy");
        cspEl.setAttribute("content", cspString);
        document.head.appendChild(cspEl);
    }

    function getCSPFromStorage() {
        const data = localStorage.getItem(STORAGE_KEY);
        let parsedData;

        if (data) {
            parsedData = JSON.parse(data);
        }
        return parsedData;
    }

    function setFormValues(formValues) {

        if (formValues) {
            for (let key in formValues) {
                if (formValues.hasOwnProperty(key)) {
                    document.querySelector(`#${key}`).value = formValues[key];
                }
            }
        }
    }

    function getCSPDataFromForm(form) {
        const formData = new FormData(form);
        const keys = formData.keys();
        let data = {};
        for (let key of keys) {
            const value = formData.get(key);
            if (value) {
                data[key] = value;
            }
        }
        return data;
    }

    function getCSPStringFromObj(obj) {
        let cspString = '';

        for (let key in obj) {
            if (obj.hasOwnProperty(key) && obj[key]) {
                cspString += key + ' ' + obj[key] + '; ';
            }
        }

        return cspString;
    }

    function loadLPTag(account, env) {
        // (dynamic) LivePerson Web Tag
        window.lpTag = window.lpTag || {}, "undefined" == typeof window.lpTag._tagCount ? (window.lpTag = { site: account || "", section: lpTag.section || "", tagletSection: lpTag.tagletSection || null, autoStart: lpTag.autoStart !== !1, ovr: lpTag.ovr || { domain: environmentMap[env].tagDomain, tagjs: environmentMap[env].tagDomain }, _v: "1.7.0", _tagCount: 1, protocol: "https:", events: { bind: function (t, e, i) { lpTag.defer(function () { lpTag.events.bind(t, e, i) }, 0) }, trigger: function (t, e, i) { lpTag.defer(function () { lpTag.events.trigger(t, e, i) }, 1) } }, defer: function (t, e) { 0 == e ? (this._defB = this._defB || [], this._defB.push(t)) : 1 == e ? (this._defT = this._defT || [], this._defT.push(t)) : (this._defL = this._defL || [], this._defL.push(t)) }, load: function (t, e, i) { var n = this; setTimeout(function () { n._load(t, e, i) }, 0) }, _load: function (t, e, i) { var n = t; t || (n = this.protocol + "//" + (this.ovr && this.ovr.domain ? this.ovr.domain : "lptag.liveperson.net") + "/tag/tag.js?site=" + this.site); var a = document.createElement("script"); a.setAttribute("charset", e ? e : "UTF-8"), i && a.setAttribute("id", i), a.setAttribute("src", n), document.getElementsByTagName("head").item(0).appendChild(a) }, init: function () { this._timing = this._timing || {}, this._timing.start = (new Date).getTime(); var t = this; window.attachEvent ? window.attachEvent("onload", function () { t._domReady("domReady") }) : (window.addEventListener("DOMContentLoaded", function () { t._domReady("contReady") }, !1), window.addEventListener("load", function () { t._domReady("domReady") }, !1)), "undefined" == typeof window._lptStop && this.load() }, start: function () { this.autoStart = !0 }, _domReady: function (t) { this.isDom || (this.isDom = !0, this.events.trigger("LPT", "DOM_READY", { t: t })), this._timing[t] = (new Date).getTime() }, vars: lpTag.vars || [], dbs: lpTag.dbs || [], ctn: lpTag.ctn || [], sdes: lpTag.sdes || [], ev: lpTag.ev || [] }, lpTag.init()) : window.lpTag._tagCount += 1;
    }

    function getURLParams(search) {
        var queryParams = {}, queryArray, singleQuery;
        queryArray = search.substring(1).split("&");
        for (var i = 0; i < queryArray.length; i++) {
            if (queryArray[i].indexOf("=") > 0) {
                singleQuery = queryArray[i].split("=");
                if (singleQuery.length == 2) {
                    queryParams[decodeURIComponent(singleQuery[0])] = decodeURIComponent(singleQuery[1]);
                }
            }
        }
        return queryParams;
    }
})();