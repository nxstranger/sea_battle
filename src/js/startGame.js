

class Game{
    constructor(userPool, enemyPool, stepDelay) {
        this.userPool = userPool
        this.enemyPool = enemyPool
        this.stepDelay = stepDelay
        this.stepToggle = true
        this.endGame = false
        this.addUserClickListener()
    }

    // requestType(request){
    //     switch (request){
    //         case 1:
    //             return "miss";
    //         case 2:
    //             return "hit";
    //         case 3:
    //             return "destroyed";
    //     }
    // }

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

    shipKilledUpdateField(shipObj, fieldset){

        for (let elem of shipObj[1]){
            document.getElementById(elem).style.background = "#cccccc"
            fieldset.add(elem)
        }
    }


    checkDuplicateAttack(cellId, pool){
        // if this cell already in pool, return true, else false
        console.log(pool.ownerFieldSet)
        if (pool.ownerFieldSet.has(cellId)){
            console.log("duplicate attack")
            return true
        }
        return false
    }

    attack(isUser, cellIdName) {
        // make action with target cell
        // isUser - selector for pool
        let pool = isUser ? this.enemyPool : this.userPool
        let result = this.checkCoordinate(cellIdName, pool)
        console.log("result")
        console.log(result)
        document.getElementById(cellIdName).style.background = result ? 'orange': '#cccccc'

        pool.ownerFieldSet.add(cellIdName)
        if (result) {

            //make request type and handle request

            if (this.takeDamageAndCheckDestroy(cellIdName, result[0])){
                this.shipKilledUpdateField(result, pool.ownerFieldSet)
            }

            // this.makeAMove()
            console.log("take damage")
            if (!isUser) {
                this.AIAction()
            }
        } else {
            this.stepToggle = !this.stepToggle
            if (isUser) {
                this.AIAction()
            }
        }

        // make action for miss

    }

    checkUserClick(ev){
        //check user click event
        // console.log(ev)
        if (ev.target.id.slice(0,3) === 'enm'){
            if (!this.checkDuplicateAttack(ev.target.id, this.enemyPool)){
                this.makeAMove(ev.target.id)
                console.log('checkUserClick')
            }
        }
    }

    makeAMove(cellId){
        console.log("cellId")
        console.log(cellId)
        if (this.stepToggle && !this.endGame){
            // document.getElementById("header").innerText = "user move"
            console.log("user action")
            this.attack(this.stepToggle, cellId)
        } else if (!this.stepToggle && !this.endGame) {
            this.attack(this.stepToggle, cellId)
            console.log("enemy action")
        } else {
            console.log("END GAME")
        }
    }

    addUserClickListener(){
        //init listener, do action only if this.stepToggle true
        let listener = document.getElementById("enemy-field")
        listener.addEventListener('click', (ev)=>{
            if (this.stepToggle && !this.endGame) {
                console.log("user click")
                this.checkUserClick(ev)
            }
        })
    }

    AIAction(){
        let attackedCell = ""
        do {
            attackedCell = userShipPool.operator.getRandomCoordinate()
        } while (this.checkDuplicateAttack(attackedCell, this.userPool))
        console.log("AI attackedCell")
        console.log(attackedCell)
        this.makeAMove(attackedCell)
    }

}



