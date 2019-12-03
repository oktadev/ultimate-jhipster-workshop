import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blog } from 'app/shared/model/blog.model';
import { BlogService } from './blog.service';
import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail.component';
import { BlogUpdateComponent } from './blog-update.component';
import { IBlog } from 'app/shared/model/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogResolve implements Resolve<IBlog> {
  constructor(private service: BlogService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBlog> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((blog: HttpResponse<Blog>) => blog.body));
    }
    return of(new Blog());
  }
}

export const blogRoute: Routes = [
  {
    path: '',
    component: BlogComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.blog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BlogDetailComponent,
    resolve: {
      blog: BlogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.blog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BlogUpdateComponent,
    resolve: {
      blog: BlogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.blog.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BlogUpdateComponent,
    resolve: {
      blog: BlogResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.blog.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
