// Column letters mapped to indexes (A -> 0, B -> 1, ...)
const columns = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z] = columns.map((char) => columns.indexOf(char));

export type extractedCsvData = { [key: string]: { title: string; values: { [key: string]: number } } };

export function extractCSVData(data: string[][]) {
	// Adding column names as the first row
	const newData = [data[0].map((_, i) => columns[i]), ...data];

	const extractedData: extractedCsvData = {};
	newData.forEach((row, i) => {
		if (i < 2) return; // first 2 rows are avoided (columns & headers)

		row.forEach((value, j) => {
			const col = columns[j];
			if (!extractedData[col]) extractedData[col] = { values: {}, title: newData[1][columns.indexOf(col)] }; // Initialize column if it doesn't exist
			extractedData[col].values[value] = (extractedData[col].values[value] || 0) + 1; // Count occurrences of each value in the column
		});
	});

	return extractedData;
}
