import React, { useState } from 'react';

const CopyTextButton = () => {
  const [message, setMessage] = useState('');

  const copyToClipboard = () => {
    const textToCopy = JSON.stringify([
      {
        question_text: "What is the capital of India?",
        options: {
          a: "New Delhi",
          b: "Mumbai",
          c: "Kolkata",
          d: "Chennai"
        },
        correct_answer: "a"
      },
      {
        question_text: "Who was the first Prime Minister of India?",
        options: {
          a: "Jawaharlal Nehru",
          b: "Sardar Vallabhbhai Patel",
          c: "Indira Gandhi",
          d: "Rajendra Prasad"
        },
        correct_answer: "a"
      }
    ]);

    navigator.clipboard.writeText(textToCopy)
      .then(() => setMessage('✅ Text copied to clipboard!'))
      .catch(() => setMessage('❌ Failed to copy text.'));
  };

  // Styles object for easy customization
  const styles = {
    container: {
      maxWidth: '500px',
      margin: '30px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      color: '#333',
      lineHeight: '1.5',
    },
    message: {
      marginBottom: '15px',
      fontWeight: '600',
      fontSize: '14px',
      minHeight: '24px',
      color: message.includes('Failed') ? '#d9534f' : '#28a745',
    },
    button: {
      cursor: 'pointer',
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
      userSelect: 'none',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    note: {
      marginTop: '25px',
      fontSize: '13px',
      color: '#555',
      textAlign: 'justify',
    },
    noteTitle: {
      fontWeight: '700',
      marginBottom: '10px',
      fontSize: '15px',
    },
    list: {
      paddingLeft: '20px',
      lineHeight: '1.7',
    }
  };

  // For button hover effect
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.message}>{message}</div>
      <button
        style={{ 
          ...styles.button, 
          ...(isHovered ? styles.buttonHover : {}) 
        }}
        onClick={copyToClipboard}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Copy sample questions to clipboard"
      >
        Copy Sample Questions
      </button>

      <div style={styles.note}>
        <p style={styles.noteTitle}>Text copy sample question:</p>
        <ul style={styles.list}>
          <li>By clicking on the button above, the sample questions will be copied to your clipboard.</li>
          <li>Paste it in ChatGPT and ask for questions on any topic in this format.</li>
          <li>You can use this to easily request questions on various subjects and formats.</li>
          <li>Once you have copied the text, you can paste it below:</li>
        </ul>
      </div>
    </div>
  );
};

export default CopyTextButton;
