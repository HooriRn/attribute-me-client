export function parseEventsData(events){
        events.map(event => 
            event.dateHour = 
            event.dateHour.substr(0,4) + "-" +
            event.dateHour.substr(4,2) + "-" +
            event.dateHour.substr(6,2) + " " + 
            event.dateHour.substr(8,2)+":00")
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