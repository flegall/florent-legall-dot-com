describe("app", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-testid=REACT_SPA_READY]");
  });
  it("works", () => {
    cy.title().should("equal", "Home | Software kitchen");
    cy.getByText(/About me/i).within(() => {
      cy.get("a").click();
    });

    cy.url().should("include", "/articles/about-me/");
    cy.title().should("equal", "About me | Software kitchen");

    cy.get("h2 > a").click();
    cy.title().should("equal", "Home | Software kitchen");
  });
});
