export default function calculateRating(ratingObj) {
    const weightedSum =
        ratingObj.rating1 * 1 +
        ratingObj.rating2 * 2 +
        ratingObj.rating3 * 3 +
        ratingObj.rating4 * 4 +
        ratingObj.rating5 * 5;

    const totalRatings =
        ratingObj.rating1 +
        ratingObj.rating2 +
        ratingObj.rating3 +
        ratingObj.rating4 +
        ratingObj.rating5;

    const averageRating = weightedSum / totalRatings;

    return +averageRating.toFixed(1);
}
