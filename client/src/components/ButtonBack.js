
export default function ButtonBack({ clean }) {

  const handlerClose = () => {
    if(clean) clean()
    window.history.back()
  }

  return (
    <button className="btn-close-detail" onClick={handlerClose}>
      Close
    </button>
  )
}