class Mask {
    constructor() {
        this.init();
        this.bindingEvent();
    }

    init() {
        this.wrap = document.querySelector("main");
        this.btns = this.wrap.querySelectorAll("#navi li");
        this.panels = this.wrap.querySelectorAll("section article");
        this.isOn = null;
        this.enableClick = true;

        for(let panels of this.panels){
            panels.classList.remove("mask");
        }
    }

    bindingEvent() {
        this.btns.forEach((btn, index) => {
            btn.addEventListener("click", e => {
                this.isOn = e.currentTarget.classList.contains("on");
                if(this.isOn) return;

                if(this.enableClick){
                    this.enableClick = false;
                    this.activation(index);
                }
            })
        })
    }

    activation(index) {
        for (let i = 0; i < this.btns.length; i++) {
            //모든 버튼을 비활성화
            this.btns[i].classList.remove("on");

            //기존활성화 되어있는 패널에만 mask클래스를 붙여서 모션 시작
            if (this.panels[i].classList.contains("on")) {
                this.panels[i].classList.add("mask");
            }
        }

        //현재 클릭한 순번에 해당하는 버튼만 활성화
        this.btns[index].classList.add("on");

        //현재 클릭한 순번에 해당하는 패널에 lower를 붙여서 바로 아래쪽에 위치시킴
        this.panels[index].classList.add("lower");

        setTimeout(() => {
            for (let i = 0; i < this.panels.length; i++) {
                //기존에 on으로 활성화 되어있던 패널만 찾아서 on, mask클래스 제거
                if (this.panels[i].classList.contains("on")) {
                    this.panels[i].classList.remove("on");
                    this.panels[i].classList.remove("mask");
                }
            }

            //클릭한 순번인 패널만 lower클래스를 지우고 on클래스를 붙여서 화면 제일 최상단에 배치
            this.panels[index].classList.remove("lower");
            this.panels[index].classList.add("on");

            setTimeout(()=>{
                this.enableClick = true;
            },1300) //텍스트 모션이 끝나는 순간
        }, 1400) //마스크 모션이 끝나는 순간
    }
}


