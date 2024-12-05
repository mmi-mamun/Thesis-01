import jStat from "jstat"; // Import the jStat library for statistical computations

// Utility object for logging data in a table format
const log = {
	table: (table) => {
		// Logs a formatted table with headers for easier visualization of data
		console.table({
			"With Credentials": { Employed: table[0][0], Unemployed: table[0][1] },
			"Without Credentials": { Employed: table[1][0], Unemployed: table[1][1] },
		});
	},
};

/**
 * Function to perform chi-square hypothesis testing
 * @param {Array} observed - A 2D array representing observed frequency table
 */
export function runHypothesis1(
	observed = [
		[0, 0],
		[0, 0],
	]
) {
	// Calculate the row totals
	const rowTotals = observed.map((row) => row.reduce((a, b) => a + b, 0));

	// Calculate the column totals
	const colTotals = observed[0].map((_, col) => observed.reduce((sum, row) => sum + row[col], 0));

	// Calculate the grand total (sum of all observed values)
	const total = rowTotals.reduce((a, b) => a + b, 0);

	// Compute the expected frequencies based on the observed data
	const expected = observed.map((row, i) => row.map((_, j) => (rowTotals[i] * colTotals[j]) / total));

	// Array to store detailed calculations for each cell
	const calculated = []; // {O, E, "O-E", "(O-E)^2", "{(O-E)^2}/E"}

	// Calculate chi-square components for each cell
	observed.forEach((row, i) => {
		row.forEach((obs, j) => {
			const exp = expected[i][j]; // Expected frequency for the current cell

			// Push calculated values for this cell to the array
			calculated.push({
				"Observed (O)": obs, // Observed value
				"Expected (E)": exp, // Expected value
				"O-E": obs - exp, // Difference between observed and expected
				"(O-E)^2": (obs - exp) ** 2, // Square of the difference
				"{(O-E)^2}/E": (obs - exp) ** 2 / exp, // Contribution to chi-square statistic
			});
		});
	});

	// Compute the chi-square statistic by summing all contributions
	const chiSquare = calculated.reduce((sum, row) => row["{(O-E)^2}/E"] + sum, 0);

	// Calculate degrees of freedom: (rows - 1) * (columns - 1)
	const dof = (observed.length - 1) * (observed[0].length - 1);

	// Compute the p-value using chi-square cumulative distribution function
	const p = 1 - jStat.chisquare.cdf(chiSquare, dof);

	// Log results for better understanding
	console.log(`\n\nResult for Hypothesis 3`);
	log.table(observed); // Log the observed frequencies
	log.table(expected); // Log the expected frequencies
	console.table(calculated); // Log detailed calculations
	console.table({ chiSquare, p: p.toFixed(52) }); // Log chi-square value and p-value
}
