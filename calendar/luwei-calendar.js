import './luwei-calendar.css';

const date = new Date();   //当前日期
const year = date.getFullYear();  //当年
const month = date.getMonth() + 1;  //当月
const day = date.getDate();  //当天
const week = getWeek(date.getDay()); //当前星期
const totalDay = getTotalDay(month);  //当月总天数
const firstDate = new Date(`${year}/${month}/01`); //当月第一天
const firstWeek = firstDate.getDay(); //当月第一天的星期
const lastDate = new Date(`${year}/${month}/${totalDay}`); //当月最后一天
const lastWeek = lastDate.getDay(); //当月最后一天的星期


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

    return year % 4 === 0 && (year % 100 !== 0 || (year % 100 === 0 && year % 400 === 0));

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

    let canlendarArr = [];

    let weekArr = ['日', '一', '二', '三', '四', '五', '六'];


    for (let i = 0; i < firstWeek; i++) {

        canlendarArr.push("")
    }

    for (let i = 0; i < totalDay; i++) {

        canlendarArr.push(i + 1);
    }

    for (let i = 0; i < ((6 - lastWeek)); i++) {

        canlendarArr.push("")
    }


    let element = document.getElementById('calendar');
    let fragment = document.createDocumentFragment();

    let elementArr = [];  //前28天元素

    let lastElementArr = [];  //28天后元素


    let yearDiv = document.createElement('div');

    yearDiv.className = "calendar_header"
    yearDiv.textContent = `${year}年 ${month}月 ${week}`;

    fragment.appendChild(yearDiv);

    let weekDiv = document.createElement('div');
    weekDiv.className = 'calendar_content';

    weekArr.forEach(item => {
        let span = document.createElement('span');
        span.textContent = item;
        weekDiv.appendChild(span);
    })

    fragment.appendChild(weekDiv);


    canlendarArr.forEach((item, index) => {

        let span = document.createElement('span');

        span.textContent = item;

        if (item === day) {
            span.style.backgroundColor = 'gainsboro';
        }

        elementArr.push(span);

        if ((index + 1) % 7 === 0) {

            let div = document.createElement('div');
            div.className = 'calendar_content';
            elementArr.forEach(item => {
                div.appendChild(item);
            })
            fragment.appendChild(div);
            elementArr = [];
        }

        if (index + 1 > 28) {

            lastElementArr.push(span);

            if ((index + 1) === canlendarArr.length) {

                let div = document.createElement('div');
                div.className = 'calendar_content';
                lastElementArr.forEach(item => {
                    div.appendChild(item);
                })
                fragment.appendChild(div);
                lastElementArr = [];
            }

        }


    });

    element.style.width = '300px';


    element.appendChild(fragment);

}

export default createCalendar;






