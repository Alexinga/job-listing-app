import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  testArr = signal<string[]>([]);
  initialNumber = signal<number>(0);
  // values that depend on other signal values
  doubleComputed = computed(() => this.initialNumber() * 2);

  constructor() {
    // to run code whenever a signal changes
    // allows you to define code that depends on signals
    // and angular will re-execute this function and whenever a signal changes the effect will catch it
    effect(() => console.log(this.initialNumber()));
  }

  inc() {
    // this.initialNumber.update((oldValue) => oldValue + 1);
    this.initialNumber.set(this.initialNumber() + 1);
    this.testArr.update((oldValue) => [...oldValue, 'Increment']);
  }
  dec() {
    this.initialNumber.set(this.initialNumber() - 1);
    this.testArr.update((oldValue) => [...oldValue, 'Decrement']);
  }
}
