import { useState, useEffect, useRef } from "react"

function App() {

  const [text, setText] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(5)
  const [startGame, setStartGame] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const textAreaRef = useRef(null)
    
  function handleChange(e) {
    setText(e.target.value)
  }

  function calculateWordCount(text) {
    const wordsArr = text.trim().split(" ")
    return wordsArr.filter(word => word !== "").length
  }

  function startTimer() {
    setStartGame(true)
    setTimeRemaining(5)
    setText("")
    setWordCount(0)
    textAreaRef.current.disabled = false
    textAreaRef.current.focus()
  }

  useEffect(() => {
    if(timeRemaining > 0 && startGame) {
        setTimeout(() => {
            setTimeRemaining(prevCount => prevCount - 1)
        }, 1000)
    } else if(timeRemaining === 0) {
        setStartGame(false)
        setWordCount(calculateWordCount(text))
    }
  }, [startGame, timeRemaining])

  return (
    <>
      <div className="container">

        <h1>How fast do you type?</h1>
        <textarea
          ref={textAreaRef}
          onChange={handleChange}
          value={text}
          disabled={!startGame} />
        <h4>Time reminaing: {timeRemaining}</h4>
        <button
          onClick={startTimer}
          disabled={startGame}>
          Start
        </button>
        <h1>Word count: {wordCount}</h1>
        
      </div>
    </>
  )
}

export default App
