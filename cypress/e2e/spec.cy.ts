describe("empty spec", () => {
  it("passes", async () => {
    cy.visit("localhost:3000");
    cy.get(".customCollectionNameInput").type("MyCustomCollection");
    cy.contains("Select a collection..").click();
    cy.contains("Bored Ape").click();
    cy.contains("Bored Ape Yacht Club #").drag(".customCollectionNameInput");
  });
});

export {}; // To silence isolatedModules error ('spec.cy.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file)
