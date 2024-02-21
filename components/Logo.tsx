import Image from "next/image"
import logo from "../public/logo.svg"

function Logo() {
    return (
        <div className=" h-20 w-20">
            <Image src={logo} width={1000} height={1000} alt="chakr-log" />
        </div>
    )
}
export default Logo