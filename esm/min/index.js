const e={$set:(e,t)=>t,$unset:(e,t)=>{const r={...e};for(const e of t)delete r[e];return r},$push:(e,t)=>[...e,t],$append:(e,t)=>[...e,...t],$apply:(e,t)=>t(e),$filter:(e,t)=>e.filter(t),$merge:(e,t)=>({...e,...t})},t=(r,n,c,s,o)=>{const a=n[c];return c===n.length-1?e[a](r,s):((r=((e,t=!1)=>!0===Array.isArray(e)?[...e]:void 0===e&&!0===t?{}:"object"!=typeof e||null===e?e:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e.constructor!==Object?e:{...e})(r,o))[a]=t(r[a],n,c+1,s,o),r)},r=e=>e.split(/(?<!\.)\.(?!\.)/).map(e=>e.replace(/\.\./g,".")),n=(e,n,c=!1)=>Object.keys(n).reduce((e,s)=>t(e,r(s),0,n[s],c),e);n.actions=e,n.expand=(...e)=>e.reduce((e,t)=>{const r=Object.entries(t).reduce((e,[t,r])=>(e[`${t}.$set`]=r,e),{});return n(e,r,!0)},{}),n.seq=(e,...n)=>n.reduce((e,[n,c,s=!1])=>t(e,r(n),0,c,s),e);export default n;
