<template>
  <div class="event-setting">
      <div class="row">
          <div class="col setting-col">
              <div class="setting-col-header">
                  <span>Time</span>
            </div>
            <div class="row">
                <div class="col mr-3">
                    <div class="mb-3 ">
                        <label for="exampleFormControlInput1" class="form-label">Start date</label>
                        <div class="input-examples">(yesterday,7daysAgo,2021-07-14,...)</div>
                        <input type="text" class="form-control" v-model="startDate" id="startDate" @change="inputValueChanged">
                    </div>
                </div>
                <div class="col ml-3">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">End date</label>
                        <div class="input-examples">(yesterday,7daysAgo,2021-07-14,...)</div>

                        <input type="text" class="form-control" v-model="endDate" id="endDate" @change="inputValueChanged">
                    </div>
                </div>
            </div>
          </div>
          <div class="col setting-col">
              <div class="setting-col-header">
                  <span>Campaign</span>
              </div>
              <div class="row">
                <div class="col">
                    <div class="mb-3 mr-3">
                        <label for="exampleFormControlInput1" class="form-label">Campaign Medium</label>
                        <div class="input-examples">(refferal,@mehowbrains,...)</div>
                        <input type="text" class="form-control" v-model="campaignMedium" placeholder="referral" @change="inputValueChanged" >
                    </div>
                </div>
                <div class="col"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        tableSetting: {
            type: Object,
            default: null
        }
    },
    data(){
        return {
            startDate: this.tableSetting.startDate,
            endDate: this.tableSetting.endDate,
            campaignMedium: this.tableSetting.campaignMedium
        }
    },
    methods:{
        inputValueChanged($event){
            console.log("input value changed")
            var self = this
            this.$store.commit('handTableSetting', {
                startDate: self.startDate,
                endDate: self.endDate,
                campaignMedium: self.campaignMedium
            })
            this.$store.commit('cool', false)
        }
    }
}
</script>

<style lang="scss">
.event-setting{
    font-family: Roboto;
    .setting-col{
        border-top: 0.5px solid black;
        border-bottom: 0.5px solid #999;
        margin: 0 40px;
        .setting-col-header{
            text-align: center;
            margin-top: -8px;
            font-family: Roboto;
            font-size: 10px;
            span{
                background-color: white;
                padding: 5px;
            }

        }
        .input-examples{
            font-size: 10px;
            margin-top: -10px;
            margin-bottom: 10px;
        }
    }

}
</style>