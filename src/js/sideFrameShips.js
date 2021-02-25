let frameRightShips = document.getElementById("left-ships")
let frameLeftShips = document.getElementById("right-ships")
let ships = [ [4, 1], [3, 2], [2, 3], [1, 4] ]

document.createElement('div')

function drawFrames(shipsArray, target) {
    for (let elem of shipsArray){
        console.log(elem)

        let shipsMenuElement = document.createElement('div')
        shipsMenuElement.classList = "ships-menu__main"

        let shipsMenuCounter = document.createElement('div')
        shipsMenuCounter.classList = "ships-menu__counter"
        shipsMenuCounter.innerText = elem[1]

        let shipsMenuShip = document.createElement('div')
        shipsMenuShip.classList = "ships-menu__ship"

        shipsMenuElement.appendChild(shipsMenuCounter)
        shipsMenuElement.appendChild(shipsMenuShip)
        target.appendChild(shipsMenuElement)
    }

}

function drawShip(target, shipParam){
    let ship = document.createElement('div')

}

drawFrames(ships, frameRightShips)
drawFrames(ships, frameLeftShips)