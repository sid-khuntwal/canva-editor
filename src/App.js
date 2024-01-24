import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { templateData } from "./templateData";

const App = () => {
  const canvasRef = useRef(null);
  const [buttonText, setButtonText] = useState("Contact Us");
  const [captionText, setCaptionText] = useState(
    "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs"
  );
  const [imgUrl, setImgUrl] = useState(
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/383834719.jpg?k=a8ed632aeaf2eb621e6753e941d4fb2f858005614b603cdef5bfe644ce1a1906&o=&hp=1"
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const canvasWidthInInches = 3.6;
    const canvasHeightInInches = 3.6;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const canvasWidthInPixels = canvasWidthInInches * devicePixelRatio * 96;
    const canvasHeightInPixels = canvasHeightInInches * devicePixelRatio * 96;

    canvas.width = canvasWidthInPixels;
    canvas.height = canvasHeightInPixels;

    canvas.style.width = `${canvasWidthInInches}in`;
    canvas.style.height = `${canvasHeightInInches}in`;

    drawImage();
    drawButton(context);
    drawCaption(context);
  }, []);

  const drawImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
      const targetWidth = canvas.width * 0.6;
      const targetHeight = canvas.height * 0.6;

      const x = (canvas.width - targetWidth) / 2;
      const y = (canvas.height - targetHeight) * 0.075;

      context.drawImage(img, x, y, targetWidth, targetHeight);
    };
  };

  const handleImgChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgUrl(imageUrl);
    }
  };

  useEffect(() => {
    drawImage();
  }, [imgUrl]);

  //Button

  const drawButton = (context) => {
    const buttonWidth = 100;
    const buttonHeight = 40;
    const buttonX = canvasRef.current.width - 200;
    const buttonY = canvasRef.current.height - 150;


    context.fillStyle = "#3498db";
    context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

    context.fillStyle = "#ffffff";
    context.font = "16px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(
      buttonText,
      buttonX + buttonWidth / 2,
      buttonY + buttonHeight / 2
    );
  };

  const handleBtnInput = (event) => {
    setButtonText(event.target.value);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    drawButton(context);
  }, [buttonText]);

  // Caption

  const drawCaption = (context) => {
    const buttonWidth = 200;
    const buttonHeight = 100;
    const buttonX = 80;
    const buttonY = canvasRef.current.height - 150;

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    context.fillStyle = "pink";
    context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

    context.fillStyle = "#000";
    context.font = "16px Arial";
    context.textAlign = "right";
    context.textBaseline = "bottom";
    context.fillText(
      captionText,
      buttonX + buttonWidth / 2,
      buttonY + buttonHeight / 2
    );

    drawImage();
    drawButton(context);
  };

  const handleCaptionChange = (event) => {
    setCaptionText(event.target.value);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    drawCaption(context);
  }, [captionText]);

  return (
    <div className="parent">
      <div className="canvas-parent">
        <div className="canvas-container">
          <canvas ref={canvasRef} />
        </div>
      </div>
      <div className="panel-parent">
        <div className="panel-container">
          <div className="panel-heading">
            <div>
              <h3>AD Customization</h3>
            </div>

            <div>XYZ</div>
          </div>
          <div className="panel-content">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImgChange(event)}
              />
            </div>

            <div>
              <label>CTA</label>
              <input
                type="text"
                value={buttonText}
                onChange={(event) => handleBtnInput(event)}
              />
            </div>

            <div>
              <label>Caption Text:</label>
              <input
                type="text"
                value={captionText}
                onChange={(event) => handleCaptionChange(event)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
