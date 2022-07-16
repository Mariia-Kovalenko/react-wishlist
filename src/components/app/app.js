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
            wishlist: [],
            // [
            //     {name: 'wish', desc: '', category: 'default', done: true, id: 1},
            //     {name: 'wish 2', desc: '', category: 'default', done: false, id: 2},
            //     {name: 'wish 3', desc: '', category: 'default', done: false, id: 3}
            // ],
            count: 0,
            done: 0,
            showForm: false,
            categories: [
                {id: 1, name: 'no-category'},
                {id: 2, name: 'Birthday'},
                {id: 3, name: 'Travelling'},
            ]
        }
    }

    componentDidMount() {
        this.getWishlistFromLocal();
    }

    componentDidUpdate() {
        // console.log('update');
        this.updateLocal();
    }

    getWishlistFromLocal = () => {
        const wishList = this.loadDataLocalStorage();
        const doneWishes = this.countDoneWishes(wishList);
        this.setState({
            wishlist: wishList, 
            count: wishList.length, 
            done: doneWishes
        })
    }

    loadDataLocalStorage = () => {
        if(!localStorage.wishlist){
            return [];
        }else{
            return JSON.parse(localStorage.getItem('wishlist'));
        }
    }

    updateLocal() {
        //adding array to browser local storage (making it JSON)
        localStorage.setItem('wishlist', JSON.stringify(this.state.wishlist));
        // localStorage.setItem('wishCategories', JSON.stringify(wishCategories));
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

            const doneWishes = this.countDoneWishes(wishes);
            // wishes.reduce((acc, curr) => {
            //     if (curr.done) {
            //         acc++;
            //     }
            //     return acc;
            // }, 0);

            return {
                wishlist: wishes,
                done: doneWishes,
            }
        })
    }

    countDoneWishes = (wishes) => {
        return wishes.reduce((acc, curr) => {
            if (curr.done) {
                acc++;
            }
            return acc;
        }, 0);
    }

    onToggleShow = () => {
        this.setState((data) => {
            return {
                showForm: !data.showForm,
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
                }
            });
        }
        console.log(this.state.count, this.state.done);
        // change state to hide form modal
        this.onToggleShow();
    }

    deleteWish = (id) => {
        this.setState((data) => {
            return {
                wishlist: data.wishlist.filter(el => el.id !== id),
                count: --data.count,
                // done: data.done,
                // showForm: data.showForm,
                // categories: data.categories
            }
        })
    }

    addCategory = (name) => {
        const contains = this.state.categories.find(item => item.name === name);
        console.log(contains);
        if (!contains) {
            const newItem = {
                // id: uuid(),
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
        } else {
            this.setState((data) => {               
                return {
                    wishlist: data.wishlist,
                    count: data.count,
                    done: data.done,
                    showForm: data.showForm,
                    categories: data.categories
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
                        onDelete={this.deleteWish}
                    />
                </div>
            </div>
        )
    }
}

export default App;