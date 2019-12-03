import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntry } from 'app/shared/model/entry.model';
import { EntryService } from './entry.service';

@Component({
  templateUrl: './entry-delete-dialog.component.html'
})
export class EntryDeleteDialogComponent {
  entry: IEntry;

  constructor(protected entryService: EntryService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.entryService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'entryListModification',
        content: 'Deleted an entry'
      });
      this.activeModal.dismiss(true);
    });
  }
}
