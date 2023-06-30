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
                    "border": "dropShadow",
                    "elements": [
                        {
                            "type": "vertical",
                            "border": "borderLess",
                            "accessibility": {
                                "web": {
                                    "role": "group",
                                    "aria-label": "group of buttons"
                                }
                            },
                            "elements": [
                                {
                                    "type": "button",
                                    "tooltip": "Pick a day",
                                    "title": "PICK A DAY",
                                    "class": "button",
                                    "style": {
                                        "background-color": "#0363AD",
                                        "color": "#ffffff",
                                        "size": "medium",
                                        "bold": true
                                    },
                                    "click": {
                                        "actions": [
                                            {
                                                "type": "datePicker",
                                                "class": "single",
                                                "title": "Select day"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "type": "button",
                                    "tooltip": "Pick a day",
                                    "title": "PICK A DAY",
                                    "class": "button",
                                    "style": {
                                        "background-color": "#0363AD",
                                        "color": "#ffffff",
                                        "size": "medium",
                                        "bold": true
                                    },
                                    "click": {
                                        "actions": [
                                            {
                                                "type": "datePicker",
                                                "class": "single",
                                                "title": "Select day"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "type": "button",
                                    "tooltip": "Pick a day",
                                    "title": "PICK A DAY",
                                    "class": "button",
                                    "style": {
                                        "background-color": "#0363AD",
                                        "color": "#ffffff",
                                        "size": "medium",
                                        "bold": true
                                    },
                                    "click": {
                                        "actions": [
                                            {
                                                "type": "datePicker",
                                                "class": "single",
                                                "title": "Select day"
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
