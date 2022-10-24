import React from 'react'

export default function PrintPrescription({ detail }) {
  return (
    <div className='print-source'> 
      <div className="container page-size">
        {detail.patient.name} cool content here!
      </div>
    </div>
  );
};

// import React from 'react'

// export const PrintPrescription = React.forwardRef((props, ref) => {
//   return (
//     <div ref={ref}>My cool content here!</div>
//   );
// });