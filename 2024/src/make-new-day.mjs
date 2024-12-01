import { DateTime } from "luxon";
import { mkdir, copyFile, writeFile, constants } from "fs/promises";
import * as dotenv from "dotenv";

dotenv.config();

async function go() {
  // eastern TZ because the new puzzle goes live at 11pm central
  const now = DateTime.local({ zone: `America/New_York` });
  await mkdir(`./2023/src/${now.day}`);
  await mkdir(`./2023/inputs/${now.day}`);
  await copyFile(
    `./2023/src/template.mjs`,
    `./2023/src/${now.day}/part1.mjs`,
    constants.COPYFILE_EXCL,
  );
  await copyFile(
    `./2023/src/template.mjs`,
    `./2023/src/${now.day}/part2.mjs`,
    constants.COPYFILE_EXCL,
  );
  const resp = await fetch(
    `https://adventofcode.com/2024/day/${now.day}/input`,
    {
      headers: {
        cookie: `session=${process.env.AOC_SESSION}`,
      },
    },
  );
  const input = await resp.text();
  await writeFile(`./2024/inputs/${now.day}/input.txt`, input);
  await writeFile(`./2024/inputs/${now.day}/input-test.txt`, ``);
}

go();
