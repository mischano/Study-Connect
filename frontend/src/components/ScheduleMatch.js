// Given a user object, returns a hashmap of 
// the user's classes sorted by day (M-F)
function groupClassesByDay(user) {
   let classesByDay = new Map([
      ['M', []],
      ['T', []],
      ['W', []],
      ['R', []],
      ['F', []]
   ]);
   let classes = user.classes;

   for (var i = 0; i < classes.length; i++) {
      let weekDays = classes[i].weekDays;
      for (let weekDay of weekDays)
         classesByDay.get(weekDay).push(classes[i]);
   }
   return classesByDay;
}

// Given a list of hashmaps (classes sorted by day),
// returns an overall hashmap combining all of the classes
function combineClasses(maps) {
   let classesByDay = new Map([
      ['M', []],
      ['T', []],
      ['W', []],
      ['R', []],
      ['F', []]
   ]);

   for (var i = 0; i < maps.length; i++) {
      let userMap = maps[i];
      
      for (const [key, val] of userMap.entries()) {
         for (var j = 0; j < val.length; j++) {
            classesByDay.get(key).push(...[val[j]]);
         }
      }
   }
   return classesByDay;
}

// Given a time (as a string), returns the numerical 
// value for comparison
function convertToInt(time) {
   var hm = time.split(':');
   return Math.ceil(parseInt(hm[1]) + parseInt(hm[0]) * 60);
}

// Given a list of classes in a given day, returns a merged list
// of class times showing unavailable times
function mergeRanges(classes) {
   if (classes === [])
      return [];

   var sortedClasses = classes.slice().sort(function(a, b) {
      return a.startTime > b.startTime ? 1 : -1;
   });
   
   var mergedClasses = [sortedClasses[0]];

   for (var i = 1; i < sortedClasses.length; i++) {
      var curClass = sortedClasses[i];
      var lastMerged = mergedClasses[mergedClasses.length - 1];

      if (convertToInt(curClass.startTime) <= convertToInt(lastMerged.endTime)) {
         lastMerged.endTime = (convertToInt(lastMerged.endTime) > convertToInt(curClass.endTime) ?
                               lastMerged.endTime : curClass.endTime);
      } else {
         mergedClasses.push(curClass);
      }
   }
   return mergedClasses;
}

// Given a list of users, returns a merged list of availability
// between all of the users
function getBusyTimes(users) {
   let maps = [];
   let unavailableTimes = [];
   
   for (var i = 0; i < users.length; i++) 
      maps.push(groupClassesByDay(users[i]));

   let allClasses = combineClasses(maps);
   
   for (const [key, val] of allClasses.entries()) {
      unavailableTimes.push(mergeRanges(val));
   }
   return unavailableTimes;
}

// Given a list of available times, filters out slots
// that are less than 30 min
function filterAvailableTimes(times) {
   let filtered = [];

   for (var i = 0; i < times.length; i++) {
      var day = times[i];
      var slots = [];

      for (var j = 0; j < day.length; j++) {
         var startVal = convertToInt(day[j][0]);
         var endVal = convertToInt(day[j][1]);

         if (Math.abs(startVal - endVal) >= 30) 
            slots.push([day[j][0], day[j][1]]);
      }
      filtered.push(slots);
   }
   return filtered;
}

// Given a list of unavailable times, returns a list
// of available times to display
export function getAvailableTimes(users) {
   let unavailTimes = getBusyTimes(users);
   let availableTimes = [];

   let start = "7:00";
   let end = "24:00";

   for (var i = 0; i < unavailTimes.length; i++) {
      var singleDay = unavailTimes[i];
      var dayAvail = [];

      // For each unavailable slot in a day (if any):
      if (!(singleDay === [])){
         for (var j = 0; j < singleDay.length; j++) {
            // If they have a 7AM class:
            if (j === 0 && singleDay[j].startTime === "7:10")
               dayAvail.push([singleDay[j].endTime, singleDay[j + 1].startTime]);
            else if (j === 0) {
               dayAvail.push([start, singleDay[j].startTime]);
               dayAvail.push([singleDay[j].endTime, singleDay[j + 1].startTime]);
            }
            else if (j === singleDay.length - 1)
               dayAvail.push([singleDay[j].endTime, end]);
            // If they have a starting class after 7AM:
            else {
               dayAvail.push([singleDay[j].endTime, singleDay[j + 1].startTime]);
            }
         }
      } else {
         dayAvail.push([start, end]);
      }
      availableTimes.push(dayAvail);
   }
   
   return filterAvailableTimes(availableTimes);
}