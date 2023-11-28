<template>
  <div class="backgroundCalendar">
    <div class="calendarContent">
      <h3 class="monthYearTitle">{{ monthAndYear }}</h3>
      <table id="calendar">
        <thead>
          <tr>
            <th :class="['daysWeek']" v-for="dayHeader in dayHeaders" :key="dayHeader">{{ dayHeader }}</th>
          </tr>
        </thead>

        <tbody id="calendar-body">
          <tr v-for="(week, index) in calendarRows" :key="index">
            <td v-for="day in week" :class="['uniqueDay', { 'currentDay': isToday(day) }]">{{ day }}</td>
          </tr>
        </tbody>
      </table>

      <div class="form-inline">
        <span class="previousMonth" @click="previous">Anterior</span>
        <span class="nextMonth" @click="next">Siguiente</span>
      </div>
    </div>

  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'CalendarEmotaku',
  setup() {
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const monthAndYear = ref('');
    const calendarRows = ref<any>([]);

    function next() {
      currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
      currentMonth = (currentMonth + 1) % 12;
      showCalendar();
    }

    function previous() {
      currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
      currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
      showCalendar();
    }

    function showCalendar() {
      const days = [];
      let firstDay = (new Date(currentYear, currentMonth)).getDay();

      let date = 1;
      for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
            week.push('');
          } else if (date > daysInMonth(currentMonth, currentYear)) {
            break;
          } else {
            week.push(date);
            date++;
          }
        }
        days.push(week);
      }

      // Actualiza el contenido del h3 utilizando textContent
      monthAndYear.value = `${months[currentMonth]} ${currentYear}`;

      // Asigna las nuevas filas al ref
      calendarRows.value = days;
    }


    function daysInMonth(iMonth: any, iYear: any) {
      return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    function isToday(day: any) {
      return day === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth();
    }

    onMounted(() => {
      showCalendar();
    });

    return {
      monthAndYear,
      calendarRows,
      dayHeaders,
      next,
      previous,
      isToday,
    };
  }
});
</script>

<style scoped>
.backgroundCalendar {
  overflow: hidden;
  position: relative;
}

.backgroundCalendar::before {
  background-image: url('../assets/images/calendar/backgroundCalendar.webp');
  background-size: contain;
  content: "";
  filter: blur(8px) brightness(50%);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
}

.calendarContent {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 10px 0 10px 0;
  position: relative;
  width: 90%;
  z-index: 2;
}

.monthYearTitle {
  padding: 7px;
}

.daysWeek,
.uniqueDay {
  font-size: 10px;
}

.currentDay {
  background-color: #b14ff6;
  border: 1px solid white;
  border-radius: 10px;
  color: rgb(0, 0, 0);
}

.previousMonth,
.nextMonth {
  background-color: #9f9f9f;
  border: 1px solid rgb(194, 128, 251);
  color: black;
  cursor: pointer;
  font-size: 10px;
  margin: 2px;
  padding: 2px;
}

.previousMonth:hover {
  background-color: red;
}

.nextMonth:hover {
  background-color: green;
}
</style>
