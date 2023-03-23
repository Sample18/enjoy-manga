export const generateRandomNumber = (min, max) =>
    Number((Math.random() * (max - min) + min).toFixed(1));
