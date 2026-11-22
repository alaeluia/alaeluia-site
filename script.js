const slides=[...document.querySelectorAll('.hero-slide')];
let current=0;
let timer;
function showSlide(index){
  current=(index+slides.length)%slides.length;
  slides.forEach((slide,i)=>{
    const active=i===current;
    slide.classList.toggle('active',active);
    const video=slide.querySelector('video');
    if(video){
      if(active){
        video.currentTime=0;
        video.play().catch(()=>{});
      }else{
        video.pause();
      }
    }
  });
}
function restartCarousel(){clearInterval(timer);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(()=>showSlide(current+1),6000)}
document.querySelector('.next').addEventListener('click',()=>{showSlide(current+1);restartCarousel()});
document.querySelector('.prev').addEventListener('click',()=>{showSlide(current-1);restartCarousel()});
restartCarousel();

const videoSlides=[...document.querySelectorAll('.video-slide')];
if(videoSlides.length){
  const videoDots=document.querySelector('.video-dots');
  let videoIndex=0;
  let videoTimer;

  videoSlides.forEach((_,index)=>{
    const dot=document.createElement('button');
    dot.type='button';
    dot.setAttribute('aria-label',`Show treatment video ${index+1}`);
    dot.classList.toggle('active',index===0);
    dot.addEventListener('click',()=>showVideo(index));
    videoDots.appendChild(dot);
  });

  function showVideo(index){
    videoIndex=(index+videoSlides.length)%videoSlides.length;
    videoSlides.forEach((video,i)=>{
      const active=i===videoIndex;
      video.classList.toggle('active',active);
      if(active){
        video.currentTime=0;
        video.play().catch(()=>{});
      }else{
        video.pause();
      }
    });
    [...videoDots.children].forEach((dot,i)=>dot.classList.toggle('active',i===videoIndex));
  }

  function restartVideos(){
    clearInterval(videoTimer);
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
      videoTimer=setInterval(()=>showVideo(videoIndex+1),7000);
    }
  }

  document.querySelector('.video-prev').addEventListener('click',()=>{
    showVideo(videoIndex-1);
    restartVideos();
  });
  document.querySelector('.video-next').addEventListener('click',()=>{
    showVideo(videoIndex+1);
    restartVideos();
  });
  videoSlides[0].play().catch(()=>{});
  restartVideos();
}

const select=document.querySelector('#treatment-select');
document.querySelectorAll('.book-treatment').forEach(link=>link.addEventListener('click',()=>{select.value=link.dataset.treatment}));
const giftDialog=document.querySelector('#gift-voucher-dialog');
document.querySelector('.gift-card-link').addEventListener('click',()=>giftDialog.showModal());
document.querySelector('.gift-voucher-close').addEventListener('click',()=>giftDialog.close());
giftDialog.addEventListener('click',event=>{
  if(event.target===giftDialog)giftDialog.close();
});
document.querySelector('#gift-voucher-form').addEventListener('submit',event=>{
  event.preventDefault();
  const name=new FormData(event.currentTarget).get('gift-name');
  document.querySelector('.gift-form-status').textContent=`Thank you${name?' '+name:''}. Alaeluia will be in touch about your gift voucher.`;
});
document.querySelector('#booking-form').addEventListener('submit',event=>{
  event.preventDefault();
  const name=new FormData(event.currentTarget).get('name');
  document.querySelector('.form-status').textContent=`Thank you${name?' '+name:''}. Please contact Alaeluia to confirm your booking.`;
});
document.querySelector('#footer-year').textContent=new Date().getFullYear();

const signatureSlides=[...document.querySelectorAll('.signature-slide')];
if(signatureSlides.length){
  const signatureDots=document.querySelector('.signature-dots');
  let signatureIndex=0;
  let signatureTimer;

  signatureSlides.forEach((_,index)=>{
    const dot=document.createElement('span');
    dot.classList.toggle('active',index===0);
    signatureDots.appendChild(dot);
  });

  function showSignature(index){
    signatureIndex=(index+signatureSlides.length)%signatureSlides.length;
    signatureSlides.forEach((slide,i)=>slide.classList.toggle('active',i===signatureIndex));
    [...signatureDots.children].forEach((dot,i)=>dot.classList.toggle('active',i===signatureIndex));
  }

  function restartSignature(){
    clearInterval(signatureTimer);
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
      signatureTimer=setInterval(()=>showSignature(signatureIndex+1),4500);
    }
  }

  document.querySelector('.signature-prev').addEventListener('click',()=>{
    showSignature(signatureIndex-1);
    restartSignature();
  });
  document.querySelector('.signature-next').addEventListener('click',()=>{
    showSignature(signatureIndex+1);
    restartSignature();
  });
  restartSignature();
}

if(matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}else{
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
