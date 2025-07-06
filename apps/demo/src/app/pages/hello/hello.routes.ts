import type { Routes } from '@angular/router';

import { PatientFormComponent } from '../../components/patient-form/patient-form.component';
import { PatientViewComponent } from '../../components/patient-view/patient-view.component';
import { PatientRoutes } from '../../shared/constants/routes.constants';
import { HelloComponent } from './hello.component';

export const helloRoutes: Routes = [
  {
    path: '',
    component: HelloComponent,
    children: [
      {
        path: `${PatientRoutes.Base}/${PatientRoutes.Add}`,
        component: PatientFormComponent,
      },
      {
        path: `${PatientRoutes.Base}/${PatientRoutes.PatientIdParam}/${PatientRoutes.View}`,
        component: PatientViewComponent,
      },
      {
        path: `${PatientRoutes.Base}/${PatientRoutes.PatientIdParam}/${PatientRoutes.Edit}`,
        component: PatientFormComponent,
      },
    ],
  },
];
