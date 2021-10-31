import React, { Component } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import font from "../Logos/SF Fortune Wheel_Regular.json";

export default class LandingPageTHREE extends Component {
  componentDidMount() {
    // SCENE
    const scene = new THREE.Scene();
    const length = 16 * 2.5;
    const width = 2.10644 * 2;
    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      80,
      (window.innerWidth * 0.95) / window.innerHeight,
      0.1,
      1000
    );
    // INIT CAMERA
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 95;

    // RENDERER
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth * 0.95, window.innerHeight);
    this.mount.appendChild(renderer.domElement);

    // RESIZE HAMDLER
    function onWindowResize() {
      camera.aspect = (window.innerWidth * 0.95) / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.95, window.innerHeight);
    }
    window.addEventListener("resize", onWindowResize);

    // INIT HEMISPHERE LIGHT
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    // POINT LIGHT
    const light1 = new THREE.PointLight(0xffffff, 1, 100);
    light1.castShadow = true;
    light1.shadow.mapSize.width = 4096;
    light1.shadow.mapSize.height = 4096;
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 1, 100);
    light2.castShadow = true;
    light2.shadow.mapSize.width = 4096;
    light2.shadow.mapSize.height = 4096;
    scene.add(light2);

    // TEXT
    const loader = new FontLoader();
    const newFont = loader.parse(font);

    const text = new TextGeometry("WHEEL OF\n FORTUNE", {
      font: newFont,
      size: 15,
      height: 3,
      curveSegments: 10,
      bevelEnabled: true,
      bevelThickness: 3,
      bevelSize: 4,
      bevelOffset: -0.2,
      bevelSegments: 8,
    });
    // 0xa224f4 purple//0xa10c3c red //0x038c20 green //0x0319d1 blue // 0xe19600 orange
    let colors = [
      0xa224f4, 0xa10c3c, 0x038c20, 0x0319d1, 0xe19600, 0xa224f4, 0xa10c3c,
      0x038c20, 0x0319d1, 0xe19600,
    ];
    let colorstwo = [
      0xe19600, 0x0319d1, 0x038c20, 0xa10c3c, 0xa224f4, 0xe19600, 0x0319d1,
      0x038c20, 0xa10c3c, 0xa224f4,
    ];
    const textMesh = new THREE.Mesh(text, [
      new THREE.MeshStandardMaterial({ color: 0xffffff }),
      new THREE.MeshPhongMaterial({ color: 0x000000 }),
    ]);
    textMesh.castShadow = true;
    textMesh.position.x = -60;

    scene.add(textMesh);
    const wedgeGroup = new THREE.Group();
    const wedgeGrouptwo = new THREE.Group();
    const mainGroup = new THREE.Group();
    let size = [1.7, 1.9, 1.6, 1.8, 1.7, 1.9, 1.6, 1.8, 1.7, 1.6];

    function createWedge(colors, size) {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(length * size, width * 3);
      shape.lineTo(length * size, -width * 3);
      shape.lineTo(0, 0);

      const extrudeSettings = {
        steps: 2,
        depth: 4,
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshStandardMaterial({ color: colors });
      const mesh = new THREE.Mesh(geometry, material);

      return mesh;
    }
    function createWedges() {
      for (let i = 0; i < 10; i++) {
        let triangle = createWedge(colors[i], size[i]);
        triangle.rotation.z = 0.6 * i;
        wedgeGroup.add(triangle);
        for (let j = 0; j < 10; j++) {
          let triangle = createWedge(colorstwo[j], size[j]);
          triangle.rotation.z = 0.6 * j;

          wedgeGrouptwo.add(triangle);
        }
      }
    }
    wedgeGroup.position.z = -4;
    wedgeGroup.position.x = 0;
    wedgeGrouptwo.position.z = -9;
    wedgeGrouptwo.position.x = 0;
    mainGroup.add(wedgeGroup, wedgeGrouptwo);
    scene.add(mainGroup);

    createWedges();
    // ANIMATE
    function animate() {
      const now = Date.now() / 1000;
      light1.position.y = 20;
      light1.position.x = Math.cos(now) * 25;
      light1.position.z = Math.sin(now) * 25;

      light2.position.y = 20;
      light2.position.x = Math.sin(now) * 25;
      light2.position.z = Math.cos(now) * 25;

      // camera.rotation.z = Math.cos(now * 0.5);

      wedgeGroup.rotation.z += 0.009;
      wedgeGrouptwo.rotation.z -= 0.0099;

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    renderer.domElement.id = "landingpage-canvas";
    animate();
  }
  render() {
    return <div id="landingPage-container" ref={(ref) => (this.mount = ref)} />;
  }
}
