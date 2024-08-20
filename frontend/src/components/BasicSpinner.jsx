
const BasicSpinner = ({className}) => {
  return (
    <div className={`flex flex-row animate-pulse justify-center items-center h-full ${className}`}>
      <div className="bg-buff w-3 h-3 rounded-full animate-bounce" style={{animationDelay: "0.0s"}}></div>
      <div className="bg-buff w-3 h-3 ml-1.5 rounded-full animate-bounce" style={{animationDelay: "0.25s"}}></div>
      <div className="bg-buff w-3 h-3 ml-1.5 rounded-full animate-bounce" style={{animationDelay: "0.5s"}}></div>
    </div>
  )
}

export default BasicSpinner