import { render, cleanup } from 'svelte-testing-library'
import Navbar from './Navbar.svelte'


describe('Navbar', () => {
  beforeEach(cleanup)

  it('should have "login" link for unauthenticated users', () => {
    const { getByText } = render(Navbar, { props: { isAuthenticated: false } })
    const foundElement = getByText('Login')

    expect(foundElement).toBeDefined()
  })

  it('should not have "login" link for authenticated users', () => {
    const { getByText } = render(Navbar, { props: { isAuthenticated: true } })
    const foundElement = getByText('Login')

    expect(foundElement).toBeDefined()
  })
})
