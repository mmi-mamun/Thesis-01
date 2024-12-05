import jStat from "jstat"; // Importing jStat for statistical functions

/**
 * Function to perform hypothesis testing using the T-test
 * @param {Array} ratings - An array of sample ratings
 * @param {number} populationMean - The population mean (default is 3)
 */

export function runHypothesis3(ratings = [], populationMean = 3) {
	// Calculate the sum of all ratings
	const sumOfRatings = ratings.reduce((sum, cur) => sum + cur, 0);
	const n = ratings.length; // Number of ratings (sample size)

	// Calculate the sample mean (average of the ratings)
	const sampleMean = sumOfRatings / n;

	// Calculate the standard deviation of the ratings
	const stdDev = Math.sqrt(ratings.reduce((sum, cur) => sum + (cur - sampleMean) ** 2, 0) / (n - 1));

	// Calculate the T-statistic for the hypothesis test
	const tStatistic = (sampleMean - populationMean) / (stdDev / Math.sqrt(n));

	// Calculate the p-value using the T-distribution
	const pValue = 1 - jStat.studentt.cdf(tStatistic, n - 1); // One-tailed p-value

	// Log the results of the hypothesis test
	console.log(`\n\nResult for Hypothesis 3`);
	console.table({
		populationMean, // The population mean we are testing against
		meanRating: sampleMean, // The mean of the sample ratings
		stdDev, // The standard deviation of the sample ratings
		n, // The number of ratings (sample size)
		tStatistic, // The calculated T-statistic
		pValue: pValue.toFixed(2), // The p-value (rounded for readability)
	});
}

// Example test cases (commented out, can be used for testing)
// runHypothesis3([2, 2, 2, 1, 2, 1, 2, 1, 4, 5, 2, 2, 3, 3, 2, 4, 3, 1], 1.5); // Reference: youtube.com/watch?v=2zVeV1ohGCU
// runHypothesis3([128, 118, 144, 133, 132, 111, 149, 139, 136, 126, 127, 115, 142, 140, 131, 132, 122, 119, 129, 128], 120); // Reference: youtube.com/watch?v=vEG_MOnyMdE
