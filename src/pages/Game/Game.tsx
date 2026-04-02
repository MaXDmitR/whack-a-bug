import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { FaBug } from 'react-icons/fa'; // Використовуємо одну іконку бага
import { incrementScore, resetScore, setBestScore } from '../../store/gameSlice';
import styles from '../../App.module.css';

function Game() {
  const dispatch = useAppDispatch();
  const score = useAppSelector((state) => state.game.score);
  const playerName = useAppSelector((state) => state.game.playerName);

  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30); // Гра триває 30 секунд
  const [isGameOver, setIsGameOver] = useState(false);


  const moveBug = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * 16);
    setActiveCell(randomIndex);
  }, []);


  useEffect(() => {
    dispatch(resetScore());
    const bugInterval = setInterval(moveBug, 800); 
    const gameTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(bugInterval);
          clearInterval(gameTimer);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(bugInterval);
      clearInterval(gameTimer);
    };
  }, [dispatch, moveBug]);

  // Збереження рекорду при завершенні гри
  useEffect(() => {
    if (isGameOver) {
      dispatch(setBestScore({ name: playerName, score: score }));
    }
  }, [isGameOver, dispatch, playerName, score]);

  const handleWhack = (index: number) => {
    if (index === activeCell && !isGameOver) {
      dispatch(incrementScore());
      setActiveCell(null);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Злови Бага! 🐛</h1>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <p>Гравець: <strong>{playerName}</strong> | Час: <strong>{timeLeft}с</strong></p>
          <p>Рахунок: <strong style={{fontSize: '2rem', color: '#e67e22'}}>{score}</strong></p>
          <Link to="/" className={styles.btnmenu}>В меню</Link>
        </div>
      </header>

      {isGameOver ? (
        <div style={{ textAlign: 'center' }}>
          <h2>Гра закінчена!</h2>
          <button onClick={() => window.location.reload()} className={styles.btnPrimary}>Спробувати ще</button>
        </div>
      ) : (
        <main className={styles.board} style={{ gridTemplateColumns: 'repeat(4, 80px)' }}>
          {Array.from({ length: 16 }).map((_, index) => (
            <div
              key={index}
              onClick={() => handleWhack(index)}
              style={{
                width: '80px',
                height: '80px',
                // Колір міняється на червоний, якщо там баг
                backgroundColor: index === activeCell ? '#e74c3c' : 'var(--card-bg)', 
                color: 'white', // Зробимо текст білим для обох станів
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '2.5rem',
                fontWeight: 'bold', // Знак питання буде жирним
                transition: 'background-color 0.2s ease', // Плавна зміна кольору
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Тінь, щоб виглядали як картки
              }}
            >
              {/* Тернарний оператор: іконка або знак питання */}
              {index === activeCell ? <FaBug color="white" /> : '?'}
            </div>
          ))}
        </main>
      )}
    </div>
  );
}

export default Game;