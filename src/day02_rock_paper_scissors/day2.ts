import { getInputLines, reducerSum } from "../utils.ts"

enum RPS {
	ROCK = 1,
	PAPER,
	SCISSORS
}

enum OUTCOME {
	LOSE = 'X',
	DRAW = 'Y',
	WIN = 'Z'
}

type ELF_RPS = 'A' | 'B' | 'C'
type ME_RPS = 'X' | 'Y' | 'Z'
type OUTCOME_CODE = ME_RPS

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

const getRequiredChoice = (elf: ELF_RPS, outcome: OUTCOME_CODE): RPS => {
	if (outcome === OUTCOME.WIN) {
		switch (getChoice(elf)) {
			case RPS.ROCK:
				return RPS.PAPER
			case RPS.PAPER:
				return RPS.SCISSORS
			case RPS.SCISSORS:
				return RPS.ROCK
		}
	} else if (outcome === OUTCOME.LOSE) {
		switch (getChoice(elf)) {
			case RPS.ROCK:
				return RPS.SCISSORS
			case RPS.PAPER:
				return RPS.ROCK
			case RPS.SCISSORS:
				return RPS.PAPER
		}
	} else {
		return getChoice(elf)
	}
}

const getGamesV2 = (games: string[]): Array<Array<ELF_RPS | OUTCOME>> => {
	const convertedGames = []
	const allGames = games.filter(l => l.length !== 0)

	for (const game of allGames) {
		const choices = game.split(' ')
		const elf = choices[0] as ELF_RPS
		const outcome = choices[1] as OUTCOME

		convertedGames.push([elf, outcome])
	}

	return convertedGames
}

const getScoreV2 = (elfChoice: ELF_RPS, outcome: OUTCOME_CODE): number => {
	let score: number = getRequiredChoice(elfChoice, outcome)

	if (outcome === OUTCOME.WIN) {
		score += 6
	} else if (outcome === OUTCOME.DRAW) {
		score += 3
	}

	return score
}

const getScoresV2 = (games: Array<Array<ELF_RPS | OUTCOME>>): number[] => {
	return games.map(game => getScoreV2(game[0] as ELF_RPS, game[1] as OUTCOME))
}

export const dayTwo = () => {
	const input = getInputLines(2)

	const games = getGames(input)
	const scores = getScores(games)
	const score = getTotalScore(scores)
	console.log(`Total Score Pt 1: ${score}`)

	const games2 = getGamesV2(input)
	const scores2 = getScoresV2(games2)
	const score2 = getTotalScore(scores2)
	console.log(`Total Score Pt 2: ${score2}`)
}

dayTwo()

