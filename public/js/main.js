require([
            "eng/main",
            "js/raphael.js",
            "js/doTimeout.js"
        ],
        function(engMain) {
            engMain.init();
        //This function will be called when all the dependencies
        //listed above are loaded. Note that this function could
        //be called before the page is loaded. This callback is optional.
    });