import React, { useRef, useEffect, useState } from 'react';
import './App.css'
import { templateData } from './templateData';

const App = () => {
  const canvasRef = useRef(null);
  const [buttonText, setButtonText] = useState('Contact Us');
  const [captionText, setCaptionText] = useState('1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const canvasWidthInInches = 3.6;
    const canvasHeightInInches = 3.6;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const canvasWidthInPixels = canvasWidthInInches * devicePixelRatio * 96;
    const canvasHeightInPixels = canvasHeightInInches * devicePixelRatio * 96;

    canvas.width = canvasWidthInPixels;
    canvas.height = canvasHeightInPixels;

    canvas.style.width = `${canvasWidthInInches}in`;
    canvas.style.height = `${canvasHeightInInches}in`;

    drawButton(context);
    drawCaption(context);
    console.log("reset")

  }, []);

  const handleImgChange = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);

          const targetWidth = canvas.width * 0.6;
          const targetHeight = canvas.height * 0.6;

          const x = (canvas.width - targetWidth) / 2;
          const y = (canvas.height - targetHeight) * 0.075;

          context.drawImage(img, x, y, targetWidth, targetHeight);
          drawButton(context);
          drawCaption(context);
        };
      };

      reader.readAsDataURL(file);

    }
  }


  //Button 

  const drawButton = (context) => {
    const buttonWidth = 100;
    const buttonHeight = 40;
    const buttonX = (canvasRef.current.width - 200);
    const buttonY = canvasRef.current.height - 150;

    // Draw button background
    context.fillStyle = '#3498db'; // Blue color, you can change it
    context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

    // Draw button text
    context.fillStyle = '#ffffff'; // White color, you can change it
    context.font = '16px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(buttonText, buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawButton(context);
  }, [buttonText])

  const handleBtnInput = (event) => {
    setButtonText(event.target.value);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawButton(context);
    drawCaption(context);
  }

  // Caption 

  const drawCaption = (context) => {
    const captionX = 80;
    const captionY = canvasRef.current.height - 130;

    // Draw caption text
    context.fillStyle = '#000000'; // Black color, you can change it
    context.font = '12px Arial';
    context.textAlign = 'left';
    context.textBaseline = 'bottom';
    context.fillText(captionText, captionX, captionY);
  };

  const handleCaptionChange = (event) => {
    setCaptionText(event.target.value);

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawButton(context);
    drawCaption(context);
  };

  return (
    <div className='parent'>
      <div className='canvas-parent'>
        <div className="canvas-container">
          <canvas ref={canvasRef} />
        </div>
      </div>
      <div className='panel-parent'>
        <div className='panel-container'>
          <div className='panel-heading'>
            <div><h3>AD Customization</h3></div>

            <div>XYZ</div>
          </div>
          <div className='panel-content'>
            <div>
              <input type='file' accept='image/*' onChange={(event) => handleImgChange(event)} />
            </div>

            <div>
              <label>CTA</label>
              <input type='text' value={buttonText} onChange={(event) => handleBtnInput(event)} />
            </div>

            <div>
              <label>Caption Text:</label>
              <input type='text' value={captionText} onChange={(event) => handleCaptionChange(event)} />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
