// let userFieldArray = Array(10).fill(Array(10).fill(0))
// console.log(userFieldArray)

// document.addEventListener('contextmenu', event => event.preventDefault());


const userFieldSet = new Set()

class ShipPool{
    constructor(isUser){
        this["1"] = 0
        this["2"] = 0
        this["3"] = 0
        this["4"] = 0
        this.isUser = isUser
        this.limit = ["",4,3,2,1]
    }


    add(ship){
        //ship value 1-4
        // console.log('ship')
        // console.log(ship)
        this[ship] = this[ship] + 1
        // console.log(this)
        this.updateCounter(ship)
    }

    updateCounter(ship){
        //ship value 1-4
        // console.log('it update a counter')
        let counterObj = document.getElementById(`counter-usr-${ship}`)
        counterObj.innerText = this.limit[+ship] - +this[ship]
        if (this.checkLimit(ship)){
            // console.log('update counter -> check limit')
            this.updateShipFrame(ship)
        }
        // console.log(counterObj)
    }

    checkLimit(ship){
        //ship value 1-4
        // return true if limit for this type
        let limit = ["",4,3,2,1]
        console.log('this[ship] === limit[+ship]')
        console.log(this[ship])
        console.log(limit[+ship])
        return this[ship] === limit[+ship];
    }

    updateShipFrame(ship){
        //ship value 1-4
        console.log("update ship frame")
        let blockId = this.isUser ? `block-usr-${ship}`: `block-enm-${ship}`
        for (let objShip of document.getElementById(blockId).childNodes){
            // console.log("objShip")
            console.log(objShip)
            // console.log(objShip.style.background = 'gray')
            objShip.style.background = 'gray'
            objShip.style.display = "none"
            objShip.classList.remove('drag_n_drop')
        }
    }


}

const userShipPool = new ShipPool(true)


function placeShipOnField(objShipInfo, cellObj){
    const alphabet = "zabcdefghij"                    // z - unused, only for convenience
    const shipType = objShipInfo.slice(0, 1)          // H or V
    const shipLength = objShipInfo.slice(1)           // 1-4
    const startCellCoordinatesObject = {
        "litY": cellObj.id[4],                      // a-j
        "litX": +cellObj.id.slice(5)                // 1-10
    }

    function checkSize(type, length, startCell){
        // check ship in field range
        if ((type === "V" && alphabet.indexOf(startCell.litY) + +length <= 11) ||
            (type === "H" && startCell.litX + +length <= 11))
        {
            console.log("size OK")
            return true
        } else {
            console.log("size error")
            return false
        }
    }

    function calcShipCells(shipType, shipLength, targetObj) {
        // shipType "H" / "V", ship length: int, targetObj: { "litY": char, "litX": int }
        // return set of cells id required for placement ship

        let startIndexX = targetObj.litX
        let startIndexY = alphabet.indexOf(targetObj.litY)
        let cellSet = new Set()
        for (let iter = 0; iter < shipLength; iter++){
            let cellId = ""
            switch (shipType){
                case "H":
                    cellId = "usr-" + alphabet[startIndexY] + (startIndexX + iter)
                    break;
                case "V":
                    cellId = "usr-" + alphabet[startIndexY + iter] + (startIndexX)

                    break;
                default:
                    alert("Ошибка в модуле shipArrangement")
            }
            if (cellId){
                cellSet.add(cellId)
            }

        }
        console.log(cellSet)
        return cellSet
    }

    function findNeighbors(cellSet){
        // return neighborsSet of cellSet (ship)
        let neighborsSet = new Set()
        let xMin = 10
        let xMax = 0
        let yMin = 10
        let yMax = 0
        let cellId = ""
        for (let elem of cellSet){
            let cell = elem
            cellSet.add(cell)

            let cellLocate = {
                "X": +cell.slice(5),                // 1-10
                "Y": alphabet.indexOf(cell[4])      // 1-10
            }
            xMin = xMin < cellLocate.X ? xMin : cellLocate.X
            xMax = xMax > cellLocate.X ? xMax : cellLocate.X
            yMin = yMin < cellLocate.Y ? yMin : cellLocate.Y
            yMax = yMax > cellLocate.Y ? yMax : cellLocate.Y
        }
        let iterRange = {
            "xStart":   xMin > 1 ? xMin - 1 : xMin,
            "xEnd":     xMax < 10 ? xMax + 1 : xMax,
            "yStart":   yMin > 1 ? yMin - 1 : yMin,
            "yEnd":     yMax < 10 ? yMax + 1: yMax
        }
        // console.log(iterRange)
        for (let x = iterRange.xStart; x <= iterRange.xEnd; x++){
            for (let y = iterRange.yStart; y <= iterRange.yEnd; y++){
                cellId = "usr-" + alphabet[y] + (x)
                // cellId = document.getElementById(cellId)
                neighborsSet.add(cellId)
            }
        }
        for (let itemSet of cellSet){
            neighborsSet.delete(itemSet)
        }
        console.log(neighborsSet)
        return neighborsSet
    }

    function addToMainSet(subSet){
        // add to userFieldSet elements of subSet
        for(let elem of subSet){
            userFieldSet.add(elem)
        }
    }

    function coordinatesToId(xPos,yPos){
        // args values interval: 1-10
        // return string cellId like "usr-a10"
        let yChar = alphabet[yPos]
        return `usr-${yChar}${xPos}`
    }

    function checkOccupiedCells(subSet){
        for (let elem of subSet){
            if (userFieldSet.has(elem)) {
                return true
            }
        }
        return false
    }

    function shipPlacement(cellSet){
        for (let elem of cellSet){
            document.getElementById(elem).style.background = 'cyan'
        }
    }

    // function entrypoint
    if (checkSize(shipType, shipLength, startCellCoordinatesObject)) {
        console.log('checkSize')
        let shipPositionCellSet = calcShipCells(shipType, shipLength, startCellCoordinatesObject)
        if (checkOccupiedCells(shipPositionCellSet)){
            return false
        }
        let shipNeighborsSet = findNeighbors(shipPositionCellSet)

        addToMainSet(shipPositionCellSet)
        addToMainSet(shipNeighborsSet)
        console.log(userFieldSet)

        shipPlacement(shipPositionCellSet)
        return true
    }

}

function dragAndDropHandler(ev){
    // console.log(ev.path[0])
    // console.log(ev)

    ev.preventDefault()
    let movedElem = ev.path[0].cloneNode(false)
    let shiftY = ev.clientY - ev.path[0].getBoundingClientRect().top;
    let shiftX = ev.clientX - ev.path[0].getBoundingClientRect().left;
    movedElem.style.position = "absolute"
    movedElem.style.top = ev.pageY - shiftY  + 'px'
    movedElem.style.left = ev.pageX - shiftX + 'px'
    document.body.appendChild(movedElem)

    // console.log(`${ev.path[0].getBoundingClientRect().left} ${ev.path[0].getBoundingClientRect().top}`)

    function moveAt(pageX, pageY) {
        movedElem.style.top = pageY - shiftY + 'px';
        movedElem.style.left = pageX - shiftX + 'px';
    }

    function onMouseMove(ev) {
        moveAt(ev.pageX, ev.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    movedElem.onmouseup = function(ev) {
        document.removeEventListener('mousemove', onMouseMove);
        movedElem.onmouseup = null;

        let shipInfo = movedElem.id
        let targetCoordinates = {
            "x": movedElem.getBoundingClientRect().left + window.innerWidth/100,
            "y": movedElem.getBoundingClientRect().top + window.innerWidth/100
        }
        movedElem.remove()

        let targetObj =  document.elementFromPoint(targetCoordinates.x, targetCoordinates.y)

        if (targetObj.classList.contains('field__table-cell') &&
            targetObj.id &&
            (targetObj.closest('div[id]').id === "user-field")){
            if (placeShipOnField(shipInfo.slice(4), targetObj)){
                userShipPool.add(shipInfo.slice(5))
            }
        }
        // console.log("object drop")
    };
}



for (let elem of document.getElementsByClassName("ship")){
    if (elem.id){
        elem.classList.add('drag_n_drop')
    }
}

document.body.addEventListener('mousedown', (ev)=>{
    if (ev.path[0].classList.contains("drag_n_drop") && ev.path[0].style.position === "absolute") {
        // fix flying elem
        ev.path[0].remove()
    } else if (ev.path[0].classList.contains("drag_n_drop")) {
        // console.log("object dragstart ")
        dragAndDropHandler(ev)
    }
})

