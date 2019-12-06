export const getButtonClass = (isTransparent, textAlign) => {
  let className = ['select-button']

  if (isTransparent) {
    className.push('select-button--is-transparent')
  }

  switch (textAlign) {
    case 'left':
      className.push('select-button--text-align-left')
      break

    case 'right':
      className.push('select-button--text-align-right')
      break

    case 'center':  //intentional fall-through
    default:
      className.push('select-button--text-align-center')
      break
  }

  return className.join(' ')
}

export const getSelectButtonText = (values, selectedValueId) => {
    let buttonText = 'Select...'
    values.forEach( value => {
        if (value === selectedValueId) {
            buttonText = value
        }
        if (value.value === selectedValueId) {
            buttonText = value.display
        }
    } )
    return buttonText
}
