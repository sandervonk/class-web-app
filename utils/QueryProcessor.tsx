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

  // Handle chained arithmetic operations (e.g., "What is 6 multiplied by 24 plus 96?")
  const chainedMatch = q.match(/what is ([\d\s]+(?:(?:plus|minus|multiplied by|divided by|to the power of)[\d\s]+)+)\?/);
  if (chainedMatch) {
    const expression = chainedMatch[1].trim();
    // Tokenize: split into numbers and operators
    const tokens: (number | string)[] = [];
    const regex = /(\d+)|(plus|minus|multiplied by|divided by|to the power of)/g;
    let match;
    while ((match = regex.exec(expression)) !== null) {
      if (match[1]) {
        tokens.push(Number(match[1]));
      } else if (match[2]) {
        tokens.push(match[2]);
      }
    }

    // Evaluate left-to-right
    if (tokens.length > 0 && typeof tokens[0] === 'number') {
      let result = tokens[0] as number;
      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i] as string;
        const operand = tokens[i + 1] as number;
        switch (operator) {
          case 'plus':
            result += operand;
            break;
          case 'minus':
            result -= operand;
            break;
          case 'multiplied by':
            result *= operand;
            break;
          case 'divided by':
            result = operand === 0 ? NaN : result / operand;
            break;
          case 'to the power of':
            result = Math.pow(result, operand);
            break;
        }
      }
      return isNaN(result) ? "undefined" : String(result);
    }
  }

  const plusMatch = q.match(/what is ([\d\s+]+)\?/);
  if (plusMatch) {
    const numbers = plusMatch[1].split("plus").map((n) => Number(n.trim()));
    return String(numbers.reduce((sum, num) => sum + num, 0));
  }

  const multiplyMatch = q.match(/what is ([\d\s*]+)\?/);
  if (multiplyMatch) {
    const numbers = multiplyMatch[1].split("multiplied by").map((n) => Number(n.trim()));
    return String(numbers.reduce((product, num) => product * num, 1));
  }

  const minusMatch = q.match(/what is (\d+(?: minus \d+)+)\?/);
  if (minusMatch) {
    const numbers = minusMatch[1].split("minus").map((n) => Number(n.trim()));
    return String(numbers.reduce((difference, num) => difference - num));
  }

  const divideMatch = q.match(/what is ([\d\s/]+)\?/);
  if (divideMatch) {
    const numbers = divideMatch[1].split("divided by").map((n) => Number(n.trim()));
    return numbers.includes(0) ? "undefined" : String(numbers.reduce((quotient, num) => quotient / num));
  }

  const powerMatch = q.match(/what is ([\d\s^]+)\?/);
  if (powerMatch) {
    const numbers = powerMatch[1].split("to the power of").map((n) => Number(n.trim()));
    return String(numbers.reduce((result, num) => Math.pow(result, num)));
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
      if (num <= 1) return false; // Exclude 0 and 1
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
