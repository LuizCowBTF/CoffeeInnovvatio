# CoffeeInnovvatio

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white) ![JSON](https://img.shields.io/badge/JSON-black?style=for-the-badge&logo=JSON%20web%20tokens) ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![ANGULAR](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white) ![RxJs](https://img.shields.io/badge/RxJs-404D59?style=for-the-badge)

## Aplicativo de comércio eletrônico de cafés desenvolvido em Angular na versão 18

### O Coffee Shop Innovvatio é uma aplicativo de comércio eletrônico com carrinho e controle de produtos escolhidos, podendo adicionar e/ou remover itens do carrinho pronto para ser utilizado e preparado para uso com vários formatos de pagamento, tais como PIX, cartões de débito e crédito ou pagamentos a vista em dinheiro na hora da entrega

### É um MVP que tá só começando e ainda tem muitas funcionalidades novas para serem desenvolvidas

### Baseado em curso de formação para atualização profissional chamado “RxJS e Angular" da Loiane Groner em seu site e canal do Youtube

* Conhecer o padrão de Standalone Components
* Entender como utilizar os Standalone Components
* Saber como remover módulos
* Aprender a manipular Standalone APIs
* Otimizar a busca com rotas Standalone
* Realizar Lazy Loading de componentes
* Lidar com a criação de componentes Standalone

## 🛠️ Instalação

```bash
$ npm install
$ npm run start
```

## 🛠️ Como utlizar

* Execute `ng serve -o` para um servidor de desenvolvimento. Navegue até `http://localhost:4200/`.
* O aplicativo será recarregado automaticamente se você alterar algum dos arquivos de origem.

## ⚙️ Andaime de código

* Execute `ng generate component nome-do-componente` para gerar um novo componente.
* Você também pode usar `ng generate directiva|pipe|service|class|guard|interface|enum|module`.

## 🏗️ Build

* Execute `ng build` para construir o projeto.
* Os artefatos de construção serão armazenados no diretório `dist/`.

## 🧪 Executando testes unitários

* Execute `ng test` para executar os testes de unidade via [Karma](https://karma-runner.github.io).

## 🧪 Executando testes ponta a ponta

* Execute `ng e2e` para executar os testes end-to-end através de uma plataforma de sua escolha.
* Para usar este comando, você precisa primeiro adicionar um pacote que implemente recursos de teste ponta a ponta.

## Angular Standalone Components Guide

* Official Docs: [https://angular.io/guide/standalone-components](https://angular.io/guide/standalone-components)

* Migrating to standlone: [https://angular.io/guide/standalone-migration](https://angular.io/guide/standalone-migration)

## Migration steps

This schematic is only available Angular 15.2.0 or later.

Run the schematic with the following command:

```
ng generate @angular/core:standalone
```

Run the migration in the order listed below, verifying that your code builds and runs between each step:

* `ng g @angular/core:standalone` and select "Convert all components, directives and pipes to standalone"
* `ng g @angular/core:standalone` and select "Remove unnecessary NgModule classes"
* `ng g @angular/core:standalone` and select "Bootstrap the project using standalone APIs"

### After the migration

* Find and remove any remaining NgModule declarations: since the "Remove unnecessary NgModules" step cannot remove all modules automatically, you may have to remove the remaining declarations manually.

#### Convert routes to standalone

After the migration, the feature modules created will still exist, as they still have the routing configuration. We can also migrate the routing config to standalone, and this step needs to be done manually, it's not supported by the schematic.

##### Cart Routing Module

Before:

```
// cart-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
```

After:

```
// cart.routes.ts
import { Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';

export const CART_ROUTES: Routes = [
  { path: '', component: CartComponent }
]
```

##### Products Routing Module

Before:

```
// products-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'new', component: ProductFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
```

After:

```
// products.routes.ts
import { Routes } from '@angular/router';

import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsListComponent } from './products-list/products-list.component';


export const CART_ROUTES: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'new', component: ProductFormComponent }
]
```

##### App Routing Module

Before:

```
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'products'
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

After:

```
// app.routes.ts
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'products'
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.routes').then(m => m.PRODUCT_ROUTES)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.routes').then(m => m.CART_ROUTES)
  }
];
```

Remove app-routing.module from `main.ts`

Before:

```
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    provideNoopAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
```

After:

```
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideNoopAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(APP_ROUTES)
  ]
})
```

Now we can safely delete the following files:

- cart-routing.module.ts
- products-routing.module.ts
- app-routing.module.ts

And also delete:

- cart.module.ts
- products.module.ts

#### Lazy loading a standalone component

Any route can lazily load its routed, standalone component by using loadComponent. So instead of creating a CART_ROUTES file, we can lazy load the component directly in the APP_ROUTES and remove the `cart.routes.ts` file:

Before:

```
// app.routes.ts
export const APP_ROUTES: Routes = [
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.routes').then(m => m.CART_ROUTES)
  }
];
```

After:

```
// app.routes.ts
export const APP_ROUTES: Routes = [
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart/cart.component').then(c => c.CartComponent)
  }
];
```

### Inject

Classic DI:

```
constructor(private service: ProductsService, private cartService: CartService) {}
```

After standalone components - new option:

```
private service = inject(ProductsService);
private cartService = inject(CartService);

constructor() {}
```

### Angular Control Flow v17 Guide

```
ng g @angular/core:control-flow
```

```
ng update @angular/cli @angular/core @angular/cdk @angular/material --force
```

### Angular Signals Guide

* Official Docs: [https://angular.io/guide/signals](https://angular.io/guide/signals)

In this project, we're using Observables to notify components of any changes done to the cart.
We can replace Observables in this particular scenario with Signals, given the CartService properties are computed properties.

#### Creating a Writable Signal

For example, we're handling the items in the cart in an private property, and we also have an Observable so we can use RxJS to notify in case there are changes made to this array:

```
private cartItems: CartItem[] = [];
private cartItems$ = new BehaviorSubject<CartItem[]>(this.cartItems);
```

We can simplify this code by making `cartItems` as a Signal and also making a public property:

```
cartItems = signal<CartItem[]>([]);
```

#### Obtaining the value of a Signal

Next, we'll start getting some compilation errors because `cartItems` is no longer an array. We can fix it, by using the getter function:

```
 private cartItems$ = new BehaviorSubject<CartItem[]>(this.cartItems());
```

To retrieve the value of a signal, we simply add () to the signal to access it getter function: `cartItems()`.

#### Setting the value or updating a Signal

To change the value of a writable signal, you can either `set()`` it directly:

```
cartItems.set([])
```

When working with signals that contains objects or are an array, we can use the `mutate()` method to push a new value or modify an existing value:

```
// before
cartItems: CartItem[] = [];
this.cartItems.push({ product, quantity: 1 });

//after
this.cartItems.mutate((items) => items.push({ product, quantity: 1 }));
```

Or we can also use the `update()`` operation to compute a new value from the previous one:

Before:

```
removeProduct(product: Product): void {
  this.cartItems = this.cartItems().filter((p) => p.product.id !== product.id);
}
```

After:

```
removeProduct(product: Product): void {
  this.cartItems.update((items) => items.filter((p) => p.product.id !== product.id));
}
```

#### Replacing an Observable with a Signal

Once we convert an Observable to a Signal, we also need to apply some changes to our templates.

Before:

```
cartItems$: Observable<CartItem[]> = this.cartService.getCartItems();;
```

After:

```
cartItems = this.cartService.cartItems;
```

HTML Before:

```
<div *ngFor="let cartItem of cartItems$ | async">
  <app-cart-item [cartItem]="cartItem"></app-cart-item>
</div>
```

HTML After:

```
<div *ngFor="let cartItem of cartItems()">
  <app-cart-item [cartItem]="cartItem"></app-cart-item>
</div>
```

#### Creating a Computed Signal

A computed signal is a signal that depends on other signal(s) in order to compute its own value.
For example, to count how many items we have in the cart, we need to iterate the cart items array and check how many of each item the user added to cart before we have the total. Up until now, we depended on RxJS operators to be able to provide a value, and signals are perfect for these cases.

Before with RxJS:

```
cartCount$ = this.cartItems$.pipe(
    // calculate total quantity
    map((items: CartItem[]) => {
      return items.reduce((acc, curr) => acc + curr.quantity, 0);
    })
  );
```

After with Signals:

```
cartCount = computed(() => this.cartItems().reduce((acc, curr) => acc + curr.quantity, 0));
```

So whenever there is a change in the cartItems, the cartCount will be updated automatically as well.

We can still use alias variables in Angular templates to make it easier to reference the value within the HTML:

```
<span class="notification-label" *ngIf="cartCount() as count">{{
  count > 0 ? count : ""
}}</span>
```

Let's see how we can simply the cart totals with Signals instead of Observables:

Before:

```
cartSubTotal$ = this.cartItems$.pipe(
  map((items: CartItem[]) =>
    items.reduce((acc, curr) => acc + (curr.quantity * curr.product.price), 0))
);

cartTax$ = this.cartSubTotal$.pipe(
  // calculate tax of 8% on top of the subtotal
  map((subTotal) => subTotal * 0.08)
);

cartTotal$ = combineLatest([
  this.cartSubTotal$,
  this.cartTax$
]).pipe(map(([subTotal, tax]) => subTotal + tax));
```

After:

```
cartSubTotal = computed(() => this.cartItems().reduce((acc, curr) => acc + (curr.quantity * curr.product.price), 0));

cartTax = computed(() => this.cartSubTotal() * 0.08);

cartTotal = computed(() => this.cartSubTotal() + this.cartTax());
```
