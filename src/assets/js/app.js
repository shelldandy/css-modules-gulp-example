import styles from '../cssmodules/cssModules.json'

const changeBodyColor = () => {
  document.body.classList.toggle(styles.modules.body.blue)
}

const buttonListener = () => {
  const trigger = document.querySelector('button')
  trigger.addEventListener('click', changeBodyColor)
}

export default buttonListener
