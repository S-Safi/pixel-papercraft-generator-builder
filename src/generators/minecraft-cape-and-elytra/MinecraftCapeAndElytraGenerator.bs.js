// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Generator = require("../../builder/modules/Generator.bs.js");

function requireImage(id) {
  return require("./images/" + id + ".png");
}

function requireTexture(id) {
  return require("./textures/" + id + ".png");
}

var id = "minecraft-cape-and-elytra";

var name = "Minecraft Cape And Elytra";

var thumbnail = {
  url: require("./thumbnail/thumbnail.jpeg")
};

var imageIds = [
  "Foreground",
  "Folds",
  "Labels"
];

function toImageDef(id) {
  return {
          id: id,
          url: requireImage(id)
        };
}

var images = imageIds.map(toImageDef);

var textures = [];

function script(param) {
  Generator.defineTextureInput("Cape", {
        standardWidth: 64,
        standardHeight: 32,
        choices: []
      });
  Generator.defineBooleanInput("Show Folds", true);
  Generator.defineBooleanInput("Show Labels", true);
  var showFolds = Generator.getBooleanInputValue("Show Folds");
  var showLabels = Generator.getBooleanInputValue("Show Labels");
  Generator.drawTextureLegacy("Cape", {
        x: 0,
        y: 1,
        w: 1,
        h: 16
      }, {
        x: 74,
        y: 116,
        w: 8,
        h: 128
      }, undefined, undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 1,
        y: 1,
        w: 10,
        h: 16
      }, {
        x: 82,
        y: 116,
        w: 80,
        h: 128
      }, undefined, undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 11,
        y: 1,
        w: 1,
        h: 16
      }, {
        x: 162,
        y: 116,
        w: 8,
        h: 128
      }, undefined, undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 12,
        y: 1,
        w: 10,
        h: 16
      }, {
        x: 170,
        y: 116,
        w: 80,
        h: 128
      }, undefined, undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 1,
        y: 0,
        w: 10,
        h: 1
      }, {
        x: 82,
        y: 108,
        w: 80,
        h: 8
      }, undefined, undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 11,
        y: 0,
        w: 10,
        h: 1
      }, {
        x: 82,
        y: 244,
        w: 80,
        h: 8
      }, "Vertical", undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 36,
        y: 2,
        w: 6,
        h: 4
      }, {
        x: 402,
        y: 180,
        w: 48,
        h: 32
      }, undefined, undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 36,
        y: 2,
        w: 4,
        h: 5
      }, {
        x: 418,
        y: 140,
        w: 32,
        h: 40
      }, undefined, undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 36,
        y: 2,
        w: 6,
        h: 4
      }, {
        x: 450,
        y: 180,
        w: 48,
        h: 32
      }, "Horizontal", undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 36,
        y: 2,
        w: 4,
        h: 5
      }, {
        x: 450,
        y: 140,
        w: 32,
        h: 40
      }, "Horizontal", undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 36,
        y: 2,
        w: 10,
        h: 20
      }, {
        x: 81,
        y: 336,
        w: 80,
        h: 160
      }, undefined, undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 24,
        y: 0,
        w: 10,
        h: 2
      }, {
        x: 161,
        y: 336,
        w: 80,
        h: 32
      }, undefined, 180.0, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 34,
        y: 2,
        w: 2,
        h: 20
      }, {
        x: 49,
        y: 336,
        w: 32,
        h: 160
      }, undefined, undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 36,
        y: 2,
        w: 10,
        h: 20
      }, {
        x: 161,
        y: 336,
        w: 80,
        h: 160
      }, "Horizontal", undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 24,
        y: 0,
        w: 10,
        h: 2
      }, {
        x: 161,
        y: 304,
        w: 80,
        h: 32
      }, "Vertical", undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 34,
        y: 2,
        w: 2,
        h: 20
      }, {
        x: 241,
        y: 336,
        w: 32,
        h: 160
      }, "Horizontal", undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 34,
        y: 2,
        w: 2,
        h: 2
      }, {
        x: 353,
        y: 352,
        w: 32,
        h: 112
      }, undefined, undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 36,
        y: 2,
        w: 4,
        h: 4
      }, {
        x: 496,
        y: 375,
        w: 32,
        h: 32
      }, undefined, undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 36,
        y: 2,
        w: 4,
        h: 4
      }, {
        x: 496,
        y: 409,
        w: 32,
        h: 32
      }, undefined, undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 36,
        y: 2,
        w: 10,
        h: 20
      }, {
        x: 81,
        y: 592,
        w: 80,
        h: 160
      }, undefined, undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 24,
        y: 0,
        w: 10,
        h: 2
      }, {
        x: 161,
        y: 592,
        w: 80,
        h: 32
      }, undefined, 180.0, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 34,
        y: 2,
        w: 2,
        h: 20
      }, {
        x: 49,
        y: 592,
        w: 32,
        h: 160
      }, undefined, undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 36,
        y: 2,
        w: 10,
        h: 20
      }, {
        x: 161,
        y: 592,
        w: 80,
        h: 160
      }, "Horizontal", undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 24,
        y: 0,
        w: 10,
        h: 2
      }, {
        x: 161,
        y: 560,
        w: 80,
        h: 32
      }, "Vertical", undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 34,
        y: 2,
        w: 2,
        h: 20
      }, {
        x: 241,
        y: 592,
        w: 32,
        h: 160
      }, "Horizontal", undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 34,
        y: 2,
        w: 2,
        h: 2
      }, {
        x: 353,
        y: 608,
        w: 32,
        h: 112
      }, "Horizontal", undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 36,
        y: 2,
        w: 4,
        h: 4
      }, {
        x: 496,
        y: 631,
        w: 32,
        h: 32
      }, "Horizontal", undefined, undefined);
  Generator.drawTextureLegacy("Cape", {
        x: 36,
        y: 2,
        w: 4,
        h: 4
      }, {
        x: 496,
        y: 665,
        w: 32,
        h: 32
      }, "Horizontal", undefined, undefined);
  Generator.drawImage("Foreground", [
        0,
        0
      ]);
  if (showFolds) {
    Generator.drawImage("Folds", [
          0,
          0
        ]);
  }
  if (showLabels) {
    return Generator.drawImage("Labels", [
                0,
                0
              ]);
  }
  
}

var generator_thumbnail = thumbnail;

var generator = {
  id: id,
  name: name,
  thumbnail: generator_thumbnail,
  video: undefined,
  instructions: undefined,
  images: images,
  textures: textures,
  script: script
};

exports.requireImage = requireImage;
exports.requireTexture = requireTexture;
exports.id = id;
exports.name = name;
exports.thumbnail = thumbnail;
exports.imageIds = imageIds;
exports.toImageDef = toImageDef;
exports.images = images;
exports.textures = textures;
exports.script = script;
exports.generator = generator;
/* thumbnail Not a pure module */
