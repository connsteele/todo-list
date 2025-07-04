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

    function render(items) {
        clearItems();

        // Add cards to a project for each todoModel
        items.forEach(item => {
            const card = document.createElement("div");
            card.className = "item";
            card.dataset.itemId = item.id;
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
            const header = document.createElement("div");
            header.className = "card-header";
            const title = document.createElement("input");
            title.className = "card-title";
            title.type = "text";
            title.value = item.title;
            title.placeholder = "New Item"; // only displays if string is ""
            const info = document.createElement("textarea");
            info.className = "info";
            info.innerText = item.info;
            info.placeholder = "Enter a note here..." // only displays if string is ""
            

            // Add info to card
            card.appendChild(divButtons);
            header.appendChild(title);
            card.appendChild(header);
            card.appendChild(info);


            // Add card to page
            divItems.appendChild(card);
        });
        
        // Add the project to the projects view
        divProject.appendChild(divItems);
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

            handler(editedItem);
        });
    }

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