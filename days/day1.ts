// ./.inputs/day1.txt contains two columns of numbers
// ex. 61967   56543
// extract the numbers into two lists

export async function day1() {
  const data = await Deno.readTextFile("./.inputs/day1.txt");
  const lines = data.split("\n");

  const listLeft = lines.map((line) => parseInt(line.split("   ")[0]));
  const listRight = lines.map((line) => parseInt(line.split("   ")[1]));

  // sort the lists smallest to largest
  const sortedLeft = listLeft.sort((a, b) => a - b);
  const sortedRight = listRight.sort((a, b) => a - b);

  // measure the distance between two lists at each index
  const distance = sortedLeft.map((value, index) =>
    Math.abs(value - sortedRight[index])
  );

  // add all the distances
  const totalDistance = distance.reduce((acc, value) => acc + value, 0);

  return totalDistance;
}
