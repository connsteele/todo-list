// Purpose: Contains many projects

const createPortfolio = () => {

    // Add a project and a key (name)
    const addProject = (key, item) => {
        projectsMap.set(key, item);
    }

    const printProjects = () => {
        let count = 0;
        projectsMap.forEach( (value, key) => {
            console.log(`Item ${count}: {${key}: ${value}}`);
        });
    }

    // Check if the portfolio already has a project associated with the key
    const hasKey = (key) => projectsMap.has(key);

    let projectsMap = new Map();

    return {
        addProject,
        hasKey,
        printProjects,
    }
}

export { createPortfolio }