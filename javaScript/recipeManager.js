// create html
const createRecipeHtml = (id, name, category, time, ingredients, instructions, image) => {
    const html =  
        `<div class="recipe-set" data-id-number="${id}" name="${name}">
            <h4 class="time">${time}</h4>
            <div class="recipe-image-div">
                <img class="recipe-image" src="images/recipe-images/rhubarb-apple-crumble.jpg" />
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

//creating the category based html to go into primary tabs
// const createCategoryHtml = (category) => {
//     const lowerCategory = category.toLowerCase();
//     const tabHtml = 
//         `<button class="w3-bar-item w3-button tablink" onclick="openSecondaryTabs(event, '${lowerCategory}')">${lowerCategory}</button>`;
//     return tabHtml;
// };

//creating the category based html to go into secondary tabs
const createNameHtml = (category, name) => {
    const lowerName = name.toLowerCase();
    const lowerCategory = category.toLowerCase();
    const tabHtml = 
        `<div id="${lowerCategory}" class="w3-container recipe-name w3-animate-left" style="display:none" onclick="openRecipe('${lowerName}')">
        </div>`;
    return tabHtml;
};

//html to go into secondart tab list
const addNameToList = (name) => {
    const lowerName = name.toLowerCase();
    const tabHtmlInnerHtml = `<h4>${lowerName}</h4>`;
    return tabHtmlInnerHtml;
};

class RecipeManager {
    constructor(currentId = 0) {
        this.currentId = currentId;
        this.recipes = [];
        this.tabs = [];
    }
    addRecipe(name, category, time, ingredients, instructions) {
        const recipe = {
            id: this.currentId++,
            name: name,
            category: category,
            time: time,
            ingredients: ingredients,
            instructions: instructions,
        };
        this.recipes.push(recipe);
    }

    //the method to render 
    render() {
        //rendering recipes
        const recipeHtmlList = [];
        // const primaryTabsList = [];
        for (let i = 0; i < this.recipes.length; i++) {
            const renderCard = this.recipes[i];

            const recipeHtml = createRecipeHtml(
                renderCard.id,
                renderCard.name,
                renderCard.category,
                renderCard.time,
                renderCard.ingredients,
                renderCard.instructions,
                renderCard.image
            );
            recipeHtmlList.unshift(recipeHtml);
        }

        const recipeHtml = recipeHtmlList.join("\n");
        const recipeList = document.querySelector("#recipe-container");
        recipeList.innerHTML = recipeHtml;
    }

    //this method finds the id
    getTaskById(taskId) {
        let foundTask;
        for (let i = 0; i < this.recipes.length; i++) {
            let getTask = this.recipes[i];
            if (getTask.id === taskId) {
                foundTask = getTask;
            }
        }
        return foundTask;
    }

    //delete method
    deleteRecipe(taskId) {
            const newTasks = [];
            for (let i = 0; i < this.recipes.length; i++) {
                const recipe = this.recipes[i];
                if (recipe.id !== taskId) {
                    newTasks.push(recipe);
                }
            }
            this.recipes = newTasks;
        }

        //   For local storage
    save() {
            // create a json stringfy 
            const recipeJson = JSON.stringify(this.recipes);
            // store json in local Storage
            localStorage.setItem('recipe', recipeJson);
            // convert id into string
            const currentId = String(this.currentId);
            // store Id in localstorage
            localStorage.setItem('currentId', currentId);
        }

        //This method loads the saved data
    load() {
        if (localStorage.getItem('recipe')) {
            //to get the recipe from local storage
            const recipeJson = localStorage.getItem('recipe');
            this.recipes = JSON.parse(recipeJson);

        }
        if (localStorage.getItem('currentId')) {
            const currentId = localStorage.getItem('currentId');
            this.currentId = Number(currentId);
        }
    }
}