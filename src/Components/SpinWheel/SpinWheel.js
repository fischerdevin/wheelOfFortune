import React, { Component } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import font from "../Logos/chesterfieldregular1634774581.json";

class SpinWheel extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / (window.innerHeight * 0.35),
      0.1,
      1000
    );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight * 0.35);
    this.mount.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight({
      color: "white",
      intensity: 0.5,
    });

    const ambientLight = new THREE.AmbientLight({
      color: "white",
      intensity: 0.1,
    });

    scene.add(light, ambientLight);

    const length = 16 * 2;
    const width = 2.10644 * 2;
    let loader = new FontLoader();
    let newFont = loader.parse(font);
    const colors = [
      0xffdd02, 0xf96026, 0xc493cb, 0xfda0b2, 0x029781, 0xfe9625, 0x151110,
      0xb3afa3, 0x009984, 0xfde101, 0xf36118, 0x5dbcea, 0xfd8b06, 0xa469bd,
      0xfadc00, 0xf78da7, 0xfa4e1e, 0x49b8ef, 0x048c76, 0xf3a5b5, 0x1b1716,
      0xbb87d1, 0x397340, 0x80c8f0,
    ];
    const values = [
      "lose",
      "$800",
      "$500",
      "$650",
      "$500",
      "$900",
      "Bankrupt",
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
      "Bankrupt",
      "$650",
      "free play",
      "$700",
    ];

    const wheel = new THREE.Group();

    function numberTriangle(word) {
      const numberGeometry = new TextGeometry(word, {
        font: newFont,
        size: width,
        height: 0.25,
      });
      const mats = new THREE.MeshStandardMaterial({ color: "white" });
      const mesh = new THREE.Mesh(numberGeometry, mats);
      mesh.rotation.z = 1.5708;

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

      let word = numberTriangle(value);
      word.position.z = 4.5;
      word.position.y = length / 1.7;
      word.position.x = 1.5;

      triangleGroup.add(mesh, word);
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

    wheel.rotation.x = 0;

    scene.add(wheel);

    camera.position.z = 40;

    var animate = function () {
      requestAnimationFrame(animate);

      // wheel.rotation.z -= 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }
  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}

export default SpinWheel;
