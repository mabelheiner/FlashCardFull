import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [cards, setCards] = useState(null)

  const [selectedTerm, setSelectedTerm] = useState(null)
  const [selectedDefinition, setSelectedDefinition] = useState(null)

  
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

  function handleTermClick(e){
    console.log('Term clicked:', e)
    console.log('Term id', e.target.classList[1])
    setSelectedTerm(e.target.classList[1])
  }

  function handleDefinitionClick(e){
    console.log('Definition clicked:', e)
    console.log('Definition id', e.target.classList[1])
    setSelectedDefinition(e.target.classList[1])
  }

  if (selectedDefinition != null && selectedTerm != null){
    if (selectedDefinition == selectedTerm){
      console.log("It's a match!")
    } else {
      console.log('Not a match!')
    }
    setSelectedDefinition(null)
    setSelectedTerm(null)
  }

  return (
    <>
    <h1>Match the terms and definitons</h1>
    <div className='cards'>
      {cards ? (
        cards.length > 0 ? (
          cards.map((card, index) => (
            <>
              <p className={`term ${card._id}`} onClick={handleTermClick}>{card.term}</p>
              <p className={`definition ${card._id}`} onClick={handleDefinitionClick}>{card.definition}</p>
            </>
          ))
    ) : (
    <p>No cards available</p>
    )
  ) : (
      <p>Loading...</p>
    )}
    </div>
    </>
  )
}

export default App
