import _ from "lodash";

export default function NextCar(props) {
  function homeview() {
    props.setPage("home");
  }

  function car() {
    props.setLeftPage("car");
  }
  let cars = props.car;

  const carRows = _.map(Object.values(cars), (product, id) => {
    console.log(product)
    return product.map(item => {
        const trims = item.model_trim
        console.log(trims)
        return <p key={id} className="bg-danger text-light">{trims}</p>
    })
  });
  console.log(carRows);

  return (
    <div className="d-flex p-3 greyback text-white asside d-none d-lg-block">
      <button type="button" class="btn btn-primary" onClick={homeview}>
        (HERE 4 DEBUG) home view
      </button>
      <br></br>
      <button type="button" class="btn btn-primary" onClick={car}>
        LOOK AT CAR
      </button>

      {carRows}
    </div>
  );
}
