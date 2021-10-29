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
      window.innerWidth / (window.innerHeight * 0.35),
      0.1,
      1000
    );
    let current = mountRef.current;

    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight * 0.35);
    current.appendChild(renderer.domElement);

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
    //  0xffdd02
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
        height: 0.5,
        bevelEnabled: true,
        bevelThickness: 0.3,
        bevelSize: 0.1,
        bevelSegments: 8,
      });

      const mesh = new THREE.Mesh(numberGeometry, [
        new THREE.MeshStandardMaterial({ color: 0x000000 }),
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
        depth: 4,
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

    scene.add(wheel);

    camera.position.z = 50;
    // camera.position.z = 60;
    camera.position.y = 0;
    camera.rotation.z = 3.1;
    let totalRotation = 0;

    var animate = function () {
      requestAnimationFrame(animate);

      if (totalRotation > spinDeg) {
        wheel.rotation.z -= 0;
        totalRotation += 0;
      } else {
        wheel.rotation.z -= 0.08;
        totalRotation += 0.08;
      }
      renderer.render(scene, camera);
    };
    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize, false);

    animate();

    return () => current.removeChild(renderer.domElement);
  }, [spinDeg]);
  return <div ref={mountRef}></div>;
};

export default SpinWheel;
