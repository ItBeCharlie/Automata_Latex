// Scale is distance between grid points
// This will later determine size of objects placed on grid
let scale = 50;

// Dimensions of grid, eventually to be set by user and dyamically update
let grid_height = 6;
let grid_width = 8;
let grid_line_thickness = 1;
let grid_color = '#D0D0D0'

let background_color = "#808080"

let nodes = [];
let node_name_count = 0;

let stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: grid_width*scale,
    height: grid_height*scale
});

// Draw background of canvas
let background_layer = new Konva.Layer();
stage.add(background_layer);
let background_rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: background_color,
})
background_layer.add(background_rect);
background_layer.draw();

let node_layer = new Konva.Layer();
let movement_layer = new Konva.Layer();

stage.add(node_layer);
stage.add(movement_layer);

let createNode = () => {
    let circle = new Konva.Circle({
        x: stage.width() / 2,
        y: stage.height() / 2,
        radius: 50,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 1,
        draggable: true,
        name: "node" + node_name_count,
    });
    node_layer.add(circle);
    nodes.push(circle);
    node_name_count++;



    // add cursor styling
    circle.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    circle.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });


    circle.on('mousedown', function() {
        circle.fill('green');
        circle.moveTo(movement_layer);
    })

    circle.on('mouseup', function() {
        circle.fill('blue');
        circle.moveTo(node_layer);

    })
}

createNode();
createNode();

node_layer.draw();

// console.log(stage)











// let canvas_height = canvas.height;
// let canvas_width = canvas.width;

// canvas.style.backgroundColor = '#808080';

// let draw_grid = () => {
//     // Add 1 to grid_width to account for left and right side of screen
//     let horizontal_gap = (canvas_width / grid_width) 
//     for(let i = 0; i < grid_width + 1; i++) {
//         x_coord = i * horizontal_gap;
//         draw_line(x_coord, 0, x_coord, canvas_height, grid_color, grid_line_thickness);
//     }

//     // Add 1 to grid_height to account for top and bottom of screen
//     let vertical_gap = (canvas_height / grid_height) 
//     for(let i = 0; i < grid_height + 1; i++) {
//         y_coord = i * vertical_gap;
//         draw_line(0, y_coord, canvas_width, y_coord, grid_color, grid_line_thickness);
//     }
// }

// let draw_line = (x1, y1, x2, y2, color, thickness) => {
//     ctx.beginPath();
//     ctx.moveTo(x1,y1);
//     ctx.lineTo(x2,y2);
//     ctx.strokeStyle = color;
//     ctx.lineWidth = thickness;
//     ctx.stroke();
// }

// draw_grid()