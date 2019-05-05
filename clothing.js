var pinsFormation = [];
var cloth = window.cloth;

pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

setTimeout(() => {
  pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, cloth.w];
}, 2500)

if ( WEBGL.isWebGLAvailable() === false ) {

  document.body.appendChild( WEBGL.getWebGLErrorMessage() );

}

var container;
var camera, scene, renderer;
var clothGeometry;
var object;


init();
animate();

function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  // scene

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );
  scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

  // camera

  camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set(0, 0, 250 );

  // lights

  scene.add( new THREE.AmbientLight( 0xffffff ) );

  var light = new THREE.DirectionalLight( 0xdfebff, 1 );
  light.position.set( 50, 200, 100 );
  light.position.multiplyScalar( 1.3 );

  light.castShadow = true;

  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;

  var d = 300;

  light.shadow.camera.left = - d;
  light.shadow.camera.right = d;
  light.shadow.camera.top = d;
  light.shadow.camera.bottom = - d;

  light.shadow.camera.far = 1000;

  scene.add( light );

  // cloth material

  var loader = new THREE.TextureLoader();

  //create image
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var text = "COMING";
  var text2 = "SOON";

  function runTexture (material, material2) {
    var countDownDate = new Date("May 19, 2019 00:00:00").getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var text3 = "[" + days + ":" + hours + ":" + minutes + ":" + seconds + "]";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.translate(0, canvas.height);
    context.scale(1, -1);
    context.drawImage(canvas, 0, 0);
    context.font = '270px Arial';
    context.fillStyle = 'white';
    context.fillText(text, 10, 240);
    context.fillText(text2, 20, 460);
    context.fillText(text3, 10, 680);

    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;
    material.needsUpdate = true;
    material.map = texture;

    return { texture };
  }

  // var clothTexture = loader.load( 'flow.jpg' );
  // clothTexture.anisotropy = 16;

  var clothMaterial = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    alphaTest: 0.9,
    color: 0x1a1a1a,
    specular: 0x111111,
    shininess: 30
  });

  var shader = THREE.FresnelShader;
  var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
  var material = new THREE.ShaderMaterial( {
  uniforms: uniforms,
  vertexShader: shader.vertexShader,
  fragmentShader: shader.fragmentShader
} );


  // cloth geometry

  clothGeometry = new THREE.ParametricBufferGeometry( clothFunction, cloth.w, cloth.h );

  // cloth mesh

  object = new THREE.Mesh( clothGeometry, clothMaterial );
  object.position.set( 0, 0, 0 );
  object.castShadow = true;
  scene.add( object );

  object.customDepthMaterial = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking,
    //map: texture,
    alphaTest: 0.5
  });

  setInterval(() => {
    runTexture(clothMaterial, object.customDepthMaterial)
  }, 1000)


  // renderer

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  container.appendChild( renderer.domElement );

  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  renderer.shadowMap.enabled = true;

  window.addEventListener( 'resize', onWindowResize, false );

}

//

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}



var pageX = 0, pageY = 0, isDown = 0;

function mouseMove (event) {
  console.log(event)
  pageX = event.pageX / window.innerWidth
  pageY = event.pageY / window.innerHeight

  pageX = pageX * 2 - 1
  pageY = pageY * 2 - 1
  pageY *= -1
}

window.addEventListener('mousemove', mouseMove, false)

function mouseDown () {
  isDown = -1
}
function mouseUp () {
  isDown = 0
}
window.addEventListener('mousedown', mouseDown, false)
window.addEventListener('mouseup', mouseUp, false)

function animate() {

  requestAnimationFrame( animate );


  var time = Date.now();
  var windStrength = Math.cos( time / 7000 ) * 20 + 40;
  // windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) )
  windForce.set( pageX, pageY, isDown )
  windForce.normalize()
  windForce.multiplyScalar( windStrength );
  simulate( time );
  render();

}

function render() {

  var p = cloth.particles;

  for ( var i = 0, il = p.length; i < il; i ++ ) {
    var v = p[ i ].position;
    clothGeometry.attributes.position.setXYZ( i, v.x, v.y, v.z );
  }

  clothGeometry.attributes.position.needsUpdate = true;
  clothGeometry.computeVertexNormals();
  renderer.render( scene, camera );

}

