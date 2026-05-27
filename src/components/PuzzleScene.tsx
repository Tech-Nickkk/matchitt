"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

interface PuzzleSceneProps {
  /** Ref to the scroll container that drives GSAP ScrollTrigger */
  scrollContainerRef: RefObject<HTMLElement | null>;
}

/**
 * Three.js scene that renders the puzzle model with a simple scroll-driven
 * rotation animation. The pieces stay joined (no split).
 *
 * The split/merge animation is extracted into PuzzleSplitAnimation
 * for future use in a dedicated bottom section.
 */
export default function PuzzleScene({ scrollContainerRef }: PuzzleSceneProps) {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    // ── Lenis Smooth Scroll ──
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);

    const gsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0);

    // ── Scene ──
    const scene = new THREE.Scene();
    scene.background = null; // Transparent — blends with CSS background

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

        // Enable shadows on all meshes and fix color space
        model.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            const mat = (node as THREE.Mesh)
              .material as THREE.MeshStandardMaterial;
            if (mat?.map) {
              mat.map.colorSpace = THREE.SRGBColorSpace;
            }
          }
        });

        model.scale.set(0.75, 0.75, 0.75);
        model.position.set(0, -.5, 0);
        model.rotation.set( -Math.PI / 10, Math.PI / 4, Math.PI / 4);

        scene.add(model);

        // ── Responsive X position for sliding right ──
        const getResponsiveX = () => {
          if (typeof window === "undefined") return 2.0;
          if (window.innerWidth < 640) return 0.8; // Mobile
          if (window.innerWidth < 1024) return 1.4; // Tablet
          return 2.0; // Desktop
        };

        // ── Scroll-driven translation and rotation ──
        // Stage 1: Slide to the right, and then slide straight down off-screen BEFORE the page pins.
        // Starts exactly when the page loads at the top (top top of #page-pin-container) to guarantee
        // that the model is perfectly centered and visible under the header sticker on load!
        const tlStage1 = gsap.timeline({
          scrollTrigger: {
            trigger: "#page-pin-container",
            start: "top top",         // Start immediately on load at the top of the page scroll
            endTrigger: "#creativity-text",
            end: "center center",     // End exactly when "Creativity" hits the center of the viewport
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Step A (Time 0 to 1.0): Slide to the right and rotate
        tlStage1.to(
          model.position,
          {
            x: getResponsiveX(),
            y: -0.4,
            ease: "power2.inOut",
            duration: 1.0,
          },
          0
        ).to(
          model.rotation,
          {
            x: Math.PI / 4,
            y: Math.PI / 2,
            z: Math.PI / 6,
            ease: "power2.inOut",
            duration: 1.0,
          },
          0
        );

        // Step B (Time 1.0 to 2.0): Slide straight down off the bottom of the screen (completing before pinning starts)
        tlStage1.to(
          model.position,
          {
            y: -7, // Move fully down and out of viewport
            ease: "power2.inOut",
            duration: 1.0,
          },
          1.0
        ).to(
          model.rotation,
          {
            x: Math.PI / 3,
            y: Math.PI * 1.5,
            z: Math.PI / 3,
            ease: "power2.inOut",
            duration: 1.0,
          },
          1.0
        );

        // Force ScrollTrigger to calculate all trigger points with the actual DOM dimensions
        ScrollTrigger.refresh();
      },
      undefined,
      (error) => console.error("Error loading matchitt.glb:", error)
    );

    // ── Render Loop ──
    const animate = () => {
      requestAnimationFrame(animate);
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

    // ── Cleanup ──
    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvasContainerRef.current && renderer.domElement) {
        canvasContainerRef.current.removeChild(renderer.domElement);
      }
      lenis.destroy();
      gsap.ticker.remove(gsapTicker);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
    };
  }, [scrollContainerRef]);

  return (
    <div
      ref={canvasContainerRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-10"
    />
  );
}
