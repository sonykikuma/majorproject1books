import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./userSlice";
import Header from "../../components/Header";
import AddressList from "../../components/AddressList";
import { useEffect } from "react";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  console.log(user);
  return (
    <>
      <Header />
      <div>
        {status === "loading" && <p>fetching user...</p>}
        {error && <p>An error occured while fetching user</p>}
        <div className="container py-4">
          <h2 className="text-center mt-4">
            <span className="text-primary">My Profile </span> | {user.name}
          </h2>
          <div className="d-flex justify-content-center mt-3">
            <div className=" text-center">
              <div className=" px-3 pt-3 d-flex  align-items-center ">
                <div
                  className="rounded-circle border-primary "
                  style={{
                    width: "200px",
                    height: "200px",
                    backgroundColor: "#e9ecef",
                  }}
                >
                  <img
                    src="https://st.depositphotos.com/2309453/3449/i/450/depositphotos_34490345-stock-photo-confident-casual-unshaven-young-man.jpg"
                    alt=""
                    className="rounded-circle border-primary "
                    style={{
                      width: "200px",
                      height: "200px",
                      backgroundColor: "#e9ecef",
                      objectFit: "cover",
                    }}
                  />
                </div>{" "}
                <h4 className="py-1 pt-2  ms-3">
                  <span className="display-4 text-primary fs-2">Hello</span>,{" "}
                  {user.name}
                </h4>
              </div>
              <div className="py-1 px-3">
                <h4 className="">
                  {" "}
                  <span className="me-2 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-envelope"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                    </svg>
                  </span>
                  {user.email}
                </h4>
              </div>
              <div className=" px-3">
                <h4 className="">
                  {" "}
                  <span className="me-2 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-telephone"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                    </svg>
                  </span>{" "}
                  {user.phoneNumber}
                </h4>
              </div>
              {/* <div className=" px-3 ">
                <h5 className="">Saved Addresses</h5>
                <ol className="">
                  {user.addresses?.map((address) => (
                    <li key={address._id}>
                      {address.addressLine1}, {address.city}, {address.state},{" "}
                      {address.postalCode}, {address.country}
                    </li>
                  ))}
                </ol>
              </div> */}
            </div>
          </div>
        </div>
        <div className="container">
          <AddressList />
        </div>
      </div>
    </>
  );
};
export default User;
