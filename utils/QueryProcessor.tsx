export default function QueryProcessor(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (q.includes("what is your andrew id") || q.includes("andrew id") || q.includes("andrewid")) {
    return "svonk";
  }

  if (q.includes("name")) {
    return "svonk";
  }

  const plusMatch = q.match(/what is (\d+) plus (\d+)\?/);
  if (plusMatch) {
    return String(Number(plusMatch[1]) + Number(plusMatch[2]));
  }

  const multiplyMatch = q.match(/what is (\d+) multiplied by (\d+)\?/);
  if (multiplyMatch) {
    return String(Number(multiplyMatch[1]) * Number(multiplyMatch[2]));
  }

  const minusMatch = q.match(/what is (\d+) minus (\d+)\?/);
  if (minusMatch) {
    return String(Number(minusMatch[1]) - Number(minusMatch[2]));
  }

  const largestMatch = q.match(/which of the following numbers is the largest[:\s]+([\d,\s]+)\?/);
  if (largestMatch) {
    const numbers = largestMatch[1].split(",").map((n) => Number(n.trim()));
    return String(Math.max(...numbers));
  }

  const squareAndCubeMatch = q.match(/which of the following numbers is both a square and a cube[:\s]+([\d,\s]+)\?/);
  if (squareAndCubeMatch) {
    const numbers = squareAndCubeMatch[1].split(",").map((n) => Number(n.trim()));
    const isSquareAndCube = (num: number) => {
      const sqrt = Math.sqrt(num);
      const cbrt = Math.cbrt(num);
      return Number.isInteger(sqrt) && Number.isInteger(cbrt);
    };
    const result = numbers.find(isSquareAndCube);
    return result ? String(result) : "";
  }

  const primeMatch = q.match(/which of the following numbers are primes[:\s]+([\d,\s]+)\?/);
  if (primeMatch) {
    const numbers = primeMatch[1].split(",").map((n) => Number(n.trim()));
    const isPrime = (num: number) => {
      if (num < 2) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    };
    const primes = numbers.filter(isPrime);
    return primes.join(", ");
  }

  return "";
}
