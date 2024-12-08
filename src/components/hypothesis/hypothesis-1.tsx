import { useDataContext } from "@/contexts/data-context";
import { E, extractHypothesisData, F } from "@/utils/hypothesis";
import { MathJax } from "better-react-mathjax";
import { Grid } from "gridjs-react";
import Link from "next/link";

export default function Hypothesis1() {
	const { itGraduatesTable } = useDataContext();

	if (!itGraduatesTable) return null; // itGraduatesTable will always have data because of the login on the parent components

	// Extract hypothesis data
	const { observed, rowTotals, colTotals, total, expected, calculated, chiSquare, dof, p } = extractHypothesisData(itGraduatesTable).hypothesis1();

	return (
		<div className="p-6 max-w-5xl mx-auto">
			<div>
				<h2 className="pb-5 text-center text-2xl font-semibold">Micro-credentials significantly improve the employability of IT graduates</h2>
				<p className="pb-2">
					<strong>H₀ (Null Hypothesis): </strong>
					There is no significant relationship between possessing micro-credentials and employment status among IT graduates.
				</p>
				<p className="pb-2">
					<strong>H₁ (Alternative Hypothesis): </strong>
					There is a significant relationship between possessing micro-credentials and employment status among IT graduates.
				</p>
			</div>
			<div>
				<div>
					<p className="pb-2">For this hypothesis, we are going to use the data in the table below: </p>
					<Grid
						columns={[`Employment Status`, `With Micro-Credentials`]}
						data={itGraduatesTable.map((row, i) => [row[E], row[F]]).slice(1)}
						pagination={{ limit: 10 }}
					/>
					<p className="pt-8 pb-2">Table below shows how many IT Graduates (with and without micro-credentials) are employed and unemployed:</p>
					<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Observed Table</h4>
					<Grid
						columns={[`Employment Status`, `With Micro-Credentials`, `Without Micro-Credentials`]}
						data={[
							[`Employed`, ...observed[0]],
							[`Unemployed`, ...observed[1]],
						]}
					/>
				</div>
				<div className="py-2">
					<p className="py-2">
						We will use the <strong>Chi-Squared Test</strong> for the calculation of this data. Let's start the test step by step:
					</p>
				</div>
				<div>
					<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Step 1: Make the expected table</h4>
					<p>
						In order to make the <strong>Expected Table</strong>, we will apply this formula below:
					</p>
					<div className="flex justify-center">
						<div className="pt-4 pb-2">
							<MathJax>{`\\( E_{ij} = \\frac{\\text{Row Total} \\times \\text{Column Total}}{\\text{Grand Total}} \\)`}</MathJax>
						</div>
					</div>
					<p className="pt-4">After applying the formula for each cell in the observed table, here is what we get: </p>
					<h4 className="font-semibold text-xl py-4 text-center">Expected Table</h4>
					<Grid
						columns={[`Employment Status`, `With Micro-Credentials`, `Without Micro-Credentials`]}
						data={[
							[`Employed`, ...expected[0]],
							[`Unemployed`, ...expected[1]],
						]}
					/>
				</div>
				<div>
					<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Step 2: Compute the Chi-Squared Statistic</h4>
					<p>
						In order to calculate the <strong>Chi-Squared Statistic</strong>, we will apply this formula below:
					</p>
					<div className="flex justify-center">
						<div className="pt-4 pb-2">
							<MathJax>{`\\( \\chi^2 = \\sum \\frac{(O_i - E_i)^2}{E_i} \\)`}</MathJax>
						</div>
					</div>
					<p className="pt-4">
						After applying <MathJax inline>{`\\( \\frac{(O_i - E_i)^2}{E_i} \\)`}</MathJax> part of the formula, here is what we get:{" "}
					</p>
					<h4 className="font-semibold text-xl py-4 text-center">
						Calculated Table <MathJax inline>{`\\( \\frac{(O_i - E_i)^2}{E_i} \\)`}</MathJax>
					</h4>
					<Grid columns={Object.keys(calculated[0])} data={calculated.map((row) => Object.values(row).map((v) => Number(v.toFixed(9))))} />
					<p className="pt-4 pb-2">
						Now, if we sum up the calculated values, we get: <strong>{chiSquare}</strong> which is the value of <strong>Chi-Squared Statistic</strong>
						.
					</p>
					<div className="text-center pt-4 pb-2">
						<MathJax inline>{`\\( \\chi^2 = ${chiSquare} \\)`}</MathJax>
					</div>
				</div>
				<div>
					<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Step 3: Obtain the P-Value</h4>
					<p>
						In order to obtain the <strong>p-value</strong>, we need the value of <strong>Degree of Freedom</strong>, which follows this formula
						below:
					</p>
					<div className="flex justify-center">
						<div>
							<div className="pt-4 pb-2">
								<MathJax inline>{`\\( df = (n_0-1) \\times (n_1-1) \\)`}</MathJax>
							</div>
							<div className="pt-4 pb-2">
								<MathJax inline>{`\\( df = (${observed[0].length}-1) \\times (${observed[1].length}-1) \\)`}</MathJax>
							</div>
							<div className="pt-4 pb-2">
								<MathJax inline>{`\\( df = ${dof} \\)`}</MathJax>
							</div>
						</div>
					</div>
					<p className="py-2">
						Using a t-distribution table or statistical software, we can determine the critical value or p-value. For this test we will use a node
						module (statistical software) called{" "}
						<Link className="text-blue-600 underline cursor-pointer" href={`https://www.npmjs.com/package/jstat`} target="_blank">
							jstat
						</Link>{" "}
						to obtain the p-value.
					</p>
					<p className="py-2">
						From the node module{" "}
						<Link className="text-blue-600 underline cursor-pointer" href={`https://www.npmjs.com/package/jstat`} target="_blank">
							jstat
						</Link>
						, upon providing the <strong>Chi-Squared Statistic</strong> value as <strong>{chiSquare}</strong> and <strong>Degree of Freedom</strong>{" "}
						value as <strong>{dof}</strong>, we get:
						<br />
						<strong className="block py-2 text-center">p-value: {p.toFixed(52)}</strong>
					</p>
				</div>
			</div>

			<div>
				<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Conclusion </h4>
				<p className="py-2">
					Based on the calculated <strong>p-value</strong>, we <strong>{p < 0.05 ? "reject" : "fail to reject"}</strong> the null hypothesis at a 5%
					significance level. This indicates that there {p < 0.05 ? "is a significant relationship" : "is no significant relationship"} between
					possessing micro-credentials and employment status among IT graduates.
				</p>
				<p className="py-2">
					So, we conclude that{" "}
					<strong>Micro-credentials {p < 0.05 ? "improve" : "don't improve"} the employability of IT graduates significantly.</strong>
				</p>
			</div>
		</div>
	);
}
