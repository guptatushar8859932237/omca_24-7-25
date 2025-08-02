import { DownloadDoneSharp } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { baseurl } from "../../Basurl/Baseurl";
export default function PAymentpdf() {
  const [payments, setPayments] = useState([]);
  const [objdata, setObjdata] = useState({});
  const location = useLocation();
  const targetRef = useRef();
  const { toPDF } = usePDF({ filename: "example.pdf" });
  const getAccordion = async () => {
    try {
      const response = await axios.get(
        `${baseurl}getAllPaymentsByPatientId/${location.state.data}`
      );
      if (response.data.success === true) {
        console.log(response.data.data.payments);
        setObjdata(response.data.data.patient);
        setPayments(response.data.data.payments);
      } else {
        console.log("something went worng");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getAccordion();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-end me-5 mb-3">
          <button className="add-button1">
            <DownloadDoneSharp style={{ cursor: "pointer" }} onClick={toPDF} />
          </button>
        </div>
        <section
          ref={targetRef}
          style={{ width: 900, margin: "auto", border: "2px solid #9c9c9cff" }}
        >
          <div style={{ height: 900, width: 900, padding: 40 }}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ padding: 0 }}>
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
                          <td style={{ width: "50%", verticalAlign: "top" }}>
                            <table
                              style={{ width: "100%", textAlign: "right" }}
                            >
                              <tbody>
                                <tr>
                                  <td>
                                    <img
                                      src="/img/omca-logo.png"
                                      style={{ maxWidth: "100%", height: 120 }}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table style={{ width: "100%", marginBottom: 30 }}>
                      <tbody>
                        <tr>
                          <td style={{ width: "50%", verticalAlign: "top" }}>
                            <p
                              style={{
                                paddingTop: 10,
                                marginBottom: 0,
                                fontSize: 14,
                                fontWeight: 500,
                                color: "#0ba6df",
                              }}
                            >
                              Invoice To: {objdata?.patient_name}
                            </p>
                          </td>
                          <td
                            style={{
                              width: "50%",
                              verticalAlign: "top",
                              textAlign: "right",
                            }}
                          >
                            <div
                              style={{
                                display: "inline-block",
                                textAlign: "left",
                              }}
                            >
                              <p
                                style={{
                                  paddingTop: 10,
                                  marginBottom: 10,
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
                                    <td
                                      style={{ fontSize: 14, fontWeight: 500 }}
                                    >
                                      Invoice:
                                    </td>
                                    <td
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        paddingLeft: 10,
                                      }}
                                    >
                                      INV 0116
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      style={{ fontSize: 14, fontWeight: 500 }}
                                    >
                                      Date:
                                    </td>
                                    <td
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        paddingLeft: 10,
                                      }}
                                    >
                                      14/05/2025
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      style={{ fontSize: 14, fontWeight: 500 }}
                                    >
                                      Terms:
                                    </td>
                                    <td
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        paddingLeft: 10,
                                      }}
                                    >
                                      Net 30
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      style={{ fontSize: 14, fontWeight: 500 }}
                                    >
                                      Due Date:
                                    </td>
                                    <td
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        paddingLeft: 10,
                                      }}
                                    >
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
                    <table
                      style={{ width: "100%", borderBottom: "1px dashed #ccc" }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              backgroundColor: "#0ba6df21",
                              fontSize: 14,
                              padding: 10,
                              fontWeight: 500,
                              color: "#0ba6df",
                              border: "1px solid #fff",
                            }}
                          >
                            DATE
                          </th>
                          <th
                            style={{
                              backgroundColor: "#0ba6df21",
                              fontSize: 14,
                              padding: 10,
                              fontWeight: 500,
                              color: "#0ba6df",
                              border: "1px solid #fff",
                            }}
                          >
                            ACTIVITY
                          </th>
                          <th
                            style={{
                              backgroundColor: "#0ba6df21",
                              fontSize: 14,
                              padding: 10,
                              fontWeight: 500,
                              color: "#0ba6df",
                              border: "1px solid #fff",
                            }}
                          >
                            DESCRIPTION
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments &&
                          payments &&
                          payments.map((item, index) => {
                            console.log(item);
                            return (
                              <>
                                <tr key={index}>
                                  <td
                                    style={{
                                      backgroundColor: "#f2f2f2",
                                      padding: 10,
                                      border: "1px solid #fff",
                                    }}
                                  >
                                    {item?.paid_amount}
                                  </td>
                                  <td
                                    style={{
                                      backgroundColor: "#f2f2f2",
                                      padding: 10,
                                      border: "1px solid #fff",
                                    }}
                                  >
                                    {item.paymentMethod}
                                  </td>
                                  <td
                                    style={{
                                      backgroundColor: "#f2f2f2",
                                      padding: 10,
                                      border: "1px solid #fff",
                                    }}
                                  >
                                    {new Date(
                                      item.payment_Date
                                    ).toLocaleDateString("en-GB")}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </tbody>
                    </table>
                    <table style={{ width: "100%", marginBottom: 30 }}>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              width: "50%",
                              paddingTop: 10,
                              marginBottom: 0,
                              fontSize: 14,
                              fontWeight: 500,
                            }}
                          >
                            For convenience, you may process your payment
                            through
                          </td>
                          <td style={{ fontWeight: 500, fontSize: 14 }}>
                            Balance Due
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              width: "50%",
                              marginBottom: 0,
                              fontSize: 14,
                              fontWeight: 500,
                            }}
                          >
                            internet banking on our following account:
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              width: "50%",
                              marginBottom: 0,
                              fontSize: 14,
                              fontWeight: 500,
                            }}
                          >
                            Account Number:
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              width: "50%",
                              marginBottom: 0,
                              fontSize: 14,
                              fontWeight: 500,
                            }}
                          >
                            IBAN:
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              width: "50%",
                              marginBottom: 0,
                              fontSize: 14,
                              fontWeight: 500,
                            }}
                          >
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
