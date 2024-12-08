import { MathJax } from "better-react-mathjax";
import { useDataContext } from "@/contexts/data-context";
import { extractHypothesisData, F, L, map } from "@/utils/hypothesis";
import { Grid } from "gridjs-react";

import "gridjs/dist/theme/mermaid.css";
import Link from "next/link";

function rotate<T>(arr: T[][]): T[][] {
	const rotated: T[][] = [];
	for (let i = 0; arr[0][i] || arr[1][i]; i++) rotated.push([arr[0][i], arr[1][i]]);
	return rotated;
}

export default function Hypothesis2() {
	const { itGraduatesTable } = useDataContext();

	const { observed, combined, n0, n1, rankedGroups, rankSumGroup0, rankSumGroup1, u0, u1, uStat, expectedU, standardErrorOfU, z, p } =
		extractHypothesisData(itGraduatesTable as any).hypothesis2();

	return (
		<div className="p-6 max-w-5xl mx-auto">
			<div>
				<h2 className="pb-5 text-center text-2xl font-semibold">IT graduates with micro-credentials secure jobs faster than those without them</h2>
				<p className="pb-2">
					<strong>H₀ (Null Hypothesis): </strong>
					There is no significant difference in the time taken to secure a job between IT graduates with micro-credentials and those without
					micro-credentials.
				</p>
				<p className="pb-2">
					<strong>H₁ (Alternative Hypothesis): </strong>
					IT graduates with micro-credentials secure jobs significantly faster than those without micro-credentials.
				</p>
			</div>
			<div>
				<div>
					<p className="pb-2">For this hypothesis, we are going to use the data in the table below: </p>
					<Grid
						columns={[`With Micro-Credentials`, `Time Taken to Secure Job`]}
						data={itGraduatesTable?.map((row, i) => [row[F], row[L]]).slice(1)}
						pagination={{ limit: 10 }}
					/>

					<div className="py-2">
						<p className="py-2">
							We will use the <strong>Mann Whitney U Test</strong> for the calculation of this data.
						</p>
						<p className="py-2">
							We have the list of time duration (for securing the first job) of IT Graduates (with and without micro-credentials). So we are gonna
							split them into two groups:
						</p>
						<ul className="list-disc ml-8 py-2">
							<li>
								<strong>Group 1</strong>: With Micro Credentials
							</li>
							<li>
								<strong>Group 2</strong>: Without Micro-Credentials
							</li>
						</ul>
						<div>
							<p className="py-2">
								As <strong>Mann Whitney U Test</strong> expects the data to be rank-able, we need to convert those time duration values into number
								values. There are <strong>{Object.keys(map.duration).length - 1}</strong> different time durations, so we will rank them accordingly:
							</p>
							<ul className="list-disc ml-8 py-2">
								{Object.keys(map.duration).map((timeDuration) => {
									if (!timeDuration) return;

									return (
										<li key={timeDuration}>
											<strong>{timeDuration}</strong> will be ranked as <strong>{map.duration[timeDuration]}</strong>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
					<div className="pb-5">
						<p className="py-2">Now we get these two groups with the number values (for rank) of the time durations:</p>
						<Grid columns={["With Micro-Credentials", "Without Micro Credentials"]} data={rotate(observed)} pagination={{ limit: 10 }} />
						<small className="py-2 text-[#666] text-sm">
							Note: We skipped those rows which didn't have any time duration value as those IT Graduates didn't secure any job yet.
						</small>
					</div>
				</div>
				<div>
					<p className="py-2">
						Now, as we got the two groups with number values. We can start our chosen <strong>Mann Whitney U Test</strong>. Let's do the test step by
						step:
					</p>
					<div>
						<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Step 1: Combine the groups and rank the data</h4>
						<p className="py-2">
							In this step, we combine both of the groups into a single list. Then we rank the values accordingly, IT Graduates with the lowest time
							to secure the first job gets the highest rank.
						</p>
						<p className="py-2">
							Now, here we have only {Object.keys(map.duration).length - 1} different values for the time duration. So, many of the IT Graduates will
							have the same value with different rank. That's not fair, those with the same time duration should get the same rank, otherwise our
							calculation would direct us to a wrong conclusion.
						</p>
						<p className="py-2">
							So, what we do is, we provide an average rank for all of the IT Graduates with the same time duration value. Thus, those with same
							values get the same rank as well.
						</p>
						<p className="py-2">So, here are the rankings for Group 1 (With Micro-Credentials):</p>
						<Grid
							columns={["Time Duration Value", "Rank"]}
							data={rankedGroups[0].map(({ value, rank }) => [value, rank])}
							pagination={{ limit: 10 }}
						/>
						<p className="pt-4 pb-2">And, here are the rankings for Group 2 (Without Micro-Credentials):</p>
						<Grid
							columns={["Time Duration Value", "Rank"]}
							data={rankedGroups[1].map(({ value, rank }) => [value, rank])}
							pagination={{ limit: 10 }}
						/>
					</div>
					<div>
						<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Step 2: Calculate the U-Statistics </h4>
						<p className="py-2">To calculate the final U-Statistic, we need these values: </p>
						<ul className="list-disc ml-8 py-2">
							<li>
								<strong>n₀</strong> : Length of the first group
							</li>
							<li>
								<strong>n₁</strong> : Length of the second group
							</li>
							<li>
								<strong>R₀</strong> : Rank sum of the first group
							</li>
							<li>
								<strong>R₁</strong> : Rank sum of the second group
							</li>
							<li>
								<strong>U₀</strong> : U-Statistic of the first group
							</li>
							<li>
								<strong>U₁</strong> : U-Statistic of the second group
							</li>
						</ul>
						<p className="py-2">
							We already have the values for <strong>n₀</strong> which is <strong>{observed[0].length}</strong> and <strong>n₁</strong> which is{" "}
							<strong>{observed[1].length}</strong>
							{". "}
						</p>
						<p className="py-2">
							For <strong>R₀</strong>, we can sum up the ranks of the first group which is: {rankedGroups[0].map(({ rank }) => rank).join(" + ")} ={" "}
							<strong>{rankSumGroup0}</strong>
						</p>
						<p className="py-2">
							And for <strong>R₁</strong>, we can sum up the ranks of the second group which is:
							{rankedGroups[1].map(({ rank }) => rank).join(" + ")} = <strong>{rankSumGroup1}</strong>
						</p>
						<p className="py-2">In order to get the U-Statistics of each group, we will apply this formula below:</p>
						<div className="pt-5 pb-7 text-center">
							<MathJax>{`\\( U_i = R_i - \\frac{n_i(n_i + 1)}{2} \\)`}</MathJax>
						</div>
						<div>
							<p className="py-2">
								Let's apply this formula to both of <strong>U₀</strong> and <strong>U₁</strong> side by side:
							</p>
							<div className="flex gap-8 justify-center py-5">
								<div className="border-r-2 pr-5">
									<div className="pt-3 pb-5">
										<MathJax>{`\\( U_0 = R_0 - \\frac{n_0(n_0 + 1)}{2} \\)`}</MathJax>
									</div>
									<div className="pt-3 pb-5">
										<MathJax>{`\\( U_0 = ${rankSumGroup0} - \\frac{${n0}(${n0} + 1)}{2} \\)`}</MathJax>
									</div>
									<div className="pt-3 pb-5">
										<MathJax>{`\\( U_0 = ${u0} \\)`}</MathJax>
									</div>
								</div>
								<div>
									<div className="pt-3 pb-5">
										<MathJax>{`\\( U_1 = R_1 - \\frac{n_1(n_1 + 1)}{2} \\)`}</MathJax>
									</div>
									<div className="pt-3 pb-5">
										<MathJax>{`\\( U_1 = ${rankSumGroup1} - \\frac{${n1}(${n1} + 1)}{2} \\)`}</MathJax>
									</div>
									<div className="pt-3 pb-5">
										<MathJax>{`\\( U_1 = ${u1} \\)`}</MathJax>
									</div>
								</div>
							</div>
						</div>
						<div>
							Now, the final <strong>U</strong> (U-statistic) is the smaller of <strong>U₀</strong> and <strong>U₁</strong> which is{" "}
							<strong>{uStat}</strong>.
						</div>
					</div>
					<div>
						<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Step 3: Calculate the Expected U-Statistic </h4>
						<p className="py-2">
							The <strong>Expected U</strong> Value is calculated by this formula below:
						</p>
						<div className="flex justify-center py-2">
							<div>
								<div className="pt-2 pb-4">
									<MathJax>{`\\( U_e = \\frac{n_0 \\times n_1}{2} \\)`}</MathJax>
								</div>
								<div className="pt-2 pb-4">
									<MathJax>{`\\( U_e = \\frac{${n0} \\times ${n1}}{2} \\)`}</MathJax>
								</div>
								<div className="pt-2 pb-4">
									<MathJax>{`\\( U_e = ${expectedU} \\)`}</MathJax>
								</div>
							</div>
						</div>
					</div>
					<div>
						<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Step 4: Calculate the Standard Error </h4>
						<p className="py-2">
							The <strong>Standard Error</strong> of the U-Statistic is calculated by this formula below:
						</p>
						<div className="flex justify-center py-4">
							<div>
								<div className="py-1">
									<MathJax>{`\\[ \\sigma_U = \\sqrt{\\frac{n_0 \\times n_1 (n_0 + n_1 + 1)}{12}} \\]`}</MathJax>
								</div>
								<div className="py-1">
									<MathJax>{`\\[ \\sigma_U = \\sqrt{\\frac{${n0} \\times ${n1} (${n0} + ${n1} + 1)}{12}} \\]`}</MathJax>
								</div>
								<div className="py-1">
									<MathJax>{`\\[ \\sigma_U = ${standardErrorOfU} \\]`}</MathJax>
								</div>
							</div>
						</div>
					</div>
					<div>
						<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Step 5: Compute the Z-Statistic </h4>
						<p className="py-2">
							The <strong>Z-Statistic</strong> is calculated by this formula below:
						</p>
						<div className="flex justify-center py-4">
							<div>
								<div className="py-1">
									<MathJax>{`\\[ Z = {\\frac{U - U_e}{\\sigma_U}} \\]`}</MathJax>
								</div>
								<div className="py-1">
									<MathJax>{`\\[ Z = {\\frac{${uStat} - ${expectedU}}{${standardErrorOfU}}} \\]`}</MathJax>
								</div>
								<div className="py-1">
									<MathJax>{`\\[ Z = ${z} \\]`}</MathJax>
								</div>
							</div>
						</div>
					</div>
					<div>
						<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Step 6: Obtain the p-value </h4>
						<p className="py-2">
							Using the <strong>Z</strong> (Z-statistic) value, the p-value can be found from a standard normal distribution table or a statistical
							software. For this test we will use a node module (statistical software) called{" "}
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
							, upon providing the <strong>Z</strong> value as <strong>{z}</strong>, we get:
							<br />
							<strong className="block py-2 text-center">p-value: {p.toFixed(52)}</strong>
						</p>
					</div>

					<div>
						<h4 className="font-semibold text-xl pt-8 pb-4 text-center">Conclusion </h4>
						<p className="py-2">
							Based on the calculated <strong>p-value</strong>, we <strong>{p < 0.05 ? "reject" : "fail to reject"}</strong> the null hypothesis at a
							5% significance level. This indicates that there {p < 0.05 ? "is a significant difference" : "is no significant difference"} in the time
							taken to secure a job between IT graduates with micro-credentials and those without micro-credentials.
						</p>
						<p className="py-2">
							So, we conclude that{" "}
							<strong>
								IT graduates with micro-credentials {p < 0.05 ? "secure" : "don't secure"} jobs significantly faster than those without
								micro-credentials.
							</strong>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
