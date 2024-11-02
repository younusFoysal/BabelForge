import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const PayGraph = ({ trans, isLoading }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //   Total Revenue
  const total = trans?.reduce((sum, item) => sum + Number(item.amount), 0);

  //Revenue Chart
  const revenueChart = {
    series: [
      {
        name: 'Standard',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: 'Premium',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        height: 325,
        type: 'area',
        fontFamily: 'Nunito, sans-serif',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: 'smooth',
        width: 2,
        lineCap: 'square',
      },
      dropShadow: {
        enabled: true,
        opacity: 0.2,
        blur: 10,
        left: -7,
        top: 22,
      },
      colors: ['#1B55E2', '#E7515A'],
      markers: {
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 6,
            fillColor: '#1B55E2',
            strokeColor: 'transparent',
            size: 7,
          },
          {
            seriesIndex: 1,
            dataPointIndex: 5,
            fillColor: '#E7515A',
            strokeColor: 'transparent',
            size: 7,
          },
        ],
      },
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
        },
        labels: {
          offsetX: 0,
          offsetY: 5,
          style: {
            fontSize: '12px',
            cssClass: 'apexcharts-xaxis-title',
          },
        },
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: value => {
            return value;
          },
          offsetX: -10,
          offsetY: 0,
          style: {
            fontSize: '12px',
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        opposite: false,
      },
      grid: {
        borderColor: '#E0E6ED',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        fontSize: '16px',
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
        x: {
          show: false,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: !1,
          opacityFrom: 0.28,
          opacityTo: 0.05,
          stops: [45, 100],
        },
      },
    },
  };

  for (let month = 0; month <= 12; month++) {
    trans?.forEach(item => {
      if (Number(item?.startDate?.slice(5, 7)) === month) {
        // Filter Standard transactions for the current month
        const tempStandard = trans?.filter(
          transItem => transItem.plan === 'Standard' && Number(transItem?.startDate?.slice(5, 7)) === month
        );
        revenueChart.series[0].data[month - 1] = tempStandard.reduce((sum, transItem) => sum + Number(transItem.amount), 0);
        // Filter Premium transactions for the current month
        const tempPremium = trans?.filter(transItem => transItem.plan === 'Premium' && Number(transItem?.startDate?.slice(5, 7)) === month);
        revenueChart.series[1].data[month - 1] = tempPremium.reduce((sum, transItem) => sum + Number(transItem.amount), 0);
      }
    });
  }

  return (
    <div className="md:col-span-5 col-span-1  ">
      <Card className="p-6  dark:bg-[#181024] dark:border-[#3e1878c2]">
        <div className="panel h-full xl:col-span-2">
          <div className="mb-5 flex items-center justify-between dark:text-white-light">
            <h5 className="text-lg font-semibold">Revenue</h5>
          </div>
          <p className="text-lg dark:text-white-light/90">
            Total Revenue <span className="ml-2 text-primary">${total}</span>
          </p>
          <div className="relative">
            <div className="rounded-lg bg-white dark:bg-transparent">
              {isMounted ? (
                <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} width={'100%'} />
              ) : (
                <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                  <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PayGraph;
