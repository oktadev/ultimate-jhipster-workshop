import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITag } from 'app/shared/model/tag.model';
import { TagService } from './tag.service';

@Component({
  templateUrl: './tag-delete-dialog.component.html'
})
export class TagDeleteDialogComponent {
  tag: ITag;

  constructor(protected tagService: TagService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tagService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'tagListModification',
        content: 'Deleted an tag'
      });
      this.activeModal.dismiss(true);
    });
  }
}
