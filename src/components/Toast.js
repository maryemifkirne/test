import React, { useState, useEffect } from 'react';
import { MdCheckCircle, MdError, MdInfo, MdClose } from 'react-icons/md';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <MdCheckCircle />;
      case 'error': return <MdError />;
      case 'info': return <MdInfo />;
      default: return <MdCheckCircle />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success': return { bg: '#10B981', border: '#059669' };
      case 'error': return { bg: '#EF4444', border: '#DC2626' };
      case 'info': return { bg: '#3B82F6', border: '#2563EB' };
      default: return { bg: '#10B981', border: '#059669' };
    }
  };

  const colors = getColors();

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: colors.bg,
        color: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: '300px',
        maxWidth: '500px',
        zIndex: 9999,
        transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'all 0.3s ease-in-out',
        border: `2px solid ${colors.border}`,
        fontSize: '15px',
        fontWeight: '500'
      }}
    >
      <span style={{ fontSize: '18px' }}>{getIcon()}</span>
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '18px',
          cursor: 'pointer',
          padding: '0',
          opacity: 0.8
        }}
      >
        <MdClose />
      </button>
    </div>
  );
};

export default Toast;