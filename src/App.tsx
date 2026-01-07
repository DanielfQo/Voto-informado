import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Screen1 from './pages/screen1'
import Screen2 from './pages/screen2'
import Screen3 from './pages/screen3'
import Screen4 from './pages/screen4'
import SituacionActual from './pages/SituacionActual'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SituacionActual />} />
      <Route path="/home" element={<Home />} />
      <Route path="/screen1" element={<Screen1 />} />
      <Route path="/screen2" element={<Screen2 />} />
      <Route path="/screen3" element={<Screen3 />} />
      <Route path="/screen4" element={<Screen4 />} />
      {/* Redirección para cualquier otra ruta */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App