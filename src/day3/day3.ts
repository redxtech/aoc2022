import { getInputLines, reducerSum } from "../utils.ts"

const getCompartments = (rucksacks: string[]): string[][] => {
	return rucksacks.map(rucksack => [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2, rucksack.length)])
}

const getPriority = (char: string): number => {
	const charCode = char.charCodeAt(0)
	return charCode >= 97
		? charCode - 96
		: charCode - 38
}

const getPriorities = (rucksacks: string[][]): number[][][] => {
	return rucksacks.map(rucksack => rucksack.map(compartment => compartment.split('').map(char => getPriority(char))))
}

const findDupeItem = (compartments: number[][]): number => {
	for (const item of compartments[0]) {
		if (compartments[1].includes(item)) {
			return item
		}
	}
	return 0
}

const getAllDupes = (rucksacks: number[][][]): number[] => {
	return rucksacks.map(rucksack => findDupeItem(rucksack))
}

const getDupesSum = (rucksacks: number[]): number => rucksacks.reduce(reducerSum)

export const day3 = () => {
	const input = getInputLines(3)
	const rucksacks = getCompartments(input)
	const priorities = getPriorities(rucksacks)
	const dupes = getAllDupes(priorities)
	const total = getDupesSum(dupes)
	console.log(`Sum of Priorities: ${total}`)
}

day3()

