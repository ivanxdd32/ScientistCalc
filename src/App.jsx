import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';
import './Styles/App.css'
import ScientistMode from './Components/ScientistMode';
import { VisibilidadProvider } from './Components/VisibilidadContext';

function App() {
  return (
    <>
    <VisibilidadProvider>
      <Header />
      <ScientistMode />
      <Body />
      <Footer />
    </VisibilidadProvider>
    </>
  )
}

export default App