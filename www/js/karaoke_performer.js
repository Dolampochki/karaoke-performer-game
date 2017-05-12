$(document).ready(function() {

	
	var avatars = ['1','2','3','4','5','6','7','8'];
	var colors = ['#910c58','#46943d','#2380ad','#d89548','#8d3589','#1ea28b','#505cb4','#bf582b'];
	var avatarsBg = ['1','2','3','4','5','6','7','8'];
	var performerNames = ['','','','','','','',''];
	var performerAvatars = ['','','','','','','',''];
	var performerVotes = ['12','80','30','15','58','35','0','3'];

	var videos = ['http://media.chosen.fm/chosen-videos/ad/14/7967cc8e3ab559e68cc944c44b1cf3e8/Karaoke_5f928e920ac121d3_4a2aeae8c87953d4_record_1.mov',
                  'http://media.chosen.fm/chosen-videos/66/20/aceacd5df18526f1d96ee1b9714e95eb/Karaoke_8bc56cf0bafb2650_146f3e48cb85d257_record_1.mov',
                  'http://media.chosen.fm/chosen-videos/57/1f/1ecdec353419f6d7e30857d00d0312d1/Karaoke_886ad506e0c115cf_590d18ebb6c26561_record_1.mov',
                  'http://media.chosen.fm/chosen-videos/ba/1e/1963bd5135521d623f6c29e6b1174975/Karaoke_a80bd9bf170ecc75_6d4ef302c4f0e712_record_1.mov',
                  'http://media.chosen.fm/chosen-videos/c2/01/f5f8590cd58a54e94377e6ae2eded4d9/Karaoke_6f75e9b246b289fa_11d79a27a3cba4b9_record_1.mov',
                  'http://media.chosen.fm/chosen-videos/bf/15/18cdf49ea54eec029238fcc95f76ce41/Karaoke_4dfd2a142d36707f_8043c40ce0746761_record_1.mov',
                  'http://media.chosen.fm/chosen-videos/85/0a/3bd4017318837e92a66298c7855f4427/Karaoke_bfe6caa90f31d889_bd773c2eabe70679_record_1.mov',
                  'http://media.chosen.fm/chosen-videos/d6/10/c96c08f8bb7960e11a1239352a479053/Karaoke_22bb543b251c39cc_dad8063d486987bb_record_1.mov'];

	
	
	var chosedAvatar;
	var timer;
	var timerRewatch;
	var clipTime = 15000;
	var currentCard = 0;
	
	var winner = 3;
	
	var performersNum = 0;
	var performersNumCurrent = 0;
	
	var turnNum = 0;
	var turnNum1 = 0;
	
	var votesTimer = 15000;
	var winnerNum = 0;
	
	// opening
	
	$( ".opening-screen" ).addClass(" animated slideInUp");
	$( ".heart-bg" ).addClass(" animated zoomIn");
	
	$(".opening-screen-sound").volume = 0.2;
	$(".opening-screen-sound").trigger('play');
	$( ".opening-screen" ).delay(2000).queue(function(next){
	    $(this).removeClass(" animated slideInUp").addClass(" animated slideOutUp");
	    next();
	});
	
	$( ".heart-bg" ).delay(2000).queue(function(next){
	    $(this).removeClass(" animated zoomIn").addClass(" animated zoomOut");
	    next();
	});	
	
	$(".add-performer-screen").delay(2000).queue(function(next){
	    $(this).removeClass("hide").addClass(" show animated rotateInUpLeft");	    
	    next();
	});
	
	
	// add Performer Screen
	
	function addPerformerScreen(performersNumCurrent){
		
		$( ".add-performer-screen .performer-blocks .performer-block" ).each(function(index, element) {
				
			if(performerNames[index] != '' && index < 8) {		    	
		    	$( element ).removeClass('hide');
		    	$( element ).css( 'background-color', colors[index]);
				$( element ).find(".block-icon img").attr( "src", 'img/avatar_' + performerAvatars[index] + '.png' );
				$( element ).find(".block-title span").html( performerNames[index] );
				
				
		    } else {
		    	if(performerNames[index] == '' && index < 7){
		    	$( element ).removeClass('hide').addClass('hide');
		    	}
		    	
		    	if(performerNames[index] == '' && index == 7){
			    	$( element ).removeClass('hide').addClass('hide');
			    	$('.add-performer-screen .block-add').removeClass('hide');
			    }
		    }
			
		    $('.block-add').css( 'background-color', colors[performersNumCurrent]);
		    //alert(index);
		  });
		
		if(performersNumCurrent > 7) {
			$('.add-performer-screen .block-add').addClass('hide');		
		}
		
		if(performersNumCurrent < 2) {
			$('.add-performer-screen .play-now-button').addClass('hide');		
		} else {
			$('.add-performer-screen .play-now-button').removeClass('hide');
		}
		$('.performer-blocks').scrollTop($('.performer-blocks')[0].scrollHeight);
		
	};
	
	$('.add-performer-screen .block-add .add').click(function() {			
		$('.add-performer-form-screen .performer-block').css( 'background-color', colors[performersNum]);
		$('input[name=performer_name]').val('');
		$('input[name=performer_name]').focus();
		$('.done').css('opacity','0.5');
		chosedAvatar = 0;
		prevPerformersNum = performersNum;
		
		$( '.add-performer-form-screen .avatar' ).each(function(index1, element1) {			
			if($.inArray((index1+1), performerAvatars) == -1){
				$(element1).removeClass('avatar_checked');
				$(element1).find('.avatar_bg').attr('src','img/avatar_unchecked.png');
				$(element1).css('opacity','1');
			}
		});
		
		$('.add-performer-screen').removeClass('animated').removeClass('slideInLeft').removeClass('rotateInUpLeft').addClass('animated').addClass('slideOutLeft');
		$('.add-performer-form-screen').removeClass('hide').removeClass('animated').removeClass('slideOutRight').addClass('animated').addClass('slideInRight');
		
		
		
		
		$( '.add-performer-form-screen .avatar' ).each(function(index, element) {
								
			$(element).click(function() {
				if($.inArray((index+1), performerAvatars) == -1){
					$(element).addClass('avatar_checked');
					$(element).find('.avatar_bg').attr('src','img/avatar_checked.png');
					chosedAvatar = index+1;
					
					$( '.add-performer-form-screen .avatar' ).each(function(index1, element1) {
						if( $(element1).hasClass('avatar_checked') && index1 != index ){
							$(element1).removeClass('avatar_checked');
							$(element1).find('.avatar_bg').attr('src','img/avatar_unchecked.png');
						}
					});
					
					if ($('input[name=performer_name]').val().length != 0) {
						$('.done').css('opacity','1');
					}
					
				} else {
					chosedAvatar = 0;
					$(element).removeClass('avatar_checked');
					$(element).css('opacity','0.5');
				}
			});
			if($.inArray((index+1), performerAvatars) != -1){
				$(element).removeClass('avatar_checked');
				$(element).css('opacity','0.5');
			}
			
		});
			
		
		$("input[name=performer_name]").on('input propertychange', function() {
			if (chosedAvatar != 0) {
				$('.done').css('opacity','1');
			}
		});
		
		
	});
	
	$('.add-performer-form-screen .top-left-icon').click(function() {		
		$('.add-performer-screen').removeClass('animated').removeClass('slideOutLeft').addClass('animated').addClass('slideInLeft');
		$('.add-performer-form-screen').removeClass('animated').removeClass('slideInRight').addClass('animated').addClass('slideOutRight');
	});
	
	$('.add-performer-form-screen .done').click(function() {
		if($('input[name=performer_name]').val().length != 0 && chosedAvatar != 0){
			$('.add-performer-screen').removeClass('animated').removeClass('slideOutLeft').addClass('animated').addClass('slideInLeft');
			$('.add-performer-form-screen').removeClass('animated').removeClass('slideInRight').addClass('animated').addClass('slideOutRight');
			performerNames[performersNum] = $('input[name=performer_name]').val();
			performerAvatars[performersNum] = chosedAvatar;		
			performersNum ++;
			addPerformerScreen(performersNum);		
		}
	});

	$( ".add-performer-screen .performer-blocks .performer-block" ).each(function(index, element) {
		$( element ).find(".remove").click(function(){	
			elementBg=colors[index];
			elementBgCircle=avatarsBg[index];
			colors.splice(index, 1);
			avatarsBg.splice(index, 1);
			performerNames.splice(index, 1);
			performerAvatars.splice(index, 1);
			colors.splice(7, 0, elementBg);
			avatarsBg.splice(7, 0, elementBgCircle);
			performerNames.splice(7, 0, '');
			performerAvatars.splice(7, 0, '');
			$( element ).addClass('hide');
			performersNum --;
			
			addPerformerScreen(performersNum);
		});
	});
	
	
	
	
	//play now
	
	
	
	
	function turnScreen(turnNum1){
		$('.bumper-screen .game-main .game-large-icon .avatar_bg').attr('src','img/avatar_bg_' + avatarsBg[turnNum1] + '.png');
		$('.bumper-screen .game-main .game-large-icon .avatar_icon').attr('src','img/avatar_' + performerAvatars[turnNum1] + '.png');
		$('.bumper-screen .game-main .screen-title').html(performerNames[turnNum1]);
	}
	
	$('.play-now-button').click(function(){		
		turnScreen(turnNum);		
		$('.add-performer-screen').removeClass('animated').removeClass('slideInLeft').addClass('animated').addClass('slideOutLeft');
		$( ".heart-bg" ).delay(200).queue(function(next){
		    $(this).removeClass('animated').removeClass('zoomOut').addClass('animated').addClass('zoomIn');
		    next();
		});	
		$('.bumper-screen').delay(500).queue(function(next){
		    $(this).removeClass('hide').addClass('animated').addClass('slideInUp');
		    next();
		});			
	});
	
	$('.record').click(function(){		
		$('.bumper-screen').removeClass('animated').removeClass('slideInUp').addClass('animated').addClass('slideOutLeft');
		$('.karaoke-list-screen').delay(200).queue(function(next){
		    $(this).removeClass('hide').removeClass('animated').removeClass('slideOutRight').removeClass('slideOutLeft').addClass('animated').addClass('slideInRight');
		    next();
		});			
	});
	
	$('.karaoke-list-screen .top-left-icon').click(function(){		
		$('.karaoke-list-screen').removeClass('animated').removeClass('slideInRight').removeClass('slideOutLeft').addClass('animated').addClass('slideOutRight');
		$('.bumper-screen').delay(200).queue(function(next){
		    $(this).removeClass('animated').removeClass('slideOutLeft').addClass('animated').addClass('slideInLeft');
		    next();
		});			
	});
	
	$('.karaoke-list-screen .game-main').click(function(){
		
		if ((turnNum+1) < performersNum){
			turnNum ++;
			turnScreen(turnNum);		
			$('.karaoke-list-screen').removeClass('animated').removeClass('slideInRight').addClass('animated').addClass('slideOutLeft');
			$( ".heart-bg" ).delay(200).queue(function(next){
			    $(this).removeClass('animated').removeClass('zoomOut').addClass('animated').addClass('zoomIn');
			    next();
			});	
			$('.bumper-screen').delay(500).queue(function(next){
			    $(this).removeClass('animated').removeClass('slideOutLeft').removeClass('slideInUp').removeClass('slideInLeft').addClass('animated').addClass('slideInUp');
			    next();
			});	
		} else {
			var playersStep;
			var playersTop;
			
			if(performersNum<6){
				playersStep = 14;
			} else {
				playersStep = 72/performersNum;
			}
			
			if(performersNum<4){
				playersTop = 14;
			} else {
				if(performersNum==4){
					playersTop = 5;
				} else {
					playersTop = 0;
				}
			}

			
			$( '.result-screen .result-block' ).each(function(index, element) {
				
				if(index < performersNum){				
					$(element).css('top',playersTop + '%');
					$(element).find('.result-icon .avatar_bg').attr('src','img/avatar_bg_' + avatarsBg[index] + '.png');
					$(element).find('.result-icon .avatar_icon').attr('src','img/avatar_' + performerAvatars[index] + '.png');
					$(element).find('.result-progress').css('background-color',colors[index]).css('width','2%');
					$(element).find('.result-icon').css('margin-left','0%');
					playersTop = playersTop + playersStep;
					if(performerVotes[index] >= performerVotes[winnerNum]){
						winnerNum=index;
					}
					
				} else {
					$(element).css('display','none');
				}
			});
			
			
			$('.karaoke-list-screen').removeClass('animated').removeClass('slideInRight').addClass('animated').addClass('slideOutLeft');
			$( ".heart-bg" ).addClass("hide");
			$('.result-screen').delay(500).queue(function(next){
			    $(this).removeClass('hide').addClass('animated').addClass('slideInLeft');
			    next();
			});
			
			$( '.result-screen .result-block' ).each(function(index, element) {		
					$(element).find('.result-icon').animate({   margin: '0 0 0 ' + performerVotes[index] + '%'  }, votesTimer);
					$(element).find('.result-progress').animate({   width: (parseInt(performerVotes[index]) + 2) + '%'  }, votesTimer);
			});
			
			$('.result-screen').delay(votesTimer + 400).queue(function(next){
			    $(this).removeClass('animated').removeClass('slideInLeft').addClass('animated').addClass('slideOutLeft');
			    next();
			});
			
			$('.winner-screen .game-main .game-large-icon .avatar_bg').attr('src','img/avatar_bg_' + (winnerNum+1) + '.png');
			$('.winner-screen .game-main .game-large-icon .avatar_icon').attr('src','img/avatar_' + (winnerNum+1) + '.png');
			$('.winner-screen .game-main .screen-title').html('<small>The winner is</small><br />' + performerNames[winnerNum]);
			
			$( '.share-screen .performer-block' ).each(function(index, element) {				
				if(index < performersNum){
					$(element).css('background-color', colors[index]);
					$(element).find('.block-icon img').attr('src','img/avatar_' + performerAvatars[index] + '.png');
					$(element).find('.block-title').html(performerNames[index]);					
				} else {
					$(element).addClass('hide');
				}
			});
			
			$( ".heart-bg" ).delay(votesTimer + 900).queue(function(next){
			    $(this).removeClass('animated').removeClass('zoomOut').removeClass('hide').addClass('animated').addClass('zoomIn');
			    next();
			});
			
			$('.winner-screen').delay(votesTimer + 1200).queue(function(next){
				$(this).removeClass('hide').addClass('animated').addClass('slideInUp');
				next();
			}).delay(2000).queue(function(next){
				$(this).removeClass('animated').addClass('slideInUp').addClass('animated').addClass('rotateOutDownRight');
				next();
			});
			
			$('.share-screen').delay(votesTimer + 3600).queue(function(next){
				$(this).removeClass('hide').addClass('animated').addClass('rotateInUpLeft');
				next();
			});
			
			//rewatch
			
			
			
			$(".share-screen .performer-block").each(function(index, element) {
				$(this).find(".review-clip").click(function(){			
					
					clearTimeout(timerRewatch);					

					$('.rewatch-screen .game-main .rewatch-video').attr('src',videos[index] + '#t=10,25');
					$('.rewatch-screen .game-main .screen-title').html(performerNames[index]);
					
					$('.share-screen').removeClass('animated').removeClass('rotateInUpLeft').addClass(" animated rotateOutDownLeft");
					$('.rewatch-screen').delay(400).queue(function(next){
						$(this).removeClass("hide").removeClass("animated").removeClass("rotateOutDownRight").addClass("animated").addClass("rotateInUpRight");
						next();
					});
					
					$('.rewatch-screen .game-main .rewatch-video')[0].currentTime=10;
					$('.rewatch-screen .game-main .rewatch-video').trigger('play');
					$('.rewatch-screen .card-performance-timer').html("<img src='img/timer.gif?timestamp=" + new Date().getTime() + "' />");
				    
				    
				    timerRewatch = setTimeout(function(){
						$('.rewatch-screen').removeClass("animated").removeClass("rotateInUpRight").addClass("animated").addClass("rotateOutDownRight");
						$('.rewatch-screen .game-main .rewatch-video').trigger('pause');
						$('.share-screen').delay(300).queue(function(next){
						    $(this).removeClass("animated").removeClass("rotateOutDownLeft").addClass("animated").addClass("rotateInUpLeft");
						    next();
						});
						timerRewatch = null;
						
					}, clipTime);
				    

					
				    
				});
			});	
			
			// back to share			
			
			
			$(".rewatch-screen .top-right-icon").click(function(){
				$('.rewatch-screen').removeClass("animated").removeClass("rotateInUpRight").addClass("animated").addClass("rotateOutDownRight");
				$('.rewatch-video').trigger('pause');
				$('.share-screen').delay(300).queue(function(next){
				    $(this).removeClass("animated").removeClass("rotateOutDownLeft").addClass("animated").addClass("rotateInUpLeft");
				    next();
				});
			});		
			
		}
	});

// next round
	
	$(".share-screen .next-round").click(function(){
		location.reload();
	});
	

	

});

