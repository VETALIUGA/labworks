let timeContainer = document.querySelector('.header__clock');
let dateContainer = document.querySelector('.header__date');
let date = new Date();
timeContainer.textContent = `${zeroCheck(date.getHours())}:${zeroCheck(date.getMinutes())}:${zeroCheck(date.getSeconds())}`;
dateContainer.textContent = `${zeroCheck(date.getDate())}.${zeroCheck(date.getMonth())}.${zeroCheck(date.getFullYear())}`;
setInterval(() => {
    date = new Date();
    timeContainer.textContent = `${zeroCheck(date.getHours())}:${zeroCheck(date.getMinutes())}:${zeroCheck(date.getSeconds())}`;
}, 1000);

function zeroCheck(value) {   
    if (value.toString().length > 1) {
        return value;
    } else {
        return '0' + value;
    }

}