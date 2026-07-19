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
      initialX: -0.3,
      initialY: -0.65,
      statementY: -1.35,
    };
  }
  const width = window.innerWidth;
  if (width < 640) {
    // Mobile
    return {
      scale: 0.65,
      initialX: -0.1,
      initialY: -0.15,
      statementY: -0.85,
    };
  } else if (width < 1024) {
    // Tablet
    return {
      scale: 0.95,
      initialX: -0.15,
      initialY: -0.45,
      statementY: -1.0,
    };
  } else {
    // Desktop
    return {
      scale: 1.4,
      initialX: -0.3,
      initialY: -0.65,
      statementY: -1.35,
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
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    canvasContainerRef.current.appendChild(renderer.domElement);

    // ── Lights ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 5.2);
    dirLight.position.set(20, 30, 2);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.camera.left = -6;
    dirLight.shadow.camera.right = 6;
    dirLight.shadow.camera.top = 6;
    dirLight.shadow.camera.bottom = -6;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 25;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(6, -2, -5);
    scene.add(fillLight);

    // Light specifically for the blue puzzle piece (right side)
    const bluePieceLight = new THREE.DirectionalLight(0xffffff, 2.5);
    bluePieceLight.position.set(15, 0, 20); // Positioned to hit the lower right area where the blue piece sits
    scene.add(bluePieceLight);

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
              // Highly glossy plastic matching the reference image
              mat.roughness = 0.02;
              mat.metalness = 0.3;
              mat.envMapIntensity = 2.5;
              if (mat.name === "Mat.002") {
                mat.color.set("#b8c7d7"); // Lighter blue matching image
              } else if (mat.name === "Mat.001" || mat.name === "Mat" || mat.name === "Material.001" || mat.name === "Material") {
                mat.color.set("#985464"); // Updated burgundy color
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

        // Save original GLTF rotations of pieces to prevent wrong attachment directions
        const redOrigRot = { x: redPiece.rotation.x, y: redPiece.rotation.y, z: redPiece.rotation.z };
        const blueOrigRot = { x: bluePiece.rotation.x, y: bluePiece.rotation.y, z: bluePiece.rotation.z };

        // Spin the inner model 180deg so the red piece is in front
        model.rotation.y = Math.PI;

        // Calculate visual center of the model after Y rotation to allow centering of pivot
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Center the model relative to the group origin
        model.position.sub(center);

        // ── Group Wrapper ──
        group = new THREE.Group();
        group.add(model);

        // ── Initial State Matching Responsive Design ──
        const initialConfig = getResponsiveConfig();
        group.scale.set(initialConfig.scale, initialConfig.scale, initialConfig.scale);

        // Position it centered/offset (perfectly centered vertically on screen)
        group.position.set(0, 0, 0);

        // Rotate straight
        group.rotation.set(0, 0, 0);

        scene.add(group);

        // Set the pieces to start split off-screen
        redPiece.position.set(redOrig.x + 4.0, redOrig.y, redOrig.z);
        redPiece.rotation.set(-Math.PI / 8, Math.PI / 4, Math.PI / 6);
        bluePiece.position.set(blueOrig.x - 4.0, blueOrig.y, blueOrig.z);
        bluePiece.rotation.set(-Math.PI / 8, -Math.PI / 4, Math.PI / 6);

        // ── Phase 1 Animation: Clockwise Spin & Fall Down (Commented out) ──
        /*
        const tlStage1 = gsap.timeline({
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            endTrigger: "#hero-spacer",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        timelines.push(tlStage1);

        // Fall down and rotate clockwise in-place
        tlStage1.fromTo(
          group.position,
          {
            x: () => getResponsiveConfig().initialX + center.x,
            y: () => getResponsiveConfig().initialY + center.y,
            z: 0
          },
          {
            x: () => getResponsiveConfig().initialX + center.x,
            y: () => getResponsiveConfig().initialY + center.y - 4.8,
            z: 0,
            ease: "power1.in",
            duration: 1.0,
            immediateRender: false
          },
          0
        ).fromTo(
          group.rotation,
          {
            x: 0,
            y: 0,
            z: 0.6
          },
          {
            x: 0,
            y: 0,
            z: 0.6 - Math.PI,
            ease: "linear",
            duration: 1.0,
            immediateRender: false
          },
          0
        );
        */

        // ── Phase 3 Animation: How We Match (Scroll Reveal, Split, Join) ──
        const tlStage3 = gsap.timeline({
          scrollTrigger: {
            trigger: "#how-we-match",
            start: "top top",
            end: "bottom top",
            scrub: 1.0,
            invalidateOnRefresh: true,
          },
        });
        timelines.push(tlStage3);

        // Ensure state at start of Phase 3 (pieces split off-screen, group centered)
        tlStage3.set(redPiece.position, { x: redOrig.x + 4.0, y: redOrig.y, z: redOrig.z }, 0);
        tlStage3.set(redPiece.rotation, {
          x: -Math.PI / 8,
          y: Math.PI / 4,
          z: Math.PI / 6,
        }, 0);
        tlStage3.set(bluePiece.position, { x: blueOrig.x - 4.0, y: blueOrig.y, z: blueOrig.z }, 0);
        tlStage3.set(bluePiece.rotation, {
          x: -Math.PI / 8,
          y: -Math.PI / 4,
          z: Math.PI / 6,
        }, 0);
        tlStage3.set(group.position, { x: 0, y: 0.0, z: 0 }, 0);
        tlStage3.set(group.rotation, { x: 0, y: 0, z: 0 }, 0);

        // Keep pieces split off-screen until scroll reaches 0.12
        tlStage3.to(redPiece.position, { x: redOrig.x + 4.0, duration: 0.12 }, 0);
        tlStage3.to(bluePiece.position, { x: blueOrig.x - 4.0, duration: 0.12 }, 0);

        // Step 4: Pieces match/join again in the center, unspinning to 0 (0.12 to 0.66)
        tlStage3.to(
          redPiece.position,
          {
            x: () => redOrig.x,
            duration: 0.54,
            ease: "power2.inOut"
          },
          0.12
        ).to(
          redPiece.rotation,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.54,
            ease: "power2.inOut"
          },
          0.12
        );

        tlStage3.to(
          bluePiece.position,
          {
            x: () => blueOrig.x,
            duration: 0.54,
            ease: "power2.inOut"
          },
          0.12
        ).to(
          bluePiece.rotation,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.54,
            ease: "power2.inOut"
          },
          0.12
        );

        // Step 5: Exit bottom offscreen smoothly with a slight rotation/tilt (0.70 to 0.98)
        tlStage3.to(
          group.position,
          {
            y: -5.5, // Slide down completely off-screen
            duration: 0.28,
            ease: "power2.in"
          },
          0.70
        ).to(
          group.rotation,
          {
            z: -0.3, // Slight tilt as it falls down
            duration: 0.28,
            ease: "power2.in"
          },
          0.70
        );

        // Anchor the timeline to exactly 1.00
        tlStage3.to(
          {},
          { duration: 0.02 },
          0.98
        );

        // ── Phase 2 Animation: Enter Dedicated Section (Below Statement Section) ──
        const tlStage2 = gsap.timeline({
          scrollTrigger: {
            trigger: "#puzzle-transition-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        timelines.push(tlStage2);

        // Ensure pieces are in their correct joined state at the start (using native GLTF rotations)
        tlStage2.set(redPiece.position, { x: redOrig.x, y: redOrig.y, z: redOrig.z }, 0);
        tlStage2.set(redPiece.rotation, { x: 0, y: 0, z: 0 }, 0);
        tlStage2.set(bluePiece.position, { x: blueOrig.x, y: blueOrig.y, z: blueOrig.z }, 0);
        tlStage2.set(bluePiece.rotation, { x: 0, y: 0, z: 0 }, 0);

        // Position: rise from bottom offscreen to top offscreen and shift horizontally to center
        tlStage2.fromTo(
          group.position,
          {
            x: 0,
            y: -5.5,
            z: 0
          },
          {
            x: 0, // Transition horizontally to center
            y: 6.0, // Move offscreen top
            z: 0,
            ease: "power1.inOut",
            duration: 1.0,
            immediateRender: false
          },
          0
        );

        // Rotation: animate from end of Phase 3 (-0.3) to 1.3
        tlStage2.fromTo(
          group.rotation,
          {
            x: 0,
            y: 0,
            z: -0.3
          },
          {
            x: 0,
            y: 0,
            z: 1.3,
            ease: "power1.inOut",
            duration: 1.0,
            immediateRender: false
          },
          0
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

      // Automatically recalculate all ScrollTrigger timeline markers & progress on resize
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (canvasContainerRef.current && renderer.domElement) {
        canvasContainerRef.current.removeChild(renderer.domElement);
      }

      // Dispose of geometries and materials to prevent GPU memory leaks
      scene.traverse((node) => {
        if ((node as THREE.Mesh).isMesh) {
          const mesh = node as THREE.Mesh;
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => mat.dispose());
          } else {
            (mesh.material as THREE.Material).dispose();
          }
        }
      });

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
