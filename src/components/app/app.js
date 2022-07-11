import {Component} from 'react';
import WishesInfo from '../wishes-info/wishes-info'
// import WishForm from '../wish-form/wish-form'
import WishesList from '../wishes-list/wishes-list';
import './app.css'
import nextId from "react-id-generator";

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
            showForm: false
        }
        this.maxId = nextId();
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
                showForm: data.showForm
            }
        })
    }

    onToggleShow = () => {
        this.setState((data) => {
            return {
                wishlist: data.wishlist,
                count: data.count,
                done: data.done,
                showForm: !data.showForm
            }
        })
        console.log(this.state.showForm);
    }

    addWish = (name, desc, category, done) => {
        const newItem = {
            name, 
            desc,
            category,
            done: done,
            id: this.maxId++
        }

        if (newItem.name) {
            this.setState((data) => {
                const newWishList = [...data.wishlist, newItem];
                return {
                    wishlist: newWishList,
                    count: ++data.count,
                    done: data.done,
                    showForm: data.showForm
                }
            });
        }
        // change state to hide form modal
        this.onToggleShow();
    }

    render() {
        const totalWishesCount = this.state.count;
        const doneWishesCount = this.state.done;

        return (
            <div className="wrapper">
                <div className='container'>
                    <WishesInfo
                        onToggleShow={this.onToggleShow}
                        showForm={this.state.showForm}
                        count={totalWishesCount}
                        done={doneWishesCount}
                        onAdd={this.addWish}
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