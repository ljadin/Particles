// M_1_5_03
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * noise values (noise 3d) are used to animate a bunch of agents.
 *
 * KEYS
 * 1-2                 : switch noise mode
 * space               : new noise seed
 * backspace           : clear screen
 * s                   : save png
 */
'use strict';

var sketch = function(p) {

  var particles = [];
  var particle_count = 4000;
  var noise_scale = 100;
  var noise_strength = 10;
  var noise_range = 0.4;
  var noise_velocity = 0.01;
  var overlay_alpha = 10;
  var particle_alpha = 90;
  var stroke_width = 0.3;
  var draw_mode = 1;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);

    for (var i = 0; i < particle_count; i++) {
      particles[i] = new Particle(p.width/2, p.height/2, noise_range);
    }
  };

  p.draw = function() {
    p.fill(255, overlay_alpha);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    // Draw particles
    p.stroke(0, particle_alpha);
    for (var i = 0; i < particle_count; i++) {
      if (draw_mode == 1) {
        particles[i].update1(stroke_width, noise_scale, noise_strength, noise_velocity);
      } else {
        particles[i].update2(stroke_width, noise_scale, noise_strength, noise_velocity);
      }
    }
  };

  p.keyReleased = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key == '1') draw_mode = 1;
    if (p.key == '2') draw_mode = 2;
    if (p.key == ' ') {
      var new_noise_seed = p.floor(p.random(10000));
      console.log('newNoiseSeed', new_noise_seed);
      p.noiseSeed(new_noise_seed);
    }
    if (p.keyCode == p.DELETE || p.keyCode == p.BACKSPACE) p.background(255);
  };

};

var myp5 = new p5(sketch);
