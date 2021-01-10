function generateMatrix(w, h) {
    let matrix = [];
    for(let i = 0; i < h; i++) {
        matrix.push([]);
        for(let j = 0; j < w; j++) {
            matrix[i].push(0);
        }
    }
    return matrix;
}

let arena = generateMatrix(maxX, maxY);

function areanShow() {
    for(let y = 0; y < arena.length; y++) {
        for(let x = 0; x < arena[y].length; x++) {
            if(arena[y][x] == 'skyblue') {
                context.fillStyle = 'skyblue';
                context.fillRect(x * 20, y * 20, 20, 20);
            } else if(arena[y][x] == 'blue') {
                context.fillStyle = 'blue';
                context.fillRect(x * 20, y * 20, 20, 20);
            } else if(arena[y][x] == 'orange') {
                context.fillStyle = 'orange';
                context.fillRect(x * 20, y * 20, 20, 20);
            } else if(arena[y][x] == 'yellow') {
                context.fillStyle = 'yellow';
               context.fillRect(x * 20, y * 20, 20, 20);
            } else if(arena[y][x] == 'green') {
                context.fillStyle = 'green';
                context.fillRect(x * 20, y * 20, 20, 20);
            } else if(arena[y][x] == 'purple') {
                context.fillStyle = 'purple';
                context.fillRect(x * 20, y * 20, 20, 20);
            } else if(arena[y][x] == 'red') {
                context.fillStyle = 'red';
                context.fillRect(x * 20, y * 20, 20, 20);
            }
        }
    }
};