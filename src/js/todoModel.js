// Purpose: Control logic of todo items
import { format } from "date-fns" 

// Format a given date to a more readable format
const formatDate = (date) => {
    return format(date,  "yyyy-mm-dd");
}

// Factory function for todoLogic model
const createTodoModel = (inTitle) => {
    let title = inTitle;
    let info = "";
    let done = false;
    let priority = undefined; // 0 to 5
    let created = formatDate(new Date());
    let due = undefined;
    let tags = {};
    
    const toJSON = () => {
        return {
            title: title,
            info: info,
            done: done,
            priority: priority,
            created: created,
            due: due,
            tags: tags
        }
    }

    
    return {
        // Getters and setters
        get title() {return title;},
        set title(inTitle) {title = inTitle;},
        get info() {return info;},
        set info(inInfo) {info = inInfo;},
        get priority() {return priority;},
        set priority(inPriority) {priority = inPriority;},
        get created() {return created;},
        set created(inCreated) {created = inCreated;},
        get due() {return due;},
        set due(inDue) {due = inDue;},
        get tags() {return tags;},
        set tags(inTags) {tags = inTags;},
        get done() {return done;},
        set done(inDone) {done = inDone;},
        // Others
        formatDate,
        toJSON
    }
}

export { createTodoModel };