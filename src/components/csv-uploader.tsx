"use client";

import { parse } from "csv-parse/sync";
import React, { useRef, useState } from "react";

type Props = { onCsvData?: (data: string[][]) => any; children?: React.ReactNode };

export function CSVUploader({ onCsvData, children }: Props) {
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<any>(null);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		if (file.type !== "text/csv") {
			setError("Please upload a valid CSV file.");
			return;
		}
		setError(null);

		const reader = new FileReader();
		reader.onload = (e) => {
			const text = e.target?.result as string;
			const parsedData = parse(text, { skip_empty_lines: true });
			onCsvData?.(parsedData);
		};
		reader.readAsText(file);
	};

	return (
		<>
			<input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} ref={inputRef} />
			<div
				className="w-full cursor-pointer"
				onClick={() => {
					inputRef.current?.click();
				}}
			>
				{children ? (
					children
				) : (
					<div className="flex items-stretch gap-3 bg-green-50 hover:bg-green-100 rounded-r-md">
						<div className="py-3 px-4 rounded-l-md bg-green-600 text-white font-semibold">Choose file</div>
						<div className="grow flex items-center text-green-500">No file chosen</div>
					</div>
				)}
				{error && <p className="text-red-500 pt-3">{error}</p>}
			</div>
		</>
	);
}

export default CSVUploader;
