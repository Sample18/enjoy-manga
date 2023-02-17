const Paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    if (typeof items === "object") {
        return Object.values(items).splice(startIndex, pageSize);
    }
    return [...items].splice(startIndex, pageSize);
};

export default Paginate;
