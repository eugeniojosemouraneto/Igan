import './Global.module.css'

// components
import Header from './companents/Header/header.tsx'
import Login from './companents/login/login.tsx'

export default function App() {
  
  return (
    <div className="App">
      <Header 
        namePage='Login'
      />
      <Login />
    </div>
  )
}