export const updateObject = (oldProject, updatedProperties) => {
    return {
        ...oldProject,
        ...updatedProperties
    }
};