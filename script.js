$(document).ready(function () {
	let interval;
	let elapsedTime = 0;
	const changeInterval = 30;
	let resistanceCounter = 0;

	const baseSPM = 80;
	const stepHeight = 0.18;
	const floorHeight = 3;
	const caloriesPerStep = 0.05;
	const fatigueFactor = 0.005;
	const heartRateIncrease = 1 / 60;
	const baseHeartRate = 110;

	let totalCalories = 0;
	let totalFloors = 0;
	let SPM = baseSPM;
	let heartRate = baseHeartRate;

	startMetrics();

	function startMetrics() {
		startTime();
		startFloors();
		startCalories();
		startHeartRate();
		createGraphBars();
		startIntinsityLevel();
		startSPM();
	}

	function updateMetrics() {
		updateTime(elapsedTime);
		updateFloors(totalFloors);
		updateCalories(totalCalories);
		updateHeartRate(heartRate);
		updateGraphBars();
		updateIntinsityLevel(resistanceData[0]);
		updateSPM(SPM);
	}

	function changeResistance() {
		resistanceData.shift();
		const resistance = Math.ceil(Math.random() * maxLevel);
		resistanceData.push(resistance);

		updateGraphBars();
	}

	$("#start").on("click", function () {
		if (!interval) {
			interval = setInterval(simulateWorkout, 1000);
		}
	});

	$("#pause").on("click", function () {
		clearInterval(interval);
		interval = null;
	});

	$("#reset").on("click", function () {
		clearInterval(interval);
		interval = null;
		elapsedTime = 0;
		totalFloors = 0;
		calories = 0;
		heartRate = 0;
		SPM = 0;
		resistanceData = [];
		updateMetrics();
	});

	function calculateSPM(resistance, time) {
		const reductionFactor = 0.05 * resistance;
		const fatigueEffect = 1 - fatigueFactor * time;
		return Math.max(baseSPM * (1 - reductionFactor) * fatigueEffect, 20);
	}

	function calculateFloors(spm) {
		const totalHeight = spm * (1 / 60) * stepHeight;
		return totalHeight / floorHeight;
	}

	function calculateCalories(spm) {
		return spm * (1 / 60) * caloriesPerStep;
	}

	function calculateHeartRate(resistance) {
		const resistanceEffect = (1 + Math.random()) * resistance;
		const timeEffect = (elapsedTime / 60) * heartRateIncrease;
		return Math.min(baseHeartRate + resistanceEffect + timeEffect, 170);
	}

	function simulateWorkout() {
		if (resistanceCounter >= changeInterval) {
			changeResistance();
			resistanceCounter = 0;
		}
		const resistance = resistanceData[0];

		const spm = calculateSPM(resistance, elapsedTime / 60);
		const calories = calculateCalories(spm);
		const floors = calculateFloors(spm);
		heartRate = calculateHeartRate(resistance);

		totalCalories += calories;
		totalFloors += floors;
		SPM = spm;

		updateMetrics();

		elapsedTime++;
		resistanceCounter++;
	}
});
