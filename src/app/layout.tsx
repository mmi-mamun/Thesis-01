// import "@/hypothesis"; // running the hypothesis files upon visiting website

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import INFO from "@/utils/info";
import { NavBar } from "@/components/nav-bar";
import PageLayout from "@/components/layout";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: INFO.brand.name,
	description: `Data Visualization and Statistical Analysis for Research on Micro-Credentials and Employability`,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<PageLayout>
					<NavBar />
					{children}
				</PageLayout>
			</body>
		</html>
	);
}
