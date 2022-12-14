import { getInputLines, reducerSum } from "../utils.ts"

enum RPS {
	ROCK = 1,
	PAPER,
	SCISSORS
}

type ELF_RPS = 'A' | 'B' | 'C'
type ME_RPS = 'X' | 'Y' | 'Z'

const getChoice = (choice: ELF_RPS | ME_RPS): RPS => {
	switch (choice) {
		case 'A':
		case 'X':
			return RPS.ROCK
		case 'B':
		case 'Y':
			return RPS.PAPER
		case 'C':
		case 'Z':
			return RPS.SCISSORS
	}
}

const getChoices = (elf: ELF_RPS, me: ME_RPS): Record<string, RPS> => {
	return {
		elf: getChoice(elf),
		me: getChoice(me)
	}
}

const didIWin = (elf: RPS, me: RPS): boolean => {
	if (me === RPS.SCISSORS && elf == RPS.ROCK) {
		return false
	} else if (me > elf || (me === RPS.ROCK && elf === RPS.SCISSORS)) {
		return true
	} else {
		return false
	}
}

const getScore = (elf: RPS, me: RPS): number => {
	return me + (
		elf === me
			? 3 
			: didIWin(elf, me) ? 6 : 0
	)
}

const getGames = (games: string[]): RPS[][] => {
	const convertedGames = []
	const allGames = games.filter(l => l.length !== 0)

	for (const game of allGames) {
		const choices = game.split(' ')
		const elfChoice = choices[0] as ELF_RPS
		const myChoice = choices[1] as ME_RPS

		const { elf, me } = getChoices(elfChoice, myChoice)
		convertedGames.push([elf, me])
	}

	return convertedGames
}

const getScores = (games: RPS[][]): number[] => {
	return games.map(game => getScore(game[0], game[1]))
}

const getTotalScore = (scores: number[]): number => scores.reduce(reducerSum)

export const dayTwo = () => {
	const input = getInputLines(2)
	const games = getGames(input)
	const scores = getScores(games)
	const score = getTotalScore(scores)

	console.log(`Total Score: ${score}`)
}

dayTwo()

