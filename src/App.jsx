

import './App.css'
import Board from './pages/Board/Board';
import { generateQuoteMap } from './pages/Dnd/mock-data';


function App() {

  const data = {
    medium: generateQuoteMap(100),
    large: generateQuoteMap(500)
  };
  return (
    <>
<h1>dashboard Task Management </h1>
<Board initial={data.medium} withScrollableColumns />
    </>
  )
}

export default App
