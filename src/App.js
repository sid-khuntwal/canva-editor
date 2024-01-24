import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { templateData } from "./templateData";

const App = () => {
  const canvasRef = useRef(null);
  const hiddenFileInput = useRef(null);
  const [buttonText, setButtonText] = useState("Contact Us");
  const [captionText, setCaptionText] = useState(
    "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs"
  );
  const [imgUrl, setImgUrl] = useState(
    "https://static.tnn.in/photo/msid-107047749/107047749.jpg"
  );

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

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

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);



    context.fillStyle = "#000";
    context.font = "20px Arial";
    context.textAlign = "left";
    // context.textBaseline = "bottom";

    const lines = textLines(
      captionText,
      templateData.caption.max_characters_per_line
    );

    let y = canvasRef.current.height - 135;
    const x = 30;


    lines.forEach((line) => {
      context.fillText(line, x, y);
      y += 22;
    });



    drawImage();
    drawButton(context);
  };

  const textLines = (text, maxLines) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      const Line = currentLine ? `${currentLine} ${word}` : word;

      if (Line.length <= maxLines) {
        currentLine = Line;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

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
        <div className=" text-center p-2 mb-10">
          <h1 className="p-1 mt-5 font-semibold text-2xl">Ad customisation</h1>
          <p className="text-gray-400 text-sm">
            Customise your add and get the templates accordingly
          </p>
        </div>

        <div className="border-2 p-3 rounded-xl">
          <div className="flex items-center">
            <p className="text-sm">Change AD image</p>
            <p
              className="ml-1 underline text-blue-700 cursor-pointer"
              onClick={handleClick}
            >
              Select
              <input
                ref={hiddenFileInput}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={(event) => handleImgChange(event)}
              />
            </p>
          </div>
        </div>

        <div className="flex py-5 items-center my-5">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">
            Edit Contents
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <div className=" flex flex-col gap-2">
          <div className="border-2 py-2 px-4 rounded-xl">
            <p className="text-gray-500 text-sm w-full">Caption</p>
            <div className="flex">
              <input
                className="text-md w-full focus:border-transparent focus:outline-none"
                type="text"
                value={captionText}
                onChange={(event) => handleCaptionChange(event)}
              />
            </div>
          </div>

          <div className="border-2 px-4 py-2 rounded-xl">
            <p className="text-gray-500 text-sm w-full">CTA</p>
            <input
              className="text-md w-full focus:border-transparent focus:outline-none"
              type="text"
              value={buttonText}
              onChange={(event) => handleBtnInput(event)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
