
$(document).ready(function(){

	$('.upkey').hide();
	$('.downkey').hide();
	$('.leftkey').hide();
	$('.rightkey').hide();
	$('.scorelabel').hide();
	$('.buttons').hide();
	$('.score').hide();

	m = parseInt($('.hiddenoption').val())-1;
	n = parseInt($('.hiddenoption').val())-1;
	max = m;
	maxsize = m*m;
	b= m+1;
	gridsize = b*b;
	score = 0;
	// currentscore = 0;

	function getScreenGrid(){
		previous = new Array();
		for(var i=0;i<=m;i++){
			previous[i] = new Array();
			for(var j=0;j<=n;j++){
				if($('.cells[data-x="'+i+'"][data-y="'+j+'"]').text() == ''){
					previous[i][j]= 0;
				}else{
					previous[i][j]= parseInt($('.cells[data-x="'+i+'"][data-y="'+j+'"]').text());
				}
			}
		}
	}
	
	getScreenGrid();

	function getUniqueId(id){

		if($('#'+id).text() == ''){
			return false;
		}else{
			return true;
		}	
	}

	function setOnUniqueId(){
		newvalue = 0;
		do{
			var randomid = getRandomNumber(1,gridsize);
		}while(getUniqueId(randomid));
		$('#'+randomid).text(getRandomOnkey(2,4));
		newvalue = parseInt($('#'+randomid).text());
	}

	function endGame(){
		var isempty = false;
		for(var i=1;i<=gridsize;i++){
			if($('#'+i).text() == ''){
				isempty = true;
				break;
			}else{
				continue;
			}
		}

		if(isempty == true){
			setOnUniqueId();
		}
	}

	function newGame(){
		for(var i=1;i<=gridsize;i++){
			$('#'+i).text('');
		}
		$('#'+getRandomNumber(1,16)).text("2");
		$('#'+getRandomNumber(1,16)).text("2");
		score = 4;
	}

	function callCheckStatus(){
		console.log('entered call status')
		oldone = new Array();
		for(var i=0;i<=m;i++){
			oldone[i] = new Array();
			for(var j=0;j<=n;j++){
				if($('.cells[data-x="'+i+'"][data-y="'+j+'"]').text() == ''){
					oldone[i][j]= 0;
				}else{
					oldone[i][j]= parseInt($('.cells[data-x="'+i+'"][data-y="'+j+'"]').text());
				}
			}
		}
		can_call = true;
		for(i=0;i<=m;i++){
			for(j=0;j<=m;j++){
				
				if(oldone[i][j] == 0){
					console.log('got empty')
					can_call = false;
					break;
				}
			}
		}

		if(can_call == true){
			console.log('entering')
			// checkStatus();
		}
	}

	// function checkStatus(){
	// 	getScreenGrid();
	// 	can_move_up = false;
	// 	can_move_down = false;
	// 	can_move_left = false;
	// 	can_move_right = false;

	// 	shiftUp();
	// 	for(i=0;i<=m;i++){
	// 		for(j=0;j<=m;j++){
	// 			console.log('hello')
	// 			console.log(previous[i][j])
	// 			console.log('hello')
	// 			if(previous[i][j] != a[i][j]){
	// 				can_move_up = true;
	// 				break;
	// 			}
	// 		}
	// 	}

	// 	shiftDown();
	// 	for(i=0;i<=m;i++){
	// 		for(j=0;j<=m;j++){
	// 			console.log('hello')
	// 			console.log(previous[i][j])
	// 			console.log('hello')
	// 			if(previous[i][j] != a[i][j]){
	// 				can_move_down = true;
	// 				break;
	// 			}
	// 		}
	// 	}

	// 	shiftLeft();
	// 	for(i=0;i<=m;i++){
	// 		for(j=0;j<=m;j++){
	// 			if(previous[i][j] != a[i][j]){
	// 				can_move_left = true;
	// 				break;
	// 			}
	// 		}
	// 	}

	// 	shiftRight();
	// 	for(i=0;i<=m;i++){
	// 		for(j=0;j<=m;j++){
	// 			if(previous[i][j] != a[i][j]){
	// 				can_move_right = true;
	// 				break;
	// 			}
	// 		}
	// 	}
		
	// 	if(can_move_up == false && can_move_down == false && can_move_left == false && can_move_right == false){
	// 		alert("Game Over....");
	// 		newGame();
	// 	}
	// }	

	function highScore(newvalue){
		var change_score = false;
		for(i=1;i<=m;i++){
			for(j=0;j<=n;j++){
				if(previous[i][j] != a[i][j]){
					change_score = true;
					break;
				}
			}
		}

		if (change_score == true){
			// score += newvalue;
			$('.score').text(score);
		}
		
	}

	function setColor(){
		for(var i=1;i<=gridsize;i++){
			
			if($('#'+i).text() == '2'){
				$('#'+i).css("background","white");
			}else if($('#'+i).text() == ''){
				$('#'+i).css("background","#ccc0b3");
			}else if($('#'+i).text() == '4'){
				$('#'+i).css("background","#FBEEE6");
			}else if($('#'+i).text() == '8'){
				$('#'+i).css("background","#f2b179");
			}else if($('#'+i).text() == '16'){
				$('#'+i).css("background","#f67c5f");
			}else if($('#'+i).text() == '32'){
				$('#'+i).css("background","#C0392B");
			}else if($('#'+i).text() == '64'){
				$('#'+i).css("background","#2980B9");
			}else if($('#'+i).text() == '128'){
				$('#'+i).css("background","#FCF3CF");
			}else if($('#'+i).text() == '256'){
				$('#'+i).css("background","#76D7C4");
			}else if($('#'+i).text() == '512'){
				$('#'+i).css("background","#F9E79F");
			}else if($('#'+i).text() == '1024'){
				$('#'+i).css("background","#F6DDCC");	
			}else{
				$('#'+i).css("background","#ebadfa");
			}
		}
	}

	function getRandomNumber(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getRandomOnkey(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		do{
			value =  Math.floor(Math.random() * (max - min + 1)) + min;
		}while(value == 3);
		return value;
	}

	function emptyGrid(){
		for(i=0;i<=m;i++){
			for(j=0;j<=n;j++){
				$('.cells[data-x="'+i+'"][data-y="'+j+'"]').text('');
			}
		}
	}

	setColor();
	$('.start').click(function(){
		emptyGrid();
		$('#'+getRandomNumber(1,16)).text("2");
		$('#'+getRandomNumber(1,16)).text("2");
		$('.start').hide();
		$('.scorelabel').show();
		$('.upkey').show();
		$('.downkey').show();
		$('.leftkey').show();
		$('.rightkey').show();
		$('.buttons').show();
		setColor();
		score = 4;
		$('.score').show();
		$('.score').text(score);
	});

	function grid(){
		a = new Array();
		for(var i=0;i<=m;i++){
			a[i]=new Array();
			for(var j=0;j<=n;j++){
				if($('.cells[data-x="'+i+'"][data-y="'+j+'"]').text() == ''){
					a[i][j] = 0;
				}else{
					a[i][j] = parseInt($('.cells[data-x="'+i+'"][data-y="'+j+'"]').text());
				}				
			}
		}
	}	

	function drawGrid(a){
		for(i=0;i<=m;i++){
			for(j=0;j<=n;j++){
				if(a[i][j] == 0){
					$('.cells[data-x="'+i+'"][data-y="'+j+'"]').text('');
				}else{
				 	$('.cells[data-x="'+i+'"][data-y="'+j+'"]').text(a[i][j]);
				}
			}
		}
		endGame();
	}	

	function drawGridSetColorSetScore(){
		drawGrid(a);
		highScore(newvalue);
		setColor();
	}

	$(document).keyup(function(e){
		if(e.keyCode == 38){
			callCheckStatus();
			shiftUp();
		}
		if(e.keyCode == 37){
			callCheckStatus();		
			shiftLeft();
		}
		if(e.keyCode == 40){
			callCheckStatus();	
			shiftDown();
		}
		if(e.keyCode == 39){
			callCheckStatus();
			shiftRight();
		}
	});	

	$('.upkey').click(function(){
		console.log('entered key function')
		callCheckStatus();
		shiftUp();
	});

	$('.leftkey').click(function(){	
		console.log('entered key function')
		callCheckStatus();	
		shiftLeft();
	});

	$('.downkey').click(function(){
		console.log('entered key function')
		callCheckStatus();
		shiftDown();
	});

	$('.rightkey').click(function(){
		console.log('entered key function')
		callCheckStatus();
		shiftRight();
	});

	function shiftUp(){
		console.log('called upkey')
		grid();
		var changedrow=[];
		for(i=1;i<=m;i++){
			for(j=0;j<=n;j++){				
				if(a[i][j] == 0){
					console.log('1')
					continue;					
				}
				else{
					console.log('2')
					k=1;
					if(a[i-k][j] == 0){
						if (i-k == 0){
							a[i-k][j] = a[i][j];
							a[i][j] = 0;
						}
						else{
							c=k+1;
							while(i-c >= 0){
								console.log('5');
								if(a[i-c][j] == 0){									
									c++;
								}
								else{
									break;
								}
							}
							if(a[i-(c-1)][j] == 0){
								a[i-(c-1)][j] = a[i][j];
								a[i][j] = 0;
								}
							else{
								if(a[i-(c-1)][j] == a[i][j]){
									for(col=0;col<changedrow.length;col++){
										if (col == i){
											var present = true;
											break;
										}else{
											var present = false;
										}
									}

									if(present == true){
										a[i-(c-1)][j] = a[i][j];
										a[i][j] = 0;
									}
									else{
										a[i-(c-1)][j] *= 2;
										score += a[i-(c-1)][j];
										a[i][j] = 0;
										changedrow.push[j];
									}
								}
								else{
									a[i-(c-1)][j] = a[i][j];
									a[i][j] = 0;
								}
							}
						}
					}
					else{
						if(a[i-k][j] == a[i][j]){
							a[i-k][j] *= 2;
							score += a[i-k][j];
							a[i][j] = 0;
						}
						else{
							continue;
						}
					}
				}
			}
		}
		 		
		drawGridSetColorSetScore();
	}

	function shiftDown(){
		console.log('called down key')
		grid();
		var downarray=[];
		for(i=m-1;i>=0;i--){
			for(j=0;j<=n;j++){
				if(a[i][j] == 0){
					continue;					
				}
				else{
					k=1;
					if(a[i+k][j] == 0){
						if (i+k == max){
							a[i+k][j] = a[i][j];
							a[i][j] = 0;
						}
						else{
							c=k+1;

							while(i+c < max){
								if(a[i+c][j] == 0){								
									c++;
								}
								else{
									break;
								}
							}
							if(a[i+c][j] == 0){
								a[i+c][j] = a[i][j];
								a[i][j] = 0;
								}
							else{
								if(a[i+c][j] == a[i][j]){
									for(col=0;col<downarray.length;col++){
										if (col == i){
											var present = true;
											break;
										}else{
											var present = false;
										}
									}
									if(present == true){
										a[i+(c-1)][j] = a[i][j];
										a[i][j] = 0;
									}
									else{
										a[i+c][j] *= 2;
										score += a[i+c][j];
										a[i][j] = 0;
										downarray.push[j];
									}
								}
								else{
									a[i+(c-1)][j] = a[i][j];
									a[i][j] = 0;
								}
							}
						}
					}
					else{
						if(a[i+k][j] == a[i][j]){
							a[i+k][j] *= 2;
							score += a[i+k][j];
							a[i][j] = 0;
						}
						else{
							continue;
						}
					}
				}
			}
		}
		drawGridSetColorSetScore();
	}

	function shiftLeft(){
		console.log('called left key')
		grid();
		var leftarray = [];
		for(i=0;i<=m;i++){
			for(j=1;j<=n;j++){				
				if(a[i][j] == 0){
					console.log('1');
					continue;					
				}
				else{
					console.log('2');
					k=1;
					if(a[i][j-k] == 0){
						if (j-k == 0){
							console.log('3');
							a[i][j-k] = a[i][j];
							a[i][j] = 0;
						}
						else{
							console.log('4');
							c=k+1;
							while(j-c >= 0){
								console.log('5');
								if(a[i][j-c] == 0){									
									c++;
								}
								else{
									break;
								}
							}
							if(a[i][j-c] == 0){
								console.log('6');
								a[i][j-c] = a[i][j];
								a[i][j] = 0;
								}
							else{
								if(a[i][j-c] == a[i][j]){
									console.log('7');

									for(col=0;col<leftarray.length;col++){
										if (col == i){
											var present = true;
											break;
										}else{
											var present = false;
										}
									}
									if(present == true){
										console.log('8');
										a[i][j-(c-1)] = a[i][j];
										a[i][j] = 0;
									}
									else{
										console.log('9');
										a[i][j-c] *= 2;
										score += a[i][j-c];
										a[i][j] = 0;
										leftarray.push[i];
									}
								}
								else{
									console.log('10');
									a[i][j-(c-1)] = a[i][j];
									a[i][j] = 0;
								}
							}
						}
					}
					else{
						if(a[i][j-k] == a[i][j]){
							console.log('11');
							a[i][j-k] *= 2;
							score += a[i][j-k];
							a[i][j] = 0;
						}
						else{
							console.log('12');
							continue;
						}
					}
				}
			}
		} 
		drawGridSetColorSetScore();
	}

	function shiftRight(){
		console.log('called right key')
		grid();
		var rightarray = [];
		for(i=0;i<=m;i++){
			for(j=n-1;j>=0;j--){				
				if(a[i][j] == 0){
					continue;					
				}
				else{
					k=1;
					if(a[i][j+k] == 0){
						if (j+k == max){
							a[i][j+k] = a[i][j];
							a[i][j] = 0;
						}
						else{
							c=k+1;
							while(j+c < max){
								if(a[i][j+c] == 0){									
									c++;
								}
								else{
									break;
								}
							}
							if(a[i][j+c] == 0){
								a[i][j+c] = a[i][j];
								a[i][j] = 0;
								}
							else{

								if(a[i][j+c] == a[i][j]){
									for(col=0;col<rightarray.length;col++){
										if (col == i){
											var present = true;

											break;
										}else{
											var present = false;
										}
									}

									if(present == true){
										a[i][j+(c-1)] = a[i][j];
										a[i][j] = 0;
									}
									else{
										a[i][j+c] *= 2;
										score += a[i][j+c];
										a[i][j] = 0;
										rightarray.push[i];
									}
								}
								else{
									a[i][j+(c-1)] = a[i][j];
									a[i][j] = 0;
								}
							}
						}
					}
					else{
						if(a[i][j+k] == a[i][j]){
							a[i][j+k] *= 2;
							score += a[i][j+k];
							a[i][j] = 0;
						}
						else{
							continue;
						}
					}
				}
			}
		} 
		drawGridSetColorSetScore();
	}


});

