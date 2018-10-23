(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.calendar = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var date = new Date(); //当前日期
    var year = date.getFullYear(); //当年
    var month = date.getMonth() + 1; //当月
    var day = date.getDate(); //当天
    var week = getWeek(date.getDay()); //当前星期
    var totalDay = getTotalDay(month); //当月总天数
    var firstDate = new Date(year + '/' + month + '/01'); //当月第一天
    var firstWeek = firstDate.getDay(); //当月第一天的星期
    var lastDate = new Date(year + '/' + month + '/' + totalDay); //当月最后一天
    var lastWeek = lastDate.getDay(); //当月最后一天的星期


    //获取总天数
    function getTotalDay(month) {

        if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
            return 31;
        } else if (month === 2) {
            return judgeIsLeapYear(year) ? 29 : 28;
        } else {
            return 30;
        }
    }

    //判断是否是闰年
    function judgeIsLeapYear(year) {

        return year % 4 === 0 && (year % 100 !== 0 || year % 100 === 0 && year % 400 === 0);
    }

    //获取当前星期
    function getWeek(week) {

        switch (week) {
            case 0:
                return '周日';
            case 1:
                return '周一';
            case 2:
                return '周二';
            case 3:
                return '周三';
            case 4:
                return '周四';
            case 5:
                return '周五';
            case 6:
                return '周六';
        }
    }

    //创建日历
    function createCalendar() {

        var canlendarArr = [];

        var weekArr = ['日', '一', '二', '三', '四', '五', '六'];

        for (var i = 0; i < firstWeek; i++) {

            canlendarArr.push("");
        }

        for (var _i = 0; _i < totalDay; _i++) {

            canlendarArr.push(_i + 1);
        }

        for (var _i2 = 0; _i2 < 6 - lastWeek; _i2++) {

            canlendarArr.push("");
        }

        var element = document.getElementById('calendar');
        var fragment = document.createDocumentFragment();

        var elementArr = []; //前28天元素

        var lastElementArr = []; //28天后元素


        var yearDiv = document.createElement('div');

        yearDiv.className = "calendar_header";
        yearDiv.textContent = year + '\u5E74 ' + month + '\u6708 ' + week;

        fragment.appendChild(yearDiv);

        var weekDiv = document.createElement('div');
        weekDiv.className = 'calendar_content';

        weekArr.forEach(function (item) {
            var span = document.createElement('span');
            span.textContent = item;
            weekDiv.appendChild(span);
        });

        fragment.appendChild(weekDiv);

        canlendarArr.forEach(function (item, index) {

            var span = document.createElement('span');

            span.textContent = item;

            if (item === day) {
                span.style.backgroundColor = 'gainsboro';
            }

            elementArr.push(span);

            if ((index + 1) % 7 === 0) {

                var div = document.createElement('div');
                div.className = 'calendar_content';
                elementArr.forEach(function (item) {
                    div.appendChild(item);
                });
                fragment.appendChild(div);
                elementArr = [];
            }

            if (index + 1 > 28) {

                lastElementArr.push(span);

                if (index + 1 === canlendarArr.length) {

                    var _div = document.createElement('div');
                    _div.className = 'calendar_content';
                    lastElementArr.forEach(function (item) {
                        _div.appendChild(item);
                    });
                    fragment.appendChild(_div);
                    lastElementArr = [];
                }
            }
        });

        element.style.width = '300px';

        element.appendChild(fragment);
    }

    createCalendar();

    exports.default = createCalendar;
});
