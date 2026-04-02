import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useForm } from 'react-hook-form';
import { setPlayerName } from '../../store/gameSlice';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './Home.module.css';

interface FormInputs {
  playerName: string;
}

const Home = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const bestScores = useAppSelector((state) => state.game.bestScores);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      playerName: ''
    }
  });


  const watchedName = watch('playerName');


  const currentRecord = watchedName ? bestScores[watchedName] : null;

  const onSubmit = (data: FormInputs) => {
    dispatch(setPlayerName(data.playerName));
    navigate('/game');
  };

  return (
    <div className={styles.homeContainer}>
      <h1>Гра "Пам'ять"</h1>


      <div style={{ height: '60px' }}>
        {currentRecord ? (
          <h3 style={{ color: '#f39c12' }}>
            Привіт, {watchedName}! Твій рекорд: {currentRecord} ходів
          </h3>
        ) : watchedName.length >= 3 ? (
          <h3 style={{ color: '#27ae60' }}>Новий гравець? Удачі!</h3>
        ) : null}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Введи своє ім'я..."
            className={`${styles.input} ${errors.playerName ? styles.inputError : ''}`}
            {...register('playerName', {
              required: "Ім'я обов'язкове",
              minLength: { value: 3, message: "Мінімум 3 символи" }
            })}
          />
          {errors.playerName && <span className={styles.errorText}>{errors.playerName.message}</span>}
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.playButton}>Почати гру</button>
          <button type="button" onClick={toggleTheme} className={styles.themeBtn}>
            Змінити тему
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;