import styles from 'styles'

const {components} = styles

const trigger = document.querySelector('button')

const changeBodyColor = () => {
  document.body.classList.toggle(components.body.blue)
  trigger.classList.toggle(components.buttons.white)
}

const buttonListener = () => {
  trigger.addEventListener('click', changeBodyColor)
}

export default buttonListener
