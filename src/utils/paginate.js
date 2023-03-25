const Paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    if (items) {
        if (typeof items === "object") {
            return Object.values(items).splice(startIndex, pageSize);
        }
        return [...items].splice(startIndex, pageSize);
    } else {
        return [];
    }
};

export default Paginate;
