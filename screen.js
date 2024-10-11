var timeDigits = {};
var floorsDigits = {};
var caloriesDigits = {};
var heartRateDigits = {};
var resistanceLevels = {};
var resistanceDigits = {};
var SPMDigits = {};

const $timeDisplay = $("#time");
const $floorsDisplay = $("#floors");
const $caloriesDisplay = $("#calories");
const $heartRateDisplay = $("#heart-rate");
const $resistanceDisplay = $("#resistance-level");
const $spmDisplay = $("#spm");
const $graph = $(".screen-resistance");

const numBars = 16;
const maxLevel = 8;
let resistanceData = [];
for (i = 1; i <= numBars; i++) {
	const resistance = Math.ceil(Math.random() * maxLevel);
	resistanceData.push(resistance);
}

function createGraphBars() {
	for (let i = 1; i <= numBars; i++) {
		const $dots = $("<div>");
		for (let x = 1; x <= maxLevel; x++) {
			$dots.append('<span class="d' + x + '">');
		}
		resistanceLevels[`c${i}`] = $dots;
		const $level = $(`<div class="c${i}">`).append(
			$('<div class="level">').append($dots)
		);
		$graph.append($level);
	}
}

function updateGraphBars() {
	if (!resistanceData.length) {
		for (let i = 1; i <= numBars; i++) {
			const resistance = Math.ceil(Math.random() * maxLevel);
			resistanceData.push(resistance);
		}
	}
	for (let i = 1; i <= numBars; i++) {
		const resistanceLevel = resistanceData[i - 1];
		resistanceLevels[`c${i}`].attr("class", `l${resistanceLevel}`);
	}
}

function startTime() {
	var positions = ["m1", "m2", ":", "s1", "s2"];

	$.each(positions, function () {
		if (this == ":") {
			const $dots = $('<div class="dots">');
			timeDigits["dots"] = $dots;
			$timeDisplay.append($dots);
		} else {
			const $sections = $("<div>");
			for (var i = 1; i < 8; i++) {
				$sections.append('<span class="d' + i + '">');
			}
			timeDigits[this] = $sections;
			const $digit = $(`<div class="${this}">`).append(
				$('<div class="digit">').append($sections)
			);
			$timeDisplay.append($digit);
		}
	});
}

function updateTime(elapsedTime) {
	const minutes = Math.floor(elapsedTime / 60);
	var m1 = Math.floor(minutes / 10);
	var m2 = minutes % 10;
	const seconds = elapsedTime % 60;
	var s1 = Math.floor(seconds / 10);
	var s2 = seconds % 10;

	timeDigits.m1.attr("class", `n${m1}`);
	timeDigits.m2.attr("class", `n${m2}`);
	timeDigits.s1.attr("class", `n${s1}`);
	timeDigits.s2.attr("class", `n${s2}`);
	timeDigits.dots.attr("class", "dots active");
}

function startFloors() {
	var positions = ["f1", "f2", ".", "f3"];

	$.each(positions, function () {
		if (this == ".") {
			const $dots = $('<div class="dots">');
			floorsDigits["dots"] = $dots;
			$floorsDisplay.append($dots);
		} else {
			const $sections = $("<div>");
			for (var i = 1; i < 8; i++) {
				$sections.append('<span class="d' + i + '">');
			}
			floorsDigits[this] = $sections;
			const $digit = $(`<div class="${this}">`).append(
				$('<div class="digit">').append($sections)
			);
			$floorsDisplay.append($digit);
		}
	});
}

function updateFloors(totalFloors) {
	const hundreds = Math.floor(totalFloors / 100);

	const tens = Math.floor((totalFloors / 10) % 10);
	const ones = Math.floor(totalFloors % 10);

	const parts = Math.floor((totalFloors % 1) / 0.1);

	if (hundreds) {
		floorsDigits.f1.attr("class", `n${hundreds}`);
		floorsDigits.f2.attr("class", `n${tens}`);
		floorsDigits.f3.attr("class", `n${ones}`);
	} else {
		floorsDigits.f1.attr("class", `n${tens}`);
		floorsDigits.f2.attr("class", `n${ones}`);
		floorsDigits.dots.attr("class", "dots active");
		floorsDigits.f3.attr("class", `n${parts}`);
	}
}
function startCalories() {
	var positions = ["c1", "c2", "c3"];

	$.each(positions, function () {
		const $sections = $("<div>");
		for (var i = 1; i < 8; i++) {
			$sections.append('<span class="d' + i + '">');
		}
		caloriesDigits[this] = $sections;
		const $digit = $(`<div class="${this}">`).append(
			$('<div class="digit">').append($sections)
		);
		$caloriesDisplay.append($digit);
	});
}
function updateCalories(totalCalories) {
	const hundreds = Math.floor(totalCalories / 100);
	const tens = Math.floor((totalCalories / 10) % 10);
	const ones = Math.floor(totalCalories % 10);

	caloriesDigits.c1.attr("class", `n${hundreds}`);
	if (tens) {
		caloriesDigits.c2.attr("class", `n${tens}`);
	}
	caloriesDigits.c3.attr("class", `n${ones}`);
}

function startHeartRate() {
	var positions = ["h1", "h2", "h3"];

	$.each(positions, function () {
		const $sections = $("<div>");
		for (var i = 1; i < 8; i++) {
			$sections.append('<span class="d' + i + '">');
		}
		heartRateDigits[this] = $sections;
		const $digit = $(`<div class="${this}">`).append(
			$('<div class="digit">').append($sections)
		);
		$heartRateDisplay.append($digit);
	});
}
function updateHeartRate(heartRate) {
	const hundreds = Math.floor(heartRate / 100);
	const tens = Math.floor((heartRate / 10) % 10);
	const ones = Math.floor(heartRate % 10);

	heartRateDigits.h1.attr("class", `n${hundreds}`);
	heartRateDigits.h2.attr("class", `n${tens}`);
	heartRateDigits.h3.attr("class", `n${ones}`);
}

function startIntinsityLevel() {
	var positions = ["r1", "r2", "r3"];

	$.each(positions, function () {
		const $sections = $("<div>");
		for (var i = 1; i < 8; i++) {
			$sections.append('<span class="d' + i + '">');
		}
		resistanceDigits[this] = $sections;
		const $digit = $(`<div class="${this}">`).append(
			$('<div class="digit">').append($sections)
		);
		$resistanceDisplay.append($digit);
	});
}
function updateIntinsityLevel(level) {
	const hundreds = Math.floor(level / 100);
	const tens = Math.floor((level / 10) % 10);
	const ones = Math.floor(level % 10);

	resistanceDigits.r1.attr("class", `n${hundreds}`);
	if (tens) {
		resistanceDigits.r2.attr("class", `n${tens}`);
	}
	resistanceDigits.r3.attr("class", `n${ones}`);
}

function startSPM() {
	var positions = ["s1", "s2", "s3"];

	$.each(positions, function () {
		const $sections = $("<div>");
		for (var i = 1; i < 8; i++) {
			$sections.append('<span class="d' + i + '">');
		}
		SPMDigits[this] = $sections;
		const $digit = $(`<div class="${this}">`).append(
			$('<div class="digit">').append($sections)
		);
		$spmDisplay.append($digit);
	});
}
function updateSPM(spm) {
	const hundreds = Math.floor(spm / 100);
	const tens = Math.floor((spm / 10) % 10);
	const ones = Math.floor(spm % 10);

	SPMDigits.s1.attr("class", `n${hundreds}`);
	SPMDigits.s2.attr("class", `n${tens}`);
	SPMDigits.s3.attr("class", `n${ones}`);
}
