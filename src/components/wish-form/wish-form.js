import './wish-form.css';
import {Component} from 'react';
import Category from "../category/category";

class WishForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            desc: '',
            category: props.categories[0].name,
            done: false,
            categories: props.categories,
            disable: false
        }
    }

    // sets the name or desc of state to the value of input
    onValueChange = (e) => {
        this.setState({
            [e.target.name]:  e.target.value,
        })
    }

    // calls addWish when form is submitted
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.name, this.state.desc, this.state.category, this.state.done);
        this.props.addCategory(this.state.category);
        this.setState({
            name: '',
            desc: '',
            category: this.props.categories[0].name,
            done: false,
            categories: this.props.categories,
            disable: false
        })
    }

    onSelectChange = (e) => {
        let disable = false;
        if (e.target.value !== 'no-category') {
            disable = true
        } 
        this.setState({
            category: e.target.value,
            disable: disable
        });
    }

    onCategoryAdd = (e) => {
        this.setState({
            category: e.target.value,
            disable: false
        });
    }

    render() {
        // console.log('form render', this.props.categories);
        // get categories from app.js
        let categories = this.props.categories.map(item => {
            const {name} = item;
            return (
                <Category
                    key={name}
                    name={name}
                />
            )
        });

        // get the wish name from state
        const {name, desc, category, disable} = this.state;
        // console.log(category);

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
                                        <textarea 
                                            id ="wish-desc" 
                                            className="modal__textarea" 
                                            type="text" 
                                            maxlength="100"
                                            name="desc"
                                            value={desc}
                                            onChange={this.onValueChange}/>
                                    </div>
                                    
    
                                    <div className="inputs__block">
                                        <label htmlFor="categs">Choose Category</label>
                                        <select 
                                            className="modal__select" 
                                            name="categs" 
                                            id="categs"
                                            value={category}
                                            onChange={this.onSelectChange}>
                                            {categories}
                                        </select>
    
                                        <label htmlFor="category">Or Create Category</label>
                                        <input 
                                            className="modal__input" 
                                            type="text" 
                                            name="new-category" 
                                            id="category"
                                            disabled={disable}
                                            value={category === 'no-category' ? '' : category}
                                            onChange={this.onCategoryAdd}
                                            />
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