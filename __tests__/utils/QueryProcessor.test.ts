import QueryProcessor from "../../utils/QueryProcessor";
import "@testing-library/jest-dom";

describe("QueryProcessor", () => {
  test("should return a string", () => {
    const query = "test";
    const response: string = QueryProcessor(query);
    expect(typeof response).toBe("string");
  });

  test("should return shakespeare description", () => {
    const query = "shakespeare";
    const response: string = QueryProcessor(query);
    expect(response).toBe(
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
        "English poet, playwright, and actor, widely regarded as the greatest " +
        "writer in the English language and the world's pre-eminent dramatist.",
    );
  });

  test("should return name", () => {
    const query = "What is your name?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("svonk");
  });

  test("should return andrew id", () => {
    const query = "What is your Andrew ID?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("svonk");
  });

  test("should return the sum of two numbers", () => {
    const query = "What is 5 plus 3?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("8");
  });

  test("should return the largest number", () => {
    const query = "Which of the following numbers is the largest: 3, 7, 2?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("7");
  });

  test("should return numbers that are both a square and a cube", () => {
    const query = "Which of the following numbers is both a square and a cube: 3255, 216, 2032, 2042, 64, 3364, 985?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("64");
  });

  test("should return the product of two numbers", () => {
    const query = "What is 21 multiplied by 87?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("1827");
  });

  test("should return the difference of two numbers", () => {
    const query = "What is 49 minus 64?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("-15");
  });

  test("should return the sum of multiple numbers", () => {
    const query = "What is 10 plus 20 plus 30?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("60");
  });

  test("should return the product of multiple numbers", () => {
    const query = "What is 2 multiplied by 3 multiplied by 4?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("24");
  });

  test("should return the difference of multiple numbers", () => {
    const query = "What is 100 minus 30 minus 20?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("50");
  });

  test("should return the quotient of multiple numbers", () => {
    const query = "What is 100 divided by 5 divided by 2?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("10");
  });

  test("should return undefined for division by zero", () => {
    const query = "What is 10 divided by 0?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("undefined");
  });

  test("should return prime numbers", () => {
    const query = "Which of the following numbers are primes: 4, 5, 6, 7, 8?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("5, 7");
  });

  test("should handle chained multiply and plus", () => {
    const query = "What is 6 multiplied by 24 plus 96?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("240");
  });

  test("should handle chained plus and minus", () => {
    const query = "What is 10 plus 5 minus 3?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("12");
  });

  test("should handle chained multiply and divided by", () => {
    const query = "What is 100 multiplied by 2 divided by 4?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("50");
  });

  test("should handle power operations", () => {
    const query = "What is 2 to the power of 10?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("1024");
  });

  test("should handle large power operations", () => {
    const query = "What is 93 to the power of 87?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("1811409012448835817695946872822595329565921474166650482442465863106371938918423437434232557190729891182723319242399754877525328948139653232562706029585126861239091480988757");
  });
});
