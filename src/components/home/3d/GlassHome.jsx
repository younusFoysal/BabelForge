// pages/index.js
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model({ scrollPosition, mousePosition }) {
    const { scene, animations } = useGLTF('/pearl_electron.glb');
    const mixer = useRef();
    const modelRef = useRef();

    // Create animation mixer and clips
    useEffect(() => {
        if (animations && animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene);
            animations.forEach((clip) => mixer.current.clipAction(clip).play());
        }
    }, [animations, scene]);

    // Update the animation, scale, movement, and rotation based on scroll and mouse
    useFrame((state, delta) => {
        if (mixer.current) {
            // Keep animation running slowly on load
            mixer.current.update(delta * 0.5);
        }

        if (modelRef.current) {
            // Move the model from right to left along a 45-degree diagonal line
            const positionValue = scrollPosition * 5;
            modelRef.current.position.set(-positionValue, -positionValue, 0); // Invert the values for right-to-left

            // Scale the object based on scroll, starting smaller
            const baseScale = 0.2; // Set the initial smaller scale
            const scaleValue = baseScale + scrollPosition * 2; // Grow as you scroll
            modelRef.current.scale.set(scaleValue, scaleValue, scaleValue);

            // Rotate the object based on mouse position
            const { x, y } = mousePosition;
            modelRef.current.rotation.y = (x / window.innerWidth) * Math.PI * 2; // Y-axis rotation
            modelRef.current.rotation.x = (y / window.innerHeight) * Math.PI * 0.5; // X-axis rotation
        }
    });

    return <primitive object={scene} ref={modelRef} />;
}

export default function Home() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Handle scroll event
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollFraction = scrollY / maxScroll;
        setScrollPosition(scrollFraction); // This will control size, movement, and speed
    };

    // Handle mouse movement event
    const handleMouseMove = (event) => {
        setMousePosition({
            x: event.clientX,
            y: event.clientY,
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="relative"> {/* Increased height for scrolling */}
            {/* Fixed 3D Canvas */}
            <div className="fixed inset-0 -z-20">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Model scrollPosition={scrollPosition} mousePosition={mousePosition} />
                </Canvas>
            </div>

            {/* Scrollable content */}
            <div className="relative z-0">
            </div>
        </div>
    );
}
