var WATER_POINT_TYPE = "WATER";
var EARTH_POINT_TYPE = "EARTH";
var POINT_TYPES = [WATER_POINT_TYPE, EARTH_POINT_TYPE];

var DEFAULT_WATER_COLOR = [30, 144, 255];
var DEFAULT_EARTH_COLOR = [105, 105, 105];
var DEFAULT_COLORS = {
  [WATER_POINT_TYPE]: DEFAULT_WATER_COLOR, // blue
  [EARTH_POINT_TYPE]: DEFAULT_EARTH_COLOR, // dark grey
};

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

class Map {
  constructor(height, width) {
    var map = [];
    for (var i = 0; i < height; i++) {
      var row = [];
      for (var j = 0; j < width; j++) {
        row.push(this.generatePointType());
      }
      map.push(row);
    }
    this.map = map;
  }

  generatePointType() {
    return POINT_TYPES[generateRandomInteger(2)];
  }

  generateRandomColor() {
    var color = undefined;
    while (!color || Object.keys(DEFAULT_COLORS).includes(color)) {
      color = [];
      for (var i = 0; i < 3; i++) {
        color.push(generateRandomInteger(256));
      }
    }
    return color;
  }

  getRawMap() {
    var rawMap = [];
    for (var i = 0; i < this.map.length; i++) {
      var row = [];
      for (var j = 0; j < this.map[i].length; j++) {
        row.push(DEFAULT_COLORS[this.map[i][j]]);
      }
      rawMap.push(row);
    }
    return rawMap;
  }

  getColoredMap() {
    var map = this.map.map((data) => [...data]);

    const createIsland = (x, y, color) => {
      if (
        x >= 0 &&
        y >= 0 &&
        x < map.length &&
        y < map[x].length &&
        map[x][y] === EARTH_POINT_TYPE
      ) {
        map[x][y] = color;
        createIsland(x + 1, y, color);
        createIsland(x, y + 1, color);
        createIsland(x - 1, y, color);
        createIsland(x, y - 1, color);
      }
    };

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const block = map[i][j];
        if (block == WATER_POINT_TYPE) {
          map[i][j] = DEFAULT_COLORS[block];
        } else if (block == EARTH_POINT_TYPE) {
          createIsland(i, j, this.generateRandomColor());
        }
      }
    }
    return map;
  }
}
