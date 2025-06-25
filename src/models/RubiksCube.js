export class RubiksCube {
  constructor() {
    this.reset();
  }

  reset() {
    this.faces = {
      U: Array(3).fill().map(() => Array(3).fill('w')), // white
      D: Array(3).fill().map(() => Array(3).fill('y')), // yellow
      F: Array(3).fill().map(() => Array(3).fill('g')), // green
      B: Array(3).fill().map(() => Array(3).fill('b')), // blue
      L: Array(3).fill().map(() => Array(3).fill('o')), // orange
      R: Array(3).fill().map(() => Array(3).fill('r'))  // red
    };
  }

  rotateFace(face, dir = 1) {
    const f = this.faces[face];
    
    // Rotate the face itself
    if (dir === 1) {
      this.faces[face] = [
        [f[2][0], f[1][0], f[0][0]],
        [f[2][1], f[1][1], f[0][1]],
        [f[2][2], f[1][2], f[0][2]]
      ];
    } else {
      this.faces[face] = [
        [f[0][2], f[1][2], f[2][2]],
        [f[0][1], f[1][1], f[2][1]],
        [f[0][0], f[1][0], f[2][0]]
      ];
    }
    
    // Rotate the adjacent edges
    switch (face) {
      case 'U':
        this.rotateEdges(['F', 'L', 'B', 'R'], 0, dir);
        break;
      case 'D':
        this.rotateEdges(['F', 'R', 'B', 'L'], 2, -dir);
        break;
      case 'F':
        this.rotateEdges(['U', 'R', 'D', 'L'], 2, dir, true);
        break;
      case 'B':
        this.rotateEdges(['U', 'L', 'D', 'R'], 0, -dir, true);
        break;
      case 'L':
        this.rotateEdges(['U', 'F', 'D', 'B'], 0, dir, false, true);
        break;
      case 'R':
        this.rotateEdges(['U', 'B', 'D', 'F'], 2, -dir, false, true);
        break;
    }
  }

  rotateEdges(faces, rowOrCol, dir, isRow = true, isVertical = false) {
    const temp = [...this.faces[faces[0]][isRow ? rowOrCol : 0]];
    
    if (dir === 1) {
      for (let i = 0; i < 3; i++) {
        const nextFace = faces[(i + 1) % 4];
        const currentFace = faces[i];
        
        if (isRow) {
          if (i < 3) this.faces[currentFace][rowOrCol] = [...this.faces[nextFace][rowOrCol]];
        } else if (isVertical) {
          for (let j = 0; j < 3; j++) {
            this.faces[currentFace][j][rowOrCol] = this.faces[nextFace][j][rowOrCol];
          }
        } else {
          const col = rowOrCol;
          for (let j = 0; j < 3; j++) {
            this.faces[currentFace][j][col] = this.faces[nextFace][2 - j][col];
          }
        }
      }
      
      if (isRow) {
        this.faces[faces[3]][rowOrCol] = temp;
      } else if (isVertical) {
        for (let j = 0; j < 3; j++) {
          this.faces[faces[3]][j][rowOrCol] = temp[j];
        }
      } else {
        for (let j = 0; j < 3; j++) {
          this.faces[faces[3]][j][rowOrCol] = temp[2 - j];
        }
      }
    } else {
      for (let i = 3; i >= 0; i--) {
        const prevFace = faces[(i - 1 + 4) % 4];
        const currentFace = faces[i];
        
        if (isRow) {
          if (i > 0) this.faces[currentFace][rowOrCol] = [...this.faces[prevFace][rowOrCol]];
        } else if (isVertical) {
          for (let j = 0; j < 3; j++) {
            this.faces[currentFace][j][rowOrCol] = this.faces[prevFace][j][rowOrCol];
          }
        } else {
          const col = rowOrCol;
          for (let j = 0; j < 3; j++) {
            this.faces[currentFace][j][col] = this.faces[prevFace][2 - j][col];
          }
        }
      }
    
      if (isRow) {
        this.faces[faces[0]][rowOrCol] = temp;
      } else if (isVertical) {
        for (let j = 0; j < 3; j++) {
          this.faces[faces[0]][j][rowOrCol] = temp[j];
        }
      } else {
        for (let j = 0; j < 3; j++) {
          this.faces[faces[0]][j][rowOrCol] = temp[2 - j];
        }
      }
    }
  }

  scramble(moves = 20) {
    const faces = ['U', 'D', 'F', 'B', 'L', 'R'];
    const directions = [1, -1];
    
    for (let i = 0; i < moves; i++) {
      const face = faces[Math.floor(Math.random() * faces.length)];
      const dir = directions[Math.floor(Math.random() * directions.length)];
      this.rotateFace(face, dir);
    }
  }

  isSolved() {
    for (const face in this.faces) {
      const color = this.faces[face][0][0];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.faces[face][i][j] !== color) return false;
        }
      }
    }
    return true;
  }

  solve() {
    const steps = [];
    const recordStep = (move) => {
      steps.push(move);
      this.rotateFace(move.face, move.dir);
    };
    
    if (!this.isSolved()) {
      recordStep({face: 'R', dir: 1});
      recordStep({face: 'U', dir: -1});
    }
    
    return steps;
  }
}