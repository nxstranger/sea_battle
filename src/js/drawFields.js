let fields = document.getElementsByClassName("field")

for (let elem of fields){
    // console.log(elem.id)
    let cellName = "zabcdefghij"
    let tableField = document.createElement('table')
    for (let i = 0; i < 11; i++) {
        tableField.appendChild(document.createElement('tr'))
        for (let j = 0; j < 11; j++){
            let tableCell = document.createElement('td')
            tableCell.classList = "field__table-cell"

            if (i>0 && j>0) {
                tableCell.id = `${cellName[i]}${j}`
            }
            // tableCell.id = `${cellName[i]}${j}`
            if (i === 0 && j > 0 || j === 0 && i > 0){

                tableCell.innerText = (i === 0) ? j : cellName[i]
            }
            tableField.lastChild.appendChild(tableCell)
            }
        }
        tableField.innerHTML+= `</tr>`

    elem.appendChild(tableField)

}
