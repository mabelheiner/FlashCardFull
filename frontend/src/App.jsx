import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [cards, setCards] = useState(null)

  
  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch('https://flashcards-w643.onrender.com/flashcards/');
        if (response.ok){
          const data = await response.json()
          console.log('Data fetched', data)
          setCards(data)
          console.log('Cards', cards)
        } else {
          setCards([])
        }
      } catch (error) {
        setCards([])
      }
    }
    fetchCards()
  }, [])

  return (
    <>
      {cards ? (
        cards.length > 0 ? (
          cards.map((card, index) => (
            <>
              <p key={index} className='term'>{card.term}</p>
              <p key={index} className='definition'>{card.definition}</p>
            </>
          ))
    ) : (
    <p>No cards available</p>
    )
  ) : (
      <p>Loading...</p>
    )}
    </>
  )
}

export default App
