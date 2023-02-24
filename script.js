// кнопки
const buttonsWraper = document.createElement('div');
      

  
buttonsWraper.classList.add('buttons');

for(i = 1; i <= 3; i++){
    let button = document.createElement('button');
    button.classList.add('buttons__item');
    buttonsWraper.appendChild(button);
}


document.body.appendChild(buttonsWraper);

const buttons = document.querySelectorAll('.buttons__item');

document.querySelector('.buttons').style.cssText = `
    margin: 30px auto;
    width: 80%;
    display: flex;
    gap: 20px;
    justify-content: space-around;
`;

const setStyle = (button) => {
    button.style.cssText = `
        padding: 20px 30px;
        font-size: 20px;
        font-weight: 500;
        border-radius: 15px;
        border: 2px solid grey;
        box-shadow: -2px 2px 5px grey;
        transition: all 0.2s linear;
    `;

    button.addEventListener('mouseover', () => {  
        button.style.cursor = 'pointer';
        button.style.position = 'relative';
        button.style.left = '-2px';
        button.style.bottom = '-2px';
        button.style.boxShadow = 'none';
    })

    button.addEventListener('mouseout', () => {  
        button.style.boxShadow = '-2px 2px 5px grey';
        button.style.position = 'relative';
        button.style.left = '0';
        button.style.bottom = '0';
    })
}
buttons.forEach((item, index) => {
    
    setStyle(item);

    switch (index) {
        case 0:
            item.textContent = 'Текущее время';
            item.classList.add('now');
            break;

        case 1:
            item.textContent = 'Секундомер';
            item.classList.add('stopwatch');
            break;

        case 2:
            item.textContent = 'Обратный отсчет';
            item.classList.add('countdown');
            break;
    
        default:
            break;
    }
})

// цифры

const clockWraper = document.createElement('div'),
      clock = document.createElement('span');
let localTime = new Date().toLocaleTimeString();

document.body.appendChild(clockWraper);
clockWraper.style.cssText = `
    display: flex;
    justify-content: center;
    margin-top: 150px;
`;
clock.style.fontSize = '120px';
clockWraper.appendChild(clock);

const timerText = document.createElement('span');
document.body.appendChild(timerText);

// часы
clocks();

function clocks() {
    clock.textContent = localTime;
    timerText.textContent = '';
    function getTime() {
        localTime = new Date().toLocaleTimeString();
        clock.textContent = localTime;
    };

    const clocksTimer = setInterval(getTime, 1000);
    clearTimer(clocksTimer);
    if(document.querySelector('.stopwatch-buttons')){
        document.querySelector('.stopwatch-buttons').remove();
    }
}

// секундомер
function stopwatch (){
    const clockButtonsWraper = document.createElement('div');
    clockButtonsWraper.classList.add('stopwatch-buttons');
    timerText.textContent = '';

    let msec = 0,
        sec = 0,
        min = 0,
        timer;

    clock.textContent = `00:00:00`;

    function startTimer() {
        msec += 10;
        if (msec === 1000) {
        msec = 0;
        sec++;
        }
        if (sec === 60) {
        sec = 0;
        min++;
        }
        clock.textContent = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}:${msec < 100 ? (msec < 10 ? '00' + msec : '0' + msec): msec}`.slice(0,length-1);
    }

    if(!document.querySelector('.stopwatch-buttons')){

        document.body.appendChild(clockButtonsWraper);

        clockButtonsWraper.style.cssText = `
            margin: 30px auto;
            width: 50%;
            display: flex;
            gap: 20px;
            justify-content: space-around;
        `;

        for(i = 1; i <= 3; i++){
            let clockButton = document.createElement('button');
            clockButton.classList.add('clockButtons-item');
            clockButtonsWraper.appendChild(clockButton);
        }
    
        document.querySelectorAll('.clockButtons-item').forEach((item, index) => {
            setStyle(item);
    
            switch (index) {
                case 0:
                    item.textContent = 'Старт';
                    item.classList.add('start');
                    break;
                
                case 1:
                    item.textContent = 'Стоп';
                    item.classList.add('stop');
                    break;
                
                case 2:
                    item.textContent = 'Сбросить';
                    item.classList.add('reset');
                    break;
            
                default:
                    break;
            }
        })
        document.querySelector('.start').addEventListener("click", () => {
            timer = setInterval(startTimer, 10);
            document.querySelector('.start').disabled = true;
            clearTimer(timer);
        });
        
        document.querySelector('.stop').addEventListener("click", () => {
            clearInterval(timer);
            document.querySelector('.start').disabled = false;
            setStyle(document.querySelector('.start'));
        });
        
        document.querySelector('.reset').addEventListener("click", () => {
            clearInterval(timer);
            msec = 0, sec = 0, min = 0;
            clock.textContent = '00:00:00';
            document.querySelector('.start').disabled = false;
            setStyle(document.querySelector('.start'));
        });
    }

    clearTimer(timer);
}

// обратный отсчет
function countdown(endtime){
    const timer = (endtime) => {
        const getTime = () => {
            const total = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(total/1000/60/60/24),
              hours = Math.floor((total/1000/60/60) % 24),
              minutes = Math.floor((total/1000/60) % 60),
              seconds = Math.floor((total/1000) % 60);
        
            clock.textContent = `${days}:${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }
        getTime();
        const countdownTimer = setInterval(getTime, 1000);
        clearTimer(countdownTimer);
    }
    timer(endtime);
    if(document.querySelector('.stopwatch-buttons')){
        document.querySelector('.stopwatch-buttons').remove();
    }
    
    timerText.textContent = 'Осталось до Нового Года';
    timerText.style.cssText = `
        font-size: 40px;
        margin: 40px auto;
        display: block;
        max-width: 80%;
        text-align: center;
    `;
}



function clearTimer(timer) {
    document.querySelectorAll('.buttons__item').forEach(item => {
        item.addEventListener('click', () => {
                clearInterval(timer);
            });
    })
}


document.querySelector('.now').addEventListener('click', clocks);
document.querySelector('.stopwatch').addEventListener('click', stopwatch);
document.querySelector('.countdown').addEventListener('click', () => {countdown('2024-01-01');});





