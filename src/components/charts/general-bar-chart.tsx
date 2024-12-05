import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";

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

export function GeneralBarChart({ data, dataKey, title }: Props) {
	return (
		<ResponsiveContainer width={"100%"} height={"100%"}>
			<BarChart
				width={600}
				height={400}
				data={data}
				margin={{
					top: 30,
					right: 15,
				}}
			>
				<XAxis
					dataKey={dataKey.x}
					tickFormatter={(value) => {
						const words = value?.split(" ").filter((v: string) => !!v) || [];
						return words.length === 0 ? `N/A` : words.length === 1 ? words[0] : words.map((w: string) => `${w[0]}.`).join("");
					}}
					/* label={{ value: title.x, position: "bottom" }} */
				/>
				<YAxis dataKey={dataKey.y} /* label={{ value: title.y, angle: -90, position: "left", offset: -8 }} */ />
				<Tooltip
					contentStyle={{ backgroundColor: "#232323" }}
					cursor={false}
					content={(data) => {
						const values = data.payload?.[0]?.payload || {};
						return (
							<div className="p-5 py-4 bg-[#ccc] shadow rounded-lg">
								<div>
									{/* {title.x}: */}
									{values[dataKey.x]}
								</div>
								<div>
									{/* {title.y}: */}
									{values[dataKey.y]}
								</div>
							</div>
						);
					}}
				/>
				<Bar dataKey={dataKey.y} label={{ position: "top" }} fill="#5555ff" activeBar={<Rectangle stroke={"#444"} />}>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={`${entry.color}`} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}
