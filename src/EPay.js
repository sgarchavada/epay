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

    const blurStyle = `
    body.blur *:not(#epay-comp) {
      filter: blur(5px);
      transition: filter 0.3s ease-in-out;
    }
  `;

  if (open) {
    document.body.classList.add('blur');
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = blurStyle;
    styleSheet.id = "blur-style";
    document.head.appendChild(styleSheet);
  } else {
    document.body.classList.remove('blur');
    const styleSheet = document.getElementById("blur-style");
    if (styleSheet) {
      document.head.removeChild(styleSheet);
    }
  }


    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      document.body.classList.remove('blur');
      const styleSheet = document.getElementById("blur-style");
      if (styleSheet) {
        document.head.removeChild(styleSheet);
      }
    };
  }, [onClose]);

	if (!open) return null;

  const style = {
		position: 'fixed',
		top: '0',
		left: '50%',
		transform: 'translate(-50%, -0%)',
		width: detectMob() ? '100vw' : '400px',
		height: '100vh',
		outline: 'none',
		'box-shadow': '10px lightblue',
    'max-height': detectMob() ? '100vh' : '900px',
    'border-left': '1px solid #F3F0F0',
    'border-right': '1px solid #F3F0F0',
		'z-index': 1000, // Ensure the modal is on top of other elements
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
    modalContent,
    document.body // Render the modal into the body element
  );
}