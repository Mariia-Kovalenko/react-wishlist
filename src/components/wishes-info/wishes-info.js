import './wishes-info.css';
import WishForm from '../wish-form/wish-form'

const WishesInfo = ({count, done, onAdd, onToggleShow, showForm}) => {

        // - onAdd will be passed to wish form to be called in its 
        // method onSubmit if form was submitted
        // - onToggleSow will be triggered after click on a button
        // and change state of showModal in app
        // - showForm (true/false) value will be passed to wish form to toggle 
        // modal classnames

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
                                        onClick={onToggleShow}
                                        className="add-wish">
                                        <img src="images/add_wish.svg" alt=""/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <WishForm
                        showForm={showForm}
                        onAdd={onAdd}
                    /> 
                </section>
        )
}

export default WishesInfo;