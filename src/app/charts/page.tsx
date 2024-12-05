"use client";

import { GeneralBarChart } from "@/components/charts/general-bar-chart";
import { GeneralPieChart } from "@/components/charts/general-pie-chart";
import COLORS from "@/utils/colors";
import { useState } from "react";
import { useDataContext } from "@/contexts/data-context";
import { extractCSVData } from "@/utils/extract-csv";
import CSVUploader from "@/components/csv-uploader";

let colorIndex = 0;
const getColor = () => {
	return COLORS[colorIndex++ % COLORS.length];
};

const colsNotForChart = [`DOGS`.split(""), `K`.split("")];

export default function ChartsPage() {
	const [index, setIndex] = useState<0 | 1>(0);
	const { itGraduatesTable, recruitersTable, setItGraduatesTable, setRecruitersTable, isLoading } = useDataContext();

	const chartData = [extractCSVData(itGraduatesTable || [[], []]), extractCSVData(recruitersTable || [[], []])];

	return (
		<div>
			<div className="flex items-center py-5 justify-center">
				<button
					className={`py-3 px-5 font-semibold rounded-l ${!index ? "bg-green-600 text-white" : "bg-gray-200"}`}
					onClick={() => {
						setIndex(0);
					}}
				>
					IT Graduates Chart
				</button>
				<button
					className={`py-3 px-5 font-semibold rounded-r ${index ? "bg-green-600 text-white" : "bg-gray-200"}`}
					onClick={() => {
						setIndex(1);
					}}
				>
					Job Recruiters Chart
				</button>
			</div>
			<div>
				{!isLoading && ![itGraduatesTable, recruitersTable][index] ? (
					<>
						<div className="flex items-center justify-center h-[70vh]">
							<div className="p-8 border shadow rounded-md mb-2">
								<h3 className="text-xl font-semibold pb-4 text-[#555]">{["Upload IT Graduates CSV File", "Upload Recruiters CSV File"][index]}</h3>
								<CSVUploader onCsvData={[setItGraduatesTable, setRecruitersTable][index]} />
							</div>
						</div>
					</>
				) : (
					Object.keys(chartData[index]).map((col) => {
						if (colsNotForChart[index].includes(col)) return null;

						const dataKey = { x: "name", y: "value" };
						const title = { x: "", y: "" };

						const data = Object.keys(chartData[index][col].values).map((key) => ({
							[dataKey.x]: `${key}`,
							[dataKey.y]: chartData[index][col].values[key],
							color: getColor(),
						}));

						return (
							<div key={col} className="p-8 pb-16 my-1 shadow">
								<div className="text-center text-2xl p-5">
									{/* {col}: {chartData[index][col].title} */}
									{chartData[index][col].title}
								</div>

								<div className="grid grid-cols-2 xl:grid-cols-3 gap-10 min-h-[400px]">
									<GeneralBarChart data={data} dataKey={dataKey} title={title} />
									<GeneralPieChart data={data} dataKey={dataKey} title={title} />
									<div className="p-5 pr-12 flex flex-col justify-center">
										{data.map((cell, i: number) => {
											return (
												<div key={`${col}-color-${i}`} className="flex items-center gap-2">
													<div className="w-5 h-3 rounded my-1" style={{ backgroundColor: cell.color }}></div>
													<div>
														{Object.values(cell)[0] || "N/A"} ➜ {Object.values(cell)[1]}
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}
