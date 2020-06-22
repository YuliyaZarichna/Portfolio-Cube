import React, { Component } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import classes from './cube.module.css'
import { Link, Route } from "react-router-dom";

/* import AboutImg from '../assets/about.png'
import Man from '../assets/man_2.png'
import Omo from '../assets/omo.png'
import Project from '../assets/projects.png'
import Tex from '../assets/texture.jpg'*/
import About from '../About/about'

const style = {
    height: 400 // we can control scene size by setting container dimensions
};

class Cube extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }


    sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = this.el.clientWidth;
        const height = this.el.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('white');

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.intersects = [];

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

        this.controls = new OrbitControls(this.camera, this.el);
        this.controls.enableZoom = false;
        this.marginTop = this.el.getBoundingClientRect().top;
        this.marginLeft = this.el.getBoundingClientRect().left;

        console.log("this.el.offestLeft", this.el.getBoundingClientRect().left)
        // set some distance from a cube that is located at z = 0
        this.camera.position.z = 6;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.el.appendChild(this.renderer.domElement); // mount using React ref
    };

    addCustomSceneObjects = () => {
        var color = new THREE.Color('rgba(0,127,127)');

        const geometry = new THREE.BoxGeometry(4, 4, 4);
        /*   const material = new THREE.MeshPhongMaterial({
              color: color,
              side: THREE.DoubleSide,
              transparent: true,
              //opacity: 0.9,
          });
   */

        /* console.log("about contact", AboutImg)
        console.log("skills", Omo)
        console.log("projects", Project)
        console.log("experience, work", Man)
        console.log("education", Tex)
        console.log("fun") */
        /*      new THREE.TextureLoader().load
                 ('static/media/about.92609a5e.png',
                     texture => {
                         //Update Texture
                         this.cube.material.map = texture;
                         this.cube.material.needsUpdate = true;
                         console.log("rexture", this.cube.material)
                     },
                     xhr => {
                         //Download Progress
                         console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
                     },
                     error => {
                         //Error CallBack
                         console.log("An error happened" + error);
                     }
                 ); */

        let loader = new THREE.TextureLoader();
        let material = [
            new THREE.MeshBasicMaterial({ map: loader.load('static/media/about.92609a5e.png') }),
            new THREE.MeshBasicMaterial({ map: loader.load('static/media/man_2.c24423d0.png') }),
            new THREE.MeshBasicMaterial({ map: loader.load('/static/media/texture.0d68cc5c.jpg') }),
            new THREE.MeshBasicMaterial({ map: loader.load('static/media/about.92609a5e.png') }),
            new THREE.MeshBasicMaterial({ map: loader.load('static/media/about.92609a5e.png') }),
            new THREE.MeshBasicMaterial({ map: loader.load('static/media/about.92609a5e.png') }),
        ];

        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        const lights = [];
        lights[0] = new THREE.PointLight(0xffffff, 1, 0);
        lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        lights[2] = new THREE.PointLight(0xffffff, 1, 0);

        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(- 100, - 200, - 100);

        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);
    };

    startAnimationLoop = () => {
        this.cube.rotation.x += 0.005;
        this.cube.rotation.y += 0.005;

        this.renderer.render(this.scene, this.camera);
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    handleWindowResize = () => {
        const width = this.el.clientWidth;
        const height = this.el.clientHeight;

        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    };

    onMouseMove = (event) => {
        const width = this.el.clientWidth;
        const height = this.el.clientHeight;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.intersects = this.raycaster.intersectObjects([this.cube]);
        if (this.intersects.length > 0) {
            this.el.style.cursor = "pointer";
        } else {
            this.el.style.cursor = "default";
        }

        if (event.clientX >= this.marginLeft &&
            event.clientX <= width + this.marginLeft &&
            event.clientY >= this.marginTop &&
            event.clientY <= height + this.marginTop) {

            this.mouse.x = ((event.clientX - this.marginLeft) / width) * 2 - 1;
            this.mouse.y = -((event.clientY - this.marginTop) / height) * 2 + 1;

        } else {
            this.mouse.x = 1;
            this.mouse.y = 1;
        }
    }


    onMouseDown = () => {
        var faceIdx1 = -1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.intersects = this.raycaster.intersectObjects([this.cube]);

        if (this.intersects.length === 0) return;
        faceIdx1 = this.intersects[0].faceIndex;

        if (faceIdx1 <= 1) {
            console.log("About")
        }
        else if (faceIdx1 > 1 && faceIdx1 <= 3) {
            console.log("Work Ex")
        }
        else if (faceIdx1 > 3 && faceIdx1 <= 5) {
            console.log("Fun")
            return (<About link="https://www.google.de/" />)
        }
        else if (faceIdx1 > 5 && faceIdx1 <= 7) {
            console.log("Skills")
        }
        else if (faceIdx1 > 7 && faceIdx1 <= 9) {
            console.log("education")
        }
        else if (faceIdx1 > 9 && faceIdx1 <= 11) {
            console.log("projects")
        }
    }

    onClick = (event) => {

        var intersects = [];
        var faceIdx1 = -1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        intersects = this.raycaster.intersectObjects([this.cube]);
        console.log("intersects", intersects)
        if (intersects.length === 0) return;
        // find the new indices of faces
        faceIdx1 = intersects[0].faceIndex;
        if (faceIdx1 > (100 * 2) && faceIdx1 <= (100 * 3)) {
            console.log("if")
        }
        else if (faceIdx1 > (100 * 3) && faceIdx1 <= (100 * 4)) {
            console.log("else")
        }
    }

    render() {
        return (
            <>
                <div
                    className={classes.Cube}
                    ref={ref => (this.el = ref)}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onMouseMove={this.onMouseMove}
                    onClick={this.onClick}

                />
                <About link="https://www.google.de/" />
            </>
        )
    }
}

export default Cube