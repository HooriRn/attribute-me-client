export function parseEventsData(events){
        events.map(event =>{
            if(event.time){
                event.time = 
                event.time.substr(0,4) + "-" +
                event.time.substr(4,2) + "-" +
                event.time.substr(6,2) + " " + 
                event.time.substr(8,2)+":00"
            }
            if(event.date){
                event.date = 
                event.date.substr(0,4) + "-" +
                event.date.substr(4,2) + "-" +
                event.date.substr(6,2) + " " 
            }
            if(event.event_count_per_user){
                event.event_count_per_user = event.event_count_per_user.toFixed(2)
            }
            delete event.id
        })
        return events
}
export function isDifferentSetting(oldSetting, newSetting){
    var newSettingOnlyOldKeys = {}
    var isDifferent = false
    for(var i in oldSetting){
        newSettingOnlyOldKeys[i] = newSetting[i] 
        if(oldSetting[i] != newSetting[i])
            isDifferent = true
    }
    return {isDifferent, newSetting: newSettingOnlyOldKeys}
}

export function getServerCustomDateString(date, hour){
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    if((day+"").length === 1)
        day = "0"+day
    if((month+"").length === 1)
        month = "0"+month
    var customString = year+""+month+day + hour
    return customString
}

export function getDateInputValue(startDate, endDate){
    var a = startDate
    var from = a.substr(2,2) +"-"+ a.substr(4,2) +"-"+ a.substr(6,2)
    a = endDate
    var to = a.substr(2,2) +"-"+ a.substr(4,2) +"-"+ a.substr(6,2)

    var dateInputValue = from + " to "+ to
    return dateInputValue
}