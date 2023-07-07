// Scale is distance between grid points
// This will later determine size of objects placed on grid
let grid_scale = 40;
let grid_line_thickness = 1;
let grid_offset = { x: 0, y: 0 };

let grid_color = '#D0D0D0';
let background_color = '#808080';

let nodes = [];
let node_name_count = 0;

let stage = new Konva.Stage({
	container: 'container', // id of container <div>
	width: 1200,
	height: 600,
});

// Background Layer: Draws the static gray background of application, bottom most layer
let background_layer = new Konva.Layer();
stage.add(background_layer);
let background_rect = new Konva.Rect({
	x: 0,
	y: 0,
	width: stage.width(),
	height: stage.height(),
	fill: background_color,
});
background_layer.add(background_rect);
background_layer.draw();

// Grid Layer: Where the lines that form the grid are drawn, above background_layer
let grid_layer = new Konva.Layer();
stage.add(grid_layer);

// Node Layer: Where all the graph nodes will be drawn to,
// above the grid_layer
let node_layer = new Konva.Layer();
stage.add(node_layer);

// Movement Layer: Needed for drag and drop operations, above node_layer
let movement_layer = new Konva.Layer();
stage.add(movement_layer);

let createNode = () => {
	let circle = new Konva.Circle({
		grid_x: 0,
		grid_y: 0,
		x: stage.width() / 2,
		y: stage.height() / 2,
		radius: grid_scale / 2,
		fill: 'red',
		stroke: 'black',
		strokeWidth: 1,
		draggable: true,
		name: 'node' + node_name_count,
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

	circle.on('mousedown', function () {
		circle.fill('green');
		circle.moveTo(movement_layer);
	});

	circle.on('mouseup', function () {
		circle.fill('blue');
		circle.moveTo(node_layer);
		grid_coords = snap_to_grid_coord(circle.x(), circle.y());
		circle.x(grid_coords[0]);
		circle.y(grid_coords[1]);
	});
};

createNode();
createNode();

node_layer.draw();

// -------- Grid Logic --------

let snap_to_grid_coord = (raw_x, raw_y) => {
	grid_x = Math.floor(raw_x / grid_scale);
	if (raw_x % grid_scale >= Math.floor(grid_scale / 2)) grid_x++;
	grid_y = Math.floor(raw_y / grid_scale);
	if (raw_y % grid_scale >= Math.floor(grid_scale / 2)) grid_y++;
	new_x = grid_x * grid_scale + grid_offset.x;
	new_y = grid_y * grid_scale + grid_offset.y;
	return [new_x, new_y];
};

let draw_grid = () => {
	// Add 1 to grid_width to account for left and right side of screen
	let num_horiz_lines = stage.width() / grid_scale;
	for (let i = 0; i <= num_horiz_lines; i++) {
		x_coord = i * grid_scale + grid_offset.x;
		draw_line(x_coord, 0, x_coord, stage.height(), grid_color, grid_line_thickness);
	}

	// Add 1 to grid_height to account for top and bottom of screen
	let num_vert_lines = stage.height() / grid_scale;
	for (let i = 0; i <= num_vert_lines; i++) {
		y_coord = i * grid_scale + grid_offset.y;
		draw_line(0, y_coord, stage.width(), y_coord, grid_color, grid_line_thickness);
	}

	grid_layer.draw();
};

let draw_line = (x1, y1, x2, y2, color, thickness) => {
	let line = new Konva.Line({
		points: [x1, y1, x2, y2],
		stroke: color,
		strokeWidth: thickness,
	});

	grid_layer.add(line);
};

// console.log(stage)

// let canvas_height = canvas.height;
// let canvas_width = canvas.width;

// canvas.style.backgroundColor = '#808080';

draw_grid();
