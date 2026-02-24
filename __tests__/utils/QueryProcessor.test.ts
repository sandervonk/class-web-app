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
});
