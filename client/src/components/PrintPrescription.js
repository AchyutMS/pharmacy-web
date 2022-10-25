// import React from 'react'

// export default function PrintPrescription({ detail }) {
//   return (
//     <div className='print-source'> 
//       <div className="container page-size">
//         {detail.patient.name} cool content here!
//       </div>
//     </div>
//   );
// };

import React, {useState} from 'react'
import { Table, Button} from 'react-bootstrap'

export const PrintPrescription = React.forwardRef((props, ref) => {

  var total = 0

  

  var patient = props.details.patient
  var prescription = props.details.prescription

  

  return (
    <div ref={ref}>
        <div className="container page-size">
                <div className="row">
                    <div className="col-12 line"></div>
                </div>
                <div className="row ">
                    <div className="col-4">
                        <img src={"./images/sims-background.png"}/>
                        <p>Metro No.1 Jawaharlal Nehru Road, Landmark:, next to Vadapalani, Chennai, Tamil Nadu 600026</p>
                    </div>
                    <div className="col-8 d-flex justify-content-center align-items-center ">
                        <h1 className='display-1'>Medical Bill</h1>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <p>Name : {patient.name}</p>
                            <p>Age : {patient.age}</p>
                            <p>Sex : {patient.sex}</p>
                            <p>Doctor Reffered : {patient.doctorReffered}</p>
                            <p>Service : {patient.service}</p>
                        </div>
                    </div>
                
            </div>
    
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Batch</th>
                  <th>Qty</th>
                  <th>Price</th>
                  {/* <th>Basic Amount</th> */}
                  <th>D[%]</th>
                  <th>Dis. Amt</th>
                  <th>Tax %</th>
                  <th>Tax</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {prescription &&
                  prescription.map((item) => {
                    total += Math.round(((item.MRP * item.required_quantity)-(item.discountAmount))*100)/100
                    var cost = (parseFloat(item.MRP) * parseFloat(item.required_quantity))
                    item.discountPer = patient.service !== "none" ? cost > 100 ? cost > 1000 ? 20 : 10 : 0 : 0
                    item.discountAmount = cost * item.discountPer/100
                    return (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.BatchNo}</td>
                        <td>
                          {item.required_quantity}
                        </td>
                        <td>{parseFloat(item.MRP).toFixed(2)}</td>
                        <td>{item.discountPer}</td>
                        <td>{parseFloat(item.discountAmount).toFixed(2)}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>{parseFloat((parseFloat(item.MRP) * parseFloat(item.required_quantity))-(item.discountAmount)).toFixed(2)}</td>
                        {/* <td>-</td> */}
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
    
              
               <p>Total: {total} </p>    
        </div>
    </div>
  );
});