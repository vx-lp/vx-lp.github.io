lpTag.hooks.pushAsync({
    name: "BEFORE_WELCOME_MESSAGE",
    callback: function (options, successCallback, errorCallback) {
        // example asynchronous code
        setTimeout(() => {
            options.data.content.type = "richContent";
            options.data.content.text =
                {
                    "type": "carousel",
                    "padding": 10,
                    "elements": [
                        {
                            "type": "vertical",
                            "elements": [
                                {
                                    "type": "image",
                                    "url": "https://cdn.zeplin.io/5aa650d695bfea607a2c9351/assets/7289E842-10A3-40C3-B4A7-F1856B574CD0.png",
                                    "tooltip": "SIM only plan",
                                    "alt": "",
                                    "click": {
                                        "metadata": [
                                            {
                                                "type": "ExternalId",
                                                "id": "11114444"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "Small plan 2 GB data ",
                                    "tooltip": "Small plan",
                                    "rtl": false,
                                    "style": {
                                        "bold": true,
                                        "italic": false,
                                        "color": "#000000"
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "500$ national talk",
                                    "tooltip": "500$",
                                    "rtl": false,
                                    "style": {
                                        "bold": true,
                                        "italic": false,
                                        "color": "#000000"
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "49$ per month",
                                    "tooltip": "49$",
                                    "rtl": false,
                                    "style": {
                                        "bold": true,
                                        "italic": true,
                                        "color": "#000000"
                                    }
                                },
                                {
                                    "type": "button",
                                    "tooltip": "nav",
                                    "title": "Navigate to oren",
                                    "click": {
                                        "metadata": [
                                            {
                                                "type": "ExternalId",
                                                "id": "12345678"
                                            }
                                        ],
                                        "actions": [
                                            {
                                                "type": "publishText",
                                                "text": "my text"
                                            },
                                            {
                                                "type": "navigate",
                                                "name": "Navigate to store via image",
                                                "lo": 34.88248,
                                                "la": 32.19777
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "type": "vertical",
                            "elements": [
                                {
                                    "type": "image",
                                    "url": "https://cdn.zeplin.io/5aa650d695bfea607a2c9351/assets/CF63C36C-CF8E-4AA5-9376-BC89EDAE43B7.png",
                                    "tooltip": "Swap plan",
                                    "alt": "",
                                    "click": {
                                        "metadata": [
                                            {
                                                "type": "ExternalId",
                                                "id": "11114444"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "Medium plan 15GB data",
                                    "tooltip": "Medium plan",
                                    "rtl": false,
                                    "style": {
                                        "bold": true,
                                        "italic": false,
                                        "color": "#000000"
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "Unlimited national talk",
                                    "tooltip": "Unlimited",
                                    "rtl": false,
                                    "style": {
                                        "bold": true,
                                        "italic": false,
                                        "color": "#000000"
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "69$ per month",
                                    "tooltip": "Unlimited",
                                    "rtl": false,
                                    "style": {
                                        "bold": true,
                                        "italic": false,
                                        "color": "#000000"
                                    }
                                },
                                {
                                    "type": "button",
                                    "tooltip": "Buy now",
                                    "title": "Buy now",
                                    "click": {
                                        "actions": [
                                            {
                                                "type": "link",
                                                "name": "Add to cart",
                                                "uri": "https://cdn.zeplin.io/5aa650d695bfea607a2c9351/assets/45246060-E3A7-4477-A26B-F6D74A28D49E.png"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "type": "vertical",
                            "elements": [
                                {
                                    "type": "image",
                                    "url": "https://cdn.zeplin.io/5aa650d695bfea607a2c9351/assets/D767223B-CC51-431A-A26E-B54C39EA7846.png",
                                    "tooltip": "Large plan",
                                    "alt": "",
                                    "click": {
                                        "metadata": [
                                            {
                                                "type": "ExternalId",
                                                "id": "11114444"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "Large plan 20GB data",
                                    "tooltip": "Large plan",
                                    "rtl": false,
                                    "style": {
                                        "bold": true,
                                        "italic": false,
                                        "color": "#000000"
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "unlimited international talk",
                                    "tooltip": "unlimited international",
                                    "rtl": false,
                                    "style": {
                                        "bold": true,
                                        "italic": false,
                                        "color": "#000000"
                                    }
                                },
                                {
                                    "type": "button",
                                    "tooltip": "Choose a plan",
                                    "title": "Choose a plan",
                                    "click": {
                                        "actions": [
                                            {
                                                "type": "link",
                                                "name": "Add to cart",
                                                "uri": "https://cdn.zeplin.io/5aa650d695bfea607a2c9351/assets/45246060-E3A7-4477-A26B-F6D74A28D49E.png"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "type": "vertical",
                            "elements": [
                                {
                                    "type": "image",
                                    "url": "https://cdn.zeplin.io/5aa650d695bfea607a2c9351/assets/D767223B-CC51-431A-A26E-B54C39EA7846.png",
                                    "tooltip": "Large plan",
                                    "alt": "",
                                    "click": {
                                        "metadata": [
                                            {
                                                "type": "ExternalId",
                                                "id": "11114444"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "Large plan 20GB data",
                                    "tooltip": "Large plan",
                                    "rtl": false,
                                    "style": {
                                        "bold": true,
                                        "italic": false,
                                        "color": "#000000"
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "unlimited international talk",
                                    "tooltip": "unlimited international",
                                    "rtl": false,
                                    "style": {
                                        "bold": true,
                                        "italic": false,
                                        "color": "#000000"
                                    }
                                },
                                {
                                    "type": "button",
                                    "tooltip": "Choose a plan",
                                    "title": "Choose a plan",
                                    "click": {
                                        "actions": [
                                            {
                                                "type": "link",
                                                "name": "Add to cart",
                                                "uri": "https://cdn.zeplin.io/5aa650d695bfea607a2c9351/assets/45246060-E3A7-4477-A26B-F6D74A28D49E.png"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "type": "vertical",
                            "elements": [
                                {
                                    "type": "image",
                                    "url": "https://cdn.zeplin.io/5aa650d695bfea607a2c9351/assets/D767223B-CC51-431A-A26E-B54C39EA7846.png",
                                    "tooltip": "Large plan",
                                    "alt": "",
                                    "click": {
                                        "metadata": [
                                            {
                                                "type": "ExternalId",
                                                "id": "11114444"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "Large plan 20GB data",
                                    "tooltip": "Large plan",
                                    "rtl": false,
                                    "style": {
                                        "bold": true,
                                        "italic": false,
                                        "color": "#000000"
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "unlimited international talk",
                                    "tooltip": "unlimited international",
                                    "rtl": false,
                                    "style": {
                                        "bold": true,
                                        "italic": false,
                                        "color": "#000000"
                                    }
                                },
                                {
                                    "type": "button",
                                    "tooltip": "Choose a plan",
                                    "title": "Choose a plan",
                                    "click": {
                                        "actions": [
                                            {
                                                "type": "link",
                                                "name": "Add to cart",
                                                "uri": "https://cdn.zeplin.io/5aa650d695bfea607a2c9351/assets/45246060-E3A7-4477-A26B-F6D74A28D49E.png"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "type": "vertical",
                            "elements": [
                                {
                                    "type": "image",
                                    "url": "https://cdn.zeplin.io/5aa650d695bfea607a2c9351/assets/D767223B-CC51-431A-A26E-B54C39EA7846.png",
                                    "tooltip": "Large plan",
                                    "alt": "",
                                    "click": {
                                        "metadata": [
                                            {
                                                "type": "ExternalId",
                                                "id": "11114444"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "Large plan 20GB data",
                                    "tooltip": "Large plan",
                                    "rtl": false,
                                    "style": {
                                        "bold": true,
                                        "italic": false,
                                        "color": "#000000"
                                    }
                                },
                                {
                                    "type": "text",
                                    "text": "unlimited international talk",
                                    "tooltip": "unlimited international",
                                    "rtl": false,
                                    "style": {
                                        "bold": true,
                                        "italic": false,
                                        "color": "#000000"
                                    }
                                },
                                {
                                    "type": "button",
                                    "tooltip": "Choose a plan",
                                    "title": "Choose a plan",
                                    "click": {
                                        "actions": [
                                            {
                                                "type": "link",
                                                "name": "Add to cart",
                                                "uri": "https://cdn.zeplin.io/5aa650d695bfea607a2c9351/assets/45246060-E3A7-4477-A26B-F6D74A28D49E.png"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                };
            successCallback(options);
        }, 2000);
    }
});
