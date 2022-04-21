//Edit product
let editForm = document.querySelector("#editForm");
const sendPr = (e) => {
	if (e) e.preventDefault();
	let idPr = document.querySelector("#idPr").value;
	let timestampPr = new Date();
	let titlePr = document.querySelector("#titlePr").value;
	let descriptionPr = document.querySelector("#descriptionPr").value;
	let codePr = document.querySelector("#codePr").value;
	let thumbnailPr = document.querySelector("#thumbnailPr").value;
	let pricePr = document.querySelector("#pricePr").value;
	let stockPr = document.querySelector("#stockPr").value;

	location.assign("http://localhost:8080/home");
	return fetch("/api/products/" + idPr, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},

		body: JSON.stringify({
			id: idPr,
			timestamp: timestampPr,
			title: titlePr,
			description: descriptionPr,
			code: codePr,
			thumbnail: thumbnailPr,
			price: pricePr,
			stock: stockPr,
		}),
	});
};
if (editForm) {
	editForm.addEventListener("submit", sendPr);
}

//Delete product
const sendId = (id) => {
	location.assign("http://localhost:8080/home");
	return fetch("/api/products/" + id, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

// Add Product to cart
const addToCart = async (userId, productId) => {
	await fetch("/api/cart/" + userId + "/products", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id_newProd: productId,
		}),
	});
	location.assign(`http://localhost:8080/api/cart/${userId}/products`);
};

// Delete Product to cart
const deleteToCart = async (userId, productId) => {
	await fetch(`/api/cart/${userId}/products/${productId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id_newProd: productId,
		}),
	});
	location.reload();
};

//Empty Cart
const emptyCart = async (cartId) => {
	await fetch(`/api/cart/${cartId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			products: [],
		}),
	});
	location.reload();
};

// Make an Order
const makeOrder = async (userId, cartId) => {
	await fetch(`/api/order/${userId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			cartId,
		}),
	});
	location.assign("http://localhost:8080/home");
};
