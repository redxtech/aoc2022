import { getInputLines } from "../utils.ts"

const getRange = (elf: string): number[] => {
	const [start, end] = elf.split('-').map(n => parseInt(n))
	return [ start, end ]
}

const getPairRanges = (pairs: string[]): number[][][] => {
	return pairs.map(str => str.split(',').map(elf => getRange(elf)))
}

const isRangeContainedBy = (first: number[], second: number[]) => {
	if (first[0] >= second[0] && first[1] <= second[1]) {
		return true
	} else if (second[0] >= first[0] && second[1] <= first[1]) {
		return true
	}

	return false
}

const getContainedCount = (pairs: number[][][]): number => {
	return pairs.map(pair => isRangeContainedBy(pair[0], pair[1])).filter(p => p).length
}

export const day4 = () => {
	const input = getInputLines(4).filter(l => l.length !== 0)
	const elfPairs = getPairRanges(input)

	const containedCount = getContainedCount(elfPairs)

	console.log(`Total fully contained: ${containedCount}`)
}

day4()

