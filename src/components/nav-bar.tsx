"use client";

import INFO from "@/utils/info";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
	{ title: `Home`, href: `/` },
	{ title: `Charts`, href: `/charts` },
	{ title: `Hypothesis`, href: `/hypothesis` },
];

export function NavBar() {
	const pathname = usePathname();

	return (
		<nav className="p-5 sticky top-0 shadow bg-background z-10">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<h3 className="font-semibold text-xl">
					<Link href="/">{INFO.brand.name}</Link>
				</h3>
				<ul className="flex items-center gap-5">
					{menuItems.map((item) => {
						return (
							<li key={item.href}>
								<Link href={item.href} className={`${pathname === item.href ? "text-[#999]" : "hover:text-[#999]"}`}>
									{item.title}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}
