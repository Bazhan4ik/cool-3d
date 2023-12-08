import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


@Component({
  selector: 'app-canvas-box',
  templateUrl: './canvas-box.component.html',
  styleUrls: ['./canvas-box.component.scss'],
})
export class CanvasBoxComponent implements OnInit, AfterViewInit {

  constructor() { };

  @ViewChild("canvasBox") canvas!: ElementRef<HTMLCanvasElement>;

  async createThreeJsBox() {
    const canvas = this.canvas.nativeElement;

    const scene = new THREE.Scene();

    // const material = new THREE.MeshToonMaterial();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 2;
    pointLight.position.z = 2;
    scene.add(pointLight);


    // const box = new THREE.Mesh(
    //   new THREE.BoxGeometry(1.5, 1.5, 1.5),
    //   material,
    // );
    // const torus = new THREE.Mesh(
    //   new THREE.TorusGeometry(5, 1.5, 16, 100),
    //   material
    // );

    // scene.add(torus, box);

    const loader = new GLTFLoader();

    const eye = await loader.loadAsync("./../../../assets/eye.glb");

    eye.scene.scale.multiplyScalar(8);

    scene.add(eye.scene);

    const canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(
      75,
      canvasSizes.width / canvasSizes.height,
      0.001,
      1000
    );
    camera.position.z = 30;
    scene.add(camera);

    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas
    });
    renderer.setClearColor(0xe232222, 1);
    renderer.setSize(canvasSizes.width, canvasSizes.height);

    window.addEventListener('resize', () => {
      canvasSizes.width = window.innerWidth;
      canvasSizes.height = window.innerHeight;

      camera.aspect = canvasSizes.width / canvasSizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(canvasSizes.width, canvasSizes.height);
      renderer.render(scene, camera);
    });

    const clock = new THREE.Clock();

    const animateGeometry = () => {
      const elapsedTime = clock.getElapsedTime();

      eye.scene.rotation.x = 1.5708;
      eye.scene.rotation.y = 1.5708;
      // eye.scene.rotation.y = elapsedTime;
      // eye.scene.rotation.z = elapsedTime;

      // torus.rotation.x = -elapsedTime;
      // torus.rotation.y = -elapsedTime;
      // torus.rotation.z = -elapsedTime;

      renderer.render(scene, camera);

      window.requestAnimationFrame(animateGeometry);
    }

    animateGeometry();
  }


  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.createThreeJsBox();
  }
}
