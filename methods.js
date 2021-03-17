/**
 * 阶乘
 * @param num 计算参数
 * @returns {number} 计算结果
 */
exports.factorial = function (num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
};

/**
 * 随机选择index
 * @param lowerValue 起始index
 * @param upperValue 结束index
 * @returns {number} 随机选择范围内的index（包括起始和结束）
 */
exports.selectFrom = function (lowerValue, upperValue) {
    var choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
};

/**
 * 继承
 * @param subType 子类构造函数
 * @param superType 父类构造函数
 */
exports.inheritPrototype = function (subType, superType) {
    var prototype = object(superType.prototype);   //create object
    prototype.constructor = subType;               //augment object
    subType.prototype = prototype;                 //assign object
};

/**
 * 检测对象实例的原型是否具有该属性
 * @param object 对象实例
 * @param name 属性名
 * @returns {boolean|boolean}
 */
exports.hasPrototypeProperty = function (object, name) {
    return !object.hasOwnProperty(name) && (name in object);
};

/**
 * 获取GET请求url中的键值对
 * @returns {{}} 键值对象
 */
exports.getQueryStringArgs = function () {

    //get query string without the initial ?
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),

        //object to hold data
        args = {},

        //get individual items
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,

        //used in for loop
        i = 0,
        len = items.length;

    //assign each item onto the args object
    for (i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if (name.length) {
            args[name] = value;
        }
    }

    return args;
};

/**
 * 给GET请求添加查询条件
 * @param url 原请求url
 * @param name 查询条件键名
 * @param value 查询条件键值
 * @returns {*} 修改后的url
 */
exports.addQueryStringArg = function (url, name, value) {
    if (url.indexOf("?") === -1) {
        url += "?";
    } else {
        url += "&";
    }

    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
};

/**
 * 输出日志
 * @param message 字符串
 */
exports.log = function (message) {
    if (typeof console == "object") {
        console.log(message);
    } else if (typeof opera == "object") {
        opera.postError(message);
    } else if (typeof java == "object" && typeof java.lang == "object") {
        java.lang.System.out.println(message);
    }
};

/**
 * blob对象截取
 * @param blob 二进制类文件对象
 * @param startByte 开始截取的位置
 * @param length 截取的长度
 * @returns {Blob} 截取后的blob对象
 */
exports.blobSlice = function (blob, startByte, length) {
    if (blob.slice) {
        return blob.slice(startByte, length);
    } else if (blob.webkitSlice) {
        return blob.webkitSlice(startByte, length);
    } else if (blob.mozSlice) {
        return blob.mozSlice(startByte, length);
    } else {
        return null;
    }
};

/**
 * 模拟setInterval
 * @param method 执行函数
 * @param scope 函数的作用域
 * @param interval 执行间隔ms
 */
exports.simulateInterval = function (method, scope, interval) {
    clearTimeout(method.tId);
    method.call(scope);
    method.tId = setTimeout(arguments.callee.bind(null, method, scope), interval);
};

/**
 * 获取localStorage
 * @returns {Storage|*}
 */
exports.getLocalStorage = function () {
    if (typeof localStorage == "object") {
        return localStorage;
    } else if (typeof globalStorage == "object") {
        return globalStorage[location.host];
    } else {
        throw new Error("Local storage not available.");
    }
};