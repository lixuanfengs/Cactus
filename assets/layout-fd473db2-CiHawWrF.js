import{S as we,v as P,e as Ae,Y as _,C as be,P as ze,m as f,E as p,Z as y,D as ye,I as xe,a as Xe,b,H as E,X as j,j as Ze,B as ke,Q as O,U as Qe,c as $,T as Je,d as Ue}from"./graph-0ee63739-sS_n-O_n.js";import{l as Ee,ab as Y,a2 as Ne,a9 as We,ac as He,ad as Ke,C as U,v as _e,r as W,a6 as er,ae as Q,af as rr,J as B,Z as tr,X as Ie,a5 as nr,m as or}from"./mermaid.esm.min-aoahrzfn.js";var ir=/\s/;function ur(e){for(var r=e.length;r--&&ir.test(e.charAt(r)););return r}var ar=/^\s+/;function dr(e){return e&&e.slice(0,ur(e)+1).replace(ar,"")}var ue=NaN,cr=/^[-+]0x[0-9a-f]+$/i,fr=/^0b[01]+$/i,sr=/^0o[0-7]+$/i,vr=parseInt;function gr(e){if(typeof e=="number")return e;if(O(e))return ue;if(B(e)){var r=typeof e.valueOf=="function"?e.valueOf():e;e=B(r)?r+"":r}if(typeof e!="string")return e===0?e:+e;e=dr(e);var t=fr.test(e);return t||sr.test(e)?vr(e.slice(2),t?2:8):cr.test(e)?ue:+e}var ae=1/0,hr=17976931348623157e292;function S(e){if(!e)return e===0?e:0;if(e=gr(e),e===ae||e===-ae){var r=e<0?-1:1;return r*hr}return e===e?e:0}function lr(e){var r=S(e),t=r%1;return r===r?t?r-t:r:0}function I(e){var r=e==null?0:e.length;return r?we(e):[]}function pr(e){return He(Ke(e,void 0,I),e+"")}var mr=1,wr=4;function br(e){return Ze(e,mr|wr)}var Re=Object.prototype,yr=Re.hasOwnProperty,xr=Ee(function(e,r){e=Object(e);var t=-1,n=r.length,o=n>2?r[2]:void 0;for(o&&Y(r[0],r[1],o)&&(n=1);++t<n;)for(var u=r[t],i=Ne(u),a=-1,d=i.length;++a<d;){var c=i[a],s=e[c];(s===void 0||We(s,Re[c])&&!yr.call(e,c))&&(e[c]=u[c])}return e});const kr=xr;function F(e){var r=e==null?0:e.length;return r?e[r-1]:void 0}function Er(e){return function(r,t,n){var o=Object(r);if(!_e(r)){var u=_(t);r=Je(r),t=function(a){return u(o[a],a,o)}}var i=e(r,t,n);return i>-1?o[u?r[i]:i]:void 0}}var Nr=Math.max;function _r(e,r,t){var n=e==null?0:e.length;if(!n)return-1;var o=t==null?0:lr(t);return o<0&&(o=Nr(n+o,0)),Ue(e,_(r),o)}var Ir=Er(_r);const H=Ir;function Me(e,r){var t=-1,n=_e(e)?Array(e.length):[];return Ae(e,function(o,u,i){n[++t]=r(o,u,i)}),n}function m(e,r){var t=W(e)?P:Me;return t(e,_(r))}function Rr(e,r){return e==null?e:nr(e,ke(r),Ne)}function Mr(e,r){return e&&ye(e,ke(r))}function Tr(e,r){return e>r}function Te(e,r){return e<r}function V(e,r){var t={};return r=_(r),ye(e,function(n,o,u){rr(t,o,r(n,o,u))}),t}function K(e,r,t){for(var n=-1,o=e.length;++n<o;){var u=e[n],i=r(u);if(i!=null&&(a===void 0?i===i&&!O(i):t(i,a)))var a=i,d=u}return d}function x(e){return e&&e.length?K(e,U,Tr):void 0}function T(e){return e&&e.length?K(e,U,Te):void 0}function ee(e,r){return e&&e.length?K(e,_(r),Te):void 0}function Cr(e,r,t,n){if(!B(e))return e;r=xe(r,e);for(var o=-1,u=r.length,i=u-1,a=e;a!=null&&++o<u;){var d=Qe(r[o]),c=t;if(d==="__proto__"||d==="constructor"||d==="prototype")return e;if(o!=i){var s=a[d];c=void 0,c===void 0&&(c=B(s)?s:tr(r[o+1])?[]:{})}Ie(a,d,c),a=a[d]}return e}function $r(e,r,t){for(var n=-1,o=r.length,u={};++n<o;){var i=r[n],a=be(e,i);t(a,i)&&Cr(u,xe(i,e),a)}return u}function Lr(e,r){var t=e.length;for(e.sort(r);t--;)e[t]=e[t].value;return e}function Pr(e,r){if(e!==r){var t=e!==void 0,n=e===null,o=e===e,u=O(e),i=r!==void 0,a=r===null,d=r===r,c=O(r);if(!a&&!c&&!u&&e>r||u&&i&&d&&!a&&!c||n&&i&&d||!t&&d||!o)return 1;if(!n&&!u&&!c&&e<r||c&&t&&o&&!n&&!u||a&&t&&o||!i&&o||!d)return-1}return 0}function Sr(e,r,t){for(var n=-1,o=e.criteria,u=r.criteria,i=o.length,a=t.length;++n<i;){var d=Pr(o[n],u[n]);if(d){if(n>=a)return d;var c=t[n];return d*(c=="desc"?-1:1)}}return e.index-r.index}function Or(e,r,t){r.length?r=P(r,function(u){return W(u)?function(i){return be(i,u.length===1?u[0]:u)}:u}):r=[U];var n=-1;r=P(r,er(_));var o=Me(e,function(u,i,a){var d=P(r,function(c){return c(u)});return{criteria:d,index:++n,value:u}});return Lr(o,function(u,i){return Sr(u,i,t)})}function Yr(e,r){return $r(e,r,function(t,n){return Xe(e,n)})}var Br=pr(function(e,r){return e==null?{}:Yr(e,r)});const G=Br;var Fr=Math.ceil,Gr=Math.max;function jr(e,r,t,n){for(var o=-1,u=Gr(Fr((r-e)/(t||1)),0),i=Array(u);u--;)i[++o]=e,e+=t;return i}function Vr(e){return function(r,t,n){return n&&typeof n!="number"&&Y(r,t,n)&&(t=n=void 0),r=S(r),t===void 0?(t=r,r=0):t=S(t),n=n===void 0?r<t?1:-1:S(n),jr(r,t,n)}}var qr=Vr();const N=qr;var Dr=Ee(function(e,r){if(e==null)return[];var t=r.length;return t>1&&Y(e,r[0],r[1])?r=[]:t>2&&Y(r[0],r[1],r[2])&&(r=[r[0]]),Or(e,we(r),[])});const L=Dr;var Ar=0;function re(e){var r=++Ar;return ze(e)+r}function zr(e,r,t){for(var n=-1,o=e.length,u=r.length,i={};++n<o;){var a=n<u?r[n]:void 0;t(i,e[n],a)}return i}function Xr(e,r){return zr(e||[],r||[],Ie)}class Zr{constructor(){var r={};r._next=r._prev=r,this._sentinel=r}dequeue(){var r=this._sentinel,t=r._prev;if(t!==r)return de(t),t}enqueue(r){var t=this._sentinel;r._prev&&r._next&&de(r),r._next=t._next,t._next._prev=r,t._next=r,r._prev=t}toString(){for(var r=[],t=this._sentinel,n=t._prev;n!==t;)r.push(JSON.stringify(n,Qr)),n=n._prev;return"["+r.join(", ")+"]"}}function de(e){e._prev._next=e._next,e._next._prev=e._prev,delete e._next,delete e._prev}function Qr(e,r){if(e!=="_next"&&e!=="_prev")return r}var Jr=or(1);function Ur(e,r){if(e.nodeCount()<=1)return[];var t=Hr(e,r||Jr),n=Wr(t.graph,t.buckets,t.zeroIdx);return I(m(n,function(o){return e.outEdges(o.v,o.w)}))}function Wr(e,r,t){for(var n=[],o=r[r.length-1],u=r[0],i;e.nodeCount();){for(;i=u.dequeue();)D(e,r,t,i);for(;i=o.dequeue();)D(e,r,t,i);if(e.nodeCount()){for(var a=r.length-2;a>0;--a)if(i=r[a].dequeue(),i){n=n.concat(D(e,r,t,i,!0));break}}}return n}function D(e,r,t,n,o){var u=o?[]:void 0;return f(e.inEdges(n.v),function(i){var a=e.edge(i),d=e.node(i.v);o&&u.push({v:i.v,w:i.w}),d.out-=a,J(r,t,d)}),f(e.outEdges(n.v),function(i){var a=e.edge(i),d=i.w,c=e.node(d);c.in-=a,J(r,t,c)}),e.removeNode(n.v),u}function Hr(e,r){var t=new y,n=0,o=0;f(e.nodes(),function(a){t.setNode(a,{v:a,in:0,out:0})}),f(e.edges(),function(a){var d=t.edge(a.v,a.w)||0,c=r(a),s=d+c;t.setEdge(a.v,a.w,s),o=Math.max(o,t.node(a.v).out+=c),n=Math.max(n,t.node(a.w).in+=c)});var u=N(o+n+3).map(function(){return new Zr}),i=n+1;return f(t.nodes(),function(a){J(u,i,t.node(a))}),{graph:t,buckets:u,zeroIdx:i}}function J(e,r,t){t.out?t.in?e[t.out-t.in+r].enqueue(t):e[e.length-1].enqueue(t):e[0].enqueue(t)}function Kr(e){var r=e.graph().acyclicer==="greedy"?Ur(e,t(e)):et(e);f(r,function(n){var o=e.edge(n);e.removeEdge(n),o.forwardName=n.name,o.reversed=!0,e.setEdge(n.w,n.v,o,re("rev"))});function t(n){return function(o){return n.edge(o).weight}}}function et(e){var r=[],t={},n={};function o(u){p(n,u)||(n[u]=!0,t[u]=!0,f(e.outEdges(u),function(i){p(t,i.w)?r.push(i):o(i.w)}),delete t[u])}return f(e.nodes(),o),r}function rt(e){f(e.edges(),function(r){var t=e.edge(r);if(t.reversed){e.removeEdge(r);var n=t.forwardName;delete t.reversed,delete t.forwardName,e.setEdge(r.w,r.v,t,n)}})}function R(e,r,t,n){var o;do o=re(n);while(e.hasNode(o));return t.dummy=r,e.setNode(o,t),o}function tt(e){var r=new y().setGraph(e.graph());return f(e.nodes(),function(t){r.setNode(t,e.node(t))}),f(e.edges(),function(t){var n=r.edge(t.v,t.w)||{weight:0,minlen:1},o=e.edge(t);r.setEdge(t.v,t.w,{weight:n.weight+o.weight,minlen:Math.max(n.minlen,o.minlen)})}),r}function Ce(e){var r=new y({multigraph:e.isMultigraph()}).setGraph(e.graph());return f(e.nodes(),function(t){e.children(t).length||r.setNode(t,e.node(t))}),f(e.edges(),function(t){r.setEdge(t,e.edge(t))}),r}function ce(e,r){var t=e.x,n=e.y,o=r.x-t,u=r.y-n,i=e.width/2,a=e.height/2;if(!o&&!u)throw new Error("Not possible to find intersection inside of the rectangle");var d,c;return Math.abs(u)*i>Math.abs(o)*a?(u<0&&(a=-a),d=a*o/u,c=a):(o<0&&(i=-i),d=i,c=i*u/o),{x:t+d,y:n+c}}function q(e){var r=m(N($e(e)+1),function(){return[]});return f(e.nodes(),function(t){var n=e.node(t),o=n.rank;b(o)||(r[o][n.order]=t)}),r}function nt(e){var r=T(m(e.nodes(),function(t){return e.node(t).rank}));f(e.nodes(),function(t){var n=e.node(t);p(n,"rank")&&(n.rank-=r)})}function ot(e){var r=T(m(e.nodes(),function(u){return e.node(u).rank})),t=[];f(e.nodes(),function(u){var i=e.node(u).rank-r;t[i]||(t[i]=[]),t[i].push(u)});var n=0,o=e.graph().nodeRankFactor;f(t,function(u,i){b(u)&&i%o!==0?--n:n&&f(u,function(a){e.node(a).rank+=n})})}function fe(e,r,t,n){var o={width:0,height:0};return arguments.length>=4&&(o.rank=t,o.order=n),R(e,"border",o,r)}function $e(e){return x(m(e.nodes(),function(r){var t=e.node(r).rank;if(!b(t))return t}))}function it(e,r){var t={lhs:[],rhs:[]};return f(e,function(n){r(n)?t.lhs.push(n):t.rhs.push(n)}),t}function ut(e,r){return r()}function at(e){function r(t){var n=e.children(t),o=e.node(t);if(n.length&&f(n,r),p(o,"minRank")){o.borderLeft=[],o.borderRight=[];for(var u=o.minRank,i=o.maxRank+1;u<i;++u)se(e,"borderLeft","_bl",t,o,u),se(e,"borderRight","_br",t,o,u)}}f(e.children(),r)}function se(e,r,t,n,o,u){var i={width:0,height:0,rank:u,borderType:r},a=o[r][u-1],d=R(e,"border",i,t);o[r][u]=d,e.setParent(d,n),a&&e.setEdge(a,d,{weight:1})}function dt(e){var r=e.graph().rankdir.toLowerCase();(r==="lr"||r==="rl")&&Le(e)}function ct(e){var r=e.graph().rankdir.toLowerCase();(r==="bt"||r==="rl")&&ft(e),(r==="lr"||r==="rl")&&(st(e),Le(e))}function Le(e){f(e.nodes(),function(r){ve(e.node(r))}),f(e.edges(),function(r){ve(e.edge(r))})}function ve(e){var r=e.width;e.width=e.height,e.height=r}function ft(e){f(e.nodes(),function(r){A(e.node(r))}),f(e.edges(),function(r){var t=e.edge(r);f(t.points,A),p(t,"y")&&A(t)})}function A(e){e.y=-e.y}function st(e){f(e.nodes(),function(r){z(e.node(r))}),f(e.edges(),function(r){var t=e.edge(r);f(t.points,z),p(t,"x")&&z(t)})}function z(e){var r=e.x;e.x=e.y,e.y=r}function vt(e){e.graph().dummyChains=[],f(e.edges(),function(r){gt(e,r)})}function gt(e,r){var t=r.v,n=e.node(t).rank,o=r.w,u=e.node(o).rank,i=r.name,a=e.edge(r),d=a.labelRank;if(u!==n+1){e.removeEdge(r);var c,s,v;for(v=0,++n;n<u;++v,++n)a.points=[],s={width:0,height:0,edgeLabel:a,edgeObj:r,rank:n},c=R(e,"edge",s,"_d"),n===d&&(s.width=a.width,s.height=a.height,s.dummy="edge-label",s.labelpos=a.labelpos),e.setEdge(t,c,{weight:a.weight},i),v===0&&e.graph().dummyChains.push(c),t=c;e.setEdge(t,o,{weight:a.weight},i)}}function ht(e){f(e.graph().dummyChains,function(r){var t=e.node(r),n=t.edgeLabel,o;for(e.setEdge(t.edgeObj,n);t.dummy;)o=e.successors(r)[0],e.removeNode(r),n.points.push({x:t.x,y:t.y}),t.dummy==="edge-label"&&(n.x=t.x,n.y=t.y,n.width=t.width,n.height=t.height),r=o,t=e.node(r)})}function te(e){var r={};function t(n){var o=e.node(n);if(p(r,n))return o.rank;r[n]=!0;var u=T(m(e.outEdges(n),function(i){return t(i.w)-e.edge(i).minlen}));return(u===Number.POSITIVE_INFINITY||u===void 0||u===null)&&(u=0),o.rank=u}f(e.sources(),t)}function C(e,r){return e.node(r.w).rank-e.node(r.v).rank-e.edge(r).minlen}function Pe(e){var r=new y({directed:!1}),t=e.nodes()[0],n=e.nodeCount();r.setNode(t,{});for(var o,u;lt(r,e)<n;)o=pt(r,e),u=r.hasNode(o.v)?C(e,o):-C(e,o),mt(r,e,u);return r}function lt(e,r){function t(n){f(r.nodeEdges(n),function(o){var u=o.v,i=n===u?o.w:u;!e.hasNode(i)&&!C(r,o)&&(e.setNode(i,{}),e.setEdge(n,i,{}),t(i))})}return f(e.nodes(),t),e.nodeCount()}function pt(e,r){return ee(r.edges(),function(t){if(e.hasNode(t.v)!==e.hasNode(t.w))return C(r,t)})}function mt(e,r,t){f(e.nodes(),function(n){r.node(n).rank+=t})}function Se(e,r,t){W(r)||(r=[r]);var n=(e.isDirected()?e.successors:e.neighbors).bind(e),o=[],u={};return f(r,function(i){if(!e.hasNode(i))throw new Error("Graph does not have node: "+i);Oe(e,i,t==="post",u,n,o)}),o}function Oe(e,r,t,n,o,u){p(n,r)||(n[r]=!0,t||u.push(r),f(o(r),function(i){Oe(e,i,t,n,o,u)}),t&&u.push(r))}function wt(e,r){return Se(e,r,"post")}function bt(e,r){return Se(e,r,"pre")}k.initLowLimValues=oe;k.initCutValues=ne;k.calcCutValue=Ye;k.leaveEdge=Fe;k.enterEdge=Ge;k.exchangeEdges=je;function k(e){e=tt(e),te(e);var r=Pe(e);oe(r),ne(r,e);for(var t,n;t=Fe(r);)n=Ge(r,e,t),je(r,e,t,n)}function ne(e,r){var t=wt(e,e.nodes());t=t.slice(0,t.length-1),f(t,function(n){yt(e,r,n)})}function yt(e,r,t){var n=e.node(t),o=n.parent;e.edge(t,o).cutvalue=Ye(e,r,t)}function Ye(e,r,t){var n=e.node(t),o=n.parent,u=!0,i=r.edge(t,o),a=0;return i||(u=!1,i=r.edge(o,t)),a=i.weight,f(r.nodeEdges(t),function(d){var c=d.v===t,s=c?d.w:d.v;if(s!==o){var v=c===u,g=r.edge(d).weight;if(a+=v?g:-g,kt(e,t,s)){var h=e.edge(t,s).cutvalue;a+=v?-h:h}}}),a}function oe(e,r){arguments.length<2&&(r=e.nodes()[0]),Be(e,{},1,r)}function Be(e,r,t,n,o){var u=t,i=e.node(n);return r[n]=!0,f(e.neighbors(n),function(a){p(r,a)||(t=Be(e,r,t,a,n))}),i.low=u,i.lim=t++,o?i.parent=o:delete i.parent,t}function Fe(e){return H(e.edges(),function(r){return e.edge(r).cutvalue<0})}function Ge(e,r,t){var n=t.v,o=t.w;r.hasEdge(n,o)||(n=t.w,o=t.v);var u=e.node(n),i=e.node(o),a=u,d=!1;u.lim>i.lim&&(a=i,d=!0);var c=$(r.edges(),function(s){return d===ge(e,e.node(s.v),a)&&d!==ge(e,e.node(s.w),a)});return ee(c,function(s){return C(r,s)})}function je(e,r,t,n){var o=t.v,u=t.w;e.removeEdge(o,u),e.setEdge(n.v,n.w,{}),oe(e),ne(e,r),xt(e,r)}function xt(e,r){var t=H(e.nodes(),function(o){return!r.node(o).parent}),n=bt(e,t);n=n.slice(1),f(n,function(o){var u=e.node(o).parent,i=r.edge(o,u),a=!1;i||(i=r.edge(u,o),a=!0),r.node(o).rank=r.node(u).rank+(a?i.minlen:-i.minlen)})}function kt(e,r,t){return e.hasEdge(r,t)}function ge(e,r,t){return t.low<=r.lim&&r.lim<=t.lim}function Et(e){switch(e.graph().ranker){case"network-simplex":he(e);break;case"tight-tree":_t(e);break;case"longest-path":Nt(e);break;default:he(e)}}var Nt=te;function _t(e){te(e),Pe(e)}function he(e){k(e)}function It(e){var r=R(e,"root",{},"_root"),t=Rt(e),n=x(E(t))-1,o=2*n+1;e.graph().nestingRoot=r,f(e.edges(),function(i){e.edge(i).minlen*=o});var u=Mt(e)+1;f(e.children(),function(i){Ve(e,r,o,u,n,t,i)}),e.graph().nodeRankFactor=o}function Ve(e,r,t,n,o,u,i){var a=e.children(i);if(!a.length){i!==r&&e.setEdge(r,i,{weight:0,minlen:t});return}var d=fe(e,"_bt"),c=fe(e,"_bb"),s=e.node(i);e.setParent(d,i),s.borderTop=d,e.setParent(c,i),s.borderBottom=c,f(a,function(v){Ve(e,r,t,n,o,u,v);var g=e.node(v),h=g.borderTop?g.borderTop:v,l=g.borderBottom?g.borderBottom:v,w=g.borderTop?n:2*n,M=h!==l?1:o-u[i]+1;e.setEdge(d,h,{weight:w,minlen:M,nestingEdge:!0}),e.setEdge(l,c,{weight:w,minlen:M,nestingEdge:!0})}),e.parent(i)||e.setEdge(r,d,{weight:0,minlen:o+u[i]})}function Rt(e){var r={};function t(n,o){var u=e.children(n);u&&u.length&&f(u,function(i){t(i,o+1)}),r[n]=o}return f(e.children(),function(n){t(n,1)}),r}function Mt(e){return j(e.edges(),function(r,t){return r+e.edge(t).weight},0)}function Tt(e){var r=e.graph();e.removeNode(r.nestingRoot),delete r.nestingRoot,f(e.edges(),function(t){var n=e.edge(t);n.nestingEdge&&e.removeEdge(t)})}function Ct(e,r,t){var n={},o;f(t,function(u){for(var i=e.parent(u),a,d;i;){if(a=e.parent(i),a?(d=n[a],n[a]=i):(d=o,o=i),d&&d!==i){r.setEdge(d,i);return}i=a}})}function $t(e,r,t){var n=Lt(e),o=new y({compound:!0}).setGraph({root:n}).setDefaultNodeLabel(function(u){return e.node(u)});return f(e.nodes(),function(u){var i=e.node(u),a=e.parent(u);(i.rank===r||i.minRank<=r&&r<=i.maxRank)&&(o.setNode(u),o.setParent(u,a||n),f(e[t](u),function(d){var c=d.v===u?d.w:d.v,s=o.edge(c,u),v=b(s)?0:s.weight;o.setEdge(c,u,{weight:e.edge(d).weight+v})}),p(i,"minRank")&&o.setNode(u,{borderLeft:i.borderLeft[r],borderRight:i.borderRight[r]}))}),o}function Lt(e){for(var r;e.hasNode(r=re("_root")););return r}function Pt(e,r){for(var t=0,n=1;n<r.length;++n)t+=St(e,r[n-1],r[n]);return t}function St(e,r,t){for(var n=Xr(t,m(t,function(c,s){return s})),o=I(m(r,function(c){return L(m(e.outEdges(c),function(s){return{pos:n[s.w],weight:e.edge(s).weight}}),"pos")})),u=1;u<t.length;)u<<=1;var i=2*u-1;u-=1;var a=m(new Array(i),function(){return 0}),d=0;return f(o.forEach(function(c){var s=c.pos+u;a[s]+=c.weight;for(var v=0;s>0;)s%2&&(v+=a[s+1]),s=s-1>>1,a[s]+=c.weight;d+=c.weight*v})),d}function Ot(e){var r={},t=$(e.nodes(),function(a){return!e.children(a).length}),n=x(m(t,function(a){return e.node(a).rank})),o=m(N(n+1),function(){return[]});function u(a){if(!p(r,a)){r[a]=!0;var d=e.node(a);o[d.rank].push(a),f(e.successors(a),u)}}var i=L(t,function(a){return e.node(a).rank});return f(i,u),o}function Yt(e,r){return m(r,function(t){var n=e.inEdges(t);if(n.length){var o=j(n,function(u,i){var a=e.edge(i),d=e.node(i.v);return{sum:u.sum+a.weight*d.order,weight:u.weight+a.weight}},{sum:0,weight:0});return{v:t,barycenter:o.sum/o.weight,weight:o.weight}}else return{v:t}})}function Bt(e,r){var t={};f(e,function(o,u){var i=t[o.v]={indegree:0,in:[],out:[],vs:[o.v],i:u};b(o.barycenter)||(i.barycenter=o.barycenter,i.weight=o.weight)}),f(r.edges(),function(o){var u=t[o.v],i=t[o.w];!b(u)&&!b(i)&&(i.indegree++,u.out.push(t[o.w]))});var n=$(t,function(o){return!o.indegree});return Ft(n)}function Ft(e){var r=[];function t(u){return function(i){i.merged||(b(i.barycenter)||b(u.barycenter)||i.barycenter>=u.barycenter)&&Gt(u,i)}}function n(u){return function(i){i.in.push(u),--i.indegree===0&&e.push(i)}}for(;e.length;){var o=e.pop();r.push(o),f(o.in.reverse(),t(o)),f(o.out,n(o))}return m($(r,function(u){return!u.merged}),function(u){return G(u,["vs","i","barycenter","weight"])})}function Gt(e,r){var t=0,n=0;e.weight&&(t+=e.barycenter*e.weight,n+=e.weight),r.weight&&(t+=r.barycenter*r.weight,n+=r.weight),e.vs=r.vs.concat(e.vs),e.barycenter=t/n,e.weight=n,e.i=Math.min(r.i,e.i),r.merged=!0}function jt(e,r){var t=it(e,function(s){return p(s,"barycenter")}),n=t.lhs,o=L(t.rhs,function(s){return-s.i}),u=[],i=0,a=0,d=0;n.sort(Vt(!!r)),d=le(u,o,d),f(n,function(s){d+=s.vs.length,u.push(s.vs),i+=s.barycenter*s.weight,a+=s.weight,d=le(u,o,d)});var c={vs:I(u)};return a&&(c.barycenter=i/a,c.weight=a),c}function le(e,r,t){for(var n;r.length&&(n=F(r)).i<=t;)r.pop(),e.push(n.vs),t++;return t}function Vt(e){return function(r,t){return r.barycenter<t.barycenter?-1:r.barycenter>t.barycenter?1:e?t.i-r.i:r.i-t.i}}function qe(e,r,t,n){var o=e.children(r),u=e.node(r),i=u?u.borderLeft:void 0,a=u?u.borderRight:void 0,d={};i&&(o=$(o,function(l){return l!==i&&l!==a}));var c=Yt(e,o);f(c,function(l){if(e.children(l.v).length){var w=qe(e,l.v,t,n);d[l.v]=w,p(w,"barycenter")&&Dt(l,w)}});var s=Bt(c,t);qt(s,d);var v=jt(s,n);if(i&&(v.vs=I([i,v.vs,a]),e.predecessors(i).length)){var g=e.node(e.predecessors(i)[0]),h=e.node(e.predecessors(a)[0]);p(v,"barycenter")||(v.barycenter=0,v.weight=0),v.barycenter=(v.barycenter*v.weight+g.order+h.order)/(v.weight+2),v.weight+=2}return v}function qt(e,r){f(e,function(t){t.vs=I(t.vs.map(function(n){return r[n]?r[n].vs:n}))})}function Dt(e,r){b(e.barycenter)?(e.barycenter=r.barycenter,e.weight=r.weight):(e.barycenter=(e.barycenter*e.weight+r.barycenter*r.weight)/(e.weight+r.weight),e.weight+=r.weight)}function At(e){var r=$e(e),t=pe(e,N(1,r+1),"inEdges"),n=pe(e,N(r-1,-1,-1),"outEdges"),o=Ot(e);me(e,o);for(var u=Number.POSITIVE_INFINITY,i,a=0,d=0;d<4;++a,++d){zt(a%2?t:n,a%4>=2),o=q(e);var c=Pt(e,o);c<u&&(d=0,i=br(o),u=c)}me(e,i)}function pe(e,r,t){return m(r,function(n){return $t(e,n,t)})}function zt(e,r){var t=new y;f(e,function(n){var o=n.graph().root,u=qe(n,o,t,r);f(u.vs,function(i,a){n.node(i).order=a}),Ct(n,t,u.vs)})}function me(e,r){f(r,function(t){f(t,function(n,o){e.node(n).order=o})})}function Xt(e){var r=Qt(e);f(e.graph().dummyChains,function(t){for(var n=e.node(t),o=n.edgeObj,u=Zt(e,r,o.v,o.w),i=u.path,a=u.lca,d=0,c=i[d],s=!0;t!==o.w;){if(n=e.node(t),s){for(;(c=i[d])!==a&&e.node(c).maxRank<n.rank;)d++;c===a&&(s=!1)}if(!s){for(;d<i.length-1&&e.node(c=i[d+1]).minRank<=n.rank;)d++;c=i[d]}e.setParent(t,c),t=e.successors(t)[0]}})}function Zt(e,r,t,n){var o=[],u=[],i=Math.min(r[t].low,r[n].low),a=Math.max(r[t].lim,r[n].lim),d,c;d=t;do d=e.parent(d),o.push(d);while(d&&(r[d].low>i||a>r[d].lim));for(c=d,d=n;(d=e.parent(d))!==c;)u.push(d);return{path:o.concat(u.reverse()),lca:c}}function Qt(e){var r={},t=0;function n(o){var u=t;f(e.children(o),n),r[o]={low:u,lim:t++}}return f(e.children(),n),r}function Jt(e,r){var t={};function n(o,u){var i=0,a=0,d=o.length,c=F(u);return f(u,function(s,v){var g=Wt(e,s),h=g?e.node(g).order:d;(g||s===c)&&(f(u.slice(a,v+1),function(l){f(e.predecessors(l),function(w){var M=e.node(w),ie=M.order;(ie<i||h<ie)&&!(M.dummy&&e.node(l).dummy)&&De(t,w,l)})}),a=v+1,i=h)}),u}return j(r,n),t}function Ut(e,r){var t={};function n(u,i,a,d,c){var s;f(N(i,a),function(v){s=u[v],e.node(s).dummy&&f(e.predecessors(s),function(g){var h=e.node(g);h.dummy&&(h.order<d||h.order>c)&&De(t,g,s)})})}function o(u,i){var a=-1,d,c=0;return f(i,function(s,v){if(e.node(s).dummy==="border"){var g=e.predecessors(s);g.length&&(d=e.node(g[0]).order,n(i,c,v,a,d),c=v,a=d)}n(i,c,i.length,d,u.length)}),i}return j(r,o),t}function Wt(e,r){if(e.node(r).dummy)return H(e.predecessors(r),function(t){return e.node(t).dummy})}function De(e,r,t){if(r>t){var n=r;r=t,t=n}var o=e[r];o||(e[r]=o={}),o[t]=!0}function Ht(e,r,t){if(r>t){var n=r;r=t,t=n}return p(e[r],t)}function Kt(e,r,t,n){var o={},u={},i={};return f(r,function(a){f(a,function(d,c){o[d]=d,u[d]=d,i[d]=c})}),f(r,function(a){var d=-1;f(a,function(c){var s=n(c);if(s.length){s=L(s,function(w){return i[w]});for(var v=(s.length-1)/2,g=Math.floor(v),h=Math.ceil(v);g<=h;++g){var l=s[g];u[c]===c&&d<i[l]&&!Ht(t,c,l)&&(u[l]=c,u[c]=o[c]=o[l],d=i[l])}}})}),{root:o,align:u}}function en(e,r,t,n,o){var u={},i=rn(e,r,t,o),a=o?"borderLeft":"borderRight";function d(v,g){for(var h=i.nodes(),l=h.pop(),w={};l;)w[l]?v(l):(w[l]=!0,h.push(l),h=h.concat(g(l))),l=h.pop()}function c(v){u[v]=i.inEdges(v).reduce(function(g,h){return Math.max(g,u[h.v]+i.edge(h))},0)}function s(v){var g=i.outEdges(v).reduce(function(l,w){return Math.min(l,u[w.w]-i.edge(w))},Number.POSITIVE_INFINITY),h=e.node(v);g!==Number.POSITIVE_INFINITY&&h.borderType!==a&&(u[v]=Math.max(u[v],g))}return d(c,i.predecessors.bind(i)),d(s,i.successors.bind(i)),f(n,function(v){u[v]=u[t[v]]}),u}function rn(e,r,t,n){var o=new y,u=e.graph(),i=an(u.nodesep,u.edgesep,n);return f(r,function(a){var d;f(a,function(c){var s=t[c];if(o.setNode(s),d){var v=t[d],g=o.edge(v,s);o.setEdge(v,s,Math.max(i(e,c,d),g||0))}d=c})}),o}function tn(e,r){return ee(E(r),function(t){var n=Number.NEGATIVE_INFINITY,o=Number.POSITIVE_INFINITY;return Rr(t,function(u,i){var a=dn(e,i)/2;n=Math.max(u+a,n),o=Math.min(u-a,o)}),n-o})}function nn(e,r){var t=E(r),n=T(t),o=x(t);f(["u","d"],function(u){f(["l","r"],function(i){var a=u+i,d=e[a],c;if(d!==r){var s=E(d);c=i==="l"?n-T(s):o-x(s),c&&(e[a]=V(d,function(v){return v+c}))}})})}function on(e,r){return V(e.ul,function(t,n){if(r)return e[r.toLowerCase()][n];var o=L(m(e,n));return(o[1]+o[2])/2})}function un(e){var r=q(e),t=Q(Jt(e,r),Ut(e,r)),n={},o;f(["u","d"],function(i){o=i==="u"?r:E(r).reverse(),f(["l","r"],function(a){a==="r"&&(o=m(o,function(v){return E(v).reverse()}));var d=(i==="u"?e.predecessors:e.successors).bind(e),c=Kt(e,o,t,d),s=en(e,o,c.root,c.align,a==="r");a==="r"&&(s=V(s,function(v){return-v})),n[i+a]=s})});var u=tn(e,n);return nn(n,u),on(n,e.graph().align)}function an(e,r,t){return function(n,o,u){var i=n.node(o),a=n.node(u),d=0,c;if(d+=i.width/2,p(i,"labelpos"))switch(i.labelpos.toLowerCase()){case"l":c=-i.width/2;break;case"r":c=i.width/2;break}if(c&&(d+=t?c:-c),c=0,d+=(i.dummy?r:e)/2,d+=(a.dummy?r:e)/2,d+=a.width/2,p(a,"labelpos"))switch(a.labelpos.toLowerCase()){case"l":c=a.width/2;break;case"r":c=-a.width/2;break}return c&&(d+=t?c:-c),c=0,d}}function dn(e,r){return e.node(r).width}function cn(e){e=Ce(e),fn(e),Mr(un(e),function(r,t){e.node(t).x=r})}function fn(e){var r=q(e),t=e.graph().ranksep,n=0;f(r,function(o){var u=x(m(o,function(i){return e.node(i).height}));f(o,function(i){e.node(i).y=n+u/2}),n+=u+t})}function Yn(e,r){var t=ut;t("layout",function(){var n=t("  buildLayoutGraph",function(){return xn(e)});t("  runLayout",function(){sn(n,t)}),t("  updateInputGraph",function(){vn(e,n)})})}function sn(e,r){r("    makeSpaceForEdgeLabels",function(){kn(e)}),r("    removeSelfEdges",function(){$n(e)}),r("    acyclic",function(){Kr(e)}),r("    nestingGraph.run",function(){It(e)}),r("    rank",function(){Et(Ce(e))}),r("    injectEdgeLabelProxies",function(){En(e)}),r("    removeEmptyRanks",function(){ot(e)}),r("    nestingGraph.cleanup",function(){Tt(e)}),r("    normalizeRanks",function(){nt(e)}),r("    assignRankMinMax",function(){Nn(e)}),r("    removeEdgeLabelProxies",function(){_n(e)}),r("    normalize.run",function(){vt(e)}),r("    parentDummyChains",function(){Xt(e)}),r("    addBorderSegments",function(){at(e)}),r("    order",function(){At(e)}),r("    insertSelfEdges",function(){Ln(e)}),r("    adjustCoordinateSystem",function(){dt(e)}),r("    position",function(){cn(e)}),r("    positionSelfEdges",function(){Pn(e)}),r("    removeBorderNodes",function(){Cn(e)}),r("    normalize.undo",function(){ht(e)}),r("    fixupEdgeLabelCoords",function(){Mn(e)}),r("    undoCoordinateSystem",function(){ct(e)}),r("    translateGraph",function(){In(e)}),r("    assignNodeIntersects",function(){Rn(e)}),r("    reversePoints",function(){Tn(e)}),r("    acyclic.undo",function(){rt(e)})}function vn(e,r){f(e.nodes(),function(t){var n=e.node(t),o=r.node(t);n&&(n.x=o.x,n.y=o.y,r.children(t).length&&(n.width=o.width,n.height=o.height))}),f(e.edges(),function(t){var n=e.edge(t),o=r.edge(t);n.points=o.points,p(o,"x")&&(n.x=o.x,n.y=o.y)}),e.graph().width=r.graph().width,e.graph().height=r.graph().height}var gn=["nodesep","edgesep","ranksep","marginx","marginy"],hn={ranksep:50,edgesep:20,nodesep:50,rankdir:"tb"},ln=["acyclicer","ranker","rankdir","align"],pn=["width","height"],mn={width:0,height:0},wn=["minlen","weight","width","height","labeloffset"],bn={minlen:1,weight:1,width:0,height:0,labeloffset:10,labelpos:"r"},yn=["labelpos"];function xn(e){var r=new y({multigraph:!0,compound:!0}),t=Z(e.graph());return r.setGraph(Q({},hn,X(t,gn),G(t,ln))),f(e.nodes(),function(n){var o=Z(e.node(n));r.setNode(n,kr(X(o,pn),mn)),r.setParent(n,e.parent(n))}),f(e.edges(),function(n){var o=Z(e.edge(n));r.setEdge(n,Q({},bn,X(o,wn),G(o,yn)))}),r}function kn(e){var r=e.graph();r.ranksep/=2,f(e.edges(),function(t){var n=e.edge(t);n.minlen*=2,n.labelpos.toLowerCase()!=="c"&&(r.rankdir==="TB"||r.rankdir==="BT"?n.width+=n.labeloffset:n.height+=n.labeloffset)})}function En(e){f(e.edges(),function(r){var t=e.edge(r);if(t.width&&t.height){var n=e.node(r.v),o=e.node(r.w),u={rank:(o.rank-n.rank)/2+n.rank,e:r};R(e,"edge-proxy",u,"_ep")}})}function Nn(e){var r=0;f(e.nodes(),function(t){var n=e.node(t);n.borderTop&&(n.minRank=e.node(n.borderTop).rank,n.maxRank=e.node(n.borderBottom).rank,r=x(r,n.maxRank))}),e.graph().maxRank=r}function _n(e){f(e.nodes(),function(r){var t=e.node(r);t.dummy==="edge-proxy"&&(e.edge(t.e).labelRank=t.rank,e.removeNode(r))})}function In(e){var r=Number.POSITIVE_INFINITY,t=0,n=Number.POSITIVE_INFINITY,o=0,u=e.graph(),i=u.marginx||0,a=u.marginy||0;function d(c){var s=c.x,v=c.y,g=c.width,h=c.height;r=Math.min(r,s-g/2),t=Math.max(t,s+g/2),n=Math.min(n,v-h/2),o=Math.max(o,v+h/2)}f(e.nodes(),function(c){d(e.node(c))}),f(e.edges(),function(c){var s=e.edge(c);p(s,"x")&&d(s)}),r-=i,n-=a,f(e.nodes(),function(c){var s=e.node(c);s.x-=r,s.y-=n}),f(e.edges(),function(c){var s=e.edge(c);f(s.points,function(v){v.x-=r,v.y-=n}),p(s,"x")&&(s.x-=r),p(s,"y")&&(s.y-=n)}),u.width=t-r+i,u.height=o-n+a}function Rn(e){f(e.edges(),function(r){var t=e.edge(r),n=e.node(r.v),o=e.node(r.w),u,i;t.points?(u=t.points[0],i=t.points[t.points.length-1]):(t.points=[],u=o,i=n),t.points.unshift(ce(n,u)),t.points.push(ce(o,i))})}function Mn(e){f(e.edges(),function(r){var t=e.edge(r);if(p(t,"x"))switch((t.labelpos==="l"||t.labelpos==="r")&&(t.width-=t.labeloffset),t.labelpos){case"l":t.x-=t.width/2+t.labeloffset;break;case"r":t.x+=t.width/2+t.labeloffset;break}})}function Tn(e){f(e.edges(),function(r){var t=e.edge(r);t.reversed&&t.points.reverse()})}function Cn(e){f(e.nodes(),function(r){if(e.children(r).length){var t=e.node(r),n=e.node(t.borderTop),o=e.node(t.borderBottom),u=e.node(F(t.borderLeft)),i=e.node(F(t.borderRight));t.width=Math.abs(i.x-u.x),t.height=Math.abs(o.y-n.y),t.x=u.x+t.width/2,t.y=n.y+t.height/2}}),f(e.nodes(),function(r){e.node(r).dummy==="border"&&e.removeNode(r)})}function $n(e){f(e.edges(),function(r){if(r.v===r.w){var t=e.node(r.v);t.selfEdges||(t.selfEdges=[]),t.selfEdges.push({e:r,label:e.edge(r)}),e.removeEdge(r)}})}function Ln(e){var r=q(e);f(r,function(t){var n=0;f(t,function(o,u){var i=e.node(o);i.order=u+n,f(i.selfEdges,function(a){R(e,"selfedge",{width:a.label.width,height:a.label.height,rank:i.rank,order:u+ ++n,e:a.e,label:a.label},"_se")}),delete i.selfEdges})})}function Pn(e){f(e.nodes(),function(r){var t=e.node(r);if(t.dummy==="selfedge"){var n=e.node(t.e.v),o=n.x+n.width/2,u=n.y,i=t.x-o,a=n.height/2;e.setEdge(t.e,t.label),e.removeNode(r),t.label.points=[{x:o+2*i/3,y:u-a},{x:o+5*i/6,y:u-a},{x:o+i,y:u},{x:o+5*i/6,y:u+a},{x:o+2*i/3,y:u+a}],t.label.x=t.x,t.label.y=t.y}})}function X(e,r){return V(G(e,r),Number)}function Z(e){var r={};return f(e,function(t,n){r[n.toLowerCase()]=t}),r}export{G,N,Yn as Y,kr as _,re as e,m};
