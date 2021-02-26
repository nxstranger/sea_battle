let fields = document.getElementsByClassName("field")

function writeField(drawTarget, enemy=false){
    let cellName = "zabcdefghij"
    let tableField = document.createElement('table')
    for (let i = 0; i < 11; i++) {
        tableField.appendChild(document.createElement('tr'))
        for (let j = 0; j < 11; j++){
            let tableCell = document.createElement('td')
            tableCell.classList = "field__table-cell"

            if (i>0 && j>0) {
                tableCell.id = (!enemy ? "usr-" : "enm-" )+ `${cellName[i]}${j}`
            }
            // tableCell.id = `${cellName[i]}${j}`
            if (i === 0 && j > 0 || j === 0 && i > 0){

                tableCell.innerText = (i === 0) ? j : cellName[i]
            }
            tableField.lastChild.appendChild(tableCell)
        }
    }
    tableField.innerHTML+= `</tr>`
    drawTarget.appendChild(tableField)
}

writeField(fields[0])
writeField(fields[1], true)
