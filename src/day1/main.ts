const readFile = async (): Promise<Array<string>> => {
	return (await Deno.readTextFile(Deno.cwd() + '/src/day1/input.txt')).split('\n')
}

const splitFile = (lines: Array<string>): Array<Array<string>> => {
	const elves: Array<Array<string>> = []
	let currentElf: Array<string> = []

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

const getElfTotals = (elves: Array<Array<string>>): Array<number> => {
	return elves.map((elf: Array<string>): number => {
		return elf.map(e => parseInt(e))
		.reduce((sum, val) => {
			return sum + val
		})
	})
}

const findTopElf = (elves: Array<number>): number => {
	return elves.reduce((max, curr) => Math.max(max, curr))
}

const main = async () => {
	const input = await readFile()
	const rawElfData = splitFile(input)
	const totalElfData = getElfTotals(rawElfData)
	const topElf = findTopElf(totalElfData)

	console.log(`Solution: ${topElf}`)
}

main()

