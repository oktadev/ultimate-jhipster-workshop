import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBlog } from 'app/shared/model/blog.model';
import { BlogService } from './blog.service';
import { BlogDeleteDialogComponent } from './blog-delete-dialog.component';

@Component({
  selector: 'jhi-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit, OnDestroy {
  blogs: IBlog[];
  eventSubscriber: Subscription;

  constructor(protected blogService: BlogService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.blogService.query().subscribe((res: HttpResponse<IBlog[]>) => {
      this.blogs = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInBlogs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBlog) {
    return item.id;
  }

  registerChangeInBlogs() {
    this.eventSubscriber = this.eventManager.subscribe('blogListModification', () => this.loadAll());
  }

  delete(blog: IBlog) {
    const modalRef = this.modalService.open(BlogDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.blog = blog;
  }
}
