describe("florent-legall.com", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-testid=REACT_SPA_READY]");
  });

  it("links to articles pages work", () => {
    cy.title().should("equal", "Home | Software kitchen");
    cy.getByText(/About me/i).within(() => {
      cy.get("a").click({ force: true });
    });

    cy.url().should("include", "/articles/about-me/");
    cy.title().should("equal", "About me | Software kitchen");

    cy.get("h2 > a").click({ force: true });
    cy.title().should("equal", "Home | Software kitchen");
  });

  it("search engine works", () => {
    cy.getByPlaceholderText("Search").type("cook");
    cy.url().should("include", "/search");

    cy.getByText(/About me/i).within(() => {
      cy.get("a").click({ force: true });
    });

    cy.url().should("include", "/articles/about-me/");
  });
});
