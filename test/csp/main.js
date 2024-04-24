const environmentMap = {
    qa : {
        tagDomain: 'lp-lptag-app.qa.int.gw.lpcloud.io',
    },
    alpha : {
        tagDomain : 'lptag-a.liveperson.net',
    },
    prod : {
        tagDomain : 'lptag.liveperson.net',
    }
};

function getURLParams(search) {
    var queryParams = {}, queryArray, singleQuery;
    queryArray = search.substr(1).split("&");
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

var settings = {
    environment: getURLParams(window.location.search).environment || "",
    account: getURLParams(window.location.search).account || ""
}

// (dynamic) LivePerson Web Tag
window.lpTag = window.lpTag || {}, "undefined" == typeof window.lpTag._tagCount ? (window.lpTag = { site: settings.account || "", section: lpTag.section || "", tagletSection: lpTag.tagletSection || null, autoStart: lpTag.autoStart !== !1, ovr: lpTag.ovr || { domain: environmentMap[settings.environment].tagDomain, tagjs: environmentMap[settings.environment].tagDomain }, _v: "1.7.0", _tagCount: 1, protocol: "https:", events: { bind: function (t, e, i) { lpTag.defer(function () { lpTag.events.bind(t, e, i) }, 0) }, trigger: function (t, e, i) { lpTag.defer(function () { lpTag.events.trigger(t, e, i) }, 1) } }, defer: function (t, e) { 0 == e ? (this._defB = this._defB || [], this._defB.push(t)) : 1 == e ? (this._defT = this._defT || [], this._defT.push(t)) : (this._defL = this._defL || [], this._defL.push(t)) }, load: function (t, e, i) { var n = this; setTimeout(function () { n._load(t, e, i) }, 0) }, _load: function (t, e, i) { var n = t; t || (n = this.protocol + "//" + (this.ovr && this.ovr.domain ? this.ovr.domain : "lptag.liveperson.net") + "/tag/tag.js?site=" + this.site); var a = document.createElement("script"); a.setAttribute("charset", e ? e : "UTF-8"), i && a.setAttribute("id", i), a.setAttribute("src", n), document.getElementsByTagName("head").item(0).appendChild(a) }, init: function () { this._timing = this._timing || {}, this._timing.start = (new Date).getTime(); var t = this; window.attachEvent ? window.attachEvent("onload", function () { t._domReady("domReady") }) : (window.addEventListener("DOMContentLoaded", function () { t._domReady("contReady") }, !1), window.addEventListener("load", function () { t._domReady("domReady") }, !1)), "undefined" == typeof window._lptStop && this.load() }, start: function () { this.autoStart = !0 }, _domReady: function (t) { this.isDom || (this.isDom = !0, this.events.trigger("LPT", "DOM_READY", { t: t })), this._timing[t] = (new Date).getTime() }, vars: lpTag.vars || [], dbs: lpTag.dbs || [], ctn: lpTag.ctn || [], sdes: lpTag.sdes || [], ev: lpTag.ev || [] }, lpTag.init()) : window.lpTag._tagCount += 1;

window.onload = (event) => {
    if (settings) {
        let environmentElement = document.getElementById('environment')
        if (settings.environment && settings.environment.length > 0) {
            environmentElement.innerHTML = settings.environment;
        } else {
            environmentElement.innerHTML = '*set <code class="code-text">environment</code> query string argument to <code class="code-text">qa</code>, <code class="code-text">alpha</code>, or <code class="code-text">prod</code>';
        }
        let accountElement = document.getElementById('account')
        if (settings.account && settings.account.length > 0) {
            accountElement.innerHTML = settings.account;
        } else {
            accountElement.innerHTML = '*set <code class="code-text">account</code> query string argument to desired LivePerson account ID';
        }
    }
};