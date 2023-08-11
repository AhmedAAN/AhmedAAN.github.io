const container = document.querySelector('.container')
const main = document.querySelector('.main')
const night = document.querySelector('.night')
const day = document.querySelector('.day')
function nightMode() {
    container.classList.toggle("dark");
    main.classList.toggle("dark");
    night.classList.toggle("active");
    container.classList.remove("light");
    main.classList.remove("light");
    day.classList.remove("active");
    body.style.background = ``
    selector_l.value = '#ffffff'
    selector_r.value = '#272727'
    color.innerHTML = `(Dark Mode)`
}
function lightMode() {
    container.classList.toggle("light");
    main.classList.toggle("light");
    day.classList.toggle("active");
    container.classList.remove("dark");
    main.classList.remove("dark");
    night.classList.remove("active");
    body.style.background = ``
    selector_l.value = '#ffffff'
    selector_r.value = '#272727'
    color.innerHTML = `(Light Mode)`
}

night.addEventListener('click', nightMode)
day.addEventListener('click', lightMode)


const selector_r = document.querySelector('.color-selector-r')
const selector_l = document.querySelector('.color-selector-l')
const body = document.querySelector('.container')
const color = document.querySelector('.color')
const random = document.querySelector('.random')
color.innerHTML = `(to bottom right, ${selector_l.value}, ${selector_r.value})`
function setBackgroundColor () {
    container.classList.remove("light");
    main.classList.remove("light");
    container.classList.remove("dark");
    main.classList.remove("dark");
    night.classList.remove("active");
    day.classList.remove("active");
    body.style.background = `linear-gradient(to bottom right, ${selector_l.value}, ${selector_r.value})`
    color.innerHTML = `(to bottom right, ${selector_l.value}, ${selector_r.value})`
}
function randomize() {
    container.classList.remove("light");
    main.classList.remove("light");
    container.classList.remove("dark");
    main.classList.remove("dark");
    night.classList.remove("active");
    day.classList.remove("active");
    const maxVal = 0xFFFFFF;
    let leftColor = '#' + Math.floor(Math.random() * maxVal).toString(16).padStart(6,0);
    let rightColor = '#' + Math.floor(Math.random() * maxVal).toString(16).padStart(6,0);

    selector_l.value = `${leftColor}`
    selector_r.value = `${rightColor}`
    body.style.background = `linear-gradient(to bottom right, ${leftColor}, ${rightColor})`
    color.innerHTML = `(to bottom right, ${leftColor}, ${rightColor})`
}
selector_l.addEventListener('input', setBackgroundColor)
selector_r.addEventListener('input', setBackgroundColor)
random.addEventListener('click', randomize)
