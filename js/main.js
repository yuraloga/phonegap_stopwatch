var BUTTON_STATES = ["Start", "Stop"];
var PROCESS_BUTTON_ID = 'processButton';
var HOURS_INPUT_ID = 'hours';
var MINUTES_INPUT_ID = 'minutes';
var SECONDS_INPUT_ID = 'seconds';

window.onload = function() {
	stopWatch.initialize();
};

var stopWatch = {
	hours: 0,
	minutes: 0,
	seconds: 0,
	startAt: 0,
	intervalId: 0,
	initialize: function() {
		stopWatch.updateUI(0, 0, 0);
	},
	clear: function() {
		this.hours = 0;
		this.minutes = 0;
		this.seconds = 0;
	},
	updateUI: function(hours, minutes, seconds) {
		var hoursInput = document.getElementById(HOURS_INPUT_ID);
	        var minutesInput = document.getElementById(MINUTES_INPUT_ID);
	        var secondsInput = document.getElementById(SECONDS_INPUT_ID);
	        hoursInput.textContent = formatter.format(hours);
	        minutesInput.textContent = formatter.format(minutes);
	        secondsInput.textContent = formatter.format(seconds);
	},
	process: function() {
	        var processButton = document.getElementById(PROCESS_BUTTON_ID);
	        if (processButton.value == BUTTON_STATES[0]) {
        	        processButton.value = BUTTON_STATES[1];
	                startAt = timeProvider.getTime();
	                this.intervalId = setInterval("stopWatch.update(startAt)", 100);
	        } else {
        	        processButton.value = BUTTON_STATES[0];
	                stopWatch.stop(this.intervalId);
	        } 
	},
	update: function(startAt) {
	        elapsedTime = stopWatch.calcElapsedTime(startAt);
	        stopWatch.updateUI(elapsedTime.hours, elapsedTime.minutes, elapsedTime.seconds);
	},
	calcElapsedTime: function(startAt) {
	        var elapsedTime = {
	                hours: 0,
	                minutes: 0,
	                seconds: 0
	        };
	        var time = timeProvider.getTime() - startAt;
	        elapsedTime.hours = Math.floor(time / (60 * 60 * 1000));
	        time %= (60 * 60 * 1000);
	        elapsedTime.minutes = Math.floor(time / (60 * 1000));
	        time %= (60 * 1000);
	        elapsedTime.seconds = Math.floor(time / 1000);
	
	        return elapsedTime;
	},
	stop: function(intervalId) {
	        stopWatch.updateUI(0, 0, 0);
	        clearInterval(intervalId);
	}
};

var timeProvider = {
	getTime: function() {
		return new Date().getTime();
	}
};

var formatter = {
        format: function(timeUnit) {
                var DEFAULT_PAD_SIZE = 2;
                return timeUnit.toString().length < DEFAULT_PAD_SIZE ? "0" + timeUnit : timeUnit;
        }
}
