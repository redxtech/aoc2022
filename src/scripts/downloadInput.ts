#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write --allow-net

import { config } from "https://deno.land/std@0.167.0/dotenv/mod.ts";

const envData = await config();
const cookie = envData["AOC_COOKIE"];

const YEAR = 2022
const COOKIE = Deno.env.get("AOC_COOKIE") || cookie
const defaulDay = new Date().getDate()
const [dayArg, directoryName] = Deno.args
const DAY = (dayArg ?? String(defaulDay)).padStart(2, '0')

console.log("Fetching the puzzle input for day: " + DAY)
const resp = await fetch(`https://adventofcode.com/${YEAR}/day/${DAY}/input`, {
  headers: {
    cookie: `session=${COOKIE}`,
  }
})
const input = await resp.text()

const dir = directoryName ?? `src/day${DAY}`
const destination = `./${dir}/input`

console.log("Writing the puzzle input to: " + destination)
Deno.writeTextFileSync(destination, input)
