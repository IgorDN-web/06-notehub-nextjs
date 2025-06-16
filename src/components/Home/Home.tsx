import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <h1>Welcome to Your Notes App</h1>
      <p>Manage your notes easily and efficiently.</p>
      <Link to="/notes" className={styles.link}>
        Go to Notes
      </Link>
    </div>
  );
};

export default Home;
