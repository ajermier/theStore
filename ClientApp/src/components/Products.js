import React, { Component } from 'react';

export class Products extends Component {
    displayName = Products.name

    constructor(props) {
        super(props);
        this.state = { products: [], loading: true };
        this.getAllProducts();

        this.renderProductsTable = this.renderProductsTable.bind(this);
    }

    getAllProducts() {
        fetch('api/Product/GetAllProducts')
            .then(response => response.json())
            .then(data => {
                data.map(d => d.editing = false);
                this.setState({ products: data, loading: false });
            });
    }

    renderProductsTable = (products) => {
        const handleCreateNewRowClick = () => {
            var newProducts = this.state.products;
            var newProduct = {
                id: 'newProduct',
                name: '',
                description: '',
                quantity: '',
                dateAdded: '',
                isNewProduct: true,
                editing: true
            };
            newProducts.push(newProduct);
            this.setState({ products: newProducts });
        };

        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th />
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Date Added</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((x, index) => {
                        const displayDate = x.dateAdded ? new Date(x.dateAdded).toLocaleString() : '';

                        const handleDeleteClick = () => {
                            this.setState({ loading: true });
                            fetch(`api/Product/DeleteProduct/${x.id}`, {
                                method: 'delete',
                            })
                                .then(response => response.json())
                                .then(data => {
                                    const newProducts = this.state.products.filter(x => x.id !== data.id);
                                    this.setState({ products: newProducts, loading: false });
                                });
                        };

                        const handleSaveClick = () => {
                            const request = {
                                id: x.id,
                                name: x.name,
                                description: x.description,
                                quantity: x.quantity
                            }
                            this.setState({ loading: true });
                            fetch('api/Product/UpdateProduct', {
                                method: 'post',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(request)
                            })
                                .then(response => response.json())
                                .then(data => {
                                    const newProducts = this.state.products;
                                    newProducts[index] = data;
                                    newProducts[index].editing = false;
                                    this.setState({ products: newProducts, loading: false })
                                });
                        };

                        const handleAddClick = () => {
                            const request = {
                                name: x.name,
                                description: x.description,
                                quantity: x.quantity
                            }
                            this.setState({ loading: true });
                            fetch('api/Product/CreateProduct', {
                                method: 'post',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(request)
                            })
                                .then(response => response.json())
                                .then(data => {
                                    const newProducts = this.state.products;
                                    newProducts[index] = data;
                                    newProducts[index].editing = false;
                                    this.setState({ products: newProducts, loading: false })
                                });
                        };

                        const handleEditClick = () => {
                            var newProducts = this.state.products;
                            newProducts[index].editing = true;
                            this.setState({ products: newProducts });
                        };

                        const handleCancelAddClick = () => {
                            var newProducts = this.state.products;
                            newProducts.splice(index, 1);
                            this.setState({ products: newProducts });                            
                        }

                        const handleCancelEditClick = () => {
                            var newProducts = this.state.products;
                            newProducts[index].editing = false;
                            this.setState({ products: newProducts });
                        }

                        const handleNameOnChange = (e) => {
                            var newProducts = this.state.products;
                            newProducts[index].name = e.target.value;
                            this.setState({ products: newProducts });
                        }

                        const handleDescriptionOnChange = (e) => {
                            var newProducts = this.state.products;
                            newProducts[index].description = e.target.value;
                            this.setState({ products: newProducts });
                        }

                        const handleQuantityOnChange = (e) => {
                            var newProducts = this.state.products;
                            newProducts[index].quantity = e.target.value;
                            this.setState({ products: newProducts });
                        }

                        return (
                            <tr key={index}>
                                <td>
                                    {!x.isNewProduct && <button onClick={handleDeleteClick}>Delete</button>}
                                    {!x.editing && <button onClick={handleEditClick}>Edit</button>}
                                    {x.editing && !x.isNewProduct && <button onClick={handleSaveClick}>Save</button>}
                                    {x.editing && !x.isNewProduct && <button onClick={handleCancelEditClick}>Cancel</button>}
                                    {x.isNewProduct && <button onClick={handleAddClick}>Save</button>}
                                    {x.isNewProduct && <button onClick={handleCancelAddClick}>Cancel</button>}
                                </td>
                                <td>{x.editing ? <input type="text" name="name" value={x.name} onChange={handleNameOnChange} /> : x.name}</td>
                                <td>{x.editing ? <input type="text" name="description" value={x.description} onChange={handleDescriptionOnChange} /> : x.description}</td>
                                <td>{x.editing ? <input type="number" name="quantity" value={x.quantity} onChange={handleQuantityOnChange} /> : x.quantity}</td>
                                <td>{displayDate}</td>
                            </tr>
                        );
                    }
                    )}
                    <tr>
                        <td>
                            <button onClick={handleCreateNewRowClick}>Add</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    render() {
        const loadingDisplay = this.state.loading ? <p><em>Loading...</em></p> : <p><br/></p>;
        return (
            <div>
                <h1>Products</h1>
                {loadingDisplay}
                {this.state.products && this.renderProductsTable(this.state.products)}
            </div>
        );
    }
}
