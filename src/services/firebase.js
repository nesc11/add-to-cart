import { initializeApp } from "firebase/app"
import { getDatabase, ref, push, remove } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyC7_-LVuO366znHcPQzNK5-5KAHrKGJTqU",
    authDomain: "ingredients-app-ad925.firebaseapp.com",
    projectId: "ingredients-app-ad925",
    storageBucket: "ingredients-app-ad925.appspot.com",
    messagingSenderId: "375415671018",
    appId: "1:375415671018:web:4209eadbd96580c7866f93",
    databaseURL: "https://ingredients-app-ad925-default-rtdb.firebaseio.com/",
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
export const shoppingListInDB = ref(db, 'shoppingList')

export const removeItem = (id) => {
    const itemRef = ref(db, `shoppingList/${id}`)
    remove(itemRef)
}


export const addItem = (item) => {
    push(shoppingListInDB, item)
}