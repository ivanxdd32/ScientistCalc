// App.jsx
import { motion, AnimatePresence } from "framer-motion";
import { VisibilidadProvider, useVisibilidad } from './Components/VisibilidadContext';
import Header from './Components/Header';
import Body from './Components/Body';
import ScientistMode from './Components/ScientistMode';
import Footer from './Components/Footer';

function AppContent() {
  const { isVisible } = useVisibilidad();

  return (
    <>
    <AnimatePresence mode="wait">
      {isVisible ? (
        <>
          <motion.div
            key="header-scientist"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Header />
          </motion.div>

          <motion.div
            key="scientist"
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: 1,
              y: 0,
              x: [0, -2, 2, -2, 2, 0], // temblor
            }}
            exit={{ y: 300, rotate: 10, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ScientistMode />
          </motion.div>

          <motion.div
            key="footer-scientist"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Footer />
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            key="header-body"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Header />
          </motion.div>

          <motion.div
            key="body"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Body />
          </motion.div>

          <motion.div
            key="footer-body"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Footer />
          </motion.div>
        </>
      )}
    </AnimatePresence>
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
