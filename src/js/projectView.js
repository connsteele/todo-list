// Purpose: U/I display and interactions with projects
import "../css/style.css"
import "../css/project.css"
import "../css/item.css"
import { format, parse } from "date-fns"
import imgEdit from "../svg/edit.svg"
import imgTrash from "../svg/trash-2.svg"

const createProjectView = (title) => {
    // Remove all children divItems
    const clearItems = () => {
        while(divItems.firstChild) {
            divItems.removeChild(divItems.firstChild);
        }
    }

    // Add and render UI for all elements
    const render = (map) => {
        clearItems();

        // Add cards to a project for each todoModel
        map.forEach(renderCardSmall);
        
        // Add the project to the projects view
        divProject.appendChild(divItems);
    }

    // Add and render UI for a todo item card in the general project view mode
    const renderCardSmall = (item, key) => {
        // Card setup
        const card = document.createElement("div");
        card.className = "item";
        card.dataset.itemId = key;
        card.dataset.project = projTitle;
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
        const prioID = `${key}-priority`;
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
        const dueDiv = document.createElement("div");
        const dueID = `${key}-due`;
        dueDiv.className = "due";
        const dueLabel = document.createElement("label");
        dueLabel.innerText = "Due"
        dueLabel.htmlFor = dueID;
        const dueInput = document.createElement("input");
        dueInput.id = dueID;
        dueInput.type = "date";
        dueInput.className = "due-input";
        dueInput.value = item.due !== undefined ? item.due : undefined;
        dueDiv.append(dueLabel, dueInput);
        //------- Side Inputs (checkbox and buttons) -------
        const divSide = document.createElement("div");
        divSide.className = "side-inputs";
        // Side checkbox
        const inputDone = document.createElement("input");
        inputDone.type = "checkbox";
        inputDone.checked = item.done === true ? true : false;
        inputDone.title = "Status";
        inputDone.id = "done";
        // Side buttons
        const btnEdit = document.createElement("button");
        btnEdit.type = "button";
        btnEdit.title = "Edit";
        btnEdit.id = "edit";
        btnEdit.className = "card-button";
        const btnEditImg = document.createElement("img");
        btnEditImg.src = imgEdit;
        btnEdit.appendChild(btnEditImg);
        const btnDelete = document.createElement("button");
        btnDelete.type = "button";
        btnDelete.className = "card-button";
        btnDelete.title = "Delete";
        btnDelete.id = "delete";
        const btnDeleteImg = document.createElement("img");
        btnDeleteImg.src = imgTrash;
        btnDelete.appendChild(btnDeleteImg);
        // Add all inputs and buttons to the side card area
        divSide.append(inputDone, btnEdit, btnDelete);
        

        // Add nodes to the card
        card.appendChild(divSide);
        header.appendChild(title);
        card.appendChild(header);
        card.appendChild(prioDiv);
        card.appendChild(info);
        card.appendChild(dueDiv);


        // Add card to page
        divItems.appendChild(card);
    }
    // Settup a callback for input events on cards
    const bindInputHandler = (handler) => {
        // Listen to a projects container
        divProject.addEventListener("input", (e) => {

            // Add to item depending on what is edited
            const target = e.target;
            const card = target.closest(".item");
            if (!card) return; // Only operate on cards

            const editedItem = {
                id: card.dataset.itemId,
                project: card.dataset.project,
            };
            
            switch (target.className) {
                case "info":
                    editedItem.info = target.value;
                    break;
                case "card-title":
                    editedItem.title = target.value;
                    break;
                case "priority-input":
                    // If input is too large or too small fix it
                    let targetInt = parseInt(target.value);
                    const targetMax = parseInt(target.max);
                    const targetMin = parseInt(target.min);
                    if (isNaN(targetInt)) targetInt = targetMin;
                    targetInt = Math.max(targetMin, Math.min(targetMax, targetInt));
                    target.value = targetInt; // UI
                    editedItem.priority = targetInt; // For Model
                    break;
                case "due-input":
                    editedItem.due = target.value;
                    break;
                default:
                    return; // nothing
            }

            handler(editedItem);
        });
    }

    // Setup callback for clicking interactions with card
    const bindClickHandlers = (cardActionHandler, createItemHandler) => {
        // Listen on project container
        divProject.addEventListener("click", (e) => {
            const target = e.target;

            //-------- Project functionality
            if (target.matches(".create-item")) {
                let projName = e.target.parentElement.querySelector("h1").innerText;
                createItemHandler(projName);
            }
            
            //------- Card functionality
            const card = target.closest(".item");
            if (!card) {return};

            // Helper function
            const updateItem = {
                id : card.dataset.itemId,
                project: card.dataset.project,
            }


            // Checkbox in card
            if (target.matches("#done")) {
                updateItem.status = "toggle"; // toggle the current status
                cardActionHandler(updateItem);
                return;
            }
            

            // Buttons in card
            const btn = target.closest(".card-button");
            if (btn) {
                switch (btn.id) {
                    case "delete":
                        updateItem.delete = true;
                        cardActionHandler(updateItem);
                        break;
                    case "edit":
                        break
                    default:
                        // Nothing
                }
                return;
            }
        })
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
        bindInputHandler,
        bindClickHandlers
    }
}

export { createProjectView };