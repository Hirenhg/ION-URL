$(document).ready(function () {
    chrome?.tabs?.query({ currentWindow: true, active: true }, function (tabs) {
        var tabURL = tabs[0].url; 
        var iframeSrc = "http://10.227.254.169:5000?tabUrl=" + encodeURIComponent(tabURL);
        $('#myIframe').attr('src', iframeSrc);
    });
});