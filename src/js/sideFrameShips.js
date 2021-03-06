let frameRightShips = document.getElementById("left-ships")
let frameLeftShips = document.getElementById("right-ships")
let shipsTypeAndLimit = [ [4, 1], [3, 2], [2, 3], [1, 4] ]

function drawFrames(shipsArray, target, enemy=false) {
    let iterator = 5
    target.innerHTML = ""
    for (let elem of shipsArray){
        iterator--
        // console.log(elem)
        let shipsMenuElement = document.createElement('div')
        shipsMenuElement.classList.add("ships-menu__main");
        (enemy) ? shipsMenuElement.classList.add("direction_row_reverse"): shipsMenuElement.classList.add("direction_row")

        let shipsMenuCounter = document.createElement('div')
        shipsMenuCounter.classList.add("ships-menu__counter")
        shipsMenuCounter.id = !enemy ? `counter-usr-${iterator}` : `counter-enm-${iterator}`
        shipsMenuCounter.innerText = elem[1]

        let shipsMenuShip = document.createElement('div')
        shipsMenuShip.classList.add("ships-menu__block")
        shipsMenuShip.id = !enemy ? `block-usr-${iterator}` : `block-enm-${iterator}`

        if (elem[0] > 1){
            drawShip(shipsMenuShip, elem, enemy, true)
        }
        drawShip(shipsMenuShip, elem, enemy)

        shipsMenuElement.appendChild(shipsMenuCounter)
        shipsMenuElement.appendChild(shipsMenuShip)
        target.appendChild(shipsMenuElement)
    }

}

function drawShip(targetDiv, shipParam, enemy=false, direction=false){
    // direction false - horizontal / true - vertical

    let wrapper = document.createElement('div')
    wrapper.classList.add(direction ? 'ships-menu__wrapper_v' : 'ships-menu__wrapper_h')

    let shipDiv = document.createElement('div')
    shipDiv.classList.add('ship')
    shipDiv.classList.add( direction ? 'ships-menu__ship_h' : 'ships-menu__ship_h')

    if (!enemy) {
        shipDiv.id = direction ? `shipV${shipParam[0]}` : `shipH${shipParam[0]}`
    }
    shipDiv.style.width = direction ? "2vw" : (2 * shipParam[0]) + "vw";
    shipDiv.style.height = direction ? (2 * shipParam[0]) + "vw" : "2vw";

    wrapper.appendChild(shipDiv)
    targetDiv.appendChild(wrapper)
}

drawFrames(shipsTypeAndLimit, frameRightShips)
drawFrames(shipsTypeAndLimit, frameLeftShips, true)

for (let elem of document.getElementsByClassName("ship")){
    if (elem.id){
        elem.classList.add('drag_n_drop')
    }
}
