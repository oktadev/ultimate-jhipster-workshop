import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog/blog.module').then(m => m.BlogBlogModule)
      },
      {
        path: 'post',
        loadChildren: () => import('./blog/post/post.module').then(m => m.BlogPostModule)
      },
      {
        path: 'tag',
        loadChildren: () => import('./blog/tag/tag.module').then(m => m.BlogTagModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./store/product/product.module').then(m => m.StoreProductModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GatewayEntityModule {}
