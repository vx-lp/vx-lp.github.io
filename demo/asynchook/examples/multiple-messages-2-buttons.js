lpTag.hooks.push({
    name: "BEFORE_WELCOME_MESSAGE",
    isAsync: true,
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

            const contents = [
                {
                    "source": "agent",
                    "by": "Info",
                    "isWelcomeMessage": true,
                    "text": "This is 1st async message",
                    "type": "line",
                    "quickReplies": {}
                },
                {
                    "source": "agent",
                    "by": "Info",
                    "isWelcomeMessage": true,
                    "text": "This is 2nd message with quickReply",
                    "type": "line",
                    "quickReplies": quickReplyExample
                }
            ];
            options.data.content = contents;
            successCallback(options);
        }, 2000);
    }
});
