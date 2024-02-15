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
let tabs = document.querySelectorAll(".task-tabs div")
let mode = 'all'
let filterList = [];
addButton.addEventListener("click",addTask)
taskInput.addEventListener("focus",remove)
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)})
}
function addTask(){
    let task = {
        id : randomIdGenerate() ,
        taskContent : taskInput.value,
        isComplete : false
    }
    if(taskInput.value.trim() === ''){
        alert('할일을 입력하세요!');
        return;
    }
    taskList.push(task)
    console.log(taskList)
    render()
}
function render(){
    let list = [];

    if(mode === 'all'){
        list = taskList
    }else if(mode === 'ongoing'){ 
        list = filterList
    }else if(mode === 'done'){
        list = filterList
    }
    let resultHtml = '';   
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHtml+=`<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`
        }else{resultHtml += `<div class="task">
        <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
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

function filter(event){
    mode = event.target.id;
    if(mode === "all"){
        render();
        document.getElementById("under-line").style.width = "60px";
        document.getElementById("under-line").style.left = "0px";   
    }else if(mode === "ongoing"){
        filterList = [];
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render();
        document.getElementById("under-line").style.width = "60px";
        document.getElementById("under-line").style.left = "75px";   
    }else if(mode === "done"){
        filterList = [];
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render();
        document.getElementById("under-line").style.width = "60px"; // 예시로 너비 조절
        document.getElementById("under-line").style.left = "150px"; // 예시로 위치 조절

    }
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









