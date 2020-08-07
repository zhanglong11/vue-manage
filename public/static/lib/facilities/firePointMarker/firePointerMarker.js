function makeGeometry(e,t){let i=[0,0,0,e,0,0,0,t,0,e,t,0],n=new THREE.BufferGeometry;return n.addAttribute("position",new THREE.BufferAttribute(new Float32Array(i),3)),n.addAttribute("index",new THREE.BufferAttribute(new Uint16Array([0,1,2,1,3,2]),1)),n.addAttribute("uv",new THREE.BufferAttribute(new Float32Array([0,1,1,1,0,0,1,0]),2)),n}let fireMat,vertexShader="\n    varying vec2 vUv;\n\n    void main() {\n        vUv = uv;\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n",fragmentShader="\n    uniform float uTime;\n    uniform sampler2D uTex;\n    varying vec2 vUv;\n\n    void main() {\n        vec2 uv = vUv.xy;\n        float time = uTime;\n\n        // Generate noisy x value\n        vec2 n0Uv = vec2(uv.x*1.4 + 0.01, uv.y + time*0.69);\n        vec2 n1Uv = vec2(uv.x*0.5 - 0.033, uv.y*2.0 + time*0.12);\n        vec2 n2Uv = vec2(uv.x*0.94 + 0.02, uv.y*3.0 + time*0.61);\n        float n0 = (texture2D(uTex, n0Uv).w-0.5)*2.0;\n        float n1 = (texture2D(uTex, n1Uv).w-0.5)*2.0;\n        float n2 = (texture2D(uTex, n2Uv).w-0.5)*2.0;\n        float noiseA = clamp(n0 + n1 + n2, -1.0, 1.0);\n\n        // Generate noisy y value\n        vec2 n0UvB = vec2(uv.x*0.7 - 0.01, uv.y + time*0.27);\n        vec2 n1UvB = vec2(uv.x*0.45 + 0.033, uv.y*1.9 + time*0.61);\n        vec2 n2UvB = vec2(uv.x*0.8 - 0.02, uv.y*2.5 + time*0.51);\n        float n0B = (texture2D(uTex, n0UvB).w-0.5)*2.0;\n        float n1B = (texture2D(uTex, n1UvB).w-0.5)*2.0;\n        float n2B = (texture2D(uTex, n2UvB).w-0.5)*2.0;\n        float noiseB = clamp(n0B + n1B + n2B, -1.0, 1.0);\n\n        vec2 finalNoise = vec2(noiseA, noiseB);\n        float perturb = (1.0 - uv.y) * 0.35 + 0.02;\n        finalNoise = (finalNoise * perturb) + uv - 0.02;\n\n        vec4 color = texture2D(uTex, finalNoise);\n        color = vec4(color.x*2.0, color.y*0.9, (color.y/color.x)*0.2, 1.0);\n        finalNoise = clamp(finalNoise, 0.05, 1.0);\n        color.w = texture2D(uTex, finalNoise).z*2.0;\n        color.w = color.w*texture2D(uTex, uv).z;\n        gl_FragColor = color;\n        // gl_FragColor = texture2D(uTex, vUv * sin(time));\n    }\n";function makeMaterial(){if(!fireMat){let e=THREE.ImageUtils.loadTexture("/lib/res/textures/flame.png");e.wrapS=THREE.MirroredRepeatWrapping,e.wrapT=THREE.MirroredRepeatWrapping,e.flipY=!1;let t=new THREE.ShaderMaterial({vertexShader:vertexShader,fragmentShader:fragmentShader,uniforms:{uTex:{type:"t",value:e},uTime:{type:"f",value:0}},side:THREE.DoubleSide,transparent:!0,depthWrite:!1,depthTest:!0});fireMat=t}return fireMat}export class Fire{constructor(e,t,i){this._geometry=makeGeometry(e,t),this._material=makeMaterial(),this._material.needsUpdate=!0,this.mesh=new THREE.Mesh(this._geometry,this._material),this.position=i,this.mesh.position.set(i.x,i.y,i.z)}update(e){this._material.uniforms.uTime.value=e,this._material.uniforms.uTime.needsUpdate=!0,this._material.needsUpdate=!0}}export class FirePointManager{constructor(e,t={width:10,height:10}){this._firePoints={},this.defaultSize=t,this.viewer=e,this._animationRequestId=null,this._overlaySceneCreated=!1,e.addEventListener(Bimfish.Viewing.CAMERA_CHANGE_EVENT,this._handleCameraChange)}addFirePointWithDefaultSize(e,t){return this.addFirePoint(e,t,this.defaultSize)}addFirePoint(e,t,i){if(this._firePoints[e])return!1;let{width:n,height:r}=i,a=new Fire(n,r,t),o=!1;return 0==Object.keys(this._firePoints)&&(o=!0),this._firePoints[e]=a,o&&this._startUpdatingFire(),console.log(a),this._overlaySceneCreated||(this.viewer.impl.createOverlayScene("firePoint",null,null,this.viewer.impl.camera),this._overlaySceneCreated=!0),this.viewer.impl.addOverlay("firePoint",a.mesh),a.mesh.setRotationFromMatrix(this.viewer.impl.camera.matrix),!0}deleteFirePoint(e){let t=this._firePoints[e];return!!t&&(delete this._firePoints[e],this.viewer.impl.removeOverlay("firePoint",t.mesh),0==Object.keys(this._firePoints)&&this._stopUpdatingFire(),!0)}_startUpdatingFire=()=>{let e=new THREE.Clock,t=()=>{let i=e.getElapsedTime();this._animationRequestId=requestAnimationFrame(t),Object.keys(this._firePoints).forEach(e=>{this._firePoints[e].update(i)}),this.viewer.impl.invalidate(!1,!1,!0)};this._animationRequestId=requestAnimationFrame(t)};_stopUpdatingFire(){null!=this._animationRequestId&&(cancelAnimationFrame(this._animationRequestId),this._animationRequestId=null)}_handleCameraChange=()=>{let e=Object.keys(this._firePoints),t=this.viewer.impl.camera.matrix;e.forEach(e=>{this._firePoints[e].mesh.setRotationFromMatrix(t)})}}