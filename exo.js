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
    var islands = this.getIslands();

    var coloredMap = [];
    for (var i = 0; i < this.map.length; i++) {
      var row = [];
      for (var j = 0; j < this.map[i].length; j++) {
        if (this.map[i][j] === EARTH_POINT_TYPE) {
          var island = islands[[i, j]];
          row.push(island.color);
        } else {
          row.push(DEFAULT_COLORS[WATER_POINT_TYPE]);
        }
      }
      coloredMap.push(row);
    }
    return coloredMap;
  }

  getIslands() {
    var islands = {};
    for (var i = 0; i < this.map.length; i++) {
      for (var j = 0; j < this.map[i].length; j++) {
        if (this.map[i][j] === EARTH_POINT_TYPE) {
          var island = undefined;
          var neighborColors = [];
          if (i > 0 && this.map[i - 1][j] === EARTH_POINT_TYPE) {
            var leftEarth = islands[[i - 1, j]];
            if (leftEarth !== undefined) {
              island = leftEarth;
              neighborColors.push(leftEarth.color);
            }
          }
          if (j > 0 && this.map[i][j - 1] === EARTH_POINT_TYPE) {
            var earthAbove = islands[[i, j - 1]];

            if (earthAbove !== undefined) {
              island = earthAbove;
              neighborColors.push(earthAbove.color);
            }
          }
          if (island === undefined) {
            var color = this.generateRandomColor();
            island = { color: color };
          }
          islands[[i, j]] = island;
          var color = island.color;
          island.color = color;
        }
      }
    }
    return islands;
  }
}
