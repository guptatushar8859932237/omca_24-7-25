// import { DownloadDoneSharp } from "@mui/icons-material";
// import axios from "axios";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { baseurl } from "../../Basurl/Baseurl";
// import images from "../../img/logo-dark.png";
// import { usePDF } from "react-to-pdf";
// export default function PAymentpdf() {
//   const [payments, setPayments] = useState({});
//   const [objdata, setObjdata] = useState({});
//   const location = useLocation();
//   const targetRef = useRef();
//     const { toPDF } = usePDF({
//     filename: "example.pdf",
//     targetRef: targetRef,
//   });
//   const getAccordion = async () => {
//     try {
//       const response = await axios.get(
//         `${baseurl}get_patient_by_paymentId/${location.state.data}`,{
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       }
//       );
//       if (response.data.success === true) {
//         console.log(response.data.data);
//         setObjdata(response.data.data.payment_detail);
//         setPayments(response.data.data.payment_detail);
//       } else {
//         console.log("something went worng");
//       }
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   };
//   useEffect(() => {
//     getAccordion();
//   }, []);
// const handleclick=()=>{
//   window.history.back();
// }
//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="d-flex justify-content-between me-5 mb-3">
//           <div>
//             <h4 className="page-title"><i className="fa fa-arrow-left" style={{cursor:"pointer"}} onClick={()=>{handleclick()}}></i></h4>
//           </div>
//           <div>

//           <button className="add-button1">
//             <DownloadDoneSharp style={{ cursor: "pointer" }}   onClick={toPDF} />
//           </button>
//           </div>
//         </div>
//         <section
//             ref={targetRef}
//           style={{ width: 900, margin: "auto", border: "2px solid #9c9c9cff" }}
//         >
//           <div style={{ height: 900, width: 900, padding: 40 }}>
//             <table style={{ width: "100%" }}>
//               <tbody>
//                 <tr>
//                   <td style={{ padding: 0 }}>
//                     <table style={{ width: "100%", marginBottom: 30 }}>
//                       <tbody>
//                         <tr>
//                           <td style={{ width: "50%" }}>
//                             <table>
//                               <tbody>
//                                 <tr>
//                                   <td
//                                     style={{
//                                       fontSize: 20,
//                                       fontWeight: 700,
//                                       paddingBottom: 15,
//                                     }}
//                                   >
//                                     Overseas Medical Care Assistance Ltd
//                                   </td>
//                                 </tr>
//                                 <tr>
//                                   <td style={{ fontSize: 14, fontWeight: 500 }}>
//                                     Sir Celicourt Anthelme Street, Forest Side
//                                     Curepipe
//                                   </td>
//                                 </tr>
//                                 <tr>
//                                   <td style={{ fontSize: 14, fontWeight: 500 }}>
//                                     MAURITIUS
//                                   </td>
//                                 </tr>
//                                 <tr>
//                                   <td style={{ fontSize: 14, fontWeight: 500 }}>
//                                     finance@overseasmca.com
//                                   </td>
//                                 </tr>
//                                 <tr>
//                                   <td style={{ fontSize: 14, fontWeight: 500 }}>
//                                     www.overseasmca.com
//                                   </td>
//                                 </tr>
//                               </tbody>
//                             </table>
//                           </td>
//                           <td style={{ width: "50%", verticalAlign: "top" }}>
//                             <table
//                               style={{ width: "100%", textAlign: "right" }}
//                             >
//                               <tbody>
//                                 <tr>
//                                   <td>
//                                     <img
//                                       src={`${images}`}
//                                       style={{ maxWidth: "100%", height: 120 }}
//                                     />
//                                   </td>
//                                 </tr>
//                               </tbody>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                     <table style={{ width: "100%", marginBottom: 30 }}>
//                       <tbody>
//                         <tr>
//                           <td style={{ width: "50%", verticalAlign: "top" }}>
//                             <p
//                               style={{
//                                 paddingTop: 10,
//                                 marginBottom: 0,
//                                 fontSize: 14,
//                                 fontWeight: 500,
//                                 color: "#0ba6df",
//                               }}
//                             >
//                               Invoice To: {objdata?.patient_name}
//                             </p>
//                           </td>
//                           <td
//                             style={{
//                               width: "50%",
//                               verticalAlign: "top",
//                               textAlign: "right",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 display: "inline-block",
//                                 textAlign: "left",
//                               }}
//                             >
//                               <p
//                                 style={{
//                                   paddingTop: 10,
//                                   marginBottom: 10,
//                                   fontSize: 14,
//                                   fontWeight: 500,
//                                   color: "#0ba6df",
//                                 }}
//                               >
//                                 Billing Details:
//                               </p>
//                               <table>
//                                 <tbody>
//                                   <tr>
//                                     <td
//                                       style={{ fontSize: 14, fontWeight: 500 }}
//                                     >
//                                       Invoice:
//                                     </td>
//                                     <td
//                                       style={{
//                                         fontSize: 14,
//                                         fontWeight: 500,
//                                         paddingLeft: 10,
//                                       }}
//                                     >
//                                       INV 0116
//                                     </td>
//                                   </tr>
//                                   <tr>
//                                     <td
//                                       style={{ fontSize: 14, fontWeight: 500 }}
//                                     >
//                                       Date:
//                                     </td>
//                                     <td
//                                       style={{
//                                         fontSize: 14,
//                                         fontWeight: 500,
//                                         paddingLeft: 10,
//                                       }}
//                                     >
//                                       14/05/2025
//                                     </td>
//                                   </tr>
//                                   <tr>
//                                     <td
//                                       style={{ fontSize: 14, fontWeight: 500 }}
//                                     >
//                                       Terms:
//                                     </td>
//                                     <td
//                                       style={{
//                                         fontSize: 14,
//                                         fontWeight: 500,
//                                         paddingLeft: 10,
//                                       }}
//                                     >
//                                       Net 30
//                                     </td>
//                                   </tr>
//                                   <tr>
//                                     <td
//                                       style={{ fontSize: 14, fontWeight: 500 }}
//                                     >
//                                       Due Date:
//                                     </td>
//                                     <td
//                                       style={{
//                                         fontSize: 14,
//                                         fontWeight: 500,
//                                         paddingLeft: 10,
//                                       }}
//                                     >
//                                       13/06/2025
//                                     </td>
//                                   </tr>
//                                 </tbody>
//                               </table>
//                             </div>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                     <table
//                       style={{ width: "100%", borderBottom: "1px dashed #ccc" }}
//                     >
//                       <thead>
//                         <tr>
//                           <th
//                             style={{
//                               backgroundColor: "#0ba6df21",
//                               fontSize: 14,
//                               padding: 10,
//                               fontWeight: 500,
//                               color: "#0ba6df",
//                               border: "1px solid #fff",
//                             }}
//                           >
//                             DATE
//                           </th>
//                           <th
//                             style={{
//                               backgroundColor: "#0ba6df21",
//                               fontSize: 14,
//                               padding: 10,
//                               fontWeight: 500,
//                               color: "#0ba6df",
//                               border: "1px solid #fff",
//                             }}
//                           >
//                             ACTIVITY
//                           </th>
//                           <th
//                             style={{
//                               backgroundColor: "#0ba6df21",
//                               fontSize: 14,
//                               padding: 10,
//                               fontWeight: 500,
//                               color: "#0ba6df",
//                               border: "1px solid #fff",
//                             }}
//                           >
//                           Amount
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
                        
//                                 <tr >
//                                   <td
//                                     style={{
//                                       backgroundColor: "#f2f2f2",
//                                       padding: 10,
//                                       border: "1px solid #fff",
//                                     }}
//                                   >
//                                      {new Date(
//                                       payments?.payment_Date
//                                     ).toLocaleDateString("en-GB")}
                                  
//                                   </td>
//                                   <td
//                                     style={{
//                                       backgroundColor: "#f2f2f2",
//                                       padding: 10,
//                                       border: "1px solid #fff",
//                                     }}
//                                   >
//                                     {payments?.paymentMethod}
//                                   </td>
//                                   <td
//                                     style={{
//                                       backgroundColor: "#f2f2f2",
//                                       padding: 10,
//                                       border: "1px solid #fff",
//                                     }}
//                                   >
//                                      {payments?.paid_amount}
//                                   </td>
//                                 </tr>
                           
//                       </tbody>
//                     </table>
//                     <table style={{ width: "100%", marginBottom: 30 }}>
//                       <tbody>
//                         <tr>
//                           <td
//                             style={{
//                               width: "50%",
//                               paddingTop: 10,
//                               marginBottom: 0,
//                               fontSize: 14,
//                               fontWeight: 500,
//                             }}
//                           >
//                             For convenience, you may process your payment
//                             through
//                           </td>
//                           <td style={{ fontWeight: 500, fontSize: 14 }}>
//                             Balance Due
//                           </td>
//                         </tr>
//                         <tr>
//                           <td
//                             style={{
//                               width: "50%",
//                               marginBottom: 0,
//                               fontSize: 14,
//                               fontWeight: 500,
//                             }}
//                           >
//                             internet banking on our following account:
//                           </td>
//                         </tr>
//                         <tr>
//                           <td
//                             style={{
//                               width: "50%",
//                               marginBottom: 0,
//                               fontSize: 14,
//                               fontWeight: 500,
//                             }}
//                           >
//                             Account Number:
//                           </td>
//                         </tr>
//                         <tr>
//                           <td
//                             style={{
//                               width: "50%",
//                               marginBottom: 0,
//                               fontSize: 14,
//                               fontWeight: 500,
//                             }}
//                           >
//                             IBAN:
//                           </td>
//                         </tr>
//                         <tr>
//                           <td
//                             style={{
//                               width: "50%",
//                               marginBottom: 0,
//                               fontSize: 14,
//                               fontWeight: 500,
//                             }}
//                           >
//                             Swift code:
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
import { DownloadDoneSharp } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseurl } from "../../Basurl/Baseurl";
import images from "../../img/logo-dark.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PAymentpdf() {
  const [payments, setPayments] = useState({});
  const [objdata, setObjdata] = useState({});
  const location = useLocation();
  const targetRef = useRef();

  // ➤ Fetch Payment Details
  const getAccordion = async () => {
    try {
      const response = await axios.get(
        `${baseurl}get_patient_by_paymentId/${location.state.data}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setObjdata(response.data.data.payment_detail);
        setPayments(response.data.data.payment_detail);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  useEffect(() => {
    getAccordion();
  }, []);

  const handleclick = () => {
    window.history.back();
  };

  // ➤ WORKING PDF DOWNLOAD FUNCTION
  const handleDownload = async () => {
    const element = targetRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("payment_invoice.pdf");
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between me-5 mb-3">
          <div>
            <h4 className="page-title">
              <i
                className="fa fa-arrow-left"
                style={{ cursor: "pointer" }}
                onClick={handleclick}
              ></i>
            </h4>
          </div>

          <button className="add-button1">
            <DownloadDoneSharp
              style={{ cursor: "pointer" }}
              onClick={handleDownload}
            />
          </button>
        </div>

        {/* PDF TARGET SECTION */}
        <section
          ref={targetRef}
          style={{
            width: 900,
            margin: "auto",
            border: "2px solid #9c9c9cff",
            background: "#fff",
          }}
        >
          <div style={{ minHeight: 900, width: 900, padding: 40 }}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>
                    {/* TOP HEADER */}
                    <table style={{ width: "100%", marginBottom: 30 }}>
                      <tbody>
                        <tr>
                          <td style={{ width: "50%" }}>
                            <table>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      fontSize: 20,
                                      fontWeight: 700,
                                      paddingBottom: 15,
                                    }}
                                  >
                                    Overseas Medical Care Assistance Ltd
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ fontSize: 14, fontWeight: 500 }}>
                                    Sir Celicourt Anthelme Street, Forest Side
                                    Curepipe
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ fontSize: 14, fontWeight: 500 }}>
                                    MAURITIUS
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ fontSize: 14, fontWeight: 500 }}>
                                    finance@overseasmca.com
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ fontSize: 14, fontWeight: 500 }}>
                                    www.overseasmca.com
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>

                          <td style={{ width: "50%", textAlign: "right" }}>
                            <img
                              src={images}
                              style={{ maxWidth: "100%", height: 120 }}
                              alt="logo"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* INVOICE DETAILS */}
                    <table style={{ width: "100%", marginBottom: 30 }}>
                      <tbody>
                        <tr>
                          <td style={{ width: "50%" }}>
                            <p
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                color: "#0ba6df",
                              }}
                            >
                              Invoice To: {objdata?.patient_name}
                            </p>
                          </td>

                          <td style={{ width: "50%", textAlign: "right" }}>
                            <div style={{ display: "inline-block" }}>
                              <p
                                style={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  color: "#0ba6df",
                                }}
                              >
                                Billing Details:
                              </p>

                              <table>
                                <tbody>
                                  <tr>
                                    <td>Invoice:</td>
                                    <td style={{ paddingLeft: 10 }}>INV 0116</td>
                                  </tr>
                                  <tr>
                                    <td>Date:</td>
                                    <td style={{ paddingLeft: 10 }}>
                                      14/05/2025
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Terms:</td>
                                    <td style={{ paddingLeft: 10 }}>Net 30</td>
                                  </tr>
                                  <tr>
                                    <td>Due Date:</td>
                                    <td style={{ paddingLeft: 10 }}>
                                      13/06/2025
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* PAYMENT TABLE */}
                    <table
                      style={{ width: "100%", borderBottom: "1px dashed #ccc" }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              backgroundColor: "#0ba6df21",
                              padding: 10,
                              color: "#0ba6df",
                            }}
                          >
                            DATE
                          </th>
                          <th
                            style={{
                              backgroundColor: "#0ba6df21",
                              padding: 10,
                              color: "#0ba6df",
                            }}
                          >
                            ACTIVITY
                          </th>
                          <th
                            style={{
                              backgroundColor: "#0ba6df21",
                              padding: 10,
                              color: "#0ba6df",
                            }}
                          >
                            AMOUNT
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td style={{ background: "#f2f2f2", padding: 10 }}>
                            {new Date(
                              payments?.payment_Date
                            ).toLocaleDateString("en-GB")}
                          </td>
                          <td style={{ background: "#f2f2f2", padding: 10 }}>
                            {payments?.paymentMethod}
                          </td>
                          <td style={{ background: "#f2f2f2", padding: 10 }}>
                            {payments?.paid_amount}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* EXTRA INFO */}
                    <table style={{ width: "100%", marginTop: 30 }}>
                      <tbody>
                        <tr>
                          <td style={{ fontSize: 14, fontWeight: 500 }}>
                            For convenience, you may process your payment
                            through internet banking on our following accounts.
                          </td>
                          <td style={{ fontWeight: 500, fontSize: 14 }}>
                            Balance Due
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontSize: 14, fontWeight: 500 }}>
                            Account Number:
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontSize: 14, fontWeight: 500 }}>
                            IBAN:
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontSize: 14, fontWeight: 500 }}>
                            Swift code:
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
