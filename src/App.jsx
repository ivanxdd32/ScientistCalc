// App.jsx
import { VisibilidadProvider, useVisibilidad } from './Components/VisibilidadContext';
import Header from './Components/Header';
import Body from './Components/Body';
import ScientistMode from './Components/ScientistMode';
import Footer from './Components/Footer';
import './Styles/App.css';

function AppContent() {
  const { isVisible } = useVisibilidad();

  return (
    <>
      <Header />
      {isVisible ? <ScientistMode /> : <Body />}
      <Footer />
    </>
  );
}

function App() {
  return (
    <VisibilidadProvider>
      <AppContent />
    </VisibilidadProvider>
  );
}

export default App;
