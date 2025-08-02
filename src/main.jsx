import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Chart.js registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Dark mode initialization
const initializeDarkMode = () => {
  // Check for system preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // Check for saved preference
  const savedPreference = localStorage.getItem('darkMode');
  
  if (savedPreference !== null) {
    document.documentElement.classList.toggle('dark', savedPreference === 'true');
  } else {
    document.documentElement.classList.toggle('dark', systemPrefersDark);
  }
};

initializeDarkMode();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
