function buildCastles(landArr){
	var lastCastle;
	var lastIdx;
	var castleArr = [];
	for(var i = 0; i < landArr.length; i++){
		if(i === 0){
			castleArr.push("C");
		}else if(landArr[i] > landArr[i - 1]){
			markCastle("C^", i);
		}else if(landArr[i] < landArr[i - 1]){
			markCastle("Cv", i);
		}else{
			castleArr.push(null);
		}
	}

	function markCastle(type, idx){
		castleArr.push(type);
		wasFalseCastle(type);
		lastIdx = i;
		lastCastle = type;
	}

	function wasFalseCastle(type){
		if(lastCastle === type){
			castleArr[lastIdx] =  null;
		}
	}
	

	return castleArr;


	
}