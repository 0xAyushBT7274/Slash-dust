/***********************************************************************
     
 Copyright (c) 2016-2022 Ayush Mishra, www.Ayushmishra.design
 *** Ayush Mishra Designs ***
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of MSA Visuals nor the names of its contributors
 *       may be used to endorse or promote products derived from this software
 *       without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS
 * OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***********************************************************************/
let radius = 100;
let spheres = [];
let backgroundColor = 0;
let artsy = ["#D79922", "#EFE2BA", "#F13C20", "#4056A1", "#C5CBE3", "#FFFFFF"];
let elegant = ["#EDC7B7", "#EEE2DC", "#BAB2B5", "#123C69", "#AC3B61"];
let audacious = ["#272727", "#747474", "#FF652F", "#FFE400", "#14A76C"];
let dynamic = ["#2F4454", "#2E151B", "#DA7B93", "#376E6F", "#1C3334"];
let minimal = ["#EAE7DC", "#D8C3A5", "#8E8D8A", "#E98074", "#E85A4F"];
let energetic = ["#5680E9", "#84CEEB", "#5AB9EA", "#C1C8E4", "#8860D0"];
let vibrant = ["#F8E9A1", "#F76C6C", "#A8D0E6", "#374785", "#24305E"];
let youthfull = ["#A64AC9", "#FCCD04", "#FFB48F", "#F5E6CC", "#17E9E0"];
let palettes = [artsy, elegant, audacious, dynamic, minimal, energetic, vibrant, youthfull];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); 
  background(backgroundColor); 
  
	spheres.push(new Sphere(width / 2, height / 2, 150, 2, false, false));
  spheres.push(new Sphere(width / 2, height / 2, 150, 7, false, false));
  spheres.push(new Sphere(width / 2, height / 2, 300, 10, false, true));
  spheres.push(new Sphere(width / 2, height / 2, 500, 10, false, true));
  spheres.push(new Sphere(width / 2, height / 2, 500, 10, true, false));
  spheres.push(new Sphere(width / 2, height / 2, 400, 10, false, false));
}

function draw() { 
  noStroke();
  fill(backgroundColor, 5);
	push();
	translate(-windowWidth/2, -windowHeight/2);
  rect(0, 0, windowWidth, windowHeight);
	pop();
	
	for (let i = 0; i < spheres.length; i++) {
		spheres[i].display(frameCount);
	}
}  


class Sphere {
  
  constructor (x, y, r, s, rVar, reverse) {
    this.xPos = x;
    this.yPos = y;
    this.radius = r;
    this.sAngle = s;
    this.radVarianceBool = rVar;
    this.reversed = reverse;
		this.palette = palettes[int(random(palettes.length))];
		if (random(1) < 0.5) { this.lineColor = 255; } else {this.lineColor = this.palette[int(random(this.palette.length))]; }
  }
  
  display( fc ) {
    push();
		if (this.reversed == true ) { fc *= -1; }
    rotateY(fc * 0.003); 
    rotateX(fc * 0.004);
    
    // The two angles of the sphere
    let s = 0; 
    let t = 0;
        
    while (t < 180) {

      s += this.sAngle;
      t += 1;
			
      let radVariance = 0;
      if (this.radVarianceBool == true) { radVariance = random(-1, 10); }
      let radianS = radians(s + radVariance); 
      let radianT = radians(t + radVariance);
      
      let thisx = 0 + (this.radius * cos(radianS) * sin(radianT)); 
      let thisy = 0 + (this.radius * sin(radianS) * sin(radianT)); 
      let thisz = 0 + (this.radius * cos(radianT));
  
			stroke(this.lineColor);
			strokeWeight(map(thisz, -this.radius, this.radius, 0, 3));
			point(thisx, thisy, thisz);
    }     
  pop();
  }
}