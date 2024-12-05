export function cleanText(text: string = "") {
	return text
		.split(" ") // Split the text into an array of words based on spaces
		.filter((char) => !!char) // Filter out any empty strings (which represent extra spaces)
		.join(" "); // Join the filtered array back into a string with single spaces between words
}
