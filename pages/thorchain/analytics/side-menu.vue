<template>
  <div class="side-menu" v-if="$device.isDesktop">
    <div class="date-range-field">
      <div class="field-title">Settings</div>
      <div
        @click="toggleDatePicker"
        class="date-input"
        id="date-input"
        :class="{ 'date-input-active': showDatePicker }"
      >
        <div class="date-input-text" style="font-size: 0.875rem; color: #202124;">{{ dateInputValue }}</div>
        <img src="~/assets/img/triangle.svg" />
      </div>
      <transition name="fade">
        <div v-show="showDatePicker" id="date-picker-holder" class="date-picker-holder">
          <date-range-picker
            width="18.75rem"
            :from="$route.query.from"
            :to="$route.query.to"
            :panel="$route.query.panel"
            @update="applyFilter"
            :theme="datepickerTheme"
          />
        </div>
      </transition>
      <div style="margin-left: 1.25rem;">
        <b-form-checkbox @change="dailySwitchChanged" class="hourly-checkbox" v-model="hourlyChecked" name="check-button" button-variant="danger" switch>
          <div>Hourly data</div>
        </b-form-checkbox>
      </div>
      <div class="side-menu-item" style="display: flex;">
        <button @click="exportCSVClicked" class="side-menu-item">Export to CSV</button>
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
              'side-menu-single-active': (activeItem == filter.name && !filter.childs) || (filter.name == 'All Data' && activeBtn == null)
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
    </div>
    <hr class="divider" />
    <div class="side-menu-item" >
      <b-button class="side-menu-button" :class="{'disabled': true}" style="line-height: 0;">Documentation</b-button>
    </div>
  </div>
  <div class="filter-options" v-else>
    <div class="filter-option date-picker">
      <div class="filter-name">Settings:</div>
      <div
        @click="toggleDatePicker"
        class="date-input"
        id="date-input"
        :class="{ 'date-input-active': showDatePicker }"
      >
        <div class="date-input-text" style="font-size: 0.875rem; color: #202124;">
          {{ dateInputValue }}
          <div class="arrow-down"></div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-show="showDatePicker" id="date-picker-holder" class="date-picker-holder">
          <date-range-picker
            width="18.75rem"
            :from="$route.query.from"
            :to="$route.query.to"
            :panel="$route.query.panel"
            @update="applyFilter"
            :theme="datepickerTheme"
          />
      </div>
    </transition>
    <b-form-checkbox @change="dailySwitchChanged" class="hourly-checkbox" v-model="hourlyChecked" name="check-button" button-variant="danger" switch>
      <div>Hourly data</div>
    </b-form-checkbox>
    <div class="filter-option">
      <div class="filter-name" style="padding-top: 2px;">
        Preset Filters:
      </div>
      <b-dropdown id="preset-filters" variant="outline" text="Dropdown with header" class="drop-down-custom" no-caret>
        <template #button-content>
          {{tableSetting && tableSetting["filter_website"]? tableSetting["filter_website"]:"All data"}}
          <div class="arrow-down"></div>
        </template>
        <div
          v-for="(filter, index) of filters"
          :key="filter.name"
        >
          <b-dropdown-header
            @click="activate(filter.name)"
            :class="{
              'active': filter.childs? false : true,
              'side-menu-button-active': activeItem == filter.name
            }"
          >
            {{filter.name}}
          </b-dropdown-header>
          <div
            v-for="child of filter.childs"
            :key="filter.childs.indexOf(child)"
          >
            <b-dropdown-item-button
              @click="filterBtnClicked(filter.name, child.name)"
              :class="{
                'side-menu-button-active':
                  activeBtn == filter.name + '&' + child.name,
              }"
              aria-describedby="preset-filters-label"
            >
              {{child.name}}
            </b-dropdown-item-button>
          </div>
          <b-dropdown-divider v-if="index != filters.length - 1"></b-dropdown-divider>
        </div>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { getServerCustomDateString, getDateInputValue } from "../../../utils";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["sideMenuDateLabel", "tableSetting"]),
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
            { name: "All Data" },
            { name: "Website Loads" },
            { name: "Internal Links" },
            { name: "External Links" }
          ],
        },
        {
          name: "SKIP.exchange",
          childs: [
            { name: "All Data" },
            { name: "Interface Loads" },
            { name: "New Wallets" },
            { name: "Swap Preps" },
            { name: "Swaps" },
            { name: "RUNE Upgrade" },
            { name: "Deposits" },
            { name: "Withdrawal Preps" },
            { name: "Withdrawals" },
            { name: "Network Fees" },
            { name: "Slips"}
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
  mounted() {
    window.addEventListener('click', (e) => {
      if (!document.getElementById('date-picker-holder').contains(e.target) && !document.getElementById('date-input').contains(e.target)){
        this.showDatePicker = false;
        console.log(this.showDatePicker)
      }
    });
  },
  methods: {
    applyFilter(args) {
      console.log(args);
      var from = new Date(args.from);
      var to = new Date(args.to);
      var startDate = getServerCustomDateString(from, "00");
      var endDate = getServerCustomDateString(to, "23");
      this.dateInputValue = getDateInputValue(startDate, endDate);

      var tableSetting = this.tableSetting;
      tableSetting["startDate"] = startDate;
      tableSetting["endDate"] = endDate;
      this.showDatePicker = false;
      this.$store.commit("tableSetting", tableSetting);
    },
    exportCSVClicked() {
      this.$store.commit('exportCSV', Math.random())
    },
    activate(filterName) {
      console.log('activate', filterName)
      this.activeItem = filterName;
      if (filterName === "All Data") {
        this.activeBtn = null;
        for (var key in this.$refs) {
          var ref = this.$refs[key][0];
          if (ref && ref.show) ref.toggle();
        }
        var tableSetting = this.tableSetting;
        tableSetting["filter_website"] = "";
        tableSetting["present_filter"] = "";
        console.log(tableSetting)
        this.$store.commit("tableSetting", tableSetting);
      }
      console.log(this.activeItem);
    },
    filterBtnClicked(parentBtnName, childBtnName) {
      var newBtn = parentBtnName + "&" + childBtnName;
      var tableSetting = this.tableSetting;
        this.activeBtn = newBtn;
        tableSetting["filter_website"] = parentBtnName;
        tableSetting["present_filter"] = childBtnName;
        this.$store.commit("tableSetting", tableSetting);
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
    tableSetting: function (tableSetting){
      if(tableSetting.hasOwnProperty('daily')){
        this.hourlyChecked = !tableSetting.daily
      }
      if(tableSetting.hasOwnProperty("filter_website") &&
        tableSetting.hasOwnProperty("present_filter") ){
          if(tableSetting.filter_website === ""){
            this.activeItem = "All Data"
          } else {
            this.activeBtn = tableSetting.filter_website + "&" + tableSetting.present_filter
          }

          for (var key in this.$refs) {
            var ref = this.$refs[key][0];
            if (ref && ref.show) ref.toggle();
            if(ref && key === tableSetting.filter_website){
              ref.toggle()
            }
          }
      } else {
        this.activeItem = "All Data"
      }
      console.log("SideMenu: new setting", tableSetting)
    }
  },
};
</script>
