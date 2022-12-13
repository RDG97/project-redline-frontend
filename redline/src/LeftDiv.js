import redline from "/workspace/project-redline-frontend/redline/src/img/redline.png";
export default function LeftDiv(props) {
  function homeview() {
    props.setPage("home");
  }

  function car() {
    props.setLeftPage("car");
  }

  return (
    <div className="d-flex p-3 greyback text-white asside d-none d-lg-block">
      <img src={redline} className="img-fluid"></img>
      <button type="button" class="btn btn-primary mx-1" onClick={homeview}>
        Home
      </button>

      <button type="button" class="btn btn-primary" onClick={car}>
        Browse cars
      </button>
    </div>
  );
}
