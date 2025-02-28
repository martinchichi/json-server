/// <reference types="cypress" />

describe("Update Request", () => {
  let randomTitle =
    Math.random().toString(36).substring(1) +
    Math.random().toString(36).substring(1);

  it("Update an existing post via the /posts api", () => {
    cy.request({
      method: "PUT",
      url: "http://localhost:3000/posts/2",
      body: {
        title: randomTitle,
        author: "Tom Jones",
      },
    }).then((response) => {
      expect(response.status).to.eql(200);
    });
  });
});
