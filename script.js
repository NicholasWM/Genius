let order = []
let clickOrder = []
let score = 0

const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const green = document.querySelector('.green')
const yellow = document.querySelector('.yellow')
const scoreElement = document.querySelector('.score')
const messageElement = document.querySelector('.message')

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4)
    order[order.length] = colorOrder
    clickOrder = []

    for (const i in order) {
        let elementColor = createColorElement(order[i])
        lightColor(elementColor, Number(i) + 1)
    }
}

let lightColor = (element, time) => {
    time = time * 500
    setTimeout(()=> {
        element.classList.add('selected')
    }, time - 250)

    setTimeout(()=> {
        element.classList.remove('selected')
    }, time)
}

let checkOrder = () => {
    for (const i in clickOrder) {
        if(Number(clickOrder[i]) != Number(order[i])){
            gameOver()
            break
        }
        
        if(clickOrder.length === order.length){
            nextLevel()
            addScore()
            break
        }
    }
}

let click = (color) => {
    console.log("Click");
    clickOrder.push(color)
    console.log(clickOrder);
    createColorElement(color).classList.add('selected')
    
    setTimeout(()=> {
        createColorElement(color).classList.remove('selected')
        checkOrder()
    }, 250)
}

let createColorElement = (colorIndex)=> {
    const colors = [
        green,
        red,
        yellow,
        blue,
    ]
    return colors[colorIndex]
}

let nextLevel = () => {
    shuffleOrder();
}
let addScore = () => {
    score++;
    scoreElement.innerText = `Score: ${score}`
}

let gameOver = () => {
    messageElement.innerText = `Game Over!`
    order = [];
    clickOrder = [];
    setTimeout(()=> {
        playGame()
    }, 2000)
}

let playGame = () => {
    score = 0;
    scoreElement.innerText = `Score: ${score}`
    messageElement.innerText = `Bem vindo ao Genesis! Seu jogo começara em alguns segundos...`
    setTimeout(()=> {
        messageElement.innerText = ``
        nextLevel();
    }, 2000)
}

green.addEventListener('click', () => click(0))
red.addEventListener('click', () => click(1))
yellow.addEventListener('click', () => click(2))
blue.addEventListener('click', () => click(3))


green.onClick = () => click(0)
red.onClick = () => click(1)
yellow.onClick = () => click(2)
blue.onClick = () => click(3)

playGame()