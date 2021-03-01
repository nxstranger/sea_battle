// let userFieldArray = Array(10).fill(Array(10).fill(0))
// console.log(userFieldArray)

// document.addEventListener('contextmenu', event => event.preventDefault());

const userFieldSet = new Set()


class CalculateOperator {
    constructor(isUser) {
        // user : boolean
        this.alphabet = "zabcdefghij"
        this.user = isUser ? "usr-" : "enm-"
    }

    calcShipCells(objShipInfo, targetObj) {
        // return set of cells id required for placement ship

        // console.log('objShipInfo')
        // console.log(objShipInfo)
        // console.log('targetObj')
        // console.log(targetObj)
        const shipType = objShipInfo[0]             // H or V
        const shipLength = objShipInfo[1]           // 1-4

        let startIndexX = +targetObj.id.slice(5)
        let startIndexY = this.alphabet.indexOf(targetObj.id[4])
        let cellSet = new Set()
        for (let iter = 0; iter < shipLength; iter++){
            let cellId = ""
            switch (shipType){
                case "H":
                    cellId = this.user + this.alphabet[startIndexY] + (startIndexX + iter)
                    break;
                case "V":
                    cellId = this.user + this.alphabet[startIndexY + iter] + (startIndexX)
                    break;
                default:
                    alert("Ошибка в модуле shipArrangement")
            }
            if (cellId){
                cellSet.add(cellId)
            }
        }
        return cellSet
    }

    findNeighbors(cellSet){
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
                "X": +cell.slice(5),                     // 1-10
                "Y": this.alphabet.indexOf(cell[4])      // 1-10
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
                cellId = "usr-" + this.alphabet[y] + (x)
                // cellId = document.getElementById(cellId)
                neighborsSet.add(cellId)
            }
        }
        for (let itemSet of cellSet){
            neighborsSet.delete(itemSet)
        }
        // console.log(neighborsSet)
        return neighborsSet
    }

    getRandomCoordinate(xMin, xMax, yMin, yMax){

        let cX = Math.floor(xMin + Math.random() * (xMax + 1 - xMin))
        let cY = this.alphabet[(Math.floor(yMin + Math.random() * (yMax + 1 - yMin)))]
        return `${this.user}${cY}${cX}`
    }

    // coordinatesToId(xPos,yPos){
    //     // args values interval: 1-10
    //     // return string cellId like "usr-a10"
    //     let yChar = this.alphabet[yPos]
    //     return `${this.user}${yChar}${xPos}`
    // }


    addToMainSet(mainSet, subSet){
        // add to userFieldSet elements of subSet
        for(let elem of subSet){
            mainSet.add(elem)
        }
    }

    checkOccupiedCells(mainSet, subSet){
        for (let elem of subSet){
            if (mainSet.has(elem)) {
                return true
            }
        }
        return false
    }

    shipPlacement(cellSet){
        console.log("ShipPlacement")
        for (let elem of cellSet){
            document.getElementById(elem).style.background = 'cyan'
            console.log(document.getElementById(elem))
        }
    }
}


// shipArrangement
class ShipPool{
    constructor(isUser){
        this["1"] = 0
        this["2"] = 0
        this["3"] = 0
        this["4"] = 0
        this.isUser = isUser
        this.limit = [0,4,3,2,1]
        this.shipArray = []
        this.addAutoPlacementListener()
    }

    add(ship, shipObj){
        //ship value 1-4
        this[ship] = this[ship] + 1
        this.shipArray.push(shipObj)
        console.log(this.shipArray)

        this.updateCounter(ship)
    }

    updateCounter(ship){
        //ship value 1-4
        let counterValue = this.limit[+ship] - +this[ship]
        document.getElementById(`counter-usr-${ship}`).innerText = `${counterValue}`
        if (this.checkLimit(ship)){
            this.updateShipFrame(ship)
            if (this.checkPoolIsFilled()){
                // do something
                document.getElementById('shipsAutoPlacement').remove()


                //entrypoint to starting game
                console.log("checkPoolIsFilled")
            }
        }
    }

    checkLimit(ship){
        //ship value 1-4
        // return true if limit for this type
        let limit = ["",4,3,2,1]
        return this[ship] === limit[+ship];
    }

    updateShipFrame(ship){
        //ship value 1-4
        let blockId = this.isUser ? `block-usr-${ship}`: `block-enm-${ship}`
        for (let objShip of document.getElementById(blockId).childNodes){
            // console.log(objShip)
            objShip.firstChild.style.background = 'gray'
            objShip.firstChild.classList.remove('drag_n_drop')
        }
    }

    checkPoolIsFilled(){
        return this["1"] === 4 &&
               this["2"] === 3 &&
               this["3"] === 2 &&
               this["4"] === 1;
    }


    generateShip(ship){
        let shipParam = ((Math.random() < 0.5) ? "H" : "V") + ship
        let maxCoordinateArray = (shipParam[0]==="H") ? [1, 10-ship, 1, 10] : [1, 10, 1, 10-ship]
        let cellCoordinate = userOperator.getRandomCoordinate(...maxCoordinateArray)
        console.log('cellCoordinates')
        console.log(cellCoordinate)
        let cellObj = document.getElementById(cellCoordinate)
        return userOperator.calcShipCells(shipParam, cellObj)
    }

    placeShip(ship){
        //ship value 1-4
        let requiredCells = null
        do {
            requiredCells = this.generateShip(ship)
        } while (userOperator.checkOccupiedCells(userFieldSet, requiredCells))
        console.log("requiredCells")
        console.log(requiredCells)
        let shipNeighborsSet = userOperator.findNeighbors(requiredCells)
        userOperator.addToMainSet(userFieldSet, requiredCells)
        userOperator.addToMainSet(userFieldSet, shipNeighborsSet)
        // console.log(userFieldSet)
        userOperator.shipPlacement(requiredCells)
        console.log(userFieldSet)
        this.add(ship, requiredCells)
    }

    autoPlacement(){
        console.log("autoPlacement")
        for (let i = 1; i < 5; i++){
            while (!this.checkLimit(i)){
                console.log("this.checkLimit(i)")
                console.log(this.checkLimit(i))
                console.log(this)
                console.log(i)
                this.placeShip(i)

                console.log(this.checkLimit(i))
            }
        }
        console.log("complete")
    }

    addAutoPlacementListener(){
        let button = document.getElementById('shipsAutoPlacement')
        button.addEventListener("click", ()=>{
            console.log("addAutoPlacementListener");
            this.autoPlacement();
        })
    }

}

//user main object
const userShipPool = new ShipPool(true)
const userOperator =  new CalculateOperator(true)


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


    // function entrypoint
    if (checkSize(shipType, shipLength, startCellCoordinatesObject)) {
        // console.log('checkSize')
        let shipPositionCellSet = userOperator.calcShipCells(objShipInfo, cellObj)
        if (userOperator.checkOccupiedCells(userFieldSet, shipPositionCellSet)){
            return false
        }
        let shipNeighborsSet = userOperator.findNeighbors(shipPositionCellSet)

        userOperator.addToMainSet(userFieldSet, shipPositionCellSet)
        userOperator.addToMainSet(userFieldSet, shipNeighborsSet)
        // console.log(userFieldSet)

        userOperator.shipPlacement(shipPositionCellSet)
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

    movedElem.onmouseup = function() {
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

                // here need do someone for getting cells array which are occupied of ship


                let cellSet = userOperator.calcShipCells(shipInfo.slice(4), targetObj)
                console.log(cellSet)
                userShipPool.add(shipInfo.slice(5), cellSet)
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

