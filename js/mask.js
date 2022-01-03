const wrap = document.querySelector("main");
const btns = wrap.querySelectorAll("#navi li");
const panels = wrap.querySelectorAll("section article");

btns.forEach((btn,index)=>{
    btn.addEventListener("click", e=>{
        for(let i=0; i<btns.length; i++){
            btns[i].classList.remove("on");
            panels[i].classList.remove("on");
        }
        btns[index].classList.add("on");
        panels[index].classList.add("on");
    })
})