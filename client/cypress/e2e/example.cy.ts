// SPDX-FileCopyrightText: 2022 Matthew Nickson <mnickson@sidingsmedia.com>
// SPDX-License-Identifier: MIT

// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
    it("visits the app root url", () => {
        cy.visit("/");
        cy.contains("h1", "You did it!");
    });
});
