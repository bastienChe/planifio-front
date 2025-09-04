// confirm-dialog.component.ts
import { Component, Input } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
  <div class="modal fade" id="confirmModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal" (click)="cancel()">Annuler</button>
          <button class="btn btn-danger" (click)="confirm()">Continuer</button>
        </div>
      </div>
    </div>
  </div>
  `
})
export class ConfirmDialogComponent {
  @Input() title = 'Attention';
  @Input() message = 'Voulez-vous vraiment continuer ?';
  onConfirm: (() => void) | null = null;
  onCancel: (() => void) | null = null;

  confirm() {
    if (this.onConfirm) this.onConfirm();
    this.closeModal();
  }

  cancel() {
    if (this.onCancel) this.onCancel();
    this.closeModal();
  }

  private closeModal() {
    const modalEl = document.getElementById('confirmModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.hide();
    }
  }

  open(onConfirm: () => void, onCancel?: () => void) {
    this.onConfirm = onConfirm;
    this.onCancel = onCancel || null;
    const modalEl = document.getElementById('confirmModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
}
