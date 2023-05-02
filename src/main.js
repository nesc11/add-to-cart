import { addItem, shoppingListInDB, removeItem } from './services/firebase'
import { onValue } from 'firebase/database'


const formElement = document.getElementById('form-el')
const listElement = document.getElementById('list-el')
const inputFieldElement = document.getElementById('input-field')


inputFieldElement.addEventListener('input', (e) => {
  const { value } = e.target
  if (value.startsWith(' ')) {
    e.target.value =''
  }
})


const appendItemToList = item => {
  // listElement.innerHTML += `<li>${item}</li>`
  const [itemId, itemValue] = item
  const newItemElement = document.createElement('li')
  newItemElement.textContent = itemValue
  listElement.append(newItemElement)
  newItemElement.addEventListener('dblclick', () => {
    removeItem(itemId)
  })
}


formElement.addEventListener('submit', (e) => {
  e.preventDefault()
  const { item } = Object.fromEntries(new FormData(e.target))
  if (item === '') return
  addItem(item)
  formElement.reset()
})

onValue(shoppingListInDB, snapshot => {
  if (snapshot.exists()) {
    const items = Object.entries(snapshot.val())
    listElement.innerHTML = ''
    items.forEach(item => {
      appendItemToList(item)
    })
  } else {
    listElement.innerHTML = ''
  }
})

