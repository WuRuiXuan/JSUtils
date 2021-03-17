/**
 * XHR工具类
 * @type {{createCORSRequest: (function(*=, *=): {withCredentials}|XDomainRequest), createStreamingClient: (function(*=, *, *): XMLHttpRequest), createXHR: XHRUtil.createXHR}}
 */
var XHRUtil = {

    /**
     * 创建xhr对象
     * @returns {XMLHttpRequest} xhr对象
     */
    createXHR: function () {
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                    "MSXML2.XMLHttp"];

                for (var i = 0, len = versions.length; i < len; i++) {
                    try {
                        var xhr = new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        return xhr;
                    } catch (ex) {
                        //skip
                    }
                }
            }

            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error("No XHR object available.");
        }
    },

    /**
     * 创建CORS XHR请求
     * @param method 方法名 get / post / ...
     * @param url 请求地址
     * @returns {XMLHttpRequest} xhr对象
     */
    createCORSRequest: function (method, url) {
        var xhr = this.createXHR();
        if ("withCredentials" in xhr) {
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    },

    /**
     * 监测XHR请求流
     * @param url 请求地址
     * @param progress 请求中的处理函数（回调返回每次的responseText）
     * @param finished 请求结束的处理函数
     * @returns {XMLHttpRequest} xhr对象
     */
    createStreamingClient: function (url, progress, finished) {
        var xhr = this.createXHR(),
            received = 0;

        xhr.open("get", url, true);
        xhr.onreadystatechange = function () {
            var result;

            if (xhr.readyState === 3) {

                //get only the new data and adjust counter
                result = xhr.responseText.substring(received);
                received += result.length;

                //call the progress callback
                progress(result);

            } else if (xhr.readyState === 4) {
                finished(xhr.responseText);
            }
        };
        xhr.send(null);
        return xhr;
    },

};

module.exports = XHRUtil;