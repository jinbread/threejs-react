import React, { Component } from 'react'
import * as THREE from 'three'

class Scene extends Component{
    componentDidMount(){
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        
        //ADD SCENE
        this.scene = new THREE.Scene()
        
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        this.camera.position.z = 100
        
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('#000')
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
        
        //ADD CUBE
        this.group = new THREE.Group()
        this.scene.add(this.group)
        
        for(let i = 0; i < 40; i++) {
            const geometry = new THREE.BoxGeometry(i, i * 2, i)
            const material = new THREE.MeshBasicMaterial({ color: '#fff', wireframe: true })
            this.cube = new THREE.Mesh(geometry, material)
            this.cube.position.x = Math.random() * 100
            this.cube.position.y = Math.random() * 100
            this.cube.position.z = Math.random() * 100
            this.group.add(this.cube)
        }
        

        this.start()
    }

    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    start = () => {
        if (!this.frameId) {
        this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    animate = () => {
        this.group.rotation.x += 0.001
        this.group.rotation.y += 0.001
        this.group.rotation.z -= 0.001
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
        console.log(this.group[0])

    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }

    render(){
        return(
            <div
                style={{ width: window.innerWidth, height: window.innerHeight }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

  export default Scene