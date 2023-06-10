describe('Tests for Home', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Elements appear on the screen', () => {
    cy.getBySel('header')
    cy.getBySel('title').contains('faceUmash')
    cy.getBySel('subtitle').contains('みんなでつくるウマ娘ランキング')

    cy.getBySel('subject').contains('どっちが気になる？')
    cy.getBySel('description').contains('あそびかた')
    cy.getBySel('description-0').contains('２人のウマ娘から気になるウマ娘をクリック！')
    cy.getBySel('description-1').contains('何度か繰り返してお気に入りのウマ娘を見つけましょう！')
    cy.getBySel('play').contains('あそんでみる')
    cy.getBySel('ranking').contains('ランキング')

    cy.getBySel('footer')
    cy.getBySel('tweetButton').contains('ツイート')
    cy.getBySel('copyright').contains('© 2022 Hir0teru')
  })

  it('Clicking the header navigates to home"', () => {
    cy.getBySel('header').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('Clicking the play button navigates to /vote', () => {
    cy.getBySel('play').click()
    cy.url().should('include', '/vote')
  })

  it('Clicking the ranking button navigates to /ranking', () => {
    cy.getBySel('ranking').click()
    cy.url().should('include', '/ranking')
  })
})

export {}
