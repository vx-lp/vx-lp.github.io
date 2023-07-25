lpTag.hooks.push({
    name: "BEFORE_WELCOME_MESSAGE",
    isAsync: true,
    callback: function (options, successCallback, errorCallback) {
        setTimeout(() => {
            const contents = [
                {
                    "source": "agent",
                    "by": "Info",
                    "isWelcomeMessage": true,
                    "text": "Hi!! This is 1st async hook message.",
                    "type": "line"
                },
                {
                    "source": "agent",
                    "by": "Info",
                    "isWelcomeMessage": true,
                    "text": "Hello again! This is 2nd async hook message.",
                    "type": "line"
                }
            ];
            options.data.content = contents;
            successCallback(options);
        }, 2000);
    }
});
