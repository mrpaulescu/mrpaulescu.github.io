window.addEventListener('scroll', (e)=> {
    const nav = document.querySelector('nav')
      window.scrollY >= 5 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled')
  })
  
  window.addEventListener('load', (e)=> {
    const nav = document.querySelector('nav')
      window.scrollY >= 5 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled')
  })