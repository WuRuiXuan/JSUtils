/**
 * 插件检测工具类
 * @type {{hasIEPlugin: PluginDetectionUtil.hasIEPlugin, hasPlugin: PluginDetectionUtil.hasPlugin, hasFlash: (function(): *), hasQuickTime: (function(): *)}}
 */
var PluginDetectionUtil = {

    //plugin detection - doesn't work in IE
    hasPlugin: function (name) {
        name = name.toLowerCase();
        for (var i = 0; i < navigator.plugins.length; i++) {
            if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
                return true;
            }
        }

        return false;
    },

    //plugin detection for IE
    hasIEPlugin: function (name) {
        try {
            new ActiveXObject(name);
            return true;
        } catch (ex) {
            return false;
        }
    },

    //detect flash for all browsers
    hasFlash: function () {
        var result = hasPlugin("Flash");
        if (!result) {
            result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
        }
        return result;
    },

    //detect quicktime for all browsers
    hasQuickTime: function () {
        var result = hasPlugin("QuickTime");
        if (!result) {
            result = hasIEPlugin("QuickTime.QuickTime");
        }
        return result;
    }

};

module.exports = PluginDetectionUtil;