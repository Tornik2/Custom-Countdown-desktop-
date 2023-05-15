const dateInp = document.getElementById("date-inp")
const titleInp = document.getElementById("text-inp")
const btn = document.querySelector('button')
const resetBtn = document.querySelector('.reset')
const timeElements = document.querySelectorAll('span')
const countdownTitle = document.querySelector('.countdown-title')
const remainingTime = document.querySelector('.time')
const mainDiv = document.querySelector('.main')
const countdownDiv = document.querySelector('.countdown')

let chosenDate
let chosenDateValue
// Set Calendar minimum date to TODAY
let date = new Date()
let dateNow = date.toISOString().split('T')[0]
dateInp.setAttribute('min', dateNow)


const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24
let days
let hours
let minutes
let seconds
let interval

if (localStorage.getItem("PickedDate")) {
    let timeFromStorage = localStorage.getItem("PickedDate").split(',')
    mainDiv.style.display = "none"
    chosenDateValue = timeFromStorage[0]
    titleInp.value = timeFromStorage[1]

    startCountDown()
}

btn.addEventListener('click', ()=>{
    if (titleInp.value && dateInp.value) {
        mainDiv.style.display = "none"

        // time from 1957? till  chosen date
        chosenDate = new Date(dateInp.value)
        chosenDateValue = chosenDate.getTime()
        localStorage.setItem("PickedDate", [chosenDateValue, titleInp.value])
        
        startCountDown()        
    }  else {
        alert('Please fill all the inputs')
    }
})

resetBtn.addEventListener('click', ()=> {
    localStorage.removeItem("PickedDate")
    titleInp.value = ''
    dateInp.value = ''
    mainDiv.style.display = "grid"
    countdownDiv.style.display = "none"
    clearInterval(interval)
})

function getCountdownHtml () {
    timeElements[0].textContent = days
    timeElements[1].textContent = hours
    timeElements[2].textContent = minutes
    timeElements[3].textContent = seconds
    countdownTitle.textContent = titleInp.value
}

function startCountDown() {
    let distance
    interval = setInterval(() => {
        // time passed since 1957? till now
        let timeNowValue = new Date().getTime()
        
        
        //distance from today till chosen date
        distance = chosenDateValue - timeNowValue
        days = Math.floor(distance / day)
        hours = Math.floor((distance % day) / hour)
        minutes = Math.floor((distance % hour) / minute)
        seconds = Math.floor((distance % minute) / second)
        countdownDiv.style.display = "grid"
        getCountdownHtml()
        if (distance < 1) {
        remainingTime.style.display = 'none'
        clearInterval(interval)
        countdownTitle.innerHTML = `
        <p>Your Countdown is Finished ! ! !</p>
        <p>Reset and start a new one</p>
        `
    }
    }, 1000);

    
}

