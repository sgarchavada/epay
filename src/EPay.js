import ReactDOM from 'react-dom';
import React, { useEffect } from "react";

export const EPay = (props) => {
	const {open, onClose} = props;

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

  const style = {
    position: 'absolute',
		display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
		width: '100vw',
		height: '100vh',
		outline: 'none',
    backgroundColor: '#00000020',
		'z-index': 1000, // Ensure the modal is on top of other elements
	};

	const merchantURL = window.location.origin; 

	const modalContent = (
    <div style={style} id="epay-comp">
      <iframe
        className="epay-iframe"
        src={`http://localhost:3000?url=${merchantURL}`}
        width={detectMob() ? '100vw' : '400px'}
        height="100%"
        frameBorder={0}
      />
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.body // Render the modal into the body element
  );
}