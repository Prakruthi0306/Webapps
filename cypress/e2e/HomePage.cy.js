describe('Home Page', () => {
  const selectors = [
    '#tooltip-organization > .card-body > .img-fluid',
    '#tooltip-specialist > .card-body > .img-fluid',
    '#tooltip-parent-caretaker > .card-body > .img-fluid',
    '#tooltip-statistician-analyst > .card-body > .img-fluid',
    '#tooltip-appadmin > .card-body > .img-fluid'
  ]

  const elements = [
    { selector: '#tooltip-organization > .mx-auto', expectedText: 'Organization' },
    { selector: '#tooltip-specialist > h6.mx-auto', expectedText: 'Specialist'},
    { selector: '#tooltip-parent-caretaker > h6.mx-auto', expectedText: 'Parent/Caretaker'},
    { selector: '#tooltip-statistician-analyst > h6.mx-auto', expectedText: 'Statistician/Analyst'},
    { selector: '#tooltip-appadmin > h6.mx-auto', expectedText: 'App Admin'}
  ]

  beforeEach(() => {
    //Runs test with 1580 x 1080 resolution
    cy.visit('http://localhost:8080')
    cy.viewport(1580, 1080)

  })
  /*afterEach(()=> {
    cy.get('.c-header-nav-link > :nth-child(2) > .navbar-text')
      .click()
  })*/

  it('Cycles through Navbar', () => {
    cy.visit('http://localhost:8080')
    cy.get('#navMiddle-container > :nth-child(1) > .navbar-text')
      .click()
    cy.get('#navMiddle-container > :nth-child(2) > .navbar-text')
      .click()
    cy.get(':nth-child(3) > .navbar-text')
      .click()
    cy.get(':nth-child(4) > .navbar-text')
      .click()
    cy.get(':nth-child(5) > .navbar-text')
      .click()
    cy.get(':nth-child(6) > .navbar-text')
      .click()
  })

  it('Displays each image correctly on the Home Page', () => {
    selectors.forEach((selector) => {
      cy.get(selector)
        .should('be.visible')
        .and(($img) => {
          expect($img[0].naturalWidth).to.be.greaterThan(0)
        })
    })

  })

  it('should display the correct text in elements', () => {
    elements.forEach((element) => {
      cy.get(element.selector)
        .should('be.visible')
        .should('have.text', element.expectedText);
    });
  });

})