import {
  Component,
  computed,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';
import { capitalizeString } from '../../../utils/string/capitalize.util';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
@Component({
  selector: 'app-table',
  imports: [AsyncPipe, NgIf, SpinnerComponent, NgTemplateOutlet],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> {
  childObsData$ = input.required<
    Observable<{
      obsData: T[];
      isLoading: boolean;
      errorMsg: string | null;
    }>
  >();
  rowTemplate = contentChild.required<TemplateRef<any>>('rowTemplate');

  tableHeaderName = input.required<string[]>();
  capitalizedHeadName = computed(() => {
    return this.tableHeaderName().map((name) => capitalizeString(name));
  });

  jobList$ = computed(() => this.childObsData$());
}
