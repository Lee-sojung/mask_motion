class Mask {

    constructor(opt) {
        const defaults= {
            frame: ".wrap",
            btns: "#btns li",
            panels: "section div",
            class_names: {on: "active", lower:"lower", mask:"mask"}
        }

        const result = {...defaults, ...opt};

        this.init(result);
        this.bindingEvent();
    }

    init(result) {
        this.wrap = document.querySelector(result.frame);
        this.btns = this.wrap.querySelectorAll(result.btns);
        this.panels = this.wrap.querySelectorAll(result.panels);
        this.isOn = null;
        this.enableClick = true;
        this.class_names = result.class_names;

        for(let panels of this.panels){
            panels.classList.remove(this.class_names.mask);
        }
    }

    bindingEvent() {
        this.btns.forEach((btn, index) => {
            btn.addEventListener("click", e => {
                this.isOn = e.currentTarget.classList.contains(this.class_names.on);
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
            this.btns[i].classList.remove(this.class_names.on);

            //기존활성화 되어있는 패널에만 mask클래스를 붙여서 모션 시작
            if (this.panels[i].classList.contains(this.class_names.on)) {
                this.panels[i].classList.add(this.class_names.mask);
            }
        }

        //현재 클릭한 순번에 해당하는 버튼만 활성화
        this.btns[index].classList.add(this.class_names.on);

        //현재 클릭한 순번에 해당하는 패널에 lower를 붙여서 바로 아래쪽에 위치시킴
        this.panels[index].classList.add(this.class_names.lower);

        setTimeout(() => {
            for (let i = 0; i < this.panels.length; i++) {
                //기존에 on으로 활성화 되어있던 패널만 찾아서 on, mask클래스 제거
                if (this.panels[i].classList.contains(this.class_names.on)) {
                    this.panels[i].classList.remove(this.class_names.on);
                    this.panels[i].classList.remove(this.class_names.mask);
                }
            }

            //클릭한 순번인 패널만 lower클래스를 지우고 on클래스를 붙여서 화면 제일 최상단에 배치
            this.panels[index].classList.remove(this.class_names.lower);
            this.panels[index].classList.add(this.class_names.on);

            setTimeout(()=>{
                this.enableClick = true;
            },1300) //텍스트 모션이 끝나는 순간
        }, 1400) //마스크 모션이 끝나는 순간
    }
}


