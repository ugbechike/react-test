import React from 'react';
import {
    Container,
} from 'react-bootstrap';
import axios from 'axios';
import { relativeTime } from '../helpers';
import Ads from './Ads';
import SortProduct from './SortProduct';
import Loader from './Loader';

export default class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            newProducts: [],
            sort: undefined,
            scrolling: true,
            moreData: false,
            endScroll: false,
        }
        this.handleScrolling = this.handleScrolling.bind(this);
        this.pages = 0;
        this.limit = 20;
        this.pageEnd = this.limit;
    }

//THIS MEANS WHEN THE APP LOADS, WE FETCH ALL THE DATA FROM THE JSON SERVER. IT IS REACT COMPONENT LIFECYCLE
//ALSO ADD JAVASCRIPT EVENT LISTENER TO THE SCROLL FUNCTION 
    componentDidMount() {
        this.loadProduct(`${API_URL}/products`);
        window.addEventListener("scroll", this.handleScrolling);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScrolling);
    }

    //FUNCTION THAT HANDLE FETCHING OF DATA USING AXIOS
    loadProduct(url) {
        axios.get(url).then(response => {
            this.setState({
                scrolling: false,
                products: response.data
            })
            this.filterProducts();
        })
    }

    //THIS FUNCTION HANDLES SORTING OF PRICES, SIZE AND ID
    handleSort(event) {
        this.setState({ scrolling: true, moreData: false, endScroll: false })
        let { name, value } = event.target;
        axios.get(`${API_URL}/api/products?_sort=${value}`).then(response => {
            this.setState({
                scrolling: false,
                products: response.data
            })
            this.filterProducts();
        })
    }

    //THIS FUNCTION WAS USED TO FILTER THE DATA COMING FROM OUR LOCAL DATABASE SERVER.JS
    //INSIDE THE FUNCTION WE CHECKED IF THE LENGTH OF DATA INSIDE THE PRODUCT ARRAY IS LESS THAN THE ADDED LIMITS
    filterProducts() {
        if (this.state.products.length < this.pageEnd) {
            this.setState({
                endScroll: true
            })
            // return;
        }
        this.setState({
            newProducts: this.state.products.slice(0, this.pageEnd),
            pages: this.pages += this.limit,
            pageEnd: this.pageEnd += this.limit
        })
    }

    //THE FUNCTION THAT HANDLES THE INFINITE SCROLL
    handleScrolling() {
        setTimeout(() => {
            this.setState({ moreData: true, endScroll: false })
            let { clientHeight, scrollHeight, offsetHeight, pageYOffset } = this.refs.card;
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300) && this.pages > 0) {
                this.filterProducts();
                this.setState({ moreData: false })
            }
        }, 0);
    }

    //USED THIS FUNCTION TO APPEND THE ADS COMPONENT TO THE LIST OF ITEMS
    showAds(i) {
        if (((i + 1) % this.limit) === 0) {
            return (
                <Ads />
            );
        }
    }


    renderProduct(product) {
        return (
            product.map((items, i) =>
                <div className="cover" id={i} key={i}>
                    <div className="container_card">
                        <div className="cover_face" style={{fontSize: items.size}}>
                            <div>{items.face}</div>
                        </div>
                        <div style={{ paddingTop: 5 }}>
                            <div className="date0">
                                <div>
                                    <b>Size</b>: <span>{items.size}</span>
                                    <br />
                                    <b>Price</b>: <span>${items.price}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="date1">Added Date: {relativeTime(items.date)}</span>
                        </div>
                    </div>
                    <br />
                    <div >
                        {this.showAds(i)}
                    </div>
                </div>
            )
        );
    }
    render() {
        return (
            <Container ref="card">
                                    {/* PASSING THE FUNCTION AS A PROPS TO THE SORTPRODUCT COMPONENT AND ALSO BINDING IT. */}
                                <SortProduct handlesorting = {this.handleSort.bind(this)} />
                                <div className="prod_wrapper">
                                    {
                                        this.state.scrolling ? <div><Loader /></div> : this.renderProduct(this.state.newProducts)
                                    }
                                </div>
                                {
                                    this.state.moreData && this.state.newProducts.length > 0 ? <div><Loader /></div> : null
                                }
                                {
                                    this.state.endScroll && this.state.newProducts.length > 0 ? <p><h3 className="the_end">--- end of catalogue ---</h3></p> : null
                                }
            </Container >
        );
    }
}