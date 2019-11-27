import { render, cleanup } from 'svelte-testing-library'
import TopNavigation from './TopNavigation.svelte'


describe('TopNavigation', () => {
  beforeEach(cleanup)

  it('should have "login" link for unauthenticated users', () => {
    const { getByText } = render(TopNavigation, { props: { isAuthenticated: false } })
    const foundElement = getByText('Login')

    expect(foundElement).toBeDefined()
  })

  it('should not have "login" link for authenticated users', () => {
    const { getByText } = render(TopNavigation, { props: { isAuthenticated: true } })
    const foundElement = getByText('Login')

    expect(foundElement).toBeDefined()
  })
})
