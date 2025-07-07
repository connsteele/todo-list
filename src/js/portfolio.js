// Purpose: Contains many projects

const createPortfolio = (name) => {

    // Add a project and a key (name)
    const addProject = (key, item) => {
        projectsMap.set(key, item);
    }

    // Add a project with pre-existing data (load)
    // const loadProject = (key, item) => {
    //     // init the project
    //     projectsMap.set(key, item);
    // }

    const printProjects = () => {
        let count = 0;
        projectsMap.forEach( (value, key) => {
            console.log(`Item ${count}: {${key}: ${value}}`);
        });
    }

    // Check if the portfolio already has a project associated with the key
    const hasKey = (key) => projectsMap.has(key);

    const toJSON = () => {
        return {
            name: portfolioName,
            projects: Object.fromEntries(projectsMap),
        }
    }

    const portfolioName = name;
    let projectsMap = new Map();

    return {
        addProject,
        //loadProject,
        hasKey,
        printProjects,
        projectsMap,
        toJSON
    }
}

export { createPortfolio }