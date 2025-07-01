// Purpose: Control DOM for todo items
import "../css/style.css"
import "../css/item.css"

function createTodoView(title) {
    const divItems = document.querySelector("#items");
    const divItem = document.createElement("div");


    function init() {
        // Create the view for the card
        divItem.className = "item";
        const itemTitle = document.createElement("h1");
        itemTitle.innerText = title;
        const itemBreak = document.createElement("hr");
        const itemInfo = document.createElement("p");
        itemInfo.id = "info";
        

        // Add to the card
        divItem.appendChild(itemTitle);
        divItem.appendChild(itemBreak);
        divItem.appendChild(itemInfo);
        // Add to the document
        divItems.appendChild(divItem);

    }

    function updateInfo(info) {
        (divItem.querySelector("#info")).innerText = info;
    }


    function updateView() {

    }


    return {
        init,
        updateInfo,
        updateView,
    }
}

export { createTodoView };