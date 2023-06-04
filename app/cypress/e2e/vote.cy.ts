describe('Tests for Vote', () => {
  beforeEach(() => {
    cy.visit('/vote')
  })

  it('Elements appear on the screen', () => {
    cy.getBySel('loading')
    cy.getBySel('question')

    cy.getBySel('header')
    cy.getBySel('title').contains('faceUmash')
    cy.getBySel('subtitle').contains('みんなでつくるウマ娘ランキング')

    cy.getBySel('question').should('have.css', 'text-align', 'center')
    cy.getBySel('question').contains('どっちが気になる？')

    // tests for buttons and images
    cy.getBySel('button-left').get(':button').eq(0).should('be.enabled')
    cy.getBySel('button-left').getBySel('name').should('not.equal', '')
    cy.getBySel('button-left').get('img').eq(0).should('have.attr', 'alt').should('not.equal', '')
    cy.getBySel('button-left').get('img').eq(0).should('have.attr', 'src').should('not.equal', '')

    cy.getBySel('button-right').get(':button').eq(1).should('not.be.disabled')
    cy.getBySel('button-right').getBySel('name').should('not.equal', '')
    cy.getBySel('button-right').get('img').eq(1).should('have.attr', 'alt').should('not.equal', '')
    cy.getBySel('button-right').get('img').eq(1).should('have.attr', 'src').should('not.equal', '')

    cy.getBySel('footer')
    cy.getBySel('tweetButton').contains('ツイート')
    cy.getBySel('copyright').contains('© 2022 Hir0teru')
  })

  it('Clicking the header navigates to home', () => {
    cy.getBySel('header').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('Clicking the left button changes the display of the right button', async () => {
    cy.getBySel('button-right').then(($btn) => {
      const preName: string = $btn.text()
      cy.getBySel('button-left').click()
      cy.getBySel('button-right').getBySel('name').should('not.equal', preName)
    })
  })

  it('Clicking the right button changes the display of the left button', async () => {
    cy.getBySel('button-left').then(($btn) => {
      const preName: string = $btn.text()
      cy.getBySel('button-right').click()
      cy.getBySel('button-left').getBySel('name').should('not.equal', preName)
    })
  })

  it('After voting, it transitions to result', async () => {
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
    cy.getBySel('button-left').then(($btn) => {
      const name: string = $btn.text()
      cy.getBySel('button-left').click()
      cy.url().should('contain', 'http://localhost:3000/')
      cy.url().should('contain', 'result')
      cy.getBySel('result').should('contain', name)
    })
  })
})
