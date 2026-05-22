"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Lenis Smooth Scroll ---
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const gsapTicker = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0);

    // --- Scene ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#EDECE9");

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    containerRef.current.appendChild(renderer.domElement);

    // --- Lights ---
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

    // --- Load Model ---
    const loader = new GLTFLoader();
    loader.load(
      "/models/matchitt.glb",
      (gltf) => {
        const model = gltf.scene;

        // Enable shadows on all meshes
        model.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            const mat = (node as THREE.Mesh).material as THREE.MeshStandardMaterial;
            if (mat && mat.map) {
              mat.map.colorSpace = THREE.SRGBColorSpace;
            }
          }
        });

        // Scale and rotate the whole model
        model.scale.set(0.75, 0.75, 0.75);
        model.position.set(0, 0, 0);
        model.rotation.set(Math.PI / 6, -Math.PI / 8, 0);

        // --- Find the two puzzle pieces ---
        // GLB hierarchy: Scene -> Null (children[0]) -> [Extrude (red), Extrude.1 (white)]
        let redPiece: THREE.Object3D | null = null;
        let whitePiece: THREE.Object3D | null = null;

        const nullNode = model.children[0];
        if (nullNode && nullNode.children && nullNode.children.length >= 2) {
          redPiece = nullNode.children[0];
          whitePiece = nullNode.children[1];
          console.log("Found pieces! Red:", redPiece.name, "White:", whitePiece.name);
        }

        if (redPiece && whitePiece) {
          // Save the original baked positions (these are the "merged/linked" positions)
          const redOrigX = redPiece.position.x;   // ~0.575
          const redOrigY = redPiece.position.y;   // ~0.073
          const whiteOrigX = whitePiece.position.x; // ~-0.575
          const whiteOrigY = whitePiece.position.y; // ~-0.073

          // Offset pieces AWAY from each other to start in a separated state
          // The pieces interlock along the local X axis of the Null parent
          const sep = 1.5;
          redPiece.position.x = redOrigX + sep;
          redPiece.position.y = redOrigY + sep * 0.1;
          whitePiece.position.x = whiteOrigX - sep;
          whitePiece.position.y = whiteOrigY - sep * 0.1;

          scene.add(model);
          ScrollTrigger.refresh();

          // --- ScrollTrigger Timeline ---
          if (mainRef.current) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: mainRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
              }
            });

            // STAGE 1 (0→1): Pieces slide together to their original baked positions (link)
            tl.to(redPiece.position, {
              x: redOrigX,
              y: redOrigY,
              ease: "power1.inOut",
              duration: 1,
            }, 0)
            .to(whitePiece.position, {
              x: whiteOrigX,
              y: whiteOrigY,
              ease: "power1.inOut",
              duration: 1,
            }, 0)

            // STAGE 2 (1→2): Linked model curves to the right
            .to(model.position, {
              x: 2.5,
              y: 0.5,
              ease: "power1.inOut",
              duration: 1,
            }, 1)
            .to(model.rotation, {
              x: Math.PI / 4,
              y: Math.PI / 2,
              z: Math.PI / 6,
              ease: "power1.inOut",
              duration: 1,
            }, 1)

            // STAGE 3 (2→3): Curves back to center
            .to(model.position, {
              x: 0,
              y: 0,
              ease: "power1.inOut",
              duration: 1,
            }, 2)
            .to(model.rotation, {
              x: Math.PI / 6,
              y: Math.PI + (-Math.PI / 8),
              z: 0,
              ease: "power1.inOut",
              duration: 1,
            }, 2)

            // STAGE 4 (3→4): Drops off the bottom of the screen
            .to(model.position, {
              y: -6,
              ease: "power1.inOut",
              duration: 1,
            }, 3)
            .to(model.rotation, {
              x: Math.PI / 3,
              y: Math.PI * 1.8,
              ease: "power1.inOut",
              duration: 1,
            }, 3);
          }
        } else {
          // Fallback: just add the model as-is if we can't find pieces
          console.warn("Could not find puzzle pieces, adding model without separation animation.");
          scene.add(model);
        }
      },
      undefined,
      (error) => console.error("Error loading matchitt.glb:", error)
    );

    // --- Render Loop ---
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // --- Resize ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.removeChild(renderer.domElement);
      }
      lenis.destroy();
      gsap.ticker.remove(gsapTicker);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
    };
  }, []);

  return (
    <main ref={mainRef} className="relative w-full h-[400vh] bg-[#EDECE9]">
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
      />
    </main>
  );
}
