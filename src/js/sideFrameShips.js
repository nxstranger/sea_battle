let frameRightShips = document.getElementById("left-ships")
let frameLeftShips = document.getElementById("right-ships")
let ships = [ [4, 1], [3, 2], [2, 3], [1, 4] ]

document.createElement('div')

function drawFrames(shipsArray, target, enemy=false) {
    let iterator = 5
    for (let elem of shipsArray){
        iterator--
        // console.log(elem)
        let shipsMenuElement = document.createElement('div')
        shipsMenuElement.classList = "ships-menu__main";
        (enemy) ? shipsMenuElement.classList.add("direction_row_reverse"): shipsMenuElement.classList.add("direction_row")

        let shipsMenuCounter = document.createElement('div')
        shipsMenuCounter.classList = "ships-menu__counter"
        shipsMenuCounter.id = !enemy ? `counter-usr-${iterator}` : `counter-enm-${iterator}`
        shipsMenuCounter.innerText = elem[1]

        let shipsMenuShip = document.createElement('div')
        shipsMenuShip.classList = "ships-menu__block"
        shipsMenuShip.id = !enemy ? `block-usr-${iterator}` : `block-enm-${iterator}`


        if (elem[0] > 1){
            drawVerticalShip(shipsMenuShip, elem, enemy)
        }
        drawHorizontalShip(shipsMenuShip, elem, enemy)

        shipsMenuElement.appendChild(shipsMenuCounter)
        shipsMenuElement.appendChild(shipsMenuShip)
        target.appendChild(shipsMenuElement)
    }

}

function drawVerticalShip(targetDiv, shipParam, enemy=false){
    let wrapper = document.createElement('div')
    wrapper.classList.add('ships-menu__wrapper_v')

    let shipDiv = document.createElement('div')
    shipDiv.classList.add('ships-menu__ship_v', 'ship')
    if (!enemy) {
        shipDiv.id = `shipV${shipParam[0]}`
    }
    shipDiv.style.width = "2vw";
    shipDiv.style.height = (2 * shipParam[0]) + "vw";


    wrapper.appendChild(shipDiv)
    targetDiv.appendChild(wrapper)
}

function drawHorizontalShip(targetDiv, shipParam, enemy=false){
    let wrapper = document.createElement('div')
    wrapper.classList.add('ships-menu__wrapper_h')

    let shipDiv = document.createElement('div')
    shipDiv.classList.add('ships-menu__ship_h', 'ship')
    if (!enemy) {
        shipDiv.id = `shipH${shipParam[0]}`
    }


    shipDiv.style.width = (2 * shipParam[0]) + "vw";
    shipDiv.style.height = "2vw";

    wrapper.appendChild(shipDiv)
    targetDiv.appendChild(wrapper)
}

drawFrames(ships, frameRightShips)
drawFrames(ships, frameLeftShips, true)