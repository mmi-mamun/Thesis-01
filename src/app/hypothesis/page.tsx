"use client";

import { useState } from "react";
import { useDataContext } from "@/contexts/data-context";
import CSVUploader from "@/components/csv-uploader";
import Hypothesis1 from "@/components/hypothesis/hypothesis-1";
import Hypothesis2 from "@/components/hypothesis/hypothesis-2";
import Hypothesis3 from "@/components/hypothesis/hypothesis-3";

export default function HypothesisPage() {
	const [index, setIndex] = useState<0 | 1 | 2>(0);
	const { itGraduatesTable, recruitersTable, setItGraduatesTable, setRecruitersTable, isLoading } = useDataContext();

	return (
		<div>
			<div className="flex items-center py-5 justify-center">
				{[0, 1, 2].map((i) => {
					return (
						<button
							key={i}
							className={`py-3 px-5 font-semibold ${["rounded-l", "border-l border-r border-[#bbb]", "rounded-r"][i]} ${
								index === i ? "bg-green-600 text-white" : "bg-gray-200"
							}`}
							onClick={() => {
								setIndex(i as 0 | 1 | 2);
							}}
						>
							Hypothesis {i + 1}
						</button>
					);
				})}
			</div>
			<div>
				{!isLoading && ![itGraduatesTable, itGraduatesTable, recruitersTable][index] ? (
					<>
						<div className="flex items-center justify-center h-[70vh]">
							<div className="p-8 border shadow rounded-md mb-2">
								<h3 className="text-xl font-semibold pb-4 text-[#555]">
									{["Upload IT Graduates CSV File", "Upload Recruiters CSV File"][Math.max(index - 1, 0)]}
								</h3>
								<CSVUploader onCsvData={[setItGraduatesTable, setRecruitersTable][Math.max(index - 1, 0)]} />
							</div>
						</div>
					</>
				) : (
					<div className="p-8 max-w-4xl mx-auto">{[<Hypothesis1 />, <Hypothesis2 />, <Hypothesis3 />][index]}</div>
				)}
			</div>
		</div>
	);
}
