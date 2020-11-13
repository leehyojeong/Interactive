// 거리 계산 함수
export function distance(x1, y1, x2, y2) {
    const x = x2 - x1;
    const y = y2 - y1;
    return Math.sqrt(x*x + y*y);
}

// 어떤? 거리가 반지름? 보다 작은 경우에만 true 반환
export function pointCircle(px, py, cx, cy, r){
    if(distance(px, py, cx, cy)<=r){
        return true;
    }else{
        return false;
    }
}

// px, py는 마우스 포인터 위치?
// (x1, y1)과 (x2, y2)는 각 선을 이루는 양 끝 좌표
export function linePoint(x1, y1, x2, y2, px, py){
    const dist1 = distance(px, py, x1, y1);
    const dist2 = distance(px, py, x2, y2);
    const dist = dist1+dist2;
    const lineLength = distance(x1, y1, x2, y2);
    const buffer = 0.1;

    if(dist >= lineLength - buffer && dist <= lineLength + buffer){
        return true;
    }else{
        return false;
    }
}

export function lineCircle(x1, y1, x2, y2, cx, cy, r){
    const lineLength = distance(x1, y1, x2, y2);

    const point = (((cx - x1) * (x2 - x1)) + 
    ((cy - y1) * (y2 - y1))) / Math.pow(lineLength, 2);

    const px = x1 + (point * (x2 - x1));
    const py = y1 + (point * (y2 - y1));

    const onSegment = linePoint(x1, y1, x2, y2, px, py);
    if(!onSegment){
        return false;
    }

    if(distance(px, py, cx, cy) < r){
        return true;
    }else{
        return false;
    }
}