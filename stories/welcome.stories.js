import Welcome from '../src/common/Welcome.svelte'

export default { title: 'Common/Welcome' }


export const withoutNameProp = () => ({
  Component: Welcome,
})

export const withNameProp = () => ({
  Component: Welcome,
  props: {
    name: 'Storybook',
  },
})
