export const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

export const convertObjectIntoArray = (object): any[] => {
    return Object.keys(object).map(
        id => ({
            ...object[id]
        })
    )
};
