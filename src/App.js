import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div style={styles.app}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        style={styles.logo}
        alt="logo"
      />

      <a
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.link}
      >
        Implementation: of Docker and Jenkins on the Ubuntu server completed and learning from Udemy course.
      </a>

      <p style={styles.version}>
        Application version: 95
      </p>
    </div>
  );
}

export default App;
