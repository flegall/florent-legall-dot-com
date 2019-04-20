describe("florent-legall.com", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-testid=REACT_SPA_READY]");
  });

  it("there are links to other pages in the home page", () => {
    cy.title().should("equal", "Home | Software kitchen");
    cy.getByText(/About me/i).within(() => {
      cy.get("a").click();
    });

    cy.url().should("include", "/articles/about-me/");
    cy.title().should("equal", "About me | Software kitchen");

    cy.get("h2 > a").click();
    cy.title().should("equal", "Home | Software kitchen");
  });

  it("there is a search engine", () => {
    cy.getByPlaceholderText("Search").type("c");
    cy.url().should("include", "/search");
    cy.getByPlaceholderText("Search").type("ook");

    cy.getByText(/About me/i).within(() => {
      cy.get("a").click();
    });

    cy.url().should("include", "/articles/about-me/");
  });
});
