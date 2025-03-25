import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent  implements OnInit {
  productos: Producto[] = [];
  nuevoProducto: Producto = {
    nombre: '', precio: 0,
    id: 0
  };

  isEditModalOpen: boolean = false;
  editProducto: any = { nombre: '', precio: null};
  productoSeleccionado: Producto | null = { id: 0, nombre: '', precio: 0 };

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos() {
    this.productoService.getAll().subscribe(data => this.productos = data);

  }

  getProducto(id: number) {
    this.productoService.getById(id).subscribe(data => console.log(data));
  }

  addProducto(producto: Producto) {
    this.productoService.create(producto).subscribe(() => this.loadProductos());
  }

  deleteProducto(id: number) {
    this.productoService.delete(id).subscribe(() => this.loadProductos());
  }


  async updateProducto() {
   
    try {
      await this.productoService.update(this.editProducto).toPromise();
      
      this.closeEditModal();
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
   
    } finally {
      this.loadProductos();
    }
  }
  openEditModal(producto: any) {
    console.log('Abrir modal de edición:', producto);
    this.editProducto = { ...producto };
    this.isEditModalOpen = true;
  }
  openEditProductoModal(producto: any) {
    this.editProducto = { ... producto };
    this. isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.editProducto = { nombre: '', precio: 0 };
  }

  selectProducto(producto: Producto) {
    this.productoSeleccionado = producto;
  }



}

