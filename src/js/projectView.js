// Purpose: U/I display and interactions with projects
import "../css/style.css"
import "../css/project.css"
import "../css/item.css"

function createProjectView(title) {
    // Remove all children divItems
    const clearItems = () => {
        while(divItems.firstChild) {
            divItems.removeChild(divItems.firstChild);
        }
    }

    // Add and render UI for all elements
    function render(items) {
        clearItems();

        // Add cards to a project for each todoModel
        items.forEach(item => {
            renderCardSmall(item)
        });
        
        // Add the project to the projects view
        divProject.appendChild(divItems);
    }

    // Add and render UI for a todo item card in the general project view mode
    const renderCardSmall = (item) => {
        // Card setup
        const card = document.createElement("div");
        card.className = "item";
        card.dataset.itemId = item.id;
        // Card header and title
        const header = document.createElement("div");
        header.className = "card-header";
        const title = document.createElement("input");
        title.className = "card-title";
        title.type = "text";
        title.value = item.title;
        title.placeholder = "New Item"; // only displays if string is ""
        // Card info
        const info = document.createElement("textarea");
        info.className = "info";
        info.innerText = item.info;
        info.placeholder = "Enter a note here..." // only displays if string is ""
        // Card priority
        const prioDiv = document.createElement("div");
        prioDiv.className = "priority";
        const prioMin = 0;
        const prioMax = 5;
        const prioLabel = document.createElement("label");
        const prioInput = document.createElement("input");
        const prioID = `${item.id}-priority`;
        prioLabel.htmlFor = prioID;
        prioLabel.innerText = "Priority";
        prioInput.id = prioID;
        prioInput.className = "priority-input";
        prioInput.type = "number";
        prioInput.min = prioMin;
        prioInput.max = prioMax;
        prioInput.value = ( item.priority !== undefined ) ? item.priority : prioMin;
        prioDiv.append(prioLabel, prioInput);

        // Card due date

        // Card buttons
        const divButtons = document.createElement("div");
        divButtons.className = "buttons";
        const btnDone = document.createElement("button");
        btnDone.type = "button";
        btnDone.innerText = "✔";
        btnDone.title = "Status";
        const btnEdit = document.createElement("button");
        btnEdit.type = "button";
        btnEdit.title = "Edit";
        const btnDelete = document.createElement("button");
        btnDelete.type = "button";
        btnDelete.title = "Delete";
        divButtons.append(btnDone, btnEdit, btnDelete);
        

        // Add nodes to the card
        card.appendChild(divButtons);
        header.appendChild(title);
        card.appendChild(header);
        card.appendChild(info);
        card.appendChild(prioDiv);


        // Add card to page
        divItems.appendChild(card);
    }

    // Setup a callback for creating item cards
    const bindCreateItem = (handler) => {
        document.addEventListener("click", (e) => {
            switch(e.target.className) {
                case "create-item":
                    handler();
                    break;
                default:
                    // Nothing
            }
        });
    }
    
    // Settup a callback for input events on cards
    const bindupdateCardInfo = (handler) => {
        document.addEventListener("input", (e) => {

            // Add to item depending on what is edited
            const target = e.target;
            const editedItem = {

            }
            
            if (target.nodeName === "TEXTAREA") {
                editedItem.id = e.target.parentElement.dataset.itemId
                editedItem.info = e.target.value;
            }
            else if (target.className === "card-title") {
                editedItem.id = target.parentElement.parentElement.dataset.itemId;
                editedItem.title = e.target.value;
            }
            else if (target.className === "priority-input") {
                editedItem.id = target.parentElement.parentElement.dataset.itemId;
                editedItem.priority = e.target.value;
            }

            handler(editedItem);
        });
    }

    //------------------ Module Variables and logic to run at creation ------------------
    let projTitle = title;
    const divProjects = document.querySelector("#projects");
    const divProject = document.createElement("div");
    divProject.className = "project";
    const divItems = document.createElement("div");
    divItems.className = "items";
    const hTitle = document.createElement("h1");
    hTitle.innerText = projTitle;
    const btnCreateItem = document.createElement("button");
    btnCreateItem.type = "button";
    btnCreateItem.innerText = "New";
    btnCreateItem.className = "create-item";
    divProject.appendChild(hTitle);
    divProject.appendChild(btnCreateItem);
    divProjects.appendChild(divProject);

    return {
        render,
        bindupdateCardInfo,
        bindCreateItem
    }
}

export { createProjectView };