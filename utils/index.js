export function parseEventsData(events){
        events.map(event =>{
            if(event.time){
                event.time = 
                event.time.substr(0,4) + "-" +
                event.time.substr(4,2) + "-" +
                event.time.substr(6,2) + " " + 
                event.time.substr(8,2)+":00"
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