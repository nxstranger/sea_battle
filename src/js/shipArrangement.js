// let drag_and_drop = false

function dragAndDropHandler(ev){
    console.log(ev.path[0])

    // ev.preventDefault()
    console.log(ev)

    ev.preventDefault()
    let movedElem = ev.path[0].cloneNode(true)

    movedElem.style.position = "absolute"
    document.body.appendChild(movedElem)
    console.log(ev)

    let shiftX = ev.clientX - ev.ath[0].getBoundingClientRect().left;
    let shiftY = ev.clientY - ev.path[0].getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        movedElem.style.left = pageX - shiftX + 'px';
        movedElem.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(ev) {
        moveAt(ev.pageX, ev.pageY);
    }

    // передвигаем мяч при событии mousemove
    document.addEventListener('mousemove', onMouseMove);

    // отпустить мяч, удалить ненужные обработчики
    movedElem.onmouseup = function() {
        console.log("it not working")
        document.removeEventListener('mousemove', onMouseMove);
        movedElem.onmouseup = null;
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


