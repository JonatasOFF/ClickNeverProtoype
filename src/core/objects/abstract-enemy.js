import { ObjectAbstract } from "./abstract-object"
import { distance } from "../../js/utils"
export class AbstractEnemy extends ObjectAbstract {

  constructor(radius, color, ...props) {
    super(...props)
    this.radius = radius
    this.color = color
    this.dy = 1
    this.height = radius
    this.width = radius;
  }

  draw() {
    this.c.beginPath()
    this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    this.c.fillStyle = this.color
    this.c.fill()
    this.c.closePath()
  }

  update() {
    this.draw()
  }


  onClick(x, y) {
    const xAbsolute = this.x - x + 4
    const yAbsolute = this.y - y + 76
    
    if ((xAbsolute >= (-this.width) && xAbsolute <= 0) && (yAbsolute >= (-this.height) && yAbsolute <= 0)) {
      return true
    }

    return false

  }
}
