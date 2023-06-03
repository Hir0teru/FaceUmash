declare namespace Cypress {
  interface Chainable<Subject = any> {
    getBySel: (selector: string) => Chainable<JQuery<HTMLElement>>
  }
}
