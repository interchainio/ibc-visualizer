import { compareComponentWise } from "./sort";

describe("sort", () => {
  it("works", () => {
    // lhs == rhs
    expect(compareComponentWise("", "")).toEqual(0);
    expect(compareComponentWise("1", "1")).toEqual(0);
    expect(compareComponentWise("m", "m")).toEqual(0);
    expect(compareComponentWise("m-1", "m-1")).toEqual(0);
    expect(compareComponentWise("m-b", "m-b")).toEqual(0);
    expect(compareComponentWise("m-b-7", "m-b-7")).toEqual(0);

    // lhs < rhs
    expect(compareComponentWise("1", "2")).toBeLessThan(0);
    expect(compareComponentWise("a", "b")).toBeLessThan(0);
    expect(compareComponentWise("A", "B")).toBeLessThan(0);
    expect(compareComponentWise("a-1", "a-2")).toBeLessThan(0);
    expect(compareComponentWise("a", "a-2")).toBeLessThan(0);

    // lhs > rhs
    expect(compareComponentWise("7", "2")).toBeGreaterThan(0);
    expect(compareComponentWise("f", "b")).toBeGreaterThan(0);
    expect(compareComponentWise("D", "B")).toBeGreaterThan(0);
    expect(compareComponentWise("a-3", "a-2")).toBeGreaterThan(0);
    expect(compareComponentWise("a-", "a")).toBeGreaterThan(0);

    // The clients
    expect(compareComponentWise("07-tendermint-0", "07-tendermint-1")).toBeLessThan(0);
    expect(compareComponentWise("07-tendermint-5", "07-tendermint-9")).toBeLessThan(0);
    expect(compareComponentWise("07-tendermint-5", "07-tendermint-15")).toBeLessThan(0);
    expect(compareComponentWise("07-tendermint-8", "07-tendermint-8")).toEqual(0);
  });
});
