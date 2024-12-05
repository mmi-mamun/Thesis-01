"use client";

import CSVUploader from "@/components/csv-uploader";
import { useDataContext } from "@/contexts/data-context";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useState } from "react";

export default function HomePage() {
	const [index, setIndex] = useState<0 | 1>(0);
	const { itGraduatesTable, recruitersTable, setItGraduatesTable, setRecruitersTable } = useDataContext();
	const data = [itGraduatesTable, recruitersTable];
	const updateData = [setItGraduatesTable, setRecruitersTable];

	return (
		<div>
			<div className="pt-6 pb-2">
				<div className="flex items-center justify-center">
					<button
						className={`py-3 px-5 font-semibold rounded-l ${!index ? "bg-green-600 text-white" : "bg-gray-200"}`}
						onClick={() => {
							setIndex(0);
						}}
					>
						IT Graduates CSV Data
					</button>
					<button
						className={`py-3 px-5 font-semibold rounded-r ${index ? "bg-green-600 text-white" : "bg-gray-200"}`}
						onClick={() => {
							setIndex(1);
						}}
					>
						Job Recruiters CSV Data
					</button>
				</div>
				<CSVUploader onCsvData={updateData[index]}>
					<div className="text-center text-sm pt-2 text-green-600 underline">Update CSV data for {["IT graduates", "recruiters"][index]}</div>
				</CSVUploader>
			</div>
			<div>
				{data[index] ? (
					<div className="p-8 w-full overflow-x-auto">
						<Grid
							key={index}
							data={data[index].slice(1)}
							columns={data[index][0].map((v) => ({ name: v, minWidth: 150, resizable: true }))}
							resizable={true}
							pagination={{ limit: 10 }}
							style={{
								th: {
									"min-width": 150,
									"white-space": "nowrap",
									overflow: "hidden",
									"text-overflow": "ellipsis",
								},
								td: {
									"white-space": "nowrap",
									overflow: "hidden",
									"text-overflow": "ellipsis",
								},
							}}
						/>
					</div>
				) : (
					<div className="flex items-center justify-center h-[70vh]">
						<div className="p-8 border shadow rounded-md mb-2">
							<h3 className="text-xl font-semibold pb-4 text-[#555]">{["Upload IT Graduates CSV File", "Upload Recruiters CSV File"][index]}</h3>
							<CSVUploader onCsvData={updateData[index]} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
