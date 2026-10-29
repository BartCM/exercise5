
'use strict';

import { ProductsService } from './classes/products.service';
import type { Product } from './interfaces/models';
import '../styles.css';

const productsService = new ProductsService();

const productsContainer = document.querySelector('#products-container') as HTMLElement;
const productTemplate = document.querySelector('#product-template') as HTMLTemplateElement;
const searchInput = document.querySelector('#search') as HTMLInputElement;

let products: Product[] = [];


const createProductCard = (product: Product): DocumentFragment => {
  const card = productTemplate.content.cloneNode(true) as DocumentFragment;

  const image = card.querySelector('.card-img-top') as HTMLImageElement;
  const title = card.querySelector('.card-title') as HTMLElement;
  const description = card.querySelector('.card-text') as HTMLElement;
  const category = card.querySelector('.category') as HTMLElement;
  const price = card.querySelector('.price') as HTMLElement;
  const deleteButton = card.querySelector('.btn-delete') as HTMLButtonElement;
  const cardElement = card.querySelector('.col') as HTMLElement;

  image.src = product.mainPhoto;
  title.textContent = product.title;
  description.textContent = product.description;
  category.textContent = product.category.name;

  price.textContent = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(product.price);

  deleteButton.addEventListener('click', async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await productsService.delete(product.id);
      cardElement.remove();
      products = products.filter(p => p.id !== product.id);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  });

  return card;
};

const renderProducts = (productsToShow: Product[]): void => {
  productsContainer.replaceChildren();

  productsToShow.forEach(product => {
    productsContainer.append(createProductCard(product));
  });
};


const loadProducts = async (): Promise<void> => {
    try {
        const response = await productsService.getAll();

        products = response?.products ?? [];

        renderProducts(products);

    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};

searchInput.addEventListener('input', () => {
    const search = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
    );

    renderProducts(filteredProducts);
});

loadProducts();
