import React from 'react';
import {
    Container,
    Row,
    FormControl,
    Button,
    ListGroup,
    Carousel,
    Col,
    InputGroup,
    Card
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
        this.handleScroll = this.handleScroll.bind(this);
        this.pages = 0;
        this.limit = 20;
        this.pageEnd = this.limit;
    }
    componentDidMount() {
        // var date = new Date();
        // console.log(date)
        this.fetchProduct(`${API_URL}/products`);
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    fetchProduct(url) {
        axios.get(url).then(response => {
            this.setState({
                scrolling: false,
                products: response.data
            })
            this.filterProducts();
        })
    }
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
    handleScroll() {
        setTimeout(() => {
            this.setState({ moreData: true, endScroll: false })
            let { clientHeight, scrollHeight, offsetHeight, pageYOffset } = this.refs.card;
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300) && this.pages > 0) {
                this.filterProducts();
                this.setState({ moreData: false })
            }
        }, 0);
    }
    showAds(i) {
        if (((i + 1) % this.limit) === 0) {
            // return React.createElement("div", {},
            //     React.createElement("input", { type: "text", value: "And here is a child" })
            // )
            return (
                <Ads />
            );
        }
    }
    productView(product) {
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
                                <SortProduct handlesorting = {this.handleSort.bind(this)} />
                                <div className="prod_wrapper">
                                    {
                                        this.state.scrolling ? <div><Loader /></div> : this.productView(this.state.newProducts)
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