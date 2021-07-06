// create html
const createRecipeHtml = (id, name, category, time, ingredients, instructions) => {
    const html =  
        `<div class="recipe-set" data-id-number="${id}">
            <h4 class="time">${time}</h4>
            <div class="recipe-image-div">
                <img class="recipe-image" src="images/sobaSalad.jpg" />
            </div>
            <div class="recipe-card">
                <h2 class="recipe-title text-center">${name}</h2>
                <h4 class="recipe-category text-center">${category}</h4>
                <br>
                <h3 class="text-center">Ingredients</h3>
                <ul class="ingredients">
                    ${ingredients}
                </ul>
                <h3 class="text-center">Instructions</h3>
                <ol class="instructions">
                    ${instructions}
                </ol>
                <div class="d-flex justify-content-end">
                    <button class="delete-recipe">delete</button>
                </div>
            </div>
        </div>`;
    return html;
};

class TaskManager {
    constructor(currentId = 0) {
        this.currentId = currentId;
        this.tasks = [];
    }
    addTask(name, category, time, ingredients, instructions) {
        const task = {
            id: this.currentId++,
            name: name,
            category: category,
            time: time,
            ingredients: ingredients,
            instructions: instructions,
        };
        this.tasks.push(task);
        //${status == 'Done' ? 'done' : ''} use ternery to push to category array instead? 
    }

    //the method to render 
    render() {
        const tasksHtmlList = [];
        for (let i = 0; i < this.tasks.length; i++) {
            const renderTask = this.tasks[i];

            const taskHtml = createRecipeHtml(
                renderTask.id,
                renderTask.name,
                renderTask.category,
                renderTask.time,
                renderTask.ingredients,
                renderTask.instructions
            );
            tasksHtmlList.unshift(taskHtml);
        }

        const taskHtml = tasksHtmlList.join("\n");
        const taskList = document.querySelector("#recipe-container");
        taskList.innerHTML = taskHtml;
    }

    //this method finds the id
    getTaskById(taskId) {
        let foundTask;
        for (let i = 0; i < this.tasks.length; i++) {
            let getTask = this.tasks[i];
            if (getTask.id === taskId) {
                foundTask = getTask;
            }
        }
        return foundTask;
    }

    //delete method
    deleteTask(taskId) {
            const newTasks = [];
            for (let i = 0; i < this.tasks.length; i++) {
                const task = this.tasks[i];
                if (task.id !== taskId) {
                    newTasks.push(task);
                }
            }
            this.tasks = newTasks;
        }

        //   For local storage
    save() {
            // create a json stringfy 
            const taskJson = JSON.stringify(this.tasks);
            // store json in local Storage
            localStorage.setItem('task', taskJson);
            // convert id into string
            const currentId = String(this.currentId);
            // store Id in localstorage
            localStorage.setItem('currentId', currentId);
        }

        //This method loads the saved data
    load() {
        if (localStorage.getItem('task')) {
            //to get the task from local storage
            const taskJson = localStorage.getItem('task');
            this.tasks = JSON.parse(taskJson);

        }
        if (localStorage.getItem('currentId')) {
            const currentId = localStorage.getItem('currentId');
            this.currentId = Number(currentId);
        }
    }
}