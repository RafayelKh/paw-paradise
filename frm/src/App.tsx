import './App.css'
import Hero from './components/Hero'
import Features from './components/Features'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'

function App() {
  return (
    <div className="app">
      <Cursor />
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Portfolio />
          <Contact />
        </main>
      </SmoothScroll>
    </div>
  )
}

export default App
