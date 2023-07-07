lpTag.hooks.push({
    name: "BEFORE_WELCOME_MESSAGE",
    isAsync: true,
    callback: function (options, successCallback, errorCallback) {
        setTimeout(() => {
            const quickReplyExample = {
                type: "quickReplies",
                itemsPerRow: 1,
                rowLimit: 8,
                replies: [{
                    click: {
                        actions: [{
                            text: "Async Button 1 Clicked",
                            type: "publishText"
                        }]
                    },
                    title: "Async Button 1",
                    tooltip: "Async Button 1",
                    type: "button",
                    style: {
                        "color": "#fff",
                        "border-color": "#EB001F",
                        "background-color": "#EB001F",
                        "bold": true
                    }
                },
                    {
                        click: {
                            actions: [{
                                text: "Async Button 2 Clicked",
                                type: "publishText"
                            }]
                        },
                        title: "Async Button 2",
                        tooltip: "Async Button 2",
                        type: "button"
                    },
                    {
                        click: {
                            actions: [{
                                text: "Async Button 3 Clicked",
                                type: "publishText"
                            }]
                        },
                        title: "Async Button 3",
                        tooltip: "Async Button 3",
                        type: "button",
                        style: {
                            "color": "#fff",
                            "border-color": "#2c2cb8",
                            "background-color": "#2c2cb8",
                            "bold": true
                        }
                    },
                    {
                        click: {
                            actions: [{
                                text: "Async Button 4 Clicked",
                                type: "publishText"
                            }]
                        },
                        title: "Async Button 4",
                        tooltip: "Async Button 4",
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
