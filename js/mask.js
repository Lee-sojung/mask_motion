const wrap = document.querySelector("main");
const btns = wrap.querySelectorAll("#navi li");
const panels = wrap.querySelectorAll("section article");

btns.forEach((btn,index)=>{
    //각 버튼을 클릭시
    btn.addEventListener("click", e=>{

        for(let i=0; i<btns.length; i++){
            //모든 버튼을 비활성화
            btns[i].classList.remove("on");

            //기존 활성화 되어있는 패널에만 mask클래스를 붙여서 모션 시작
            if(panels[i].classList.contains("on")){
                panels[i].classList.add("mask");
            }
        }
        //현재 클릭한 순번에 해당하는 버튼만 활성화
        btns[index].classList.add("on");

        //현재 클릭한 순번에 해당하는 패널에 lower클래스를 붙여서 바로 아래쪽에 위치시킴
        panels[index].classList.add("lower");

        setTimeout(()=>{
            for(let i=0; i<panels.length; i++){
                //기존에 on으로 활성화 되어있던 패널만 찾아서 on,mask클래스 제거
                if(panels[i].classList.contains("on")){
                    panels[i].classList.remove("on");
                    panels[i].classList.remove("mask");
                }
            }

            //클릭한 순번인 패널만 lower클래스를 지우고 on클래스를 붙여서 화면 제일 최상단에 배치
            panels[index].classList.remove("lower");
            panels[index].classList.add("on");
        },1400)

    })
})