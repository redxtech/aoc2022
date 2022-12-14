#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write --allow-net

const defaulDay = new Date().getDate()
const [dayArg, directoryName] = Deno.args
const DAY = (dayArg ?? String(defaulDay)).padStart(2, '0')
const day = parseInt(DAY).toString()
const dir = directoryName ?? `./src/day${DAY}`
const dayFile = `${dir}/day${DAY}.ts`

console.log('Creating folder for day: ' + DAY)
Deno.mkdirSync(dir)

console.log('Writing the boilerplate file to: ' + dayFile)
Deno.writeTextFileSync(dayFile, [
	'import { getInputLines } from \'../utils.ts\'\n',
	`export const day${DAY} = () => {`,
	`\tconst input = getInputLines(${day})\n`,
	'\tconsole.log(input)',
	'}\n',
	`day${DAY}()\n`
].join('\n'))

