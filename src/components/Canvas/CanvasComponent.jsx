import { useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const CanvasComponent = () => {
    const canvasRef = useRef(null);

    // State for tool settings
    const [strokeColor, setStrokeColor] = useState("#000000"); // Default black
    const [strokeWidth, setStrokeWidth] = useState(4);         // Default pen size
    const [eraserWidth, setEraserWidth] = useState(10);        // Default eraser size
    const [isEraser, setIsEraser] = useState(false);           // Track current tool (pen or eraser)

    const handleClearCanvas = () => {
        canvasRef.current.clearCanvas();
    };

    return (
        <div className="flex flex-col items-center p-4">
            {/* Controls Section */}
            <div className="flex justify-center space-x-4 mb-4">
                {/* Color Picker */}
                <div>
                    <input
                        type="color"
                        value={strokeColor}
                        onChange={(e) => setStrokeColor(e.target.value)}
                        className="w-10 h-10 cursor-pointer"
                        title="Pick a color"
                        disabled={isEraser} // Disable color picker in eraser mode
                    />
                </div>

                {/* Pen Size */}
                <div className="flex items-center space-x-2">
                    <label htmlFor="penSize" className="text-sm">Pen Size</label>
                    <input
                        id="penSize"  // Added id
                        type="range"
                        min="1"
                        max="20"
                        step="0.5"
                        value={strokeWidth}
                        onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
                        className="w-24"
                        disabled={isEraser} // Disable pen size when eraser is active
                    />
                </div>

                {/* Eraser Size */}
                <div className="flex items-center space-x-2">
                    <label htmlFor="eraserSize" className="text-sm">Eraser Size</label>
                    <input
                        id="eraserSize"  // Added id
                        type="range"
                        min="5"
                        max="30"
                        step="1"
                        value={eraserWidth}
                        onChange={(e) => setEraserWidth(parseFloat(e.target.value))}
                        className="w-24"
                        disabled={!isEraser} // Only enable eraser size when eraser is active
                    />
                </div>

                {/* Tool Selection */}
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsEraser(false)}
                        className={`px-4 py-2 rounded ${!isEraser ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        Pen
                    </button>
                    <button
                        onClick={() => setIsEraser(true)}
                        className={`px-4 py-2 rounded ${isEraser ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        Eraser
                    </button>
                </div>

                {/* Clear Button */}
                <button
                    onClick={handleClearCanvas}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                >
                    Clear Canvas
                </button>
            </div>

            {/* Canvas Section */}
            <div className="w-full h-[500px] border border-gray-300 rounded-md">
                <ReactSketchCanvas
                    ref={canvasRef}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    strokeWidth={isEraser ? eraserWidth : strokeWidth} // Adjust width based on tool
                    strokeColor={isEraser ? "white" : strokeColor}      // Set eraser to "white" (canvas color)
                    canvasColor="white"
                    allowOnlyPointerType="all"
                />
            </div>
        </div>
    );
};

export default CanvasComponent;
