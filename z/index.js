((u)=>{
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
    setTimeout(()=>document.location.href=u(window.zwspSteg.decode(decodeURI(url))),100)
  }else{
    document.addEventListener('DOMContentLoaded',()=>document.querySelector('.CreationTool').hidden=null)
  }
})(
  // Final URI prefix adder (for if not found)
  (u)=>{
    // normal https cases
    if (u.startsWith('https://')) return u;
    if (u.startsWith('http://')) return u.replace('http://','https://')
    if (u.startsWith('//')) return 'https:'+u;
    if (u.startsWith('www.')) return 'https://'+u;
    // services
    const services = {
      yt:'https://youtube.com/watch?v=',
      gh:'https://github.com/',
      cbtcdn:'https://cdn.cbt.wiki/',
      g:'https://nora.lgbt/goto/'
    }
    for (const service in services) {
      let sv = services[service]
      if(!sv.includes('...'))sv=sv+'...'
      if(u.startsWith(service+'/')) {
        const x = u.substr(service.length+1)
        return sv.replace('...',x)
      }
    }
    // no protocol
    if (!u.includes(':')) return 'https://'+u;
    // illegal protocol
    if (u.includes('JavaScript') || u.includes('chrome:') || u.includes('about:')) return 'https://nora.lgbt/goto/'+encodeURI(u);
    // default
    return u;
  }
)
