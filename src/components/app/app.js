import {Component} from 'react';
import WishesInfo from '../wishes-info/wishes-info'
import WishForm from '../wish-form/wish-form'
import WishesList from '../wishes-list/wishes-list';
import './app.css'
import nextId from "react-id-generator";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlist: [
                {name: 'wish', category: 'default', done: true, id: 1},
                {name: 'wish 2', category: 'default', done: false, id: 2},
                {name: 'wish 3', category: 'default', done: false, id: 3}
            ],
            count: 3,
            done: 1,
        }
        this.maxId = nextId();
    }

    addWish = (name, category, done) => {
        const newItem = {
            name, 
            category,
            done: done,
            id: this.maxId++
        }

        this.setState((data) => {
            const newWishList = [...data.wishlist, newItem];
            const newCount = data.count++;
            return {
                wishlist: newWishList,
                count: newCount,
                done: data.done,
            }
        });
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
            }
        })
    }

    onToggleShow = () => {

    }

    render() {
        const totalWishesCount = this.state.count;
        const doneWishesCount = this.state.done;

        return (
            <div className="wrapper">
                <div className='container'>
                    <WishesInfo
                        count={totalWishesCount}
                        done={doneWishesCount}
                    />
                    <WishForm
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