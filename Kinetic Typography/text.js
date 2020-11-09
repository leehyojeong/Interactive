export class Text{
    constructor(){
        this.canvas = document.createElement('canvas');
        // this.canvas.style.position = 'absolute';
        // this.canvas.style.left = '0';
        // this.canvas.style.top = '0';
        // document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
    }

    setText(str, density, stageWidth, stageHeight){
        this.canvas.width = stageWidth;
        this.canvas.height = stageHeight;

        const myText = str;
        const fontWidth = 700;
        const fontSize = 800;
        const fontName = 'Hind';

        this.ctx.clearRect(0,0,stageWidth, stageHeight);
        this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
        this.ctx.fillStyle = `rgba(0,0,0,0.3)`;
        this.ctx.textBaseline = `middle`;

        // 지정된 글꼴을 사용하여 그릴 때 지정 텍스트 측정
        const fontPos = this.ctx.measureText(myText);
        // 텍스트 출력 캔버스 함수
        // 객체.fillText("텍스트", X좌표, Y좌표);
        this.ctx.fillText(
            myText,
            (stageWidth - fontPos.width)/2,
            fontPos.actualBoundingBoxAscent+
            fontPos.actualBoundingBoxDescent + 
            ((stageHeight - fontSize) / 2)
        );

        return this.dotPos(density, stageWidth, stageHeight);
    }

    dotPos(density, stageWidth, stageHeight){
        // 좌표, 너비, 높이를 주면 해당 영역의 이미지 정보를 가지는 ImageData 객체 리턴
        const imageData = this.ctx.getImageData(
            0,0,
            stageWidth, stageHeight
        ).data;

        const particles = [];
        let i = 0;
        let width = 0;
        let pixel;

        for(let height = 0; height < stageHeight; height += density){
            ++i;
            const slide = (i%2)==0;
            width = 0;
            if(slide==1){
                width += 6;
            }

            for (width; width < stageWidth; width += density){
                pixel = imageData[((width+(height * stageWidth)) * 4) - 1];
                if(pixel != 0 &&
                    width > 0 &&
                    width < stageWidth &&
                    height > 0 &&
                    height < stageHeight) {
                        particles.push({
                            x: width, 
                            y: height
                        });
                    }
            }
        }
        
        return particles;
    }
}