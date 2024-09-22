import React from "react";

const HomepageComponent = () => {
  const bookImages = [
    "https://images.ctfassets.net/qpn1gztbusu2/60HLVtfnEvhRum8cNQA8op/d2b3d76c7a230cfa91ce32894b52abca/quote-2-2.png?fm=jpg&w=3840&q=70",
    "https://hips.hearstapps.com/hmg-prod/images/annie-dillard-book-quote-1531936023.jpg",
    "https://media.istockphoto.com/id/1090896622/vector/reading-is-always-a-good-idea.jpg?s=612x612&w=0&k=20&c=2sgH8VoJKVCU3WBVy1je76u8CmMKZoRagKbSNbTByh4=",
  ];

  return (
    <div className="">
      <img
        src="https://images.pexels.com/photos/4245019/pexels-photo-4245019.jpeg?auto=compress&cs=tinysrgb&w=1200"
        className="img-fluid my-4"
        style={{ width: "1300px", height: "700px", objectFit: "cover" }}
      />
      <div className="row mt-4">
        {bookImages.map((image, index) => (
          <div key={index} className="col-md-4 ">
            <div className="card mb-3 border-light">
              {/* <div className="d-flex justify-content-around"> */}
              <div className="row g-0">
                <div className="col-md-6 text-center">
                  <img
                    src={image}
                    className="img-fluid "
                    alt="Book image"
                    style={{ width: "350px", height: "300px" }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title ">New Arrivals</h5>
                    <h4>Latest Collections</h4>
                    <p className="card-text">
                      There is no friend as loyal as a book. A book is a gift
                      you can open again and again.
                    </p>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomepageComponent;
