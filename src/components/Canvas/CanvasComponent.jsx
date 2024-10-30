'use client';
import { Eraser, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useTheme } from 'next-themes';
import usePlan from '@/hooks/usePlan';
import useRole from '@/hooks/useRole';
import { redirect } from 'next/navigation';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const { setTheme, resolvedTheme } = useTheme();

  const [plan] = usePlan();
  const [role] = useRole();
  if (plan === 'Basic' || !role === 'admin') redirect('/dashboard');

  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [eraserWidth, setEraserWidth] = useState(10);
  const [isEraser, setIsEraser] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleClearCanvas = () => {
    canvasRef.current.clearCanvas();
  };

  useEffect(() => {
    if (resolvedTheme) {
      setDarkMode(resolvedTheme === 'dark');
      setMounted(true);
    }
  }, [resolvedTheme]);

  return (
    <>
      <div className="flex flex-col items-center mx-auto mb-4">
        <hspan className="font-semibold text-[1.5rem] leading-8 sm:text-4xl sm:leading-tight ">Drawing Canvas</hspan>
      </div>
      <div className="flex flex-col items-center p-2 h-full">
        {/* Controls Section */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-center space-x-4 mb-4">
          {/* First div */}
          <div className="flex justify-center items-center gap-5">
            {/* Color Picker */}
            <div className="flex items-center gap-4 mr-2">
              <label className=" text-lg leading-8">Choose Color:</label>
              <input
                type="color"
                value={strokeColor}
                onChange={e => setStrokeColor(e.target.value)} 
                className="w-10 h-10 cursor-pointer"
                title="Pick a color"
                disabled={isEraser} 
              />
            </div>

            <div className="flex flex-col justify-center items-center ">
              {/* Pen Size */}
              <div className="flex items-center space-x-2">
                <label className=" flex items-center gap-2 text-lg">
                  <Pencil /> Pencil Size
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={strokeWidth}
                  onChange={e => setStrokeWidth(parseFloat(e.target.value))}
                  className="w-24"
                  disabled={isEraser} // Disable pen size when eraser is active
                />
              </div>

              {/* Eraser Size */}
              <div className="flex items-center space-x-2">
                <label className="flex items-center gap-2 text-lg">
                  <Eraser /> Eraser Size
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={eraserWidth}
                  onChange={e => setEraserWidth(parseFloat(e.target.value))}
                  className="w-24"
                  disabled={!isEraser} // Only enable eraser size when eraser is active
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {/* Tool Selection */}
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEraser(false)}
                className={`px-4 py-2 rounded flex items-center gap-2 hover:shadow-lg ${
                  !isEraser ? 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-md text-white' : 'bg-gray-300'
                }`}
              >
                <Pencil /> <span>Pencil</span>
              </button>
              <button
                onClick={() => setIsEraser(true)}
                className={`px-4 py-2 rounded flex items-center gap-2 hover:shadow-lg  ${
                  isEraser ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md ' : 'bg-gray-300'
                }`}
              >
                <Eraser /> <span>Eraser</span>
              </button>
            </div>

            {/* Clear Button */}
            <button
              onClick={handleClearCanvas}
              className="px-4 py-2 flex items-center gap-2 bg-red-500 hover:bg-red-600 hover:shadow-lg text-white rounded"
            >
              <Trash2 /> <span>Clear Canvas</span>
            </button>
          </div>
        </div>

        {/* Canvas Section */}
        <div className="w-full h-[400px] md:h-[650px] border border-gray-200 rounded-lg">
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={isEraser ? eraserWidth : strokeWidth} // Adjust width based on tool
            strokeColor={isEraser ? 'white' : strokeColor} // Set eraser to "white" (canvas color)
            canvasColor={'white'}
            allowOnlyPointerType="all"
          />
        </div>
      </div>
    </>
  );
};

export default CanvasComponent;
