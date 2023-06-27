lpTag.hooks.pushAsync({
    name: "BEFORE_WELCOME_MESSAGE",
    callback: function (options, successCallback, errorCallback) {
        setTimeout(() => {
            const quickReplyExample = {
                type: "quickReplies",
                replies: [{
                    click: {
                        actions: [{
                            text: "Yes Button Clicked",
                            type: "publishText"
                        }]
                    },
                    title: "Yes but Async",
                    tooltip: "Yes but Async",
                    type: "button",
                },
                    {
                        click: {
                            actions: [{
                                text: "No Button Clicked",
                                type: "publishText"
                            }]
                        },
                        title: "No but Async",
                        tooltip: "No but Async",
                        type: "button"
                    }
                ]
            };
            options.data.content.quickReplies = quickReplyExample;
            options.data.content.text = "Quick replies interfered with Async Hook"
            console.warn('option',options.data.content);
            successCallback(options);

        }, 2000);
    }
});
