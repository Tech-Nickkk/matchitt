"use client";

import { useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PuzzleScene() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!canvasContainerRef.current) return;

    // ── Scene ──
    const scene = new THREE.Scene();
    scene.background = null; // Transparent

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    canvasContainerRef.current.appendChild(renderer.domElement);

    // ── Lights ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.0001;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    // ── Load Model ──
    const loader = new GLTFLoader();
    loader.load(
      "/models/matchitt.glb",
      (gltf) => {
        const model = gltf.scene;

        model.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            const mat = (node as THREE.Mesh).material as THREE.MeshStandardMaterial;
            if (mat?.map) {
              mat.map.colorSpace = THREE.SRGBColorSpace;
            }
          }
        });

        // ── Locate the two puzzle halves ──
        const nullNode = model.children[0];
        if (!nullNode?.children || nullNode.children.length < 2) {
          console.warn("PuzzleScene: could not find pieces for split");
          return;
        }

        const redPiece = nullNode.children[0];
        const bluePiece = nullNode.children[1];

        // Save original (merged) positions
        const redOrig = { x: redPiece.position.x, y: redPiece.position.y, z: redPiece.position.z };
        const blueOrig = { x: bluePiece.position.x, y: bluePiece.position.y, z: bluePiece.position.z };

        // ── Group Wrapper for Spin ──
        const group = new THREE.Group();
        // Spin the inner model 180deg so the red piece is in front
        model.rotation.y = Math.PI;
        group.add(model);

        // ── Initial State Matching Image ──
        group.scale.set(0.9, 0.9, 0.9);

        // Position it centered, just below the MATCHITT text matching user image
        group.position.set(0, -0.4, 0);

        // Rotate so it lies somewhat flat but tilted to show stickers
        group.rotation.set(-Math.PI / 10, Math.PI / 8, Math.PI / 4);

        scene.add(group);

        // ── Responsive X position for sliding right ──
        const getResponsiveX = () => {
          if (typeof window === "undefined") return 1.5;
          if (window.innerWidth < 640) return 0.6; // Mobile
          if (window.innerWidth < 1024) return 1.0; // Tablet
          return 1.5; // Desktop
        };

        // ── PHASE 1: Hero Section (Entrance to Exit) ──
        const tlStage1 = gsap.timeline({
          scrollTrigger: {
            trigger: "#page-pin-container",
            start: "top top",
            end: "+=2500", // Smoothly scrolls slowly over 1200px of scrollbar movement!
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Step A: Slide to the right and rotate
        tlStage1.fromTo(
          group.position,
          {
            x: 0,
            y: -0.4,
            z: 0
          },
          {
            x: getResponsiveX() + 5,
            y: -5,
            z: 0,
            ease: "linear",
            duration: 1.0,
            immediateRender: false
          },
          0
        ).fromTo(
          group.rotation,
          {
            x: -Math.PI / 10,
            y: Math.PI / 8,
            z: Math.PI / 4
          },
          {
            x: -Math.PI / 10,
            y: Math.PI,
            z: Math.PI / 4,
            ease: "linear",
            duration: 1.0,
            immediateRender: false
          },
          0
        );

        // ── PHASE 2: About & What We Do Sections (Unified Timeline) ──
        const tlStage2 = gsap.timeline({
          scrollTrigger: {
            trigger: "#about",
            start: "top top", // Starts when #about enters the screen
            end: "+=2500",
            // markers: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Stage A: About Section (Time 0 to 1)
        // Re-entry from the bottom of the right-side paragraph of the About section
        tlStage2.fromTo(
          group.position,
          { x: 7, y: 0, z: 0 },
          { x: 0, y: -0.7, z: 0, ease: "linear", duration: 1, immediateRender: false }
        );
        tlStage2.fromTo(
          group.rotation,
          { x: -Math.PI / 8, y: Math.PI * 2, z: Math.PI / 6 },
          { x: 0, y: Math.PI, z: 0, ease: "linear", duration: 1, immediateRender: false },
          0
        );

        // Stage B: What We Do Section (Time 1 to 2)
        // 1. Move the whole group slightly down and center (splitting a bit lower)
        tlStage2.to(
          group.position,
          {
            x: 0,
            y: -2,
            z: 0.5,
            ease: "linear",
            duration: 1
          },
          1
        );

        // 2. Flatten the Z-rotation so both pieces fly symmetrically on screen
        tlStage2.to(
          group.rotation,
          {
            x: 0,
            y: Math.PI,
            z: 0,
            ease: "linear",
            duration: 1
          },
          1
        );

        // 3. Separate the pieces!
        // Red piece position: moves up and to the right, resting on the top-right side of the screen (next to the text)
        tlStage2.fromTo(
          redPiece.position,
          { x: redOrig.x, y: redOrig.y, z: redOrig.z },
          {
            x: redOrig.x + 8.0,
            y: redOrig.y + 6.0,
            z: redOrig.z,
            ease: "linear",
            duration: 1.0,
            immediateRender: false
          },
          1.0
        );
        // Red piece rotation: spins outward as it separates (matching the pre-detached group tilt)
        tlStage2.fromTo(
          redPiece.rotation,
          { x: 0, y: 0, z: 0 },
          {
            x: -Math.PI / 8,
            y: Math.PI / 4,
            z: Math.PI / 6,
            ease: "linear",
            duration: 1.0,
            immediateRender: false
          },
          1.0
        );

        // Blue piece position: moves up and to the left, resting on the top-left side of the screen (next to the text)
        tlStage2.fromTo(
          bluePiece.position,
          { x: blueOrig.x, y: blueOrig.y, z: blueOrig.z },
          {
            x: blueOrig.x - 8.0,
            y: blueOrig.y + 6.0,
            z: blueOrig.z,
            ease: "linear",
            duration: 1.0,
            immediateRender: false
          },
          1.0
        );
        // Blue piece rotation: spins outward as it separates (matching the pre-detached group tilt)
        tlStage2.fromTo(
          bluePiece.rotation,
          { x: 0, y: 0, z: 0 },
          {
            x: -Math.PI / 8,
            y: -Math.PI / 4,
            z: Math.PI / 6,
            ease: "linear",
            duration: 1.0,
            immediateRender: false
          },
          1.0
        );

        // ── PHASE 3: How We Match Section ──
        const tlStage3 = gsap.timeline({
          scrollTrigger: {
            trigger: "#how-we-match",
            start: "top bottom", // Starts when #how-we-match enters the screen
            end: "bottom top", // Completes when #how-we-match leaves the screen completely
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Move group further down so it sits below the sticky "HOW WE MATCH" text
        tlStage3.to(
          group.position,
          {
            y: -2, // Fixed: -5.0 was completely off-screen at the bottom!
            ease: "linear",
            duration: 1
          },
          0
        );

        // Bring red piece back to original position (connecting from top-right)
        tlStage3.fromTo(
          redPiece.position,
          {
            x: redOrig.x + 6.0,
            y: redOrig.y - 4.0,
            z: redOrig.z
          },
          {
            x: redOrig.x,
            y: redOrig.y,
            z: redOrig.z,
            ease: "linear",
            duration: 1,
            immediateRender: false
          },
          0
        );
        // Bring red piece back to original rotation (unspinning on all axes, matching the pre-detached tilt)
        tlStage3.fromTo(
          redPiece.rotation,
          { x: -Math.PI / 8, y: Math.PI / 4, z: Math.PI / 6 },
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power2.inOut",
            duration: 1,
            immediateRender: false
          },
          0
        );

        // Bring blue piece back to original position (connecting from top-left)
        tlStage3.fromTo(
          bluePiece.position,
          {
            x: blueOrig.x - 6.0,
            y: blueOrig.y - 4.0,
            z: blueOrig.z
          },
          {
            x: blueOrig.x,
            y: blueOrig.y,
            z: blueOrig.z,
            ease: "linear",
            duration: 1,
            immediateRender: false
          },
          0
        );
        // Bring blue piece back to original rotation (unspinning on all axes, matching the pre-detached tilt)
        tlStage3.fromTo(
          bluePiece.rotation,
          { x: -Math.PI / 8, y: -Math.PI / 4, z: Math.PI / 6 },
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power2.inOut",
            duration: 1,
            immediateRender: false
          },
          0
        );

        // ── PHASE 3 (Continued): Split as we scroll away to Contact Section ──
        tlStage3.to(
          redPiece.position,
          { x: redOrig.x + 8.0, ease: "none", duration: 1 },
          1.1 // Start immediately after the join (which takes 1s)
        );
        tlStage3.to(
          redPiece.rotation,
          { x: -Math.PI / 8, y: Math.PI / 4, z: Math.PI / 6, ease: "none", duration: 1 },
          1.1
        );

        tlStage3.to(
          bluePiece.position,
          { x: blueOrig.x - 8.0, ease: "none", duration: 1 },
          1.1
        );
        tlStage3.to(
          bluePiece.rotation,
          { x: -Math.PI / 8, y: -Math.PI / 4, z: Math.PI / 6, ease: "none", duration: 1 },
          1.1
        );

        ScrollTrigger.refresh();
      },
      undefined,
      (error) => console.error("Error loading matchitt.glb:", error)
    );

    // ── Render Loop ──
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ──
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (canvasContainerRef.current && renderer.domElement) {
        canvasContainerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, { dependencies: [] });

  return (
    <div
      ref={canvasContainerRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-10"
    />
  );
}
