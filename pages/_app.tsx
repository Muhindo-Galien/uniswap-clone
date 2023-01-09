import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NavBar } from '../components'
import React from 'react'
import { SwapTokenContextProvider } from '../context/SwapContext'

const App=({ Component, pageProps }: AppProps) =>{
  return(
    <div>
      <SwapTokenContextProvider>
        <NavBar/>
        <Component {...pageProps} />
      </SwapTokenContextProvider>
    </div>
  )
}

export  default App