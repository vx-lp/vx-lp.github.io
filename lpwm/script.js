if (site) {
    $("#lp_account").attr("disabled", "disabled");
    $("#lp_account").val(site);
}

if (site && username) {
    $("#lp_username").attr("disabled", "disabled");
    $("#lp_username").val(username);

    $("#lp_btn_login").hide();a

    lpTag.sdes.push({"type": "ctmrinfo", "info": {customerId: "lpTest" + username}});

    window.LPJsMethodName = function (callback) {
        callback(username);
    };
}
else {
    $("#lp_form").submit(function (e) {
        e.preventDefault();
        var url = "https://exampleauth.cloud.lprnd.net:1980";
        var site = $("#lp_account").val();
        var username = $("#lp_username").val();
        var href;

        $.ajax({
            url: url + '/login',
            contentType: "application/json",
            data: {
                username: username
            },
            success: function () {
                $.ajax(url + "/generateSsoKey?rt=json&username=" + username, {
                    type: 'get',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.error("Failed to generate SSO Key", textStatus, errorThrown);
                    },
                    success: function () {
                        href = updateQueryStringParameter(window.location.href, "site", site);
                        window.location.href = updateQueryStringParameter(href, "username", username);
                    }
                });
            }
        });

        function updateQueryStringParameter(uri, key, value) {
            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
            var separator = uri.indexOf('?') !== -1 ? "&" : "?";
            if (uri.match(re)) {
                return uri.replace(re, '$1' + key + "=" + value + '$2');
            }
            else {
                return uri + separator + key + "=" + value;
            }
        }
    });
}

$('#lp_lnk_setup').click(function () {
    var isDescriptionDisplay = $('#lp_account_setup_description').css('display') === 'block';
    $('#lp_account_setup_description').css('display', isDescriptionDisplay ? 'none' : 'block');
});
