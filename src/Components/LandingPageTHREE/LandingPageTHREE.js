import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import font from "../Logos/chesterfieldregular1634774581.json";

export default class LandingPageTHREE extends Component {
  componentDidMount() {
    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / (window.innerHeight * 0.9),
      0.1,
      1000
    );
    // INIT CAMERA
    camera.position.x = 3;
    camera.position.y = 25;
    camera.position.z = 30;

    // RENDERER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight * 0.35);
    this.mount.appendChild(renderer.domElement);

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 0, -40);
    controls.update();

    // RESIZE HAMDLER
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onWindowResize);

    // INIT HEMISPHERE LIGHT
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    // SCENE
    scene.background = new THREE.Color(0xffffff);

    // FLOOR
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshPhongMaterial({ color: 0x000000 })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

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

    let loader = new FontLoader();
    let newFont = loader.parse(font);
    let text = "WHEEL OF FoRTUNE";

    function titleText() {
      const geometry = new THREE.TextGeometry(text, {
        font: newFont,
        size: 5,
        height: 1,
      });
      const materials = [
        new THREE.MeshStandardMaterial({ color: 0x000000 }), // front
        new THREE.MeshStandardMaterial({ color: 0x0000ff }), // side
      ];
      const textMesh1 = new THREE.Mesh(geometry, materials);
      textMesh1.castShadow = true;
      textMesh1.position.y = 20;
      textMesh1.position.x = 0;
      scene.add(textMesh1);
    }

    titleText();
    // ANIMATE
    function animate() {
      const now = Date.now() / 1000;
      light1.position.y = 15;
      light1.position.x = Math.cos(now) * 20;
      light1.position.z = Math.sin(now) * 20;

      light2.position.y = 15;
      light2.position.x = Math.sin(now) * 20;
      light2.position.z = Math.cos(now) * 20;

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }
  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}
