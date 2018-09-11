const data = {
    "img": [
        {"src": '0.jpg'},
        {"src": '1.jpg'},
        {"src": '2.jpg'},
        {"src": '3.jpg'},
        {"src": '4.jpg'},
        {"src": '5.jpg'},
        {"src": '6.jpg'},
        {"src": '7.jpg'},
        {"src": '8.jpg'},
        {"src": '9.jpg'},
        {"src": '10.jpg'},
        {"src": '11.jpg'},
        {"src": '12.jpg'},
        {"src": '13.jpg'},
        {"src": '14.jpg'},
        {"src": '15.jpg'},
        {"src": '16.jpg'},
        {"src": '17.jpg'},
        {"src": '18.jpg'},
    ]
};


window.onload = function () {
    render();

    waterfall('main', 'box');

    window.onscroll = function () {
        if (checkScrollSlide()) {
            // 将数据块渲染到页面尾部
            render();
            waterfall('main', 'box');
        }
    }
}

window.onresize = function () {
    waterfall('main', 'box');
}

function waterfall(parent, box) {
    // 将main下的所有class为box的元素取出来
    let oParent = document.getElementById(parent);
    let oBoxes = getByClass(oParent, box);

    // 计算整个页面显示的列数（页面宽／box的宽）
    let oBoxW = oBoxes[0].offsetWidth;
    let cols = Math.floor(document.documentElement.clientWidth / oBoxW);

    for (let i = 0; i < oBoxes.length; i++) {

        if (i >= cols) {

            oBoxes[i].style.position = 'absolute';
            oBoxes[i].style.top = oBoxes[i - cols].offsetHeight + oBoxes[i - cols].offsetTop + 'px';
            oBoxes[i].style.left = oBoxes[i - cols].offsetLeft + 'px';

        }
    }

}

function getByClass(parent, clsName) {
    let boxArr = [];
    let oElements = parent.getElementsByTagName('*');
    for (let i = 0; i < oElements.length; i++) {
        if (oElements[i].className == clsName) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

// 检测是否具备加载数据块的条件
function checkScrollSlide() {
    let oParent = document.getElementById('main');
    let oBoxes = getByClass(oParent, 'box');
    let lastBoxH = oBoxes[oBoxes.length - 1].offsetTop + Math.floor(oBoxes[oBoxes.length - 1].offsetHeight / 2);
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxH < scrollTop + height) ? true : false;
}


function render() {
    let oMain = document.getElementById('main');
    for (let i = 0; i < data.img.length; i++) {
        let oBox = document.createElement('div');
        oBox.className = 'box';
        oMain.appendChild(oBox);
        let oPic = document.createElement('div');
        oPic.className = 'pic';
        oBox.appendChild(oPic);
        let oImg = document.createElement('img');
        oImg.src = 'images/' + data.img[i].src;
        oPic.appendChild(oImg);
    }
}
