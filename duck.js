var ducks = {};

ducks.count = 0;
ducks.countTotal = 0;
ducks.countTotalKilled = 0;
ducks.flewAway = 0;
ducks.speed = 3000;
ducks.dropSound = $('.drop')[0];
ducks.tieSound = $('.oneDuck')[0];

setInterval(function(){

	ducks.countTotalMissed = ducks.countTotal-ducks.countTotalKilled;
	$('.highScore .ducksMissed h3').text(ducks.countTotalMissed);
	$('.highScore .ducksShot h3').text(ducks.countTotalKilled);
},100)



ducks.hatch = function(){

	ducks.speed = 3000-150*field.level;

	ducks.countToThree = 0;

	var threeQuacks = setInterval(function(){

		ducks.countToThree++;

		if (ducks.countToThree == 4) {

			clearInterval(threeQuacks);

		} else {

			$('.quack')[0].play();
		}

	},700);

	//add some ducks to the field
	$('#field').append('<div id="greenDuck" class="duck"></div><div id="redDuck" class="duck"></div>');

	ducks.count = 2;
	ducks.countTotal += 2;
	
	//animate the ducks
	$('#greenDuck')
	.sprite({fps: 6, no_of_frames: 3,start_at_frame: 1})
	.spState(3)
	.spStart()
	.spRandom({
			top: 300,
			left: 700,
			right: 0,
			bottom: 0,
			speed: ducks.speed,
			pause: 200
		      });

	//for whatever reason they need to be done seperately 
	$('#redDuck')
	.sprite({fps: 6, no_of_frames: 3,start_at_frame: 1})
	.spState(3)
	.spStart()
	.spRandom({
			top: 300,
			left: 0,
			right: 700,
			bottom: 0,
			speed: ducks.speed,
			pause: 0
		      });
	//end of redDuck

	//set flyOff timer
	ducks.flyOff.timer = setTimeout(function(){
		ducks.flyOff();
	},8000);//end of fly off timer

	if (ducks.speed <= 300) {
		
		ducks.speed === 300;
	}

};//end of hatch function

ducks.flyOff = function(){

	ducks.flewAway = 0;
	ducks.flewAway++;
	$('.duck').clearQueue().stop().finish().spState(1).animate({top:'-400'},1000,'linear',function(){
			$(this).remove();
		});

	if (ducks.flewAway===1 && ducks.count === 1) {

		ducks.tieSound.play();
		$('.tryAgain').show();
		$('#dogSprite').css({
			'background':'url(media/dogOneBird.png)',
			'width':'100px',
			'height':'91px'
		}).animate({bottom:'110px'},1000,'linear',function(){
			$(this).animate({
				bottom:'110px'
			},500,'linear',function(){
				$(this).animate({
					bottom:'0'
				},1000)
			})
		}).show();
	} else if (ducks.flewAway===1 && ducks.count === 2) {

		$('.laugh')[0].play();
		$('.tryAgain').show();
		$('#dogLaugh').animate({bottom:'110px'},1000,'linear',function(){
			$(this).animate({
				bottom:'110px'
			},500,'linear',function(){
				$(this).animate({
					bottom:'0'
				},1000)
			})
		}).show();
	}




};//end of flyOff

ducks.down = function() {

	$('.duck').on('click touchstart', function(){
		$(this).unbind('click')
		ducks.count--;
		ducks.countTotalKilled++;

		setTimeout(function(){
			ducks.dropSound.play();
		},500);

		$(this).stop();
		$(this).finish()
		$(this).clearQueue();
		$(this).spStop(true);
		$(this).spState(5); //dead duck pic
		$(this).finish().animate({
			opacity:'1' //pointless animation to allow timer to start and switch spState
		},100,'linear', function(){ 

			//start of deathspin
			$(this).spState(6).spStart();
			$(this).animate({
				top:'420'
			},500,'linear',function(){

				$(this).remove();

			})//end of on complete function
		});//end of outter animation

		$('.score img:first-child').remove();

		$('.score').append('<img src="media/duckDead.png">');
	})//end of onclick
};//end of ducks down

//dead duck event and animation
	// $('#field').on('click','.duck',function(){
		
	// 	$(this).stop();
	// 	$(this).spStop(true);
	// 	$(this).spState(5); //dead duck pic
	// 	$(this).finish().animate({
	// 		opacity:'1' //pointless animation to allow timer to start and switch spState
	// 	},100,'linear', function(){ //start of deathspin
	// 		$(this).spState(6).spStart();
	// 		$(this).animate({
	// 			top:'420'
	// 		},500,'linear',function(){
	// 			$(this).remove()
	// 		})//end of inner animation
	// 	});//end of outter animation
	// })
//end of dead duck on click click function


