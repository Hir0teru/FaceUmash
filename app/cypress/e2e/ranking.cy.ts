describe('Tests for Ranking', () => {
  beforeEach(() => {
    cy.visit('/ranking')
  })

  it('Elements appear on the screen', () => {
    cy.getBySel('loading')
    cy.getBySel('ranking')

    cy.getBySel('header')
    cy.getBySel('title').contains('faceUmash')
    cy.getBySel('subtitle').contains('みんなでつくるウマ娘ランキング')

    cy.getBySel('updatedAt').should('have.css', 'text-align', 'right')
    cy.getBySel('updatedAt').contains(/最終更新：\d{2}\/\d{2} \d{2}:\d{2}/)
    cy.getBySel('table').contains('RANK')

    cy.getBySel('footer')
    cy.getBySel('tweetButton').contains('ツイート')
    cy.getBySel('copyright').contains('© 2022 Hir0teru')
  })

  it('Clicking the header navigates to home"', () => {
    cy.getBySel('header').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})

export {}
