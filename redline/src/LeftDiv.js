export default function LeftDiv(props) {
    function homeview() {
        props.setPage('home')
    }
    

    return(
        <div className='d-flex p-3 bg-danger text-white asside d-none d-lg-block'>
        <button type="button" class="btn btn-primary" onClick={homeview} >(HERE 4 DEBUG) home view</button>
        </div>
    )
}