describe('buildCastles', function(){
	it('should build castles at switching maxima and minima', function(){
		var testLand1 = [2,5,4,7,3,8,15,2,53,8,4,3,7,4,7,4,65,345,67,3,2];
		// var resultLand1 = ["C","C^","Cv","C^","Cv",null,"C^","Cv","C^",null,null,"Cv","C^","Cv","C^","Cv",null,"C^",null,null,"Cv"];

		expect(buildCastles(testLand1)).toBe(15);
	});
});