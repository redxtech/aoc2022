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

const getPrioritySum = (rucksacks: number[]): number => rucksacks.reduce(reducerSum)

const getElfGroups = (elves: string[]): string[][] => {
	const groups = []
	let currentGroup = []

	for (const elf of elves) {
		currentGroup.push(elf)

		if (currentGroup.length >= 3) {
			groups.push(currentGroup)
			currentGroup = []
		}
	}

	return groups
}

const getGroupBadges = (groups: string[][]): string[] => {
	return groups.map(group => {
		for (const char of group[0]) {
			if (group[1].includes(char) && group[2].includes(char)) {
				return char
			}
		}

		return groups[0][0]
	})
}

export const day3 = () => {
	const input = getInputLines(3)

	const rucksacks = getCompartments(input)
	const priorities = getPriorities(rucksacks)
	const dupes = getAllDupes(priorities)
	const dupesPriority = getPrioritySum(dupes)
	console.log(`Sum of Dupe Priorities: ${dupesPriority}`)

	const groups = getElfGroups(input)
	const badges = getGroupBadges(groups)
	const badgesPriority = getPrioritySum(badges.map(badge => getPriority(badge)))
	console.log(`Sum of Badge Priorities: ${badgesPriority}`)
}

day3()

