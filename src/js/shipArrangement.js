
function placeShipOnField(objShipInfo, cellObj){
    console.log(objShipInfo)
    console.log(cellObj)
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
        // console.log(`${ev.pageX} ${ev.pageY}`)
    }
    document.addEventListener('mousemove', onMouseMove);

    movedElem.onmouseup = function(ev) {
        document.removeEventListener('mousemove', onMouseMove);
        movedElem.onmouseup = null;
        let shopInfo = {
            "id": movedElem.id,
            "offsetX": shiftX,
            "offsetY": shiftY,
            "wv": window.innerWidth/100
        }
        let targetObject = {
            "x": movedElem.getBoundingClientRect().left + window.innerWidth/100,
            "y": movedElem.getBoundingClientRect().top + window.innerWidth/100
        }

        // [movedElem.id, shiftX, shiftY, window.innerWidth/100]
        movedElem.remove()

        console.log(document.elementFromPoint(targetObject.x, targetObject.y))

        // console.log(ev.pageX)
        // console.log(ev.pageY)
        // console.log(shopInfo)
        // console.log(document.elementFromPoint(ev.pageX, ev.pageY))
        // placeShipOnField(shopInfo, document.elementFromPoint(ev.pageX, ev.pageY))
    };
}


for (let elem of document.getElementsByClassName("ship")){
    if (elem.id){
        elem.classList.add('drag_n_drop')
    }
}

document.body.addEventListener('mousedown', (ev)=>{
    // ev.preventDefault()
    // console.log(ev.path[0].classList)
    if (ev.path[0].classList.contains("drag_n_drop")){
        console.log("object has dragstart ")
        dragAndDropHandler(ev)
    } else {

    }

})

