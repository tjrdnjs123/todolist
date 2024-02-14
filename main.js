//유저가 값을 입력한다.
// + 버튼을 누르면 할일이 추가된다.
// delete 버튼을 누르면 할일이 제거된다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 쳐진다.
// 1. check 버튼을 누르는 순간 true,false
// 2. true 끝났다고 간주하고 줄 긋기 , false는 그대로
// 진행중 끝남 탭을 누르면 , 언더바가 이동한다.
// 끝남탭은 , 끝난 아이템만, 진행중 탭은 진행중인 아이템만 
// 전체탭을 누르면 다시 전체 아이템으로 돌아온다.

let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let taskList = []   
addButton.addEventListener("click",addTask)
taskInput.addEventListener("focus",remove)
function addTask(){
    let task = {
        id : randomIdGenerate() ,
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task)
    console.log(taskList)
    render()
}
function render(){
    let resultHtml = ''   
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete == true){
            resultHtml+=`<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
            </div>
        </div>`
        }else{resultHtml += `<div class="task">
        <div>${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
            </div>
        </div>`

        }

        
    }
    document.getElementById("task-board").innerHTML = resultHtml;
    
}

function toggleComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete
            break;
        }
    }
    console.log(taskList)
    render() 
    
}

function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function remove(){
    taskInput.value=""
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    console.log(taskList)
    render()
    

}







