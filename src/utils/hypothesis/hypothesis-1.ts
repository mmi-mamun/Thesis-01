import jStat from "jstat"; // Importing jStat for statistical functions

/**
 * Function to perform chi-square hypothesis testing
 * @param {Array} observed - A 2D array representing observed frequency table
 */

export function runHypothesis1(observed: number[][]) {
	// Calculate the row totals
	const rowTotals = observed.map((row) => row.reduce((a, b) => a + b, 0));

	// Calculate the column totals
	const colTotals = observed[0].map((_, col) => observed.reduce((sum, row) => sum + row[col], 0));

	// Calculate the grand total (sum of all observed values)
	const total = rowTotals.reduce((a, b) => a + b, 0);

	// Compute the expected frequencies based on the observed data
	const expected = observed.map((row, i) => row.map((_, j) => (rowTotals[i] * colTotals[j]) / total));

	// Array to store detailed calculations for each cell
	const calculated: { [key: string]: number }[] = []; // {O, E, "O-E", "(O-E)^2", "{(O-E)^2}/E"}

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

	return { observed, expected, calculated, chiSquare, p };
}
