for(i = 0; i < 25; i++){
	document.getElementById("num_select").options[i] = new Option(i+1,i+1);
}

function sumLines(dim){
	var b = [];
	var line = [];
	var lineOut = [];
	for(i = 1; i < dim*dim+1; i++){
		b.push(i);
	}
	for(i = 0; i < dim*dim; i += dim){
		line = [];
		for(j = 0; j < dim; j++){
			line.push(b[i+j]);
		}
	lineOut.push(line);
	}
	for(i = 0; i < dim; i++){
		line = [];
		for(j = 0; j < dim*dim; j += dim){
			line.push(b[i+j]);
		}
		lineOut.push(line);
	}
	line = [];
	for(i = 0; i < dim*dim; i += dim+1){
		line.push(b[i]);
	}
	lineOut.push(line);
	line = [];
	for(i = dim-1; i < dim*dim-1; i += dim-1){
		line.push(b[i]);
	}
	lineOut.push(line);
	return lineOut;
}

function combine(array,len,start){
	var result = [];
	result.length = len;
	var combined = [];

	function recursive(array,len,start) {
		if(len === 0) {
			combined.push(result.slice(0,result.length));
			return;
		}
		for (var i = start; i <= array.length - len; i++) {
			result[result.length - len] = array[i];
			recursive(array, len-1, i+1);
		}
	}

	recursive(array, result.length, 0)
	return combined;
}

function winBingo(array){
	var concated = [];
	var winBingo = [];
	var tempArr = [];
	for(i = 0; i < array.length; i++){
		tempArr = array[i][0];
		for(j = 1; j < array[i].length; j++){
			tempArr = tempArr.concat(array[i][j]);
		}
		concated.push(tempArr);
	}
	for(i = 0; i < concated.length; i++){
		tempArr = [];
		for(j = 0; j < concated[i].length; j++){
			if(!tempArr.includes(concated[i][j])){
				tempArr.push(concated[i][j]);
			}
		}
		winBingo.push(tempArr);
	}
	return winBingo;
}

function getUnique(array,len){
	var uniqueLen = [];
	for(i = 0; i < array.length; i++){
		if(array[i].length == len){
			uniqueLen.push(array[i]);
		}
	}
	return uniqueLen;
}

function array2board(arr,dim){
	var tempStr = "";
	var tempArr1 = [];
	var tempArr2 = [];
	var starterArr = [];
	for(i = 1; i < dim*dim+1; i++){
		starterArr.push("__");
	}

	for(i = 0; i < arr.length; i++){
		tempArr1 = starterArr.slice(0,starterArr.length);
		for(j = 0; j < dim*dim; j++){
			tempArr1[arr[i][j]-1] = arr[i][j];
		}
		tempArr2.push(tempArr1);
	}

	var zero = "";
	for(i = 0; i < tempArr2.length; i++){
		tempStr += "["
		for(j = 0; j < tempArr2[i].length; j++){
			if(tempArr2[i][j] < 10){
				zero = "0";
			}
			else{
				zero = "";
			}
			if((j+1)%dim){
				tempStr += zero + tempArr2[i][j] + ","
			}
			else{
				tempStr += zero + tempArr2[i][j] + "]<br>"
				if(j+1 < tempArr2[i].length-1){
					tempStr += "[";
				}
			}
		}
		tempStr += "<br>"
	}
	return tempStr;
}

function Bingo(){
	var num = document.getElementById("num_select").value;
	var dim = 5;
	var lines = sumLines(dim);

	var winLines = winBingo(combine(lines, dim, 0));

	var unique = getUnique(winLines,num);
	var ways = array2board(unique,dim);
	var plural = "";
	if(num == 1){
		plural = " number";
	}
	else{
		plural = " numbers";
	}
	if(unique.length){
		document.getElementById("div01b").innerHTML = "Number of ways to win 5 line bingo using exactly " + num + plural + ": " + unique.length + "<br>Ways to win:<br><br>" + ways;
	}
	else{
		document.getElementById("div01b").innerHTML = "There are no ways to win 5 line bingo using exactly " + num + plural + "."
	}
}