import { toSnakeCase } from "../helpers/toSnakeCase";

describe("ToSnakeCase tests suite", () => {
  const cases = [
    ["Nom de famille", "nom_de_famille"],
    ["déjà", "deja"],
  ];
  test.each(cases)(`should return %p in a snake_case format`, (c, e) => {
    const result = toSnakeCase(c);

    expect(result).toEqual(e);
  });
});
