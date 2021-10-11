<template>
  <div class="side-menu">
    <div class="date-range-field">
      <div class="field-title">Date range</div>
      <div
        @click="toggleDatePicker"
        class="date-input"
        :class="{ 'date-input-active': showDatePicker }"
      >
        <div class="date-input-text" style="font-size: 0.875rem; color: #202124;">{{ dateInputValue }}</div>
        <img src="~/assets/img/triangle.svg" />
      </div>
      <div :hidden="!showDatePicker" class="date-picker-holder">
        <date-range-picker
          width="18.75rem"
          :from="$route.query.from"
          :to="$route.query.to"
          :panel="$route.query.panel"
          @update="applyFilter"
          :theme="datepickerTheme"
        />
      </div>

      <div style="margin-left: 1.25rem;">
        <b-form-checkbox @change="dailySwitchChanged" class="hourly-checkbox" v-model="hourlyChecked" name="check-button" button-variant="danger" switch>
          <div>Hourly data</div>
        </b-form-checkbox>
      </div>
    </div>
    <hr class="divider" />
    <div class="present-filters-filed">
      <div class="field-title">Preset filters</div>
      <div class="filters-scroll">
        <div
          class="side-menu-item"
          v-for="filter of filters"
          :key="filters.indexOf(filter)"
        >
          <b-button
            @click="activate(filter.name)"
            class="side-menu-item"
            :class="{
              'side-menu-button-active': activeItem == filter.name,
              'side-menu-single-active': activeItem == filter.name && !filter.childs
            }"
            v-b-toggle="filter.name"
          >
            <div class="d-flex justify-content-between">
              {{ filter.name }}
              <img v-if="filter.childs" src="~/assets/img/triangle.svg" />
            </div>
          </b-button>

          <b-collapse
            :ref="filter.name"
            v-if="filter.childs"
            :id="filter.name"
            class="mt-2 childs-list"
            accordion="side-menu-accordion"
          >
            <div
              v-for="child of filter.childs"
              :key="filter.childs.indexOf(child)"
              @click="filterBtnClicked(filter.name, child.name)"
              class="side-menu-button"
              :class="{
                'side-menu-button-active':
                  activeBtn == filter.name + '&' + child.name,
              }"
            >
              {{ child.name }}
            </div>
          </b-collapse>
        </div>
      </div>

      <div>
        <!-- Via space separated string of IDs passed to directive value -->

        <!-- Elements to collapse -->

        <b-collapse id="collapse-b" class="mt-2">
          <b-card>I am collapsible content B!</b-card>
        </b-collapse>
      </div>
    </div>
    <hr class="divider" />
    <div class="side-menu-item" >
      <b-button class="side-menu-button" style="line-height: 0;">Documentation</b-button>
    </div>
  </div>
</template>

<script>
import { getServerCustomDateString, getDateInputValue } from "../../utils";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["sideMenuDateLabel"]),
    ...mapGetters(["tableSetting"]),
  },
  data() {
    return {
      showDatePicker: false,
      activeItem: null,
      activeBtn: null,
      hourlyChecked: false,
      dateInputValue: "Filter a date range",
      filters: [
        { name: "All Data" },
        {
          name: "THORChain.org",
          childs: [
            { name: "All Events" },
            { name: "Website Loads" },
            { name: "Promotions" },
            { name: "Social" },
            { name: "Tool" },
            { name: "Article" },
            { name: "Video" },
            { name: "Document" },
            { name: "Paper" },
          ],
        },
        {
          name: "SKIP.exchange",
          childs: [
            { name: "All Events" },
            { name: "Interface Loads" },
            { name: "New Wallets" },
            { name: "Swap Preps" },
            { name: "Swaps" },
            { name: "RUNE Upgrade" },
            { name: "Deposits" },
            { name: "Withdrawal Preps" },
            { name: "Withdrawals" },
            { name: "Network Fees" },
          ],
        },
      ],
      datepickerTheme: {
        primary: "#ff6640",
        secondary: "#2D3E50",
        ternary: "#93A0BD",
        border: "#e6e6e6",
        light: "#ffffff",
        dark: "#000000",
        hovers: {
          day: "#CCC",
          range: "#e6e6e6",
        },
      },
    };
  },

  methods: {
    applyFilter(args) {
      console.log(args);
      var from = new Date(args.from);
      var to = new Date(args.to);
      var startDate = getServerCustomDateString(from, "01");
      var endDate = getServerCustomDateString(to, "23");
      this.dateInputValue = getDateInputValue(startDate, endDate);

      var tableSetting = this.tableSetting;
      tableSetting["startDate"] = startDate;
      tableSetting["endDate"] = endDate;
      this.showDatePicker = false;
      this.$store.commit("tableSetting", tableSetting);
    },

    activate(filterName) {
      if (this.activeItem === filterName) this.activeItem = null;
      else this.activeItem = filterName;
      if (filterName === "All data") {
        this.activeBtn = null;
        for (var key in this.$refs) {
          var ref = this.$refs[key][0];
          if (ref.show) ref.toggle();
        }
        var tableSetting = this.tableSetting;
        tableSetting["filter_website"] = "";
        tableSetting["present_filter"] = "";
        this.$store.commit("tableSetting", tableSetting);
      }
      console.log(this.activeItem);
    },
    filterBtnClicked(parentBtnName, childBtnName) {
      var newBtn = parentBtnName + "&" + childBtnName;
      var tableSetting = this.tableSetting;
      if (this.activeBtn === newBtn) {
        this.activeBtn = null;
        // tableSetting['filter_website'] = ''
        // tableSetting['present_filter'] = ''
      } else {
        this.activeBtn = newBtn;
        tableSetting["filter_website"] = parentBtnName;
        tableSetting["present_filter"] = childBtnName;
        this.$store.commit("tableSetting", tableSetting);
      }
    },
    toggleDatePicker() {
      console.log("toggle");
      this.showDatePicker = !this.showDatePicker;
      console.log(this.showDatePicker);
    },
    dailySwitchChanged(){
        var tableSetting = this.tableSetting;
        tableSetting["daily"] = !this.hourlyChecked;
        this.$store.commit("tableSetting", tableSetting);
    }
  },
  watch: {
    sideMenuDateLabel: function (val) {
      this.dateInputValue = val;
    },
  },
};
</script>
