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
            const title = document.createElement("h1");
            title.innerText = item.title;
            const hr = document.createElement("hr");
            const info = document.createElement("p");
            info.innerText = item.info;
            info.contentEditable = "true";

            // Add info to card
            card.appendChild(title);
            card.appendChild(hr);
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
            if (e.target.nodeName === "P") {
                handler(e.target.parentElement.dataset.itemId, e.target.innerText);
                // if (e.target.className === "item") {
                //     handler(0, info);
                // }
            }

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