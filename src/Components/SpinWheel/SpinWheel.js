import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import font from "../Logos/chesterfieldregular1634774581.json";

const SpinWheel = (props) => {
  const { spinDeg } = props;
  const mountRef = useRef(null);
  useEffect(() => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      85,
      (window.innerWidth * 0.95) / (window.innerHeight * 0.35),
      0.1,
      1000
    );
    let current = mountRef.current;

    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth * 0.95, window.innerHeight * 0.35);
    current.appendChild(renderer.domElement);

    function onWindowResize() {
      camera.aspect = (window.innerWidth * 0.95) / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.95, window.innerHeight);
    }
    window.addEventListener("resize", onWindowResize);

    const light = new THREE.DirectionalLight({
      color: "white",
      intensity: 0.5,
    });
    light.position.set(20, 50, 20);

    const ambientLight = new THREE.AmbientLight("white", 0.5);

    scene.add(light, ambientLight);

    const length = 16 * 2;
    const width = 2.10644 * 2;
    let loader = new FontLoader();
    let newFont = loader.parse(font);

    const colors = [
      0xffffff, 0xf96026, 0xc493cb, 0xfda0b2, 0x029781, 0xfe9625, 0x151110,
      0xb3afa3, 0x009984, 0xfde101, 0xf36118, 0x5dbcea, 0xfd8b06, 0xa469bd,
      0xfadc00, 0xf78da7, 0xfa4e1e, 0x49b8ef, 0x048c76, 0xf3a5b5, 0x1b1716,
      0xbb87d1, 0x397340, 0x80c8f0,
    ];
    const values = [
      "LOSE TURN",
      "$800",
      "$500",
      "$650",
      "$500",
      "$900",
      "BANKRUPT",
      "$5000",
      "$500",
      "$600",
      "$700",
      "$600",
      "$650",
      "$500",
      "$700",
      "$500",
      "$600",
      "$550",
      "$500",
      "$600",
      "BANKRUPT",
      "$650",
      "FREE PLAY",
      "$700",
    ];

    const wheel = new THREE.Group();

    function numberTriangle(word, size) {
      const numberGeometry = new TextGeometry(word, {
        font: newFont,
        size: size,
        height: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 3,
      });

      const mesh = new THREE.Mesh(numberGeometry, [
        new THREE.MeshStandardMaterial({ color: 0x0a0f0d }),
        new THREE.MeshStandardMaterial({ color: 0xffffff }),
      ]);
      return mesh;
    }

    function createTriangle(colors, value) {
      const triangleGroup = new THREE.Group();
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(length, width);
      shape.lineTo(length, -width);
      shape.lineTo(0, 0);

      const extrudeSettings = {
        steps: 2,
        depth: 3,
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshStandardMaterial({ color: colors });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.rotation.z = 1.5708;

      let size;
      let spacing;
      let valueArr = value.split("");
      let numsArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      for (let i = 0; i < valueArr.length; i++) {
        if (valueArr[i] === "$") {
          size = width / 1.6;
          spacing = 5 - i * size;
        } else if (numsArr.includes(valueArr[i])) {
          size = width * 0.75;
          spacing = 5 - i * size * 1.3;
        } else {
          size = width / 2;
          spacing = 5.5 - i * size * 1.1;
        }

        let word = numberTriangle(valueArr[i], size);
        word.position.z = 4.5;
        word.position.y += spacing + 23;
        word.position.x -= 1.5;
        triangleGroup.add(word);
      }

      triangleGroup.add(mesh);
      return triangleGroup;
    }

    function createWheel() {
      for (let i = 0; i < 24; i++) {
        let triangle = createTriangle(colors[i], values[i]);

        triangle.rotation.z = 0.261799 * i;
        wheel.add(triangle);
      }
    }

    createWheel();

    wheel.rotation.z += Math.PI;

    const arrowGroup = new THREE.Group();
    function arrow() {
      let arrowPoint = new THREE.Shape();
      arrowPoint.moveTo(0, 0);
      arrowPoint.lineTo(length * 0.15, width * 0.5);
      arrowPoint.lineTo(length * 0.15, -width * 0.5);
      arrowPoint.lineTo(0, 0);

      const extrudeSettings = {
        steps: 2,
        depth: 2,
      };

      const geometry = new THREE.ExtrudeGeometry(arrowPoint, extrudeSettings);

      const arrowMesh = new THREE.Mesh(geometry, [
        new THREE.MeshStandardMaterial({ color: 0xffc300 }),
        new THREE.MeshStandardMaterial({ color: 0x000000 }),
      ]);

      arrowGroup.add(arrowMesh);
      return arrowGroup;
    }
    arrowGroup.position.y = -28;
    arrowGroup.position.x = -1.5;
    arrowGroup.position.z = 4;
    arrowGroup.rotation.z = -1.5708;

    arrow();

    scene.add(wheel, arrowGroup);

    camera.position.z = 20;
    camera.position.y = -20;
    camera.rotation.z = 3.08923;
    let totalRotation = 0;

    var animate = function () {
      requestAnimationFrame(animate);

      if (totalRotation > spinDeg) {
        wheel.rotation.z -= 0;
        totalRotation += 0;
      } else {
        wheel.rotation.z -= 0.06;
        totalRotation += 0.06;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => current.removeChild(renderer.domElement);
  }, [spinDeg]);
  return <div ref={mountRef}></div>;
};

export default SpinWheel;
