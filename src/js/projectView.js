// Purpose: U/I display and interactions with projects
import "../css/style.css"
import "../css/item.css"

function createProjectView(title) {
    const divItems = document.querySelector("#items");
    const divItem = document.createElement("div");

    // Remove all children from #items div
    function clearItems() {
        while(divItems.firstChild) {
            divItems.removeChild(divItems.firstChild);
        }
    }

    function update(items) {
        clearItems();

        // Update the display
        items.forEach(item => {
            const ele = document.createElement("div");
            ele.className = "item";
            const title = document.createElement("h1");
            title.innerText = item.title;

            // Add info to card
            ele.appendChild(title);

            // Add card to page
            divItems.appendChild(ele);
        });
    }

    return {
        update
    }
}

export { createProjectView };