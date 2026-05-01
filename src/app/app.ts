import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { NavElementOption } from '../models/nav-element';
import { EditorComponent } from '../components/editor/editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, EditorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public static undo(): void {
    console.log('undo');
  }

  public static redo(): void {
    console.log('redo');
  }

  public static selectStyleOption(option: NavElementOption): void {
    console.log('Selected option:', option);
  }

  public static bold(): void {
    console.log('bold');
  }

  public static italic(): void {
    console.log('italic');
  }

  public static insertLink(): void {
    console.log('insert link');
  }

  public static insertImage(): void {
    console.log('insert image');
  }

  public static insertChecklist(): void {
    console.log('insert checklist');
  }

  public static insertBulletedList(): void {
    console.log('insert bulleted list');
  }

  public static insertNumberedList(): void {
    console.log('insert numbered list');
  }

  public static decreaseIndent(): void {
    console.log('decrease indent');
  }

  public static increaseIndent(): void {
    console.log('increase indent');
  }
}
