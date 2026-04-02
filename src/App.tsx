import  { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Home from './pages/Home/Home';
import Game from './pages/Game/Game';
import styles from './App.module.css';

// Створюємо компонент-обгортку, щоб мати доступ до ThemeContext для зміни фону всього додатку
const AppContent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.container} ${theme === 'light' ? styles.lightTheme : styles.darkTheme}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;