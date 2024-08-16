$(document).ready(function () {
    chrome?.tabs?.query({ currentWindow: true, active: true }, function (tabs) {
        var tabURL = tabs[0].url; 
        var iframeSrc = "http://192.168.0.49:5000?tabUrl=" + encodeURIComponent(tabURL);
        $('#myIframe').attr('src', iframeSrc);
    });
});