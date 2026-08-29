"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import {
  BUILDER_CANVAS_SIZE,
  getDecorationAsset,
  type CakeBaseAsset,
} from "@/lib/cake-builder/assets";
import type {
  DecorationInstance,
  InscriptionSettings,
} from "@/lib/cake-builder/types";

type CakeThreePreviewProps = {
  base: CakeBaseAsset;
  color: string;
  decorations: DecorationInstance[];
  inscription: InscriptionSettings;
  isEnglish: boolean;
};

const CAKE_RADIUS = 2.45;
const CAKE_HEIGHT = 2.65;
const CANVAS_CENTER = BUILDER_CANVAS_SIZE / 2;
const TOP_RADIUS = 489;
const FRONT_RADIUS = 365;

const dripColors: Record<string, string> = {
  "drip-dark": "#3f241b",
  "drip-milk": "#8b5d46",
  "drip-white": "#f4eee4",
};

function makeInscriptionTexture(inscription: InscriptionSettings) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const context = canvas.getContext("2d");

  if (!context || !inscription.text.trim()) return null;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = inscription.color;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `${inscription.fontWeight} ${Math.max(52, inscription.fontSize * 2.1)}px serif`;
  context.fillText(
    inscription.uppercase ? inscription.text.toUpperCase() : inscription.text,
    512,
    128,
    960,
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export default function CakeThreePreview({
  base,
  color,
  decorations,
  inscription,
  isEnglish,
}: CakeThreePreviewProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f5f1ed");

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(6.8, 5.2, 8.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controls.minDistance = 6;
    controls.maxDistance = 15;
    controls.minPolarAngle = 0.2;
    controls.maxPolarAngle = Math.PI * 0.83;
    controls.target.set(0, 0.2, 0);

    scene.add(new THREE.HemisphereLight(0xfffbf5, 0x72594b, 2.25));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(-5, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const cakeGroup = new THREE.Group();
    scene.add(cakeGroup);

    const icingMaterial = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.82,
      metalness: 0,
    });
    const cake = new THREE.Mesh(
      new THREE.CylinderGeometry(
        CAKE_RADIUS,
        CAKE_RADIUS * 1.015,
        CAKE_HEIGHT,
        96,
        1,
        false,
      ),
      icingMaterial,
    );
    cake.castShadow = true;
    cake.receiveShadow = true;
    cakeGroup.add(cake);

    const top = new THREE.Mesh(
      new THREE.CylinderGeometry(
        CAKE_RADIUS * 1.002,
        CAKE_RADIUS * 1.002,
        0.08,
        96,
      ),
      new THREE.MeshStandardMaterial({ color, roughness: 0.68 }),
    );
    top.position.y = CAKE_HEIGHT / 2 + 0.02;
    top.castShadow = true;
    cakeGroup.add(top);

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(CAKE_RADIUS * 0.985, 0.035, 12, 96),
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.28,
        roughness: 0.5,
      }),
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = CAKE_HEIGHT / 2 + 0.075;
    cakeGroup.add(rim);

    const plate = new THREE.Mesh(
      new THREE.CylinderGeometry(
        CAKE_RADIUS * 1.19,
        CAKE_RADIUS * 1.23,
        0.16,
        96,
      ),
      new THREE.MeshStandardMaterial({ color: "#fbfaf8", roughness: 0.42 }),
    );
    plate.position.y = -CAKE_HEIGHT / 2 - 0.12;
    plate.receiveShadow = true;
    plate.castShadow = true;
    cakeGroup.add(plate);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(8, 96),
      new THREE.ShadowMaterial({ color: 0x4a3025, opacity: 0.13 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -CAKE_HEIGHT / 2 - 0.22;
    floor.receiveShadow = true;
    scene.add(floor);

    const textureLoader = new THREE.TextureLoader();
    const disposableTextures: THREE.Texture[] = [];

    decorations.forEach((instance, index) => {
      const asset = getDecorationAsset(instance.assetId);
      if (!asset) return;

      if (asset.category === "drips") {
        const drip = new THREE.Mesh(
          new THREE.TorusGeometry(CAKE_RADIUS * 0.988, 0.075, 16, 96),
          new THREE.MeshStandardMaterial({
            color: dripColors[asset.id] ?? "#7a4d39",
            roughness: 0.58,
          }),
        );
        drip.rotation.x = Math.PI / 2;
        drip.position.y = CAKE_HEIGHT / 2 - 0.07 - index * 0.006;
        cakeGroup.add(drip);
        return;
      }

      const source = asset.stick?.headSrc ?? asset.src;
      const texture = textureLoader.load(source);
      texture.colorSpace = THREE.SRGBColorSpace;
      disposableTextures.push(texture);

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.035,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      const width = Math.max(0.28, (instance.width / 730) * (CAKE_RADIUS * 2));
      const aspect = asset.originalWidth / Math.max(asset.originalHeight, 1);
      sprite.scale.set(width, width / Math.max(aspect, 0.25), 1);
      sprite.material.rotation = (-instance.rotation * Math.PI) / 180;

      if (instance.topView) {
        const normalizedX = (instance.topView.x - CANVAS_CENTER) / TOP_RADIUS;
        const normalizedZ = (instance.topView.y - CANVAS_CENTER) / TOP_RADIUS;
        sprite.position.set(
          normalizedX * CAKE_RADIUS * 0.9,
          CAKE_HEIGHT / 2 + sprite.scale.y * 0.38,
          normalizedZ * CAKE_RADIUS * 0.9,
        );
      } else {
        const normalizedX = THREE.MathUtils.clamp(
          (instance.x - CANVAS_CENTER) / FRONT_RADIUS,
          -0.98,
          0.98,
        );
        const angle = Math.asin(normalizedX);
        const y = THREE.MathUtils.clamp(
          CAKE_HEIGHT / 2 - ((instance.y - 365) / 520) * CAKE_HEIGHT,
          -CAKE_HEIGHT / 2 + 0.2,
          CAKE_HEIGHT / 2 + 0.45,
        );
        sprite.position.set(
          Math.sin(angle) * (CAKE_RADIUS + 0.08),
          y,
          Math.cos(angle) * (CAKE_RADIUS + 0.08),
        );
      }

      cakeGroup.add(sprite);
    });

    const inscriptionTexture = makeInscriptionTexture(inscription);
    if (inscriptionTexture) {
      disposableTextures.push(inscriptionTexture);
      const inscriptionMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(3.5, 0.88),
        new THREE.MeshBasicMaterial({
          map: inscriptionTexture,
          transparent: true,
          depthWrite: false,
        }),
      );
      inscriptionMesh.position.set(0, 0.05, CAKE_RADIUS + 0.035);
      cakeGroup.add(inscriptionMesh);
    }

    const resize = () => {
      const width = Math.max(host.clientWidth, 280);
      const height = Math.max(host.clientHeight, 340);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      disposableTextures.forEach((texture) => texture.dispose());
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
        if (object instanceof THREE.Sprite) object.material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [base.id, color, decorations, inscription]);

  return (
    <div className="relative mx-auto w-full">
      <div
        ref={hostRef}
        className="h-[430px] w-full overflow-hidden rounded-[28px] border border-[#6a4433]/10 bg-[#f5f1ed] sm:h-[540px]"
        aria-label={
          isEnglish
            ? "Interactive 3D cake preview"
            : "Интерактивный 3D-просмотр торта"
        }
      />
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[#35251f]/80 px-4 py-2 text-center text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
        {isEnglish
          ? "Rotate · Zoom · View from every side"
          : "Вращайте · Приближайте · Смотрите со всех сторон"}
      </div>
    </div>
  );
}
