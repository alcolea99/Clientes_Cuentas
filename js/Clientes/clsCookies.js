class clsCookies {
    constructor(){}
    //////////////////////////////////////////////////////////////////////////////////
    static WriteCookie(pTag, pValue) {
        var now = new Date();
        now.setMonth(now.getMonth() + 1);
        var cookievalue = escape(pValue) + ";";

        document.cookie = pTag + "=" + cookievalue +" expires=" + now.toUTCString() + "; path=/;";
    }
    ///////////////////////////////////////////////////////////////////////////////////
    static ReadCookie(pTag) {
        var allcookies = document.cookie;
        pTag = pTag.trim();
        if (allcookies.length == 0) return "";
        // Get all the cookies pairs in an array
        var cookiearray = allcookies.split(';');
        var name;
        var value = "";
        // Now take key value pair out of this array
        for (var i = 0; i < cookiearray.length; i++) {
            name = cookiearray[i].split('=')[0];
            value = cookiearray[i].split('=')[1];
            if (pTag == name.trim()) {
                return value.trim();
            }
        }
        return "";
    }
    ///////////////////////////////////////////////////////////////////////////////////
    static DeleteCookie(pTag) {
        document.cookie = pTag + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}