/* eslint-disable jest/no-identical-title */
import dayjs from 'dayjs'

function generateTestUser() {
  const ts = dayjs().format('YYMMDD_HHmmss')
  const email = `prober+${ts}@audius.co`
  const password = 'Pa$$w0rdTest'
  const name = `Prober ${ts}`
  const handle = `p_${ts}`
  return {
    email,
    password,
    name,
    handle
  }
}

type User = {
  email: string
}

function assertOnSignUpPage() {
  cy.findByRole('heading', { name: /sign up for audius/i, level: 1 }).should(
    'exist'
  )
}

function assertOnCreatePasswordPage(user: User) {
  cy.findByRole('heading', { name: /create your password/i }).should('exist')

  cy.findByText(
    /create a password that's secure and easy to remember!/i
  ).should('exist')

  cy.findByText(/your email/i).should('exist')
  cy.findByText(user.email).should('exist')
}

describe('Sign Up', () => {
  beforeEach(() => {
    localStorage.setItem('FeatureFlagOverride:sign_up_redesign', 'enabled')
  })

  context('desktop', () => {
    it('can navigate to signup from trending', () => {
      cy.visit('trending')
      cy.findByText(/have an account\?/i).should('exist')
      cy.findByRole('link', { name: /sign up/i }).click()
      assertOnSignUpPage()
    })

    it('/signup goes to sign-up', () => {
      cy.visit('signup')
      assertOnSignUpPage()
    })

    it('can navigate to sign-up from sign-in', () => {
      cy.visit('signin')
      cy.findByRole('link', { name: /create an account/i }).click()

      assertOnSignUpPage()
    })

    it('can navigate to sign-up from the public site', () => {
      cy.visit('')
      cy.findByRole('button', { name: /sign up free/i }).click()

      assertOnSignUpPage()
    })

    it('should create an account', () => {
      const testUser = generateTestUser()
      const { email, password } = testUser
      cy.visit('signup')
      cy.findByRole('textbox', { name: /email/i }).type(email)
      cy.findByRole('button', { name: /sign up free/i }).click()

      assertOnCreatePasswordPage(testUser)

      cy.findByRole('textbox', { name: /^password/i }).type(password)
      cy.findByRole('textbox', { name: /confirm password/i }).type(password)
      cy.findByRole('button', { name: /continue/i }).click()

      cy.findByRole('heading', { name: /pick your handle/i }).should('exist')
    })
  })

  context('mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-x')
    })

    it('can navigate to signup from trending', () => {
      cy.visit('trending')
      cy.findByRole('link', { name: /sign up/i }).click()
      assertOnSignUpPage()
    })

    it('/signup goes to sign-up', () => {
      cy.visit('signup')
      assertOnSignUpPage()
    })

    it('can navigate to sign-up from sign-in', () => {
      cy.visit('signin')
      cy.findByRole('link', { name: /create an account/i }).click()

      assertOnSignUpPage()
    })

    it('can navigate to sign-up from the public site', () => {
      cy.visit('')
      cy.findByRole('button', { name: /sign up free/i }).click()

      assertOnSignUpPage()
    })

    it('should create an account', () => {
      const testUser = generateTestUser()
      const { email, password } = testUser
      cy.visit('signup')
      cy.findByRole('textbox', { name: /email/i }).type(email)
      cy.findByRole('button', { name: /sign up free/i }).click()

      assertOnCreatePasswordPage(testUser)

      cy.findByRole('textbox', { name: /^password/i }).type(password)
      cy.findByRole('textbox', { name: /confirm password/i }).type(password)
      cy.findByRole('button', { name: /continue/i }).click()

      cy.findByRole('heading', { name: /pick your handle/i }).should('exist')
    })
  })
})
