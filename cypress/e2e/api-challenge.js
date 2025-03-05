/// <reference types="cypress" />

describe("Post, Get, Delete Request", () => {
  let commentId; // Store the ID of the created comment
  let comment =
    Math.random().toString(36).substring(1) +
    Math.random().toString(36).substring(1);
  let randomPostId = Math.floor(Math.random() * 1000 + 1);

  it("Create a new comment", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/comments",
      body: {
        body: comment,
        postId: randomPostId,
      },
    }).then((response) => {
      expect(response.status).to.eql(201);
      commentId = response.body.id; // Capture the ID of the created comment
    });
  });

  it("Locate and assert the new comment", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/comments",
      headers: {
        accept: "application/json",
      },
    }).then((response) => {
      const matchingComment = response.body.find(
        (item) => item.body === comment
      );
      expect(matchingComment).to.exist;
    });
  });

  it("Delete the new comment", () => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:3000/comments/${commentId}`, // Use the captured ID
    }).then((response) => {
      expect(response.status).to.eql(200);
    });
  });
});
