
const Cards = async ({parm}) => {
        debugger;
        var importIcon =  await import('../../Assets/icons/' + parm.logoURI + '.svg');
     
        return (
        <>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={ importIcon.default } alt="Avatar" style={{width:"300px",height:"300px"}}/> 
                    </div>
                    <div className="flip-card-back">
                        <h1>John Doe</h1>
                        <p>Architect & Engineer</p>
                        <p>We love that guy</p>
                    </div>
                </div>
            </div>
        </>
        );
}
export default Cards;