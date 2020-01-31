class MyBot extends Bot {
  constructor() {
    super()
  }

  init(id, name) {
    this.name = name
    this.id = id
    this.setColor(Bot.PINK)
  }
  
  start() {
    this.findCorner()
    this.rotateTo(270)
    this.fireLoop()
  }
  
  async onCrash(enemy) {
    // console.log('enemy', enemy);
    // const location = await this.getLocation()
    this.forward(100)
  }
  

  async fireLoop() {
    await this.triangulate()
    await this.reload()
    await this.fire()
    this.fireLoop()
  }

  async triangulate() {
    const field = await this.scan()
    const myLocation = await this.getLocation()
    const myRotation = await this.getRotation()
    const foundEm = field.bots.filter(bot => bot.id !== this.id && bot.alive === true)
    const target = foundEm[0]
    const {location:enemyLocation} = target
    let angle = this.angleBetweenTwoPoints(myLocation, enemyLocation)
    const relativeLocation = this.calculateRelativeLocation(myLocation, enemyLocation)
    switch (relativeLocation) {
      case 'bottomRight':
        angle = (angle + 90 - myRotation - 90)
        break
      case 'bottomLeft':
        angle = ((270 - angle) - myRotation - 90)
        break
      case 'topLeft':
        angle = (angle - 90 - myRotation - 90)
        break
      default:
        angle = ((90 - angle) - myRotation - 90)
    }
    this.rotateBarrelTo(angle)
  }

  angleBetweenTwoPoints(a, b) {
    const rise = Math.abs(b.y - a.y)
    const run = Math.abs(b.x - a.x)
    let angle = Math.atan(rise/run)
    if (run < 0) {
      angle += Math.PI
    }
    const degreeAngle = angle / Math.PI * 180
    return degreeAngle
  }

  calculateRelativeLocation(me, enemy) {
    const {x, y} = enemy
    const {x:mx, y:my} = me
    const xDist = x - mx
    const yDist = y - my
    if (xDist >= 0 && yDist >= 0) return 'bottomRight'
    if (xDist >= 0 && yDist < 0) return 'topRight'
    if (xDist < 0 && yDist < 0) return 'topLeft'
    if (xDist < 0 && yDist >= 0) return 'bottomLeft'
  }

  async findCorner() {
    const location = await this.getLocation()
    const rotation = await this.getRotation()
    const rounding = rotation%90;
    let newRotation = null
    let reverseAmount = null
    
    if (rounding <= (90/2)) { 
      newRotation = rotation-rounding
    } else {
      newRotation = rotation+90-rounding
    }
    console.log('location', location);
    console.log('newRotation', newRotation);

    switch(newRotation) {
      case 90: // FACING DOWN
        reverseAmount = location.y
        break;
      case 180: // FACING LEFT
        reverseAmount = 100 - location.x
        break;
      case 270: // FACING UP
        reverseAmount = 100 - location.y
        break;
      default: // FACING RIGHT
        reverseAmount = location.x
    }
    
    this.rotateTo(newRotation)
    this.reverse(reverseAmount)
  }
}