import './App.css';
import ItemList from "./component/ItemList";


function App() {
  return (
    <div className="container-fluid bg-light">
      <div className='row'>
        <div className='col-12'>
          <h1 className='text-info text-center fw-light'>
            Épicerie
          </h1>
        </div>
      </div>
        <div className="row">
            <div className="col-8 mx-auto">
                <ItemList/>
            </div>
        </div>
    </div>
  );
}

export default App;
