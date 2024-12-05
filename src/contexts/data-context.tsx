"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface DataState {
	itGraduatesTable: string[][] | null;
	recruitersTable: string[][] | null;
	isLoading: boolean;
	setItGraduatesTable: (data: string[][]) => any;
	setRecruitersTable: (data: string[][]) => any;
}

const DataContext = createContext<DataState | undefined>(undefined);
const ls = {
	IT_GRADUATES: "IT_GRADUATES",
	RECRUITERS: "RECRUITERS",
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [itGraduatesTable, setItGraduatesTable] = useState<string[][] | null>(null);
	const [recruitersTable, setRecruitersTable] = useState<string[][] | null>(null);

	const wrapItGraduatesTableSetter = (data: string[][]) => {
		localStorage.setItem(ls.IT_GRADUATES, JSON.stringify(data));
		setItGraduatesTable(data);
	};
	const wrapItRecruiterTableSetter = (data: string[][]) => {
		localStorage.setItem(ls.RECRUITERS, JSON.stringify(data));
		setRecruitersTable(data);
	};

	useEffect(() => {
		const storedItGraduatesTable = JSON.parse(localStorage.getItem(ls.IT_GRADUATES) || `null`);
		const storedRecruitersTable = JSON.parse(localStorage.getItem(ls.RECRUITERS) || `null`);
		setItGraduatesTable(storedItGraduatesTable);
		setRecruitersTable(storedRecruitersTable);
		setIsLoading(false);
	}, []);

	return (
		<DataContext.Provider
			value={{
				itGraduatesTable,
				recruitersTable,
				isLoading,
				setItGraduatesTable: wrapItGraduatesTableSetter,
				setRecruitersTable: wrapItRecruiterTableSetter,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useDataContext = (): DataState => {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useDataContext must be used within an DataProvider");
	}
	return context;
};
