import { useEffect } from "react";
import Navigation from "./Navigation";
import { useState } from "react";
import { Product } from "../Interface/interface";
import './Home.css';
import './Smartphone.css';
import { useFormik } from 'formik';
import { Propss } from "../Interface/interface";
import * as Yup from 'yup';
import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogActions,
    DialogContent,
    Button,
} from "@fluentui/react-components";
import * as React from "react";
import {
    Combobox,
    Option,
    useId,
} from "@fluentui/react-components";
import type { ComboboxProps } from "@fluentui/react-components";
import axios from "axios";
import {
    Card,
    CardFooter,
    CardHeader,
    CardPreview,
} from "@fluentui/react-components";
import {
    makeStyles,
    Body1,
    Caption1,
    shorthands,
} from "@fluentui/react-components";
import { FontSizes } from "@fluentui/react";
const useStyles = makeStyles({
    card: {
        ...shorthands.margin("auto"),
        width: "720px",
        maxWidth: "100%",
        marginBottom: "20px",
        marginTop: "10px"
    },
});
const useStyless = makeStyles({
    root: {
        // Stack the label above the field with a gap
        display: "grid",
        gridTemplateRows: "repeat(1fr)",
        justifyItems: "start",
        ...shorthands.gap("2px"),
        maxWidth: "400px",
        color: "yellow",

    },
});

export const Home: React.FC<Propss> = ({ pageSize }) => {
    const token = localStorage.getItem("token");
    const [mycategory, setCategory] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const comboId = useId("combo-multi");
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
    const [value, setValue] = React.useState("");
    const styless = useStyless();
    const onSelect: ComboboxProps["onOptionSelect"] = (event, data) => {
        debugger;
        setSelectedOptions(data.selectedOptions);
        formik.setFieldValue("category", data.selectedOptions);
        setValue("");
    };
    const onFocus = () => {
        setValue("");
    };
    const onBlur = () => {
        setValue(selectedOptions.join(", "));
    };
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(event);
        setValue(event.target.value);
    };
    const styles = useStyles();
    const [mproducts, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const visibleData = mproducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(mproducts.length / pageSize);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null | undefined>(null);
    const openEditModal = (id: number) => {
        const productToEdit = mproducts.find((product) => product.id === id);
        setEditingProduct(productToEdit);
        setIsEditModalOpen(true);
     
    };
    const fetchcategory = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/products/categories', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            debugger;
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = response.data;
            setCategory(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchcategory();
    }, [])

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: 0,
            discountPercentage: 0,
            rating: 0,
            stock: 0,
            brand: '',
            category: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            price: Yup.number().required('Required'),
            discountPercentage: Yup.number().required('Required'),
            rating: Yup.number().required('Required'),
            stock: Yup.number().required('Required'),
            brand: Yup.string().required('Required'),
            category: Yup.array()
                .of(Yup.string().required('Required'))
                .required('Category is required'),

        }),
        onSubmit: async (values) => {
            debugger;
            try {
                const response = await axios.post(
                    'https://dummyjson.com/products/add',
                    values,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setProducts((prevProducts) => [...prevProducts, response.data]);
            } catch (error) {
                console.error('Error creating product:', error);
            }
        },
    });
    const formikk = useFormik({
        initialValues: {
            id: 0,
            title: '',
            description: '',
            price: 0,
            discountPercentage: 0,
            rating: 0,
            stock: 0,
            brand: '',
            category: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            price: Yup.number().required('Required'),
            discountPercentage: Yup.number().required('Required'),
            rating: Yup.number().required('Required'),
            stock: Yup.number().required('Required'),
            brand: Yup.string().required('Required'),
            category: Yup.string().required('Required'),
        }),


        onSubmit: async (values) => {
            const { id } = values;

            try {
                const response = await axios.put(
                    `https://dummyjson.com/products/${id}`,
                    {
                        title: values.title,
                        description: values.description,
                        price: values.price,
                        discountPercentage: values.discountPercentage,
                        rating: values.rating,
                        stock: values.stock,
                        brand: values.brand,
                        category: values.category,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                setProducts((prevProducts) => {
                    return prevProducts.map((product) =>
                        product.id === id ? response.data : product
                    );
                });
            } catch (error) {
                console.error('Error updating product:', error);
            }
        },
    });

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const fetchData = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            debugger;
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = response.data;
            const products = data.products;
            console.log("yes");
            const filteredProducts = products.filter((product: Product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.price.toString().includes(searchQuery.toLowerCase()) ||
                product.discountPercentage.toString().includes(searchQuery.toLowerCase()) ||
                product.rating.toString().includes(searchQuery.toLowerCase()) ||
                product.stock.toString().includes(searchQuery.toLowerCase())
            );
            setProducts(filteredProducts);
            // setProducts(products);       
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [searchQuery]);

    function setproduct(id: number) {

        const productToEdit: Product | undefined = mproducts.find((product) => product.id === id);

        formikk.setFieldValue("title", productToEdit?.title);
        formikk.setFieldValue("description", productToEdit?.description);
        formikk.setFieldValue("price", productToEdit?.price);
        formikk.setFieldValue("discountPercentage", productToEdit?.discountPercentage);
        formikk.setFieldValue("stock", productToEdit?.stock);
        formikk.setFieldValue("brand", productToEdit?.brand);
        formikk.setFieldValue("category", productToEdit?.category);
        formikk.setFieldValue("id", productToEdit?.id);
        formikk.setFieldValue("rating", productToEdit?.rating);


        console.log("id is", id);

    }
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    return (
        <div className="container1">

            <div className="card">
                <Dialog  >
                    <DialogTrigger disableButtonEnhancement>
                        <Button style={{ marginLeft: '250px', backgroundColor: 'lightpink', minHeight: '50px' }}>Add Product</Button>
                    </DialogTrigger>
                    <DialogSurface className="dialog">
                        <DialogBody className="dialog">

                            <DialogContent className="dialog">
                                <div className='login-container'>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="title">
                                            <label>
                                                Title
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formik.values.title}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </label>
                                            {formik.touched.title && formik.errors.title && (
                                                <div className="error-message">{formik.errors.title}</div>
                                            )}
                                        </div>
                                        <div className="Description">
                                            <label>
                                                Description
                                                <input
                                                    type="text"
                                                    name="description"
                                                    value={formik.values.description}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </label>
                                            {formik.touched.description && formik.errors.description && (
                                                <div className="error-message">{formik.errors.description}</div>
                                            )}
                                        </div>
                                        <div className="price">
                                            <label>
                                                Price
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={formik.values.price}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </label>
                                            {formik.touched.price && formik.errors.price && (
                                                <div className="error-message">{formik.errors.price}</div>
                                            )}
                                        </div>
                                        <div className="discountPercentage">
                                            <label>
                                                Discount Percentage
                                                <input
                                                    type="number"
                                                    name="discountPercentage"
                                                    value={formik.values.discountPercentage}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </label>
                                            {formik.touched.discountPercentage && formik.errors.discountPercentage && (
                                                <div className="error-message">{formik.errors.discountPercentage}</div>
                                            )}
                                        </div>
                                        <div className="rating">
                                            <label>
                                                Rating
                                                <input
                                                    type="number"
                                                    name="rating"
                                                    value={formik.values.rating}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </label>
                                            {formik.touched.rating && formik.errors.rating && (
                                                <div className="error-message">{formik.errors.rating}</div>
                                            )}
                                        </div>
                                        <div className="stock">
                                            <label>
                                                Stock
                                                <input
                                                    type="number"
                                                    name="stock"
                                                    value={formik.values.stock}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </label>
                                            {formik.touched.stock && formik.errors.stock && (
                                                <div className="error-message">{formik.errors.stock}</div>
                                            )}
                                        </div>
                                        <div className="brand">
                                            <label>
                                                Brand
                                                <input
                                                    type="text"
                                                    name="brand"
                                                    value={formik.values.brand}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                            </label>
                                            {formik.touched.brand && formik.errors.brand && (
                                                <div className="error-message">{formik.errors.brand}</div>
                                            )}
                                        </div>
                                        <div className={styless.root}>
                                            <label id={comboId}>Categories</label>
                                            <Combobox
                                                aria-labelledby={comboId}
                                                multiselect={true}
                                                placeholder="Select one or more Categories"
                                                value={formik.values.category}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                onFocus={onFocus}
                                                name="category"
                                                onOptionSelect={onSelect}

                                            >
                                                <div className="options">
                                                    {mycategory.map((option) => (
                                                        <Option key={option}>{option}</Option>
                                                    ))}
                                                </div>

                                            </Combobox>
                                        </div>
                                        <div>

                                        </div>
                                        <DialogTrigger disableButtonEnhancement>
                                            <button type="submit" className='button'>Add Product</button>
                                        </DialogTrigger>
                                    </form>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <DialogTrigger disableButtonEnhancement>
                                    <Button appearance="secondary">Close</Button>
                                </DialogTrigger>
                            </DialogActions>
                        </DialogBody>
                    </DialogSurface>
                </Dialog>
                {visibleData?.map((product: Product) => (
                    <Card key={product.id} className={styles.card}>
                        <CardHeader
                            header={
                                <Body1>
                                    <Dialog  >
                                        <DialogTrigger disableButtonEnhancement>
                                            <button className='mybtton' onClick={() => setproduct(product.id)}>Edit</button>
                                        </DialogTrigger>
                                        <DialogSurface className="dialog">
                                            <DialogBody className="dialog">

                                                <DialogContent className="dialog">
                                                    <div className='login-container'>
                                                        <form onSubmit={formikk.handleSubmit}>
                                                            {/* <div className="id">
                                            <label>
                                              id
                                                <input
                                                    type="number"
                                                    name="id"
                                                    value={formikk.values.id}
                                                    onChange={formikk.handleChange}
                                                    onBlur={formikk.handleBlur}
                                                />
                                            </label>
                                            {formikk.touched.id && formikk.errors.id && (
                                                <div className="error-message">{formikk.errors.id}</div>
                                            )}
                                        </div> */}

                                                            <div className="title">
                                                                <label>
                                                                    Title
                                                                    <input
                                                                        type="text"
                                                                        name="title"
                                                                        value={formikk.values.title}
                                                                        onChange={formikk.handleChange}
                                                                        onBlur={formikk.handleBlur}
                                                                    />
                                                                </label>
                                                                {formikk.touched.title && formikk.errors.title && (
                                                                    <div className="error-message">{formikk.errors.title}</div>
                                                                )}
                                                            </div>
                                                            <div className="Description">
                                                                <label>
                                                                    Description
                                                                    <input
                                                                        type="text"
                                                                        name="description"
                                                                        value={formikk.values.description}
                                                                        onChange={formikk.handleChange}
                                                                        onBlur={formikk.handleBlur}

                                                                    />
                                                                </label>
                                                                {formikk.touched.description && formikk.errors.description && (
                                                                    <div className="error-message">{formikk.errors.description}</div>
                                                                )}
                                                            </div>
                                                            <div className="price">
                                                                <label>
                                                                    Price
                                                                    <input
                                                                        type="number"
                                                                        name="price"
                                                                        value={formikk.values.price}
                                                                        onChange={formikk.handleChange}
                                                                        onBlur={formikk.handleBlur}
                                                                    />
                                                                </label>
                                                                {formikk.touched.price && formikk.errors.price && (
                                                                    <div className="error-message">{formikk.errors.price}</div>
                                                                )}
                                                            </div>
                                                            <div className="discountPercentage">
                                                                <label>
                                                                    Discount Percentage
                                                                    <input
                                                                        type="number"
                                                                        name="discountPercentage"
                                                                        value={formikk.values.discountPercentage}
                                                                        onChange={formikk.handleChange}
                                                                        onBlur={formikk.handleBlur}
                                                                        readOnly
                                                                    />
                                                                </label>
                                                                {formikk.touched.discountPercentage && formikk.errors.discountPercentage && (
                                                                    <div className="error-message">{formikk.errors.discountPercentage}</div>
                                                                )}
                                                            </div>
                                                            <div className="rating">
                                                                <label>
                                                                    Rating
                                                                    <input
                                                                        type="number"
                                                                        name="rating"
                                                                        value={formikk.values.rating}
                                                                        onChange={formikk.handleChange}
                                                                        onBlur={formikk.handleBlur}
                                                                        readOnly
                                                                    />
                                                                </label>
                                                                {formikk.touched.rating && formikk.errors.rating && (
                                                                    <div className="error-message">{formikk.errors.rating}</div>
                                                                )}
                                                            </div>
                                                            <div className="stock">
                                                                <label>
                                                                    Stock
                                                                    <input
                                                                        type="number"
                                                                        name="stock"
                                                                        value={formikk.values.stock}
                                                                        onChange={formikk.handleChange}
                                                                        onBlur={formikk.handleBlur}
                                                                        readOnly
                                                                    />
                                                                </label>
                                                                {formikk.touched.stock && formikk.errors.stock && (
                                                                    <div className="error-message">{formikk.errors.stock}</div>
                                                                )}
                                                            </div>
                                                            <div className="brand">
                                                                <label>
                                                                    Brand
                                                                    <input
                                                                        type="text"
                                                                        name="brand"
                                                                        value={formikk.values.brand}
                                                                        onChange={formikk.handleChange}
                                                                        onBlur={formikk.handleBlur}
                                                                        readOnly
                                                                    />
                                                                </label>
                                                                {formikk.touched.brand && formikk.errors.brand && (
                                                                    <div className="error-message">{formikk.errors.brand}</div>
                                                                )}
                                                            </div>
                                                            <div className="Category">
                                                                <label>
                                                                    Category
                                                                    <input
                                                                        type="text"
                                                                        name="category"
                                                                        value={formikk.values.category}
                                                                        onChange={formikk.handleChange}
                                                                        onBlur={formikk.handleBlur}
                                                                    />
                                                                </label>
                                                                {formikk.touched.category && formikk.errors.category && (
                                                                    <div className="error-message">{formikk.errors.category}</div>
                                                                )}
                                                            </div>
                                                            <div>

                                                            </div>
                                                            <DialogTrigger disableButtonEnhancement>
                                                                <button type="submit" className='button'>Edit Product</button>
                                                            </DialogTrigger>
                                                        </form>
                                                    </div>
                                                </DialogContent>
                                                <DialogActions>
                                                    <DialogTrigger disableButtonEnhancement>
                                                        <Button appearance="secondary">Close</Button>
                                                    </DialogTrigger>
                                                </DialogActions>
                                            </DialogBody>
                                        </DialogSurface>
                                    </Dialog>
                                    <b>Brand</b> {product.brand}<br />
                                    <b>Title</b> {product.title}<br />
                                    <b>Price</b> {product.price}<br />
                                    <b>Category</b> {product.category}<br />
                                    <b>Stock</b> {product.stock}<br />
                                    <b>Discount Percentage</b> {product.discountPercentage}<br />
                                    <b>Rating</b> {product.rating}<br />

                                    <br /><img key={product.thumbnail} src={product.thumbnail} alt="Product Picture" />
                                    <br /> {product.title}<br />
                                    {/* <DialogTrigger disableButtonEnhancement>
                                    <button className='mybtton'onClick={()=>setproduct(product.id)}>Edit</button>
                                     </DialogTrigger> */}

                                    <b>Description</b>
                                </Body1>
                            }
                            description={product.description}
                        />
                        <b>Product Images:</b>
                        <CardPreview>
                            {product.id <= 100 ? (
                                <div className="images">
                                    {product.images.map((image: string) => (
                                        <img key={image} src={image} alt="Product Picture" className="images" />
                                    ))}
                                </div>
                            ) : null}
                        </CardPreview>

                        <CardFooter>

                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="pagination-buttons">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
                <div className="search-container">
                    <label>
                        Search:
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </label>
                </div>
            </div>
        </div>
    );

}