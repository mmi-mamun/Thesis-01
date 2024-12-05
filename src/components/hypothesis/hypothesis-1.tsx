import { useDataContext } from "@/contexts/data-context";
import { extractHypothesisData } from "@/utils/hypothesis";

export default function Hypothesis1() {
	const { itGraduatesTable } = useDataContext();

	// Extract hypothesis data
	const { calculated, chiSquare, expected, observed, p } = extractHypothesisData(itGraduatesTable as any).hypothesis1();

	return (
		<div className="p-6 max-w-5xl mx-auto">
			<h1 className="text-2xl font-bold text-center mb-6">Hypothesis 1: Micro-credentials and Employability of IT Graduates</h1>

			{/* Hypothesis Statement */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold">Hypothesis Statement</h2>
				<div>
					<h4 className="pt-3 pb-1">
						<strong>Null Hypothesis (H₀):</strong>
					</h4>{" "}
					There is no significant relationship between possessing micro-credentials and employment status among IT graduates.
					<br />
					<h4 className="pt-3 pb-1">
						<strong>Alternative Hypothesis (H₁):</strong>
					</h4>{" "}
					There is a significant relationship between possessing micro-credentials and employment status among IT graduates.
				</div>
			</section>

			{/* Contingency Table */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold">Observed and Expected Counts</h2>
				<div className="mb-4">
					<strong>Observed Counts:</strong>
					<table className="min-w-full table-auto">
						<thead>
							<tr>
								<th className="px-4 py-2">Employment Status</th>
								<th className="px-4 py-2">Micro-credentials (Yes)</th>
								<th className="px-4 py-2">Micro-credentials (No)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border px-4 py-2">Employed</td>
								<td className="border px-4 py-2">{observed[0][0]}</td>
								<td className="border px-4 py-2">{observed[0][1]}</td>
							</tr>
							<tr>
								<td className="border px-4 py-2">Unemployed</td>
								<td className="border px-4 py-2">{observed[1][0]}</td>
								<td className="border px-4 py-2">{observed[1][1]}</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="mb-4">
					<strong>Expected Counts:</strong>
					<table className="min-w-full table-auto">
						<thead>
							<tr>
								<th className="px-4 py-2">Employment Status</th>
								<th className="px-4 py-2">Micro-credentials (Yes)</th>
								<th className="px-4 py-2">Micro-credentials (No)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border px-4 py-2">Employed</td>
								<td className="border px-4 py-2">{expected[0][0].toFixed(2)}</td>
								<td className="border px-4 py-2">{expected[0][1].toFixed(2)}</td>
							</tr>
							<tr>
								<td className="border px-4 py-2">Unemployed</td>
								<td className="border px-4 py-2">{expected[1][0].toFixed(2)}</td>
								<td className="border px-4 py-2">{expected[1][1].toFixed(2)}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			{/* Chi-Square Calculation */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold">Step-by-Step Calculation</h2>
				<ol className="list-decimal pl-6">
					<li className="mb-4">
						<strong>Chi-Square Statistic (χ²):</strong> The calculated Chi-Square value is <code>{chiSquare.toFixed(2)}</code>.
					</li>
					<li className="mb-4">
						<strong>p-Value:</strong> The p-value for the Chi-Square test is <code>{p.toFixed(20)}</code>.
					</li>
				</ol>
			</section>

			{/* Conclusion */}
			<section>
				<h2 className="text-lg font-semibold">Conclusion</h2>
				<p>
					Based on the calculated p-value (<code>{p.toFixed(20)}</code>), we
					{p < 0.05 ? <span className="text-green-600 font-bold"> reject </span> : <span className="text-red-600 font-bold"> fail to reject </span>}
					the null hypothesis at a 5% significance level. This indicates that there{" "}
					{p < 0.05 ? "is a significant relationship" : "is no significant relationship"} between possessing micro-credentials and employment status
					among IT graduates.
				</p>
			</section>
		</div>
	);
}
