import "./header.css";

function Header({ heading }) {
    return (
        <>
            <header>
                <h3 className="header-item">
                    {heading}
                </h3>
            </header>
        </>
    )
}

export default Header