class Game{
    constructor(userPool, enemyPool, stepDelay) {
        this.userPool = userPool
        this.enemyPool = enemyPool
        this.stepDelay = stepDelay
        this.stepToggle = true
        this.endGame = false
        this.addUserClickListener()
        this.resetCounters()
        this.hotListAI = new Set()
        this.killCounterEnemy = 0
        this.killCounterUser = 0
    }

    resetCounters(){
        this.enemyPool["1"] = 0
        this.enemyPool["2"] = 0
        this.enemyPool["3"] = 0
        this.enemyPool["4"] = 0

        this.userPool["1"] = 0
        this.userPool["2"] = 0
        this.userPool["3"] = 0
        this.userPool["4"] = 0

    }

    takeDamageAndCheckDestroy(cellId, shipCells){
        shipCells.delete(cellId)
        return shipCells.size === 0;

    }

    checkCoordinate(cellId, ownerPool){
        // cellId : str like 'usr-e4'
        // ownerPool : class pool object attacked user/enemy
        for (let elem of ownerPool.shipArray){
            if (elem[0].has(cellId)){
                return elem
            }
        }
        return null
    }

    updateFieldCounterGame(isUser, shipLength){
        let pool = isUser ? this.enemyPool: this.userPool
        pool.add(shipLength)

    }

    shipKilledUpdateField(shipObj, fieldset){

        for (let elem of shipObj[1]){
            document.getElementById(elem).style.background = "#cccccc"
            fieldset.add(elem)
        }
        this.updateFieldCounterGame(this.stepToggle, shipObj[2])
    }


    checkDuplicateAttack(cellId, pool){
        // if this cell already in pool, return true, else false
        if (pool.ownerFieldSet.has(cellId)){
            // console.log("duplicate attack")
            return true
        }
        return false
    }

    attack(isUser, cellIdName) {
        // make action with target cell
        // isUser - selector for pool
        let pool = isUser ? this.enemyPool : this.userPool
        let result = this.checkCoordinate(cellIdName, pool)
        document.getElementById(cellIdName).style.background = result ? 'orange': '#cccccc'

        pool.ownerFieldSet.add(cellIdName)
        if (result) {
            if (this.takeDamageAndCheckDestroy(cellIdName, result[0])){
                this.shipKilledUpdateField(result, pool.ownerFieldSet)

                //Endpoint
                isUser ? this.killCounterEnemy++ : this.killCounterUser++
                if (this.killCounterUser === 10 || this.killCounterEnemy === 10) {
                   this.endGame = true
                    let winner = this.killCounterUser === 10 ? "AI win!" : "User win!"
                    //endpoint
                    setTimeout(()=> {
                        alert(winner)
                    },500)
                }
                if (!isUser && !this.endGame) {
                    this.hotListAI.clear()
                    this.actionAI() }
            } else {
                if (!isUser) { this.actionAI(cellIdName) }
            }

        } else {
            this.stepToggle = !this.stepToggle
            if (isUser) {
                this.actionAI()
            }
        }
    }

    checkUserClick(ev){
        //check user click event
        if (ev.target.id.slice(0,3) === 'enm' && !this.endGame){
            if (!this.checkDuplicateAttack(ev.target.id, this.enemyPool)){
                this.makeAMove(ev.target.id)
            }
        }
    }

    makeAMove(cellId){
        if (this.stepToggle && !this.endGame){
            // console.log("user action")
            this.attack(this.stepToggle, cellId)
        } else if (!this.stepToggle && !this.endGame) {
            this.attack(this.stepToggle, cellId)
            // console.log("enemy action")
        } else {
            console.log("END GAME")
        }
    }

    addUserClickListener(){
        //init listener, do action only if this.stepToggle true
        let listener = document.getElementById("enemy-field")
        listener.addEventListener('click', (ev)=>{
            if (this.stepToggle && !this.endGame) {
                this.checkUserClick(ev)
            }
        })
    }

    makeAICellHotList (successCell){
        let xPos = +successCell.slice(5)
        let yPos = this.userPool.operator.alphabet.indexOf(successCell[4])
        // DRY ??
        //left
        if (xPos > 1 && xPos <= 10){
            let cellIdName = `usr-${this.userPool.operator.alphabet[yPos]}${xPos-1}`
            this.hotListAI.add(cellIdName)
        }
        //right
        if (xPos >= 1 && xPos < 10){
            let cellIdName = `usr-${this.userPool.operator.alphabet[yPos]}${xPos+1}`
            this.hotListAI.add(cellIdName)
        }
        //top
        if (yPos > 1 && yPos <= 10){
            let cellIdName = `usr-${this.userPool.operator.alphabet[yPos-1]}${xPos}`
            this.hotListAI.add(cellIdName)
        }
        //bottom
        if (yPos >= 1 && yPos < 10){
            let cellIdName = `usr-${this.userPool.operator.alphabet[yPos+1]}${xPos}`
            this.hotListAI.add(cellIdName)
        }
        for (let elem of this.hotListAI){
            if (this.userPool.ownerFieldSet.has(elem)){
                this.hotListAI.delete(elem)
            }
        }
        // console.log(this.hotListAI)
    }

    getCellFromHotList(){
        let arrFromSet = Array.from(this.hotListAI)
        let popItem = arrFromSet.pop()
        this.hotListAI.delete(popItem)
        return popItem
    }

    actionAI(previousTarget= null) {
        let attackedCell = ""
        if (previousTarget) {
            this.makeAICellHotList(previousTarget)
            attackedCell = this.getCellFromHotList()
        } else if (this.hotListAI.size) {
            attackedCell = this.getCellFromHotList()
        } else {
            do {
                attackedCell = userShipPool.operator.getRandomCoordinate()
            } while (this.checkDuplicateAttack(attackedCell, this.userPool))
        }
        setTimeout(()=>{this.makeAMove(attackedCell)}, this.stepDelay)
    }

}



