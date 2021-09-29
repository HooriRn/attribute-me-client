export default {
    getLabelFilter(key){
        var labelFilters = {
            'SKIP.exchange&All Events': "skip"
        }
        return labelFilters[key]
    }
}