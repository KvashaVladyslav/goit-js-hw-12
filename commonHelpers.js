import{a as S,S as v,i as u}from"./assets/vendor-03da8548.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();async function m(o,r){const e="https://pixabay.com"+"/api/",t={key:"43020663-61586e43f3e56b8b813ab6c78",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15};return(await S.get(e,{params:t})).data}function f(o){if(o.length===0)iziToast.warning({color:"orange",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),d(),form.reset();else{const r=o.map(l=>{const{largeImageURL:a,webformatURL:e,tags:t,likes:i,views:L,comments:b,downloads:w}=l;return`<li class="gallery-item">
        <a href="${a}">
        <img class="photo" src="${e}" alt="${t}" />
        </a>
        <ul class="info-list">
          <li class="info-list-item">
            Likes
            <p>${i}</p>
          </li>
          <li class="info-list-item">
            Views
            <p>${L}</p>
          </li>
          <li class="info-list-item">
            Comments
            <p>${b}</p>
          </li>
          <li class="info-list-item">
            Downloads
            <p>${w}</p>
          </li>
        </ul>
      </li>`}).join("");s.gallery.insertAdjacentHTML("beforeend",r),B.refresh()}d()}const B=new v(".gallery a",{captionsData:"alt",captionDelay:250}),s={formEl:document.querySelector(".form"),searchBtn:document.querySelector(".search-btn"),loadMoreBtn:document.querySelector(".load-more-btn"),gallery:document.querySelector(".gallery"),loaderBox:document.querySelector(".loader")};let c,n=1,g=0;const M=15;function P(){s.loadMoreBtn.classList.remove("visually-hidden")}function h(){s.loadMoreBtn.classList.add("visually-hidden")}function p(){s.loaderBox.classList.remove("visually-hidden")}function d(){s.loaderBox.classList.add("visually-hidden")}function y(){n>=g?(u.success({color:"green",position:"topRight",message:"We're sorry, but you've reached the end of search results."}),h()):P()}function q(){const o=s.gallery.firstChild.getBoundingClientRect().height;scrollBy({top:o*2,behavior:"smooth"})}s.formEl.addEventListener("submit",E);s.loadMoreBtn.addEventListener("click",R);async function E(o){if(o.preventDefault(),s.gallery.innerHTML="",c=o.target.elements.inputname.value.trim(),p(),n=1,c!=="")try{const r=await m(c,n);g=Math.ceil(r.totalHits/M),f(r.hits)}catch{u.warning({color:"orange",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"})}else u.info({color:"blue",position:"topRight",message:"Please, search some object"});d(),y(),o.target.reset()}async function R(){n+=1,h(),p();try{const o=await m(c,n);f(o.hits)}catch{u.show({color:"red",position:"topRight",message:"Error"})}y(),d(),q()}
//# sourceMappingURL=commonHelpers.js.map
