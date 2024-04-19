"use client"
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function PieChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint URL
      const response = await fetch('http://127.0.0.1:8080/api/categoryData');
      const categories = await response.json();
      
      // Process the fetched data
      const labels = categories.map(category => category.categoryName);
      const data = categories.map(category => category.categoryCount);
      const backgroundColor = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(199, 99, 132, 0.6)',
        'rgba(164, 162, 235, 0.6)',
        'rgba(255, 129, 86, 0.6)',
        'rgba(75, 232, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 205, 86, 0.6)'
      ];
      const borderColor = [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(199,99,132,1)',
        'rgba(164,162,235,1)',
        'rgba(255,129,86,1)',
        'rgba(75,232,192,1)',
        'rgba(153,102,255,1)',
        'rgba(255,205,86,1)'
      ];

      setChartData({
        ...chartData,
        labels,
        datasets: [{
          ...chartData.datasets[0],
          data,
          backgroundColor,
          borderColor,
        }],
      });
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom', 
      },
    },
    // Add any other options you need here
  };


  return (
    <div className = "flex-col mt-10">
    <div className="text-center font-bold text-xl"> Database Category Distribution</div>
    <div style={{ width: '400px', height: '400px', marginTop: '20px'}}>
      <Pie data={chartData} options={options}  />
    </div>
    </div>
  );
}

export default PieChart;
