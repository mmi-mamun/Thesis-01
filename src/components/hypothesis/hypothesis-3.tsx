import { useDataContext } from "@/contexts/data-context";
import { extractHypothesisData } from "@/utils/hypothesis";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Hypothesis3() {
	const { recruitersTable } = useDataContext();

	// Extract data
	const { ratings, populationMean, sumOfRatings, n, sampleMean, stdDev, tStatistic, pValue } = extractHypothesisData(
		undefined,
		recruitersTable as any
	).hypothesis3();

	// Calculate rating counts for the bar chart
	const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
		rating,
		count: ratings.filter((r) => r === rating).length,
	}));

	return (
		<div className="p-6 max-w-5xl mx-auto">
			<h1 className="text-2xl font-bold text-center mb-6">Hypothesis 3: Perception of Micro-Credentials by Recruiters</h1>

			{/* Introduction */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold">Hypothesis Statement</h2>
				<div>
					<h4 className="pt-3 pb-1">
						<strong>Null Hypothesis (H₀):</strong>
					</h4>{" "}
					Recruiters do not perceive micro-credentials as valuable (average importance rating ≤ 3). <br />
					<h4 className="pt-3 pb-1">
						<strong>Alternative Hypothesis (H₁):</strong>
					</h4>{" "}
					Recruiters perceive micro-credentials as valuable (average importance rating {">"} 3).
				</div>
				<p className="mt-3 text-sm">
					In this analysis, we are using a <strong>One-Sample t-Test</strong> to test the difference between the average rating of recruiters'
					perception and the neutral value of {populationMean} (the population mean). The null hypothesis suggests that recruiters do not find
					micro-credentials valuable, while the alternative hypothesis suggests they do.
				</p>
			</section>

			{/* Visualization */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold">Ratings Distribution</h2>
				<p className="text-sm text-gray-600 mb-4">The bar chart below shows the frequency distribution of recruiter ratings (1–5 scale).</p>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={ratingCounts}>
						<XAxis dataKey="rating" />
						<YAxis allowDecimals={false} />
						<Tooltip />
						<Bar dataKey="count" fill="#4f46e5" />
					</BarChart>
				</ResponsiveContainer>
			</section>

			{/* Detailed Calculations */}
			<section className="mb-8">
				<h2 className="text-lg font-semibold">Step-by-Step Calculations</h2>
				<ol className="list-decimal pl-6">
					{/* 1. Population Mean */}
					<li className="mb-4">
						<strong>Population Mean (μ):</strong> The population mean is the neutral value of ratings on a 5-point Likert scale, which is assumed to
						be <code>{populationMean}</code> (value of 3). This represents the average rating that is considered "neutral" or "no opinion."
					</li>

					{/* 2. Sum of Ratings */}
					<li className="mb-4">
						<strong>Sum of Ratings (Σx):</strong> To find the sum of all ratings, we simply add up all the individual ratings given by recruiters.
						This gives us <code>{sumOfRatings}</code>.
						<br />
					</li>

					{/* 3. Sample Size */}
					<li className="mb-4">
						<strong>Sample Size (n):</strong> The sample size represents the total number of ratings collected from recruiters. In this case, the
						sample size is <code>{n}</code>. This number is important because it determines the reliability of our results.
					</li>

					{/* 4. Sample Mean */}
					<li className="mb-4">
						<strong>Sample Mean (x̄):</strong> The sample mean is the average of all ratings given by recruiters, calculated as:
						<br />
						<code>
							x̄ = Σx / n = {sumOfRatings} / {n} = {sampleMean.toFixed(2)}
						</code>
						.
						<br />
						By dividing the sum of ratings by the sample size, we obtain the average rating of the recruiters in our sample.
					</li>

					{/* 5. Standard Deviation */}
					<li className="mb-4">
						<strong>Standard Deviation (σ):</strong> The standard deviation measures the spread or variability of the ratings. A high standard
						deviation means the ratings are spread out widely, while a low standard deviation means most ratings are clustered around the mean. It is
						calculated as:
						<br />
						<code>σ = √[Σ(xᵢ - x̄)² / (n - 1)]</code>
						<br />
						Substituting values: σ = <code>{stdDev.toFixed(2)}</code>. This value tells us how much variability there is around the sample mean.
					</li>

					{/* 6. t-Statistic */}
					<li className="mb-4">
						<strong>t-Statistic (t):</strong> The t-statistic is used to compare the sample mean to the population mean (3) and adjust for the sample
						size. It’s calculated as:
						<br />
						<code>t = (x̄ - μ) / (σ / √n)</code>
						<br />
						Substituting values: t = ({sampleMean.toFixed(2)} - {populationMean}) / ({stdDev.toFixed(2)} / √{n}) ={" "}
						<code>{tStatistic.toFixed(2)}</code>
						<br />
						This t-statistic measures the difference between the sample mean and population mean, adjusted for the variability and size of the sample.
					</li>

					{/* 7. p-Value */}
					<li className="mb-4">
						<strong>p-Value:</strong> The p-value tells us the probability of observing the data (or something more extreme) if the null hypothesis is
						true. If the p-value is less than 0.05, it suggests that the result is statistically significant, and we can reject the null hypothesis.
						In our case:
						<br />
						<code>p-value = {pValue.toFixed(4)}</code>
						<br />A p-value below 0.05 indicates that the observed sample mean is significantly different from the population mean of 3, meaning
						recruiters perceive micro-credentials as valuable.
					</li>
				</ol>
			</section>

			{/* Conclusion */}
			<section>
				<h2 className="text-lg font-semibold">Conclusion</h2>
				<p>
					Based on the calculated p-value (<code>{pValue.toFixed(4)}</code>), we
					{pValue < 0.05 ? (
						<span className="text-green-600 font-bold"> reject </span>
					) : (
						<span className="text-red-600 font-bold"> fail to reject </span>
					)}
					the null hypothesis at a 5% significance level. This indicates that job recruiters {pValue < 0.05 ? "perceive" : "do not perceive"}{" "}
					micro-credentials as valuable.
				</p>
			</section>
		</div>
	);
}
