import { useDataContext } from "@/contexts/data-context";
import { extractHypothesisData } from "@/utils/hypothesis";

export default function Hypothesis2() {
	const { itGraduatesTable } = useDataContext();

	// Extract hypothesis data
	const { expectedU, n0, n1, p, rankSumGroup0, rankSumGroup1, standardErrorOfU, u0, u1, uStat, z } = extractHypothesisData(
		itGraduatesTable as any
	).hypothesis2();

	return (
		<div className="p-6 max-w-5xl mx-auto">
			<h1 className="text-2xl font-bold text-center mb-6">Hypothesis 2: Time to Secure a Job with Micro-Credentials</h1>

			{/* Hypothesis Introduction */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold">Hypothesis Statement</h2>
				<div>
					<h4 className="pt-3 pb-1">
						<strong>Null Hypothesis (H₀):</strong>
					</h4>{" "}
					There is no significant difference in the time taken to secure a job between IT graduates with micro-credentials and those without them.
					<br />
					<h4 className="pt-3 pb-1">
						<strong>Alternative Hypothesis (H₁):</strong>
					</h4>{" "}
					IT graduates with micro-credentials secure jobs significantly faster than those without them.
				</div>
			</section>

			{/* Visualization */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold">Rank Sum of Both Groups</h2>
				<p className="text-sm text-gray-600 mb-4">The rank sums of both groups (with and without micro-credentials) are shown below.</p>
				<div className="mb-4">
					<strong>Group 0 (Without micro-credentials):</strong> Rank Sum = <code>{rankSumGroup0}</code>
				</div>
				<div className="mb-4">
					<strong>Group 1 (With micro-credentials):</strong> Rank Sum = <code>{rankSumGroup1}</code>
				</div>
			</section>

			{/* Detailed Calculations */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold">Step-by-Step Calculations</h2>
				<ol className="list-decimal pl-6">
					{/* 1. Number of Individuals in Each Group */}
					<li className="mb-4">
						<strong>Number of Individuals in Group 0 (n₀):</strong> There are <code>{n0}</code> individuals in the group without micro-credentials.
					</li>
					<li className="mb-4">
						<strong>Number of Individuals in Group 1 (n₁):</strong> There are <code>{n1}</code> individuals in the group with micro-credentials.
					</li>

					{/* 2. Expected U Value */}
					<li className="mb-4">
						<strong>Expected U Value (Uᵉ):</strong> The expected value of the U statistic under the null hypothesis is <code>{expectedU}</code>.
					</li>

					{/* 3. U Stat Calculation */}
					<li className="mb-4">
						<strong>U Statistic (U):</strong> The U statistic is calculated by comparing the rank sums of the two groups. For the given data:
						<br />U = min(U₀, U₁) = min(<code>{u0}</code>, <code>{u1}</code>) = <code>{uStat}</code>
					</li>

					{/* 4. Standard Error of U */}
					<li className="mb-4">
						<strong>Standard Error of U (σₓᵤ):</strong> The standard error of the U statistic is <code>{standardErrorOfU}</code>.
					</li>

					{/* 5. Z-Statistic */}
					<li className="mb-4">
						<strong>Z-Statistic (Z):</strong> The Z-statistic is used to determine how far the observed U statistic is from the expected U, in terms
						of standard deviations:
						<br />Z = (Uᵉ - U) / σₓᵤ = ({expectedU} - {uStat}) / {standardErrorOfU} = <code>{z.toFixed(2)}</code>
					</li>

					{/* 6. p-Value */}
					<li className="mb-4">
						<strong>p-Value:</strong> The p-value represents the probability of obtaining a result as extreme as the observed result, assuming the
						null hypothesis is true. For the calculated Z-value of <code>{z.toFixed(2)}</code>, the p-value is <code>{p.toFixed(15)}</code>.
					</li>
				</ol>
			</section>

			{/* Conclusion */}
			<section>
				<h2 className="text-lg font-semibold">Conclusion</h2>
				<p>
					Based on the calculated p-value (<code>{p.toFixed(15)}</code>), we
					{p < 0.05 ? <span className="text-green-600 font-bold"> reject </span> : <span className="text-red-600 font-bold"> fail to reject </span>}
					the null hypothesis at a 5% significance level. This indicates that IT graduates with micro-credentials{" "}
					{p < 0.05 ? "secure jobs significantly faster" : "do not secure jobs significantly faster"} compared to those without them.
				</p>
			</section>
		</div>
	);
}
