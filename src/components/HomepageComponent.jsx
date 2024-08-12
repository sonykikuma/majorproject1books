import React from 'react';

const HomepageComponent = () => {

const bookImages=[
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3yMGBaWagk6SdNsEFSnx3PWrlUazX-kEGQ&s",
  "https://hips.hearstapps.com/hmg-prod/images/annie-dillard-book-quote-1531936023.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiGSQNwzU8NDNw7BKQtazzeAYcOH8Ztt9Gvg&s"
]
  
  return (
    <div className="">
      <img src="https://images.pexels.com/photos/4245019/pexels-photo-4245019.jpeg?auto=compress&cs=tinysrgb&w=1200"  
        className="img-fluid my-4" style={{width:"1300px",height:"700px", objectFit:"cover"}}
        />
      <div className="row mt-4">
        
        {bookImages.map((image,index) => ( 
      
      <div key={index} className="col-md-4 ">
        
      <div className="card mb-3 border-light" >
        {/* <div className="d-flex justify-content-around"> */}
          <div className="row g-0">
          <div className="col-md-6 text-center">
            <img src={image} className="img-fluid " alt="Book image"             style={{ width:"350px",height:"300px"}}
/>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title ">New Arrivals</h5>
              <h4>Summer Collections</h4>
              <p className="card-text">This is a wider card with supporting text below as a natural lead.</p>
            </div>
          </div>
        </div>
      </div>                                 </div>
))}
      </div>
    </div>
  );
};

export default HomepageComponent;


