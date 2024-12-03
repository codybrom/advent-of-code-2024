import { Day, Solve } from "@mikehw/advent-of-code";
import { assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2024,
  day: 2,
  part1: (input: string): number => {
    let answer = 0;

    // Each line is a report
    const lines = input.split("\n");

    // Each report is a list of numbers called levels
    const reports = lines.map((line) => line.split(" ").map(Number));

    // Check if each report is safe
    for (const report of reports) {
      if (isSafe(report)) {
        // If it is, increment the answer
        answer++;
        continue;
      }
    }

    return answer;
  },
  part2: (input: string): number => {
    let answer = 0;
    const lines = input.split("\n");
    const reports = lines.map((line) => line.split(" ").map(Number));

    for (const report of reports) {
      if (isSafe(report)) {
        answer++;
        continue;
      }

      // Try removing each number to see if it makes the report safe
      for (let i = 0; i < report.length; i++) {
        const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];
        if (isSafe(modifiedReport)) {
          answer++;
          break;
        }
      }
    }
    return answer;
  },
};

const isSafe = (rep: number[]): boolean => {
  // Are all levels increasing?
  const increasing = rep.every(
    (level, index) => index === 0 || level > rep[index - 1]
  );

  // Are all levels decreasing?
  const decreasing = rep.every(
    (level, index) => index === 0 || level < rep[index - 1]
  );

  // Do any adjacent levels differ by at least 1 and at most 3?
  const adjacent = rep.every(
    (level, index) => index === 0 || Math.abs(level - rep[index - 1]) <= 3
  );
  return (increasing || decreasing) && adjacent;
};

const example = `7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9`;

Deno.test("2024/day-2/part-1", async () => {
  assertEquals(await puzzle.part1(example), 2);
});

Deno.test("2024/day-2/part-2", async () => {
  assertEquals(await puzzle.part2?.(example), 4);
});

if (import.meta.main) {
  await Solve(puzzle);
}
