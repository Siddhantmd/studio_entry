function sv(){
	saveCanvas("Hypotrochoid","jpg")
}

function fnumpet(d){
  
    if (d==0.5){
      denlow=1
    }
    else{
      var len=d.toString().length-2
      var b=Math.pow(10,len)
      var a=d*b
	  var ax=parseInt(a.toFixed(0))
        for (h=ax;h>0;h--){
          if (ax%h===0 && b%h===0) {
            var hcf= h
            var denlow=b/hcf
            break;
          }
        }
    }
  return denlow
}  

function lowest(y,z){
	for (h=y;h>0;h--){
          if (y%h===0 && z%h===0) {
            var hcf= h
            var lowz=z/hcf
			var lowy=y/hcf
            break;
	      }
	}
	low=[lowy,lowz]
	return low
}
 
function setup() {
  
 var canvas = createCanvas(2600,2600)
 canvas.parent('sketch-holder');  
 var submitbutton2=select('#submit2')
 submitbutton2.mousePressed(reset2)
 
 reset2() 
 
 var savec=select('#savec')
 savec.mousePressed(sv)  
}
  
function reset2(){
	
  var bgcol=select('#bg');
  var strokeweight=select('#strokeweight');
  var strokecol=select('#strokecol');
  var inputlat=select('#lat');
  var inputlon=select('#lon');
  var lat= (inputlat.value())
  var lon= (inputlon.value())
  var latm= map(-1*lat,-37.07,-8.08,600,2000);
  var lonm= map(-1*lon,-68.1848904,-97.3514043,600,2000); 
  var rot=0
  var rotb=Math.PI
  
  var inputname_=select('#name_');
  var name_= (inputname_.value())

  var inputgender=select('#gender');
  var gender= (inputgender.value())

  var inputtemperature=select('#temperature');
  var temperature= (inputtemperature.value())

  var inputhumidity=select('#humidity');
  var humidity= (inputhumidity.value())

  var inputsiz=select('#siz')
  siz= 200+(parseFloat(inputsiz.value())-20)*50

  var input=select('#rad_big');
  var rad_big_temp=parseFloat(input.value())
  var rad_big=(parseFloat(input.value()))*siz;

  var smalltowholetemp=select('#smalltowhole');
  var pos = smalltowholetemp.value().search("/")

  var red_=127
  var blue_=127
  var alpha_=(255-((humidity-40)/60*200))
	var col
  var strokecol

  if (temperature>25){
   red_= Math.floor(127+ ((temperature-25)/20*128) ) 
   blue_= Math.ceil(255-red_)
  }

  else if (temperature<25){
    blue_= Math.floor(127+ (Math.abs (temperature-25)/20*128) ) 
    red_= Math.ceil(255-blue_)
  }

  else if (temperature==0){
    blue_=127
    red_=127
  }
   col=color(red_,0,blue_,alpha_)


  

  if (pos!=-1){
  	arr=smalltowholetemp.value().split("/"); 
  	smalltowholex=parseInt(arr[0])/parseInt(arr[1])
  	smalltowhole=smalltowholex
  	numpet=lowest(parseInt(arr[0]),parseInt(arr[1]))
	}
	else {
    smalltowhole=parseFloat(smalltowholetemp.value())
  	numpet=fnumpet(smalltowhole)
	}

  var rad_small=rad_big*smalltowhole // the radius of smaller circle(figured out acc. to the ratio smalltowhole)
  var rada=rad_big-rad_small		   // the distance from center of the smaller circle to center of larger circle
  var radc=siz-rada
  var comp=select('#comp')
  var completeness=parseFloat(comp.value())
  
  var grain=select('#grain')
  var graininess=1/(parseFloat(grain.value())*low[0])
  var ratio=1/smalltowhole
  
  //background things
  background(200)
  push()
   fill(255)
   textSize(36)
     text(name_,20,2580)
  pop()
  push()
    rectMode(CENTER)
    noStroke()
    fill(255)
    rect(1300,1300,1400,1400)
  pop()

  push()
    noStroke()
    if(gender=="f"){
      fill(col);
    }
    else{
      fill(255)
    }

    rectMode(CENTER)
    rect(1300,1300,1400,1400)
  pop()

  push()
    noFill()
    stroke(150,150,150,150)
    ellipse(lonm,latm,2*rad_big)
    ellipse(lonm+rad_big-rad_small,latm,2*rad_small)
    push()
  		  strokeWeight(8)
  		  point(lonm+rad_big-rad_small,latm)
        point(lonm,latm)
    pop()
	  line(lonm+rad_big-rad_small,latm,lonm+rad_big-rad_small+radc,latm)
	  line(lonm,latm,lonm,latm+rad_big)
  pop()
	// the code for background figures ends here
  
  var temp=280*low[1]*(radc/siz+0.4)*siz/100*graininess
   if(gender=="m"){
      strokecol=col;
    }
    else{
      strokecol=255;
    }
  // Here begins the main code, that is doing the drawing
  for (x=0;x<low[0]*completeness*temp;x++){ // here , 1000 needs to be multiplied with numof pet 
	  push()
		  strokeWeight(strokeweight.value())
      stroke(strokecol)
		  translate(lonm,latm)
			rotate(rot)
				translate(rada,0)
					rotate(rotb)
					point(radc,0)
	  pop()
	  
	rot=rot-(2*Math.PI)/temp	// minus since revolution is clockwise and rotation is anticlockwise. This also needs to take into account, the no. of pet, it seems
	rotb=rotb+(ratio*2*Math.PI)/temp 	// the greater the denominator, the smoother the line
  }
}

function draw(){
	 
}