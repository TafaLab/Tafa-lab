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

type Props = {
  base: CakeBaseAsset;
  color: string;
  decorations: DecorationInstance[];
  selectedDecorationId: string | null;
  inscription: InscriptionSettings;
  isEnglish: boolean;
  onDecorationsChange: (items: DecorationInstance[]) => void;
  onDecorationSelect: (id: string) => void;
  onClearSelection: () => void;
  onInteractionStart: () => void;
  onInteractionEnd: () => void;
};

const R = 2.45,
  H = 2.65,
  C = BUILDER_CANVAS_SIZE / 2,
  TR = 489,
  FR = 365;
const dripColors: Record<string, string> = {
  "drip-dark": "#3f241b",
  "drip-milk": "#8b5d46",
  "drip-white": "#f4eee4",
};

export default function CakeThreePreview(props: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const latest = useRef(props);
  const decorGroup = useRef<THREE.Group | null>(null);
  const sprites = useRef(new Map<string, THREE.Sprite>());
  const textures = useRef(new Map<string, THREE.Texture>());
  const cakeMaterials = useRef<THREE.MeshStandardMaterial[]>([]);

  useEffect(() => {
    latest.current = props;
  }, [props]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const textureMap = textures.current;
    const spriteMap = sprites.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ded1c8");
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(8.8, 6.6, 10.8);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    host.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 8.5;
    controls.maxDistance = 19;
    controls.maxPolarAngle = Math.PI * 0.88;
    controls.target.set(0, 0.05, 0);
    scene.add(new THREE.HemisphereLight(0xfffbf5, 0x72594b, 2.25));
    const light = new THREE.DirectionalLight(0xffffff, 3.2);
    light.position.set(-5, 8, 6);
    light.castShadow = true;
    scene.add(light);
    const cakeGroup = new THREE.Group();
    scene.add(cakeGroup);
    const side = new THREE.Mesh(
      new THREE.CylinderGeometry(R, R * 1.015, H, 96),
      new THREE.MeshStandardMaterial({
        color: latest.current.color,
        roughness: 0.8,
      }),
    );
    side.castShadow = true;
    side.receiveShadow = true;
    cakeGroup.add(side);
    const top = new THREE.Mesh(
      new THREE.CylinderGeometry(R * 1.003, R * 1.003, 0.08, 96),
      new THREE.MeshStandardMaterial({
        color: latest.current.color,
        roughness: 0.68,
      }),
    );
    cakeMaterials.current = [
      side.material as THREE.MeshStandardMaterial,
      top.material as THREE.MeshStandardMaterial,
    ];
    top.position.y = H / 2 + 0.02;
    top.castShadow = true;
    cakeGroup.add(top);
    const plate = new THREE.Mesh(
      new THREE.CylinderGeometry(R * 1.19, R * 1.23, 0.16, 96),
      new THREE.MeshStandardMaterial({ color: "#fbfaf8", roughness: 0.42 }),
    );
    plate.position.y = -H / 2 - 0.12;
    plate.receiveShadow = true;
    cakeGroup.add(plate);
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(8, 96),
      new THREE.ShadowMaterial({ color: 0x4a3025, opacity: 0.13 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -H / 2 - 0.22;
    floor.receiveShadow = true;
    scene.add(floor);
    const dg = new THREE.Group();
    cakeGroup.add(dg);
    decorGroup.current = dg;

    const ray = new THREE.Raycaster(),
      pointer = new THREE.Vector2();
    let dragging: string | null = null;
    const aim = (e: PointerEvent) => {
      const box = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((e.clientX - box.left) / box.width) * 2 - 1,
        -((e.clientY - box.top) / box.height) * 2 + 1,
      );
      ray.setFromCamera(pointer, camera);
    };
    const down = (e: PointerEvent) => {
      aim(e);
      const hit = ray.intersectObjects([...sprites.current.values()], false)[0];
      const id = hit?.object.userData.instanceId as string | undefined;
      if (!id) {
        latest.current.onClearSelection();
        return;
      }
      e.preventDefault();
      dragging = id;
      controls.enabled = false;
      latest.current.onDecorationSelect(id);
      latest.current.onInteractionStart();
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      aim(e);
      const hit = ray.intersectObjects([top, side], false)[0];
      if (!hit) return;
      const point = cakeGroup.worldToLocal(hit.point.clone());
      const changed = latest.current.decorations.map((item) => {
        if (item.instanceId !== dragging) return item;
        if (hit.object === top || point.y > H / 2 - 0.08) {
          const x = C + (point.x / (R * 0.9)) * TR,
            y = C + (point.z / (R * 0.9)) * TR;
          return {
            ...item,
            surface: "top" as const,
            x: C + ((x - C) / TR) * FR,
            y: 365 + ((y - C) / TR) * 150,
            topView: {
              x,
              y,
              rotation: item.rotation,
              flipX: item.flipX,
              flipY: item.flipY,
            },
          };
        }
        const angle = Math.atan2(point.x, point.z);
        const x = C + Math.sin(angle) * FR,
          y = 365 + ((H / 2 - point.y) / H) * 520;
        return {
          ...item,
          surface: "side" as const,
          x,
          y,
          frontView: {
            x,
            y,
            rotation: item.rotation,
            flipX: item.flipX,
            flipY: item.flipY,
          },
        };
      });
      latest.current.onDecorationsChange(changed);
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = null;
      controls.enabled = true;
      latest.current.onInteractionEnd();
      if (renderer.domElement.hasPointerCapture(e.pointerId))
        renderer.domElement.releasePointerCapture(e.pointerId);
    };
    renderer.domElement.addEventListener("pointerdown", down);
    renderer.domElement.addEventListener("pointermove", move);
    renderer.domElement.addEventListener("pointerup", up);
    renderer.domElement.addEventListener("pointercancel", up);
    const resize = () => {
      const w = Math.max(host.clientWidth, 280),
        h = Math.max(host.clientHeight, 380);
      renderer.setSize(w, h);
      camera.aspect = w / h;
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
      renderer.domElement.removeEventListener("pointerdown", down);
      renderer.domElement.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("pointerup", up);
      renderer.domElement.removeEventListener("pointercancel", up);
      textureMap.forEach((t) => t.dispose());
      textureMap.clear();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          (Array.isArray(object.material)
            ? object.material
            : [object.material]
          ).forEach((m) => m.dispose());
        }
        if (object instanceof THREE.Sprite) object.material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
      decorGroup.current = null;
      spriteMap.clear();
      cakeMaterials.current = [];
    };
  }, []);

  useEffect(() => {
    cakeMaterials.current.forEach((material) => {
      material.color.set(props.color);
    });
  }, [props.color]);

  useEffect(() => {
    const group = decorGroup.current;
    if (!group) return;
    group.clear();
    sprites.current.clear();
    const loader = new THREE.TextureLoader();
    props.decorations.forEach((item, index) => {
      const asset = getDecorationAsset(item.assetId);
      if (!asset) return;
      if (asset.category === "drips") {
        const mesh = new THREE.Mesh(
          new THREE.TorusGeometry(R * 0.988, 0.075, 16, 96),
          new THREE.MeshStandardMaterial({
            color: dripColors[asset.id] ?? "#7a4d39",
            roughness: 0.58,
          }),
        );
        mesh.rotation.x = Math.PI / 2;
        mesh.position.y = H / 2 - 0.07 - index * 0.006;
        group.add(mesh);
        return;
      }
      const source = asset.stick?.headSrc ?? asset.src;
      let texture = textures.current.get(source);
      if (!texture) {
        texture = loader.load(source);
        texture.colorSpace = THREE.SRGBColorSpace;
        textures.current.set(source, texture);
      }
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.035,
          depthTest: true,
          depthWrite: false,
        }),
      );
      sprite.userData.instanceId = item.instanceId;
      const width = Math.max(0.32, (item.width / 730) * R * 2),
        aspect = asset.originalWidth / Math.max(asset.originalHeight, 1),
        selected = item.instanceId === props.selectedDecorationId;
      const selectedScale = selected ? 1.1 : 1;
      const displayWidth = width * selectedScale;
      const displayHeight = (width / Math.max(aspect, 0.25)) * selectedScale;
      sprite.scale.set(
        displayWidth * (item.flipX ? -1 : 1),
        displayHeight * (item.flipY ? -1 : 1),
        1,
      );
      sprite.material.rotation = (-item.rotation * Math.PI) / 180;
      sprite.material.color.set(selected ? "#fff1bd" : "#ffffff");
      const useTop =
        item.surface === "top" ||
        (item.surface !== "side" && Boolean(item.topView));
      if (useTop) {
        const view = item.topView ?? { x: C, y: C };
        sprite.position.set(
          ((view.x - C) / TR) * R * 0.9,
          H / 2 + displayHeight * 0.38,
          ((view.y - C) / TR) * R * 0.9,
        );
      } else {
        const view = item.frontView ?? item,
          nx = THREE.MathUtils.clamp((view.x - C) / FR, -0.98, 0.98),
          angle = Math.asin(nx);
        const y = THREE.MathUtils.clamp(
          H / 2 - ((view.y - 365) / 520) * H,
          -H / 2 + 0.2,
          H / 2 + 0.45,
        );
        sprite.position.set(
          Math.sin(angle) * (R + 0.08),
          y,
          Math.cos(angle) * (R + 0.08),
        );
      }
      group.add(sprite);
      sprites.current.set(item.instanceId, sprite);
    });
  }, [props.decorations, props.selectedDecorationId]);

  return (
    <div className="relative mx-auto w-full">
      <div
        ref={hostRef}
        className="h-[460px] w-full touch-none overflow-hidden rounded-[28px] border border-[#6a4433]/10 bg-[#ded1c8] sm:h-[540px]"
        aria-label={
          props.isEnglish
            ? "Interactive 3D cake editor"
            : "Интерактивный 3D-конструктор торта"
        }
      />
      <div className="pointer-events-none absolute bottom-4 left-1/2 w-max max-w-[90%] -translate-x-1/2 rounded-full bg-[#35251f]/85 px-4 py-2 text-center text-xs font-semibold text-white shadow-lg">
        {props.isEnglish
          ? "Drag cake to rotate · Drag décor to place"
          : "Вращайте торт · Перетаскивайте декор по поверхности"}
      </div>
    </div>
  );
}
