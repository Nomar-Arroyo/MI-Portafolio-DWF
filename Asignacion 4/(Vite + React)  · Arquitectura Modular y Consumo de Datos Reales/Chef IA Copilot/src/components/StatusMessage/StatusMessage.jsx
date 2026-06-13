import React from 'react';
import './StatusMessage.css';

const StatusMessage = ({ type, message }) => {
  return (
    <div className={`status-container ${type}`}>
      {type === 'loading' && <div className="spinner"></div>}
      <p className="status-text">{message}</p>
    </div>
  );
};

export default StatusMessage;