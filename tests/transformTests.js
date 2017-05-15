describe("transformerBattle", function(){
	it("should print the result of the battle", function(){
		var testArray = [
			["Soundwave", "D", 8,9,2,6,7,5,6,10],
			["Bluestreak", "A", 6,6,7,9,5,2,9,7],
			["Hubcap", "A", 4,4,4,4,4,4,4,4]
		];
		

		console.log = jasmine.createSpy("log");
		transformerBattle(testArray);
		expect(console.log).toHaveBeenCalledWith('1 battle(s)');
		expect(console.log).toHaveBeenCalledWith('Winning Team (D): Soundwave');
		expect(console.log).toHaveBeenCalledWith('Survivors from the losing team (A): Hubcap');
	});
	it("world should be distroyed", function(){
		var testArray = [
			["Optimus Prime", "A", 8,9,8,10,9,10,9,10],
			["Soundwave", "D", 8,9,2,6,7,5,6,10],
			["Bluestreak", "A", 6,6,7,9,5,2,9,7],
			["Predaking", "D", 8,9,8,10,9,10,9,10],
			["Hubcap", "A", 4,4,4,4,4,4,4,4]
		];

		console.log = jasmine.createSpy("log");
		transformerBattle(testArray);
		expect(console.log).toHaveBeenCalledWith('World Distroyed, everyone is dead...');
		
	});
});