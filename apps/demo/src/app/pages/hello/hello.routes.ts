import type { Routes } from '@angular/router';

import { PatientEditComponent } from '../../components/patient-edit/patient-edit.component';
import { PatientViewComponent } from '../../components/patient-view/patient-view.component';
import { HelloComponent } from './hello.component';

export const helloRoutes: Routes = [
  {
    path: '',
    component: HelloComponent,
    children: [
      {
        path: 'patient/:patientId/view',
        component: PatientViewComponent,
      },
      {
        path: 'patient/:patientId/edit',
        component: PatientEditComponent,
      },
    ],
  },
];
