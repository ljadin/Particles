var Particle = function(start_x, start_y, noise_range) {
  
  this.vector = myp5.createVector(start_x, start_y);
  this.old_vector = this.vector.copy();
  this.step_size = myp5.random(1, 5);
  this.angle;
  this.noise = myp5.random(noise_range);
  
};

Particle.prototype.update = function(stroke_width, noise_velocity) {
  
  this.vector.x += myp5.cos(this.angle) * this.step_size;
  this.vector.y += myp5.sin(this.angle) * this.step_size;
  
  if (this.vector.x < -10) this.vector.x = this.old_vector.x = myp5.width + 10;
  if (this.vector.x > myp5.width + 10) this.vector.x = this.old_vector.x = -10;
  if (this.vector.y < -10) this.vector.y = this.old_vector.y = myp5.height + 10;
  if (this.vector.y > myp5.height + 10) this.vector.y = this.old_vector.y = -10;
  
  myp5.strokeWeight(stroke_width * this.step_size);
  myp5.line(this.old_vector.x, this.old_vector.y, this.vector.x, this.vector.y);
  
  this.old_vector = this.vector.copy();
  this.noise += noise_velocity;
  
};

Particle.prototype.update1 = function(stroke_width, noise_scale, noise_strength, noise_velocity) {
  
  this.angle = myp5.noise(this.vector.x / noise_scale, this.vector.y / noise_scale, this.noise) * noise_strength;
  this.update(stroke_width, noise_velocity);

};

Particle.prototype.update2 = function(stroke_width, noise_scale, noise_strength, noise_velocity) {

  this.angle = myp5.noise(this.vector.x / noise_scale, this.vector.y / noise_scale, this.noise) * noise_strength;
  this.angle = (this.angle - myp5.floor(this.angle)) * noise_strength;
  this.update(stroke_width, noise_velocity);
  
}
