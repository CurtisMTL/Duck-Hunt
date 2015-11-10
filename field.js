var field = {};

field.level = 1



field.start = function() {

	startGame = $('.startGame')
	event.stopPropagation();
	field.resetField();
	field.shots();
	ducks.hatch();
	ducks.down();
	startGame.hide();
	$('#level').append('<h2>'+field.level+'</h2>').show();
	console.log(field.level);

	setTimeout(function(){
		$('#level').css({display:'none'});
		$('#level h2:nth-child(2n)').remove();
	},500);

	//end of timeout


};//end of start function

field.resetField = function() {

	ducks.count = 0;
	ducks.flewAway = 0;
	$('#dogLaugh').fadeOut();
	$('.duck').remove();
	$('.gameOver').hide();
	$('.youWin').hide();
	$('.bullets').hide();
	$('#dogSprite').hide();
	$('.tryAgain').hide();
	$('.score img').remove();
	window.clearTimeout(ducks.flyOff.timer)
	

};//end of field clear


field.shots = function() {
	
	$('.bullets').show();
	$('.bullets img').remove();
	
	
	shots = 4;
	
	for (i=0;i<4;i++){
		$('.bullets').append('<img src="media/bullet.png">')
	}
}

//keep track of shots
		$('#field').on('click',function(){

			shots--

			$('.bullets').find('img').remove(':first');
			
			if (ducks.count===0) {
				// shots=4;
				field.level++
				$('.win')[0].play();
				$('.youWin').show();
				$('.bullets').find('img').remove();
				$('#dogSprite').css({
					'background':'url(media/dogTwoBirds.png)',
					'width':'129px',
					'height':'91px'
				}).animate({bottom:'110px'},1000,'linear',function(){
					$(this).animate({
						bottom:'110px'
					},500,'linear',function(){
						$(this).animate({
							bottom:'0'
						},1000,'linear',function(){
							$(this).hide();
						})
					})
				}).show();
			}

			else if ( shots===0 && ducks.count === 1) {

				ducks.flyOff();
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
			}

			else if( shots===0 && ducks.count === 2){

				ducks.flyOff();
			};
		});
//end of shot tracker

$('#field').on('click','.duck',function(){
	$(this).clearQue().stop().finish()
});



