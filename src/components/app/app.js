import {Component} from 'react';
import WishesInfo from '../wishes-info/wishes-info'
// import WishForm from '../wish-form/wish-form'
import WishesList from '../wishes-list/wishes-list';
import Skeleton from '../skeleton/skeleton';
import './app.css'
import { v4 as uuid } from 'uuid';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlist: [],
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

    // receive wishlist from localStorage as soon as component mounted
    componentDidMount() {
        this.getWishlistFromLocal();
    }

    // will be invoked each time we change state 
    // (e.g. add wish, delete wish, update wish status etc.)
    componentDidUpdate(prevProps, prevState) {
        // check of prev and curr props
        if (prevState.count !== this.state.count || prevState.done !== this.state.done) {
            this.updateLocal();
            // console.log('update');
        }
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
        // console.log(this.state.count, this.state.done);
        // change state to hide form modal
        this.onToggleShow();
    }

    deleteWish = (id) => {
        this.setState((data) => {
            const updatedWishList = data.wishlist.filter(el => el.id !== id);
            const newDone = updatedWishList.reduce((acc, curr) => {
                if (curr.done) {
                    return acc+=1;
                }
                return acc;
            }, 0)
            return {
                wishlist: updatedWishList,
                count: --data.count,
                done: newDone 
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
        const wishesContent = this.state.wishlist.length ? null : <Skeleton/>

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
                    {wishesContent}
                </div>
            </div>
        )
    }
}

export default App;