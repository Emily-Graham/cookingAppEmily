//Making an instance of the class
const NewRecipe = new TaskManager();

//Loading the task from local storage
NewRecipe.load();
NewRecipe.render();

// navigation variables
const secondaryTabs = document.getElementById('secondary-nav');
const primaryTabs = document.getElementById('primary-tabs');
const primaryButtons = document.getElementsByClassName('tablink');


// Validation and reset variables 
const ul = document.getElementById("dynamic-list");
const ol = document.getElementById("dynamic-list-2");
const nameInput = document.getElementById('recipe-name-input');
const categoryInput = document.getElementById('category-input');
const timeInput = document.getElementById('time-input');
const instructionsInput = document.getElementById("instructions-input");
const ingredientsInput = document.getElementById("ingredients-input");
const addRecipeBtn = document.querySelector("#btnSub");

//Opens up list of recipes under triggered category
function openSecondaryTabs (evt, categoryName) {
    let openTabs = false;
    let i, x, tablinks;
    x = document.getElementsByClassName("recipe-name");
    tablinks = document.getElementsByClassName("tablink");
    //closes all tabs 
    for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    }
    //unselects all tabs (removes red ribbon)
    for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" selected-ribbon", ""); 
    }
    //displays the secondary tabs selected, adds red-ribbon class to primary tab
    document.getElementById(categoryName).style.display = "block";
    evt.currentTarget.className += " selected-ribbon";
    openTabs = true;

    //check if user wants to close the secondary tabs
    if (openTabs == true) {
        document.addEventListener("click", (e) => {
            let targetEl = e.target;    
            if(targetEl == '[object HTMLButtonElement]' || targetEl == '[object HTMLHeadingElement]') {
                return;
            } else {
                document.getElementById(categoryName).style.display = "none"; 
                for (i = 0; i < x.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" selected-ribbon", ""); 
                }
                openTabs = false;
                return;
            }
        })
    }
}

// add a recipe button
toggle = () => {
    const form = document.getElementById("collapse-form");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
};

// dynamically adds ingredients
addItem = () => {
    const li = document.createElement("li");
    const errMsgIngredients = document.getElementById('errMsgIngredients');
    //check if there is a valid input
    let ingredientValue = ingredientsInput.value.trim();
    if (ingredientValue.length < 3 || ingredientValue.length == "") {
        errMsgIngredients.innerHTML = "*Please add ingredients more than 3 characters long";
        ingredientsInput.setAttribute("style", "border: #C71717 solid 1px !important;");
    } else {
        ul.style.display = "block";
        li.setAttribute('id', ingredientsInput.value);
        li.appendChild(document.createTextNode(ingredientsInput.value));
        ul.appendChild(li);
        ingredientsInput.value = "";
    }
}

// dynamically adds instructions
addInstructions = () => {
    const li = document.createElement("li");
    const errMsgInstructions = document.getElementById('errMsgInstructions');
    //check if there is a valid input
    let instructionsValue = instructionsInput.value.trim();
    if (instructionsValue.length < 5 || instructionsValue.length == "") {
        errMsgInstructions.innerHTML = "*Please add instructions more than 5 characters long";
        instructionsInput.setAttribute("style", "border: #C71717 solid 1px !important;");
    } else {
        ol.style.display = "block";
        li.setAttribute('id', instructionsInput.value);
        li.appendChild(document.createTextNode(instructionsInput.value));
        ol.appendChild(li);
        instructionsInput.value = "";
    }   
}

//err validation
// check if there is a  li element in the ul
// check if there is a recipe name 
// check if there is a category name

checkFormInput = (event) => {
    let errMessageName = document.querySelector("#errMsgName");
    let errMessageCategory = document.querySelector("#errMsgCategory");
    let errMessageIngredients = document.querySelector("#errMsgIngredients");

    let errorExist = 0; 

    // stop default event
    event.preventDefault();

    // input valid recipe name
    let nameInputValue = nameInput.value.trim();

    if (nameInputValue.length < 4 || nameInputValue == "") {
        errMessageName.innerHTML = "*Please enter a task name more than 4 characters";
        nameInput.setAttribute("style", "border: #C71717 solid 1px !important;");
        errorExist++;
    } else {
        errMessageName.innerHTML = "";
        nameInput.setAttribute("style", "border: solid grey 1px !important;");
    }

    // input valid category
    let categoryInputValue = categoryInput.value.trim();
    if (categoryInputValue.length < 3 || categoryInputValue.length == "") {
        errMessageCategory.innerHTML = "*Please enter a category more than 3 characters";
        categoryInput.setAttribute("style", "border: #C71717 solid 1px !important;");
        errorExist++;
    } else {
        errMessageCategory.innerHTML = "";
        categoryInput.setAttribute("style", "border: solid grey 1px !important;");
    }

    // input ingredients
    if (ul.innerHTML == "") {
        errMessageIngredients.innerHTML = "*Please add at least one ingredient";
        ingredientsInput.setAttribute("style", "border: #C71717 solid 1px !important;");
        errorExist++;
    } else {
        errMessageIngredients.innerHTML = "";
        ingredientsInput.setAttribute("style", "border: solid grey 1px !important;");
    }

    // resets the inputs of the form
    const formReset = () => {
        nameInput.value = "";
        categoryInput.value = "";
        timeInput.value = "";
        ingredientsInput.value = "";
        instructionsInput.value = "";
        errorExist = 0;
    };
    
    //calling the addTask method
    if (errorExist == 0) {
        NewRecipe.addTask(
            nameInput.value,
            categoryInput.value,
            timeInput.value,
            ul.innerHTML,
            ol.innerHTML
        );

        //Calling render, save and form reset
        NewTask.render();
        NewTask.save();
        formReset();
    }
};

//Submit Form Event Listener
addRecipeBtn.addEventListener("click", checkFormInput);


// catergory name creates a tab on the tab list
// recipe name is pushed to the secondary tab group 

//delete button deletes recipe from secondary tab group
// delete button deletes recipe form local storage

//store recipes in the local storage