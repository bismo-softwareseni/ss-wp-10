!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n=wp.blocks.registerBlockType,a=wp.apiFetch,r=wp.data.withSelect,l=wp.editor,o=(l.AlignmentToolbar,l.RichText,l.BlockControls,l.BlockAlignmentToolbar,l.InspectorControls),i=wp.components,u=(i.TextControl,i.SelectControl),c=i.PanelBody,s=i.PanelRow;n("ss-wp-10/ss-testimonial-block",{title:"Softwareseni Testimonial",icon:"format-chat",category:"common",attributes:{maxTestimonialPerPage:{type:"integer",default:1},testimonialFontSize:{type:"integer",default:16},testimonialData:{type:"array",default:[]}},edit:r(function(e,t){return{testimonials:a({path:"/ss-wp-9/v1/testimonials/?per_page="+t.attributes.maxTestimonialPerPage})}})(function(e){e.testimonials,e.className;var t=e.attributes,n=e.setAttributes;e.setState;return React.createElement("div",null,React.createElement(o,null,React.createElement(c,{title:"Maximum Testimonials Per Page"},React.createElement(s,null,React.createElement(u,{options:[{label:"1",value:1},{label:"2",value:2},{label:"3",value:3},{label:"4",value:4},{label:"5",value:5}],onChange:function(e){n({maxTestimonialPerPage:parseInt(e)})},value:t.maxTestimonialPerPage})))),React.createElement(function(e){var t=e.testimonial_data,n=React.createElement("div",null);return t[0]instanceof Array&&(n=t[0].map(function(e){return React.createElement("div",null,"aasdasdasdasdads")})),React.createElement("div",null,n)},{testimonial_data:t.testimonialData}))}),save:function(){return null}})}]);