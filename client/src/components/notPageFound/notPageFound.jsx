import React from 'react';

const NotFoundPage = ({navigate}) => {
  return (
    <div style={styles.container}>
      <p style={styles.image}>404</p>
      <h1 style={styles.title}>Página no encontrada</h1>
      <p style={styles.message}>Lo sentimos, la página que estás buscando no existe.</p>
      <button onClick={() => navigate("/home")}>Home</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    fontSize: "10em",
    filter: "drop-shadow(0 0 15px #646cff)",
    fontFamily: "'Anton', sans-serif",
    letterSpacing: "10px",
    textShadow: "2px 1px 1px black",
    color:"#646cff",
  },
  title: {
    fontSize: '24px',
    color: '#414141',
  },
  message: {
    fontSize: '16px',
    color: '#666',
  },
};

export default NotFoundPage;