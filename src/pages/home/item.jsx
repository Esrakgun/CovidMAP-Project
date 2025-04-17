import { PiVirus } from "react-icons/pi";


const Item = ({ color, text, value }) => {

    return (
        <div className="flex gap-4 items-center">
            <PiVirus data-testid="icon" className={`${color} text-2xl md:text-5xl`} />

            <div>
                <span className="text-gray-500 text-xl lg:text-sm max-md:hidden">{text}</span>
                <h2 className="tex-lg md:text-2xl">{value}</h2>
            </div>

        </div>
    )
}

export default Item;

