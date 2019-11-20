describe('/admin route', () => {
  it('redirects unauthenticated users to signin', () => {
    cy.visit('/admin');
    cy.wait(1000);
    cy.location('pathname').should('eq', '/en-GB/sign-in');
  });

  it('redirects admins to dashboard', () => {
    cy.setAdminLoginCookie();
    cy.visit('/admin');
    cy.wait(1000);
    cy.location('pathname').should('eq', '/en-GB/admin/dashboard');
  });
});
