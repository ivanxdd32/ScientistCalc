import Header from './Components/Header';
import Main from './Components/Body';
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
      <Main />
      <Footer />
    </VisibilidadProvider>
    </>
  )
}

export default App