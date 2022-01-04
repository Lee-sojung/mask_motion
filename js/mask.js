class Mask {

    constructor(opt) {
        const defaults = {
            frame: ".wrap",
            btns: "#btns li",
            panels: "section div",
            loading: "aside",
            class_names: { on: "active", lower: "lower", mask: "mask" }
        }

        const result = { ...defaults, ...opt };

        //처음 인스턴스 생성시 createDOM함수 실행
        this.createDOM(result);
    }

    //동적으로 DOM생성함수 정의
    async createDOM(result) {
        const section = document.querySelector("section");

        await fetch("js/data.json")
            .then(data => {
                return data.json();
            })
            .then(json => {
                const items = json.data;
                let tags = "";

                items.forEach((item, index) => {
                    tags += `
                        <article class="mask">
                            <video src=${item.src} autoplay muted loop></video>
                            <div class="slogan">
                                <h2>
                                    <div class="inner">${item.tit}</div>
                                </h2><br>
                                <div class="p1">
                                    <div class="inner">${item.p1}</div>
                                </div><br>

                                <div class="p2">
                                    <div class="inner">${item.p2}</div>
                                </div>

                            </div>
                        </article>
                        `;
                })

                section.innerHTML = tags;
                const item1 = document.querySelector("article");
                item1.classList.add("on");
            });

        this.init(result);

        this.bindingEvent();
    }

    //DOM초기화 및 비디오 소스 로딩 처리함수 정의
    init(result) {
        this.wrap = document.querySelector(result.frame);
        this.btns = this.wrap.querySelectorAll(result.btns);
        this.panels = this.wrap.querySelectorAll(result.panels);
        this.loading = document.querySelector(result.loading);
        this.vids = this.wrap.querySelectorAll("video");
        this.isOn = null;
        this.enableClick = true;
        this.class_names = result.class_names;
        this.count = 0;


        //모든 영상을 반복을 돌면서
        this.vids.forEach((vid, index)=>{

            //각각의 영상들이 로딩완료가 되면
            vid.addEventListener("loadeddata", ()=>{
                //카운트 값을 1씩 증가시켜
                this.count++;

                //해당 카운트값이 전체 비디오 갯수와 동일해지면 안쪽 코드 실행
                if(this.count == this.vids.length){

                    //모든 영상이 로딩완료 되고나서 마스크 이미지가 캐싱될 시간을 1초 벌어준뒤
                    setTimeout(()=>{
                        //모든 패널의 mask클래스 제거하고
                        for(let panels of this.panels)panels.classList.remove(this.class_names.mask);

                        //로딩패널을 숨김처리
                        this.loading.style.display="none";
                    }, 1000);
                } 
            })
        })



        for (let panels of this.panels) {
            panels.classList.remove(this.class_names.mask);
        }
    }

    //이벤트 바인딩 함수 정의
    bindingEvent() {
        this.btns.forEach((btn, index) => {
            btn.addEventListener("click", e => {
                this.isOn = e.currentTarget.classList.contains(this.class_names.on);
                if (this.isOn) return;

                if (this.enableClick) {
                    this.enableClick = false;
                    this.activation(index);
                }
            })
        })
    }

    //활성화 함수 정의
    activation(index) {
        //버튼 클릭시 처음부터 영상재생
        this.vids[index].load();
        this.vids[index].play();
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

            setTimeout(() => {
                this.enableClick = true;
            }, 1300) //텍스트 모션이 끝나는 순간
        }, 1400) //마스크 모션이 끝나는 순간
    }
}


