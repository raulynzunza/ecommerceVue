// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBc8C7R5eL0X2R8mo58-J_3bsCMuL_g7v8',
  authDomain: 'ecommerce-images-485ab.firebaseapp.com',
  projectId: 'ecommerce-images-485ab',
  storageBucket: 'ecommerce-images-485ab.appspot.com',
  messagingSenderId: '729434678595',
  appId: '1:729434678595:web:f84ac8c7676c8c03893bf6'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)

export async function uploadFile(file) {
  const storageRef = ref(storage, 'products/' + v4())
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}
