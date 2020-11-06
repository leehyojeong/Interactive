import { Point } from "./point";

export class Wave{
    constructor(){

    }

    // 애니메이션을 만들 때 가장 중요한 것
    // 그리고자 하는 애니메이션의 좌표값을 갖고 오는 것
    resize(stageWidth, stageHeight){
        // 좌표값을 갖고 오기 위해 스테이지의 넓이, 높이가 중요
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth/2;
        this.centerY = stageHeight/2;

        this.init();
    }

    // 위에서 resize 이벤트가 일어난 후
    // init 함수로 Point 생성
    init(){
        // 센터 좌표를 넘겨줌으로써 화면 가운데에 그려질 수 있도록 정의
        this.point = new Point(this.centerX, this.centerY);
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle="#ff0000";

        // 웨이브 그리기 전 포인트 확인
        // 포인트 업데이트
        this.point.update();
        // 업데이트된 point의 x, y를 가져온 후 확인
        // arc() : 호, 원을 그리기 위한 함수
        // arc(x, y, radius, startAnle, endAngle, anticlockwise);
        ctx.arc(this.point.x, this.point.y, 30, 0, 2*Math.PI);
        ctx.fill();
    }
}