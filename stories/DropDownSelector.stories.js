import DropDownSelector from '../src/common/DropDownSelector.svelte'

export default { title: 'Common/DropDownSelector' }


const MOCK_OBJECT_VALUES = [{
  display: 'one',
  value: 1,
}, {
  display: 'two',
  value: 2,
}, {
  display: 'three',
  value: 3,
}, {
  display: 'four',
  value: 4,
}]

const MOCK_ARRAY_VALUES = ['five', 'six', 'seven', 'eight', 'nine']


export const withoutProps = () => ({
  Component: DropDownSelector,
})

export const withArrayValuesProp = () => ({
  Component: DropDownSelector,
  props: {
    values: MOCK_ARRAY_VALUES,
  },
})

export const withObjectValuesProp = () => ({
  Component: DropDownSelector,
  props: {
    values: MOCK_OBJECT_VALUES,
  },
})

export const withArrayValuesPropTransparent = () => ({
  Component: DropDownSelector,
  props: {
    values: MOCK_ARRAY_VALUES,
    isTransparent: true,
  },
})

export const withArrayValuesPropAlignedLeft = () => ({
  Component: DropDownSelector,
  props: {
    values: MOCK_ARRAY_VALUES,
    textAlign: 'left',
  },
})

export const withArrayValuesPropAlignedCenter = () => ({
  Component: DropDownSelector,
  props: {
    values: MOCK_ARRAY_VALUES,
    textAlign: 'center',
  },
})

export const withArrayValuesPropAlignedRight = () => ({
  Component: DropDownSelector,
  props: {
    values: MOCK_ARRAY_VALUES,
    textAlign: 'right',
  },
})

export const withArrayValuesPropAlignedInvalid = () => ({
  Component: DropDownSelector,
  props: {
    values: MOCK_ARRAY_VALUES,
    textAlign: 'blaaah',
  },
})
