import React, { Component } from 'react';
import { Col, Row, Card } from 'react-bootstrap';

function SortProduct(props) {
    console.log("------props------", props)
    return (
        <div>
            <Row>
                <Col xs={12} md={6} >
                    <div className="sort_product">
                        <h4>
                            EXPLORE POPULAR ASCII FACES
                    </h4>
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <select
                            style={{
                                width: 210,
                                height: 35
                            }}
                            className="form-control"
                            onChange={props.handlesorting}
                            name="sort"
                        >
                            <option>-- sort data --</option>
                            <option value="price">price</option>
                            <option value="size">size</option>
                            <option value="id">id</option>
                        </select>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default SortProduct;