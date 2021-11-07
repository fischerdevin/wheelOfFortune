import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import font from "../Logos/chesterfieldregular1634774581.json";

const SpinWheel = (props) => {
  const { spinDeg } = props;
  const mountRef = useRef(null);

  useEffect(() => {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      85,
      (window.innerWidth * 0.7) / (window.innerHeight * 0.5),
      0.1,
      1000
    );
    let current = mountRef.current;

    let renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.5);
    current.appendChild(renderer.domElement);

    function onWindowResize() {
      camera.aspect = (window.innerWidth * 0.7) / (window.innerHeight * 0.5);
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.5);
    }
    window.addEventListener("resize", onWindowResize);

    const ambientLight = new THREE.AmbientLight("white", 1);
    scene.add(ambientLight);

    const length = 16 * 2;
    const width = 2.10644 * 2;
    let loader = new FontLoader();
    let newFont = loader.parse(font);
    const colors = [
      0xfddf11, 0xfd7135, 0xba81c6, 0xfba7b3, 0x32b196, 0xf9982e, 0x000000,
      0xbfbab0, 0x32b196, 0xfddf11, 0xfd7135, 0x40b4e8, 0xf9982e, 0xba81c6,
      0xfddf11, 0xfba7b3, 0xfd7135, 0x40b4e8, 0x32b196, 0xfba7b3, 0x000000,
      0xba81c6, 0x356c3e, 0x40b4e8,
    ];
    const values = [
      "$900",
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
        new THREE.MeshPhongMaterial({ color: 0xffffff }),
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
      const material = new THREE.MeshStandardMaterial({
        color: colors,
      });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.rotation.z = 1.5708;

      let size;
      let spacing;
      let valueArr = value.split("");
      let numsArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      for (let i = 0; i < valueArr.length; i++) {
        if (valueArr[i] === "$") {
          size = width / 1.7;
          spacing = 5 - i * size;
        } else if (numsArr.includes(valueArr[i])) {
          size = width * 0.8;
          spacing = 5 - i * size * 1.2;
        } else {
          size = width / 2.25;
          spacing = 5.5 - i * size * 1.2;
        }
        let word = numberTriangle(valueArr[i], size);

        word.position.z = 3.5;
        word.position.y += spacing + 23;
        word.position.x -= 1.85;
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
        new THREE.MeshStandardMaterial({ color: 0xffe111 }),
        new THREE.MeshStandardMaterial({ color: 0xfea200 }),
      ]);

      arrowGroup.add(arrowMesh);
      return arrowGroup;
    }
    arrowGroup.position.y = -28;
    arrowGroup.position.x = 0.1;
    arrowGroup.position.z = 4;
    arrowGroup.rotation.z = -1.5708;

    arrow();

    scene.add(wheel, arrowGroup);

    camera.position.z = 20;
    camera.position.y = -20;
    camera.rotation.z = 3.14159;
    let totalRotation = 0.1309;

    let animate = function () {
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
