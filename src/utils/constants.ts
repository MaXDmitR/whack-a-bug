import { FaApple, FaBug, FaCar, FaDog, FaFrog, FaHeart, FaMoon, FaStar } from 'react-icons/fa';

// Масив унікальних іконок
const ICONS = [FaApple, FaBug, FaCar, FaDog, FaFrog, FaHeart, FaMoon, FaStar];

// Функція для генерації та перемішування колоди карток
export const generateCards = () => {
  return [...ICONS, ...ICONS]
    .sort(() => Math.random() - 0.5)
    .map((Icon, index) => ({
      id: index,
      Icon,
      isFlipped: false,
      isMatched: false,
    }));
};