import { ObjectAbstract } from "./abstract-object";
import Img from '../../common/assets/cursor.png'
export class Clicker extends ObjectAbstract {
    constructor(...props) {
        super(...props)
        this.height = 25;
        this.width = 10;
        
    }

    draw() {
        const img = document.getElementById('cursorPNG')
        this.c.drawImage(img,
            80,
            80,
            260,
            250,
            this.x, // x
            this.y, // y
            24,
            24);
    }

    update(x, y) {
        this.x = x - 4;
        this.y = y -76;
        this.draw()
    }
}
