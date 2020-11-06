export class Point{
    constructor(index, x, y){
        this.x=x;
        this.y=y;
        // Y의 좌표값을 아래위로 이동시키고 각 좌표를 하나의 선으로 연결
        this.fixedY = y;
        this.speed = 0.1;
        // 현재 포인트가 몇 번째 포인트인지 정의
        this.cur = index;
        // 얼만큼 움직일 것인가에 대한 MAX값
        this.max = Math.random()*100+150;
    }

    // update 함수를 실행함녀 아래위로 움직임
    update(){
        // 현재값을 speed만큼 증가
        this.cur += this.speed;
        // 사인 함수를 사용해서 아래위로 움직일 수 있도록 만듦
        this.y = this.fixedY+(Math.sin(this.cur)*this.max);
    }
}