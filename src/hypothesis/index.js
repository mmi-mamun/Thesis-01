import fs from "fs";
import { parse } from "csv-parse/sync";
import { runHypothesis1 } from "@/hypothesis/hypothesis-1";
import { runHypothesis2 } from "@/hypothesis/hypothesis-2";
import { runHypothesis3 } from "@/hypothesis/hypothesis-3";
import { cleanText } from "@/utils/trim-text";
import path from "path";

// File paths for input data and output file
const itGraduatesFile = path.join(process.cwd(), `./src/hypothesis/input/it-graduates.csv`);
const recruitersFile = path.join(process.cwd(), `./src/hypothesis/input/recruiters.csv`);
const itGraduatesOutputFile = path.join(process.cwd(), `./src/hypothesis/output/it-graduates.json`);
const recruitersOutputFile = path.join(process.cwd(), `./src/hypothesis/output/recruiters.json`);

// Column letters mapped to indexes (A -> 0, B -> 1, ...)
const columns = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z] = columns.map((char) => columns.indexOf(char));

// Converting CSV file content into 2D arrays
const itGraduatesTable = parse(fs.readFileSync(itGraduatesFile), {
	skip_empty_lines: true, // Skips any empty lines
});
const recruitersTable = parse(fs.readFileSync(recruitersFile), {
	skip_empty_lines: true, // Skips any empty lines
});

// Adding column names as the first row
itGraduatesTable.unshift(itGraduatesTable[0].map((_, i) => columns[i]));
recruitersTable.unshift(recruitersTable[0].map((_, i) => columns[i]));

// Helper function to match strings to boolean values (employed/unemployed, yes/no)
const match = (str /* string */) => {
	str = str.toLowerCase().trim();
	return {
		employed: str === "employed", // Checks if the string is "employed"
		unemployed: str === "unemployed", // Checks if the string is "unemployed"
		yes: str === "yes", // Checks if the string is "yes"
		no: str === "no", // Checks if the string is "no"
	};
};

// Mapping values for duration and Likert scale
const map = {
	duration: {
		"less than 1 month": 1,
		"1-3 months": 2,
		"4-6 months": 3,
		"7-12 months": 4,
		"12-24 months": 5,
		"more than 24 months": 6,
		"": NaN, // Empty strings are mapped to NaN
	},
	likertScale: {
		"very likely": 5,
		likely: 4,
		neutral: 3,
		unlikely: 2,
		"very unlikely": 1,
		"": NaN, // Empty strings are mapped to NaN
	},
};

// Helper function to convert duration text to corresponding value
const getDurationValue = (duration = "") => {
	const text = cleanText(duration || "").toLowerCase();
	return map.duration[text];
};

// Helper function to convert Likert scale text to corresponding value
const getLikertValue = (likertValue = "") => {
	const text = cleanText(likertValue || "").toLowerCase();
	return map.likertScale[text];
};

// Table to store data for hypotheses 1, 2, and 3
const table = {
	hyp1: [
		[0 /*   Cred+Emp */, 0 /*   Cred+UnEmp */],
		[0 /* NoCred+Emp */, 0 /* NoCred+UnEmp */],
	],
	hyp2: [
		[], // with credentials
		[], // without credentials
	],
	hyp3: [], // Likert values for hypothesis 3
};

// Processing IT graduates data
itGraduatesTable.forEach((row, i) => {
	if (i < 2) return; // Skip first two rows (header)

	// Matching employment and credentials status
	const { employed, unemployed } = match(row[E]);
	const { yes: cred, no: noCred } = match(row[F]);

	// Filling the data for Hypothesis 1 table (employment and credentials)
	if (employed) {
		if (cred) table.hyp1[0][0] += 1; // Cred+Emp
		if (noCred) table.hyp1[1][0] += 1; // NoCred+Emp
	} else if (unemployed) {
		if (cred) table.hyp1[0][1] += 1; // Cred+UnEmp
		if (noCred) table.hyp1[1][1] += 1; // NoCred+UnEmp
	}

	// Filling the data for Hypothesis 2 table (duration and credentials)
	const rank = getDurationValue(row[L]);
	if (isNaN(rank)) return; // Skip if rank is not valid

	if (cred) table.hyp2[0].push(rank); // With credentials
	else if (noCred) table.hyp2[1].push(rank); // Without credentials
});

// Processing recruiters data
recruitersTable.forEach((row, i) => {
	// Getting Likert scale values for Hypothesis 3
	const likertValue = getLikertValue(row[I]);
	if (!isNaN(likertValue)) table.hyp3.push(likertValue); // Adding Likert value if valid
});

// Running hypotheses tests
runHypothesis1(table.hyp1); // Running Hypothesis 1 test
runHypothesis2(table.hyp2); // Running Hypothesis 2 test
runHypothesis3(table.hyp3); // Running Hypothesis 3 test

// Extracting the table data for visualization (quantity, percentage)
const itGraduatesData = {};
itGraduatesTable.forEach((row, i) => {
	if (i < 2) return; // first 2 rows are avoided (headers)

	row.forEach((value, j) => {
		const col = columns[j];
		if (!itGraduatesData[col]) itGraduatesData[col] = { values: {}, title: itGraduatesTable[1][columns.indexOf(col)] }; // Initialize column if it doesn't exist
		itGraduatesData[col].values[value] = (itGraduatesData[col].values[value] || 0) + 1; // Count occurrences of each value in the column
	});
});

const recruitersData = {};
recruitersTable.forEach((row, i) => {
	if (i < 2) return; // first 2 rows are avoided (headers)

	row.forEach((value, j) => {
		const col = columns[j];
		if (!recruitersData[col]) recruitersData[col] = { values: {}, title: recruitersTable[1][columns.indexOf(col)] }; // Initialize column if it doesn't exist
		recruitersData[col].values[value] = (recruitersData[col].values[value] || 0) + 1; // Count occurrences of each value in the column
	});
});

// Writing the extracted data to output files in a JSON format
fs.writeFileSync(itGraduatesOutputFile, JSON.stringify(itGraduatesData)); // Save IT graduates data
fs.writeFileSync(recruitersOutputFile, JSON.stringify(recruitersData)); // Save recruiters data
