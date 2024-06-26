import React, { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import logo from "../images/logo.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailValidator from "email-validator";
import PasswordValidator from "password-validator";
function SignUp() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const validatePassword = (password) => {
    const schema = new PasswordValidator();
    schema
      .is()
      .min(8)
      .is()
      .max(100)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits(1)
      .has()
      .not()
      .spaces();

    return schema.validate(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      toast.error("please enter a strong password ");
      return;
    }

    if (!EmailValidator.validate(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_NOT_SECRET_CODE}api/v1/auth/signup`,
        {
          email,
          password,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        Navigate("/login");
      } else {
        toast.error(res.data && res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <div style={{ backgroundColor: "rgb(248 250 252)", height: "100%" }}>
      {" "}
      <button
        type="button"
        class="btn  btn-back  mx-4 mt-5 h6    "
        onClick={() => Navigate("/")}
      >
        <small>
          <LeftOutlined className="align-baseline" /> Back
        </small>
      </button>
      <div className="d-flex flex-column gap-5 text-center">
        <div>
          {" "}
          <img src={logo} alt="logo" />
        </div>
        <div>
          <div className="fw-bold h4">Create Your Account</div>
        </div>
        <>
          <section className="bg-light mx-1 ">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4">
                  <div className="card border border-light-subtle rounded-4">
                    <div className="card-body  ">
                      <div className="row">
                        <div className="col-12"></div>
                      </div>
                      <form
                        onSubmit={handleSubmit}
                        action="#!"
                        className="h-100"
                      >
                        <div className="row gy-3 mx-1 mt-2 overflow-hidden">
                          <label htmlFor="email" className=" text-start">
                            <small className="fw-bold">Email address</small>
                          </label>
                          <div className="col-12">
                            <div className="form-floating ">
                              <input
                                style={{ fontSize: "12px" }}
                                type="email"
                                placeholder="your@example.com"
                                className="w-100 rounded
                              text-secondary
                              border border-grey font-weight-light p-2  blackquote    "
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <label
                            htmlFor="password"
                            className="form-label text-start"
                          >
                            <small className="fw-bold">Password</small>
                          </label>
                          <div className="col-12">
                            <div className="form-floating ">
                              <input
                                placeholder="......."
                                style={{ fontSize: "12px" }}
                                className="w-100 rounded
                            border border-grey font-weight-light text-secondary p-2 blackquote "
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <label
                            htmlFor="password"
                            className="form-label text-start"
                          >
                            <small className="fw-bold">
                              what is your favorite sports name
                            </small>
                          </label>
                          <div className="col-12">
                            <div className="form-floating ">
                              <input
                                placeholder="ex - cricket"
                                style={{ fontSize: "12px" }}
                                className="w-100 rounded
                            border border-grey font-weight-light text-secondary p-2 blackquote "
                                onChange={(e) => setAnswer(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="d-grid">
                              <button
                                style={{
                                  backgroundColor: "#0891b2",
                                  borderRadius: "10px",
                                }}
                                className="btn bsb-btn-xl mt-3  btn-primary"
                                type="submit"
                              >
                                Sign up
                              </button>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-check">
                              <label
                                className="form-check-label text-secondary"
                                htmlFor="iAgree"
                              >
                                <small>
                                  By signing up, you agree to our{" "}
                                  <Link
                                    to="/term-policy"
                                    className="link-primary text-decoration-none"
                                  >
                                    Terms And Condition{" "}
                                  </Link>
                                </small>
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
