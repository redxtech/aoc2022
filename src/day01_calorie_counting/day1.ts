import { getInputLines, reducerSum } from "../utils.ts"

const splitFile = (lines: string[]): string[][] => {
	const elves: string[][] = []
	let currentElf: string[] = []

	lines.forEach(line => {
		if (line === '') {
			elves.push(currentElf)
			currentElf = []
		} else {
			currentElf.push(line)
		}
	})

	return elves
}

const getElfTotals = (elves: string[][]): Array<number> => {
	return elves.map((elf: string[]): number => {
		return elf.map(e => parseInt(e))
		.reduce(reducerSum)
	})
}

const findTopElf = (elves: number[]): number => {
	return elves.reduce((max, curr) => Math.max(max, curr))
}

const findTopThreeElves = (elves: number[]): number => {
	const top: number[] = []

	elves.forEach(elf => {
		top.sort((a, b) => a - b).reverse()
		if (top.length < 3) {
			top.push(elf)
		} else {
			if (elf > top[2]) {
				top.pop()
				top.push(elf)
			}
		}
	})

	return top.reduce(reducerSum)
}

export const dayOne = () => {
	const input = getInputLines(1)
	const rawElfData = splitFile(input)
	const totalElfData = getElfTotals(rawElfData)

	const topElf = findTopElf(totalElfData)
	console.log(`Day 1 Pt. 1 Solution: ${topElf}`)

	const topThreeElves = findTopThreeElves(totalElfData)
	console.log(`Day 1 Pt. 2 Solution: ${topThreeElves}`)
}

dayOne()

