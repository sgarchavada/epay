import ReactDOM from 'react-dom';
import React, { useEffect } from "react";

export const EPay = (props) => {
  const { open, onClose } = props;

  const detectMob = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  useEffect(() => {
    function handleMessage(event) {
      if (event.data === 'closeModal') {
        onClose();
      }
    }

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onClose]);

  if (!open) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    overflow: 'hidden',
  };

  const style = {
    position: 'fixed',
    top: detectMob() ? '0' : '5%',
    left: '50%',
    transform: 'translate(-50%, -0%)',
    width: detectMob() ? '100vw' : '400px',
    height: '100vh',
    outline: 'none',
    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.2)',
    maxHeight: detectMob() ? '100vh' : '90%',
    'border-left': '1px solid #F3F0F0',
    'border-right': '1px solid #F3F0F0',
    'z-index': 1000, // Ensure the modal is on top of other elements,
    overflow: 'auto',
  };

  const merchantURL = window.location.origin;

  const modalContent = (
    <div style={style} id="epay-comp">
      <iframe
        className="epay-iframe"
        src={`http://localhost:3000?url=${merchantURL}`}
        width="100%"
        height="100%"
        frameBorder={0}
      />
    </div>
  );

  return ReactDOM.createPortal(
    <>
      <div style={overlayStyle}></div>
      {modalContent}
    </>,
    document.body // Render the modal into the body element
  );
}