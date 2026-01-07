import { Link } from 'react-router-dom'

const Screen1: React.FC = () => {
  return (
    <div>
      <h1>Pantalla 1</h1>

      <Link to="/">Volver al menú principal</Link>
    </div>
  )
}

export default Screen1
