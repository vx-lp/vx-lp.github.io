lpTag.hooks.push({
    name: "BEFORE_WELCOME_MESSAGE",
    isAsync: true,
    callback: function (options, successCallback, errorCallback) {
        // example asynchronous code
        setTimeout(() => {
            options.data.content.type = "richContent";
            options.data.content.text =
                {
                    "type": "vertical",
                    "elements": [
                        {
                            "type": "text",
                            "text": "Hi! Check this exciting offer!"
                        },
                        {
                            "type": "image",
                            "url": "https://cdn.bgr.com/2016/08/iphone-8-concept.jpg",
                            "tooltip": "image tooltip",
                            "alt": "",
                            "click": {
                                "actions": [
                                    {
                                        "type": "navigate",
                                        "name": "Navigate to store via image",
                                        "lo": 23423423,
                                        "la": 2423423423
                                    }
                                ]
                            }
                        },
                        {
                            "type": "text",
                            "text": "IPhone 15 PRO",
                            "tooltip": "brand new iphone 15",
                            "style": {
                                "bold": true,
                                "size": "large"
                            }
                        },
                        {
                            "type": "text",
                            "text": "Now on sale!"
                        },
                        {
                            "type": "text",
                            "text": "$1555.99",
                            "tooltip": "1555.99"
                        },
                        {
                            "type": "button",
                            "title": "Add to cart",
                            "click": {
                                "actions": [
                                    {
                                        "type": "link",
                                        "name": "add to cart",
                                        "uri": "http://www.google.com"
                                    }
                                ]
                            }
                        },
                        {
                            "type": "horizontal",
                            "elements": [
                                {
                                    "type": "button",
                                    "title": "Buy",
                                    "tooltip": "store is the thing",
                                    "click": {
                                        "actions": [
                                            {
                                                "type": "navigate",
                                                "name": "Navigate to store",
                                                "lo": 23423423,
                                                "la": 2423423423
                                            }
                                        ]
                                    }
                                },
                                {
                                    "type": "button",
                                    "title": "Find",
                                    "tooltip": "store is the thing",
                                    "click": {
                                        "actions": [
                                            {
                                                "type": "navigate",
                                                "name": "Navigate to store",
                                                "lo": 23423423,
                                                "la": 2423423423
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "type": "button",
                            "title": "Navigate to store",
                            "tooltip": "store is the thing",
                            "click": {
                                "actions": [
                                    {
                                        "type": "navigate",
                                        "name": "Navigate to store",
                                        "lo": 23423423,
                                        "la": 2423423423
                                    }
                                ]
                            }
                        },
                        {
                            "type": "button",
                            "title": "More details",
                            "click": {
                                "actions": [
                                    {
                                        "type": "link",
                                        "uri": "http://www.google.com",
                                        "name": "open browser"
                                    }
                                ]
                            }
                        }
                    ]
                };
            successCallback(options);
        }, 2000);
    }
});
