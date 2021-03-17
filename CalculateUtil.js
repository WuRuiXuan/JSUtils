/**
 * 计算元素大小、位置等工具类
 * @type {{getElementLeft: (function(*): number), getWindowWidth: CalculateUtil.getWindowWidth, getScreenPosition: (function(): {leftPos: number, topPos: number}), getPageSize: (function(): {pageHeight: number, pageWidth: number}), getPagePosition: (function(*): {pageY: number, pageX: number}), getBoundingClientRect: CalculateUtil.getBoundingClientRect, getElementTop: (function(*): number)}}
 */
var CalculateUtil = {

    getScreenPosition: function () {
        var leftPos = (typeof window.screenLeft == "number") ?
            window.screenLeft : window.screenX;
        var topPos = (typeof window.screenTop == "number") ?
            window.screenTop : window.screenY;
        return {leftPos, topPos};
    },

    getPageSize: function () {
        var pageWidth = window.innerWidth,
            pageHeight = window.innerHeight;

        if (typeof pageWidth != "number") {
            if (document.compatMode === "CSS1Compat") {
                pageWidth = document.documentElement.clientWidth;
                pageHeight = document.documentElement.clientHeight;
            } else {
                pageWidth = document.body.clientWidth;
                pageHeight = document.body.clientHeight;
            }
        }
        return {pageWidth, pageHeight};
    },

    getPagePosition: function (event) {
        var pageX = event.pageX,
            pageY = event.pageY;

        if (pageX === undefined) {
            pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
        }

        if (pageY === undefined) {
            pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
        }
        return {pageX, pageY};
    },

    getWindowWidth: function () {
        if (window.innerWidth) {
            return window.innerWidth;
        } else if (document.documentElement.clientWidth) {
            return document.documentElement.clientWidth;
        } else if (document.body.clientWidth) {
            return document.body.clientWidth;
        }
    },

    getElementLeft: function (element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;

        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }

        return actualLeft;
    },

    getElementTop: function (element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;

        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }

        return actualTop;
    },

    getBoundingClientRect: function (element) {
        var scrollTop = document.documentElement.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft;

        if (element.getBoundingClientRect) {
            if (typeof arguments.callee.offset != "number") {
                var temp = document.createElement("div");
                temp.style.cssText = "position:absolute;left:0;top:0;";
                document.body.appendChild(temp);
                arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
                document.body.removeChild(temp);
                temp = null;
            }

            var rect = element.getBoundingClientRect();
            var offset = arguments.callee.offset;

            return {
                left: rect.left + offset,
                right: rect.right + offset,
                top: rect.top + offset,
                bottom: rect.bottom + offset

            };
        } else {

            var actualLeft = this.getElementLeft(element);
            var actualTop = this.getElementTop(element);

            return {
                left: actualLeft - scrollLeft,
                right: actualLeft + element.offsetWidth - scrollLeft,
                top: actualTop - scrollTop,
                bottom: actualTop + element.offsetHeight - scrollTop
            }
        }
    },

};

module.exports = CalculateUtil;