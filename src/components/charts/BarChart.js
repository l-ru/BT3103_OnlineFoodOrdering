/* jshint esversion: 6 */

import { Bar } from 'vue-chartjs';
import database from '../../firebase.js'; //Import database

export default {
  extends: Bar,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: 'Total Quantity',
            backgroundColor: [
              'rgba(54, 162, 235, 0.9)',
              'rgba(153, 102, 255, 0.9)',
              'rgba(64, 191, 128, 0.9)',
              'rgba(255, 99, 132, 0.7)',
              'rgba(196, 88, 80, 0.9)',
              'rgba(255, 206, 86, 0.7)',
            ],
            data: [],
          },
        ],
      },

      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Total Number of Each Dish Ordered',
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
            },
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  methods: {
    fetchItems: function () {
      // To push in the food item names into label array and push colour
      database.collection('menu').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          //console.log(doc.data().name);
          this.datacollection.labels.push(doc.data().name); // push data to  label array
          this.datacollection.datasets[0].backgroundColor.push(doc.data().color);
        });
      });

      let totalQty = [0, 0, 0, 0, 0, 0];
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => {
          //console.log(doc.data().foodItems);

          for (let i = 0; i < doc.data().foodItems.length; i++) {
            //console.log('food: ', doc.data().foodItems[i].name,
            // '; qty: ', doc.data().foodItems[i].qty);
            let currItemName = doc.data().foodItems[i].name;
            let currItemQty = doc.data().foodItems[i].qty;

            if (currItemName == 'Prawn omelette') {
              totalQty[0] += parseInt(currItemQty);

            } else if (currItemName == 'Dry Beef Hor Fun') {
              totalQty[1] += parseInt(currItemQty);

            } else if (currItemName == 'Sambal KangKung') {
              totalQty[2] += parseInt(currItemQty);

            } else if (currItemName == 'Pork Fried Rice') {
              totalQty[3] += parseInt(currItemQty);

            } else if (currItemName == 'Mapo Tofu') {
              totalQty[4] += parseInt(currItemQty);

            } else if (currItemName == 'Cereal Prawn') {
              totalQty[5] += parseInt(currItemQty);
            }

          }
        });
        for (let i = 0; i < totalQty.length; i++) {
          //console.log(totalQty[i]);
          this.datacollection.datasets[0].data.push(totalQty[i]);
        }

        this.renderChart(this.datacollection, this.options); // render the chart
      });
    },
  },

  created() {
    this.fetchItems();
  },
};
