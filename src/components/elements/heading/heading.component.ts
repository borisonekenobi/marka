import { Component, Input } from '@angular/core';
import { InlineComponent } from '../inline/inline.component';
import { NgTemplateOutlet } from '@angular/common';
import { Heading } from '../../../models/block-elements';

@Component({
  selector: 'marka-heading',
  standalone: true,
  imports: [InlineComponent, NgTemplateOutlet],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.css',
})
export class HeadingComponent {
  @Input({ required: true })
  public heading!: Heading;
}
