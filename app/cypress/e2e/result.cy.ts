describe('Tests for Result', () => {
  beforeEach(() => {
    // display result
    cy.visit('/vote')
    cy.getBySel('button-left').click()
    cy.getBySel('button-left').click()
    cy.getBySel('button-left').click()
    cy.getBySel('button-left').click()
    cy.getBySel('button-left').click()
    cy.getBySel('button-left').click()
    cy.getBySel('button-left').click()
    cy.getBySel('button-left').click()
    cy.getBySel('button-left').click()
    cy.getBySel('button-left').click()
    cy.getBySel('button-left').click()
    cy.getBySel('button-left').click()
    cy.getBySel('button-left').click()
    cy.getBySel('button-left').click()
  })

  it('Elements appear on the screen', () => {
    cy.getBySel('header')
    cy.getBySel('title').contains('faceUmash')
    cy.getBySel('subtitle').contains('みんなでつくるウマ娘ランキング')

    cy.getBySel('subject').contains('あなたへのおすすめのウマ娘は')
    cy.getBySel('result').should('not.equal', '')
    cy.getBySel('name').should('not.equal', '')
    cy.getBySel('about').contains('このウマ娘について')
    cy.getBySel('about').should('have.attr', 'href').should('not.equal', '')
    cy.getBySel('about').should('have.attr', 'rel').should('equal', 'noopener noreferrer')
    cy.getBySel('about').should('have.attr', 'target').should('equal', '_blank')

    cy.getBySel('restart').contains('最初から遊ぶ')
    cy.getBySel('continue').contains('続けて遊ぶ')
    cy.getBySel('home').contains('トップ')
    cy.getBySel('ranking').contains('ランキング')

    cy.getBySel('footer')
    cy.getBySel('tweetButton').contains('ツイート')
    cy.getBySel('copyright').contains('© 2022 Hir0teru')
  })

  it('Clicking the header navigates to home', () => {
    cy.getBySel('header').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('Clicking the restart button navigates to vote', () => {
    cy.getBySel('restart').click()
    cy.url().should('eq', 'http://localhost:3000/vote')
  })

  it('Clicking the home button navigates to home', () => {
    cy.getBySel('home').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('Clicking the ranking button navigates to ranking', () => {
    cy.getBySel('ranking').click()
    cy.url().should('eq', 'http://localhost:3000/ranking')
  })
})
