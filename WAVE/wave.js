import { Point } from "./point.js";

export class Wave{
    constructor(index, totalPoints, color){
        this.index=index;
        this.totalPoints=totalPoints;
        this.color=color;
        this.points = [];
    }

    // 애니메이션을 만들 때 가장 중요한 것
    // 그리고자 하는 애니메이션의 좌표값을 갖고 오는 것
    resize(stageWidth, stageHeight){
        // 좌표값을 갖고 오기 위해 스테이지의 넓이, 높이가 중요
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth/2;
        this.centerY = stageHeight/2;

        // totalPoints를 넘겨줘서 몇 개의 포인트를 생성할 것인지 지정
        // 각 포인트의 간격 정의
        this.pointGap = this.stageWidth / (this.totalPoints - 1);

        this.init();
    }

    // 위에서 resize 이벤트가 일어난 후
    // init 함수로 Point 생성
    init(){
        // 센터 좌표를 넘겨줌으로써 화면 가운데에 그려질 수 있도록 정의
        // this.point = new Point(this.centerX, this.centerY);

        this.points = [];
        for(let i = 0; i<this.totalPoints; i++){
            const point = new Point(
                this.index+i,
                this.pointGap*i,
                this.centerY,
            );
            this.points[i] = point;
        }
    }

    draw(ctx){
        // *** 점 1개만 그릴 때의 draw 함수 ***
        // ctx.beginPath();
        // ctx.fillStyle="#ff0000";

        // // 웨이브 그리기 전 포인트 확인
        // // 포인트 업데이트
        // this.point.update();
        // // 업데이트된 point의 x, y를 가져온 후 확인
        // // arc() : 호, 원을 그리기 위한 함수
        // // arc(x, y, radius, startAnle, endAngle, anticlockwise);
        // ctx.arc(this.point.x, this.point.y, 30, 0, 2*Math.PI);
        // ctx.fill();

        // *** WAVE를 그릴 때의 draw 함수 ***
        ctx.beginPath();
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX,prevY);

        // 시작과 끝 점은 움직이지 않음
        for(let i = 1; i<this.totalPoints; i++){
            if(i<this.totalPoints-1){
                this.points[i].update();
            }
            
            const cx = (prevX+this.points[i].x)/2;
            const cy = (prevY+this.points[i].y)/2;

            // 직선
            // ctx.lineTo(cx,cy);

            // 웨이브 형태
            ctx.quadraticCurveTo(prevX, prevY, cx,cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }
        
        // 곡선으로 나타내기 위해 라인의 중간값 사용
        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        // 이전값과 현재값의 중간값을 곡선의 중간 포인트로 잡음
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.closePath();
    }
}