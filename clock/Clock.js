const div = document.getElementById('clock');
const fragment = document.createDocumentFragment();
const canvas = document.createElement('canvas');
canvas.height = 200;
canvas.width = 200;
const ctx = canvas.getContext('2d');
const width = ctx.canvas.width;
const height = ctx.canvas.height;
const rem = width / 300; //比例，使时钟放大时保持外观一直
const r = width / 2 - 8 * rem;  //预留了阴影和线宽的位置；因为r已经是和width相关的，因此下面的r不需要再*rem
fragment.appendChild(canvas);
div.appendChild(fragment);

//画表盘
function drawBg() {
    ctx.save();
    ctx.translate(width / 2, width / 2);  //重新映射中心位置到canvas中间，默认是在左上角
    ctx.lineWidth = 4 * rem;
    // ctx.strokeStyle = "#666";  //边框颜色
    // var grd = ctx.createRadialGradient(0, 0, 10 * rem, 0, 0, r); // 表示渐变范围是半径10到r的位置
    // grd.addColorStop(0, "#fefefe");
    // grd.addColorStop(1, "#dedede");
    // ctx.fillStyle = grd;  //这一句不能少，填充的颜色是上面定义的渐变色

    const lingrad = ctx.createLinearGradient(150, 0, -150, 0);
    lingrad.addColorStop(0, '#242f37');
    lingrad.addColorStop(1, '#48585c');
    ctx.fillStyle = lingrad;

    ctx.arc(0, 0, r, 0, 2 * Math.PI);  //这里虽然想不通为什么，但的确是减去线宽的一半。
    ctx.stroke();
    ctx.fill();
}

//画刻度
function drawScale() {
    for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        if (i % 5 == 0) {
            ctx.strokeStyle = "#ECF0F1";
            ctx.lineWidth = 3;
            ctx.lineTo((r - 12 * rem) * Math.cos(2 * Math.PI / 60 * i), (r - 12 * rem) * Math.sin(2 * Math.PI / 60 * i));
        } else {
            ctx.strokeStyle = "#D0D3D4";
            ctx.lineWidth = 2;
            ctx.lineTo((r - 8 * rem) * Math.cos(2 * Math.PI / 60 * i), (r - 8 * rem) * Math.sin(2 * Math.PI / 60 * i));
        }
        ctx.lineTo(r * Math.cos(2 * Math.PI / 60 * i), r * Math.sin(2 * Math.PI / 60 * i));
        ctx.stroke();
    }
}

//画时针
function drawHour(hour, min) {
    ctx.save();  //不加这个的话，分针直接从时针处开始算。
    ctx.beginPath();
    ctx.lineWidth = 6 * rem;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#ECF0F1";
    ctx.rotate(2 * Math.PI / 12 * (hour - 3) + 2 * Math.PI / 12 / 60 * min);  //起始角在3那里
    ctx.moveTo(-15 * rem, 0);
    ctx.lineTo(r / 2, 0);
    ctx.stroke();
    ctx.restore();
}

//画分针
function drawMin(min) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 3 * rem;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#ECF0F1";
    ctx.rotate(2 * Math.PI / 60 * (min - 15));  //起始角在3那里
    ctx.moveTo(-15 * rem, 0);
    ctx.lineTo(r / 2 + 30 * rem, 0);
    ctx.stroke();
    ctx.restore();
}

//画秒针
function drawSec(sec) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#ECF0F1";
    ctx.rotate(2 * Math.PI / 60 * (sec - 15));  //起始角在3那里
    ctx.moveTo(-15 * rem, 2 * rem);
    ctx.lineTo(-15 * rem, -2 * rem);
    ctx.lineTo(r - 8 * rem, -1 * rem);
    ctx.lineTo(r - 8 * rem, 1 * rem);
    ctx.fill();
    ctx.restore();
}

//画固定点
function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(0, 0, 6 * rem, 0, 2 * Math.PI);
    ctx.fill();
}

//画动态时钟
function draw() {
    ctx.clearRect(0, 0, width, height); //每秒清除一次矩形
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    drawBg();
    drawScale();
    drawHour(h, m);
    drawMin(m);
    drawSec(s);
    drawDot();
    ctx.restore();
}

//定时器
setInterval(draw, 1000);
draw(); //先执行一次，不然页面会卡一下。

//----------------------------------------------------

// function clock() {
//
//     let canvas = document.getElementById('canvas');
//     canvas.width = 400;
//     canvas.height = 400;
//     var ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//     //绘制表盘底色
//     ctx.translate(200, 200); //将坐标原点移到画布中心
//     ctx.rotate(-Math.PI / 2); //将坐标轴逆时针旋转90度，x轴正方向对准12点方向
//     var lingrad = ctx.createLinearGradient(150, 0, -150, 0);
//     lingrad.addColorStop(0, '#242f37');
//     lingrad.addColorStop(1, '#48585c');
//     ctx.fillStyle = lingrad;
//     ctx.beginPath();
//     ctx.arc(0, 0, 150, 0, Math.PI * 2, true);
//     ctx.fill();
//
//     //小时刻度
//     for (var i = 0; i < 12; i++) {
//         ctx.beginPath();
//         ctx.strokeStyle = '#fff';
//         ctx.lineWidth = 3;
//         ctx.rotate(Math.PI / 6);
//         ctx.moveTo(140, 0);
//         ctx.lineTo(120, 0);
//         ctx.stroke();
//     }
//
//     //分钟刻度
//     for (i = 0; i < 60; i++) {
//         if (i % 5 !== 0) { //去掉与小时刻度重叠的部分
//             ctx.beginPath();
//             ctx.strokeStyle = '#536b7a';
//             ctx.lineWidth = 2;
//             ctx.moveTo(140, 0);
//             ctx.lineTo(130, 0);
//             ctx.stroke();
//         }
//         ctx.rotate(Math.PI / 30);
//     }
//
//     //获取当前的时间，把小时转换为12小时制
//     var now = new Date(),
//         sec = now.getSeconds(),
//         min = now.getMinutes(),
//         hr = now.getHours();
//     hr = hr > 12 ? hr - 12 : hr;
//
//     //表针的位置（相对于x轴正方向转过的角度）：
//
//     ctx.beginPath();
//     ctx.strokeStyle = '#536b7a';
//     ctx.lineWidth = 6;
//     ctx.moveTo(140, 0);
//     ctx.lineTo(130, 0);
//     ctx.lineCap = "round";
//     ctx.strokeStyle = "red";
//     ctx.rotate(hr * (Math.PI / 6) + min * (Math.PI / 360) + sec * (Math.PI / 21600)); //时针
//     ctx.stroke();
//     ctx.restore();
//
//     ctx.beginPath();
//     ctx.strokeStyle = '#536b7a';
//     ctx.lineWidth = 10;
//     ctx.moveTo(140, 0);
//     ctx.lineTo(130, 0);
//     ctx.lineCap = "round";
//     ctx.strokeStyle = "green";
//     ctx.rotate(min * (Math.PI / 30) + sec * (Math.PI / 1800)); //分针
//     ctx.stroke();
//     ctx.restore();
//
//
//     ctx.beginPath();
//     ctx.strokeStyle = '#536b7a';
//     ctx.lineWidth = 10;
//     ctx.moveTo(140, 0);
//     ctx.lineTo(130, 0);
//     ctx.lineCap = "round";
//     ctx.strokeStyle = "yellow";
//     ctx.rotate(sec * (Math.PI / 30)); //秒针
//     ctx.stroke();
//     ctx.restore();
//
//
//     // ctx.fill();
// }
//
// var timer = setInterval(clock, 1000);
//
// // window.requestAnimationFrame(clock);
