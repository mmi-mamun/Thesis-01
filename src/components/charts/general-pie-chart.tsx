import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type Props = {
	data: Array<{ [key: string]: number | string }>;
	dataKey: {
		x: string;
		y: string;
	};
	title: {
		x: string;
		y: string;
	};
};

const RADIAN = Math.PI / 180;

export function GeneralPieChart({ data, dataKey, title }: Props) {
	return (
		<ResponsiveContainer width={"100%"} height={"100%"}>
			<PieChart width={400} height={400}>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					outerRadius="60%"
					label={({ cx, cy, midAngle, outerRadius, percent }) => {
						const radius = outerRadius * 1.2;
						const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
						const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

						return (
							<text x={x} y={y} fill="#333" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
								{(percent * 100).toFixed(2) + "%"}
							</text>
						);
					}}
					dataKey={dataKey.y}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={`${entry.color}`} />
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
}
