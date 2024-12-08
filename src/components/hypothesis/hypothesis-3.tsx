import { useDataContext } from "@/contexts/data-context";
import { extractHypothesisData, I, map } from "@/utils/hypothesis";
import { MathJax } from "better-react-mathjax";
import { Grid } from "gridjs-react";
import Link from "next/link";

export default function Hypothesis3() {
	const { recruitersTable } = useDataContext();

	// Extract data
	const { ratings, populationMean, sumOfRatings, n, sampleMean, stdDev, tStatistic, pValue } = extractHypothesisData(
		undefined,
		recruitersTable as any
	).hypothesis3();

	return (
		<div className="p-6 max-w-5xl mx-auto">
			<div>
				<h2 className="pb-5 text-center text-2xl font-semibold">Job recruiters perceive micro-credentials as valuable in the hiring process.</h2>
				<p className="pb-2">
					<strong>H₀ (Null Hypothesis): </strong>
					Job recruiters do not perceive micro-credentials as valuable in the hiring process (average importance rating is equal to or less than a
					neutral value).
				</p>
				<p className="pb-2">
					<strong>H₁ (Alternative Hypothesis): </strong>
					Job recruiters perceive micro-credentials as valuable in the hiring process (average importance rating is greater than a neutral value).
				</p>
			</div>
			<div>
				<p className="pb-2">For this hypothesis, we are going to use the data below in the table: </p>
				<Grid columns={["Ratings"]} data={recruitersTable?.map((row) => [row[I]]).slice(1)} pagination={{ limit: 10 }} />

				<div className="py-2">
					<p className="py-2">
						We will use the <strong>One Sample T Test</strong> for the calculation of this data.
					</p>
					<div>
						<p className="py-2">
							As <strong>One Sample T Test</strong> expects the data to be distinguishable meaning two different categories are not equally different,
							rather one category has precedence over the other category, so, we need to convert those ratings into number values. There are{" "}
							<strong>{Object.keys(map.likertScale).length - 1}</strong> different rating categories, so we will refer number values for them
							accordingly:
						</p>
						<ul className="list-disc ml-8 py-2">
							{Object.keys(map.likertScale).map((rating) => {
								if (!rating) return;

								return (
									<li key={rating}>
										<strong>{rating}</strong> will be referred as <strong>{map.likertScale[rating]}</strong>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className="pb-5">
					<p className="py-2">Now, we get the table with number values:</p>
					<Grid columns={["Ratings (in number)"]} data={ratings.map((r) => [r])} pagination={{ limit: 10 }} />
				</div>
			</div>
			<div>
				<p className="py-2">
					As we got table with number values. Also we declare the neutral value <strong>{populationMean}</strong> as the{" "}
					<strong>Population Mean</strong> which we will need in the Test. Now, We can start our chosen <strong>One Sample T Test</strong>. Let's do
					the test step by step:
				</p>
				<div>
					<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Step 1: Calculate the Sample Mean</h4>
					<p className="py-2">
						<strong>Sample Mean</strong> is calculated using this formula:
					</p>
					<div className="flex justify-center">
						<div>
							<div className="pt-2 pb-4">
								<MathJax>{`\\( \\bar{x} = \\frac{\\sum_{i=1}^n x_i}{n} \\)`}</MathJax>
							</div>
							<div className="pt-2 pb-4">
								<MathJax>{`\\( \\bar{x} = \\frac{${ratings.slice(0, 3).join("+")}+......+${ratings
									.slice(ratings.length - 3)
									.join("+")}}{${n}} \\)`}</MathJax>
							</div>
							<div className="pt-2 pb-4">
								<MathJax>{`\\( \\bar{x} = \\frac{${sumOfRatings}}{${n}} \\)`}</MathJax>
							</div>
							<div className="pt-2 pb-4">
								<MathJax>{`\\( \\bar{x} = ${sampleMean} \\)`}</MathJax>
							</div>
						</div>
					</div>
					<div>
						<p>
							Here <strong>n</strong> is the total number of ratings which is: {n}. And{" "}
							<MathJax inline className="w-10">{`\\( \\sum_{i=1}^n x_i \\)`}</MathJax> indicates the sum of the rating values, which is:{" "}
							{ratings.join(" + ")} = <strong>{sumOfRatings}</strong>
						</p>
					</div>
				</div>
				<div>
					<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Step 2: Calculate the Standard Deviation</h4>
					<p>
						<strong>Standard Deviation </strong> is calculated using this formula:
					</p>
					<div className="flex justify-center">
						<div>
							<div className="pt-2 pb-4">
								<MathJax>{`\\( s = \\sqrt{\\frac{\\sum_{i=1}^n (x_i - \\bar{x})^2}{n - 1}} \\)`}</MathJax>
							</div>
							<div className="pt-2 pb-4">
								<MathJax>{`\\( s = \\sqrt{\\frac{${ratings
									.slice(0, 2)
									.map((r) => `(${r}-${sampleMean.toFixed(2)})^2`)
									.join("+")}+......+${ratings
									.slice(ratings.length - 2)
									.map((r) => `(${r}-${sampleMean.toFixed(2)})^2`)
									.join("+")}}{${n} - 1}} \\)`}</MathJax>
							</div>
							<div className="pt-2 pb-4">
								<MathJax>{`\\( s = ${stdDev} \\)`}</MathJax>
							</div>
						</div>
					</div>
				</div>
				<div>
					<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Step 3: Calculate the T-Statistic</h4>
					<p>
						<strong>T-Statistic </strong> is calculated using this formula:
					</p>
					<div className="flex justify-center">
						<div>
							<div className="pt-2 pb-4">
								<MathJax>{`\\( t = \\frac{\\bar{x}-\\mu_0}{\\frac{s}{\\sqrt{n}}} \\)`}</MathJax>
							</div>
							<div className="pt-2 pb-4">
								<MathJax>{`\\( t = \\frac{${sampleMean}-${populationMean}}{\\frac{${stdDev}}{\\sqrt{${n}}}} \\)`}</MathJax>
							</div>
							<div className="pt-2 pb-4">
								<MathJax>{`\\( t = ${tStatistic} \\)`}</MathJax>
							</div>
						</div>
					</div>
					<p className="py-2">
						Here <MathJax inline>{`\\( \\mu_0 \\)`}</MathJax> indicates the <strong>Population Mean</strong> which we determined as{" "}
						<strong>{populationMean}</strong> earlier.
					</p>
				</div>
				<div>
					<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Step 6: Obtain the p-value </h4>
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
						, upon providing the <strong>T-Statistic</strong> value as <strong>{tStatistic}</strong>, we get:
						<br />
						<strong className="block py-2 text-center">p-value: {pValue.toFixed(52)}</strong>
					</p>
				</div>
			</div>

			<div>
				<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Conclusion</h4>
				<p>
					Based on the calculated <strong>p-value</strong>, we <strong>{pValue < 0.05 ? "reject" : "fail to reject"}</strong> the null hypothesis at a
					5% significance level.
				</p>
				<p className="py-2">
					So, we conclude that{" "}
					<strong>Job recruiters {pValue < 0.05 ? "perceive" : "do not perceive"} micro-credentials as valuable in the hiring process.</strong>
				</p>
			</div>
		</div>
	);
}
