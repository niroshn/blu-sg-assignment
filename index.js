function find(now, schedule){
    var currentDate = now.getDay();
    console.log(currentDate);

    for (var i = currentDate-1; i<schedule.length; i++ ){
        if(schedule[i].open){
            console.log('sss');
        }
    }

	return new Date(now.getTime() + (3 * 60 * 60 * 1000))
}




var schedule = [
	{"open": false, "open_at": "", close_at: ""}, // sunday
	{"open": true, "open_at": "09:00", close_at: "18:00"}, // monday
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "17:00"},
	{"open": false, "open_at": "", close_at: ""},
];

var now = new Date();

console.log(find(now, schedule));