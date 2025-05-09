
const addButton = document.querySelector(".add");
const inputBox = document.querySelector(".input");

const lists = document.querySelector(".list-box");
const completedLists = document.querySelector(".list-box-completed");

const progressBar = document.querySelector(".in-progress");
const progressData = document.querySelector(".progress-data");

const removeButton = document.querySelector(".remove");
const uncheckButton = document.querySelector(".uncheck");

const defaultTextView = document.querySelector(".default-text");


// fetch stored data
lists.innerHTML = localStorage.getItem("data-1");
completedLists.innerHTML = localStorage.getItem("data-2");
updateProgress();



// adding events
addButton.addEventListener("click",function(e){
    const inputData = inputBox.value;

    if( inputData.trim() === ""){
        alert("Ooops! you forget to enter the task.");
    }
    else{
        const task = document.createElement("li");
        const cancelButton = document.createElement("span");

        task.innerHTML = inputData;
        cancelButton.innerHTML = "x";

        task.appendChild(cancelButton);
        lists.appendChild(task);
    }

    inputBox.value = "";

    saveData();
    updateProgress();
});


inputBox.addEventListener("keypress", function(e){
    if(e.key == "Enter"){
        addButton.click();
    }
});


// click action on lists
lists.addEventListener("click", function(e){
    moveTo(e,completedLists);
});


completedLists.addEventListener("click", function(e){
    moveTo(e,lists);
});


// bottom buttons
removeButton.addEventListener("click",function(){
    if(lists.hasChildNodes() || completedLists.hasChildNodes()){
        while (lists.hasChildNodes()) {
            lists.removeChild(lists.firstChild);
        }
        while (completedLists.hasChildNodes()) {
            completedLists.removeChild(completedLists.firstChild);
        }
        saveData();
        updateProgress();
    }
});

uncheckButton.addEventListener("click", function(){
    if(completedLists.hasChildNodes()){
        while (completedLists.hasChildNodes()) {
            lists.appendChild(completedLists.firstChild);
        }
        saveData();
        updateProgress();
    }
});


// functions
function moveTo(e,tag){
    if(e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
    }
    else if(e.target.tagName == "LI"){
        tag.appendChild(e.target);
    }

    saveData();
    updateProgress();
}


function saveData(){
    localStorage.setItem("data-1", lists.innerHTML);
    localStorage.setItem("data-2", completedLists.innerHTML);
}


function updateProgress(){
    let completed = completedLists.childElementCount;
    let total = lists.childElementCount + completed;

    if(total == 0){
        progressBar.style.width = "0%";
        progressData.style.display = "none";

        defaultTextView.style.display = "block";
    }
    else if(total == 1){
        defaultTextView.style.display = "none";
        progressData.style.display = "block";
        
        changeBar(completed,total);
    }
    else{
        changeBar(completed,total);
    } 
}

function changeBar(completed,total){
        progressBar.style.width = (completed/total * 100).toString() + "%";
        progressData.textContent = completed + "/" + total

        if( completed/total > 0.9 ){
            progressData.style.left = "90%"
        }
        else{
            progressData.style.left = "101%"
        }
}