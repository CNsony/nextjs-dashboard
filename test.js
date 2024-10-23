function promiseTimeout(time,label) {
    console.time(label)
    return ()=>
        new Promise((resolve)=>{
            setTimeout(()=>resolve(),time)
        }).then(()=>{
            console.timeEnd(label)
        })
}

// class task{
//     constructor(){
//         this.taskArr = []
//         this.maxTask = 2
//         this.runningTask = 0
//     }
//     addTask(fun){
//         return new Promise((resolve,reject)=>{
//             this.taskArr.push(fun)
//             this.runTask()
//         })
//     }
//     runTask(){
//         if(this.runningTask<this.maxTask && this.taskArr.length>0){
//             console.log(this.taskArr)
//             const currentTask = this.taskArr.shift()
//             this.runningTask++
//             currentTask().finally(()=>{
//                 this.runningTask--
//                 this.runTask()
//             })
//         }
//     }
// }
// const tasks = new task()



tasks = (()=>{
    const taskArr = []
    const maxTask = 2
    let runningTask = 0
    const addTask = (fun)=>{
        return new Promise((resolve,reject)=>{
            taskArr.push(fun)
            runTask()
        })
    }
    const runTask = ()=>{
        if(runningTask<maxTask && taskArr.length>0){
            const currentTask = taskArr.shift()
            runningTask++
            currentTask().finally(()=>{
                runningTask--
                runTask()
            })
        }
    }
    
    
    return (fun)=>{
        addTask(fun)
    }
})()


tasks(promiseTimeout(1000,'1'))
tasks(promiseTimeout(2000,'2'))
tasks(promiseTimeout(3000,'3'))
tasks(promiseTimeout(4000,'4'))