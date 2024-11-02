"use client"
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from "next-themes";

// First model: Right to Left
function ModelRightToLeft({ scrollPosition, mousePosition }) {
    const { scene, animations } = useGLTF('/babellogo.glb'); // First 3D object
    const mixer = useRef();
    const modelRef = useRef();
    const { setTheme, resolvedTheme } = useTheme();

    // Apply color and opacity to the meshes in the model
    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child.isMesh) {
                    // Set the color and opacity for the material
                    //child.material.color = new THREE.Color(0x9a00d6); // Green color
                    child.material.transparent = true;
                    if (resolvedTheme === "dark"){
                        child.material.opacity = 0.7
                    }else {
                        child.material.color = new THREE.Color(0xd624ed);
                        child.material.transparent = false;
                        child.material.opacity = 0.5
                    }
                     // Adjust opacity (0 is fully transparent, 1 is fully opaque)
                }
            });
        }
    }, [scene, resolvedTheme]);

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
            mixer.current.update(delta * 0.5); // Slow down the animation on load
        }

        if (modelRef.current) {
            // Move the model from right to left along a 45-degree diagonal line
            const positionValue = scrollPosition * 5;
            modelRef.current.position.set(-positionValue, -positionValue, 0);

            // Scale the object based on scroll, starting smaller
            const baseScale = 0.2;
            const scaleValue = baseScale + scrollPosition * 0.5;
            modelRef.current.scale.set(scaleValue, scaleValue, scaleValue);

            // Rotate the object based on mouse position
            const { x, y } = mousePosition;
            modelRef.current.rotation.y = (x / window.innerWidth) * Math.PI * 2;
            modelRef.current.rotation.x = (y / window.innerHeight) * Math.PI * 0.5;
        }
    });

    return <primitive object={scene} ref={modelRef} />;
}

// Second model: Left to Right (Different model)
function ModelLeftToRight({ scrollPosition, mousePosition }) {
    const { scene, animations } = useGLTF('/specify_logo_animation.glb'); // Second 3D object
    const mixer = useRef();
    const modelRef = useRef();
    const offset = 4.5; // Set a higher offset for Y-axis positioning

    // Apply color and opacity to the meshes in the model
    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child.isMesh) {
                    // Set the color and opacity for the material
                    child.material.color = new THREE.Color(0xff0000); // Red color
                    child.material.transparent = true;
                    child.material.opacity = 0.3; // Adjust opacity (0 is fully transparent, 1 is fully opaque)
                }
            });
        }
    }, [scene]);

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
            mixer.current.update(delta * 0.5); // Slow down the animation on load
        }

        if (modelRef.current) {
            // Move the model from left to right along a 45-degree diagonal line
            const positionValue = scrollPosition * 5;
            modelRef.current.position.set(positionValue, -positionValue + offset, 0); // Higher position on Y-axis

            // Scale the object based on scroll, starting smaller
            const baseScale = 0.2;
            const scaleValue = baseScale + scrollPosition * 0.5;
            modelRef.current.scale.set(scaleValue, scaleValue, scaleValue);

            // Rotate the object based on mouse position
            const { x, y } = mousePosition;
            modelRef.current.rotation.y = (x / window.innerWidth) * Math.PI * 2;
            modelRef.current.rotation.x = (y / window.innerHeight) * Math.PI * 0.5;
        }
    });

    return <primitive object={scene} ref={modelRef} />;
}

export default function GlassDNA() {
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
        <div className="relative "> {/* Increased height for scrolling */}
            {/* Fixed 3D Canvas */}
            <div className="fixed inset-0 -z-20">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />

                    {/* First model: Right to Left */}
                    <ModelRightToLeft scrollPosition={scrollPosition} mousePosition={mousePosition} />

                    {/* Second model: Left to Right */}
                    <ModelLeftToRight scrollPosition={scrollPosition} mousePosition={mousePosition} />
                </Canvas>
            </div>

            {/* Scrollable content */}
            <div className="relative z-0">
            </div>
        </div>
    );
}
