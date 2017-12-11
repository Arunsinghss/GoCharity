
$(document).ready(function(){

	$('.upkey').hide();
	$('.downkey').hide();
	$('.leftkey').hide();
	$('.rightkey').hide();
	$('.scorelabel').hide();
	$('.buttons').hide();

	m = parseInt($('.hiddenoption').val())-1;
	n = parseInt($('.hiddenoption').val())-1;
	max = m;
	maxsize = m*m;
	b= m+1;
	boxcolor = b*b;

	function getUniqueId(id){	

		if($('#'+id).text() == ''){
			return false;
		}else{
			return true;
		}	
	}

	function setOnUniqueId(){
		do{
			var randomid = getRandomNumber(1,maxsize);
		}while(getUniqueId(randomid));
		$('#'+randomid).text(getRandomOnkey(2,4));
	}

	function setColor(){
		for(var i=1;i<=boxcolor;i++){
			console.log(i);
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
	setColor();
	$('.start').click(function(){

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
		setOnUniqueId();
		// setTimeout(setOnUniqueId(), 10000);	
	}	

	$('.upkey').click(function(){

		grid();
		var changedrow=[];

		for(i=1;i<=m;i++){		
			for(j=0;j<=n;j++){				
				if(a[i][j] == 0){
					continue;					
				}
				else{
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
							a[i][j] = 0;
						}
						else{
							continue;
						}
					}
				}
			}
		} 		
		drawGrid(a);
		setColor();
	});
	
	$('.leftkey').click(function(){

		grid();
		var leftarray = [];
		for(i=0;i<=m;i++){
			for(j=1;j<=n;j++){				
				if(a[i][j] == 0){
					continue;					
				}
				else{
					k=1;
					if(a[i][j-k] == 0){
						if (j-k == 0){
							a[i][j-k] = a[i][j];
							a[i][j] = 0;
						}
						else{
							c=k+1;
							while(j-c >= 0){
								if(a[i][j-c] == 0){									
									c++;
								}
								else{
									break;
								}
							}
							if(a[i][j-c] == 0){
								a[i][j-c] = a[i][j];
								a[i][j] = 0;
								}
							else{
								if(a[i][j-c] == a[i][j]){

									for(col=0;col<leftarray.length;col++){
										if (col == i){
											var present = true;
											break;
										}else{
											var present = false;
										}
									}
									if(present == true){
										a[i][j-(c-1)] = a[i][j];
										a[i][j] = 0;
									}
									else{
										a[i][j-c] *= 2;
										a[i][j] = 0;
										leftarray.push[i];
									}
								}
								else{
									a[i][j-(c-1)] = a[i][j];
									a[i][j] = 0;
								}
							}
						}
					}
					else{
						if(a[i][j-k] == a[i][j]){
							a[i][j-k] *= 2;
							a[i][j] = 0;
						}
						else{
							continue;
						}
					}
				}
			}
		} 
		drawGrid(a);
		setColor();
	});

	$('.downkey').click(function(){
		console.log('downkey')
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
							a[i][j] = 0;
						}
						else{
							continue;
						}
					}
				}
			}
		}
		 
		drawGrid(a);
		setColor();
	});

	$('.rightkey').click(function(){

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
							a[i][j] = 0;
						}
						else{
							continue;
						}
					}
				}
			}
		} 
		
		drawGrid(a);
		setColor();
	});

});

