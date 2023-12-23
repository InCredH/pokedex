//importing components
import Navbar from './components/Navbar'
import Header from './components/Header'
import PokemonGrid from './components/PokemonGrid'

import './App.css'

function App() {

    return (
        <div className='app-container'>
            <Navbar />
            <Header />
            <PokemonGrid />
        </div>
    )
}

export default App
