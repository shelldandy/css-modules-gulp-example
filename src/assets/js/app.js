import styles from './cssModules/body.json'

const changeBodyColor = () => {
  document.body.classList.toggle(styles.blue)
}

const buttonListener = () => {
  const trigger = document.querySelector('button')
  trigger.addEventListener('click', changeBodyColor)
}

export default buttonListener
