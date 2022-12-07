export default function LeftDiv(props) {
    function homeview() {
        props.setPage('home')
    }

    function car() {
        props.setLeftPage('car')
    }


    return(
        <div className='d-flex p-3 greyback text-white asside d-none d-lg-block'>
        <button type="button" class="btn btn-primary" onClick={homeview} >(HERE 4 DEBUG) home view</button>
        <br></br>
        <button type="button" class="btn btn-primary"  onClick={car}>LOOK AT CAR</button>
        </div>
    )
}