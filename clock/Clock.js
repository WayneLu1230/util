
//画表盘
function drawBg(ctx, rem, r, width) {
    ctx.save();
    ctx.translate(width / 2, width / 2);  //重新映射中心位置到canvas中间，默认是在左上角
    ctx.lineWidth = 4 * rem;

    const lingrad = ctx.createLinearGradient(150, 0, -150, 0);
    lingrad.addColorStop(0, '#242f37');
    lingrad.addColorStop(1, '#48585c');
    ctx.fillStyle = lingrad;

    ctx.arc(0, 0, r, 0, 2 * Math.PI);  //这里虽然想不通为什么，但的确是减去线宽的一半。
    ctx.stroke();
    ctx.fill();
}

//画刻度
function drawScale(ctx, rem, r) {
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
function drawHour(hour, min, ctx, rem, r) {
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
function drawMin(min, ctx, rem, r) {
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
function drawSec(sec, ctx, rem, r) {
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
function drawDot(ctx, rem) {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(0, 0, 6 * rem, 0, 2 * Math.PI);
    ctx.fill();
}

//画动态时钟
function draw(ctx, rem, r, width, height) {
    ctx.clearRect(0, 0, width, height); //每秒清除一次矩形
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    drawBg(ctx, rem, r, width);
    drawScale(ctx, rem, r);
    drawHour(h, m, ctx, rem, r);
    drawMin(m, ctx, rem, r);
    drawSec(s, ctx, rem, r);
    drawDot(ctx, rem);
    ctx.restore();
}

function createClock() {

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


    //定时器
    setInterval(() => draw(ctx, rem, r, width, height), 1000);
    draw(ctx, rem, r, width, height); //先执行一次，不然页面会卡一下。
}

export default createClock;



