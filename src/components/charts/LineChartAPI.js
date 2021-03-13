/* jshint esversion: 6 */

import { Line } from 'vue-chartjs';
import axios from 'axios';

export default {
  extends: Line,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: 'west',
            data: [],
            borderColor: 'rgba(204, 0, 0, 0.8)',
            backgroundColor: 'rgba(204, 0, 0, 0.8)',
            fill: false,
          },

          {
            label: 'national',
            data: [],
            borderColor: 'rgba(0, 153, 204, 0.8)',
            backgroundColor: 'rgba(0, 153, 204, 0.8)',
            fill: false,
          },

          {
            label: 'east',
            data: [],
            borderColor: 'rgba(128, 128, 255, 0.8)',
            backgroundColor: 'rgba(128, 128, 255, 0.8)',
            fill: false,
          },

          {
            label: 'central',
            data: [],
            borderColor: 'rgba(64, 191, 128, 0.8)',
            backgroundColor: 'rgba(64, 191, 128, 0.8)',
            fill: false,
          },

          {
            label: 'south',
            data: [],
            borderColor: 'rgba(51, 51, 77, 0.8)',
            backgroundColor: 'rgba(51, 51, 77, 0.8)',
            fill: false,
          },

          {
            label: 'north',
            data: [],
            borderColor: 'rgba(255, 99, 132, 0.7)',
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            fill: false,
          },
        ],
      },

      options: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'PSI Twenty Four Hourly (By Region)',
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  methods: {
    fetchItems: function () {
      axios.get('https://api.data.gov.sg/v1/environment/psi?date=2021-02-23')
        .then(response => {
          //console.log(response.data.items);

          response.data.items.forEach(dat => {
            //console.log(dat);
            //console.log('timestamp: ', dat.timestamp);
            this.datacollection.labels.push(dat.timestamp);

            //console.log(dat.readings.psi_twenty_four_hourly);
            //console.log(dat.readings.psi_twenty_four_hourly.west);
            let psiReadings = dat.readings.psi_twenty_four_hourly;
            this.datacollection.datasets[0].data.push(psiReadings.west);
            this.datacollection.datasets[1].data.push(psiReadings.national);
            this.datacollection.datasets[2].data.push(psiReadings.east);
            this.datacollection.datasets[3].data.push(psiReadings.central);
            this.datacollection.datasets[4].data.push(psiReadings.south);
            this.datacollection.datasets[5].data.push(psiReadings.north);
          });

          this.renderChart(this.datacollection, this.options);
        });
    },
  },

  created() {
    this.fetchItems();
  },
};
