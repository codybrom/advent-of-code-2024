import { Day, Solve } from "@mikehw/advent-of-code";
import { assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2024,
  day: 1,
  part1: (input: string): string => {
    // Split the input into lines
    const lines = input.split("\n");

    // Parse the left and right numbers from each line
    const listLeft = lines.map((line) => parseInt(line.split("   ")[0]));
    const listRight = lines.map((line) => parseInt(line.split("   ")[1]));

    // Sort both lists in ascending order
    const sortedLeft = [...listLeft].sort((a, b) => a - b);
    const sortedRight = [...listRight].sort((a, b) => a - b);

    // Calculate the total distance between corresponding numbers
    const distance = sortedLeft.reduce(
      (acc, value, index) => acc + Math.abs(value - sortedRight[index]),
      0
    );

    return distance.toString();
  },
  part2: (input: string): string => {
    // Split the input into lines
    const lines = input.split("\n");

    // Parse the left and right numbers from each line
    const listLeft = lines.map((line) => parseInt(line.split("   ")[0]));
    const listRight = lines.map((line) => parseInt(line.split("   ")[1]));

    // Count occurrences of numbers in the right list
    const rightOccurrences = new Map<number, number>();
    for (const num of listRight) {
      rightOccurrences.set(num, (rightOccurrences.get(num) || 0) + 1);
    }

    // Calculate the similarity score
    const similarityScore = listLeft.reduce((total, num) => {
      return total + num * (rightOccurrences.get(num) || 0);
    }, 0);

    return similarityScore.toString();
  },
};

Deno.test("2024/day-1/part-1", async () => {
  const input = `3   4\n4   3\n2   5\n1   3\n3   9\n3   3`;
  assertEquals(await puzzle.part1(input), "11");
});

Deno.test("2024/day-1/part-2", async () => {
  const input = `3   4\n4   3\n2   5\n1   3\n3   9\n3   3`;
  if (puzzle.part2) {
    assertEquals(await puzzle.part2(input), "31");
  }
});

// Run the puzzle if this is the main module
if (import.meta.main) {
  await Solve(puzzle);
}
