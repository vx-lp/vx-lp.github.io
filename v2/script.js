const asyncIdentityCheckArea = $("#async-identity-check");
const useAsyncIdentityCheckbox = $("#use-async-identity");
const usernameInput = $("#lp_username");
const accInput = $("#lp_account");
let identityFn;
if (site) {
    accInput.val(site);
}

if (site && username) {
    usernameInput.val(username);
    asyncIdentityCheckArea.removeClass("hidden");
    if (asyncIdentity === "1") {
        useAsyncIdentityCheckbox.get(0).checked = true;
        identityFn = function (callback) {
            console.log("Async identity called");
            setTimeout(function () {
                console.log("Async identity returned identity data");
                callback({
                    iss: "LivePerson",
                    acr: "loa1",
                    sub: usernameResult
                });
            }, 3000);
        }
    } else {
        identityFn = function(callback) {
            callback({
                iss: "LivePerson",
                acr: "loa1",
                sub: usernameResult
            });
        }
    }
    lpTag.identities = [];
    lpTag.identities.push(identityFn);
    var usernameResult = 'lpTest' + username;

    lpTag.sdes.push({"type": "ctmrinfo", "info": {customerId: usernameResult}});

    window.LPJsMethodName = function (callback) {
        callback(username);
    };

    LPGetAuthenticationToken = function (callback) {
        callback(username);
    }
}

$("#lp_form").submit(function (e) {
    e.preventDefault();
    const site = accInput.val();
    const username = usernameInput.val();
    const useAsyncIdentity = useAsyncIdentityCheckbox.get(0).checked ? "1" : "0";

    if(window.location.href.indexOf(username) > -1) {
        window.history.replaceState(null, null, window.location.pathname);
    }
    if (username === "") {
        window.location.href = updateQueryStringParameter(window.location.href, "site", site);

    } else {
        let href = updateQueryStringParameter(window.location.href, "site", site);
        href = updateQueryStringParameter(href, "username", username);
        if (useAsyncIdentity) {
            href = updateQueryStringParameter(href, "async_identity", useAsyncIdentity);
        }
        window.location.href = href;
    }
});

function updateQueryStringParameter(uri, key, value) {
    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    const separator = uri.indexOf('?') !== -1 ? "&" : "?";

    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        return uri + separator + key + "=" + value;
    }
}


$('#lp_lnk_setup').click(function () {
    var isDescriptionDisplay = $('#lp_account_setup_description').css('display') === 'block';
    $('#lp_account_setup_description').css('display', isDescriptionDisplay ? 'none' : 'block');
});

usernameInput.on('input', function (e) {
   if (e.target.value.trim()) {
       asyncIdentityCheckArea.removeClass("hidden");
   }  else {
       asyncIdentityCheckArea.addClass("hidden");
       useAsyncIdentityCheckbox.get(0).checked = false;
   }
});

/*
     FILE ARCHIVED ON 19:07:52 Dec 05, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 11:52:28 Feb 04, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 127.332 (3)
  esindex: 0.009
  captures_list: 145.036
  CDXLines.iter: 13.058 (3)
  PetaboxLoader3.datanode: 82.336 (4)
  exclusion.robots: 0.436
  exclusion.robots.policy: 0.417
  RedisCDXSource: 0.71
  PetaboxLoader3.resolve: 60.842 (4)
  load_resource: 26.998
*/
