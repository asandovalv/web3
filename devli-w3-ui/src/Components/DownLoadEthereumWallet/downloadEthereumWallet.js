import { Link } from "react-router-dom"

const downloadEthereumWallet = () => {
    return (
        <>
        <h3>You have to install MetaMask to start using this app... Please visit this 
            <Link to="https://metamask.io/download/">link</Link>
            for download it and follow the instructions for install it and create your account.
            After that you'll be able for enjoy the app. Thank You!!
        </h3>
        </>
    )
}

export default downloadEthereumWallet;