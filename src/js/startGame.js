

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

    takeDamage(cellId, shipCells){
        shipCells.delete(cellId)
    }

    checkCoordinate(cellId, ownerPool){
        // cellId : str like 'usr-e4'
        // ownerPool : class pool object attacked user/enemy
        for (let elem of ownerPool.shipArray){
            if (elem[0].has(cellId)){
                return elem[0]
            }
        }
        return null
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

            this.takeDamage(cellIdName, result)


            console.log("take damage")
        }

        // make action for miss
        this.makeAMove()
    }

    checkUserClick(ev){
        //check user click event
        // console.log(ev)
        if (ev.target.id.slice(0,3) === 'enm'){
            if (!this.checkDuplicateAttack(ev.target.id, this.enemyPool)){
                this.attack(true, ev.target.id)
                console.log('checkUserClick')
            }
        }
    }

    makeAMove(){
        if (this.stepToggle){
            // document.getElementById("header").innerText = "user move"
            console.log("user action")

        } else {
            console.log("enemy action")
        }
    }

    addUserClickListener(){
        //init listener, do action only if this.stepToggle true
        let listener = document.getElementById("enemy-field")
        listener.addEventListener('click', (ev)=>{
            if (this.stepToggle) {
                console.log("user click")
                this.checkUserClick(ev)
            }
        })
    }

}



