import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Header from './components/Header'
import Category from './components/Category'
import HomepageComponent from './components/HomepageComponent'



//const categories = ["Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Romance", "Mystery","Business", "Kids"];

export default function App() {


  return (<>
    <Header/>
    <main className='bg-warning-subtle py-3 ' >
      <div className="container">
      <h2>Featured Categories</h2>
        <Category/>

<HomepageComponent/>
        </div>
    </main>
    </>)
}

