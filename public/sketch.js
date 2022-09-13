function setup() {

  createCanvas(1000, 1000);
  let n = randfx(1,5) // number of rows/shapes
  let p = randfx(1,10) // palette number
  var pal
  var r0; var g0; var b0
  var r1; var g1; var b1
  if (p <= 2) { // choose palette
    r0 = 0; g0 = 0; b0 = 0
    r1 = 255; g1 = 255; b1 = 255
    pal = "black/white"
  } else if (p > 2 && p <=4) {
    r0 = 222; g0 = 222; b0 = 222
    r1 = 200; g1 = 50; b1 = 50
    pal = "stone/red"
  } else if (p > 4 && p <=6) {
    r0 = 150; g0 = 200; b0 = 150
    r1 = 10; g1 = 100; b1 = 25
    pal = "lightgreen/darkgreen"
  } else if (p > 6 && p <=8) {
    r0 = 100; g0 = 0; b0 = 0
    r1 = 175; g1 = 175; b1 = 50
    pal = "darkred/gold"
  } else {
    r0 = 0; g0 = 0; b0 = 50
    r1 = 100; g1 = 150; b1 = 200
    pal = "darkblue/lightblue"
  }

  background(r0,g0,b0)

  var yarray=[0] // vertical location of rows
  var oarray=[0] // vertical offset of shapes
  for (let i=1;i<=n;i+=1) {
    yarray[i] = randfx(167,833)
    oarray[i] = randfx(1,200)
  }

  stroke(r1,g1,b1) // draw scratches
  for (let i=1;i<=n;i+=1) { 
    scratch(yarray[i],randfx(5,10),randfx(1,100),oarray[i])
  }

  fill(r0,g0,b0) // frame
  noStroke()
  rect(0,0,1000,50)
  rect(0,0,50,1000)
  rect(1000,0,-50,1000)
  rect(0,1000,1000,-50)

  stroke(r1,g1,b1) // border
  sketchline(50,50,950,50)
  sketchline(950,50,950,950)
  sketchline(50,50,50,950)
  sketchline(50,950,950,950)

  noStroke() // draw shapes
  if (p <= 2) {
    blendMode(DIFFERENCE)
  } else {
    blendMode(HARD_LIGHT)
  }
  fill(r1,g1,b1)
  for (let i=1;i<=n;i+=1) { 
    shapes(yarray[i],oarray[i])
  }

  for (let i = 0; i < 50000; i++) { // add noise
    const x = random(1) * width
    const x2 = x + randfx(-5,5)
    const y = random(1) * height
    const y2 = y + randfx(-5,5)
    stroke(randfx(0,20))
    strokeWeight(randfx(1,150)/100)
    if (p <= 2) { // noise blend modes
      blendMode(EXCLUSION)
    } else if (p > 2 && p <=4) {
      blendMode(EXCLUSION)
    } else if (p > 4 && p <=6) {
      blendMode(EXCLUSION)
    } else if (p > 6 && p <=8) {
      blendMode(ADD)
    } else {
      blendMode(ADD)
    }
    line(x,y,x2,y2);
  }
  
  noLoop();

  window.$fxhashFeatures = { // fxhash features
    "scratch instances": n,
    "palette colors": pal
  }

}

// draw scratches 
function scratch(y,x1,x2,o) { // ylocation,xdensity,xvariance,yoffset
  let i = 0
  var xarr=[0]
  var yarr=[y]
  const l = 1000
  for (let x=0; x<l; x+=fxrand()*x1) { 
    xarr[i+1] = x + fxrand() * x2
    yarr[i+1] = y + random(-o,o)
    sketchline(xarr[i],yarr[i],xarr[i+1],yarr[i+1])
    i+=1
  }
}

// draw shapes
function shapes(y,o) { // ylocation,yoffset
  let shapexloc = randfx(100,900)
  let shapesize = randfx(25,100)
  let shapeyvar = randfx(-o,o)
  circle(shapexloc,y+shapeyvar,shapesize)
}

// fxrand integration
function randfx(min, max) { 
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(fxrand() * (max - min + 1) + min)
}

// orr kislev's sketchy lines codes
function sketchline(x1,y1,x2,y2) {
  const l = dist(x1,y1,x2,y2)
  for (let i=0; i<l; i+=0.5) {
      const x = lerp(x1,x2,i/l)
      const y = lerp(y1,y2,i/l)
      sketchpoint(x,y)
  }
}
let n_val = 0
let n_val_change = 0.05
function sketchpoint(x,y) {
  n_val += n_val_change
  const val = noise(n_val)
  if (val < 0.4) return
  strokeWeight(3*val)
  point(x,y)
}