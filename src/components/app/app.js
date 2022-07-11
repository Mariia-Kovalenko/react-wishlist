import {Component} from 'react';
import WishesInfo from '../wishes-info/wishes-info'
// import WishForm from '../wish-form/wish-form'
import WishesList from '../wishes-list/wishes-list';
import './app.css'
import { v4 as uuid } from 'uuid';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlist: [
                {name: 'wish', desc: '', category: 'default', done: true, id: 1},
                {name: 'wish 2', desc: '', category: 'default', done: false, id: 2},
                {name: 'wish 3', desc: '', category: 'default', done: false, id: 3}
            ],
            count: 3,
            done: 1,
            showForm: false,
            categories: [
                {id: 1, name: 'no-category'},
                {id: 2, name: 'Birthday'},
                {id: 3, name: 'Travelling'},
            ]
        }
    }

    onToggleDone = (id) => { 
        this.setState((data) => {
            const wishes = data.wishlist.map(item => {
                if (item.id === id) {
                    return {
                        ...item, 
                        done: !item.done
                    }
                }
                return item;
            });

            const doneWishes = wishes.reduce((acc, curr) => {
                if (curr.done) {
                    acc++;
                }
                return acc;
            }, 0);

            return {
                wishlist: wishes,
                count: data.count,
                done: doneWishes,
                showForm: data.showForm,
                categories: data.categories
            }
        })
    }

    onToggleShow = () => {
        this.setState((data) => {
            return {
                wishlist: data.wishlist,
                count: data.count,
                done: data.done,
                showForm: !data.showForm,
                categories: data.categories
            }
        })
        // console.log(this.state.showForm);
    }

    addWish = (name, desc, category, done) => {
        const newItem = {
            name, 
            desc,
            category,
            done: done,
            id: uuid()
        }

        if (newItem.name) {
            this.setState((data) => {
                const newWishList = [...data.wishlist, newItem];
                return {
                    wishlist: newWishList,
                    count: ++data.count,
                    done: data.done,
                    showForm: data.showForm,
                    categories: data.categories
                }
            });
        }
        // change state to hide form modal
        this.onToggleShow();
    }

    addCategory = (name) => {
        const newItem = {
            id: uuid(),
            name: name
        }

        if (newItem.name) {
            this.setState((data) => {
                const newCategList = [...data.categories, newItem];
                
                return {
                    wishlist: data.wishlist,
                    count: data.count,
                    done: data.done,
                    showForm: data.showForm,
                    categories: newCategList
                }
            });
        }
    }

    render() {
        const totalWishesCount = this.state.count;
        const doneWishesCount = this.state.done;

        // console.log(this.state.categories);

        return (
            <div className="wrapper">
                <div className='container'>
                    <WishesInfo
                        onToggleShow={this.onToggleShow}
                        showForm={this.state.showForm}
                        count={totalWishesCount}
                        done={doneWishesCount}
                        onAdd={this.addWish}
                        addCategory={this.addCategory}
                        categories={this.state.categories}
                    />
                    <WishesList
                        data={this.state.wishlist}
                        onToggleDone={this.onToggleDone}
                    />
                </div>
            </div>
        )
    }
}

export default App;