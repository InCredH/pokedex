//importing components
import Navbar from './components/Navbar'
import PokemonGrid from './components/PokemonGrid'

import './App.css'
import store, { fetchInitialPokemons } from './store'
import { useSelector } from 'react-redux'
import { Box } from '@chakra-ui/react'

function App() {

    const loading = useSelector((state) => state.pokemon.loading)

    store.dispatch(fetchInitialPokemons())

    return (
        <div className='app-container'>
            <Navbar />

            {loading && (
                <Box
                    position="fixed"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    backgroundColor="rgba(0, 0, 0, 0.5)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    zIndex={9999}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        style={{
                            minWidth: '100%',
                            minHeight: '100%',
                            opacity: "0.1",
                        }}
                    >
                        <source src="/load_1.webm" type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                </Box>
            )}
            <PokemonGrid />
        </div>
    )
}

export default App
