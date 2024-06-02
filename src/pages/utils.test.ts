import {
  calculateNecessaryFinalExamScoreForSpecificRating,
  calculateNecessaryFinalExamScores,
} from "./utils";

describe("calculateNecessaryFinalExamScoreForSpecificRating", () => {
  const testCases: Array<{
    args: Parameters<typeof calculateNecessaryFinalExamScoreForSpecificRating>;
    expected: ReturnType<
      typeof calculateNecessaryFinalExamScoreForSpecificRating
    >;
  }> = [
    {
      args: [0],
      expected: 0,
    },
    {
      args: [1],
      expected: 4,
    },
    {
      args: [1500],
      expected: 5000,
    },
    {
      args: [1501],
      expected: 5007,
    },
    {
      args: [2250],
      expected: 10000,
    },
    {
      args: [2251],
      expected: 10013,
    },
    {
      args: [3050],
      expected: 20000,
    },
    {
      args: [3051],
      expected: 20025,
    },
    {
      args: [3450],
      expected: 30000,
    },
    {
      args: [3451],
      expected: 30050,
    },
    {
      args: [3650],
      expected: 40000,
    },
    {
      args: [3651],
      expected: 40100,
    },
    {
      args: [4650],
      expected: 140000,
    },
  ];
  test.each(testCases)("$args -> $expected", ({ args, expected }) => {
    expect(calculateNecessaryFinalExamScoreForSpecificRating(...args)).toBe(
      expected,
    );
  });
});

describe("calculateNecessaryFinalExamScores", () => {
  test("all 1500 parameters results as the same result as all 1470 parameters", () => {
    const result1500 = calculateNecessaryFinalExamScores(
      "1",
      { vocal: 1500, dance: 1500, visual: 1500 },
      () => {},
    );
    const result1470 = calculateNecessaryFinalExamScores(
      "1",
      { vocal: 1470, dance: 1470, visual: 1470 },
      () => {},
    );
    expect(result1500).toStrictEqual(result1470);
  });
  // Original: "学マス評価値計算機"<https://docs.google.com/spreadsheets/d/1eEdzfHGi7iXpohR-UHr5-W1z7PcYBqQr8OAV7gcvhR8/edit#gid=0>
  describe("compares it with the behavior of the original Google Sheets", () => {
    const testCases: Array<{
      args: Parameters<typeof calculateNecessaryFinalExamScores>;
      expected: ReturnType<typeof calculateNecessaryFinalExamScores>;
    }> = [
      {
        args: ["1", { vocal: 1000, dance: 1000, visual: 1000 }, () => {}],
        expected: [
          { name: "S", necessaryScore: 94300 },
          { name: "A+", necessaryScore: 15538 },
          { name: "A", necessaryScore: 3977 },
          { name: "B+", necessaryScore: 0 },
          { name: "B", necessaryScore: 0 },
          { name: "C+", necessaryScore: 0 },
          { name: "C", necessaryScore: 0 },
          { name: "D", necessaryScore: 0 },
        ],
      },
      {
        args: ["1", { vocal: 70, dance: 70, visual: 70 }, () => {}],
        expected: [
          { name: "S", necessaryScore: 736000 },
          { name: "A+", necessaryScore: 586000 },
          { name: "A", necessaryScore: 436000 },
          { name: "B+", necessaryScore: 236000 },
          { name: "B", necessaryScore: 38000 },
          { name: "C+", necessaryScore: 9067 },
          { name: "C", necessaryScore: 2034 },
          { name: "D", necessaryScore: 0 },
        ],
      },
      {
        args: ["1", { vocal: 1470, dance: 1470, visual: 1470 }, () => {}],
        expected: [
          { name: "S", necessaryScore: 3167 },
          { name: "A+", necessaryScore: 0 },
          { name: "A", necessaryScore: 0 },
          { name: "B+", necessaryScore: 0 },
          { name: "B", necessaryScore: 0 },
          { name: "C+", necessaryScore: 0 },
          { name: "C", necessaryScore: 0 },
          { name: "D", necessaryScore: 0 },
        ],
      },
    ];
    test.each(testCases)(
      "$args.1 -> $expected.0/$expected.1/$expected.2",
      ({ args, expected }) => {
        expect(calculateNecessaryFinalExamScores(...args)).toStrictEqual(
          expected,
        );
      },
    );
  });
});
