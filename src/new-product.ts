
'use strict';

import { CategoriesService } from './classes/categories.service';
import { ProductsService } from './classes/products.service';
import type { ProductPost } from './interfaces/models';
import '../styles.css';

const imageInput = document.querySelector('#image') as HTMLInputElement;
const imgPreview = document.querySelector('#imgPreview') as HTMLImageElement;
const form = document.querySelector('#newProduct') as HTMLFormElement;

const categoriesService = new CategoriesService();
const productsService = new ProductsService();

const categorySelect = document.querySelector('#category') as HTMLSelectElement;



const loadCategories = async (): Promise<void> => {
  try {
    const response = await categoriesService.getAll();

    response?.categories.forEach(category => {
      const option = document.createElement('option');

      option.value = String(category.id);
      option.textContent = category.name;

      categorySelect.append(option);
    });
  } catch (error) {
    console.error('Error al cargar las categorías:', error);
  }
};


//funcion para previsualizar una imagen si no supera los 200kb

imageInput.addEventListener('change', () => {
  const file = imageInput.files?.[0];

  if (!file) return;

  imgPreview.src = '';
  imgPreview.classList.add('d-none');

  imageInput.setCustomValidity('');
  imageInput.classList.remove('is-invalid');

  if (file.size > 200 * 1024) {
    imageInput.setCustomValidity('Invalid image size');
    imageInput.classList.add('is-invalid');
    return;
  }

  const reader = new FileReader();

  reader.addEventListener('load', () => {
    if (typeof reader.result === 'string') {
      imgPreview.src = reader.result;
      imgPreview.classList.remove('d-none');
    }
  });

  reader.readAsDataURL(file);
});


form.addEventListener('submit', async (event): Promise<void> => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  const formData = new FormData(form);

  const product: ProductPost = {
    title: String(formData.get('title')),
    description: String(formData.get('description')),
    price: Number(formData.get('price')),
    category: Number(formData.get('category')),
    mainPhoto: imgPreview.src
  };

  console.log('Producto enviado:', product);

  try {
    const response = await productsService.post(product);
    console.log('Producto creado:', response);

    location.assign('index.html');
  } catch (error) {
    console.error('Error al crear el producto:', error);
    alert('Error creating product');
  }
});

loadCategories(); //carga las categorias en el formulario