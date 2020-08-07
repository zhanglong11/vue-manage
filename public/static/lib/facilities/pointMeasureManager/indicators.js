import{MeasurementWrapper}from".";const MeasureCommon=Bimfish.Viewing.MeasureCommon,{convertUnits:convertUnits,formatValueWithUnits:formatValueWithUnits}=Bimfish.Viewing.Private,{Measurement:Measurement,MeasurementTypes:MeasurementTypes,SnapType:SnapType,computeResult:computeResult,getSnapResultPosition:getSnapResultPosition}=MeasureCommon,{MEASUREMENT_DISTANCE:MEASUREMENT_DISTANCE,MEASUREMENT_ANGLE:MEASUREMENT_ANGLE}=MeasurementTypes,MEASUREMENT_POINT=998,{SNAP_VERTEX:SNAP_VERTEX,SNAP_MIDPOINT:SNAP_MIDPOINT,SNAP_CIRCLE_CENTER:SNAP_CIRCLE_CENTER,SNAP_EDGE:SNAP_EDGE,SNAP_CIRCULARARC:SNAP_CIRCULARARC,SNAP_CURVEDEDGE:SNAP_CURVEDEDGE,SNAP_CURVEDFACE:SNAP_CURVEDFACE,RASTER_PIXEL:RASTER_PIXEL,SNAP_INTERSECTION:SNAP_INTERSECTION}=SnapType;export const INDICATOR_LINE_OVERLAY="measure_overlay";export let overlayCreated={created:!1};function calcLabelPosition(e,t){const{width:i,height:s}=e.getBoundingClientRect();return{x:t.x-Math.floor(i/2),y:t.y-Math.floor(s/2)}}function createMeasurementAxisLable(e){return function(t){const i=document.createElement("div");i.className=`adsk-icon-axis-delta-${e} measure-label-axis-delta measure-label-axis-${e} enableTransition  visible`,i.style.opacity=1;const s=document.createElement("div");s.className=`measure-label-axis-icon ${e.toUpperCase()}`,s.innerHTML=`${e.toUpperCase()}`,i.appendChild(s);const n=document.createElement("div");n.className="measure-delta-text",n.innerHTML=t,i.appendChild(n);let a=!0;return{el:i,destory(){i.remove()},setText(e){n.innerHTML=e},isShowing:()=>a,hide(){a=!1,i.classList.remove("visible")},show(){a=!0,i.classList.add("visible")},getBoundingClientRect:()=>i.getBoundingClientRect(),setPosition(e,t){let{x:s,y:n}=calcLabelPosition(i,{x:e,y:t});i.style.left=`${s}px`,i.style.top=`${n}px`}}}}function createMeasureResultLabel(e=""){const t=document.createElement("div");t.className="measure-length enable-hover visible",t.style.pointerEvents="all";const i=document.createElement("div");return i.className="measure-length-text",i.innerHTML=e,t.appendChild(i),{el:t,show(){t.classList.add("visible")},hide(){t.classList.remove("visible")},destory(){t.remove()},setText(e){i.innerHTML=e},setPosition(e,i){t.style.left=`${e}px`,t.style.top=`${i}px`},getBoundingClientRect:()=>t.getBoundingClientRect()}}export function create3dLine(e,t,i,s=30){const n=new THREE.LineBasicMaterial({color:i,linewidth:s,depthTest:!1,depthWrite:!1}),a=new THREE.Geometry;return a.vertices.push(e,t),new THREE.Line(a,n)}function createMeasurePointDot(){const e=document.createElement("div");return e.classList.add("measure-label-icon"),{el:e,hide(){e.style.display="none"},show(){e.style.display="block"},remove(){e.remove()},setPosition(t,i){e.style.left=`${t-5}px`,e.style.top=`${i-5}px`},destory(){e.remove()}}}const createXAxisLabel=createMeasurementAxisLable("x"),createYAxisLabel=createMeasurementAxisLable("y"),createZAxisLabel=createMeasurementAxisLable("z");class LabelPack{constructor(){this._pack={}}add(e,t){this._pack[e]&&this._pack[e].destory(),this._pack[e]=t}hasLabel(e){return!!this._pack[e]}getLabel(e){return this._pack[e]}removeLabel(e){this._pack[e]&&this._pack[e].destory(),delete this._pack[e]}_isTwoLabelCoverd(e,t){let i=this._pack[e],s=this._pack[t];const{x:n,y:a,width:o,height:h}=i.getBoundingClientRect(),{x:l,y:r,width:_,height:c}=s.getBoundingClientRect();return(l>n+o||l-_<n)&&(r>a+h||r-c<a)}appendTo(e){for(let t in this._pack){let i=this._pack[t];e.appendChild(i.el)}}destory(){for(let e in this._pack)this._pack[e].destory(),delete this._pack[e]}}export class DistanceMeasurementIndicator{constructor(e,t){this.viewer=e,this.measurement=t,this._axisLabelpack=new LabelPack,this._measureResult=t.getMeasurementResult(e),this._mainLabel=createMeasureResultLabel(this._measureResult.distanceXYZ),this._lineCreated=!1,this._showLinesAndAxisLabels=!1,this._startPoint=null,this._endPoint=null,this._sublineGroup=new THREE.Object3D,this._helperPoint1=null,this._helperPoint2=null,this._endPoint1=null,this._endPoint2=null,this.fetchMeasurementState(),this._mainline=create3dLine(this._startPoint,this._endPoint,"#009bfc",60),overlayCreated.created||(console.log("create overlay scene"),overlayCreated.created=!0,this.viewer.impl.createOverlayScene("measure_overlay"))}getUnitValue(e,t){return formatValueWithUnits(convertUnits(this.viewer.model.getUnitString(),e,1,t,"length"),e,3,2)}showEndPoints(){let e=MeasureCommon.project(this._startPoint,this.viewer),t=MeasureCommon.project(this._endPoint,this.viewer);this._endPoint1||(this._endPoint1=createMeasurePointDot()),this._endPoint2||(this._endPoint2=createMeasurePointDot()),this._endPoint1.setPosition(e.x,e.y),this._endPoint2.setPosition(t.x,t.y),this.viewer.container.appendChild(this._endPoint1.el),this.viewer.container.appendChild(this._endPoint2.el)}hideEndPoints(){this._endPoint1&&this._endPoint1.remove(),this._endPoint2&&this._endPoint2.remove()}updateEndpoints(){let e=MeasureCommon.project(this._startPoint,this.viewer),t=MeasureCommon.project(this._endPoint,this.viewer);this._endPoint1&&this._endPoint1.setPosition(e.x,e.y),this._endPoint2&&this._endPoint2.setPosition(t.x,t.y)}createAxisLabels(e){this._axisLabelpack.destory(),this._measureResult.distanceX>0&&this._axisLabelpack.add("x",createXAxisLabel(this.getUnitValue(e,this._measureResult.distanceX))),this._measureResult.distanceY>0&&this._axisLabelpack.add("y",createYAxisLabel(this.getUnitValue(e,this._measureResult.distanceY))),this._measureResult.distanceZ>0&&this._axisLabelpack.add("z",createZAxisLabel(this.getUnitValue(e,this._measureResult.distanceZ)))}createAxis3dLines(){if(this._sublineGroup&&this.viewer.impl.removeOverlay("measure_overlay",this._sublineGroup),this._sublineGroup=new THREE.Object3D,this._measureResult.distanceX>0){let e=create3dLine(this._startPoint,this._helperPoint1,"#e34341");this._sublineGroup.add(e)}if(this._measureResult.distanceY>0){let e=create3dLine(this._helperPoint2,this._endPoint,"#59c33c");this._sublineGroup.add(e)}if(this._measureResult.distanceZ>0){let e=create3dLine(this._helperPoint1,this._helperPoint2,"#5a58dd");this._sublineGroup.add(e)}}hideSublineAndAxisLabel(){if(!this._showLinesAndAxisLabels)return!1;this._axisLabelpack.destory(),this.viewer.impl.removeOverlay("measure_overlay",this._sublineGroup),this._sublineGroup=null,this.viewer.impl.invalidate(!1,!1,!0),this._showLinesAndAxisLabels=!1,this.hideEndPoints()}appendAxisLabels(){this._axisLabelpack.appendTo(this.viewer.container)}appendSublines(){this.viewer.impl.addOverlay("measure_overlay",this._sublineGroup),setTimeout(()=>{this.viewer.impl.invalidate(!1,!1,!0)})}appendMainlabel(){this.viewer.container.appendChild(this._mainLabel.el)}showSublineAndAxisLabel(e){this.createAxis3dLines(),this.createAxisLabels(e),this.appendSublines(),this.appendAxisLabels(),this.updateAxisLabelsPos(),this._showLinesAndAxisLabels=!0,this.showEndPoints()}showMainlineAndAxisLabel(e){this.appendMainlabel(e),this.updateMainLabelPos(),this.appendMainline()}appendMainline(){this._mainline&&this.viewer.impl.addOverlay("measure_overlay",this._mainline)}fetchMeasurementState(){this._measureResult=this.measurement.getMeasurementResult(this.viewer),this._startPoint=getSnapResultPosition(this.measurement._measurement.picks[1],this.viewer),this._endPoint=getSnapResultPosition(this.measurement._measurement.picks[2],this.viewer),this._helperPoint1=new THREE.Vector3(this._endPoint.x,this._startPoint.y,this._startPoint.z),this._helperPoint2=new THREE.Vector3(this._endPoint.x,this._startPoint.y,this._endPoint.z)}updateAxisLabelsPos(){let e=new THREE.Vector3((this._startPoint.x+this._endPoint.x)/2,(this._startPoint.y+this._endPoint.y)/2,(this._startPoint.z+this._endPoint.z)/2),t=MeasureCommon.project(e,this.viewer);if(this._mainLabel.setPosition(t.x,t.y),this._axisLabelpack.hasLabel("x")){let e=this._axisLabelpack.getLabel("x"),t=new THREE.Vector3((this._startPoint.x+this._helperPoint1.x)/2,(this._startPoint.y+this._helperPoint1.y)/2,(this._startPoint.z+this._helperPoint1.z)/2),i=MeasureCommon.project(t,this.viewer);e.setPosition(i.x,i.y)}if(this._axisLabelpack.hasLabel("y")){let e=this._axisLabelpack.getLabel("y"),t=new THREE.Vector3((this._helperPoint2.x+this._endPoint.x)/2,(this._helperPoint2.y+this._endPoint.y)/2,(this._helperPoint2.z+this._endPoint.z)/2),i=MeasureCommon.project(t,this.viewer);e.setPosition(i.x,i.y)}if(this._axisLabelpack.hasLabel("z")){let e=this._axisLabelpack.getLabel("z"),t=new THREE.Vector3((this._helperPoint1.x+this._helperPoint2.x)/2,(this._helperPoint1.y+this._helperPoint2.y)/2,(this._helperPoint1.z+this._helperPoint2.z)/2),i=MeasureCommon.project(t,this.viewer);e.setPosition(i.x,i.y)}this.updateEndpoints()}updateLabelsValue(e){this._mainLabel.setText(this.getUnitValue(e,this._measureResult.distanceXYZ)),this._axisLabelpack.getLabel("x")&&this._axisLabelpack.getLabel("x").setText(this.getUnitValue(e,this._measureResult.distanceX)),this._axisLabelpack.getLabel("y")&&this._axisLabelpack.getLabel("y").setText(this.getUnitValue(e,this._measureResult.distanceY)),this._axisLabelpack.getLabel("z")&&this._axisLabelpack.getLabel("z").setText(this.getUnitValue(e,this._measureResult.distanceZ))}updateMainline(){console.log(this._mainline),this._mainline.geometry.vertices[0].set(this._startPoint.x,this._startPoint.y,this._startPoint.z),this._mainline.geometry.vertices[1].set(this._endPoint.x,this._endPoint.y,this._endPoint.z),this._mainline.geometry.verticesNeedUpdate=!0}updateMainLabelPos(){let e=new THREE.Vector3((this._startPoint.x+this._endPoint.x)/2,(this._startPoint.y+this._endPoint.y)/2,(this._startPoint.z+this._endPoint.z)/2),t=MeasureCommon.project(e,this.viewer),{x:i,y:s}=calcLabelPosition(this._mainLabel.el,t);this._mainLabel.setPosition(i,s)}destory(){this._axisLabelpack.destory(),this._mainLabel.destory(),this._sublineGroup&&this.viewer.impl.removeOverlay("measure_overlay",this._sublineGroup),this.viewer.impl.removeOverlay("measure_overlay",this._mainline),this.viewer.impl.invalidate(!1,!1,!0),this._mainLabel.el.removeEventListener("click",this._selectCallback),this._selectCallback=null}bindSelectCallback(e){this._selectCallback=t=>{t.stopPropagation(),e(this)},this._selectCallback&&this._mainLabel.el.removeEventListener("click",this._selectCallback),this._mainLabel.el.addEventListener("click",this._selectCallback)}hideEndPoint(e){switch(e){case 1:this._endPoint1.destory();break;case 2:this._endPoint2.destory()}}bindMoveEndPointCallback(e){this._endPoint1Callback=t=>{e(this,1)},this._endPoint2Callback=t=>{e(this,2)},this._endPoint1&&this._endPoint1.el.addEventListener("mousedown",this._endPoint1Callback),this._endPoint2&&this._endPoint2.el.addEventListener("mousedown",this._endPoint2Callback)}}export class AngleMeasurementIndicator{constructor(e,t){this.viewer=e,this.measurement=t,this._measureResult=t.getMeasurementResult(e),this._pointA=null,this._pointB=null,this._pointC=null,this._pointAShower=null,this._pointBShower=null,this._pointCShower=null,this._shower=new THREE.Object3D,this._mainLabel=createMeasureResultLabel(formatValueWithUnits(this._measureResult.angle,"°",3,2)),overlayCreated.created||(console.log("create overlay scene"),overlayCreated.created=!0,this.viewer.impl.createOverlayScene("measure_overlay"))}showEndPoints(){this._pointAShower||(this._pointAShower=createMeasurePointDot()),this._pointBShower||(this._pointBShower=createMeasurePointDot()),this._pointCShower||(this._pointCShower=createMeasurePointDot());let e=MeasureCommon.project(this._pointA,this.viewer),t=MeasureCommon.project(this._pointB,this.viewer),i=MeasureCommon.project(this._pointC,this.viewer);this._pointAShower.setPosition(e.x,e.y),this._pointBShower.setPosition(t.x,t.y),this._pointCShower.setPosition(i.x,i.y),this.viewer.container.appendChild(this._pointAShower.el),this.viewer.container.appendChild(this._pointBShower.el),this.viewer.container.appendChild(this._pointCShower.el)}hideEndPoints(){this._pointAShower&&this._pointAShower.remove(),this._pointBShower&&this._pointBShower.remove(),this._pointCShower&&this._pointCShower.remove()}updateEndpoints(){let e=MeasureCommon.project(this._pointA,this.viewer),t=MeasureCommon.project(this._pointB,this.viewer),i=MeasureCommon.project(this._pointC,this.viewer);this._pointAShower&&this._pointAShower.setPosition(e.x,e.y),this._pointBShower&&this._pointBShower.setPosition(t.x,t.y),this._pointCShower&&this._pointCShower.setPosition(i.x,i.y)}fetchMeasurementState(){this._pointB=getSnapResultPosition(this.measurement._measurement.picks[1],this.viewer),this._pointA=getSnapResultPosition(this.measurement._measurement.picks[2],this.viewer),this._pointC=getSnapResultPosition(this.measurement._measurement.picks[3],this.viewer),this._measureResult=this.measurement.getMeasurementResult(this.viewer)}showMainlineAndAxisLabel(){this.fetchMeasurementState(),this.createAxisLabels(),this.viewer.impl.addOverlay("measure_overlay",this._shower),this.viewer.container.appendChild(this._mainLabel.el)}_createRadiusShower(){let e=this._pointA.distanceTo(this._pointB),t=this._pointA.distanceTo(this._pointC),i=Math.min(e,t)/3;i=i>30?30:i;let s=this._pointB.clone().sub(this._pointA),n=this._pointC.clone().sub(this._pointA),a=new THREE.Vector3;a.crossVectors(s,n);let o=s.dot(n),h=o>=0?s:n;o<0&&a.negate(),h.normalize().multiplyScalar(i).add(this._pointA),a.normalize();let l=Math.PI*(this._measureResult.angle/180)/30,r=new Array(31).fill(0).map((e,t)=>{let i=new THREE.Matrix4;return i.makeRotationAxis(a,t*l),h.clone().sub(this._pointA).applyMatrix4(i).add(this._pointA)}),_=new THREE.Geometry;_.vertices.push(this._pointA.clone()),_.vertices.push.apply(_.vertices,r);for(let e=1;e<r.length;e++)_.faces.push(new THREE.Face3(0,e,e+1));let c=new THREE.MeshBasicMaterial({color:"#009bfc",transparent:!0,opacity:.6,depthWrite:!1,depthTest:!1,side:THREE.DoubleSide});this.radiusMesh=new THREE.Mesh(_,c),this._shower.add(this.radiusMesh)}createAxisLabels(){this._mainLabel.setText(formatValueWithUnits(this._measureResult.angle,"°",3,2)),this._shower&&(this.viewer.impl.removeOverlay("measure_overlay",this._shower),this._shower=!1),this._shower=new THREE.Object3D,this.sideAB=create3dLine(this._pointA,this._pointB,"#009bfc",60),this.sideAC=create3dLine(this._pointA,this._pointC,"#009bfc",60),this._shower.add(this.sideAB,this.sideAC),this._createRadiusShower()}updateMainline(){this.sideAB.geometry.vertices[0].set(this._pointA.x,this._pointA.y,this._pointA.z),this.sideAB.geometry.vertices[1].set(this._pointB.x,this._pointB.y,this._pointB.z),this.sideAB.geometry.verticesNeedUpdate=!0,this.sideAC.geometry.vertices[0].set(this._pointA.x,this._pointA.y,this._pointA.z),this.sideAC.geometry.vertices[1].set(this._pointC.x,this._pointC.y,this._pointC.z),this.sideAC.geometry.verticesNeedUpdate=!0,this._shower.remove(this.radiusMesh)}showSublineAndAxisLabel(){this.showEndPoints()}hideSublineAndAxisLabel(){this.hideEndPoints()}updateAxisLabelsPos(){this.updateEndpoints()}updateLabelsValue(){this.fetchMeasurementState(),this._mainLabel.setText(formatValueWithUnits(this._measureResult.angle,"°",3,2))}updateMainLabelPos(){let e=MeasureCommon.project(this._pointA,this.viewer),{x:t,y:i}=calcLabelPosition(this._mainLabel.el,e);this._mainLabel.setPosition(t,i-20)}destory(){this.hideSublineAndAxisLabel(),this._mainLabel.destory(),this._pointAShower&&this._pointAShower.destory(),this._pointBShower&&this._pointBShower.destory(),this._pointCShower&&this._pointCShower.destory(),this.viewer.impl.removeOverlay("measure_overlay",this._shower),this._mainLabel.el.removeEventListener("click",this._selectCallback),this._selectCallback=null}bindSelectCallback(e){this._selectCallback=t=>{console.log("main label click"),t.stopPropagation(),e(this)},this._selectCallback&&this._mainLabel.el.removeEventListener("click",this._selectCallback),this._mainLabel.el.addEventListener("click",this._selectCallback)}bindMoveEndPointCallback(e){this._endPointBCallback=t=>{e(this,1)},this._endPointACallback=t=>{e(this,2)},this._endPointCCallback=t=>{e(this,3)},this._pointAShower&&this._pointAShower.el.addEventListener("mousedown",this._endPointACallback),this._pointBShower&&this._pointBShower.el.addEventListener("mousedown",this._endPointBCallback),this._pointCShower&&this._pointCShower.el.addEventListener("mousedown",this._endPointCCallback)}}export class PointMeasurementIndicator{constructor(e){this._iconEl=document.createElement("div"),this._iconEl.classList.add("measure-label-icon"),this._label=createZAxisLabel(e.z),this.measurementPosition=e}hide(){this._iconEl.style.display="none",this._label.hide()}show(){this._iconEl.style.display="block",this._label.show()}destory(){this._iconEl.remove(),this._labelEl.remove()}getMeasurementPosition(){return this.measurementPosition}updatePosition(e){let{x:t,y:i}=this._calcIconPos(e);this._iconEl.style.left=`${t}px`,this._iconEl.style.top=`${i}px`,this._label.setPosition(e.x,e.y-60)}_calcIconPos(e){return{x:e.x-3,y:e.y-3}}_calcLabelPos(e){let{width:t,height:i}=this._label.getBoundingClientRect();return{x:e.x-Math.floor(t/2),y:e.y-Math.floor(i)-8}}_appendTo(e){e.appendChild(this._iconEl),e.appendChild(this._label.el)}}