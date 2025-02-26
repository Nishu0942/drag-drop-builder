const Button = ({widget}) =>{

    const handleClick = () =>{
        alert("button clicked")
    }
    return (<button className="p-2 min-w-[150px] bg-green-500 text-white rounded hover:bg-green-600 transition" onClick={handleClick}> 
        {widget.content || "Click Me"}
      </button>)
}

export default Button;