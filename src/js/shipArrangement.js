// let drag_and_drop = false

function dragAndDropHandler(ev){
    console.log(ev.path[0])

    // ev.preventDefault()
    console.log(ev)

    ev.preventDefault()
    let movedElem = ev.path[0].cloneNode(false)

    let shiftX = ev.clientX - ev.path[0].getBoundingClientRect().left;
    let shiftY = ev.clientY - ev.path[0].getBoundingClientRect().top;


    movedElem.style.position = "absolute"

    document.body.appendChild(movedElem)
    movedElem.style.top = ev.clientY + 'px'
    movedElem.style.left = ev.clientX + 'px'
    console.log(ev)

    console.log(`${ev.path[0].getBoundingClientRect().left} ${ev.path[0].getBoundingClientRect().top}`)


    function moveAt(pageX, pageY) {
        movedElem.style.left = pageX - shiftX + 'px';
        movedElem.style.top = pageY - shiftY + 'px';
        // movedElem.top = ev.clientY + 'px'
        // movedElem.left = ev.clientX + 'px'
    }

    function onMouseMove(ev) {
        moveAt(ev.pageX, ev.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    movedElem.onmouseup = function() {
        console.log("it not working")
        document.removeEventListener('mousemove', onMouseMove);
        movedElem.onmouseup = null;
        movedElem.remove()
        // console.log(movedElem)
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


