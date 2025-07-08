import type { Routes } from '@angular/router';

import { PatientRoutes } from '../../shared/constants/routes.constants';
import { HelloComponent } from './hello.component';

export const helloRoutes: Routes = [
  {
    path: '',
    component: HelloComponent,
    children: [
      {
        path: `${PatientRoutes.Base}/${PatientRoutes.Add}`,
        loadComponent: () =>
          import('../../components/patient-form/patient-form.component').then((m) => m.PatientFormComponent),
      },
      {
        path: `${PatientRoutes.Base}/${PatientRoutes.PatientIdParam}/${PatientRoutes.View}`,
        loadComponent: () =>
          import('../../components/patient-view/patient-view.component').then((m) => m.PatientViewComponent),
      },
      {
        path: `${PatientRoutes.Base}/${PatientRoutes.PatientIdParam}/${PatientRoutes.Edit}`,
        loadComponent: () =>
          import('../../components/patient-form/patient-form.component').then((m) => m.PatientFormComponent),
      },
    ],
  },
];
