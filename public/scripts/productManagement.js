const deleteProductBtnEls = document.querySelectorAll('.product-item  button');

async function deleteProduct(event) {
    const btnElement = event.target;
    const prodId = btnElement.dataset.productid;
    const csrfToken = btnElement.dataset.csrf;

    // also require domain locator localhost: 3000 before /admin
    const response = await fetch('/admin/products/' +  prodId + '?_csrf=' + csrfToken, {
        // request configuration
        method: 'DELETE'
    });

    if(!response.ok) {
        alert('Something went Wrong');
        return;
    }
    // btn element is inside 2 div-s and an article for that we require 3 parentElement traversal and then a list item where the products are placed. So total four parentElement DOM traversal.
    btnElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteProductBtnElement of deleteProductBtnEls) {
    deleteProductBtnElement.addEventListener('click', deleteProduct);
}