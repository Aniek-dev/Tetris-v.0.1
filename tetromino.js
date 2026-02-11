class Position{
    constructor(row,column){
    this.row = row;
    this.column = column;
 }
}
class Tetromino{
    constructor(canvas,cellSize,shapes = [], initPosition = new Position,id=1){
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.cellSize = cellSize;
      this.shapes = shapes;
      this.rotation = 0;
      this.initPosition = initPosition;
      this.position =  new Position(this.initPosition.row, this.initPosition.column);
      this.id = id;
      
     

    }
    drawSquare(x,y,size,color){
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x,y,size,size);
    }
    drawTriangle(x1,y1,x2,y2,x3,y3,color){
      this.ctx.beginPath();
      this.ctx.moveTo(x1,y1);
      this.ctx.lineTo(x2,y2);
      this.ctx.lineTo(x3,y3);
      this.ctx.fillStyle = color;
      this.ctx.fill();
    }
    getColorPalette(id){
      const palette = {
           1:{
              rightTriangle : "#800020",
              leftTriangle : "#FFFFFF",
              square : "#E0115F",
            },
            2:{
              rightTriangle : "#7F4100",
              leftTriangle : "#FFFFFF",
              square : "#FF8C00",
            },
            3:{
              rightTriangle : "#B8860B",
              leftTriangle : "#FFFFFF",
              square : "#FFD700",
            },
            4:{
              rightTriangle : "#004D00",
              leftTriangle : "#FFFFFF",
              square : "#32CD32",
            },
            5:{
              rightTriangle : "#000080",
              leftTriangle : "#FFFFFF",
              square : "#4169E1",
            },
            6:{
              rightTriangle : "#4B0082",
              leftTriangle : "#FFFFFF",
              square : "#9932CC",
            },
            7:{
              rightTriangle :"#008B8B",
              leftTriangle : "#FFFFFF",
              square : "#00FFFF",
            }

      }
      return palette [id] || palette[1]
    }
    drawBlock(x,y,id){
      const margin = this.cellSize / 8;
      const palette = this.getColorPalette(id);
       
      this.drawTriangle(
        x,y,
        x+this.cellSize,y,
        x,y+this.cellSize,
        palette.leftTriangle
      );

      this.drawTriangle(
        x+this.cellSize,y,
        x+this.cellSize, y+this.cellSize,
        x, y+this.cellSize,
        palette.rightTriangle
      );

      this.drawSquare(
        x+margin,
        y+margin,
        this.cellSize - (margin*2),
        palette.square
      );

    }
    currentShape(){
      return this.shapes[this.rotation];

    }
    draw(grid){
       const shape = this.currentShape();
       for(let i = 0; i<shape.length; i++){
          const position = grid.getCoordinates(
             this.position.column + shape[i].column,
             this.position.row + shape[i].row
          );
          this.drawBlock(position.x,position.y,this.id);
       }
    }
    currentPositions(){
      const Positions = [];
      const shape = this.currentShape();
      for(let i=0; i<shape.length; i++){
        Positions.push(new Position(
          this.position.row + shape[i].row,
           this.position.column + shape[i].column
        ));
      }
      return Positions;
    }
    move(row,column){
      this.position.row += row;
      this.position.column += column;
    }
    reset(){
       this.rotation = 0;
       this.position = new Position(this.initPosition.row,this.initPosition.column);
    }
}

const TetrominoTypes = {
  T:{
    id:1,
    initPosition: new Position(0,3),
    shapes:[
      [new Position(0,1),new Position(1,0),new Position(1,1),new Position(1,2)],
      [new Position(0,1),new Position(1,1),new Position(1,2),new Position(2,1)],
      [new Position(1,0),new Position(1,1),new Position(1,2),new Position(2,1)],
      [new Position(0,1),new Position(1,0),new Position(1,1),new Position(2,1)],
    ]
  },
  O:{
id:2,
    initPosition: new Position(0,4),
    shapes:[
      [new Position(0,0),new Position(0,1),new Position(1,0),new Position(1,1)],
    ]
  },
I:{
id:3,
    initPosition: new Position(-1,3),
    shapes:[
      [new Position(1,0),new Position(1,1),new Position(1,2),new Position(1,3)],
      [new Position(0,2),new Position(1,2),new Position(2,2),new Position(3,2)],
      [new Position(2,0),new Position(2,1),new Position(2,2),new Position(2,3)],
      [new Position(0,1),new Position(1,1),new Position(2,1),new Position(3,1)],
    ]
  },
S:{
id:4,
    initPosition: new Position(0,3),
    shapes:[
      [new Position(0,1),new Position(0,2),new Position(1,0),new Position(1,1)],
      [new Position(0,1),new Position(1,1),new Position(1,2),new Position(2,2)],
      [new Position(1,1),new Position(1,2),new Position(2,0),new Position(2,1)],
      [new Position(0,0),new Position(1,0),new Position(1,1),new Position(2,1)],
    ]
  },
Z:{
id:5,
    initPosition: new Position(0,3),
    shapes:[
      [new Position(0,0),new Position(0,1),new Position(1,1),new Position(1,2)],
      [new Position(0,2),new Position(1,1),new Position(1,2),new Position(2,1)],
      [new Position(1,0),new Position(1,1),new Position(2,1),new Position(2,2)],
      [new Position(0,1),new Position(1,0),new Position(1,1),new Position(2,0)],
    ]
  },
J:{
id:6,
    initPosition: new Position(0,3),
    shapes:[
      [new Position(0,0),new Position(1,0),new Position(1,1),new Position(1,2)],
      [new Position(0,1),new Position(0,2),new Position(1,1),new Position(2,1)],
      [new Position(1,0),new Position(1,1),new Position(1,2),new Position(2,2)],
      [new Position(0,1),new Position(1,1),new Position(2,0),new Position(2,1)],
    ]
  },
L:{
id:7,
    initPosition: new Position(0,3),
    shapes:[
      [new Position(0,2),new Position(1,0),new Position(1,1),new Position(1,2)],
      [new Position(0,1),new Position(1,1),new Position(2,1),new Position(2,2)],
      [new Position(1,0),new Position(1,1),new Position(1,2),new Position(2,0)],
      [new Position(0,0),new Position(0,1),new Position(1,1),new Position(2,1)],
    ]
  },


  
};

class TetrominosBag{
  constructor(canvas,cellSize){
      this.canvas = canvas;
      this.cellSize = cellSize;
      this.bag = [];
      this.threeNextTetrominos = [];
      this.init ();
  }
  init(){
    for(let i=0; i<3; i++){
      this.threeNextTetrominos.push(this.getNextTetromino());
    }
  } 
  fillBag(){
    const tetrominosTypes = [
         TetrominoTypes.T,
         TetrominoTypes.O,
         TetrominoTypes.I,
         TetrominoTypes.S,
         TetrominoTypes.Z,
         TetrominoTypes.J,
         TetrominoTypes.L,    
    ]
    this.bag.length = 0;

   tetrominosTypes.forEach((type)=>{
     this.bag.push(new Tetromino(
        this.canvas,this.cellSize,type.shapes,type.initPosition,type.id
     ));
   });
    
    for(let i = this.bag.length -1; i>0 ; i--){
      let j = Math.floor(Math.random() * (i+1)) ;
      [this.bag[i],this.bag[j]] = [this.bag[j],this.bag[i]]
    }
  }
  getNextTetromino(){
 if(this.bag.length === 0 ){
       this.fillBag();
    }
    return this.bag.pop();

  }
  nextTetromino(){
    const next = this.threeNextTetrominos.shift();
    this.threeNextTetrominos.push(this.getNextTetromino());
    return next;
  }
  getThreeNextTetrominos (){
    return this.threeNextTetrominos;
  }
  reset(){
    this.bag = [];
    this.threeNextTetrominos = [];
    this.init();
  }
}

export {Position,Tetromino, TetrominoTypes, TetrominosBag}