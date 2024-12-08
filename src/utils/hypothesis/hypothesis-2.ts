import jStat from "jstat"; // Importing jStat for statistical functions

/**
 * Function to perform hypothesis testing using the Mann-Whitney U test
 * @param {Array} observed - A 2D array representing two groups of observed values
 */

export function runHypothesis2(observed: number[][]) {
	// Combine the two groups into one array and assign a group number (0 or 1) to each value
	const combined = [
		...observed[0].map((value) => ({ value, group: 0, rank: 0 })), // Group 0
		...observed[1].map((value) => ({ value, group: 1, rank: 0 })), // Group 1
	];
	// Sort combined data by the values in ascending order
	combined.sort((a, b) => a.value - b.value);

	// Calculate ranks for each value
	let cur = 1; // Current rank value
	let totalCur = 0; // Total count of repeated values
	let rankSum = 0; // Sum of ranks for duplicate values
	combined.forEach((row, i) => {
		row.rank = i + 1; // Default rank (no duplicates)

		// Handle duplicate values by calculating the average rank for repeated values
		if (row.value === cur) {
			totalCur++; // Increment the count of repeated values
			rankSum += row.rank; // Add current rank to the sum
		} else {
			// Average the rank for the previous set of duplicate values
			const avgRank = rankSum / totalCur;
			// Assign the average rank to all the repeated values
			for (let j = i - 1; totalCur; j--, totalCur--) {
				combined[j].rank = avgRank;
			}
			// Move to the next unique value
			cur++;
			totalCur = 1; // Reset the duplicate count
			rankSum = row.rank; // Start a new rank sum for the next group
		}
	});

	// Handle the last group of duplicates that may have been missed in the loop
	const avgRank = rankSum / totalCur;
	for (let j = combined.length - 1; totalCur; j--, totalCur--) {
		combined[j].rank = avgRank;
	}

	// Reconstruct the two groups with their respective ranks
	const rankedGroups: {
		value: number;
		group: number;
		rank: number;
	}[][] = [[], []]; // Array to hold the ranked groups

	combined.forEach((row) => {
		rankedGroups[row.group].push(row); // Distribute rows back into their respective groups
	});

	// Calculate the rank sum for each group
	const [group0, group1] = rankedGroups;
	const rankSumGroup0 = group0.reduce((sum, { rank }) => rank + sum, 0); // Rank sum for group 0
	const rankSumGroup1 = group1.reduce((sum, { rank }) => rank + sum, 0); // Rank sum for group 1

	// Calculate U-statistics for each group using the rank sums
	const [n0, n1] = [group0.length, group1.length]; // Number of elements in each group
	const u0 = rankSumGroup0 - (n0 * (n0 + 1)) / 2; // U-statistic for group 0
	const u1 = rankSumGroup1 - (n1 * (n1 + 1)) / 2; // U-statistic for group 1
	const uStat = Math.min(u0, u1); // The U-statistic for the test (smaller of u0 and u1)

	// Calculate the expected U value and standard error of U for large samples
	const expectedU = (n0 * n1) / 2; // Expected value of U
	const standardErrorOfU = Math.sqrt((n0 * n1 * (n0 + n1 + 1)) / 12); // Standard error of U
	const z = (uStat - expectedU) / standardErrorOfU; // Z-score for hypothesis testing

	// Calculate the p-value using the Z-score
	const p = (1 - jStat.normal.cdf(Math.abs(z), 0, 1)) * 2; // Two-tailed p-value

	return {
		observed,
		combined,
		n0, // Number of elements in group 0
		n1, // Number of elements in group 1
		rankedGroups,
		rankSumGroup0, // Rank sum for group 0
		rankSumGroup1, // Rank sum for group 1
		u0, // U-statistic for group 0
		u1, // U-statistic for group 1
		uStat, // The chosen U-statistic for the test
		expectedU, // Expected U value
		standardErrorOfU, // Standard error of U
		z, // Z-score
		p, // P-value
	};
}

// Example test cases (commented out, can be used for testing)
// runHypothesis2([[3, 4, 2, 6, 2, 5], [9, 7, 5, 10, 6, 8]]); // Reference: youtube.com/watch?v=BT1FKd1Qzjw
// runHypothesis2([[34, 36, 41, 43, 44, 37], [45, 33, 35, 39, 42], ]); // Reference: youtube.com/watch?v=LcxB56PzylA
