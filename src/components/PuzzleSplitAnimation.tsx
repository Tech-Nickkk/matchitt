"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PuzzleSplitAnimationProps {
  /**
   * Ref to the trigger element that controls when
   * the split/merge animation plays on scroll.
   */
  triggerRef: RefObject<HTMLElement | null>;
}

/**
 * Standalone split/merge puzzle animation component.
 *
 * Renders its own Three.js canvas and uses GSAP ScrollTrigger
 * tied to the provided trigger element. The two puzzle pieces
 * start separated and merge together on scroll.
 *
 * This component is designed to be placed at the bottom section
 * of the website for a dramatic reveal.
 */
export default function PuzzleSplitAnimation({
  triggerRef,
}: PuzzleSplitAnimationProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !triggerRef.current) return;

    // ── Scene ──
    const scene = new THREE.Scene();
    scene.background = null;

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
    canvasRef.current.appendChild(renderer.domElement);

    // ── Lights ──
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    dirLight.shadow.bias = -0.0001;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    // ── Load & Split ──
    const loader = new GLTFLoader();
    loader.load(
      "/models/matchitt.glb",
      (gltf) => {
        const model = gltf.scene;

        model.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            const mat = (node as THREE.Mesh)
              .material as THREE.MeshStandardMaterial;
            if (mat?.map) mat.map.colorSpace = THREE.SRGBColorSpace;
          }
        });

        model.scale.set(0.75, 0.75, 0.75);
        model.rotation.set(Math.PI / 6, -Math.PI / 8, 0);

        // ── Locate the two puzzle halves ──
        const nullNode = model.children[0];
        if (!nullNode?.children || nullNode.children.length < 2) {
          console.warn("PuzzleSplitAnimation: could not find pieces");
          scene.add(model);
          return;
        }

        const redPiece = nullNode.children[0];
        const whitePiece = nullNode.children[1];

        // Save original (merged) positions
        const redOrig = { x: redPiece.position.x, y: redPiece.position.y };
        const whiteOrig = {
          x: whitePiece.position.x,
          y: whitePiece.position.y,
        };

        // Start separated
        const separation = 1.5;
        redPiece.position.x = redOrig.x + separation;
        redPiece.position.y = redOrig.y + separation * 0.1;
        whitePiece.position.x = whiteOrig.x - separation;
        whitePiece.position.y = whiteOrig.y - separation * 0.1;

        scene.add(model);
        ScrollTrigger.refresh();

        // ── Scroll-driven merge animation ──
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Pieces slide together
        tl.to(
          redPiece.position,
          { x: redOrig.x, y: redOrig.y, ease: "power1.inOut", duration: 1 },
          0
        ).to(
          whitePiece.position,
          {
            x: whiteOrig.x,
            y: whiteOrig.y,
            ease: "power1.inOut",
            duration: 1,
          },
          0
        );

        // Rotate the whole model while merging
        tl.to(
          model.rotation,
          {
            x: Math.PI / 4,
            y: Math.PI / 2,
            z: Math.PI / 8,
            ease: "power1.inOut",
            duration: 1,
          },
          0
        );
      },
      undefined,
      (error) =>
        console.error("Error loading matchitt.glb for split:", error)
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
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
    };
  }, [triggerRef]);

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}
