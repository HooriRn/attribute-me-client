var moment = require('moment');
export function parseEventsData(events){
        events.map(event =>{
            if(event.time){ // Hourly date
              event.time = moment(event.time.toString(), 'YYYYMMDDHH').format('DD MMM YYYY, hh:mm A')
            }
            if(event.date){ // Daily data
              event.date = moment(event.date.toString()).format('DD MMM YYYY')
            }
            if(event.event_count_per_user){
                event.event_count_per_user = event.event_count_per_user.toFixed(2)
            }
            for(var key of ['event_count', 'event_value', 'total_users', 'event_count_per_user']){
                if(event[key]){
                    event[key] = numberWithCommas(event[key])
                }
            }
            delete event.id
        })
        return events
}
export function parseTotalsData(totals){
    if(totals.total_event_count_per_user){
        totals.total_event_count_per_user = totals.total_event_count_per_user.toFixed(2)
    }
    for(var key of
         [
             "total_count",
             "total_value",
            //  "total_total_users",
            //  "total_event_count_per_user"
            ]
        ){
            totals[key] = numberWithCommas(totals[key])

        }
    return totals
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

function numberWithCommas(x) {
    // to fixed 2 decimals first
    return parseFloat(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
