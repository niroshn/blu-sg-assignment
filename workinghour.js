/*
# Objective:
write a function to find expiry datetime. expiry datetime is 3 working hours from "now".
the working hours is defined in "schedule" input parameter.
You can write the function in java or javascript programming language.
# input parameters:
now: datetime, current datetime. e.g: '2019-10-11T08:13:07+0800'
schedule: an arraylist of map object. which specified the day open or close and also the start and end of working hours
[
	{"open": false, "open_at": "", close_at: ""}, // sunday
	{"open": true, "open_at": "09:00", close_at: "18:00"}, // monday
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "17:00"},
	{"open": false, "open_at": "", close_at: ""},
]
# example:
now is friday 4pm. whith the above schedule, the expiry date should be next monday 11 am. because on friday office close
at 5pm and office is closed on weekend.
output: datetime, 3 working hour from input date ("now"), which is 11 am of next monday
*/

function find(now, schedule){
	try 
		{
			var currentDate = now.getDay();
			var calcute_time = 0;
			var calcululating = false ;
			var currentMillisec  = now.getTime(0);
			var date_count = 0;
			var i = currentDate ;

			while(date_count<7){
				currentMillisec = now.getTime() + date_count*24*60*60*1000;
				date_count =  date_count + 1;

				 
				if(schedule[i].open){
					var open_date_str = schedule[i].open_at.split(':')
					var close_date_str = schedule[i].close_at.split(':')
					var open_hr = parseInt(open_date_str[0])
					var open_min = parseInt(open_date_str[1])
					var close_hr = parseInt(close_date_str[0])
					var close_min = parseInt(close_date_str[1])

					var openTimeMillisec = (new Date(currentMillisec)).setHours(open_hr, open_min, 0, 0)
					var closeTimeMillisec = (new Date(currentMillisec)).setHours(close_hr, close_min, 0,0)

				
					if ( (currentMillisec <=  openTimeMillisec) &&  (currentMillisec < closeTimeMillisec )  && !(calcululating)){	

						return new Date((new Date(currentMillisec)).setHours(open_hr+3, open_min, 0, 0))
					}
					else if((currentMillisec >  openTimeMillisec) &&  (currentMillisec < closeTimeMillisec )  && !(calcululating) ){
						
						var expeted_end_time = (new Date(currentMillisec + 3*60*60*1000)) ;
						
						if(expeted_end_time <= closeTimeMillisec){
							return new Date(expeted_end_time);
						}
						else{
							calcute_time +=  (closeTimeMillisec - currentMillisec);
							calcululating = true; 
							
						}

					}
					else if((currentMillisec >  openTimeMillisec) &&  (currentMillisec >  closeTimeMillisec)){
						now.setHours(0,0,0,0);
					}
					else if (calcululating){
						var expire_time_gap_milli_sec = 3*60*60*1000 - calcute_time;
						var expire_time = openTimeMillisec + expire_time_gap_milli_sec;
						if(expire_time <= closeTimeMillisec){
							calcute_time = false;
							return new Date(expire_time)
						}
						
					}
					
					
				}
				

				if(i==6){
					i = 0;
				}
				else{
					i++;
				}	
				
			
			}
			
		}
	catch(e){
		return {}
	}

	
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






console.log(find((new Date('Tue Jun 23 2020 06:20:24 GMT+0800 (Singapore Standard Time)')), schedule).toString());

console.log(find((new Date('Tue Jun 23 2020 09:20:24 GMT+0800 (Singapore Standard Time)')), schedule).toString());

console.log(find((new Date('Tue Jun 23 2020 17:00:00 GMT+0800 (Singapore Standard Time)')), schedule).toString());

console.log(find((new Date('Fri Jun 26 2020 19:00:00 GMT+0800 (Singapore Standard Time)')), schedule).toString());

console.log(find((new Date('Fri Jun 26 2020 16:00:00 GMT+0800 (Singapore Standard Time)')), schedule).toString());

console.log(find( '', schedule));
