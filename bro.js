// const renderer = new THREE.WebGLRenderer({
//   antialias: true
// })
// renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.setPixelRatio(window.devicePixelRatio)
// renderer.setClearColor(0xffffff, 1)

// renderer.gammaInput = true
// renderer.gammaOutput = true
// renderer.shadowMap.enabled = true

// const section = document.querySelector("section")
// section.appendChild(renderer.domElement)

// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 5000)
// camera.position.z = -50
// camera.lookAt(scene.position)

// scene.add( new THREE.AmbientLight( 0x666666 ) )

// const light = new THREE.DirectionalLight(0xffffff, 1)
// light.position.set(0, 0, -1)
// light.position.multiplyScalar( 1.3 )
// light.castShadow = true
// light.shadow.mapSize.width = 1024
// light.shadow.mapSize.height = 1024
// var d = 300
// light.shadow.camera.left = - d
// light.shadow.camera.right = d
// light.shadow.camera.top = d
// light.shadow.camera.bottom = - d
// light.shadow.camera.far = 1000
// scene.add(light)

// const loader = new THREE.TextureLoader()
// const clothTexture = loader.load( 'flow.jpg' )
// clothTexture.anisotropy = 16
// const clothMaterial = new THREE.MeshLambertMaterial( {
//   map: clothTexture,
//   side: THREE.DoubleSide,
//   alphaTest: 0.5
// } )

// const clothGeometry = new THREE.ParametricBufferGeometry( clothFunction, cloth.w, cloth.h )

// const object = new THREE.Mesh( clothGeometry, clothMaterial )
// object.position.set( 0, 0, 0 )
// object.castShadow = true
// scene.add( object )
// object.customDepthMaterial = new THREE.MeshDepthMaterial( {
//   depthPacking: THREE.RGBADepthPacking,
//   map: clothTexture,
//   alphaTest: 0.5
// } )

// const render = function () {
//   const p = cloth.particles
//   for ( const i = 0, il = p.length; i < il; i ++ ) {
//     const v = p[ i ].position;
//     clothGeometry.attributes.position.setXYZ( i, v.x, v.y, v.z );
//   }
//   clothGeometry.attributes.position.needsUpdate = true;
//   clothGeometry.computeVertexNormals();
//   sphere.position.copy( ballPosition );
//   renderer.render( scene, camera );
// }

// const animate = function () {
//   // controls.update()
//   renderer.render(scene, camera)
//   requestAnimationFrame(animate)

//   const time = Date.now()
//   const windStrength = Math.cos( time / 7000 ) * 20 + 40
//   windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) )
//   windForce.normalize()
//   windForce.multiplyScalar( windStrength )
//   simulate( time )
//   render()
//   // stats.update()
// }

// animate()


// window.addEventListener("resize", function() {
//   camera.aspect = window.innerWidth/ window.innerHeight
//   camera.updateProjectionMatrix()
//   renderer.setSize(window.innerWidth, window.innerHeight)
// })
