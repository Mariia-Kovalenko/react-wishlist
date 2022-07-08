import './wish-form.css';
import {Component} from 'react';

class WishForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: 'no-categ',
            done: false
        }
    }

    // sets the name of state to the value of input
    onValueChange = (e) => {
        this.setState({
            [e.target.name]:  e.target.value,
        })
    }

    // calls addWish when form is submitted
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.name, this.state.category, this.state.done);
        this.setState({
            name: '',
            category: 'no-categ',
            done: false
        })
    }

    render() {
        // get the wish name from state
        const {name} = this.state;
        let classNames = "modal "

        // check if form needs to be opened
        const showForm = this.props.showForm;
        if (!showForm) {
            classNames += "hide"
        }

        return (
            <div id="modal-form" className={classNames}>
                    <div className="modal__dialog">
                        <div className="modal__content">
                            <form  
                                onSubmit={this.onSubmit}>
                                <div className="modal__top">
                                    <div className="modal__title">Add Wish</div>
                                    <button className="modal__close">
                                        <img src="images/close.svg" alt="close"/>
                                    </button>
                                </div>
                                <div className="modal__inputs inputs">
                                    
                                    <div className="inputs__block">
                                        <label htmlFor="name">Wish Name</label>
                                        <input 
                                            id ="wish-name" 
                                            className="modal__input" 
                                            type="text" 
                                            name="name"
                                            value={name}
                                            onChange={this.onValueChange}
                                            />
    
                                        <label htmlFor="desc">Wish Describtion</label>
                                        <textarea id ="wish-desc" className="modal__textarea" type="text" name="desc"></textarea>
                                    </div>
                                    
    
                                    <div className="inputs__block">
                                        <label htmlFor="categs">Choose Category</label>
                                        <select className="modal__select" name="categs" id="categs">
                                            <option value="no category">No category</option>
                                            <option value="Birthday">Birthday</option>
                                            <option value="Travelling">Travelling</option>
                                        </select>
    
                                        <label htmlFor="category">Or Create Category</label>
                                        <input className="modal__input" type="text" name="category" id="category"/>
                                    </div>
    
                                    <input type="submit" 
                                        id ="add-wish-btn"  
                                        className= "submit" 
                                        value="Add Wish"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }
}

export default WishForm;