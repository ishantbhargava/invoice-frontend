import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePdf } from "./Preview";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function YourInfo({ invoice, sendData }) {
  const navigate = useNavigate("");
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [code, setCode] = useState();
  const [country, SetCountry] = useState();
  const [email, setEmail] = useState();
  const [tax, setTax] = useState();
  const [notes, setNotes] = useState();
  const { downloadPdf } = usePdf();
  const [loader, setLoader] = useState(false);

  const sendDataToParent = () => {
    // let hasInvalidPrice = false;
    // if (parseFloat(tax) <= 0 || parseFloat(tax) <= 0) {
    //   hasInvalidPrice = true;
    // }
    // if (hasInvalidPrice) {
    //   toast.error("tax should be a positive number");
    //   return;
    // }

    sendData(name, address, city, state, code, country, email, tax, notes);
  };
  const downloadFunction = async () => {
    setLoader(true);
    await downloadPdf();
    navigate("/dashboard");
    setLoader(false);
  };
  useEffect(() => {
    sendDataToParent();
  }, [name, address, city, state, code, country, email, tax, notes]);
  return (
    <div>
      <div>
        <div className=" bg-white mx-auto  border rounded ">
          <div className="mx-4 py-3 ">
            <h4 className="fw-bold pt-3 ">Generate invoice</h4>

            <small>create an invoice for {invoice?.companyName}</small>
            <div className="me-2 mt-3">
              <h5 className="fw-bold text-secondary">YourInfo</h5>
              <label className="gene-page-text"> Name/Company</label>
              <input
                onChange={(e) => setName(e.target.value)}
                style={{ fontSize: "14px", fontWeight: "390" }}
                placeholder="Your name"
                className="w-100 rounded 
                        border border-grey font-weight-light p-2 mt-2   text-secondary  blackquote    "
              />
            </div>
            <div className="me-2 mt-3">
              <label className="gene-page-text"> Your Address</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                style={{ fontSize: "14px", fontWeight: "390" }}
                placeholder="Your Address"
                className="w-100 rounded 
                        border border-grey font-weight-light p-2 mt-2   text-secondary  blackquote    "
              />
            </div>
            <div className="mt-2 d-flex gap-3">
              <div className="w-100">
                <label className="gene-page-text">City</label>
                <input
                  onChange={(e) => setCity(e.target.value)}
                  style={{ fontSize: "14px", fontWeight: "390" }}
                  type="text"
                  placeholder="Your City"
                  className="w-100 rounded 
                        border border-grey font-weight-light p-2 mt-2   text-secondary  blackquote    "
                />
              </div>
              <div className="w-100">
                <label className="gene-page-text">State</label>
                <input
                  onChange={(e) => setState(e.target.value)}
                  style={{ fontSize: "14px", fontWeight: "390" }}
                  type="text"
                  placeholder="Your State"
                  className="w-100 rounded 
                        border border-grey font-weight-light p-2 mt-2   text-secondary  blackquote    "
                />
              </div>
            </div>

            <div className="mt-2 d-flex gap-3">
              <div className="w-100">
                <label className="gene-page-text">Zip Code</label>
                <input
                  onChange={(e) => setCode(e.target.value)}
                  style={{ fontSize: "14px", fontWeight: "390" }}
                  type="text"
                  placeholder="Zip Code"
                  className="w-100 rounded 
                        border border-grey font-weight-light p-2 mt-2   text-secondary  blackquote    "
                />
              </div>
              <div className="w-100">
                <label className="gene-page-text">Country</label>
                <input
                  onChange={(e) => SetCountry(e.target.value)}
                  style={{ fontSize: "14px", fontWeight: "390" }}
                  type="text"
                  placeholder="Your Country"
                  className="w-100 rounded 
                        border border-grey font-weight-light p-2 mt-2   text-secondary  blackquote    "
                />
              </div>
            </div>

            <div className="me-2 mt-3">
              <label className="gene-page-text"> Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                style={{ fontSize: "14px", fontWeight: "390" }}
                placeholder="Your Email (optional) "
                className="w-100 rounded 
                        border border-grey font-weight-light p-2 mt-2   text-secondary  blackquote    "
              />
            </div>

            <div className="me-2 mt-3">
              <label className="gene-page-text">Tax Rate</label>
              <input
                onChange={(e) => setTax(e.target.value)}
                style={{ fontSize: "14px", fontWeight: "390" }}
                placeholder="0"
                type="number"
                className="w-100 rounded 
                        border border-grey font-weight-light p-2 mt-2   text-secondary  blackquote    "
              />
            </div>
            <div className="me-2 mt-3">
              <label className="gene-page-text">Notes</label>
              <textarea
                onChange={(e) => setNotes(e.target.value)}
                style={{ fontSize: "14px", fontWeight: "390" }}
                placeholder="type you notes here"
                type="Your email"
                className="w-100 rounded 
                        border border-grey font-weight-light p-2 mt-2   text-secondary  blackquote    "
              />
            </div>
            <div className="col-12 mb-3">
              <div className="d-grid ">
                <button
                  onClick={downloadFunction}
                  disabled={!(loader === false)}
                  style={{
                    backgroundColor: "#0891b2",
                    borderRadius: "8px",
                  }}
                  className="btn bsb-btn-xl mt-3   btn-primary"
                  type="submit"
                >
                  {loader ? (
                    <span>downloading</span>
                  ) : (
                    <span>Download invoice</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default YourInfo;
