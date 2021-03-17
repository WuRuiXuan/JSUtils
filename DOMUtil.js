/**
 * DOM工具类
 * @type {{insertRule: DOMUtil.insertRule, getSelectedText: DOMUtil.getSelectedText, elementContains: DOMUtil.elementContains, elementTraversal: DOMUtil.elementTraversal, nodeIterator: DOMUtil.nodeIterator, selectText: DOMUtil.selectText, loadStyleString: DOMUtil.loadStyleString, matchesSelector: DOMUtil.matchesSelector, loadScriptString: DOMUtil.loadScriptString, getInnerText: (function(*): string), setInnerText: DOMUtil.setInnerText, deleteRule: DOMUtil.deleteRule}}
 */
var DOMUtil = {

    /**
     * 获取元素中的文字
     * @param element 元素节点
     * @returns {*}
     */
    getInnerText: function (element) {
        return (typeof element.textContent == "string") ?
            element.textContent : element.innerText;
    },

    /**
     * 设置元素中的文字
     * @param element 元素节点
     * @param text 文字内容
     */
    setInnerText: function (element, text) {
        if (typeof element.textContent == "string") {
            element.textContent = text;
        } else {
            element.innerText = text;
        }
    },

    /**
     * 获取输入框选中的文字
     * @param textBox 输入框input元素
     * @returns {string}
     */
    getSelectedText: function (textBox) {
        if (typeof textBox.selectionStart == "number") {
            return textBox.value.substring(textBox.selectionStart, textBox.selectionEnd);
        } else if (document.selection) {
            return document.selection.createRange().text;
        }
    },

    /**
     * 选中输入框中的文字
     * @param textBox 输入框input元素
     * @param startIndex 开始选中的索引
     * @param stopIndex 结束选中的索引
     */
    selectText: function (textBox, startIndex, stopIndex) {
        if (textBox.setSelectionRange) {
            textBox.setSelectionRange(startIndex, stopIndex);
        } else if (textBox.createTextRange) {
            var range = textBox.createTextRange();
            range.collapse(true);
            range.moveStart("character", startIndex);
            range.moveEnd("character", stopIndex - startIndex);
            range.select();
        }
        textBox.focus();
    },

    /**
     * 样式表插入样式
     * @param sheet 样式表（document.styleSheets[?]; element.sheet || element.styleSheet）
     * @param selectorText 选择器字符串
     * @param cssText 样式字符串
     * @param position 插入位置
     */
    insertRule: function (sheet, selectorText, cssText, position) {
        if (sheet.insertRule) {
            sheet.insertRule(selectorText + "{" + cssText + "}", position);
        } else if (sheet.addRule) {
            sheet.addRule(selectorText, cssText, position);
        }
    },

    /**
     * 样式表删除样式
     * @param sheet 样式表（document.styleSheets[?]; element.sheet || element.styleSheet）
     * @param index 删除位置
     */
    deleteRule: function (sheet, index) {
        if (sheet.deleteRule) {
            sheet.deleteRule(index);
        } else if (sheet.removeRule) {
            sheet.removeRule(index);
        }
    },

    /**
     * 给文档添加脚本
     * @param code 脚本字符串
     */
    loadScriptString: function (code) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        try {
            script.appendChild(document.createTextNode(code));
        } catch (ex) {
            script.text = code;
        }
        document.body.appendChild(script);
    },

    /**
     * 给文档添加样式
     * @param css 样式字符串
     */
    loadStyleString: function (css) {
        var style = document.createElement("style");
        style.type = "text/css";
        try {
            style.appendChild(document.createTextNode(css));
        } catch (ex) {
            style.styleSheet.cssText = css;
        }
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(style);
    },

    /**
     * 检测元素节点是否包含另一个元素节点
     * @param refNode 检测的元素
     * @param otherNode 被包含的元素
     * @returns {boolean}
     */
    elementContains: function (refNode, otherNode) {
        if (typeof refNode.contains == "function" &&
            (!client.engine.webkit || client.engine.webkit >= 522)) {
            return refNode.contains(otherNode);
        } else if (typeof refNode.compareDocumentPosition == "function") {
            return !!(refNode.compareDocumentPosition(otherNode) & 16);
        } else {
            var node = otherNode.parentNode;
            do {
                if (node === refNode) {
                    return true;
                } else {
                    node = node.parentNode;
                }
            } while (node !== null);
            return false;
        }
    },

    /**
     * 遍历元素节点的子节点
     * @param element
     */
    elementTraversal: function (element) {
        if (element.firstElementChild) {
            var child = element.firstElementChild;

            while (child !== element.lastElementChild) {
                console.log(child.tagName);
                child = child.nextElementSibling;
            }
        } else {
            throw new Error("There is no child element.");
        }
    },

    /**
     * 遍历元素节点的子节点（带过滤器）
     * @param element
     * @param filter 过滤器函数，返回 NodeFilter.FILTER_ACCEPT / NodeFilter.FILTER_SKIP
     */
    nodeIterator: function (element, filter) {
        var iterator = document.createNodeIterator(element, NodeFilter.SHOW_ELEMENT, filter, false);
        //For Firefox: iterator = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, filter, false);

        var node = iterator.nextNode();
        while (node !== null) {
            console.log(node.tagName);
            node = iterator.nextNode();
        }
    },

    /**
     * 检测元素是否匹配选择器
     * @param element 检测的元素
     * @param selector 选择器字符串
     * @returns {boolean|*}
     */
    matchesSelector: function (element, selector) {
        if (element.matchesSelector) {
            return element.matchesSelector(selector);
        } else if (element.msMatchesSelector) {
            return element.msMatchesSelector(selector);
        } else if (element.mozMatchesSelector) {
            return element.mozMatchesSelector(selector);
        } else if (element.webkitMatchesSelector) {
            return element.webkitMatchesSelector(selector);
        } else {
            throw new Error("Not supported.");
        }
    },

};

module.exports = DOMUtil;