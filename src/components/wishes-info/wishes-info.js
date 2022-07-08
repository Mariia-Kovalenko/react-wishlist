import './wishes-info.css';

const WishesInfo = ({count, done}) => {


        return (
            <section className="top-section">
                    <div className="top-section__image">
                        <img src="images/boy.svg" alt="boy"/>
                    </div>
                    <div className="top-section__content content">
                        <div className="content__heading">My Wishlist</div>
                        <div className="content__inner">
                            <div className="content__items items">
                                <div className="items__wishes itemblock">
                                    <img src="images/heart.svg" alt="heart"/>
                                    <p>Wishes</p>
                                    <p id="wishes-count" className="count">{count}</p>
                                </div>
                                <div className="items__done itemblock">
                                    <img src="images/checkmark.svg" alt="heart"/>
                                    <p>Done</p>
                                    <p id="wishes-done" className="count">{done}</p>
                                </div>
                                <div className="items__button">
                                    <button 
                                        className="add-wish">
                                        <img src="images/add_wish.svg" alt=""/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        )
}

export default WishesInfo;