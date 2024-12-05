import { MouseEventHandler } from "react";

type Props = { children: React.ReactNode; className?: string; fullWidth?: boolean; onClick?: MouseEventHandler<HTMLButtonElement> };

export function Button({ children, fullWidth = false, onClick }: Props) {
	return (
		<button onClick={onClick} className={`${fullWidth ? "w-full" : ""} py-3 px-5 rounded bg-green-700 text-[#eee] font-semibold`}>
			{children}
		</button>
	);
}
