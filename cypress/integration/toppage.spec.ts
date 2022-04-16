describe("Top page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  // TODO: Replace with the practical test
  it("renders correctly", () => {
    cy.contains("Welcome to Next.js!").should("exist");
  });

  // FIXME: remove unneccesary test
  it("fails successfully", () => {
    cy.contains("Welcome to Next.js!").should("not.exist");
  });
});
