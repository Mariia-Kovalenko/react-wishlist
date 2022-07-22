import './wish-item.css';

const WishItem = (props) => {

    // gets the properties from WishList component
    const {name, category, desc, done, onToggleDone, onDelete} = props;

    let classNames = "wishlist__item wish ";
    let checkmarkSrc = "images/checkmark-green.svg";
    let trashSrc = "images/trash-grey.svg";

    if (done) {
        checkmarkSrc = "images/checkmark-white.svg";
        classNames += "completed";
        trashSrc = "images/trash-white.svg";
    }

    return (
        <div id = "wish-item" className={classNames}>
        <div className="wish__inner">
            {/* <div className="wish__image">
                <img src="images/shopping-bag.png" alt="img"/>
            </div> */}
            <div className="wish__data">
                <div className="wish__name">{name}</div>
                <div className="wish__category">{category}</div>
                <div className="wish__desc">{desc}</div>
            </div>
        </div>
        <div className="wish__icons">
            <button 
            // calls onToggleDone for current item on click
                onClick={onToggleDone}
                id = "done-wish">
                <img src={checkmarkSrc} alt="checkmark"/>
            </button>

            <button 
                id = "delete-wish"
                onClick={onDelete}>
                <img src={trashSrc} alt="trash"/>
            </button>
        </div>
        </div>
    )
}

export default WishItem;