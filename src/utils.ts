export const getInput = (day: number): string => {
	const inputPath = `${Deno.cwd()}/src/day${day.toString()}/input`

	return Deno.readTextFileSync(inputPath)
}

export const getInputLines = (day: number): string[] => {
	return getInput(day).split('\n')
}
