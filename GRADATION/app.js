import { GlowParticle } from "./glowparticle.js";

const COLORS = [
    {r: 45, g: 74, b: 227}, // blue
    {r: 250, g: 255, b: 89}, // yellow
    {r: 255, g: 104, b: 248}, // purple
    {r: 44, g: 209, b: 252}, // skyblue
    {r: 54, g: 233, b: 84}, // green
];

class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio > 1)?2:1;

        this.totalParticles = 15;
        this.particles = [];
        // 반지름의 크기를 늘림
        // 작을 때는 원이 돌아다니는 것을 눈으로 확인할 수 있음
        this.maxRadius = 900;
        this.minRadius = 400;

        window.addEventListener('resize',this.resize.bind(this),false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth*this.pixelRatio;
        this.canvas.height = this.stageHeight*this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        // 도형합성 방법을 지정하는 부분
        // saturation : 아래 레이어의 색상, 명도를 보존하고 위 레이어의 채도 적용
        this.ctx.globalCompositeOperation = 'saturation';

        this.createParticles();
    }

    createParticles(){
        let curColor = 0;
        this.particles = [];
    
        for(let i = 0; i < this.totalParticles; i++){
            const item = new GlowParticle(
                Math.random() * this.stageWidth,
                Math.random() * this.stageHeight,
                Math.random() * 
                    (this.maxRadius - this.minRadius) + this.minRadius,
                COLORS[curColor]
            );

            if(++curColor >= COLORS.length){
                curColor=0;
            }

            this.particles[i] = item;
        }
    }

    animate(){
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);

        for(let i = 0; i < this.totalParticles; i++){
            const item = this.particles[i];
            item.animate(this.ctx, this.stageWidth, this.stageHeight);
        }
    }
}

window.onload = () => {
    new App();
}