import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entry } from 'app/shared/model/entry.model';
import { EntryService } from './entry.service';
import { EntryComponent } from './entry.component';
import { EntryDetailComponent } from './entry-detail.component';
import { EntryUpdateComponent } from './entry-update.component';
import { IEntry } from 'app/shared/model/entry.model';

@Injectable({ providedIn: 'root' })
export class EntryResolve implements Resolve<IEntry> {
  constructor(private service: EntryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntry> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((entry: HttpResponse<Entry>) => entry.body));
    }
    return of(new Entry());
  }
}

export const entryRoute: Routes = [
  {
    path: '',
    component: EntryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.entry.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EntryDetailComponent,
    resolve: {
      entry: EntryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.entry.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EntryUpdateComponent,
    resolve: {
      entry: EntryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.entry.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EntryUpdateComponent,
    resolve: {
      entry: EntryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blogApp.entry.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
