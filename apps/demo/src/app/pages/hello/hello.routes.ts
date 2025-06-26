import type { Routes } from '@angular/router';

import { PatientFormComponent } from '../../components/patient-form/patient-form.component';
import { PatientViewComponent } from '../../components/patient-view/patient-view.component';
import { HelloComponent } from './hello.component';

export const helloRoutes: Routes = [
  {
    path: '',
    component: HelloComponent,
    children: [
      {
        path: 'patient/add',
        component: PatientFormComponent,
      },
      {
        path: 'patient/:patientId/view',
        component: PatientViewComponent,
      },
      {
        path: 'patient/:patientId/edit',
        component: PatientFormComponent,
      },
    ],
  },
];
