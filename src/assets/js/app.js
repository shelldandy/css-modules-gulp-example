import styles from '../cssmodules/cssClasses.json'

const changeBodyColor = () => {
  document.body.classList.toggle(styles.components.body.blue)
}

const buttonListener = () => {
  const trigger = document.querySelector('button')
  trigger.addEventListener('click', changeBodyColor)
}

export default buttonListener
