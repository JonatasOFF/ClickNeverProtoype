export class ObjectAbstract {
    /**
     * 
     * @param {context} context 
     * @param {x} x 
     * @param {y} y 
     * @param {height} height 
     * @param {width} width 
     */
    constructor(context, x, y, height, width) {
        this.c = context
        this.x = x
        this.y = y
        this.height = height;
        this.width = width
    }
}