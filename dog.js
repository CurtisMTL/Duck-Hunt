
var dog = {};

dog.bark = $('.bark')[0];

dog.intro = function(){

	$('#dogIntro').css('z-index','5')
	$('#dogIntro').sprite({fps: 2, no_of_frames: 8,start_at_frame: 1});
	$('#dogIntro').animate({
    left: '280',
    bottom: '50'
    },4000,'linear',function(){

    	$('#dogIntro').remove();
    	$('.startGame').show();
    	dog.bark.countToThree = 0;

    	var introBark = setInterval(function(){
    		dog.bark.countToThree++;
    		if (dog.bark.countToThree === 4) {
    			clearInterval(introBark);
    		} else {
    			dog.bark.play();
    		}
    		
    	},500)
    });
};
