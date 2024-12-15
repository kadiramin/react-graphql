

import { reportWebVitals as reportWebVitalsLibrary } from 'web-vitals';

const reportWebVitals = (metric) => {
  console.log(metric); // This logs the web vitals metric to the console.
};

export default reportWebVitals;



// const reportWebVitals = onPerfEntry => {
//   if (onPerfEntry && onPerfEntry instanceof Function) {
//     import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
//       getCLS(onPerfEntry);
//       getFID(onPerfEntry);
//       getFCP(onPerfEntry);
//       getLCP(onPerfEntry);
//       getTTFB(onPerfEntry);
//     });
//   }
// };
//
// export default reportWebVitals;


// src/reportWebVitals.js