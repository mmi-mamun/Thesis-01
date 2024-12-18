"use client";

import { DataProvider } from "@/contexts/data-context";
import { MathJaxContext } from "better-react-mathjax";
import { useEffect, useState } from "react";

export default function PageLayout({ children }: React.PropsWithChildren) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	return (
		<>
			<MathJaxContext>
				<DataProvider>{children}</DataProvider>
			</MathJaxContext>
		</>
	);
}
