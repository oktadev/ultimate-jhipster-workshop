import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITag } from 'app/shared/model/tag.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { TagService } from './tag.service';
import { TagDeleteDialogComponent } from './tag-delete-dialog.component';

@Component({
  selector: 'jhi-tag',
  templateUrl: './tag.component.html'
})
export class TagComponent implements OnInit, OnDestroy {
  tags: ITag[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected tagService: TagService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.tags = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.tagService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ITag[]>) => this.paginateTags(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.tags = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInTags();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITag) {
    return item.id;
  }

  registerChangeInTags() {
    this.eventSubscriber = this.eventManager.subscribe('tagListModification', () => this.reset());
  }

  delete(tag: ITag) {
    const modalRef = this.modalService.open(TagDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tag = tag;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTags(data: ITag[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.tags.push(data[i]);
    }
  }
}
