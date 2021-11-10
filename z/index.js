(()=>{
  /* Search for arg */
  let url;
  const s = window.location.search != '' && window.location.search.length > 1 ? (window.location.search+window.location.hash.replace('#','&')) : window.location.hash.replace('#','?')
  if (s) {
    const params = new URLSearchParams(s);
    const searchFor = ["u","url","e","enc","encoded","d","dest","destination","goto","gt"];
    searchFor.forEach((el)=>{
      if (url) return;
      const g = params.get(el);
      if (g && g!='') {
        url=g;
      }
    })
  }
  /* Redirect/Show Tool */
  if (url && url !== ''){
    setTimeout(()=>document.location.href=window.zwspSteg.decode(decodeURI(url)),100)
  }else{
    document.addEventListener('DOMContentLoaded',()=>document.querySelector('.CreationTool').hidden=null)
  }
})()
