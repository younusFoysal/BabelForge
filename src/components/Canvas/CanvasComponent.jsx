import { Eraser, Pencil, Trash2 } from 'lucide-react';
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
        <>
            <div className="flex flex-col items-center mx-auto mb-4">
                <h1 className="font-semibold text-[1.5rem] leading-8 sm:text-4xl sm:leading-tight mb-4 block">
                    Drawing Canvas
                </h1>
                <h2 className="font-semibold text-[1.25rem] leading-7 sm:text-2xl sm:leading-tight mb-2 block">
                    Draw your task plan
                </h2>
            </div>
            <div className="flex flex-col items-center p-4 h-full">
                {/* Controls Section */}
                <div className="flex flex-col-reverse md:flex-row items-center justify-center space-x-4 mb-4">
                    {/* First div */}
                    <div className='flex justify-center items-center gap-5'>
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
                            <label className="text-sm"><Pencil/></label>
                            <input
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
                            <label className="text-sm"><Eraser/></label>
                            <input
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
                    </div>

                    <div className='flex gap-3'>
                        {/* Tool Selection */}
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setIsEraser(false)}
                                className={`px-4 py-2 rounded ${!isEraser ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            >
                                <Pencil/>
                            </button>
                            <button
                                onClick={() => setIsEraser(true)}
                                className={`px-4 py-2 rounded ${isEraser ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            >
                                <Eraser/>
                            </button>
                        </div>

                        {/* Clear Button */}
                        <button
                            onClick={handleClearCanvas}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            <Trash2/>
                        </button>
                    </div>
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
        </>
    );
};

export default CanvasComponent;
