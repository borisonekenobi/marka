import { Component, forwardRef, HostListener, Input } from '@angular/core';
import { Link } from '@marka-editor/markdown';
import { InlineComponent } from '../inline/inline.component';

@Component({
  selector: 'marka-link',
  standalone: true,
  imports: [forwardRef((): typeof InlineComponent => InlineComponent)],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css',
})
export class LinkComponent {
  @Input({ required: true })
  public link!: Link;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!event.ctrlKey || event.metaKey) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    window.open(this.link.href, '_blank');
  }
}
