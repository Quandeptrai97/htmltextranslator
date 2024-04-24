import { useState } from 'react'
import TextEditor from './components/TextEditor'
import './App.css'
import CKTextEditor from './components/CKTextEditor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Quandeptrai's Rich Text Editor</h1>
        {/* <TextEditor /> */}
        <p>-------------------CK Editor--------------------</p>
        <CKTextEditor/>
      </div>
    </>
  )
}

export default App
