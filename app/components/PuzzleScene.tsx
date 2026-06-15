"use client";

import { useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getResponsiveConfig = () => {
  if (typeof window === "undefined") {
    return {
      scale: 1,
      initialX: 0.3,
      initialY: -0.65,
      phase1X: 6.5,
      phase1Y: -5.0,
      phase2StartX: 7.0,
      phase2StartY: -1.1,
      phase2X: 0,
      phase2Y: -1.1,
      phase2Y2: -1.1,
      phase3Y: -1.15,
      splitXOffset: 8.0,
      splitYOffset: 0,
      joinXOffset: 6.0,
      joinYOffset: 0,
      split2XOffset: 8.0,
      stageADuration: 1.0,
      stageBStart: 1.0,
      stageBDuration: 1.5,
      splitOffscreenXOffset: 8.0,
      stageCStart: 2.5,
      stageCDuration: 0.5,
      phase3End: "+=400%",
      totalDurationAnchor: 4.0,
    };
  }
  const width = window.innerWidth;
  if (width < 640) {
    // Mobile
    return {
      scale: 0.52,
      initialX: 0.0,
      initialY: -0.15,
      phase1X: 3.0,
      phase1Y: -3.0,
      phase2StartX: 2.2,
      phase2StartY: -0.45,
      phase2X: 0,
      phase2Y: -0.45,
      phase2Y2: -0.45,
      phase3Y: -0.65,
      splitXOffset: 2.2,
      splitYOffset: 0,
      joinXOffset: 2.5,
      joinYOffset: 0,
      split2XOffset: 3.5,
      stageADuration: 0.3,
      stageBStart: 0.3,
      stageBDuration: 0.6,
      splitOffscreenXOffset: 6.0,
      stageCStart: 0.9,
      stageCDuration: 0.5,
      phase3End: "+=200%",
      totalDurationAnchor: 2.2,
    };
  } else if (width < 1024) {
    // Tablet
    return {
      scale: 0.8,
      initialX: 0.15,
      initialY: -0.53,
      phase1X: 4.0,
      phase1Y: -3.8,
      phase2StartX: 5.2,
      phase2StartY: -0.85,
      phase2X: 0,
      phase2Y: -0.85,
      phase2Y2: -0.85,
      phase3Y: -0.85,
      splitXOffset: 5.5,
      splitYOffset: 0,
      joinXOffset: 4.0,
      joinYOffset: 0,
      split2XOffset: 5.0,
      stageADuration: 0.8,
      stageBStart: 0.8,
      stageBDuration: 1.0,
      splitOffscreenXOffset: 6.0,
      stageCStart: 1.8,
      stageCDuration: 0.5,
      phase3End: "+=280%",
      totalDurationAnchor: 3.2,
    };
  } else {
    // Desktop
    return {
      scale: 1.1,
      initialX: 0.3,
      initialY: -0.65,
      phase1X: 6.5,
      phase1Y: -5.0,
      phase2StartX: 7.2,
      phase2StartY: -1.1,
      phase2X: 0,
      phase2Y: -1.1,
      phase2Y2: -1.1,
      phase3Y: -1.15,
      splitXOffset: 8.0,
      splitYOffset: 0,
      joinXOffset: 6.0,
      joinYOffset: 0,
      split2XOffset: 8.0,
      stageADuration: 1.0,
      stageBStart: 1.0,
      stageBDuration: 1.5,
      splitOffscreenXOffset: 8.0,
      stageCStart: 2.5,
      stageCDuration: 0.5,
      phase3End: "+=400%",
      totalDurationAnchor: 4.0,
    };
  }
};

export default function PuzzleScene() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!canvasContainerRef.current) return;

    // Store timelines for unmount cleanup (prevent hot-reload leaks)
    const timelines: gsap.core.Timeline[] = [];

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
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.15;
    canvasContainerRef.current.appendChild(renderer.domElement);

    // ── Lights ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(3, 6, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.0001;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(8, -2, -5);
    scene.add(fillLight);

    // Store reference to the group wrapper for resizing
    let group: THREE.Group | null = null;

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
            if (mat) {
              if (mat.map) {
                mat.map.colorSpace = THREE.SRGBColorSpace;
              }
              // 0.18,0.05,"#A6C9DF"
              mat.roughness = 0.55;
              mat.metalness = 0.02;
              if (mat.name === "Mat.002") {
                mat.color.set("#BBD7EC");
              }
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
        group = new THREE.Group();
        // Spin the inner model 180deg so the red piece is in front
        model.rotation.y = Math.PI;
        group.add(model);

        // ── Initial State Matching Responsive Design ──
        const initialConfig = getResponsiveConfig();
        group.scale.set(initialConfig.scale, initialConfig.scale, initialConfig.scale);

        // Position it centered/offset, just below the MATCHITT text matching user image
        group.position.set(initialConfig.initialX, initialConfig.initialY, 0);

        // Rotate so it lies somewhat flat but tilted to show stickers
        group.rotation.set(-Math.PI / 10, Math.PI / 8, Math.PI / 4);

        scene.add(group);

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
        timelines.push(tlStage1);

        // Step A: Slide to the right and rotate (using function-based dynamic offsets)
        tlStage1.fromTo(
          group.position,
          {
            x: () => getResponsiveConfig().initialX,
            y: () => getResponsiveConfig().initialY,
            z: 0
          },
          {
            x: () => getResponsiveConfig().phase1X,
            y: () => getResponsiveConfig().phase1Y,
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
            x: Math.PI / 10,
            y: Math.PI * 1.2,
            z: -Math.PI / 4,
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
            end: "+=5000", // Re-increased to slow down the animation
            scrub: 1, // Restored to 1 (direct mapping, no time delay)
            invalidateOnRefresh: true,
          },
        });
        timelines.push(tlStage2);

        const config = getResponsiveConfig();
        const stageADuration = config.stageADuration;
        const stageBStart = config.stageBStart;
        const stageBDuration = config.stageBDuration;

        // Stage A: About Section (Time 0 to stageADuration)
        // Re-entry from the bottom of the right-side paragraph of the About section
        tlStage2.fromTo(
          group.position,
          {
            x: () => getResponsiveConfig().phase2StartX,
            y: () => getResponsiveConfig().phase2StartY,
            z: 0
          },
          {
            x: () => getResponsiveConfig().phase2X,
            y: () => getResponsiveConfig().phase2Y,
            z: 0,
            ease: "linear",
            duration: stageADuration,
            immediateRender: false
          }
        );
        tlStage2.fromTo(
          group.rotation,
          { x: -Math.PI / 8, y: Math.PI * 2, z: Math.PI / 6 },
          { x: 0, y: Math.PI, z: 0, ease: "linear", duration: stageADuration, immediateRender: false },
          0
        );

        // Stage B: What We Do Section (Time stageBStart to stageBStart + stageBDuration)
        // 1. Move the whole group slightly down and center (splitting a bit lower)
        tlStage2.to(
          group.position,
          {
            x: 0,
            y: () => getResponsiveConfig().phase2Y2,
            z: 0.5,
            ease: "linear",
            duration: stageBDuration
          },
          stageBStart
        );

        // 2. Flatten the Z-rotation so both pieces fly symmetrically on screen
        tlStage2.to(
          group.rotation,
          {
            x: 0,
            y: Math.PI,
            z: 0,
            ease: "linear",
            duration: stageBDuration
          },
          stageBStart
        );

        // 3. Separate the pieces!
        // Red piece position: moves up and to the right, resting on the top-right side of the screen
        tlStage2.fromTo(
          redPiece.position,
          { x: redOrig.x, y: redOrig.y, z: redOrig.z },
          {
            x: () => redOrig.x + getResponsiveConfig().splitXOffset,
            y: () => redOrig.y + getResponsiveConfig().splitYOffset,
            z: redOrig.z,
            ease: "linear",
            duration: stageBDuration,
            immediateRender: false
          },
          stageBStart
        );
        // Red piece rotation: spins outward as it separates
        tlStage2.fromTo(
          redPiece.rotation,
          { x: 0, y: 0, z: 0 },
          {
            x: -Math.PI / 8,
            y: Math.PI / 4,
            z: Math.PI / 6,
            ease: "linear",
            duration: stageBDuration,
            immediateRender: false
          },
          stageBStart
        );

        // Blue piece position: moves up and to the left, resting on the top-left side of the screen
        tlStage2.fromTo(
          bluePiece.position,
          { x: blueOrig.x, y: blueOrig.y, z: blueOrig.z },
          {
            x: () => blueOrig.x - getResponsiveConfig().splitXOffset,
            y: () => blueOrig.y + getResponsiveConfig().splitYOffset,
            z: blueOrig.z,
            ease: "linear",
            duration: stageBDuration,
            immediateRender: false
          },
          stageBStart
        );
        // Blue piece rotation: spins outward as it separates
        tlStage2.fromTo(
          bluePiece.rotation,
          { x: 0, y: 0, z: 0 },
          {
            x: -Math.PI / 8,
            y: -Math.PI / 4,
            z: Math.PI / 6,
            ease: "linear",
            duration: stageBDuration,
            immediateRender: false
          },
          stageBStart
        );

        // Stage C: Fly off-screen (Mobile only, or via config values)
        const stageCStart = config.stageCStart;
        const stageCDuration = config.stageCDuration;

        tlStage2.to(
          redPiece.position,
          {
            x: () => redOrig.x + getResponsiveConfig().splitOffscreenXOffset,
            ease: "linear",
            duration: stageCDuration
          },
          stageCStart
        );

        tlStage2.to(
          bluePiece.position,
          {
            x: () => blueOrig.x - getResponsiveConfig().splitOffscreenXOffset,
            ease: "linear",
            duration: stageCDuration
          },
          stageCStart
        );

        // Dummy tween to strictly lock the total timeline duration.
        // This ensures the ratio of stage A vs the total timeline remains exactly as intended,
        // so that the positional alignment of the puzzle splitting remains perfectly locked to the text.
        tlStage2.to({}, { duration: 0.01 }, config.totalDurationAnchor || stageCStart);

        // ── PHASE 3: How We Match Section ──
        const tlStage3 = gsap.timeline({
          scrollTrigger: {
            trigger: "#how-we-match",
            start: "top bottom", // Starts when #how-we-match enters the screen
            end: () => getResponsiveConfig().phase3End,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        timelines.push(tlStage3);

        // Move group further down so it sits below the sticky "HOW WE MATCH" text
        tlStage3.to(
          group.position,
          {
            y: () => getResponsiveConfig().phase3Y,
            ease: "linear",
            duration: 0.4
          },
          0
        );

        // Bring red piece back to original position (connecting from top-right)
        tlStage3.fromTo(
          redPiece.position,
          {
            x: () => redOrig.x + getResponsiveConfig().joinXOffset,
            y: () => redOrig.y - getResponsiveConfig().joinYOffset,
            z: redOrig.z
          },
          {
            x: redOrig.x,
            y: redOrig.y,
            z: redOrig.z,
            ease: "linear",
            duration: 0.4,
            immediateRender: false
          },
          0
        );
        // Bring red piece back to original rotation
        tlStage3.fromTo(
          redPiece.rotation,
          { x: -Math.PI / 8, y: Math.PI / 4, z: Math.PI / 6 },
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power2.inOut",
            duration: 0.4,
            immediateRender: false
          },
          0
        );

        // Bring blue piece back to original position (connecting from top-left)
        tlStage3.fromTo(
          bluePiece.position,
          {
            x: () => blueOrig.x - getResponsiveConfig().joinXOffset,
            y: () => blueOrig.y - getResponsiveConfig().joinYOffset,
            z: blueOrig.z
          },
          {
            x: blueOrig.x,
            y: blueOrig.y,
            z: blueOrig.z,
            ease: "linear",
            duration: 0.4,
            immediateRender: false
          },
          0
        );
        // Bring blue piece back to original rotation
        tlStage3.fromTo(
          bluePiece.rotation,
          { x: -Math.PI / 8, y: -Math.PI / 4, z: Math.PI / 6 },
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power2.inOut",
            duration: 0.4,
            immediateRender: false
          },
          0
        );

        // ── PHASE 3 (Continued): Split and fly offscreen before next section ──
        tlStage3.to(
          redPiece.position,
          { x: () => redOrig.x + getResponsiveConfig().split2XOffset, y: redOrig.y + 8, ease: "power2.in", duration: 0.4 },
          0.45
        );
        tlStage3.to(
          redPiece.rotation,
          { x: -Math.PI / 8, y: Math.PI / 4, z: Math.PI / 6, ease: "none", duration: 0.4 },
          0.45
        );

        tlStage3.to(
          bluePiece.position,
          { x: () => blueOrig.x - getResponsiveConfig().split2XOffset, y: blueOrig.y + 8, ease: "power2.in", duration: 0.4 },
          0.45
        );
        tlStage3.to(
          bluePiece.rotation,
          { x: -Math.PI / 8, y: -Math.PI / 4, z: Math.PI / 6, ease: "none", duration: 0.4 },
          0.45
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

      if (group) {
        const config = getResponsiveConfig();
        group.scale.set(config.scale, config.scale, config.scale);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (canvasContainerRef.current && renderer.domElement) {
        canvasContainerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();

      // Clean up timelines and their scroll triggers to prevent leaks on unmount/hot-reload
      timelines.forEach(tl => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      });
    };
  }, { dependencies: [] });

  return (
    <div
      ref={canvasContainerRef}
      className="pointer-events-none z-10"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}

