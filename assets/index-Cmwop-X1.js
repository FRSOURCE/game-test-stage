import{S as C,_ as n,P as B,C as E,M as G,a as P,b as X,c as ie,d as k,e as z,E as j,H as te,f as q,V as c,g as Z,h as Y,i as se,B as Q,j as K,k as b,l as re,m as V,n as W,o as A,s as v,p as d,q as y,r as l,R as F,t as Ee,u as xe,v as M,w as Se,x as Ce,T as he,y as oe,z as w,D as Pe,A as fe,F as Ae,Q as pe,G as ge,I as Ie,J as de,K as ce,L as Te,N as le,O as _e,U as Ne,W as Le,X as ye,Y as Oe,Z as De}from"./page-Cp1H7GaF.js";import{s as Re}from"./setupGroundSnow-DawhPusj.js";import{s as Fe,a as Me,b as be}from"./setupShadows-D_fUJDU7.js";import"./default.vue_vue_type_script_setup_true_lang-D6aDo_f0.js";import"./app-B2t42i0g.js";const Ue="cellPixelShader",we=`precision highp float;uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform sampler2D diffuseSampler;uniform vec2 vDiffuseInfos;
#endif
#include<clipPlaneFragmentDeclaration>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
vec3 computeCustomDiffuseLighting(lightingInfo info,vec3 diffuseBase,float shadow)
{diffuseBase=info.diffuse*shadow;
#ifdef CELLBASIC
float level=1.0;if (info.ndl<0.5)
level=0.5;diffuseBase.rgb*vec3(level,level,level);
#else
float ToonThresholds[4];ToonThresholds[0]=0.95;ToonThresholds[1]=0.5;ToonThresholds[2]=0.2;ToonThresholds[3]=0.03;float ToonBrightnessLevels[5];ToonBrightnessLevels[0]=1.0;ToonBrightnessLevels[1]=0.8;ToonBrightnessLevels[2]=0.6;ToonBrightnessLevels[3]=0.35;ToonBrightnessLevels[4]=0.2;if (info.ndl>ToonThresholds[0])
{diffuseBase.rgb*=ToonBrightnessLevels[0];}
else if (info.ndl>ToonThresholds[1])
{diffuseBase.rgb*=ToonBrightnessLevels[1];}
else if (info.ndl>ToonThresholds[2])
{diffuseBase.rgb*=ToonBrightnessLevels[2];}
else if (info.ndl>ToonThresholds[3])
{diffuseBase.rgb*=ToonBrightnessLevels[3];}
else
{diffuseBase.rgb*=ToonBrightnessLevels[4];}
#endif
return max(diffuseBase,vec3(0.2));}
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=vec4(1.,1.,1.,1.);vec3 diffuseColor=vDiffuseColor.rgb;float alpha=vDiffuseColor.a;
#ifdef DIFFUSE
baseColor=texture2D(diffuseSampler,vDiffuseUV);
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
baseColor.rgb*=vDiffuseInfos.y;
#endif
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
lightingInfo info;vec3 diffuseBase=vec3(0.,0.,0.);float shadow=1.;float glossiness=0.;float aggShadow=0.;float numLights=0.;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif 
#include<lightFragment>[0..maxSimultaneousLights]
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;vec4 color=vec4(finalDiffuse,alpha);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;C.ShadersStore[Ue]=we;const Ve="cellVertexShader",Be=`precision highp float;attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform mat4 diffuseMatrix;uniform vec2 vDiffuseInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x==0.)
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));}
else
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));}
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#include<logDepthVertex>
#define CUSTOM_VERTEX_MAIN_END
}
`;C.ShadersStore[Ve]=Be;class Ge extends G{constructor(){super(),this.DIFFUSE=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.POINTSIZE=!1,this.FOG=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.NDOTL=!0,this.CUSTOMUSERLIGHTING=!0,this.CELLBASIC=!0,this.DEPTHPREPASS=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class H extends B{constructor(e,t){super(e,t),this.diffuseColor=new E(1,1,1),this._computeHighLevel=!1,this._disableLighting=!1,this._maxSimultaneousLights=4}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,r){const s=t._drawWrapper;if(this.isFrozen&&s.effect&&s._wasPreviouslyReady&&s._wasPreviouslyUsingInstances===r)return!0;t.materialDefines||(t.materialDefines=new Ge);const i=t.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;const u=o.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,o.texturesEnabled&&this._diffuseTexture&&P.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(i.CELLBASIC=!this.computeHighLevel,X(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=ie(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),k(o,u,this,i,!!r),z(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();const a=new j;i.FOG&&a.addFallback(1,"FOG"),te(i,a,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&a.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;const f=[c.PositionKind];i.NORMAL&&f.push(c.NormalKind),i.UV1&&f.push(c.UVKind),i.UV2&&f.push(c.UV2Kind),i.VERTEXCOLOR&&f.push(c.ColorKind),q(f,e,i,a),Z(f,i);const h="cell",p=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","diffuseMatrix","logarithmicDepthConstant"],_=["diffuseSampler"],g=[];Y(m),se({uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect(h,{attributes:f,uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:p,fallbacks:a,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights-1}},u),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=o.getRenderId(),s._wasPreviouslyReady=!0,s._wasPreviouslyUsingInstances=!!r,!0)}bindForSubMesh(e,t,r){const s=this.getScene(),i=r.materialDefines;if(!i)return;const o=r.effect;o&&(this._activeEffect=o,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),Q(t,this._activeEffect),this._mustRebind(s,o,r)&&(this._diffuseTexture&&P.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),K(this._activeEffect,this,s),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._useLogarithmicDepth&&b(i,o,s),s.bindEyePosition(o)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),s.lightsEnabled&&!this.disableLighting&&re(s,t,this._activeEffect,i,this._maxSimultaneousLights),s.fogEnabled&&t.applyFog&&s.fogMode!==V.FOGMODE_NONE&&this._activeEffect.setMatrix("view",s.getViewMatrix()),W(s,t,this._activeEffect),this._afterBind(t,this._activeEffect,r))}getAnimatables(){const e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTexture&&e.push(this._diffuseTexture),e}hasTexture(e){return super.hasTexture(e)?!0:this._diffuseTexture===e}dispose(e){this._diffuseTexture&&this._diffuseTexture.dispose(),super.dispose(e)}getClassName(){return"CellMaterial"}clone(e){return A.Clone(()=>new H(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.CellMaterial",e}static Parse(e,t,r){return A.Parse(()=>new H(e.name,t),e,t,r)}}n([v("diffuseTexture")],H.prototype,"_diffuseTexture",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],H.prototype,"diffuseTexture",void 0);n([y("diffuse")],H.prototype,"diffuseColor",void 0);n([l("computeHighLevel")],H.prototype,"_computeHighLevel",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],H.prototype,"computeHighLevel",void 0);n([l("disableLighting")],H.prototype,"_disableLighting",void 0);n([d("_markAllSubMeshesAsLightsDirty")],H.prototype,"disableLighting",void 0);n([l("maxSimultaneousLights")],H.prototype,"_maxSimultaneousLights",void 0);n([d("_markAllSubMeshesAsLightsDirty")],H.prototype,"maxSimultaneousLights",void 0);F("BABYLON.CellMaterial",H);class ze{constructor(){}}class ne extends Ee{AttachAfterBind(e,t){if(this._newUniformInstances)for(const r in this._newUniformInstances){const s=r.toString().split("-");s[0]=="vec2"?t.setVector2(s[1],this._newUniformInstances[r]):s[0]=="vec3"?this._newUniformInstances[r]instanceof E?t.setColor3(s[1],this._newUniformInstances[r]):t.setVector3(s[1],this._newUniformInstances[r]):s[0]=="vec4"?(this._newUniformInstances[r]instanceof xe?t.setDirectColor4(s[1],this._newUniformInstances[r]):t.setVector4(s[1],this._newUniformInstances[r]),t.setVector4(s[1],this._newUniformInstances[r])):s[0]=="mat4"?t.setMatrix(s[1],this._newUniformInstances[r]):s[0]=="float"&&t.setFloat(s[1],this._newUniformInstances[r])}if(this._newSamplerInstances)for(const r in this._newSamplerInstances){const s=r.toString().split("-");s[0]=="sampler2D"&&this._newSamplerInstances[r].isReady&&this._newSamplerInstances[r].isReady()&&t.setTexture(s[1],this._newSamplerInstances[r])}}ReviewUniform(e,t){if(e=="uniform"&&this._newUniforms)for(let r=0;r<this._newUniforms.length;r++)this._customUniform[r].indexOf("sampler")==-1&&t.push(this._newUniforms[r].replace(/\[\d*\]/g,""));if(e=="sampler"&&this._newUniforms)for(let r=0;r<this._newUniforms.length;r++)this._customUniform[r].indexOf("sampler")!=-1&&t.push(this._newUniforms[r].replace(/\[\d*\]/g,""));return t}Builder(e,t,r,s,i,o){o&&this._customAttributes&&this._customAttributes.length>0&&o.push(...this._customAttributes),this.ReviewUniform("uniform",t),this.ReviewUniform("sampler",s);const u=this._createdShaderName;return M.ShadersStore[u+"VertexShader"]&&M.ShadersStore[u+"PixelShader"]||(M.ShadersStore[u+"VertexShader"]=this._injectCustomCode(this.VertexShader,"vertex"),M.ShadersStore[u+"PixelShader"]=this._injectCustomCode(this.FragmentShader,"fragment")),u}_injectCustomCode(e,t){const r=this._getCustomCode(t);for(const s in r){const i=r[s];if(i&&i.length>0){const o="#define "+s;e=e.replace(o,`
`+i+`
`+o)}}return e}_getCustomCode(e){var t,r;return e==="vertex"?{CUSTOM_VERTEX_BEGIN:this.CustomParts.Vertex_Begin,CUSTOM_VERTEX_DEFINITIONS:(((t=this._customUniform)==null?void 0:t.join(`
`))||"")+(this.CustomParts.Vertex_Definitions||""),CUSTOM_VERTEX_MAIN_BEGIN:this.CustomParts.Vertex_MainBegin,CUSTOM_VERTEX_UPDATE_POSITION:this.CustomParts.Vertex_Before_PositionUpdated,CUSTOM_VERTEX_UPDATE_NORMAL:this.CustomParts.Vertex_Before_NormalUpdated,CUSTOM_VERTEX_MAIN_END:this.CustomParts.Vertex_MainEnd,CUSTOM_VERTEX_UPDATE_WORLDPOS:this.CustomParts.Vertex_After_WorldPosComputed}:{CUSTOM_FRAGMENT_BEGIN:this.CustomParts.Fragment_Begin,CUSTOM_FRAGMENT_DEFINITIONS:(((r=this._customUniform)==null?void 0:r.join(`
`))||"")+(this.CustomParts.Fragment_Definitions||""),CUSTOM_FRAGMENT_MAIN_BEGIN:this.CustomParts.Fragment_MainBegin,CUSTOM_FRAGMENT_UPDATE_DIFFUSE:this.CustomParts.Fragment_Custom_Diffuse,CUSTOM_FRAGMENT_UPDATE_ALPHA:this.CustomParts.Fragment_Custom_Alpha,CUSTOM_FRAGMENT_BEFORE_LIGHTS:this.CustomParts.Fragment_Before_Lights,CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR:this.CustomParts.Fragment_Before_FragColor,CUSTOM_FRAGMENT_MAIN_END:this.CustomParts.Fragment_MainEnd,CUSTOM_FRAGMENT_BEFORE_FOG:this.CustomParts.Fragment_Before_Fog}}constructor(e,t){super(e,t,!0),this.CustomParts=new ze,this.customShaderNameResolve=this.Builder,this.FragmentShader=M.ShadersStore.defaultPixelShader,this.VertexShader=M.ShadersStore.defaultVertexShader,ne.ShaderIndexer++,this._createdShaderName="custom_"+ne.ShaderIndexer}_afterBind(e,t=null,r){if(t){this.AttachAfterBind(e,t);try{super._afterBind(e,t,r)}catch{}}}AddUniform(e,t,r){return this._customUniform||(this._customUniform=new Array,this._newUniforms=new Array,this._newSamplerInstances={},this._newUniformInstances={}),r&&(t.indexOf("sampler")!=-1?this._newSamplerInstances[t+"-"+e]=r:this._newUniformInstances[t+"-"+e]=r),this._customUniform.push("uniform "+t+" "+e+";"),this._newUniforms.push(e),this}AddAttribute(e){return this._customAttributes||(this._customAttributes=[]),this._customAttributes.push(e),this}Fragment_Begin(e){return this.CustomParts.Fragment_Begin=e,this}Fragment_Definitions(e){return this.CustomParts.Fragment_Definitions=e,this}Fragment_MainBegin(e){return this.CustomParts.Fragment_MainBegin=e,this}Fragment_MainEnd(e){return this.CustomParts.Fragment_MainEnd=e,this}Fragment_Custom_Diffuse(e){return this.CustomParts.Fragment_Custom_Diffuse=e.replace("result","diffuseColor"),this}Fragment_Custom_Alpha(e){return this.CustomParts.Fragment_Custom_Alpha=e.replace("result","alpha"),this}Fragment_Before_Lights(e){return this.CustomParts.Fragment_Before_Lights=e,this}Fragment_Before_Fog(e){return this.CustomParts.Fragment_Before_Fog=e,this}Fragment_Before_FragColor(e){return this.CustomParts.Fragment_Before_FragColor=e.replace("result","color"),this}Vertex_Begin(e){return this.CustomParts.Vertex_Begin=e,this}Vertex_Definitions(e){return this.CustomParts.Vertex_Definitions=e,this}Vertex_MainBegin(e){return this.CustomParts.Vertex_MainBegin=e,this}Vertex_Before_PositionUpdated(e){return this.CustomParts.Vertex_Before_PositionUpdated=e.replace("result","positionUpdated"),this}Vertex_Before_NormalUpdated(e){return this.CustomParts.Vertex_Before_NormalUpdated=e.replace("result","normalUpdated"),this}Vertex_After_WorldPosComputed(e){return this.CustomParts.Vertex_After_WorldPosComputed=e,this}Vertex_MainEnd(e){return this.CustomParts.Vertex_MainEnd=e,this}}ne.ShaderIndexer=1;F("BABYLON.CustomMaterial",ne);class We{constructor(){}}class ae extends Se{AttachAfterBind(e,t){if(this._newUniformInstances)for(const r in this._newUniformInstances){const s=r.toString().split("-");s[0]=="vec2"?t.setVector2(s[1],this._newUniformInstances[r]):s[0]=="vec3"?this._newUniformInstances[r]instanceof E?t.setColor3(s[1],this._newUniformInstances[r]):t.setVector3(s[1],this._newUniformInstances[r]):s[0]=="vec4"?(this._newUniformInstances[r]instanceof xe?t.setDirectColor4(s[1],this._newUniformInstances[r]):t.setVector4(s[1],this._newUniformInstances[r]),t.setVector4(s[1],this._newUniformInstances[r])):s[0]=="mat4"?t.setMatrix(s[1],this._newUniformInstances[r]):s[0]=="float"&&t.setFloat(s[1],this._newUniformInstances[r])}if(this._newSamplerInstances)for(const r in this._newSamplerInstances){const s=r.toString().split("-");s[0]=="sampler2D"&&this._newSamplerInstances[r].isReady&&this._newSamplerInstances[r].isReady()&&t.setTexture(s[1],this._newSamplerInstances[r])}}ReviewUniform(e,t){if(e=="uniform"&&this._newUniforms)for(let r=0;r<this._newUniforms.length;r++)this._customUniform[r].indexOf("sampler")==-1&&t.push(this._newUniforms[r].replace(/\[\d*\]/g,""));if(e=="sampler"&&this._newUniforms)for(let r=0;r<this._newUniforms.length;r++)this._customUniform[r].indexOf("sampler")!=-1&&t.push(this._newUniforms[r].replace(/\[\d*\]/g,""));return t}Builder(e,t,r,s,i,o,u){if(u){const f=u.processFinalCode;u.processFinalCode=(h,p)=>{if(h==="vertex")return f?f(h,p):p;const m=new Ce(p);return m.inlineToken="#define pbr_inline",m.processCode(),f?f(h,m.code):m.code}}o&&this._customAttributes&&this._customAttributes.length>0&&o.push(...this._customAttributes),this.ReviewUniform("uniform",t),this.ReviewUniform("sampler",s);const a=this._createdShaderName;return M.ShadersStore[a+"VertexShader"]&&M.ShadersStore[a+"PixelShader"]||(M.ShadersStore[a+"VertexShader"]=this._injectCustomCode(this.VertexShader,"vertex"),M.ShadersStore[a+"PixelShader"]=this._injectCustomCode(this.FragmentShader,"fragment")),a}_injectCustomCode(e,t){const r=this._getCustomCode(t);for(const s in r){const i=r[s];if(i&&i.length>0){const o="#define "+s;e=e.replace(o,`
`+i+`
`+o)}}return e}_getCustomCode(e){var t,r;return e==="vertex"?{CUSTOM_VERTEX_BEGIN:this.CustomParts.Vertex_Begin,CUSTOM_VERTEX_DEFINITIONS:(((t=this._customUniform)==null?void 0:t.join(`
`))||"")+(this.CustomParts.Vertex_Definitions||""),CUSTOM_VERTEX_MAIN_BEGIN:this.CustomParts.Vertex_MainBegin,CUSTOM_VERTEX_UPDATE_POSITION:this.CustomParts.Vertex_Before_PositionUpdated,CUSTOM_VERTEX_UPDATE_NORMAL:this.CustomParts.Vertex_Before_NormalUpdated,CUSTOM_VERTEX_MAIN_END:this.CustomParts.Vertex_MainEnd,CUSTOM_VERTEX_UPDATE_WORLDPOS:this.CustomParts.Vertex_After_WorldPosComputed}:{CUSTOM_FRAGMENT_BEGIN:this.CustomParts.Fragment_Begin,CUSTOM_FRAGMENT_MAIN_BEGIN:this.CustomParts.Fragment_MainBegin,CUSTOM_FRAGMENT_DEFINITIONS:(((r=this._customUniform)==null?void 0:r.join(`
`))||"")+(this.CustomParts.Fragment_Definitions||""),CUSTOM_FRAGMENT_UPDATE_ALBEDO:this.CustomParts.Fragment_Custom_Albedo,CUSTOM_FRAGMENT_UPDATE_ALPHA:this.CustomParts.Fragment_Custom_Alpha,CUSTOM_FRAGMENT_BEFORE_LIGHTS:this.CustomParts.Fragment_Before_Lights,CUSTOM_FRAGMENT_UPDATE_METALLICROUGHNESS:this.CustomParts.Fragment_Custom_MetallicRoughness,CUSTOM_FRAGMENT_UPDATE_MICROSURFACE:this.CustomParts.Fragment_Custom_MicroSurface,CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION:this.CustomParts.Fragment_Before_FinalColorComposition,CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR:this.CustomParts.Fragment_Before_FragColor,CUSTOM_FRAGMENT_MAIN_END:this.CustomParts.Fragment_MainEnd,CUSTOM_FRAGMENT_BEFORE_FOG:this.CustomParts.Fragment_Before_Fog}}constructor(e,t){super(e,t,!0),this.CustomParts=new We,this.customShaderNameResolve=this.Builder,this.FragmentShader=M.ShadersStore.pbrPixelShader,this.VertexShader=M.ShadersStore.pbrVertexShader,this.FragmentShader=this.FragmentShader.replace(/#include<pbrBlockAlbedoOpacity>/g,M.IncludesShadersStore.pbrBlockAlbedoOpacity),this.FragmentShader=this.FragmentShader.replace(/#include<pbrBlockReflectivity>/g,M.IncludesShadersStore.pbrBlockReflectivity),this.FragmentShader=this.FragmentShader.replace(/#include<pbrBlockFinalColorComposition>/g,M.IncludesShadersStore.pbrBlockFinalColorComposition),ae.ShaderIndexer++,this._createdShaderName="custompbr_"+ae.ShaderIndexer}_afterBind(e,t=null,r){if(t){this.AttachAfterBind(e,t);try{super._afterBind(e,t,r)}catch{}}}AddUniform(e,t,r){return this._customUniform||(this._customUniform=new Array,this._newUniforms=new Array,this._newSamplerInstances={},this._newUniformInstances={}),r&&(t.indexOf("sampler")!=-1?this._newSamplerInstances[t+"-"+e]=r:this._newUniformInstances[t+"-"+e]=r),this._customUniform.push("uniform "+t+" "+e+";"),this._newUniforms.push(e),this}AddAttribute(e){return this._customAttributes||(this._customAttributes=[]),this._customAttributes.push(e),this}Fragment_Begin(e){return this.CustomParts.Fragment_Begin=e,this}Fragment_Definitions(e){return this.CustomParts.Fragment_Definitions=e,this}Fragment_MainBegin(e){return this.CustomParts.Fragment_MainBegin=e,this}Fragment_Custom_Albedo(e){return this.CustomParts.Fragment_Custom_Albedo=e.replace("result","surfaceAlbedo"),this}Fragment_Custom_Alpha(e){return this.CustomParts.Fragment_Custom_Alpha=e.replace("result","alpha"),this}Fragment_Before_Lights(e){return this.CustomParts.Fragment_Before_Lights=e,this}Fragment_Custom_MetallicRoughness(e){return this.CustomParts.Fragment_Custom_MetallicRoughness=e,this}Fragment_Custom_MicroSurface(e){return this.CustomParts.Fragment_Custom_MicroSurface=e,this}Fragment_Before_Fog(e){return this.CustomParts.Fragment_Before_Fog=e,this}Fragment_Before_FinalColorComposition(e){return this.CustomParts.Fragment_Before_FinalColorComposition=e,this}Fragment_Before_FragColor(e){return this.CustomParts.Fragment_Before_FragColor=e.replace("result","color"),this}Fragment_MainEnd(e){return this.CustomParts.Fragment_MainEnd=e,this}Vertex_Begin(e){return this.CustomParts.Vertex_Begin=e,this}Vertex_Definitions(e){return this.CustomParts.Vertex_Definitions=e,this}Vertex_MainBegin(e){return this.CustomParts.Vertex_MainBegin=e,this}Vertex_Before_PositionUpdated(e){return this.CustomParts.Vertex_Before_PositionUpdated=e.replace("result","positionUpdated"),this}Vertex_Before_NormalUpdated(e){return this.CustomParts.Vertex_Before_NormalUpdated=e.replace("result","normalUpdated"),this}Vertex_After_WorldPosComputed(e){return this.CustomParts.Vertex_After_WorldPosComputed=e,this}Vertex_MainEnd(e){return this.CustomParts.Vertex_MainEnd=e,this}}ae.ShaderIndexer=1;F("BABYLON.PBRCustomMaterial",ae);const He="firePixelShader",Xe=`precision highp float;uniform vec4 vEyePosition;varying vec3 vPositionW;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform sampler2D diffuseSampler;uniform vec2 vDiffuseInfos;
#endif
uniform sampler2D distortionSampler;uniform sampler2D opacitySampler;
#ifdef DIFFUSE
varying vec2 vDistortionCoords1;varying vec2 vDistortionCoords2;varying vec2 vDistortionCoords3;
#endif
#include<clipPlaneFragmentDeclaration>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
vec4 bx2(vec4 x)
{return vec4(2.0)*x-vec4(1.0);}
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=vec4(1.,1.,1.,1.);float alpha=1.0;
#ifdef DIFFUSE
const float distortionAmount0 =0.092;const float distortionAmount1 =0.092;const float distortionAmount2 =0.092;vec2 heightAttenuation=vec2(0.3,0.39);vec4 noise0=texture2D(distortionSampler,vDistortionCoords1);vec4 noise1=texture2D(distortionSampler,vDistortionCoords2);vec4 noise2=texture2D(distortionSampler,vDistortionCoords3);vec4 noiseSum=bx2(noise0)*distortionAmount0+bx2(noise1)*distortionAmount1+bx2(noise2)*distortionAmount2;vec4 perturbedBaseCoords=vec4(vDiffuseUV,0.0,1.0)+noiseSum*(vDiffuseUV.y*heightAttenuation.x+heightAttenuation.y);vec4 opacityColor=texture2D(opacitySampler,perturbedBaseCoords.xy);
#ifdef ALPHATEST
if (opacityColor.r<0.1)
discard;
#endif
#include<depthPrePass>
baseColor=texture2D(diffuseSampler,perturbedBaseCoords.xy)*2.0;baseColor*=opacityColor;baseColor.rgb*=vDiffuseInfos.y;
#endif
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif
vec3 diffuseBase=vec3(1.0,1.0,1.0);
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
vec4 color=vec4(baseColor.rgb,alpha);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;C.ShadersStore[He]=Xe;const ke="fireVertexShader",je=`precision highp float;attribute vec3 position;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
uniform float time;uniform float speed;
#ifdef DIFFUSE
varying vec2 vDistortionCoords1;varying vec2 vDistortionCoords2;varying vec2 vDistortionCoords3;
#endif
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);
#ifdef DIFFUSE
vDiffuseUV=uv;vDiffuseUV.y-=0.2;
#endif
#include<clipPlaneVertex>
#include<logDepthVertex>
#include<fogVertex>
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#ifdef DIFFUSE
vec3 layerSpeed=vec3(-0.2,-0.52,-0.1)*speed;vDistortionCoords1.x=uv.x;vDistortionCoords1.y=uv.y+layerSpeed.x*time/1000.0;vDistortionCoords2.x=uv.x;vDistortionCoords2.y=uv.y+layerSpeed.y*time/1000.0;vDistortionCoords3.x=uv.x;vDistortionCoords3.y=uv.y+layerSpeed.z*time/1000.0;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;C.ShadersStore[ke]=je;class Ze extends G{constructor(){super(),this.DIFFUSE=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.UV1=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.BonesPerMesh=0,this.NUM_BONE_INFLUENCERS=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class $ extends B{constructor(e,t){super(e,t),this.diffuseColor=new E(1,1,1),this.speed=1,this._scaledDiffuse=new E,this._lastTime=0}needAlphaBlending(){return!1}needAlphaTesting(){return!0}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,r){const s=t._drawWrapper;if(this.isFrozen&&s._wasPreviouslyReady&&s._wasPreviouslyUsingInstances===r)return!0;t.materialDefines||(t.materialDefines=new Ze);const i=t.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;const u=o.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,this._diffuseTexture&&P.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(i.ALPHATEST=!!this._opacityTexture,i._areMiscDirty&&(i.POINTSIZE=this.pointsCloud||o.forcePointsCloud,i.FOG=o.fogEnabled&&e.applyFog&&o.fogMode!==V.FOGMODE_NONE&&this.fogEnabled,i.LOGARITHMICDEPTH=this._useLogarithmicDepth),k(o,u,this,i,!!r),z(e,i,!1,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();const a=new j;i.FOG&&a.addFallback(1,"FOG"),i.NUM_BONE_INFLUENCERS>0&&a.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;const f=[c.PositionKind];i.UV1&&f.push(c.UVKind),i.VERTEXCOLOR&&f.push(c.ColorKind),q(f,e,i,a),Z(f,i);const h="fire",p=["world","view","viewProjection","vEyePosition","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","diffuseMatrix","logarithmicDepthConstant","time","speed"];Y(p);const m=i.toString();t.setEffect(o.getEngine().createEffect(h,{attributes:f,uniformsNames:p,uniformBuffersNames:[],samplers:["diffuseSampler","distortionSampler","opacitySampler"],defines:m,fallbacks:a,onCompiled:this.onCompiled,onError:this.onError,indexParameters:null,maxSimultaneousLights:4,transformFeedbackVaryings:null},u),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=o.getRenderId(),s._wasPreviouslyReady=!0,s._wasPreviouslyUsingInstances=!!r,!0)}bindForSubMesh(e,t,r){const s=this.getScene(),i=r.materialDefines;if(!i)return;const o=r.effect;o&&(this._activeEffect=o,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),Q(t,this._activeEffect),this._mustRebind(s,o,r)&&(this._diffuseTexture&&P.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix()),this._activeEffect.setTexture("distortionSampler",this._distortionTexture),this._activeEffect.setTexture("opacitySampler",this._opacityTexture)),K(this._activeEffect,this,s),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._useLogarithmicDepth&&b(i,o,s),s.bindEyePosition(o)),this._activeEffect.setColor4("vDiffuseColor",this._scaledDiffuse,this.alpha*t.visibility),s.fogEnabled&&t.applyFog&&s.fogMode!==V.FOGMODE_NONE&&this._activeEffect.setMatrix("view",s.getViewMatrix()),W(s,t,this._activeEffect),this._lastTime+=s.getEngine().getDeltaTime(),this._activeEffect.setFloat("time",this._lastTime),this._activeEffect.setFloat("speed",this.speed),this._afterBind(t,this._activeEffect,r))}getAnimatables(){const e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),this._distortionTexture&&this._distortionTexture.animations&&this._distortionTexture.animations.length>0&&e.push(this._distortionTexture),this._opacityTexture&&this._opacityTexture.animations&&this._opacityTexture.animations.length>0&&e.push(this._opacityTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTexture&&e.push(this._diffuseTexture),this._distortionTexture&&e.push(this._distortionTexture),this._opacityTexture&&e.push(this._opacityTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this._diffuseTexture===e||this._distortionTexture===e||this._opacityTexture===e)}getClassName(){return"FireMaterial"}dispose(e){this._diffuseTexture&&this._diffuseTexture.dispose(),this._distortionTexture&&this._distortionTexture.dispose(),super.dispose(e)}clone(e){return A.Clone(()=>new $(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.FireMaterial",e.diffuseColor=this.diffuseColor.asArray(),e.speed=this.speed,this._diffuseTexture&&(e._diffuseTexture=this._diffuseTexture.serialize()),this._distortionTexture&&(e._distortionTexture=this._distortionTexture.serialize()),this._opacityTexture&&(e._opacityTexture=this._opacityTexture.serialize()),e}static Parse(e,t,r){const s=new $(e.name,t);return s.diffuseColor=E.FromArray(e.diffuseColor),s.speed=e.speed,s.alpha=e.alpha,s.id=e.id,he.AddTagsTo(s,e.tags),s.backFaceCulling=e.backFaceCulling,s.wireframe=e.wireframe,e._diffuseTexture&&(s._diffuseTexture=oe.Parse(e._diffuseTexture,t,r)),e._distortionTexture&&(s._distortionTexture=oe.Parse(e._distortionTexture,t,r)),e._opacityTexture&&(s._opacityTexture=oe.Parse(e._opacityTexture,t,r)),s}}n([v("diffuseTexture")],$.prototype,"_diffuseTexture",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],$.prototype,"diffuseTexture",void 0);n([v("distortionTexture")],$.prototype,"_distortionTexture",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],$.prototype,"distortionTexture",void 0);n([v("opacityTexture")],$.prototype,"_opacityTexture",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],$.prototype,"opacityTexture",void 0);n([y("diffuse")],$.prototype,"diffuseColor",void 0);n([l()],$.prototype,"speed",void 0);F("BABYLON.FireMaterial",$);const Ye="furPixelShader",Ke=`precision highp float;uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;uniform vec4 furColor;uniform float furLength;varying vec3 vPositionW;varying float vfur_length;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform sampler2D diffuseSampler;uniform vec2 vDiffuseInfos;
#endif
#ifdef HIGHLEVEL
uniform float furOffset;uniform float furOcclusion;uniform sampler2D furTexture;varying vec2 vFurUV;
#endif
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<fogFragmentDeclaration>
#include<clipPlaneFragmentDeclaration>
float Rand(vec3 rv) {float x=dot(rv,vec3(12.9898,78.233,24.65487));return fract(sin(x)*43758.5453);}
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=furColor;vec3 diffuseColor=vDiffuseColor.rgb;float alpha=vDiffuseColor.a;
#ifdef DIFFUSE
baseColor*=texture2D(diffuseSampler,vDiffuseUV);
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
baseColor.rgb*=vDiffuseInfos.y;
#endif
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
#ifdef HIGHLEVEL
vec4 furTextureColor=texture2D(furTexture,vec2(vFurUV.x,vFurUV.y));if (furTextureColor.a<=0.0 || furTextureColor.g<furOffset) {discard;}
float occlusion=mix(0.0,furTextureColor.b*1.2,furOffset);baseColor=vec4(baseColor.xyz*max(occlusion,furOcclusion),1.1-furOffset);
#endif
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float glossiness=0.;float aggShadow=0.;float numLights=0.;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
#include<lightFragment>[0..maxSimultaneousLights]
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase.rgb*baseColor.rgb,0.0,1.0);
#ifdef HIGHLEVEL
vec4 color=vec4(finalDiffuse,alpha);
#else
float r=vfur_length/furLength*0.5;vec4 color=vec4(finalDiffuse*(0.5+r),alpha);
#endif
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;C.ShadersStore[Ye]=Ke;const $e="furVertexShader",qe=`precision highp float;attribute vec3 position;attribute vec3 normal;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
uniform float furLength;uniform float furAngle;
#ifdef HIGHLEVEL
uniform float furOffset;uniform vec3 furGravity;uniform float furTime;uniform float furSpacing;uniform float furDensity;
#endif
#ifdef HEIGHTMAP
uniform sampler2D heightTexture;
#endif
#ifdef HIGHLEVEL
varying vec2 vFurUV;
#endif
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform mat4 diffuseMatrix;uniform vec2 vDiffuseInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
varying float vfur_length;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
float Rand(vec3 rv) {float x=dot(rv,vec3(12.9898,78.233,24.65487));return fract(sin(x)*43758.5453);}
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
float r=Rand(position);
#ifdef HEIGHTMAP
#if __VERSION__>100
vfur_length=furLength*texture(heightTexture,uv).x;
#else
vfur_length=furLength*texture2D(heightTexture,uv).r;
#endif
#else 
vfur_length=(furLength*r);
#endif
vec3 tangent1=vec3(normal.y,-normal.x,0);vec3 tangent2=vec3(-normal.z,0,normal.x);r=Rand(tangent1*r);float J=(2.0+4.0*r);r=Rand(tangent2*r);float K=(2.0+2.0*r);tangent1=tangent1*J+tangent2*K;tangent1=normalize(tangent1);vec3 newPosition=position+normal*vfur_length*cos(furAngle)+tangent1*vfur_length*sin(furAngle);
#ifdef HIGHLEVEL
vec3 forceDirection=vec3(0.0,0.0,0.0);forceDirection.x=sin(furTime+position.x*0.05)*0.2;forceDirection.y=cos(furTime*0.7+position.y*0.04)*0.2;forceDirection.z=sin(furTime*0.7+position.z*0.04)*0.2;vec3 displacement=vec3(0.0,0.0,0.0);displacement=furGravity+forceDirection;float displacementFactor=pow(furOffset,3.0);vec3 aNormal=normal;aNormal.xyz+=displacement*displacementFactor;newPosition=vec3(newPosition.x,newPosition.y,newPosition.z)+(normalize(aNormal)*furOffset*furSpacing);
#endif
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
gl_Position=viewProjection*finalWorld*vec4(newPosition,1.0);vec4 worldPos=finalWorld*vec4(newPosition,1.0);vPositionW=vec3(worldPos);
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x==0.)
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));}
else
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));}
#ifdef HIGHLEVEL
vFurUV=vDiffuseUV*furDensity;
#endif
#else
#ifdef HIGHLEVEL
vFurUV=uv*furDensity;
#endif
#endif
#include<clipPlaneVertex>
#include<logDepthVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;C.ShadersStore[$e]=qe;class Qe extends G{constructor(){super(),this.DIFFUSE=!1,this.HEIGHTMAP=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.HIGHLEVEL=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class S extends B{constructor(e,t){super(e,t),this.diffuseColor=new E(1,1,1),this.furLength=1,this.furAngle=0,this.furColor=new E(.44,.21,.02),this.furOffset=0,this.furSpacing=12,this.furGravity=new w(0,0,0),this.furSpeed=100,this.furDensity=20,this.furOcclusion=0,this._disableLighting=!1,this._maxSimultaneousLights=4,this.highLevelFur=!0,this._furTime=0}get furTime(){return this._furTime}set furTime(e){this._furTime=e}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}updateFur(){for(let e=1;e<this._meshes.length;e++){const t=this._meshes[e].material;t.furLength=this.furLength,t.furAngle=this.furAngle,t.furGravity=this.furGravity,t.furSpacing=this.furSpacing,t.furSpeed=this.furSpeed,t.furColor=this.furColor,t.diffuseTexture=this.diffuseTexture,t.furTexture=this.furTexture,t.highLevelFur=this.highLevelFur,t.furTime=this.furTime,t.furDensity=this.furDensity}}isReadyForSubMesh(e,t,r){const s=t._drawWrapper;if(this.isFrozen&&s.effect&&s._wasPreviouslyReady&&s._wasPreviouslyUsingInstances===r)return!0;t.materialDefines||(t.materialDefines=new Qe);const i=t.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;const u=o.getEngine();if(i._areTexturesDirty&&o.texturesEnabled){if(this.diffuseTexture&&P.DiffuseTextureEnabled)if(this.diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(this.heightTexture&&u.getCaps().maxVertexTextureImageUnits)if(this.heightTexture.isReady())i._needUVs=!0,i.HEIGHTMAP=!0;else return!1}if(this.highLevelFur!==i.HIGHLEVEL&&(i.HIGHLEVEL=!0,i.markAsUnprocessed()),X(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=ie(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),k(o,u,this,i,!!r),z(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();const a=new j;i.FOG&&a.addFallback(1,"FOG"),te(i,a,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&a.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;const f=[c.PositionKind];i.NORMAL&&f.push(c.NormalKind),i.UV1&&f.push(c.UVKind),i.UV2&&f.push(c.UV2Kind),i.VERTEXCOLOR&&f.push(c.ColorKind),q(f,e,i,a),Z(f,i);const h="fur",p=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","diffuseMatrix","logarithmicDepthConstant","furLength","furAngle","furColor","furOffset","furGravity","furTime","furSpacing","furDensity","furOcclusion"];Y(m);const _=["diffuseSampler","heightTexture","furTexture"],g=[];se({uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect(h,{attributes:f,uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:p,fallbacks:a,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},u),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=o.getRenderId(),s._wasPreviouslyReady=!0,s._wasPreviouslyUsingInstances=!!r,!0)}bindForSubMesh(e,t,r){const s=this.getScene(),i=r.materialDefines;if(!i)return;const o=r.effect;o&&(this._activeEffect=o,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),Q(t,this._activeEffect),this._mustRebind(s,o,r)&&(this._diffuseTexture&&P.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),this._heightTexture&&this._activeEffect.setTexture("heightTexture",this._heightTexture),K(this._activeEffect,this,s),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._useLogarithmicDepth&&b(i,o,s),s.bindEyePosition(o)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),s.lightsEnabled&&!this.disableLighting&&re(s,t,this._activeEffect,i,this.maxSimultaneousLights),s.fogEnabled&&t.applyFog&&s.fogMode!==V.FOGMODE_NONE&&this._activeEffect.setMatrix("view",s.getViewMatrix()),W(s,t,this._activeEffect),this._activeEffect.setFloat("furLength",this.furLength),this._activeEffect.setFloat("furAngle",this.furAngle),this._activeEffect.setColor4("furColor",this.furColor,1),this.highLevelFur&&(this._activeEffect.setVector3("furGravity",this.furGravity),this._activeEffect.setFloat("furOffset",this.furOffset),this._activeEffect.setFloat("furSpacing",this.furSpacing),this._activeEffect.setFloat("furDensity",this.furDensity),this._activeEffect.setFloat("furOcclusion",this.furOcclusion),this._furTime+=this.getScene().getEngine().getDeltaTime()/this.furSpeed,this._activeEffect.setFloat("furTime",this._furTime),this._activeEffect.setTexture("furTexture",this.furTexture)),this._afterBind(t,this._activeEffect,r))}getAnimatables(){const e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),this.heightTexture&&this.heightTexture.animations&&this.heightTexture.animations.length>0&&e.push(this.heightTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTexture&&e.push(this._diffuseTexture),this._heightTexture&&e.push(this._heightTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this.diffuseTexture===e||this._heightTexture===e)}dispose(e){if(this.diffuseTexture&&this.diffuseTexture.dispose(),this._meshes)for(let t=1;t<this._meshes.length;t++){const r=this._meshes[t].material;r&&r.dispose(e),this._meshes[t].dispose()}super.dispose(e)}clone(e){return A.Clone(()=>new S(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.FurMaterial",this._meshes&&(e.sourceMeshName=this._meshes[0].name,e.quality=this._meshes.length),e}getClassName(){return"FurMaterial"}static Parse(e,t,r){const s=A.Parse(()=>new S(e.name,t),e,t,r);return e.sourceMeshName&&s.highLevelFur&&t.executeWhenReady(()=>{const i=t.getMeshByName(e.sourceMeshName);if(i){const o=S.GenerateTexture("Fur Texture",t);s.furTexture=o,S.FurifyMesh(i,e.quality)}}),s}static GenerateTexture(e,t){const r=new Pe("FurTexture "+e,256,t,!0),s=r.getContext();for(let i=0;i<2e4;++i)s.fillStyle="rgba(255, "+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+", 1)",s.fillRect(Math.random()*r.getSize().width,Math.random()*r.getSize().height,2,2);return r.update(!1),r.wrapU=oe.WRAP_ADDRESSMODE,r.wrapV=oe.WRAP_ADDRESSMODE,r}static FurifyMesh(e,t){const r=[e],s=e.material;let i;if(!(s instanceof S))throw"The material of the source mesh must be a Fur Material";for(i=1;i<t;i++){const o=new S(s.name+i,e.getScene());e.getScene().materials.pop(),he.EnableFor(o),he.AddTagsTo(o,"furShellMaterial"),o.furLength=s.furLength,o.furAngle=s.furAngle,o.furGravity=s.furGravity,o.furSpacing=s.furSpacing,o.furSpeed=s.furSpeed,o.furColor=s.furColor,o.diffuseTexture=s.diffuseTexture,o.furOffset=i/t,o.furTexture=s.furTexture,o.highLevelFur=s.highLevelFur,o.furTime=s.furTime,o.furDensity=s.furDensity;const u=e.clone(e.name+i);u.material=o,u.skeleton=e.skeleton,u.position=w.Zero(),r.push(u)}for(i=1;i<r.length;i++)r[i].parent=e;return e.material._meshes=r,r}}n([v("diffuseTexture")],S.prototype,"_diffuseTexture",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],S.prototype,"diffuseTexture",void 0);n([v("heightTexture")],S.prototype,"_heightTexture",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],S.prototype,"heightTexture",void 0);n([y()],S.prototype,"diffuseColor",void 0);n([l()],S.prototype,"furLength",void 0);n([l()],S.prototype,"furAngle",void 0);n([y()],S.prototype,"furColor",void 0);n([l()],S.prototype,"furOffset",void 0);n([l()],S.prototype,"furSpacing",void 0);n([fe()],S.prototype,"furGravity",void 0);n([l()],S.prototype,"furSpeed",void 0);n([l()],S.prototype,"furDensity",void 0);n([l()],S.prototype,"furOcclusion",void 0);n([l("disableLighting")],S.prototype,"_disableLighting",void 0);n([d("_markAllSubMeshesAsLightsDirty")],S.prototype,"disableLighting",void 0);n([l("maxSimultaneousLights")],S.prototype,"_maxSimultaneousLights",void 0);n([d("_markAllSubMeshesAsLightsDirty")],S.prototype,"maxSimultaneousLights",void 0);n([l()],S.prototype,"highLevelFur",void 0);n([l()],S.prototype,"furTime",null);F("BABYLON.FurMaterial",S);const Je="gradientPixelShader",ei=`precision highp float;uniform vec4 vEyePosition;uniform vec4 topColor;uniform vec4 bottomColor;uniform float offset;uniform float scale;uniform float smoothness;varying vec3 vPositionW;varying vec3 vPosition;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0]
#include<__decl__lightFragment>[1]
#include<__decl__lightFragment>[2]
#include<__decl__lightFragment>[3]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);float h=vPosition.y*scale+offset;float mysmoothness=clamp(smoothness,0.01,max(smoothness,10.));vec4 baseColor=mix(bottomColor,topColor,max(pow(max(h,0.0),mysmoothness),0.0));vec3 diffuseColor=baseColor.rgb;float alpha=baseColor.a;
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
#ifdef EMISSIVE
vec3 diffuseBase=baseColor.rgb;
#else
vec3 diffuseBase=vec3(0.,0.,0.);
#endif
lightingInfo info;float shadow=1.;float glossiness=0.;float aggShadow=0.;float numLights=0.;
#include<lightFragment>[0..maxSimultaneousLights]
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;vec4 color=vec4(finalDiffuse,alpha);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}
`;C.ShadersStore[Je]=ei;const ii="gradientVertexShader",ti=`precision highp float;attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;varying vec3 vPosition;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);vPosition=position;
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#include<clipPlaneVertex>
#include<logDepthVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;C.ShadersStore[ii]=ti;class si extends G{constructor(){super(),this.EMISSIVE=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class U extends B{constructor(e,t){super(e,t),this._maxSimultaneousLights=4,this.topColor=new E(1,0,0),this.topColorAlpha=1,this.bottomColor=new E(0,0,1),this.bottomColorAlpha=1,this.offset=0,this.scale=1,this.smoothness=1,this._disableLighting=!1}needAlphaBlending(){return this.alpha<1||this.topColorAlpha<1||this.bottomColorAlpha<1}needAlphaTesting(){return!0}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,r){const s=t._drawWrapper;if(this.isFrozen&&s.effect&&s._wasPreviouslyReady&&s._wasPreviouslyUsingInstances===r)return!0;t.materialDefines||(t.materialDefines=new si);const i=t.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;const u=o.getEngine();if(k(o,u,this,i,!!r),X(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=ie(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),i.EMISSIVE=this._disableLighting,z(e,i,!1,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();const a=new j;i.FOG&&a.addFallback(1,"FOG"),te(i,a),i.NUM_BONE_INFLUENCERS>0&&a.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;const f=[c.PositionKind];i.NORMAL&&f.push(c.NormalKind),i.UV1&&f.push(c.UVKind),i.UV2&&f.push(c.UV2Kind),i.VERTEXCOLOR&&f.push(c.ColorKind),q(f,e,i,a),Z(f,i);const h="gradient",p=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vFogInfos","vFogColor","pointSize","mBones","logarithmicDepthConstant","topColor","bottomColor","offset","smoothness","scale"];Y(m);const _=[],g=[];se({uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:i,maxSimultaneousLights:4}),t.setEffect(o.getEngine().createEffect(h,{attributes:f,uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:p,fallbacks:a,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},u),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=o.getRenderId(),s._wasPreviouslyReady=!0,s._wasPreviouslyUsingInstances=!!r,!0)}bindForSubMesh(e,t,r){const s=this.getScene(),i=r.materialDefines;if(!i)return;const o=r.effect;o&&(this._activeEffect=o,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),Q(t,o),this._mustRebind(s,o,r)&&(K(o,this,s),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._useLogarithmicDepth&&b(i,o,s),s.bindEyePosition(o)),s.lightsEnabled&&!this.disableLighting&&re(s,t,this._activeEffect,i,this.maxSimultaneousLights),s.fogEnabled&&t.applyFog&&s.fogMode!==V.FOGMODE_NONE&&this._activeEffect.setMatrix("view",s.getViewMatrix()),W(s,t,this._activeEffect),this._activeEffect.setColor4("topColor",this.topColor,this.topColorAlpha),this._activeEffect.setColor4("bottomColor",this.bottomColor,this.bottomColorAlpha),this._activeEffect.setFloat("offset",this.offset),this._activeEffect.setFloat("scale",this.scale),this._activeEffect.setFloat("smoothness",this.smoothness),this._afterBind(t,this._activeEffect,r))}getAnimatables(){return[]}dispose(e){super.dispose(e)}clone(e){return A.Clone(()=>new U(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.GradientMaterial",e}getClassName(){return"GradientMaterial"}static Parse(e,t,r){return A.Parse(()=>new U(e.name,t),e,t,r)}}n([l("maxSimultaneousLights")],U.prototype,"_maxSimultaneousLights",void 0);n([d("_markAllSubMeshesAsLightsDirty")],U.prototype,"maxSimultaneousLights",void 0);n([y()],U.prototype,"topColor",void 0);n([l()],U.prototype,"topColorAlpha",void 0);n([y()],U.prototype,"bottomColor",void 0);n([l()],U.prototype,"bottomColorAlpha",void 0);n([l()],U.prototype,"offset",void 0);n([l()],U.prototype,"scale",void 0);n([l()],U.prototype,"smoothness",void 0);n([l("disableLighting")],U.prototype,"_disableLighting",void 0);n([d("_markAllSubMeshesAsLightsDirty")],U.prototype,"disableLighting",void 0);F("BABYLON.GradientMaterial",U);const ri="gridPixelShader",oi=`#extension GL_OES_standard_derivatives : enable
#define SQRT2 1.41421356
#define PI 3.14159
precision highp float;uniform float visibility;uniform vec3 mainColor;uniform vec3 lineColor;uniform vec4 gridControl;uniform vec3 gridOffset;varying vec3 vPosition;varying vec3 vNormal;
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#ifdef OPACITY
varying vec2 vOpacityUV;uniform sampler2D opacitySampler;uniform vec2 vOpacityInfos;
#endif
float getDynamicVisibility(float position) {float majorGridFrequency=gridControl.y;if (floor(position+0.5)==floor(position/majorGridFrequency+0.5)*majorGridFrequency)
{return 1.0;}
return gridControl.z;}
float getAnisotropicAttenuation(float differentialLength) {const float maxNumberOfLines=10.0;return clamp(1.0/(differentialLength+1.0)-1.0/maxNumberOfLines,0.0,1.0);}
float isPointOnLine(float position,float differentialLength) {float fractionPartOfPosition=position-floor(position+0.5); 
fractionPartOfPosition/=differentialLength; 
#ifdef ANTIALIAS
fractionPartOfPosition=clamp(fractionPartOfPosition,-1.,1.);float result=0.5+0.5*cos(fractionPartOfPosition*PI); 
return result;
#else
return abs(fractionPartOfPosition)<SQRT2/4. ? 1. : 0.;
#endif
}
float contributionOnAxis(float position) {float differentialLength=length(vec2(dFdx(position),dFdy(position)));differentialLength*=SQRT2; 
float result=isPointOnLine(position,differentialLength);float dynamicVisibility=getDynamicVisibility(position);result*=dynamicVisibility;float anisotropicAttenuation=getAnisotropicAttenuation(differentialLength);result*=anisotropicAttenuation;return result;}
float normalImpactOnAxis(float x) {float normalImpact=clamp(1.0-3.0*abs(x*x*x),0.0,1.0);return normalImpact;}
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
float gridRatio=gridControl.x;vec3 gridPos=(vPosition+gridOffset.xyz)/gridRatio;float x=contributionOnAxis(gridPos.x);float y=contributionOnAxis(gridPos.y);float z=contributionOnAxis(gridPos.z);vec3 normal=normalize(vNormal);x*=normalImpactOnAxis(normal.x);y*=normalImpactOnAxis(normal.y);z*=normalImpactOnAxis(normal.z);
#ifdef MAX_LINE
float grid=clamp(max(max(x,y),z),0.,1.);
#else
float grid=clamp(x+y+z,0.,1.);
#endif
vec3 color=mix(mainColor,lineColor,grid);
#ifdef FOG
#include<fogFragment>
#endif
float opacity=1.0;
#ifdef TRANSPARENT
opacity=clamp(grid,0.08,gridControl.w*grid);
#endif
#ifdef OPACITY
opacity*=texture2D(opacitySampler,vOpacityUV).a;
#endif
gl_FragColor=vec4(color.rgb,opacity*visibility);
#ifdef TRANSPARENT
#ifdef PREMULTIPLYALPHA
gl_FragColor.rgb*=opacity;
#endif
#else
#endif
#include<logDepthFragment>
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}
`;C.ShadersStore[ri]=oi;const ni="gridVertexShader",ai=`precision highp float;attribute vec3 position;attribute vec3 normal;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#include<instancesDeclaration>
uniform mat4 projection;uniform mat4 view;varying vec3 vPosition;varying vec3 vNormal;
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#ifdef OPACITY
varying vec2 vOpacityUV;uniform mat4 opacityMatrix;uniform vec2 vOpacityInfos;
#endif
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
vec4 worldPos=finalWorld*vec4(position,1.0);
#include<fogVertex>
vec4 cameraSpacePosition=view*worldPos;gl_Position=projection*cameraSpacePosition;
#ifdef OPACITY
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
if (vOpacityInfos.x==0.)
{vOpacityUV=vec2(opacityMatrix*vec4(uv,1.0,0.0));}
else
{vOpacityUV=vec2(opacityMatrix*vec4(uv2,1.0,0.0));}
#endif 
#include<logDepthVertex>
vPosition=position;vNormal=normal;
#define CUSTOM_VERTEX_MAIN_END
}`;C.ShadersStore[ni]=ai;class fi extends G{constructor(){super(),this.OPACITY=!1,this.ANTIALIAS=!1,this.TRANSPARENT=!1,this.FOG=!1,this.PREMULTIPLYALPHA=!1,this.MAX_LINE=!1,this.UV1=!1,this.UV2=!1,this.INSTANCES=!1,this.THIN_INSTANCES=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class D extends B{constructor(e,t){super(e,t),this.mainColor=E.Black(),this.lineColor=E.Teal(),this.gridRatio=1,this.gridOffset=w.Zero(),this.majorUnitFrequency=10,this.minorUnitVisibility=.33,this.opacity=1,this.antialias=!0,this.preMultiplyAlpha=!1,this.useMaxLine=!1,this._gridControl=new Ae(this.gridRatio,this.majorUnitFrequency,this.minorUnitVisibility,this.opacity)}needAlphaBlending(){return this.opacity<1||this._opacityTexture&&this._opacityTexture.isReady()}needAlphaBlendingForMesh(e){return e.visibility<1||this.needAlphaBlending()}isReadyForSubMesh(e,t,r){const s=t._drawWrapper;if(this.isFrozen&&s.effect&&s._wasPreviouslyReady&&s._wasPreviouslyUsingInstances===r)return!0;t.materialDefines||(t.materialDefines=new fi);const i=t.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;if(i.TRANSPARENT!==this.opacity<1&&(i.TRANSPARENT=!i.TRANSPARENT,i.markAsUnprocessed()),i.PREMULTIPLYALPHA!=this.preMultiplyAlpha&&(i.PREMULTIPLYALPHA=!i.PREMULTIPLYALPHA,i.markAsUnprocessed()),i.MAX_LINE!==this.useMaxLine&&(i.MAX_LINE=!i.MAX_LINE,i.markAsUnprocessed()),i.ANTIALIAS!==this.antialias&&(i.ANTIALIAS=!i.ANTIALIAS,i.markAsUnprocessed()),i._areTexturesDirty&&(i._needUVs=!1,o.texturesEnabled&&this._opacityTexture&&P.OpacityTextureEnabled))if(this._opacityTexture.isReady())i._needUVs=!0,i.OPACITY=!0;else return!1;if(X(e,o,this._useLogarithmicDepth,!1,this.fogEnabled,!1,i),k(o,o.getEngine(),this,i,!!r),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial(),z(e,i,!1,!1);const u=[c.PositionKind,c.NormalKind];i.UV1&&u.push(c.UVKind),i.UV2&&u.push(c.UV2Kind),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess,Z(u,i);const a=i.toString();t.setEffect(o.getEngine().createEffect("grid",u,["projection","mainColor","lineColor","gridControl","gridOffset","vFogInfos","vFogColor","world","view","opacityMatrix","vOpacityInfos","visibility","logarithmicDepthConstant"],["opacitySampler"],a,void 0,this.onCompiled,this.onError),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=o.getRenderId(),s._wasPreviouslyReady=!0,s._wasPreviouslyUsingInstances=!!r,!0)}bindForSubMesh(e,t,r){const s=this.getScene(),i=r.materialDefines;if(!i)return;const o=r.effect;o&&(this._activeEffect=o,this._activeEffect.setFloat("visibility",t.visibility),(!i.INSTANCES||i.THIN_INSTANCE)&&this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("view",s.getViewMatrix()),this._activeEffect.setMatrix("projection",s.getProjectionMatrix()),this._mustRebind(s,o,r)&&(this._activeEffect.setColor3("mainColor",this.mainColor),this._activeEffect.setColor3("lineColor",this.lineColor),this._activeEffect.setVector3("gridOffset",this.gridOffset),this._gridControl.x=this.gridRatio,this._gridControl.y=Math.round(this.majorUnitFrequency),this._gridControl.z=this.minorUnitVisibility,this._gridControl.w=this.opacity,this._activeEffect.setVector4("gridControl",this._gridControl),this._opacityTexture&&P.OpacityTextureEnabled&&(this._activeEffect.setTexture("opacitySampler",this._opacityTexture),this._activeEffect.setFloat2("vOpacityInfos",this._opacityTexture.coordinatesIndex,this._opacityTexture.level),this._activeEffect.setMatrix("opacityMatrix",this._opacityTexture.getTextureMatrix())),this._useLogarithmicDepth&&b(i,o,s)),W(s,t,this._activeEffect),this._afterBind(t,this._activeEffect,r))}dispose(e){super.dispose(e)}clone(e){return A.Clone(()=>new D(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.GridMaterial",e}getClassName(){return"GridMaterial"}static Parse(e,t,r){return A.Parse(()=>new D(e.name,t),e,t,r)}}n([y()],D.prototype,"mainColor",void 0);n([y()],D.prototype,"lineColor",void 0);n([l()],D.prototype,"gridRatio",void 0);n([fe()],D.prototype,"gridOffset",void 0);n([l()],D.prototype,"majorUnitFrequency",void 0);n([l()],D.prototype,"minorUnitVisibility",void 0);n([l()],D.prototype,"opacity",void 0);n([l()],D.prototype,"antialias",void 0);n([l()],D.prototype,"preMultiplyAlpha",void 0);n([l()],D.prototype,"useMaxLine",void 0);n([v("opacityTexture")],D.prototype,"_opacityTexture",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],D.prototype,"opacityTexture",void 0);F("BABYLON.GridMaterial",D);const li="lavaPixelShader",ui=`precision highp float;uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;varying vec3 vPositionW;uniform float time;uniform float speed;uniform float movingSpeed;uniform vec3 fogColor;uniform sampler2D noiseTexture;uniform float fogDensity;varying float noise;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0]
#include<__decl__lightFragment>[1]
#include<__decl__lightFragment>[2]
#include<__decl__lightFragment>[3]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform sampler2D diffuseSampler;uniform vec2 vDiffuseInfos;
#endif
#include<clipPlaneFragmentDeclaration>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
float random( vec3 scale,float seed ){return fract( sin( dot( gl_FragCoord.xyz+seed,scale ) )*43758.5453+seed ) ;}
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=vec4(1.,1.,1.,1.);vec3 diffuseColor=vDiffuseColor.rgb;float alpha=vDiffuseColor.a;
#ifdef DIFFUSE
vec4 noiseTex=texture2D( noiseTexture,vDiffuseUV );vec2 T1=vDiffuseUV+vec2( 1.5,-1.5 )*time *0.02;vec2 T2=vDiffuseUV+vec2( -0.5,2.0 )*time*0.01*speed;T1.x+=noiseTex.x*2.0;T1.y+=noiseTex.y*2.0;T2.x-=noiseTex.y*0.2+time*0.001*movingSpeed;T2.y+=noiseTex.z*0.2+time*0.002*movingSpeed;float p=texture2D( noiseTexture,T1*3.0 ).a;vec4 lavaColor=texture2D( diffuseSampler,T2*4.0);vec4 temp=lavaColor*( vec4( p,p,p,p )*2. )+( lavaColor*lavaColor-0.1 );baseColor=temp;float depth=gl_FragCoord.z*4.0;const float LOG2=1.442695;float fogFactor=exp2(-fogDensity*fogDensity*depth*depth*LOG2 );fogFactor=1.0-clamp( fogFactor,0.0,1.0 );baseColor=mix( baseColor,vec4( fogColor,baseColor.w ),fogFactor );diffuseColor=baseColor.rgb;
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
baseColor.rgb*=vDiffuseInfos.y;
#endif
#ifdef VERTEXCOLOR
baseColor.rgb*=vColor.rgb;
#endif
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
#ifdef UNLIT
vec3 diffuseBase=vec3(1.,1.,1.);
#else
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float glossiness=0.;float aggShadow=0.;float numLights=0.;
#include<lightFragment>[0]
#include<lightFragment>[1]
#include<lightFragment>[2]
#include<lightFragment>[3]
#endif
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;vec4 color=vec4(finalDiffuse,alpha);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;C.ShadersStore[li]=ui;const di="lavaVertexShader",ci=`precision highp float;uniform float time;uniform float lowFrequencySpeed;varying float noise;attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform mat4 diffuseMatrix;uniform vec2 vDiffuseInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
/* NOISE FUNCTIONS */
vec3 mod289(vec3 x)
{return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x)
{return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x)
{return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r)
{return 1.79284291400159-0.85373472095314*r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
float pnoise(vec3 P,vec3 rep)
{vec3 Pi0=mod(floor(P),rep); 
vec3 Pi1=mod(Pi0+vec3(1.0),rep); 
Pi0=mod289(Pi0);Pi1=mod289(Pi1);vec3 Pf0=fract(P); 
vec3 Pf1=Pf0-vec3(1.0); 
vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);vec4 iy=vec4(Pi0.yy,Pi1.yy);vec4 iz0=Pi0.zzzz;vec4 iz1=Pi1.zzzz;vec4 ixy=permute(permute(ix)+iy);vec4 ixy0=permute(ixy+iz0);vec4 ixy1=permute(ixy+iz1);vec4 gx0=ixy0*(1.0/7.0);vec4 gy0=fract(floor(gx0)*(1.0/7.0))-0.5;gx0=fract(gx0);vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);vec4 sz0=step(gz0,vec4(0.0));gx0-=sz0*(step(0.0,gx0)-0.5);gy0-=sz0*(step(0.0,gy0)-0.5);vec4 gx1=ixy1*(1.0/7.0);vec4 gy1=fract(floor(gx1)*(1.0/7.0))-0.5;gx1=fract(gx1);vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);vec4 sz1=step(gz1,vec4(0.0));gx1-=sz1*(step(0.0,gx1)-0.5);gy1-=sz1*(step(0.0,gy1)-0.5);vec3 g000=vec3(gx0.x,gy0.x,gz0.x);vec3 g100=vec3(gx0.y,gy0.y,gz0.y);vec3 g010=vec3(gx0.z,gy0.z,gz0.z);vec3 g110=vec3(gx0.w,gy0.w,gz0.w);vec3 g001=vec3(gx1.x,gy1.x,gz1.x);vec3 g101=vec3(gx1.y,gy1.y,gz1.y);vec3 g011=vec3(gx1.z,gy1.z,gz1.z);vec3 g111=vec3(gx1.w,gy1.w,gz1.w);vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));g000*=norm0.x;g010*=norm0.y;g100*=norm0.z;g110*=norm0.w;vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));g001*=norm1.x;g011*=norm1.y;g101*=norm1.z;g111*=norm1.w;float n000=dot(g000,Pf0);float n100=dot(g100,vec3(Pf1.x,Pf0.yz));float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));float n110=dot(g110,vec3(Pf1.xy,Pf0.z));float n001=dot(g001,vec3(Pf0.xy,Pf1.z));float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));float n011=dot(g011,vec3(Pf0.x,Pf1.yz));float n111=dot(g111,Pf1);vec3 fade_xyz=fade(Pf0);vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);float n_xyz=mix(n_yz.x,n_yz.y,fade_xyz.x);return 2.2*n_xyz;}
/* END FUNCTION */
float turbulence( vec3 p ) {float w=100.0;float t=-.5;for (float f=1.0 ; f<=10.0 ; f++ ){float power=pow( 2.0,f );t+=abs( pnoise( vec3( power*p ),vec3( 10.0,10.0,10.0 ) )/power );}
return t;}
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
#ifdef NORMAL
noise=10.0* -.10*turbulence( .5*normal+time*1.15 );float b=lowFrequencySpeed*5.0*pnoise( 0.05*position +vec3(time*1.025),vec3( 100.0 ) );float displacement=- 1.5*noise+b;vec3 newPosition=position+normal*displacement;gl_Position=viewProjection*finalWorld*vec4( newPosition,1.0 );vec4 worldPos=finalWorld*vec4(newPosition,1.0);vPositionW=vec3(worldPos);vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x==0.)
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));}
else
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));}
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#include<logDepthVertex>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}`;C.ShadersStore[di]=ci;class hi extends G{constructor(){super(),this.DIFFUSE=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.LIGHT0=!1,this.LIGHT1=!1,this.LIGHT2=!1,this.LIGHT3=!1,this.SPOTLIGHT0=!1,this.SPOTLIGHT1=!1,this.SPOTLIGHT2=!1,this.SPOTLIGHT3=!1,this.HEMILIGHT0=!1,this.HEMILIGHT1=!1,this.HEMILIGHT2=!1,this.HEMILIGHT3=!1,this.DIRLIGHT0=!1,this.DIRLIGHT1=!1,this.DIRLIGHT2=!1,this.DIRLIGHT3=!1,this.POINTLIGHT0=!1,this.POINTLIGHT1=!1,this.POINTLIGHT2=!1,this.POINTLIGHT3=!1,this.SHADOW0=!1,this.SHADOW1=!1,this.SHADOW2=!1,this.SHADOW3=!1,this.SHADOWS=!1,this.SHADOWESM0=!1,this.SHADOWESM1=!1,this.SHADOWESM2=!1,this.SHADOWESM3=!1,this.SHADOWPOISSON0=!1,this.SHADOWPOISSON1=!1,this.SHADOWPOISSON2=!1,this.SHADOWPOISSON3=!1,this.SHADOWPCF0=!1,this.SHADOWPCF1=!1,this.SHADOWPCF2=!1,this.SHADOWPCF3=!1,this.SHADOWPCSS0=!1,this.SHADOWPCSS1=!1,this.SHADOWPCSS2=!1,this.SHADOWPCSS3=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.UNLIT=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class O extends B{constructor(e,t){super(e,t),this.speed=1,this.movingSpeed=1,this.lowFrequencySpeed=1,this.fogDensity=.15,this._lastTime=0,this.diffuseColor=new E(1,1,1),this._disableLighting=!1,this._unlit=!1,this._maxSimultaneousLights=4,this._scaledDiffuse=new E}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,r){const s=t._drawWrapper;if(this.isFrozen&&s.effect&&s._wasPreviouslyReady&&s._wasPreviouslyUsingInstances===r)return!0;t.materialDefines||(t.materialDefines=new hi);const i=t.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;const u=o.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,o.texturesEnabled&&this._diffuseTexture&&P.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(X(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=!0,ie(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),k(o,u,this,i,!!r),z(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();const a=new j;i.FOG&&a.addFallback(1,"FOG"),te(i,a),i.NUM_BONE_INFLUENCERS>0&&a.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;const f=[c.PositionKind];i.NORMAL&&f.push(c.NormalKind),i.UV1&&f.push(c.UVKind),i.UV2&&f.push(c.UV2Kind),i.VERTEXCOLOR&&f.push(c.ColorKind),q(f,e,i,a),Z(f,i);const h="lava",p=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","diffuseMatrix","logarithmicDepthConstant","time","speed","movingSpeed","fogColor","fogDensity","lowFrequencySpeed"];Y(m);const _=["diffuseSampler","noiseTexture"],g=[];se({uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect(h,{attributes:f,uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:p,fallbacks:a,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},u),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=o.getRenderId(),s._wasPreviouslyReady=!0,s._wasPreviouslyUsingInstances=!!r,!0)}bindForSubMesh(e,t,r){const s=this.getScene(),i=r.materialDefines;if(!i)return;const o=r.effect;o&&(this._activeEffect=o,i.UNLIT=this._unlit,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),Q(t,this._activeEffect),this._mustRebind(s,o,r)&&(this.diffuseTexture&&P.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this.diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this.diffuseTexture.coordinatesIndex,this.diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this.diffuseTexture.getTextureMatrix())),this.noiseTexture&&this._activeEffect.setTexture("noiseTexture",this.noiseTexture),K(o,this,s),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._useLogarithmicDepth&&b(i,o,s),s.bindEyePosition(o)),this._activeEffect.setColor4("vDiffuseColor",this._scaledDiffuse,this.alpha*t.visibility),s.lightsEnabled&&!this.disableLighting&&re(s,t,this._activeEffect,i),s.fogEnabled&&t.applyFog&&s.fogMode!==V.FOGMODE_NONE&&this._activeEffect.setMatrix("view",s.getViewMatrix()),W(s,t,this._activeEffect),this._lastTime+=s.getEngine().getDeltaTime(),this._activeEffect.setFloat("time",this._lastTime*this.speed/1e3),this.fogColor||(this.fogColor=E.Black()),this._activeEffect.setColor3("fogColor",this.fogColor),this._activeEffect.setFloat("fogDensity",this.fogDensity),this._activeEffect.setFloat("lowFrequencySpeed",this.lowFrequencySpeed),this._activeEffect.setFloat("movingSpeed",this.movingSpeed),this._afterBind(t,this._activeEffect,r))}getAnimatables(){const e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),this.noiseTexture&&this.noiseTexture.animations&&this.noiseTexture.animations.length>0&&e.push(this.noiseTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTexture&&e.push(this._diffuseTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this.diffuseTexture===e)}dispose(e){this.diffuseTexture&&this.diffuseTexture.dispose(),this.noiseTexture&&this.noiseTexture.dispose(),super.dispose(e)}clone(e){return A.Clone(()=>new O(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.LavaMaterial",e}getClassName(){return"LavaMaterial"}static Parse(e,t,r){return A.Parse(()=>new O(e.name,t),e,t,r)}}n([v("diffuseTexture")],O.prototype,"_diffuseTexture",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],O.prototype,"diffuseTexture",void 0);n([v()],O.prototype,"noiseTexture",void 0);n([y()],O.prototype,"fogColor",void 0);n([l()],O.prototype,"speed",void 0);n([l()],O.prototype,"movingSpeed",void 0);n([l()],O.prototype,"lowFrequencySpeed",void 0);n([l()],O.prototype,"fogDensity",void 0);n([y()],O.prototype,"diffuseColor",void 0);n([l("disableLighting")],O.prototype,"_disableLighting",void 0);n([d("_markAllSubMeshesAsLightsDirty")],O.prototype,"disableLighting",void 0);n([l("unlit")],O.prototype,"_unlit",void 0);n([d("_markAllSubMeshesAsLightsDirty")],O.prototype,"unlit",void 0);n([l("maxSimultaneousLights")],O.prototype,"_maxSimultaneousLights",void 0);n([d("_markAllSubMeshesAsLightsDirty")],O.prototype,"maxSimultaneousLights",void 0);F("BABYLON.LavaMaterial",O);const mi="mixPixelShader",vi=`precision highp float;uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;
#ifdef SPECULARTERM
uniform vec4 vSpecularColor;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#ifdef DIFFUSE
varying vec2 vTextureUV;uniform sampler2D mixMap1Sampler;uniform vec2 vTextureInfos;
#ifdef MIXMAP2
uniform sampler2D mixMap2Sampler;
#endif
uniform sampler2D diffuse1Sampler;uniform sampler2D diffuse2Sampler;uniform sampler2D diffuse3Sampler;uniform sampler2D diffuse4Sampler;uniform vec2 diffuse1Infos;uniform vec2 diffuse2Infos;uniform vec2 diffuse3Infos;uniform vec2 diffuse4Infos;
#ifdef MIXMAP2
uniform sampler2D diffuse5Sampler;uniform sampler2D diffuse6Sampler;uniform sampler2D diffuse7Sampler;uniform sampler2D diffuse8Sampler;uniform vec2 diffuse5Infos;uniform vec2 diffuse6Infos;uniform vec2 diffuse7Infos;uniform vec2 diffuse8Infos;
#endif
#endif
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 finalMixColor=vec4(1.,1.,1.,1.);vec3 diffuseColor=vDiffuseColor.rgb;
#ifdef MIXMAP2
vec4 mixColor2=vec4(1.,1.,1.,1.);
#endif
#ifdef SPECULARTERM
float glossiness=vSpecularColor.a;vec3 specularColor=vSpecularColor.rgb;
#else
float glossiness=0.;
#endif
float alpha=vDiffuseColor.a;
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
#ifdef DIFFUSE
vec4 mixColor=texture2D(mixMap1Sampler,vTextureUV);
#include<depthPrePass>
mixColor.rgb*=vTextureInfos.y;vec4 diffuse1Color=texture2D(diffuse1Sampler,vTextureUV*diffuse1Infos);vec4 diffuse2Color=texture2D(diffuse2Sampler,vTextureUV*diffuse2Infos);vec4 diffuse3Color=texture2D(diffuse3Sampler,vTextureUV*diffuse3Infos);vec4 diffuse4Color=texture2D(diffuse4Sampler,vTextureUV*diffuse4Infos);diffuse1Color.rgb*=mixColor.r;diffuse2Color.rgb=mix(diffuse1Color.rgb,diffuse2Color.rgb,mixColor.g);diffuse3Color.rgb=mix(diffuse2Color.rgb,diffuse3Color.rgb,mixColor.b);finalMixColor.rgb=mix(diffuse3Color.rgb,diffuse4Color.rgb,1.0-mixColor.a);
#ifdef MIXMAP2
mixColor=texture2D(mixMap2Sampler,vTextureUV);mixColor.rgb*=vTextureInfos.y;vec4 diffuse5Color=texture2D(diffuse5Sampler,vTextureUV*diffuse5Infos);vec4 diffuse6Color=texture2D(diffuse6Sampler,vTextureUV*diffuse6Infos);vec4 diffuse7Color=texture2D(diffuse7Sampler,vTextureUV*diffuse7Infos);vec4 diffuse8Color=texture2D(diffuse8Sampler,vTextureUV*diffuse8Infos);diffuse5Color.rgb=mix(finalMixColor.rgb,diffuse5Color.rgb,mixColor.r);diffuse6Color.rgb=mix(diffuse5Color.rgb,diffuse6Color.rgb,mixColor.g);diffuse7Color.rgb=mix(diffuse6Color.rgb,diffuse7Color.rgb,mixColor.b);finalMixColor.rgb=mix(diffuse7Color.rgb,diffuse8Color.rgb,1.0-mixColor.a);
#endif
#endif
#ifdef VERTEXCOLOR
finalMixColor.rgb*=vColor.rgb;
#endif
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float aggShadow=0.;float numLights=0.;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
#include<lightFragment>[0..maxSimultaneousLights]
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase*specularColor;
#else
vec3 finalSpecular=vec3(0.0);
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor*finalMixColor.rgb,0.0,1.0);vec4 color=vec4(finalDiffuse+finalSpecular,alpha);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}
`;C.ShadersStore[mi]=vi;const pi="mixVertexShader",gi=`precision highp float;attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vTextureUV;uniform mat4 textureMatrix;uniform vec2 vTextureInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vTextureInfos.x==0.)
{vTextureUV=vec2(textureMatrix*vec4(uv,1.0,0.0));}
else
{vTextureUV=vec2(textureMatrix*vec4(uv2,1.0,0.0));}
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#include<logDepthVertex>
#define CUSTOM_VERTEX_MAIN_END
}
`;C.ShadersStore[pi]=gi;class Ti extends G{constructor(){super(),this.DIFFUSE=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.SPECULARTERM=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.MIXMAP2=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class x extends B{constructor(e,t){super(e,t),this.diffuseColor=new E(1,1,1),this.specularColor=new E(0,0,0),this.specularPower=64,this._disableLighting=!1,this._maxSimultaneousLights=4}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,r){const s=t._drawWrapper;if(this.isFrozen&&s.effect&&s._wasPreviouslyReady&&s._wasPreviouslyUsingInstances===r)return!0;t.materialDefines||(t.materialDefines=new Ti);const i=t.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;const u=o.getEngine();if(o.texturesEnabled&&(!this._mixTexture1||!this._mixTexture1.isReady()||(i._needUVs=!0,P.DiffuseTextureEnabled&&(!this._diffuseTexture1||!this._diffuseTexture1.isReady()||(i.DIFFUSE=!0,!this._diffuseTexture2||!this._diffuseTexture2.isReady())||!this._diffuseTexture3||!this._diffuseTexture3.isReady()||!this._diffuseTexture4||!this._diffuseTexture4.isReady()||this._mixTexture2&&(!this._mixTexture2.isReady()||(i.MIXMAP2=!0,!this._diffuseTexture5||!this._diffuseTexture5.isReady())||!this._diffuseTexture6||!this._diffuseTexture6.isReady()||!this._diffuseTexture7||!this._diffuseTexture7.isReady()||!this._diffuseTexture8||!this._diffuseTexture8.isReady())))))return!1;if(X(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=ie(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),k(o,u,this,i,!!r),z(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();const a=new j;i.FOG&&a.addFallback(1,"FOG"),te(i,a,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&a.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;const f=[c.PositionKind];i.NORMAL&&f.push(c.NormalKind),i.UV1&&f.push(c.UVKind),i.UV2&&f.push(c.UV2Kind),i.VERTEXCOLOR&&f.push(c.ColorKind),q(f,e,i,a),Z(f,i);const h="mix",p=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vTextureInfos","mBones","textureMatrix","logarithmicDepthConstant","diffuse1Infos","diffuse2Infos","diffuse3Infos","diffuse4Infos","diffuse5Infos","diffuse6Infos","diffuse7Infos","diffuse8Infos"],_=["mixMap1Sampler","mixMap2Sampler","diffuse1Sampler","diffuse2Sampler","diffuse3Sampler","diffuse4Sampler","diffuse5Sampler","diffuse6Sampler","diffuse7Sampler","diffuse8Sampler"],g=[];Y(m),se({uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect(h,{attributes:f,uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:p,fallbacks:a,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},u),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=o.getRenderId(),s._wasPreviouslyReady=!0,s._wasPreviouslyUsingInstances=!!r,!0)}bindForSubMesh(e,t,r){const s=this.getScene(),i=r.materialDefines;if(!i)return;const o=r.effect;o&&(this._activeEffect=o,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),Q(t,this._activeEffect),this._mustRebind(s,o,r)&&(this._mixTexture1&&(this._activeEffect.setTexture("mixMap1Sampler",this._mixTexture1),this._activeEffect.setFloat2("vTextureInfos",this._mixTexture1.coordinatesIndex,this._mixTexture1.level),this._activeEffect.setMatrix("textureMatrix",this._mixTexture1.getTextureMatrix()),P.DiffuseTextureEnabled&&(this._diffuseTexture1&&(this._activeEffect.setTexture("diffuse1Sampler",this._diffuseTexture1),this._activeEffect.setFloat2("diffuse1Infos",this._diffuseTexture1.uScale,this._diffuseTexture1.vScale)),this._diffuseTexture2&&(this._activeEffect.setTexture("diffuse2Sampler",this._diffuseTexture2),this._activeEffect.setFloat2("diffuse2Infos",this._diffuseTexture2.uScale,this._diffuseTexture2.vScale)),this._diffuseTexture3&&(this._activeEffect.setTexture("diffuse3Sampler",this._diffuseTexture3),this._activeEffect.setFloat2("diffuse3Infos",this._diffuseTexture3.uScale,this._diffuseTexture3.vScale)),this._diffuseTexture4&&(this._activeEffect.setTexture("diffuse4Sampler",this._diffuseTexture4),this._activeEffect.setFloat2("diffuse4Infos",this._diffuseTexture4.uScale,this._diffuseTexture4.vScale)))),this._mixTexture2&&(this._activeEffect.setTexture("mixMap2Sampler",this._mixTexture2),P.DiffuseTextureEnabled&&(this._diffuseTexture5&&(this._activeEffect.setTexture("diffuse5Sampler",this._diffuseTexture5),this._activeEffect.setFloat2("diffuse5Infos",this._diffuseTexture5.uScale,this._diffuseTexture5.vScale)),this._diffuseTexture6&&(this._activeEffect.setTexture("diffuse6Sampler",this._diffuseTexture6),this._activeEffect.setFloat2("diffuse6Infos",this._diffuseTexture6.uScale,this._diffuseTexture6.vScale)),this._diffuseTexture7&&(this._activeEffect.setTexture("diffuse7Sampler",this._diffuseTexture7),this._activeEffect.setFloat2("diffuse7Infos",this._diffuseTexture7.uScale,this._diffuseTexture7.vScale)),this._diffuseTexture8&&(this._activeEffect.setTexture("diffuse8Sampler",this._diffuseTexture8),this._activeEffect.setFloat2("diffuse8Infos",this._diffuseTexture8.uScale,this._diffuseTexture8.vScale)))),K(o,this,s),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._useLogarithmicDepth&&b(i,o,s),s.bindEyePosition(o)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),i.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),s.lightsEnabled&&!this.disableLighting&&re(s,t,this._activeEffect,i,this.maxSimultaneousLights),s.fogEnabled&&t.applyFog&&s.fogMode!==V.FOGMODE_NONE&&this._activeEffect.setMatrix("view",s.getViewMatrix()),W(s,t,this._activeEffect),this._afterBind(t,this._activeEffect,r))}getAnimatables(){const e=[];return this._mixTexture1&&this._mixTexture1.animations&&this._mixTexture1.animations.length>0&&e.push(this._mixTexture1),this._mixTexture2&&this._mixTexture2.animations&&this._mixTexture2.animations.length>0&&e.push(this._mixTexture2),e}getActiveTextures(){const e=super.getActiveTextures();return this._mixTexture1&&e.push(this._mixTexture1),this._diffuseTexture1&&e.push(this._diffuseTexture1),this._diffuseTexture2&&e.push(this._diffuseTexture2),this._diffuseTexture3&&e.push(this._diffuseTexture3),this._diffuseTexture4&&e.push(this._diffuseTexture4),this._mixTexture2&&e.push(this._mixTexture2),this._diffuseTexture5&&e.push(this._diffuseTexture5),this._diffuseTexture6&&e.push(this._diffuseTexture6),this._diffuseTexture7&&e.push(this._diffuseTexture7),this._diffuseTexture8&&e.push(this._diffuseTexture8),e}hasTexture(e){return!!(super.hasTexture(e)||this._mixTexture1===e||this._diffuseTexture1===e||this._diffuseTexture2===e||this._diffuseTexture3===e||this._diffuseTexture4===e||this._mixTexture2===e||this._diffuseTexture5===e||this._diffuseTexture6===e||this._diffuseTexture7===e||this._diffuseTexture8===e)}dispose(e){this._mixTexture1&&this._mixTexture1.dispose(),super.dispose(e)}clone(e){return A.Clone(()=>new x(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.MixMaterial",e}getClassName(){return"MixMaterial"}static Parse(e,t,r){return A.Parse(()=>new x(e.name,t),e,t,r)}}n([v("mixTexture1")],x.prototype,"_mixTexture1",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],x.prototype,"mixTexture1",void 0);n([v("mixTexture2")],x.prototype,"_mixTexture2",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],x.prototype,"mixTexture2",void 0);n([v("diffuseTexture1")],x.prototype,"_diffuseTexture1",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],x.prototype,"diffuseTexture1",void 0);n([v("diffuseTexture2")],x.prototype,"_diffuseTexture2",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],x.prototype,"diffuseTexture2",void 0);n([v("diffuseTexture3")],x.prototype,"_diffuseTexture3",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],x.prototype,"diffuseTexture3",void 0);n([v("diffuseTexture4")],x.prototype,"_diffuseTexture4",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],x.prototype,"diffuseTexture4",void 0);n([v("diffuseTexture1")],x.prototype,"_diffuseTexture5",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],x.prototype,"diffuseTexture5",void 0);n([v("diffuseTexture2")],x.prototype,"_diffuseTexture6",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],x.prototype,"diffuseTexture6",void 0);n([v("diffuseTexture3")],x.prototype,"_diffuseTexture7",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],x.prototype,"diffuseTexture7",void 0);n([v("diffuseTexture4")],x.prototype,"_diffuseTexture8",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],x.prototype,"diffuseTexture8",void 0);n([y()],x.prototype,"diffuseColor",void 0);n([y()],x.prototype,"specularColor",void 0);n([l()],x.prototype,"specularPower",void 0);n([l("disableLighting")],x.prototype,"_disableLighting",void 0);n([d("_markAllSubMeshesAsLightsDirty")],x.prototype,"disableLighting",void 0);n([l("maxSimultaneousLights")],x.prototype,"_maxSimultaneousLights",void 0);n([d("_markAllSubMeshesAsLightsDirty")],x.prototype,"maxSimultaneousLights",void 0);F("BABYLON.MixMaterial",x);const _i="normalPixelShader",xi=`precision highp float;uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef LIGHTING
#include<helperFunctions>
#include<__decl__lightFragment>[0]
#include<__decl__lightFragment>[1]
#include<__decl__lightFragment>[2]
#include<__decl__lightFragment>[3]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#endif
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform sampler2D diffuseSampler;uniform vec2 vDiffuseInfos;
#endif
#include<clipPlaneFragmentDeclaration>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=vec4(1.,1.,1.,1.);vec3 diffuseColor=vDiffuseColor.rgb;float alpha=vDiffuseColor.a;
#ifdef DIFFUSE
baseColor=texture2D(diffuseSampler,vDiffuseUV);
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
baseColor.rgb*=vDiffuseInfos.y;
#endif
#ifdef NORMAL
baseColor=mix(baseColor,vec4(vNormalW,1.0),0.5);
#endif
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
#ifdef LIGHTING
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float glossiness=0.;float aggShadow=0.;float numLights=0.;
#include<lightFragment>[0]
#include<lightFragment>[1]
#include<lightFragment>[2]
#include<lightFragment>[3]
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;
#else
vec3 finalDiffuse= baseColor.rgb;
#endif
vec4 color=vec4(finalDiffuse,alpha);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;C.ShadersStore[_i]=xi;const Ei="normalVertexShader",Si=`precision highp float;attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform mat4 diffuseMatrix;uniform vec2 vDiffuseInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#include<clipPlaneVertexDeclaration>
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x==0.)
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));}
else
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));}
#endif
#include<clipPlaneVertex>
#include<logDepthVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;C.ShadersStore[Ei]=Si;class Ci extends G{constructor(){super(),this.DIFFUSE=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.LIGHT0=!1,this.LIGHT1=!1,this.LIGHT2=!1,this.LIGHT3=!1,this.SPOTLIGHT0=!1,this.SPOTLIGHT1=!1,this.SPOTLIGHT2=!1,this.SPOTLIGHT3=!1,this.HEMILIGHT0=!1,this.HEMILIGHT1=!1,this.HEMILIGHT2=!1,this.HEMILIGHT3=!1,this.DIRLIGHT0=!1,this.DIRLIGHT1=!1,this.DIRLIGHT2=!1,this.DIRLIGHT3=!1,this.POINTLIGHT0=!1,this.POINTLIGHT1=!1,this.POINTLIGHT2=!1,this.POINTLIGHT3=!1,this.SHADOW0=!1,this.SHADOW1=!1,this.SHADOW2=!1,this.SHADOW3=!1,this.SHADOWS=!1,this.SHADOWESM0=!1,this.SHADOWESM1=!1,this.SHADOWESM2=!1,this.SHADOWESM3=!1,this.SHADOWPOISSON0=!1,this.SHADOWPOISSON1=!1,this.SHADOWPOISSON2=!1,this.SHADOWPOISSON3=!1,this.SHADOWPCF0=!1,this.SHADOWPCF1=!1,this.SHADOWPCF2=!1,this.SHADOWPCF3=!1,this.SHADOWPCSS0=!1,this.SHADOWPCSS1=!1,this.SHADOWPCSS2=!1,this.SHADOWPCSS3=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.LIGHTING=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class J extends B{constructor(e,t){super(e,t),this.diffuseColor=new E(1,1,1),this._disableLighting=!1,this._maxSimultaneousLights=4}needAlphaBlending(){return this.alpha<1}needAlphaBlendingForMesh(e){return this.needAlphaBlending()||e.visibility<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,r){const s=t._drawWrapper;if(this.isFrozen&&s.effect&&s._wasPreviouslyReady&&s._wasPreviouslyUsingInstances===r)return!0;t.materialDefines||(t.materialDefines=new Ci);const i=t.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;const u=o.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,o.texturesEnabled&&this._diffuseTexture&&P.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(X(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=!0,ie(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),k(o,u,this,i,!!r),i.LIGHTING=!this._disableLighting,z(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();const a=new j;i.FOG&&a.addFallback(1,"FOG"),te(i,a),i.NUM_BONE_INFLUENCERS>0&&a.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;const f=[c.PositionKind];i.NORMAL&&f.push(c.NormalKind),i.UV1&&f.push(c.UVKind),i.UV2&&f.push(c.UV2Kind),q(f,e,i,a),Z(f,i);const h="normal",p=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","diffuseMatrix","logarithmicDepthConstant"],_=["diffuseSampler"],g=[];Y(m),se({uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:i,maxSimultaneousLights:4}),t.setEffect(o.getEngine().createEffect(h,{attributes:f,uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:p,fallbacks:a,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},u),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=o.getRenderId(),s._wasPreviouslyReady=!0,s._wasPreviouslyUsingInstances=!!r,!0)}bindForSubMesh(e,t,r){const s=this.getScene(),i=r.materialDefines;if(!i)return;const o=r.effect;o&&(this._activeEffect=o,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),Q(t,this._activeEffect),this._mustRebind(s,o,r)&&(this.diffuseTexture&&P.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this.diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this.diffuseTexture.coordinatesIndex,this.diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this.diffuseTexture.getTextureMatrix())),K(o,this,s),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._useLogarithmicDepth&&b(i,o,s),s.bindEyePosition(o)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),s.lightsEnabled&&!this.disableLighting&&re(s,t,this._activeEffect,i),s.fogEnabled&&t.applyFog&&s.fogMode!==V.FOGMODE_NONE&&this._activeEffect.setMatrix("view",s.getViewMatrix()),W(s,t,this._activeEffect),this._afterBind(t,this._activeEffect,r))}getAnimatables(){const e=[];return this.diffuseTexture&&this.diffuseTexture.animations&&this.diffuseTexture.animations.length>0&&e.push(this.diffuseTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTexture&&e.push(this._diffuseTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this.diffuseTexture===e)}dispose(e){this.diffuseTexture&&this.diffuseTexture.dispose(),super.dispose(e)}clone(e){return A.Clone(()=>new J(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.NormalMaterial",e}getClassName(){return"NormalMaterial"}static Parse(e,t,r){return A.Parse(()=>new J(e.name,t),e,t,r)}}n([v("diffuseTexture")],J.prototype,"_diffuseTexture",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],J.prototype,"diffuseTexture",void 0);n([y()],J.prototype,"diffuseColor",void 0);n([l("disableLighting")],J.prototype,"_disableLighting",void 0);n([d("_markAllSubMeshesAsLightsDirty")],J.prototype,"disableLighting",void 0);n([l("maxSimultaneousLights")],J.prototype,"_maxSimultaneousLights",void 0);n([d("_markAllSubMeshesAsLightsDirty")],J.prototype,"maxSimultaneousLights",void 0);F("BABYLON.NormalMaterial",J);const Pi="shadowOnlyPixelShader",Ai=`precision highp float;uniform vec4 vEyePosition;uniform float alpha;uniform vec3 shadowColor;varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float glossiness=0.;float aggShadow=0.;float numLights=0.;
#include<lightFragment>[0..1]
vec4 color=vec4(shadowColor,(1.0-clamp(shadow,0.,1.))*alpha);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;C.ShadersStore[Pi]=Ai;const Ii="shadowOnlyVertexShader",Ni=`precision highp float;attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
#include<clipPlaneVertex>
#include<logDepthVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;C.ShadersStore[Ii]=Ni;class Li extends G{constructor(){super(),this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.POINTSIZE=!1,this.FOG=!1,this.NORMAL=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class ue extends B{constructor(e,t){super(e,t),this._needAlphaBlending=!0,this.shadowColor=E.Black()}needAlphaBlending(){return this._needAlphaBlending}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}get activeLight(){return this._activeLight}set activeLight(e){this._activeLight=e}_getFirstShadowLightForMesh(e){for(const t of e.lightSources)if(t.shadowEnabled)return t;return null}isReadyForSubMesh(e,t,r){var f;const s=t._drawWrapper;if(this.isFrozen&&s.effect&&s._wasPreviouslyReady&&s._wasPreviouslyUsingInstances===r)return!0;t.materialDefines||(t.materialDefines=new Li);const i=t.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;const u=o.getEngine();if(this._activeLight){for(const h of e.lightSources)if(h.shadowEnabled){if(this._activeLight===h)break;const p=e.lightSources.indexOf(this._activeLight);p!==-1&&(e.lightSources.splice(p,1),e.lightSources.splice(0,0,this._activeLight));break}}k(o,u,this,i,!!r),X(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=ie(o,e,i,!1,1);const a=(f=this._getFirstShadowLightForMesh(e))==null?void 0:f.getShadowGenerator();if(this._needAlphaBlending=!0,a&&a.getClassName&&a.getClassName()==="CascadedShadowGenerator"){const h=a;this._needAlphaBlending=!h.autoCalcDepthBounds}if(z(e,i,!1,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();const h=new j;i.FOG&&h.addFallback(1,"FOG"),te(i,h,1),i.NUM_BONE_INFLUENCERS>0&&h.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;const p=[c.PositionKind];i.NORMAL&&p.push(c.NormalKind),q(p,e,i,h),Z(p,i);const m="shadowOnly",_=i.toString(),g=["world","view","viewProjection","vEyePosition","vLightsType","vFogInfos","vFogColor","pointSize","alpha","shadowColor","mBones","logarithmicDepthConstant"],me=[],ve=[];Y(g),se({uniformsNames:g,uniformBuffersNames:ve,samplers:me,defines:i,maxSimultaneousLights:1}),t.setEffect(o.getEngine().createEffect(m,{attributes:p,uniformsNames:g,uniformBuffersNames:ve,samplers:me,defines:_,fallbacks:h,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:1}},u),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=o.getRenderId(),s._wasPreviouslyReady=!0,s._wasPreviouslyUsingInstances=!!r,!0)}bindForSubMesh(e,t,r){const s=this.getScene(),i=r.materialDefines;if(!i)return;const o=r.effect;if(o){if(this._activeEffect=o,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),Q(t,this._activeEffect),this._mustRebind(s,o,r)&&(K(o,this,s),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._activeEffect.setFloat("alpha",this.alpha),this._activeEffect.setColor3("shadowColor",this.shadowColor),this._useLogarithmicDepth&&b(i,o,s),s.bindEyePosition(o)),s.lightsEnabled){re(s,t,this._activeEffect,i,1);const u=this._getFirstShadowLightForMesh(t);u&&(u._renderId=-1)}(s.fogEnabled&&t.applyFog&&s.fogMode!==V.FOGMODE_NONE||i.SHADOWCSM0)&&this._activeEffect.setMatrix("view",s.getViewMatrix()),W(s,t,this._activeEffect),this._afterBind(t,this._activeEffect,r)}}clone(e){return A.Clone(()=>new ue(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.ShadowOnlyMaterial",e}getClassName(){return"ShadowOnlyMaterial"}static Parse(e,t,r){return A.Parse(()=>new ue(e.name,t),e,t,r)}}F("BABYLON.ShadowOnlyMaterial",ue);const yi="simplePixelShader",Oi=`precision highp float;uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform sampler2D diffuseSampler;uniform vec2 vDiffuseInfos;
#endif
#include<clipPlaneFragmentDeclaration>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=vec4(1.,1.,1.,1.);vec3 diffuseColor=vDiffuseColor.rgb;float alpha=vDiffuseColor.a;
#ifdef DIFFUSE
baseColor=texture2D(diffuseSampler,vDiffuseUV);
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
baseColor.rgb*=vDiffuseInfos.y;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
baseColor.rgb*=vColor.rgb;
#endif
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float glossiness=0.;float aggShadow=0.;float numLights=0.;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif 
#include<lightFragment>[0..maxSimultaneousLights]
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;vec4 color=vec4(finalDiffuse,alpha);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}`;C.ShadersStore[yi]=Oi;const Di="simpleVertexShader",Ri=`precision highp float;attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vDiffuseUV;uniform mat4 diffuseMatrix;uniform vec2 vDiffuseInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x==0.)
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));}
else
{vDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));}
#endif
#include<clipPlaneVertex>
#include<logDepthVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;C.ShadersStore[Di]=Ri;class Fi extends G{constructor(){super(),this.DIFFUSE=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class ee extends B{constructor(e,t){super(e,t),this.diffuseColor=new E(1,1,1),this._disableLighting=!1,this._maxSimultaneousLights=4}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,r){const s=t._drawWrapper;if(this.isFrozen&&s.effect&&s._wasPreviouslyReady&&s._wasPreviouslyUsingInstances===r)return!0;t.materialDefines||(t.materialDefines=new Fi);const i=t.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;const u=o.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,o.texturesEnabled&&this._diffuseTexture&&P.DiffuseTextureEnabled))if(this._diffuseTexture.isReady())i._needUVs=!0,i.DIFFUSE=!0;else return!1;if(X(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=ie(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),k(o,u,this,i,!!r),z(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();const a=new j;i.FOG&&a.addFallback(1,"FOG"),te(i,a,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&a.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;const f=[c.PositionKind];i.NORMAL&&f.push(c.NormalKind),i.UV1&&f.push(c.UVKind),i.UV2&&f.push(c.UV2Kind),i.VERTEXCOLOR&&f.push(c.ColorKind),q(f,e,i,a),Z(f,i);const h="simple",p=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vFogInfos","vFogColor","pointSize","vDiffuseInfos","mBones","diffuseMatrix","logarithmicDepthConstant"],_=["diffuseSampler"],g=[];Y(m),se({uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect(h,{attributes:f,uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:p,fallbacks:a,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this._maxSimultaneousLights-1}},u),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=o.getRenderId(),s._wasPreviouslyReady=!0,s._wasPreviouslyUsingInstances=!!r,!0)}bindForSubMesh(e,t,r){const s=this.getScene(),i=r.materialDefines;if(!i)return;const o=r.effect;o&&(this._activeEffect=o,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),Q(t,this._activeEffect),this._mustRebind(s,o,r)&&(this._diffuseTexture&&P.DiffuseTextureEnabled&&(this._activeEffect.setTexture("diffuseSampler",this._diffuseTexture),this._activeEffect.setFloat2("vDiffuseInfos",this._diffuseTexture.coordinatesIndex,this._diffuseTexture.level),this._activeEffect.setMatrix("diffuseMatrix",this._diffuseTexture.getTextureMatrix())),K(o,this,s),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._useLogarithmicDepth&&b(i,o,s),s.bindEyePosition(o)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),s.lightsEnabled&&!this.disableLighting&&re(s,t,this._activeEffect,i,this.maxSimultaneousLights),s.fogEnabled&&t.applyFog&&s.fogMode!==V.FOGMODE_NONE&&this._activeEffect.setMatrix("view",s.getViewMatrix()),W(s,t,this._activeEffect),this._afterBind(t,this._activeEffect,r))}getAnimatables(){const e=[];return this._diffuseTexture&&this._diffuseTexture.animations&&this._diffuseTexture.animations.length>0&&e.push(this._diffuseTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTexture&&e.push(this._diffuseTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this.diffuseTexture===e)}dispose(e){this._diffuseTexture&&this._diffuseTexture.dispose(),super.dispose(e)}clone(e){return A.Clone(()=>new ee(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.SimpleMaterial",e}getClassName(){return"SimpleMaterial"}static Parse(e,t,r){return A.Parse(()=>new ee(e.name,t),e,t,r)}}n([v("diffuseTexture")],ee.prototype,"_diffuseTexture",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],ee.prototype,"diffuseTexture",void 0);n([y("diffuse")],ee.prototype,"diffuseColor",void 0);n([l("disableLighting")],ee.prototype,"_disableLighting",void 0);n([d("_markAllSubMeshesAsLightsDirty")],ee.prototype,"disableLighting",void 0);n([l("maxSimultaneousLights")],ee.prototype,"_maxSimultaneousLights",void 0);n([d("_markAllSubMeshesAsLightsDirty")],ee.prototype,"maxSimultaneousLights",void 0);F("BABYLON.SimpleMaterial",ee);const Mi="skyPixelShader",bi=`precision highp float;varying vec3 vPositionW;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneFragmentDeclaration>
uniform vec3 cameraPosition;uniform vec3 cameraOffset;uniform vec3 up;uniform float luminance;uniform float turbidity;uniform float rayleigh;uniform float mieCoefficient;uniform float mieDirectionalG;uniform vec3 sunPosition;
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
const float e=2.71828182845904523536028747135266249775724709369995957;const float pi=3.141592653589793238462643383279502884197169;const float n=1.0003;const float N=2.545E25;const float pn=0.035;const vec3 lambda=vec3(680E-9,550E-9,450E-9);const vec3 K=vec3(0.686,0.678,0.666);const float v=4.0;const float rayleighZenithLength=8.4E3;const float mieZenithLength=1.25E3;const float EE=1000.0;const float sunAngularDiameterCos=0.999956676946448443553574619906976478926848692873900859324;const float cutoffAngle=pi/1.95;const float steepness=1.5;vec3 totalRayleigh(vec3 lambda)
{return (8.0*pow(pi,3.0)*pow(pow(n,2.0)-1.0,2.0)*(6.0+3.0*pn))/(3.0*N*pow(lambda,vec3(4.0))*(6.0-7.0*pn));}
vec3 simplifiedRayleigh()
{return 0.0005/vec3(94,40,18);}
float rayleighPhase(float cosTheta)
{ 
return (3.0/(16.0*pi))*(1.0+pow(cosTheta,2.0));}
vec3 totalMie(vec3 lambda,vec3 K,float T)
{float c=(0.2*T )*10E-18;return 0.434*c*pi*pow((2.0*pi)/lambda,vec3(v-2.0))*K;}
float hgPhase(float cosTheta,float g)
{return (1.0/(4.0*pi))*((1.0-pow(g,2.0))/pow(1.0-2.0*g*cosTheta+pow(g,2.0),1.5));}
float sunIntensity(float zenithAngleCos)
{return EE*max(0.0,1.0-exp((-(cutoffAngle-acos(zenithAngleCos))/steepness)));}
float A=0.15;float B=0.50;float C=0.10;float D=0.20;float EEE=0.02;float F=0.30;float W=1000.0;vec3 Uncharted2Tonemap(vec3 x)
{return ((x*(A*x+C*B)+D*EEE)/(x*(A*x+B)+D*F))-EEE/F;}
#if DITHER
#include<helperFunctions>
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
/**
*--------------------------------------------------------------------------------------------------
* Sky Color
*--------------------------------------------------------------------------------------------------
*/
float sunfade=1.0-clamp(1.0-exp((sunPosition.y/450000.0)),0.0,1.0);float rayleighCoefficient=rayleigh-(1.0*(1.0-sunfade));vec3 sunDirection=normalize(sunPosition);float sunE=sunIntensity(dot(sunDirection,up));vec3 betaR=simplifiedRayleigh()*rayleighCoefficient;vec3 betaM=totalMie(lambda,K,turbidity)*mieCoefficient;float zenithAngle=acos(max(0.0,dot(up,normalize(vPositionW-cameraPosition+cameraOffset))));float sR=rayleighZenithLength/(cos(zenithAngle)+0.15*pow(93.885-((zenithAngle*180.0)/pi),-1.253));float sM=mieZenithLength/(cos(zenithAngle)+0.15*pow(93.885-((zenithAngle*180.0)/pi),-1.253));vec3 Fex=exp(-(betaR*sR+betaM*sM));float cosTheta=dot(normalize(vPositionW-cameraPosition),sunDirection);float rPhase=rayleighPhase(cosTheta*0.5+0.5);vec3 betaRTheta=betaR*rPhase;float mPhase=hgPhase(cosTheta,mieDirectionalG);vec3 betaMTheta=betaM*mPhase;vec3 Lin=pow(sunE*((betaRTheta+betaMTheta)/(betaR+betaM))*(1.0-Fex),vec3(1.5));Lin*=mix(vec3(1.0),pow(sunE*((betaRTheta+betaMTheta)/(betaR+betaM))*Fex,vec3(1.0/2.0)),clamp(pow(1.0-dot(up,sunDirection),5.0),0.0,1.0));vec3 direction=normalize(vPositionW-cameraPosition);float theta=acos(direction.y);float phi=atan(direction.z,direction.x);vec2 uv=vec2(phi,theta)/vec2(2.0*pi,pi)+vec2(0.5,0.0);vec3 L0=vec3(0.1)*Fex;float sundisk=smoothstep(sunAngularDiameterCos,sunAngularDiameterCos+0.00002,cosTheta);L0+=(sunE*19000.0*Fex)*sundisk;vec3 whiteScale=1.0/Uncharted2Tonemap(vec3(W));vec3 texColor=(Lin+L0);texColor*=0.04 ;texColor+=vec3(0.0,0.001,0.0025)*0.3;float g_fMaxLuminance=1.0;float fLumScaled=0.1/luminance; 
float fLumCompressed=(fLumScaled*(1.0+(fLumScaled/(g_fMaxLuminance*g_fMaxLuminance))))/(1.0+fLumScaled); 
float ExposureBias=fLumCompressed;vec3 curr=Uncharted2Tonemap((log2(2.0/pow(luminance,4.0)))*texColor);vec3 retColor=curr*whiteScale;/**
*--------------------------------------------------------------------------------------------------
* Sky Color
*--------------------------------------------------------------------------------------------------
*/
float alpha=1.0;
#ifdef VERTEXCOLOR
retColor.rgb*=vColor.rgb;
#endif
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
#if DITHER
retColor.rgb+=dither(gl_FragCoord.xy,0.5);
#endif
vec4 color=clamp(vec4(retColor.rgb,alpha),0.0,1.0);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}
`;C.ShadersStore[Mi]=bi;const Ui="skyVertexShader",wi=`precision highp float;attribute vec3 position;
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
uniform mat4 world;uniform mat4 view;uniform mat4 viewProjection;
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<logDepthDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
gl_Position=viewProjection*world*vec4(position,1.0);vec4 worldPos=world*vec4(position,1.0);vPositionW=vec3(worldPos);
#include<clipPlaneVertex>
#include<logDepthVertex>
#include<fogVertex>
#ifdef VERTEXCOLOR
vColor=color;
#endif
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;C.ShadersStore[Ui]=wi;class Vi extends G{constructor(){super(),this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.POINTSIZE=!1,this.FOG=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.DITHER=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class R extends B{constructor(e,t){super(e,t),this.luminance=1,this.turbidity=10,this.rayleigh=2,this.mieCoefficient=.005,this.mieDirectionalG=.8,this.distance=500,this.inclination=.49,this.azimuth=.25,this.sunPosition=new w(0,100,0),this.useSunPosition=!1,this.cameraOffset=w.Zero(),this.up=w.Up(),this.dithering=!1,this._cameraPosition=w.Zero(),this._skyOrientation=new pe}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t){const r=t._drawWrapper;if(this.isFrozen&&r.effect&&r._wasPreviouslyReady)return!0;t.materialDefines||(t.materialDefines=new Vi);const s=t.materialDefines,i=this.getScene();if(this._isReadyForSubMesh(t))return!0;if(X(e,i,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,!1,s),z(e,s,!0,!1),s.IMAGEPROCESSINGPOSTPROCESS!==i.imageProcessingConfiguration.applyByPostProcess&&s.markAsMiscDirty(),s.DITHER!==this.dithering&&s.markAsMiscDirty(),s.isDirty){s.markAsProcessed(),i.resetCachedMaterial();const o=new j;s.FOG&&o.addFallback(1,"FOG"),s.IMAGEPROCESSINGPOSTPROCESS=i.imageProcessingConfiguration.applyByPostProcess,s.DITHER=this.dithering;const u=[c.PositionKind];s.VERTEXCOLOR&&u.push(c.ColorKind);const a="sky",f=["world","viewProjection","view","vFogInfos","vFogColor","logarithmicDepthConstant","pointSize","luminance","turbidity","rayleigh","mieCoefficient","mieDirectionalG","sunPosition","cameraPosition","cameraOffset","up"];Y(f);const h=s.toString();t.setEffect(i.getEngine().createEffect(a,u,f,[],h,o,this.onCompiled,this.onError),s,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(s._renderId=i.getRenderId(),r._wasPreviouslyReady=!0,!0)}bindForSubMesh(e,t,r){const s=this.getScene(),i=r.materialDefines;if(!i)return;const o=r.effect;if(!o)return;this._activeEffect=o,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),this._mustRebind(s,o,r)&&(K(o,this,s),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._useLogarithmicDepth&&b(i,o,s)),s.fogEnabled&&t.applyFog&&s.fogMode!==V.FOGMODE_NONE&&this._activeEffect.setMatrix("view",s.getViewMatrix()),W(s,t,this._activeEffect);const u=s.activeCamera;if(u){const a=u.getWorldMatrix();this._cameraPosition.x=a.m[12],this._cameraPosition.y=a.m[13],this._cameraPosition.z=a.m[14],this._activeEffect.setVector3("cameraPosition",this._cameraPosition)}if(this._activeEffect.setVector3("cameraOffset",this.cameraOffset),this._activeEffect.setVector3("up",this.up),this.luminance>0&&this._activeEffect.setFloat("luminance",this.luminance),this._activeEffect.setFloat("turbidity",this.turbidity),this._activeEffect.setFloat("rayleigh",this.rayleigh),this._activeEffect.setFloat("mieCoefficient",this.mieCoefficient),this._activeEffect.setFloat("mieDirectionalG",this.mieDirectionalG),!this.useSunPosition){const a=Math.PI*(this.inclination-.5),f=2*Math.PI*(this.azimuth-.5);this.sunPosition.x=this.distance*Math.cos(f)*Math.cos(a),this.sunPosition.y=this.distance*Math.sin(-a),this.sunPosition.z=this.distance*Math.sin(f)*Math.cos(a),pe.FromUnitVectorsToRef(w.UpReadOnly,this.up,this._skyOrientation),this.sunPosition.rotateByQuaternionToRef(this._skyOrientation,this.sunPosition)}this._activeEffect.setVector3("sunPosition",this.sunPosition),this._afterBind(t,this._activeEffect,r)}getAnimatables(){return[]}dispose(e){super.dispose(e)}clone(e){return A.Clone(()=>new R(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.SkyMaterial",e}getClassName(){return"SkyMaterial"}static Parse(e,t,r){return A.Parse(()=>new R(e.name,t),e,t,r)}}n([l()],R.prototype,"luminance",void 0);n([l()],R.prototype,"turbidity",void 0);n([l()],R.prototype,"rayleigh",void 0);n([l()],R.prototype,"mieCoefficient",void 0);n([l()],R.prototype,"mieDirectionalG",void 0);n([l()],R.prototype,"distance",void 0);n([l()],R.prototype,"inclination",void 0);n([l()],R.prototype,"azimuth",void 0);n([fe()],R.prototype,"sunPosition",void 0);n([l()],R.prototype,"useSunPosition",void 0);n([fe()],R.prototype,"cameraOffset",void 0);n([fe()],R.prototype,"up",void 0);n([l()],R.prototype,"dithering",void 0);F("BABYLON.SkyMaterial",R);const Bi="terrainPixelShader",Gi=`precision highp float;uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;
#ifdef SPECULARTERM
uniform vec4 vSpecularColor;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#ifdef DIFFUSE
varying vec2 vTextureUV;uniform sampler2D textureSampler;uniform vec2 vTextureInfos;uniform sampler2D diffuse1Sampler;uniform sampler2D diffuse2Sampler;uniform sampler2D diffuse3Sampler;uniform vec2 diffuse1Infos;uniform vec2 diffuse2Infos;uniform vec2 diffuse3Infos;
#endif
#ifdef BUMP
uniform sampler2D bump1Sampler;uniform sampler2D bump2Sampler;uniform sampler2D bump3Sampler;
#endif
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#ifdef BUMP
#extension GL_OES_standard_derivatives : enable
mat3 cotangent_frame(vec3 normal,vec3 p,vec2 uv)
{vec3 dp1=dFdx(p);vec3 dp2=dFdy(p);vec2 duv1=dFdx(uv);vec2 duv2=dFdy(uv);vec3 dp2perp=cross(dp2,normal);vec3 dp1perp=cross(normal,dp1);vec3 tangent=dp2perp*duv1.x+dp1perp*duv2.x;vec3 binormal=dp2perp*duv1.y+dp1perp*duv2.y;float invmax=inversesqrt(max(dot(tangent,tangent),dot(binormal,binormal)));return mat3(tangent*invmax,binormal*invmax,normal);}
vec3 perturbNormal(vec3 viewDir,vec3 mixColor)
{vec3 bump1Color=texture2D(bump1Sampler,vTextureUV*diffuse1Infos).xyz;vec3 bump2Color=texture2D(bump2Sampler,vTextureUV*diffuse2Infos).xyz;vec3 bump3Color=texture2D(bump3Sampler,vTextureUV*diffuse3Infos).xyz;bump1Color.rgb*=mixColor.r;bump2Color.rgb=mix(bump1Color.rgb,bump2Color.rgb,mixColor.g);vec3 map=mix(bump2Color.rgb,bump3Color.rgb,mixColor.b);map=map*255./127.-128./127.;mat3 TBN=cotangent_frame(vNormalW*vTextureInfos.y,-viewDir,vTextureUV);return normalize(TBN*map);}
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=vec4(1.,1.,1.,1.);vec3 diffuseColor=vDiffuseColor.rgb;
#ifdef SPECULARTERM
float glossiness=vSpecularColor.a;vec3 specularColor=vSpecularColor.rgb;
#else
float glossiness=0.;
#endif
float alpha=vDiffuseColor.a;
#ifdef NORMAL
vec3 normalW=normalize(vNormalW);
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
#ifdef DIFFUSE
baseColor=texture2D(textureSampler,vTextureUV);
#if defined(BUMP) && defined(DIFFUSE)
normalW=perturbNormal(viewDirectionW,baseColor.rgb);
#endif
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
baseColor.rgb*=vTextureInfos.y;vec4 diffuse1Color=texture2D(diffuse1Sampler,vTextureUV*diffuse1Infos);vec4 diffuse2Color=texture2D(diffuse2Sampler,vTextureUV*diffuse2Infos);vec4 diffuse3Color=texture2D(diffuse3Sampler,vTextureUV*diffuse3Infos);diffuse1Color.rgb*=baseColor.r;diffuse2Color.rgb=mix(diffuse1Color.rgb,diffuse2Color.rgb,baseColor.g);baseColor.rgb=mix(diffuse2Color.rgb,diffuse3Color.rgb,baseColor.b);
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
baseColor.rgb*=vColor.rgb;
#endif
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float aggShadow=0.;float numLights=0.;
#ifdef SPECULARTERM
vec3 specularBase=vec3(0.,0.,0.);
#endif
#include<lightFragment>[0..maxSimultaneousLights]
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase*specularColor;
#else
vec3 finalSpecular=vec3(0.0);
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor*baseColor.rgb,0.0,1.0);vec4 color=vec4(finalDiffuse+finalSpecular,alpha);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}
`;C.ShadersStore[Bi]=Gi;const zi="terrainVertexShader",Wi=`precision highp float;attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef DIFFUSE
varying vec2 vTextureUV;uniform mat4 textureMatrix;uniform vec2 vTextureInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<logDepthDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef DIFFUSE
if (vTextureInfos.x==0.)
{vTextureUV=vec2(textureMatrix*vec4(uv,1.0,0.0));}
else
{vTextureUV=vec2(textureMatrix*vec4(uv2,1.0,0.0));}
#endif
#include<clipPlaneVertex>
#include<logDepthVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;C.ShadersStore[zi]=Wi;class Hi extends G{constructor(){super(),this.DIFFUSE=!1,this.BUMP=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.SPECULARTERM=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class N extends B{constructor(e,t){super(e,t),this.diffuseColor=new E(1,1,1),this.specularColor=new E(0,0,0),this.specularPower=64,this._disableLighting=!1,this._maxSimultaneousLights=4}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,r){const s=t._drawWrapper;if(this.isFrozen&&s.effect&&s._wasPreviouslyReady&&s._wasPreviouslyUsingInstances===r)return!0;t.materialDefines||(t.materialDefines=new Hi);const i=t.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;const u=o.getEngine();if(o.texturesEnabled){if(!this.mixTexture||!this.mixTexture.isReady())return!1;if(i._needUVs=!0,P.DiffuseTextureEnabled){if(!this.diffuseTexture1||!this.diffuseTexture1.isReady()||!this.diffuseTexture2||!this.diffuseTexture2.isReady()||!this.diffuseTexture3||!this.diffuseTexture3.isReady())return!1;i.DIFFUSE=!0}if(this.bumpTexture1&&this.bumpTexture2&&this.bumpTexture3&&P.BumpTextureEnabled){if(!this.bumpTexture1.isReady()||!this.bumpTexture2.isReady()||!this.bumpTexture3.isReady())return!1;i._needNormals=!0,i.BUMP=!0}}if(X(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=ie(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),k(o,u,this,i,!!r),z(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();const a=new j;i.FOG&&a.addFallback(1,"FOG"),te(i,a,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&a.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;const f=[c.PositionKind];i.NORMAL&&f.push(c.NormalKind),i.UV1&&f.push(c.UVKind),i.UV2&&f.push(c.UV2Kind),i.VERTEXCOLOR&&f.push(c.ColorKind),q(f,e,i,a),Z(f,i);const h="terrain",p=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vTextureInfos","mBones","textureMatrix","diffuse1Infos","diffuse2Infos","diffuse3Infos"],_=["textureSampler","diffuse1Sampler","diffuse2Sampler","diffuse3Sampler","bump1Sampler","bump2Sampler","bump3Sampler","logarithmicDepthConstant"],g=[];Y(m),se({uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect(h,{attributes:f,uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:p,fallbacks:a,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},u),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=o.getRenderId(),s._wasPreviouslyReady=!0,s._wasPreviouslyUsingInstances=!!r,!0)}bindForSubMesh(e,t,r){const s=this.getScene(),i=r.materialDefines;if(!i)return;const o=r.effect;o&&(this._activeEffect=o,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),Q(t,this._activeEffect),this._mustRebind(s,o,r)&&(this.mixTexture&&(this._activeEffect.setTexture("textureSampler",this._mixTexture),this._activeEffect.setFloat2("vTextureInfos",this._mixTexture.coordinatesIndex,this._mixTexture.level),this._activeEffect.setMatrix("textureMatrix",this._mixTexture.getTextureMatrix()),P.DiffuseTextureEnabled&&(this._diffuseTexture1&&(this._activeEffect.setTexture("diffuse1Sampler",this._diffuseTexture1),this._activeEffect.setFloat2("diffuse1Infos",this._diffuseTexture1.uScale,this._diffuseTexture1.vScale)),this._diffuseTexture2&&(this._activeEffect.setTexture("diffuse2Sampler",this._diffuseTexture2),this._activeEffect.setFloat2("diffuse2Infos",this._diffuseTexture2.uScale,this._diffuseTexture2.vScale)),this._diffuseTexture3&&(this._activeEffect.setTexture("diffuse3Sampler",this._diffuseTexture3),this._activeEffect.setFloat2("diffuse3Infos",this._diffuseTexture3.uScale,this._diffuseTexture3.vScale))),P.BumpTextureEnabled&&s.getEngine().getCaps().standardDerivatives&&(this._bumpTexture1&&this._activeEffect.setTexture("bump1Sampler",this._bumpTexture1),this._bumpTexture2&&this._activeEffect.setTexture("bump2Sampler",this._bumpTexture2),this._bumpTexture3&&this._activeEffect.setTexture("bump3Sampler",this._bumpTexture3))),K(o,this,s),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._useLogarithmicDepth&&b(i,o,s),s.bindEyePosition(o)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),i.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),s.lightsEnabled&&!this.disableLighting&&re(s,t,this._activeEffect,i,this.maxSimultaneousLights),s.fogEnabled&&t.applyFog&&s.fogMode!==V.FOGMODE_NONE&&this._activeEffect.setMatrix("view",s.getViewMatrix()),W(s,t,this._activeEffect),this._afterBind(t,this._activeEffect,r))}getAnimatables(){const e=[];return this.mixTexture&&this.mixTexture.animations&&this.mixTexture.animations.length>0&&e.push(this.mixTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._mixTexture&&e.push(this._mixTexture),this._diffuseTexture1&&e.push(this._diffuseTexture1),this._diffuseTexture2&&e.push(this._diffuseTexture2),this._diffuseTexture3&&e.push(this._diffuseTexture3),this._bumpTexture1&&e.push(this._bumpTexture1),this._bumpTexture2&&e.push(this._bumpTexture2),this._bumpTexture3&&e.push(this._bumpTexture3),e}hasTexture(e){return!!(super.hasTexture(e)||this._mixTexture===e||this._diffuseTexture1===e||this._diffuseTexture2===e||this._diffuseTexture3===e||this._bumpTexture1===e||this._bumpTexture2===e||this._bumpTexture3===e)}dispose(e){this.mixTexture&&this.mixTexture.dispose(),super.dispose(e)}clone(e){return A.Clone(()=>new N(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.TerrainMaterial",e}getClassName(){return"TerrainMaterial"}static Parse(e,t,r){return A.Parse(()=>new N(e.name,t),e,t,r)}}n([v("mixTexture")],N.prototype,"_mixTexture",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],N.prototype,"mixTexture",void 0);n([v("diffuseTexture1")],N.prototype,"_diffuseTexture1",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],N.prototype,"diffuseTexture1",void 0);n([v("diffuseTexture2")],N.prototype,"_diffuseTexture2",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],N.prototype,"diffuseTexture2",void 0);n([v("diffuseTexture3")],N.prototype,"_diffuseTexture3",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],N.prototype,"diffuseTexture3",void 0);n([v("bumpTexture1")],N.prototype,"_bumpTexture1",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],N.prototype,"bumpTexture1",void 0);n([v("bumpTexture2")],N.prototype,"_bumpTexture2",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],N.prototype,"bumpTexture2",void 0);n([v("bumpTexture3")],N.prototype,"_bumpTexture3",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],N.prototype,"bumpTexture3",void 0);n([y()],N.prototype,"diffuseColor",void 0);n([y()],N.prototype,"specularColor",void 0);n([l()],N.prototype,"specularPower",void 0);n([l("disableLighting")],N.prototype,"_disableLighting",void 0);n([d("_markAllSubMeshesAsLightsDirty")],N.prototype,"disableLighting",void 0);n([l("maxSimultaneousLights")],N.prototype,"_maxSimultaneousLights",void 0);n([d("_markAllSubMeshesAsLightsDirty")],N.prototype,"maxSimultaneousLights",void 0);F("BABYLON.TerrainMaterial",N);const Xi="triplanarPixelShader",ki=`precision highp float;uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;
#ifdef SPECULARTERM
uniform vec4 vSpecularColor;
#endif
varying vec3 vPositionW;
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<helperFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#ifdef DIFFUSEX
varying vec2 vTextureUVX;uniform sampler2D diffuseSamplerX;
#ifdef BUMPX
uniform sampler2D normalSamplerX;
#endif
#endif
#ifdef DIFFUSEY
varying vec2 vTextureUVY;uniform sampler2D diffuseSamplerY;
#ifdef BUMPY
uniform sampler2D normalSamplerY;
#endif
#endif
#ifdef DIFFUSEZ
varying vec2 vTextureUVZ;uniform sampler2D diffuseSamplerZ;
#ifdef BUMPZ
uniform sampler2D normalSamplerZ;
#endif
#endif
#ifdef NORMAL
varying mat3 tangentSpace;
#endif
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<logDepthDeclaration>
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=vec4(0.,0.,0.,1.);vec3 diffuseColor=vDiffuseColor.rgb;float alpha=vDiffuseColor.a;
#ifdef NORMAL
vec3 normalW=tangentSpace[2];
#else
vec3 normalW=vec3(1.0,1.0,1.0);
#endif
vec4 baseNormal=vec4(0.0,0.0,0.0,1.0);normalW*=normalW;
#ifdef DIFFUSEX
baseColor+=texture2D(diffuseSamplerX,vTextureUVX)*normalW.x;
#ifdef BUMPX
baseNormal+=texture2D(normalSamplerX,vTextureUVX)*normalW.x;
#endif
#endif
#ifdef DIFFUSEY
baseColor+=texture2D(diffuseSamplerY,vTextureUVY)*normalW.y;
#ifdef BUMPY
baseNormal+=texture2D(normalSamplerY,vTextureUVY)*normalW.y;
#endif
#endif
#ifdef DIFFUSEZ
baseColor+=texture2D(diffuseSamplerZ,vTextureUVZ)*normalW.z;
#ifdef BUMPZ
baseNormal+=texture2D(normalSamplerZ,vTextureUVZ)*normalW.z;
#endif
#endif
#ifdef NORMAL
normalW=normalize((2.0*baseNormal.xyz-1.0)*tangentSpace);
#endif
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
#include<depthPrePass>
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
baseColor.rgb*=vColor.rgb;
#endif
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float aggShadow=0.;float numLights=0.;
#ifdef SPECULARTERM
float glossiness=vSpecularColor.a;vec3 specularBase=vec3(0.,0.,0.);vec3 specularColor=vSpecularColor.rgb;
#else
float glossiness=0.;
#endif
#include<lightFragment>[0..maxSimultaneousLights]
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase*specularColor;
#else
vec3 finalSpecular=vec3(0.0);
#endif
vec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;vec4 color=vec4(finalDiffuse+finalSpecular,alpha);
#include<logDepthFragment>
#include<fogFragment>
gl_FragColor=color;
#include<imageProcessingCompatibility>
#define CUSTOM_FRAGMENT_MAIN_END
}
`;C.ShadersStore[Xi]=ki;const ji="triplanarVertexShader",Zi=`precision highp float;attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<helperFunctions>
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef DIFFUSEX
varying vec2 vTextureUVX;
#endif
#ifdef DIFFUSEY
varying vec2 vTextureUVY;
#endif
#ifdef DIFFUSEZ
varying vec2 vTextureUVZ;
#endif
uniform float tileSize;
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying mat3 tangentSpace;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<logDepthDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void)
{
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);
#ifdef DIFFUSEX
vTextureUVX=worldPos.zy/tileSize;
#endif
#ifdef DIFFUSEY
vTextureUVY=worldPos.xz/tileSize;
#endif
#ifdef DIFFUSEZ
vTextureUVZ=worldPos.xy/tileSize;
#endif
#ifdef NORMAL
vec3 xtan=vec3(0,0,1);vec3 xbin=vec3(0,1,0);vec3 ytan=vec3(1,0,0);vec3 ybin=vec3(0,0,1);vec3 ztan=vec3(1,0,0);vec3 zbin=vec3(0,1,0);vec3 normalizedNormal=normalize(normal);normalizedNormal*=normalizedNormal;vec3 worldBinormal=normalize(xbin*normalizedNormal.x+ybin*normalizedNormal.y+zbin*normalizedNormal.z);vec3 worldTangent=normalize(xtan*normalizedNormal.x+ytan*normalizedNormal.y+ztan*normalizedNormal.z);mat3 normalWorld=mat3(finalWorld);
#ifdef NONUNIFORMSCALING
normalWorld=transposeMat3(inverseMat3(normalWorld));
#endif
worldTangent=normalize((normalWorld*worldTangent).xyz);worldBinormal=normalize((normalWorld*worldBinormal).xyz);vec3 worldNormal=normalize((normalWorld*normalize(normal)).xyz);tangentSpace[0]=worldTangent;tangentSpace[1]=worldBinormal;tangentSpace[2]=worldNormal;
#endif
#include<clipPlaneVertex>
#include<logDepthVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;C.ShadersStore[ji]=Zi;class Yi extends G{constructor(){super(),this.DIFFUSEX=!1,this.DIFFUSEY=!1,this.DIFFUSEZ=!1,this.BUMPX=!1,this.BUMPY=!1,this.BUMPZ=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.SPECULARTERM=!1,this.NORMAL=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.NONUNIFORMSCALING=!1,this.LOGARITHMICDEPTH=!1,this.rebuild()}}class L extends B{constructor(e,t){super(e,t),this.tileSize=1,this.diffuseColor=new E(1,1,1),this.specularColor=new E(.2,.2,.2),this.specularPower=64,this._disableLighting=!1,this._maxSimultaneousLights=4}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,r){const s=t._drawWrapper;if(this.isFrozen&&s.effect&&s._wasPreviouslyReady&&s._wasPreviouslyUsingInstances===r)return!0;t.materialDefines||(t.materialDefines=new Yi);const i=t.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;const u=o.getEngine();if(i._areTexturesDirty&&o.texturesEnabled){if(P.DiffuseTextureEnabled){const a=[this.diffuseTextureX,this.diffuseTextureY,this.diffuseTextureZ],f=["DIFFUSEX","DIFFUSEY","DIFFUSEZ"];for(let h=0;h<a.length;h++)if(a[h])if(a[h].isReady())i[f[h]]=!0;else return!1}if(P.BumpTextureEnabled){const a=[this.normalTextureX,this.normalTextureY,this.normalTextureZ],f=["BUMPX","BUMPY","BUMPZ"];for(let h=0;h<a.length;h++)if(a[h])if(a[h].isReady())i[f[h]]=!0;else return!1}}if(X(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._needNormals=ie(o,e,i,!1,this._maxSimultaneousLights,this._disableLighting),k(o,u,this,i,!!r),z(e,i,!0,!0),i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();const a=new j;i.FOG&&a.addFallback(1,"FOG"),te(i,a,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&a.addCPUSkinningFallback(0,e),i.IMAGEPROCESSINGPOSTPROCESS=o.imageProcessingConfiguration.applyByPostProcess;const f=[c.PositionKind];i.NORMAL&&f.push(c.NormalKind),i.VERTEXCOLOR&&f.push(c.ColorKind),q(f,e,i,a),Z(f,i);const h="triplanar",p=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","mBones","tileSize"],_=["diffuseSamplerX","diffuseSamplerY","diffuseSamplerZ","normalSamplerX","normalSamplerY","normalSamplerZ","logarithmicDepthConstant"],g=[];Y(m),se({uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect(h,{attributes:f,uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:p,fallbacks:a,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this.maxSimultaneousLights}},u),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=o.getRenderId(),s._wasPreviouslyReady=!0,s._wasPreviouslyUsingInstances=!!r,!0)}bindForSubMesh(e,t,r){const s=this.getScene(),i=r.materialDefines;if(!i)return;const o=r.effect;o&&(this._activeEffect=o,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),Q(t,this._activeEffect),this._activeEffect.setFloat("tileSize",this.tileSize),this._mustRebind(s,o,r)&&(this.diffuseTextureX&&this._activeEffect.setTexture("diffuseSamplerX",this.diffuseTextureX),this.diffuseTextureY&&this._activeEffect.setTexture("diffuseSamplerY",this.diffuseTextureY),this.diffuseTextureZ&&this._activeEffect.setTexture("diffuseSamplerZ",this.diffuseTextureZ),this.normalTextureX&&this._activeEffect.setTexture("normalSamplerX",this.normalTextureX),this.normalTextureY&&this._activeEffect.setTexture("normalSamplerY",this.normalTextureY),this.normalTextureZ&&this._activeEffect.setTexture("normalSamplerZ",this.normalTextureZ),K(o,this,s),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._useLogarithmicDepth&&b(i,o,s),s.bindEyePosition(o)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),i.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),s.lightsEnabled&&!this.disableLighting&&re(s,t,this._activeEffect,i,this.maxSimultaneousLights),s.fogEnabled&&t.applyFog&&s.fogMode!==V.FOGMODE_NONE&&this._activeEffect.setMatrix("view",s.getViewMatrix()),W(s,t,this._activeEffect),this._afterBind(t,this._activeEffect,r))}getAnimatables(){const e=[];return this.mixTexture&&this.mixTexture.animations&&this.mixTexture.animations.length>0&&e.push(this.mixTexture),e}getActiveTextures(){const e=super.getActiveTextures();return this._diffuseTextureX&&e.push(this._diffuseTextureX),this._diffuseTextureY&&e.push(this._diffuseTextureY),this._diffuseTextureZ&&e.push(this._diffuseTextureZ),this._normalTextureX&&e.push(this._normalTextureX),this._normalTextureY&&e.push(this._normalTextureY),this._normalTextureZ&&e.push(this._normalTextureZ),e}hasTexture(e){return!!(super.hasTexture(e)||this._diffuseTextureX===e||this._diffuseTextureY===e||this._diffuseTextureZ===e||this._normalTextureX===e||this._normalTextureY===e||this._normalTextureZ===e)}dispose(e){this.mixTexture&&this.mixTexture.dispose(),super.dispose(e)}clone(e){return A.Clone(()=>new L(e,this.getScene()),this)}serialize(){const e=super.serialize();return e.customType="BABYLON.TriPlanarMaterial",e}getClassName(){return"TriPlanarMaterial"}static Parse(e,t,r){return A.Parse(()=>new L(e.name,t),e,t,r)}}n([v()],L.prototype,"mixTexture",void 0);n([v("diffuseTextureX")],L.prototype,"_diffuseTextureX",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],L.prototype,"diffuseTextureX",void 0);n([v("diffuseTexturY")],L.prototype,"_diffuseTextureY",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],L.prototype,"diffuseTextureY",void 0);n([v("diffuseTextureZ")],L.prototype,"_diffuseTextureZ",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],L.prototype,"diffuseTextureZ",void 0);n([v("normalTextureX")],L.prototype,"_normalTextureX",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],L.prototype,"normalTextureX",void 0);n([v("normalTextureY")],L.prototype,"_normalTextureY",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],L.prototype,"normalTextureY",void 0);n([v("normalTextureZ")],L.prototype,"_normalTextureZ",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],L.prototype,"normalTextureZ",void 0);n([l()],L.prototype,"tileSize",void 0);n([y()],L.prototype,"diffuseColor",void 0);n([y()],L.prototype,"specularColor",void 0);n([l()],L.prototype,"specularPower",void 0);n([l("disableLighting")],L.prototype,"_disableLighting",void 0);n([d("_markAllSubMeshesAsLightsDirty")],L.prototype,"disableLighting",void 0);n([l("maxSimultaneousLights")],L.prototype,"_maxSimultaneousLights",void 0);n([d("_markAllSubMeshesAsLightsDirty")],L.prototype,"maxSimultaneousLights",void 0);F("BABYLON.TriPlanarMaterial",L);const Ki="waterPixelShader",$i=`#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
precision highp float;uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;
#ifdef SPECULARTERM
uniform vec4 vSpecularColor;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<helperFunctions>
#include<imageProcessingDeclaration>
#include<imageProcessingFunctions>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<lightsFragmentFunctions>
#include<shadowsFragmentFunctions>
#ifdef BUMP
varying vec2 vNormalUV;
#ifdef BUMPSUPERIMPOSE
varying vec2 vNormalUV2;
#endif
uniform sampler2D normalSampler;uniform vec2 vNormalInfos;
#endif
uniform sampler2D refractionSampler;uniform sampler2D reflectionSampler;const float LOG2=1.442695;uniform vec3 cameraPosition;uniform vec4 waterColor;uniform float colorBlendFactor;uniform vec4 waterColor2;uniform float colorBlendFactor2;uniform float bumpHeight;uniform float time;varying vec3 vRefractionMapTexCoord;varying vec3 vReflectionMapTexCoord;
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=vec4(1.,1.,1.,1.);vec3 diffuseColor=vDiffuseColor.rgb;float alpha=vDiffuseColor.a;
#ifdef BUMP
#ifdef BUMPSUPERIMPOSE
baseColor=0.6*texture2D(normalSampler,vNormalUV)+0.4*texture2D(normalSampler,vec2(vNormalUV2.x,vNormalUV2.y));
#else
baseColor=texture2D(normalSampler,vNormalUV);
#endif
vec3 bumpColor=baseColor.rgb;
#ifdef ALPHATEST
if (baseColor.a<0.4)
discard;
#endif
baseColor.rgb*=vNormalInfos.y;
#else
vec3 bumpColor=vec3(1.0);
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
baseColor.rgb*=vColor.rgb;
#endif
#ifdef NORMAL
vec2 perturbation=bumpHeight*(baseColor.rg-0.5);
#ifdef BUMPAFFECTSREFLECTION
vec3 normalW=normalize(vNormalW+vec3(perturbation.x*8.0,0.0,perturbation.y*8.0));if (normalW.y<0.0) {normalW.y=-normalW.y;}
#else
vec3 normalW=normalize(vNormalW);
#endif
#else
vec3 normalW=vec3(1.0,1.0,1.0);vec2 perturbation=bumpHeight*(vec2(1.0,1.0)-0.5);
#endif
#ifdef FRESNELSEPARATE
#ifdef REFLECTION
vec2 projectedRefractionTexCoords=clamp(vRefractionMapTexCoord.xy/vRefractionMapTexCoord.z+perturbation*0.5,0.0,1.0);vec4 refractiveColor=texture2D(refractionSampler,projectedRefractionTexCoords);
#ifdef IS_REFRACTION_LINEAR
refractiveColor.rgb=toGammaSpace(refractiveColor.rgb);
#endif
vec2 projectedReflectionTexCoords=clamp(vec2(
vReflectionMapTexCoord.x/vReflectionMapTexCoord.z+perturbation.x*0.3,
vReflectionMapTexCoord.y/vReflectionMapTexCoord.z+perturbation.y
),0.0,1.0);vec4 reflectiveColor=texture2D(reflectionSampler,projectedReflectionTexCoords);
#ifdef IS_REFLECTION_LINEAR
reflectiveColor.rgb=toGammaSpace(reflectiveColor.rgb);
#endif
vec3 upVector=vec3(0.0,1.0,0.0);float fresnelTerm=clamp(abs(pow(dot(viewDirectionW,upVector),3.0)),0.05,0.65);float IfresnelTerm=1.0-fresnelTerm;refractiveColor=colorBlendFactor*waterColor+(1.0-colorBlendFactor)*refractiveColor;reflectiveColor=IfresnelTerm*colorBlendFactor2*waterColor+(1.0-colorBlendFactor2*IfresnelTerm)*reflectiveColor;vec4 combinedColor=refractiveColor*fresnelTerm+reflectiveColor*IfresnelTerm;baseColor=combinedColor;
#endif
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float aggShadow=0.;float numLights=0.;
#ifdef SPECULARTERM
float glossiness=vSpecularColor.a;vec3 specularBase=vec3(0.,0.,0.);vec3 specularColor=vSpecularColor.rgb;
#else
float glossiness=0.;
#endif
#include<lightFragment>[0..maxSimultaneousLights]
vec3 finalDiffuse=clamp(baseColor.rgb,0.0,1.0);
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase*specularColor;
#else
vec3 finalSpecular=vec3(0.0);
#endif
#else 
#ifdef REFLECTION
vec2 projectedRefractionTexCoords=clamp(vRefractionMapTexCoord.xy/vRefractionMapTexCoord.z+perturbation,0.0,1.0);vec4 refractiveColor=texture2D(refractionSampler,projectedRefractionTexCoords);
#ifdef IS_REFRACTION_LINEAR
refractiveColor.rgb=toGammaSpace(refractiveColor.rgb);
#endif
vec2 projectedReflectionTexCoords=clamp(vReflectionMapTexCoord.xy/vReflectionMapTexCoord.z+perturbation,0.0,1.0);vec4 reflectiveColor=texture2D(reflectionSampler,projectedReflectionTexCoords);
#ifdef IS_REFLECTION_LINEAR
reflectiveColor.rgb=toGammaSpace(reflectiveColor.rgb);
#endif
vec3 upVector=vec3(0.0,1.0,0.0);float fresnelTerm=max(dot(viewDirectionW,upVector),0.0);vec4 combinedColor=refractiveColor*fresnelTerm+reflectiveColor*(1.0-fresnelTerm);baseColor=colorBlendFactor*waterColor+(1.0-colorBlendFactor)*combinedColor;
#endif
vec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float aggShadow=0.;float numLights=0.;
#ifdef SPECULARTERM
float glossiness=vSpecularColor.a;vec3 specularBase=vec3(0.,0.,0.);vec3 specularColor=vSpecularColor.rgb;
#else
float glossiness=0.;
#endif
#include<lightFragment>[0..maxSimultaneousLights]
vec3 finalDiffuse=clamp(baseColor.rgb,0.0,1.0);
#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)
alpha*=vColor.a;
#endif
#ifdef SPECULARTERM
vec3 finalSpecular=specularBase*specularColor;
#else
vec3 finalSpecular=vec3(0.0);
#endif
#endif
vec4 color=vec4(finalDiffuse+finalSpecular,alpha);
#include<logDepthFragment>
#include<fogFragment>
#ifdef IMAGEPROCESSINGPOSTPROCESS
color.rgb=toLinearSpace(color.rgb);
#elif defined(IMAGEPROCESSING)
color.rgb=toLinearSpace(color.rgb);color=applyImageProcessing(color);
#endif
gl_FragColor=color;
#define CUSTOM_FRAGMENT_MAIN_END
}
`;C.ShadersStore[Ki]=$i;const qi="waterVertexShader",Qi=`precision highp float;attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;uniform mat4 viewProjection;
#ifdef BUMP
varying vec2 vNormalUV;
#ifdef BUMPSUPERIMPOSE
varying vec2 vNormalUV2;
#endif
uniform mat4 normalMatrix;uniform vec2 vNormalInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#include<logDepthDeclaration>
uniform mat4 reflectionViewProjection;uniform vec2 windDirection;uniform float waveLength;uniform float time;uniform float windForce;uniform float waveHeight;uniform float waveSpeed;uniform float waveCount;varying vec3 vRefractionMapTexCoord;varying vec3 vReflectionMapTexCoord;
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);vPositionW=vec3(worldPos);
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));
#endif
#ifndef UV1
vec2 uv=vec2(0.,0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0.,0.);
#endif
#ifdef BUMP
if (vNormalInfos.x==0.)
{vNormalUV=vec2(normalMatrix*vec4((uv*1.0)/waveLength+time*windForce*windDirection,1.0,0.0));
#ifdef BUMPSUPERIMPOSE
vNormalUV2=vec2(normalMatrix*vec4((uv*0.721)/waveLength+time*1.2*windForce*windDirection,1.0,0.0));
#endif
}
else
{vNormalUV=vec2(normalMatrix*vec4((uv2*1.0)/waveLength+time*windForce*windDirection ,1.0,0.0));
#ifdef BUMPSUPERIMPOSE
vNormalUV2=vec2(normalMatrix*vec4((uv2*0.721)/waveLength+time*1.2*windForce*windDirection ,1.0,0.0));
#endif
}
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
float finalWaveCount=1.0/(waveCount*0.5);
#ifdef USE_WORLD_COORDINATES
vec3 p=worldPos.xyz;
#else
vec3 p=position;
#endif
float newY=(sin(((p.x/finalWaveCount)+time*waveSpeed))*waveHeight*windDirection.x*5.0)
+ (cos(((p.z/finalWaveCount)+ time*waveSpeed))*waveHeight*windDirection.y*5.0);p.y+=abs(newY);
#ifdef USE_WORLD_COORDINATES
gl_Position=viewProjection*vec4(p,1.0);
#else
gl_Position=viewProjection*finalWorld*vec4(p,1.0);
#endif
#ifdef REFLECTION
vRefractionMapTexCoord.x=0.5*(gl_Position.w+gl_Position.x);vRefractionMapTexCoord.y=0.5*(gl_Position.w+gl_Position.y);vRefractionMapTexCoord.z=gl_Position.w;worldPos=reflectionViewProjection*finalWorld*vec4(position,1.0);vReflectionMapTexCoord.x=0.5*(worldPos.w+worldPos.x);vReflectionMapTexCoord.y=0.5*(worldPos.w+worldPos.y);vReflectionMapTexCoord.z=worldPos.w;
#endif
#include<logDepthVertex>
#define CUSTOM_VERTEX_MAIN_END
}
`;C.ShadersStore[qi]=Qi;class Ji extends G{constructor(){super(),this.BUMP=!1,this.REFLECTION=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.ALPHATEST=!1,this.DEPTHPREPASS=!1,this.POINTSIZE=!1,this.FOG=!1,this.NORMAL=!1,this.UV1=!1,this.UV2=!1,this.VERTEXCOLOR=!1,this.VERTEXALPHA=!1,this.NUM_BONE_INFLUENCERS=0,this.BonesPerMesh=0,this.INSTANCES=!1,this.INSTANCESCOLOR=!1,this.SPECULARTERM=!1,this.LOGARITHMICDEPTH=!1,this.USE_REVERSE_DEPTHBUFFER=!1,this.FRESNELSEPARATE=!1,this.BUMPSUPERIMPOSE=!1,this.BUMPAFFECTSREFLECTION=!1,this.USE_WORLD_COORDINATES=!1,this.IMAGEPROCESSING=!1,this.VIGNETTE=!1,this.VIGNETTEBLENDMODEMULTIPLY=!1,this.VIGNETTEBLENDMODEOPAQUE=!1,this.TONEMAPPING=0,this.CONTRAST=!1,this.EXPOSURE=!1,this.COLORCURVES=!1,this.COLORGRADING=!1,this.COLORGRADING3D=!1,this.SAMPLER3DGREENDEPTH=!1,this.SAMPLER3DBGRMAP=!1,this.DITHER=!1,this.IMAGEPROCESSINGPOSTPROCESS=!1,this.SKIPFINALCOLORCLAMP=!1,this.rebuild()}}class T extends B{get hasRenderTargetTextures(){return!0}constructor(e,t,r=new ge(512,512)){super(e,t),this.renderTargetSize=r,this.diffuseColor=new E(1,1,1),this.specularColor=new E(0,0,0),this.specularPower=64,this._disableLighting=!1,this._maxSimultaneousLights=4,this.windForce=6,this.windDirection=new ge(0,1),this.waveHeight=.4,this.bumpHeight=.4,this._bumpSuperimpose=!1,this._fresnelSeparate=!1,this._bumpAffectsReflection=!1,this.waterColor=new E(.1,.1,.6),this.colorBlendFactor=.2,this.waterColor2=new E(.1,.1,.6),this.colorBlendFactor2=.2,this.waveLength=.1,this.waveSpeed=1,this.waveCount=20,this.disableClipPlane=!1,this._useWorldCoordinatesForWaveDeformation=!1,this._renderTargets=new Ie(16),this._mesh=null,this._reflectionTransform=de.Zero(),this._lastTime=0,this._lastDeltaTime=0,this._createRenderTargets(this.getScene(),r),this.getRenderTargetTextures=()=>(this._renderTargets.reset(),this._renderTargets.push(this._reflectionRTT),this._renderTargets.push(this._refractionRTT),this._renderTargets),this._imageProcessingConfiguration=this.getScene().imageProcessingConfiguration,this._imageProcessingConfiguration&&(this._imageProcessingObserver=this._imageProcessingConfiguration.onUpdateParameters.add(()=>{this._markAllSubMeshesAsImageProcessingDirty()}))}get refractionTexture(){return this._refractionRTT}get reflectionTexture(){return this._reflectionRTT}addToRenderList(e){this._refractionRTT&&this._refractionRTT.renderList&&this._refractionRTT.renderList.push(e),this._reflectionRTT&&this._reflectionRTT.renderList&&this._reflectionRTT.renderList.push(e)}removeFromRenderList(e){if(this._refractionRTT&&this._refractionRTT.renderList){const t=this._refractionRTT.renderList.indexOf(e);t!==-1&&this._refractionRTT.renderList.splice(t,1)}if(this._reflectionRTT&&this._reflectionRTT.renderList){const t=this._reflectionRTT.renderList.indexOf(e);t!==-1&&this._reflectionRTT.renderList.splice(t,1)}}enableRenderTargets(e){const t=e?1:0;this._refractionRTT&&(this._refractionRTT.refreshRate=t),this._reflectionRTT&&(this._reflectionRTT.refreshRate=t)}getRenderList(){return this._refractionRTT?this._refractionRTT.renderList:[]}get renderTargetsEnabled(){return!(this._refractionRTT&&this._refractionRTT.refreshRate===0)}needAlphaBlending(){return this.alpha<1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(e,t,r){const s=t._drawWrapper;if(this.isFrozen&&s.effect&&s._wasPreviouslyReady&&s._wasPreviouslyUsingInstances===r)return!0;t.materialDefines||(t.materialDefines=new Ji);const i=t.materialDefines,o=this.getScene();if(this._isReadyForSubMesh(t))return!0;const u=o.getEngine();if(i._areTexturesDirty&&(i._needUVs=!1,o.texturesEnabled)){if(this.bumpTexture&&P.BumpTextureEnabled)if(this.bumpTexture.isReady())i._needUVs=!0,i.BUMP=!0;else return!1;P.ReflectionTextureEnabled&&(i.REFLECTION=!0)}if(k(o,u,this,i,!!r),X(e,o,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,this._shouldTurnAlphaTestOn(e),i),i._areMiscDirty&&(i.FRESNELSEPARATE=this._fresnelSeparate,i.BUMPSUPERIMPOSE=this._bumpSuperimpose,i.BUMPAFFECTSREFLECTION=this._bumpAffectsReflection,i.USE_WORLD_COORDINATES=this._useWorldCoordinatesForWaveDeformation),i._needNormals=ie(o,e,i,!0,this._maxSimultaneousLights,this._disableLighting),i._areImageProcessingDirty&&this._imageProcessingConfiguration){if(!this._imageProcessingConfiguration.isReady())return!1;this._imageProcessingConfiguration.prepareDefines(i),i.IS_REFLECTION_LINEAR=this.reflectionTexture!=null&&!this.reflectionTexture.gammaSpace,i.IS_REFRACTION_LINEAR=this.refractionTexture!=null&&!this.refractionTexture.gammaSpace}if(z(e,i,!0,!0),this._mesh=e,this._waitingRenderList){for(let a=0;a<this._waitingRenderList.length;a++)this.addToRenderList(o.getNodeById(this._waitingRenderList[a]));this._waitingRenderList=null}if(i.isDirty){i.markAsProcessed(),o.resetCachedMaterial();const a=new j;i.FOG&&a.addFallback(1,"FOG"),i.LOGARITHMICDEPTH&&a.addFallback(0,"LOGARITHMICDEPTH"),te(i,a,this.maxSimultaneousLights),i.NUM_BONE_INFLUENCERS>0&&a.addCPUSkinningFallback(0,e);const f=[c.PositionKind];i.NORMAL&&f.push(c.NormalKind),i.UV1&&f.push(c.UVKind),i.UV2&&f.push(c.UV2Kind),i.VERTEXCOLOR&&f.push(c.ColorKind),q(f,e,i,a),Z(f,i);const h="water",p=i.toString(),m=["world","view","viewProjection","vEyePosition","vLightsType","vDiffuseColor","vSpecularColor","vFogInfos","vFogColor","pointSize","vNormalInfos","mBones","normalMatrix","logarithmicDepthConstant","reflectionViewProjection","windDirection","waveLength","time","windForce","cameraPosition","bumpHeight","waveHeight","waterColor","waterColor2","colorBlendFactor","colorBlendFactor2","waveSpeed","waveCount"],_=["normalSampler","refractionSampler","reflectionSampler"],g=[];ce&&(ce.PrepareUniforms(m,i),ce.PrepareSamplers(_,i)),Y(m),se({uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:i,maxSimultaneousLights:this.maxSimultaneousLights}),t.setEffect(o.getEngine().createEffect(h,{attributes:f,uniformsNames:m,uniformBuffersNames:g,samplers:_,defines:p,fallbacks:a,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:this._maxSimultaneousLights}},u),i,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(i._renderId=o.getRenderId(),s._wasPreviouslyReady=!0,s._wasPreviouslyUsingInstances=!!r,!0)}bindForSubMesh(e,t,r){const s=this.getScene(),i=r.materialDefines;if(!i)return;const o=r.effect;if(!o||!this._mesh)return;this._activeEffect=o,this.bindOnlyWorldMatrix(e),this._activeEffect.setMatrix("viewProjection",s.getTransformMatrix()),Q(t,this._activeEffect),this._mustRebind(s,o,r)&&(this.bumpTexture&&P.BumpTextureEnabled&&(this._activeEffect.setTexture("normalSampler",this.bumpTexture),this._activeEffect.setFloat2("vNormalInfos",this.bumpTexture.coordinatesIndex,this.bumpTexture.level),this._activeEffect.setMatrix("normalMatrix",this.bumpTexture.getTextureMatrix())),K(o,this,s),this.pointsCloud&&this._activeEffect.setFloat("pointSize",this.pointSize),this._useLogarithmicDepth&&b(i,o,s),s.bindEyePosition(o)),this._activeEffect.setColor4("vDiffuseColor",this.diffuseColor,this.alpha*t.visibility),i.SPECULARTERM&&this._activeEffect.setColor4("vSpecularColor",this.specularColor,this.specularPower),s.lightsEnabled&&!this.disableLighting&&re(s,t,this._activeEffect,i,this.maxSimultaneousLights),s.fogEnabled&&t.applyFog&&s.fogMode!==V.FOGMODE_NONE&&this._activeEffect.setMatrix("view",s.getViewMatrix()),W(s,t,this._activeEffect),b(i,this._activeEffect,s),P.ReflectionTextureEnabled&&(this._activeEffect.setTexture("refractionSampler",this._refractionRTT),this._activeEffect.setTexture("reflectionSampler",this._reflectionRTT));const u=this._reflectionTransform.multiply(s.getProjectionMatrix()),a=s.getEngine().getDeltaTime();a!==this._lastDeltaTime&&(this._lastDeltaTime=a,this._lastTime+=this._lastDeltaTime),this._activeEffect.setMatrix("reflectionViewProjection",u),this._activeEffect.setVector2("windDirection",this.windDirection),this._activeEffect.setFloat("waveLength",this.waveLength),this._activeEffect.setFloat("time",this._lastTime/1e5),this._activeEffect.setFloat("windForce",this.windForce),this._activeEffect.setFloat("waveHeight",this.waveHeight),this._activeEffect.setFloat("bumpHeight",this.bumpHeight),this._activeEffect.setColor4("waterColor",this.waterColor,1),this._activeEffect.setFloat("colorBlendFactor",this.colorBlendFactor),this._activeEffect.setColor4("waterColor2",this.waterColor2,1),this._activeEffect.setFloat("colorBlendFactor2",this.colorBlendFactor2),this._activeEffect.setFloat("waveSpeed",this.waveSpeed),this._activeEffect.setFloat("waveCount",this.waveCount),this._imageProcessingConfiguration&&!this._imageProcessingConfiguration.applyByPostProcess&&this._imageProcessingConfiguration.bind(this._activeEffect),this._afterBind(t,this._activeEffect,r)}_createRenderTargets(e,t){this._refractionRTT=new Te(name+"_refraction",{width:t.x,height:t.y},e,!1,!0),this._refractionRTT.wrapU=le.TEXTURE_MIRROR_ADDRESSMODE,this._refractionRTT.wrapV=le.TEXTURE_MIRROR_ADDRESSMODE,this._refractionRTT.ignoreCameraViewport=!0;let r=!1;this._refractionRTT.onBeforeRenderObservable.add(()=>{r=e.getBoundingBoxRenderer().enabled,e.getBoundingBoxRenderer().enabled=!1}),this._refractionRTT.onAfterRenderObservable.add(()=>{e.getBoundingBoxRenderer().enabled=r}),this._reflectionRTT=new Te(name+"_reflection",{width:t.x,height:t.y},e,!1,!0),this._reflectionRTT.wrapU=le.TEXTURE_MIRROR_ADDRESSMODE,this._reflectionRTT.wrapV=le.TEXTURE_MIRROR_ADDRESSMODE,this._reflectionRTT.ignoreCameraViewport=!0;let s,i=null,o;const u=de.Zero();this._refractionRTT.onBeforeRender=()=>{if(this._mesh&&(s=this._mesh.isVisible,this._mesh.isVisible=!1),!this.disableClipPlane){i=e.clipPlane;const a=this._mesh?this._mesh.absolutePosition.y:0;e.clipPlane=_e.FromPositionAndNormal(new w(0,a+.05,0),new w(0,1,0))}},this._refractionRTT.onAfterRender=()=>{this._mesh&&(this._mesh.isVisible=s),this.disableClipPlane||(e.clipPlane=i)},this._reflectionRTT.onBeforeRender=()=>{if(this._mesh&&(s=this._mesh.isVisible,this._mesh.isVisible=!1),!this.disableClipPlane){i=e.clipPlane;const a=this._mesh?this._mesh.absolutePosition.y:0;e.clipPlane=_e.FromPositionAndNormal(new w(0,a-.05,0),new w(0,-1,0)),de.ReflectionToRef(e.clipPlane,u)}o=e.getViewMatrix(),u.multiplyToRef(o,this._reflectionTransform),e.setTransformMatrix(this._reflectionTransform,e.getProjectionMatrix()),e._mirroredCameraPosition=w.TransformCoordinates(e.activeCamera.position,u)},this._reflectionRTT.onAfterRender=()=>{this._mesh&&(this._mesh.isVisible=s),e.clipPlane=i,e.setTransformMatrix(o,e.getProjectionMatrix()),e._mirroredCameraPosition=null}}getAnimatables(){const e=[];return this.bumpTexture&&this.bumpTexture.animations&&this.bumpTexture.animations.length>0&&e.push(this.bumpTexture),this._reflectionRTT&&this._reflectionRTT.animations&&this._reflectionRTT.animations.length>0&&e.push(this._reflectionRTT),this._refractionRTT&&this._refractionRTT.animations&&this._refractionRTT.animations.length>0&&e.push(this._refractionRTT),e}getActiveTextures(){const e=super.getActiveTextures();return this._bumpTexture&&e.push(this._bumpTexture),e}hasTexture(e){return!!(super.hasTexture(e)||this._bumpTexture===e)}dispose(e){this.bumpTexture&&this.bumpTexture.dispose();let t=this.getScene().customRenderTargets.indexOf(this._refractionRTT);t!=-1&&this.getScene().customRenderTargets.splice(t,1),t=-1,t=this.getScene().customRenderTargets.indexOf(this._reflectionRTT),t!=-1&&this.getScene().customRenderTargets.splice(t,1),this._reflectionRTT&&this._reflectionRTT.dispose(),this._refractionRTT&&this._refractionRTT.dispose(),this._imageProcessingConfiguration&&this._imageProcessingObserver&&this._imageProcessingConfiguration.onUpdateParameters.remove(this._imageProcessingObserver),super.dispose(e)}clone(e){return A.Clone(()=>new T(e,this.getScene()),this)}serialize(){const e=super.serialize();if(e.customType="BABYLON.WaterMaterial",e.renderList=[],this._refractionRTT&&this._refractionRTT.renderList)for(let t=0;t<this._refractionRTT.renderList.length;t++)e.renderList.push(this._refractionRTT.renderList[t].id);return e}getClassName(){return"WaterMaterial"}static Parse(e,t,r){const s=A.Parse(()=>new T(e.name,t),e,t,r);return s._waitingRenderList=e.renderList,s}static CreateDefaultMesh(e,t){return Ne(e,{width:512,height:512,subdivisions:32,updatable:!1},t)}}n([v("bumpTexture")],T.prototype,"_bumpTexture",void 0);n([d("_markAllSubMeshesAsTexturesDirty")],T.prototype,"bumpTexture",void 0);n([y()],T.prototype,"diffuseColor",void 0);n([y()],T.prototype,"specularColor",void 0);n([l()],T.prototype,"specularPower",void 0);n([l("disableLighting")],T.prototype,"_disableLighting",void 0);n([d("_markAllSubMeshesAsLightsDirty")],T.prototype,"disableLighting",void 0);n([l("maxSimultaneousLights")],T.prototype,"_maxSimultaneousLights",void 0);n([d("_markAllSubMeshesAsLightsDirty")],T.prototype,"maxSimultaneousLights",void 0);n([l()],T.prototype,"windForce",void 0);n([Le()],T.prototype,"windDirection",void 0);n([l()],T.prototype,"waveHeight",void 0);n([l()],T.prototype,"bumpHeight",void 0);n([l("bumpSuperimpose")],T.prototype,"_bumpSuperimpose",void 0);n([d("_markAllSubMeshesAsMiscDirty")],T.prototype,"bumpSuperimpose",void 0);n([l("fresnelSeparate")],T.prototype,"_fresnelSeparate",void 0);n([d("_markAllSubMeshesAsMiscDirty")],T.prototype,"fresnelSeparate",void 0);n([l("bumpAffectsReflection")],T.prototype,"_bumpAffectsReflection",void 0);n([d("_markAllSubMeshesAsMiscDirty")],T.prototype,"bumpAffectsReflection",void 0);n([y()],T.prototype,"waterColor",void 0);n([l()],T.prototype,"colorBlendFactor",void 0);n([y()],T.prototype,"waterColor2",void 0);n([l()],T.prototype,"colorBlendFactor2",void 0);n([l()],T.prototype,"waveLength",void 0);n([l()],T.prototype,"waveSpeed",void 0);n([l()],T.prototype,"waveCount",void 0);n([l()],T.prototype,"disableClipPlane",void 0);n([l("useWorldCoordinatesForWaveDeformation")],T.prototype,"_useWorldCoordinatesForWaveDeformation",void 0);n([d("_markAllSubMeshesAsMiscDirty")],T.prototype,"useWorldCoordinatesForWaveDeformation",void 0);F("BABYLON.WaterMaterial",T);const et=({scene:I,diameter:e,position:t})=>{e=typeof e=="number"?{x:e,y:e,z:e}:e;const r=ye("arena",{diameterX:e.x,diameterY:e.y,diameterZ:e.z,segments:Math.round((e.x+e.y+e.z)/3)*5},I),s=new D("groundMaterial",I);return s.mainColor=new E(1,1,1),s.opacity=.3,s.lineColor=new E(.8,.5,.7),r.material=s,r.receiveShadows=!0,r.position.addInPlace(t),new Oe(r,De.SPHERE,{mass:0,radius:Math.round((e.x+e.y+e.z)/3)},I)},nt=({scene:I})=>{const e=Re({scene:I}),t=Fe({scene:I});Me({scene:I}),et({scene:I,position:new w(26.5,0,-2),diameter:10});const r=be({scene:I});return{ground:e,shadows:r,env:t}};export{nt as setup};
