// let userFieldArray = Array(10).fill(Array(10).fill(0))
// console.log(userFieldArray)
let userFieldSet = new Set()

function placeShipOnField(objShipInfo, cellObj){
    let alphabet = "zabcdefghij"                    // z - unused, only for convenience
    let shipType = objShipInfo.slice(0, 1)          // H or V
    let shipLength = objShipInfo.slice(1)           // 1-4
    let startCellCoordinatesObject = {
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
        // console.log(startIndexX)
        // console.log(startIndexY)
        for (let iter = 0; iter < shipLength; iter++){
            let cellId = ""
            switch (shipType){
                case "H":
                    cellId = "usr-" + alphabet[startIndexY] + (startIndexX + iter)
                    // cellId = document.getElementById(cellId)
                    // document.getElementById(cellId).style.background = 'cyan'
                    break;
                case "V":
                    cellId = "usr-" + alphabet[startIndexY + iter] + (startIndexX)
                    // cellId = document.getElementById(cellId)
                    // document.getElementById(cellId).style.background = 'cyan'
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
            // console.log(elem)
            cellSet.add(cell)

            let cellLocate = {
                "X": +cell.slice(5),                // 1-10
                "Y": alphabet.indexOf(cell[4])      // 1-10
            }
            // console.log(cellLocate);
            xMin = xMin < cellLocate.X ? xMin : cellLocate.X
            xMax = xMax > cellLocate.X ? xMax : cellLocate.X
            yMin = yMin < cellLocate.Y ? yMin : cellLocate.Y
            yMax = yMax > cellLocate.Y ? yMax : cellLocate.Y
        }
        // console.log([xMin, xMax, yMin, yMax])
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

    // entrypoint
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
            placeShipOnField(shipInfo.slice(4), targetObj)
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
    if (ev.path[0].classList.contains("drag_n_drop")){
        // console.log("object dragstart ")
        dragAndDropHandler(ev)
    }
})

