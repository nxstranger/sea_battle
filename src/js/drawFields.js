let fields = document.getElementsByClassName("field")

for (let elem of fields){
    console.log(elem.id)
    let cellName = "zabcdefghij"
    let tableField = document.createElement('table')
    for (let i = 0; i < 11; i++) {
        tableField.appendChild(document.createElement('tr'))
        for (let j = 0; j < 11; j++){
            let tableCell = document.createElement('td')
            tableCell.classList = "field__table-cell"
            if (true){
                let cellId = `${cellName[i]}${j}`
                tableCell.id = cellId
                tableCell.innerText = cellId
            }
            tableField.lastChild.appendChild(tableCell)
            }
        }
        tableField.innerHTML+= `</tr>`

    elem.appendChild(tableField)

}
