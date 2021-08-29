<template>
  <div class="side-menu">
      <div class="date-range-field">
          <div class="field-title">Date range</div>
          <div @click="toggleDatePicker" class="date-input" :class="{'date-input-active': showDatePicker}">
                <div  class="date-input-text">{{dateInputValue}}</div>
                <img src="~/assets/img/triangle.svg">
          </div>
          <!-- <v-md-date-range-picker></v-md-date-range-picker> -->
          <div :hidden="!showDatePicker" class="date-picker-holder">
            <date-range-picker
            width="18.75rem"
             :from="$route.query.from" :to="$route.query.to" :panel="$route.query.panel" @update="applyFilter"/>
          </div>

      </div>
      <div class="present-filters-filed">
          <div class="field-title">Present filters</div>
          <div class="side-menu-item" v-for="filter of filters" :key="filters.indexOf(filter)">
               <b-button @click="activate(filter.name)"  :class="{'side-menu-button-active': activeItem == filter.name}" class="side-menu-button" v-b-toggle="filter.name">{{filter.name}}</b-button>
                <b-collapse v-if="filter.childs" :id="filter.name" class="mt-2 childs-list">
                    <div v-for="child of filter.childs" :key="filter.childs.indexOf(child)" class="side-menu-button">
                        {{child.name}}
                    </div>
                </b-collapse>

          </div>

          <div>

            <!-- Via space separated string of IDs passed to directive value -->


            <!-- Elements to collapse -->
            
            <b-collapse id="collapse-b" class="mt-2">
                <b-card>I am collapsible content B!</b-card>
            </b-collapse>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            showDatePicker: true,
            dateInputValue: "21-08-12 to 21-08-02",
            activeItem: null,
            filters: [
                {name: "All data"},
                {name: "THORChain.org"},
                {name: "SKIP.exchange", 
                    childs:[
                        {name: "All Events"},
                        {name: "Interface Loads"},
                        {name: "New Wallets"},
                        {name: "Swap Preps"},
                        {name: "Swaps"},
                        {name: "RUNE Upgrade"},
                        {name: "Deposits"},
                        {name: "Withdrawal Preps"},
                        {name: "Withdrawals"},
                        {name: "Network Fees"},
                    ]
                },

            ]
        }
    },
    methods:{
        applyFilter(args){
            console.log(args)
            var from = new Date(args.from)
            var to = new Date(args.to)
            var startDate = this.getServerCustomDateString(from, "01")
            var endDate = this.getServerCustomDateString(to, "23")
            this.setDateInputValue(startDate, endDate)
            this.$store.commit('handTableSetting', {
                startDate: startDate,
                endDate: endDate,
                campaignMedium: ''
            })
        },
        
        activate(filterName){
            if(this.activeItem === filterName)
                this.activeItem = null
            else
                this.activeItem = filterName

            console.log(this.activeItem)
        },
        toggleDatePicker(){
            console.log("toggle")
            this.showDatePicker = !this.showDatePicker
            console.log(this.showDatePicker)
        },

        
        getServerCustomDateString(date, hour){
            var year = date.getFullYear()
            var month = date.getMonth()
            var day = date.getDate()
            if((day+"").length === 1)
                day = "0"+day
            if((month+"").length === 1)
                month = "0"+month
            var customString = year+""+month+day + hour
            return customString
        },

        setDateInputValue(startDate, endDate){
            var a = startDate
            var from = a.substr(2,2) +"-"+ a.substr(4,2) +"-"+ a.substr(6,2)
            a = endDate
            var to = a.substr(2,2) +"-"+ a.substr(4,2) +"-"+ a.substr(6,2)

            this.dateInputValue = from + " to "+ to
        }
    }

}
</script>

<style lang="scss">
.side-menu{


}
.side-menu-item{

.side-menu-button{
        /* font-family: ProductSans; */
        font-family: ProductSans;
        font-size: 0.875rem;
        line-height: 2.5rem;
        color: #202124;

        background-color: transparent;
        border: none;
        border-radius: 0;
        display: block;
        min-width: 100%;
        text-align: left;
        padding: 0.3rem;
        &:hover{
            background-color: #DADCE0;
            border: none;
            color: #000B12;
            border-radius: 0;
            border: none;
        }
        &:active{
            background-color: #DADCE0;
            border: none;
            color: #000B12;
            border-radius: 0;
            border: none;
        }
}
.side-menu-button-active{
    background-color: #DADCE0;
    border-radius: 0;
    border: none;

}
.childs-list{
    margin-left: 1rem;
}


}
.date-range-field{
    position: relative;
    .date-picker-holder{
        z-index: 1000;
        background-color: #fff;
        position: absolute;
        transform: scale(0.8);
        transform-origin: left top;
        left: 100%;
        top: 0;
    }

    .date-input{
        display: flex;
        justify-content: space-between;
        font-family: ProductSans;
        font-size:0.875rem;
        line-height: 2.5rem;
        color: #202124;
        padding: 0 0.3rem;
        user-select: none;
        &:hover{
            background-color: #DADCE0;
            border: none;
            color: #000B12;
            border-radius: 0;
            border: none;
            cursor: pointer;
        }

        
    }
    .date-input-active{
            background-color: #DADCE0;
            border: none;
            color: #000B12;
            border-radius: 0;
            border: none;
            img{
                transform: rotate(270deg);
            }
        }
}

.mj-daterange-picker {
}


.field-title{
    font-family: ProductSans;
    font-size: 0.875rem;
    line-height: 2.5rem;
    color: #5F6368;
}
</style>