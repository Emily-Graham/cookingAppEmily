// variables
const secondaryTabs = document.getElementById('secondary-nav');
const primaryTabs = document.getElementById('primary-tabs');
const primaryButtons = document.getElementsByClassName('tablink');
let openTabs = false;

openRecipe = (evt, recipeName) => {
    let i, x, tablinks;
    x = document.getElementsByClassName("recipe-name");
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    }
    
    for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" selected-ribbon", ""); 
    }
    document.getElementById(recipeName).style.display = "block";
    evt.currentTarget.className += " selected-ribbon";
    openTabs = true;

    //check if user wants to close the secondary tabs
    if (openTabs == true) {
        document.addEventListener("click", (e) => {
            let targetEl = e.target;    
            if(targetEl == '[object HTMLButtonElement]' || targetEl == '[object HTMLHeadingElement]') {
                return;
            } else {
                document.getElementById(recipeName).style.display = "none"; 
                for (i = 0; i < x.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" selected-ribbon", ""); 
                }
                openTabs = false;
                return;
            }
        })
    }
}



