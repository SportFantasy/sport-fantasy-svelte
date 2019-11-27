import { render, cleanup } from 'svelte-testing-library'

import Welcome from './Welcome.svelte'


describe('Welcome', () => {
  beforeEach(cleanup) //this is required

  it('renders "name" prop', () => {
    const nameProp = 'Vladimir'
    const { getByText } = render(Welcome, { props: { name: nameProp } })
    const foundElement = getByText(nameProp, { exact: false })

    expect(foundElement).toBeDefined()
  })
})
