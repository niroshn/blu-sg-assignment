function find(now, schedule){
	var currentDate = now.getDay();
	var currentHours = now.getHours();
	var currentMinute = now.getMinutes();
	var currentMillisec = now.getTime();


    console.log(currentDate, currentHours, currentMinute);

    for (var i = currentDate-1; i<schedule.length; i++ ){

		if(schedule[i].open){
			var open_date_str = schedule[i].open_at.split(':')
			var close_date_str = schedule[i].close_at.split(':')
			var open_hr = parseInt(open_date_str[0])
			var open_min = parseInt(open_date_str[1])
			var close_hr = parseInt(close_date_str[0])
			var close_min = parseInt(close_date_str[1])


			var openTimeMillisec = (new Date()).setHours(0, open_hr, open_min, 0)
			var closeTimeMillisec = (new Date()).setHours(0, close_hr, close_min, 0)

			console.log(openTimeMillisec + "   " + closeTimeMillisec + "  " + currentMillisec);

			if ( (currentMillisec <=  openTimeMillisec) &&  (currentMillisec < closeTimeMillisec )){	
				return new Date((new Date()).setHours(0, open_hr+3, open_min, 0))
			}
			else if((currentMillisec >  openTimeMillisec) &&  (currentMillisec < closeTimeMillisec )){
				console.log('ass');

			}


            
        }
    }

	return new Date(closeTimeMillisec)
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
now.setHours(0,10,0,0);

console.log(find(now, schedule));