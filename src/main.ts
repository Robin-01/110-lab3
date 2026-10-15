import Konva from 'konva';


// Constants for the animation (scale, drag, wiggle)
const BASE_SCALE = 1;
const PRESSED_SCALE = 1.1;
const BASE_ROTATION = -15;

// first we need to create a stage
const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

// then create layer
const layer = new Konva.Layer();

const lemon = new Konva.Line({
    x: stage.width() / 2,
    y: stage.height() / 2,
    rotation: -15,
    points: [
        // top edge, left to right
        -115, -5,     // pedicel tip (left, blunt)
        -100, -9,    // pedicel neck
        -85, -32,    // left shoulder
        -45, -53,
        10, -60,      // top
        45, -53,
        85, -32,     // right shoulder
        102, -8,     // style neck
        116, 0,      // style tip (right, slightly pointier)
        
        // bottom edge, right to left
        102, 8,
        85, 32,
        45, 53,
        0, 60,       // bottom
        -45, 53,
        -85, 32,
        -100, 9,
    ],
    closed: true,
    tension: 0.4,
    fill: 'yellow',
    stroke: 'black',
    draggable: true,
    strokeWidth: 4,
});
layer.add(lemon);
stage.add(layer);


//Animation 
// Pointer cursor on hover
lemon.on('mouseover', () => {
    stage.container().style.cursor = 'pointer';
});
lemon.on('mouseout', () => {
    stage.container().style.cursor = 'default';
});

// Grow and wiggle while pressed
const wiggle = new Konva.Animation((frame) => {
    if (!frame) return;
    lemon.rotation(BASE_ROTATION + 6 * Math.sin((frame.time * 2 * Math.PI * 4) / 1000));
}, layer);

function press() {
    lemon.to({
        scaleX: PRESSED_SCALE,
        scaleY: PRESSED_SCALE,
        duration: 0.1,
        easing: Konva.Easings.EaseOut,
    });
    wiggle.start();
}

function release() {
    wiggle.stop();
    lemon.to({
        scaleX: BASE_SCALE,
        scaleY: BASE_SCALE,
        rotation: BASE_ROTATION, // settle back to the original tilt
        duration: 0.2,
        easing: Konva.Easings.ElasticEaseOut,
    });
}

lemon.on('mousedown touchstart', press);
lemon.on('mouseup touchend dragend', release);