let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Scale is distance between grid points
// This will later determine size of objects placed on grid
let scale = 50;

// Dimensions of grid, eventually to be set by user and dyamically update
let grid_height = 6;
let grid_width = 8;
let grid_line_thickness = 1;
let grid_color = '#D0D0D0'

canvas.height = grid_height*scale;
canvas.width = grid_width*scale;

let canvas_height = canvas.height;
let canvas_width = canvas.width;

canvas.style.backgroundColor = '#808080';

let draw_grid = () => {
    // Add 1 to grid_width to account for left and right side of screen
    let horizontal_gap = (canvas_width / grid_width) 
    for(let i = 0; i < grid_width + 1; i++) {
        x_coord = i * horizontal_gap;
        draw_line(x_coord, 0, x_coord, canvas_height, grid_color, grid_line_thickness);
    }

    // Add 1 to grid_height to account for top and bottom of screen
    let vertical_gap = (canvas_height / grid_height) 
    for(let i = 0; i < grid_height + 1; i++) {
        y_coord = i * vertical_gap;
        draw_line(0, y_coord, canvas_width, y_coord, grid_color, grid_line_thickness);
    }
}

let draw_line = (x1, y1, x2, y2, color, thickness) => {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.stroke();
}

draw_grid()