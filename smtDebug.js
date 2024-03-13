// Check if the top-level object "smtDebug" exists, if not, create it
if (typeof lpSMTDebug === 'undefined') {
    var lpSMTDebug = {};
}

// Initialize the JSONP array if it doesn't exist
if (!lpSMTDebug.jsonpArray) {
    lpSMTDebug.jsonpArray = [];
}

// Initialize helper function object if it doesn't exist
if (!lpSMTDebug.helpers) {
    lpSMTDebug.helpers = {};
}

// Extract query parameters from the request URL
lpSMTDebug.helpers.extractQueryParams = function(requestUrl) {
    var queryParams = {};
    var queryString = requestUrl.split('?')[1];

    if (queryString) {
        var pairs = queryString.split('&');
        pairs.forEach(function (pair) {
            var parts = pair.split('=');
            queryParams[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '');
        });
    }

    return queryParams;
}

// Function to extract response code from the JSON response body
lpSMTDebug.helpers.extractResponseCode = function(responseBody) {
    var responseCode = null;

    try {
        var jsonResponse = JSON.parse(responseBody);
        if (jsonResponse && jsonResponse.code) {
            responseCode = jsonResponse.code;
        }
    } catch (error) {
        // Handle parsing error if necessary
    }

    return responseCode;
}

const changeListeners = []

const notifyChange = (jsonpArray) => {
    changeListeners.forEach((listener) => {
        listener(jsonpArray);
    });
}

lpSMTDebug.helpers.subscribeChangeListener = function (listener) {
    changeListeners.push(listener);
}

// Function to add new jsonp objects to an array
lpSMTDebug.helpers.addJsonp = function (requestUrl, responseBody, startTimestamp, endTimestamp) {
    // Create an object to store jsonp data
    var jsonpObject = {
        requestUrl: requestUrl,
        requestParams: lpSMTDebug.helpers.extractQueryParams(requestUrl),
        responseBody: responseBody,
        responseCode: lpSMTDebug.helpers.extractResponseCode(responseBody),
        startTimestamp: startTimestamp,
        endTimestamp: endTimestamp
    };

    // Add jsonp object to the array
    lpSMTDebug.jsonpArray.push(jsonpObject);
    notifyChange(jsonpObject);
};

function isPathSharkJSONP(url) {
    try {
        const path = (new URL(url)).pathname;
        return path.startsWith("/api/js");
    } catch(ex) {
        // not a valid url
        return false;
    }
}

// Create a callback function that will be invoked when mutations occur
// Specifically, look for JSONP script tags added to the DOM
function domMutationCallback(mutationsList, observer) {
    // Loop through the list of mutations
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            for (const node of mutation.addedNodes) {
                if (node.nodeName === 'SCRIPT' && node.attributes['src']) {
                    // Check for SMT API JSONP script tags
                    const urlAttrib = node.attributes['src'].value;
                    if (urlAttrib && isPathSharkJSONP(urlAttrib)) {
                        const startTimestamp = Date.now();
                        const urlParams = new URLSearchParams(urlAttrib);
                        const cb = urlParams.get('cb');
                        const originalFunctionReference = window[cb];
                        window[cb] = function (jsonResponse) {
                            lpSMTDebug.helpers.addJsonp(urlAttrib, jsonResponse, startTimestamp, Date.now());
                            originalFunctionReference(jsonResponse);
                        };
                    } else {
                        console.debug(`Loaded script is not a Shark SMT match: ${urlAttrib}`);
                    }
                }
            }
        }
    }
}

// Create a MutationObserver instance with the callback function
const observer = new MutationObserver(domMutationCallback);

const targetNode = document;
const options = {
    childList: true, 
    subtree: true 
};

observer.observe(targetNode, options);