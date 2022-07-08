import './wishes-list.css'
import WishItem from '../wish-item/wish-item'

const WishesList = ({data, onToggleDone}) => {
    const items = data.map(item => {
        const {id, ...itemProps} = item;

        // itemProps will contain name, categ, done etc.
        //id - unique for react to check, if item was changed
        // onToggleDode will be called for item with current id

        return (
            <WishItem 
                key= {id}
                {...itemProps}
                onToggleDone = {() => onToggleDone(id)}
            />
        )
    })
    return (
        <section className="wishes">
            <div className="wishes__heading">My Wishes</div>
            <div id = "wishes-container" className="wishes__list wishlist">
                {items}
            </div>
        </section>
    )
}

export default WishesList