import { Wave } from "./wave";

class App{
    constructor(){
        // 캔버스 생성
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        // wave 생성
        this.wave = new Wave();

        // resize 이벤트
        // 창크기 조정 시 이벤트 발생
        window.addEventListener('resize',this.resize.bind(this), false);
        this.resize();
        
        // requestAnimationFrame()으로 애니메이션 제작
        requestAnimationFrame(this.animate.bind(this));
    }

    // resize 이벤트
    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        // 캔버스를 더블 사이즈로 지정
        // 더블 사이즈는 레티나 디스플레이에서도 잘 보임
        this.canvas.width = this.stageWidth*2;
        this.canvas.height = this.stageHeight*2;
        this.ctx.scale(2,2);

        this.wave.resize(this.stageWidth, this.stageHeight);
    }

    animate(t){
        // 캔버스 클리어 
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
        
        this.wave.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }
}

// window 로드가 되면 app 생성
window.onload = () => {
    new App();
};