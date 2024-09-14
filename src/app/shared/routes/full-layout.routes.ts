import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
    {
        path: 'dashboard',
         canActivate: [AuthGuard],
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    
    {
        path: 'user-management',
        canActivate: [AuthGuard],
        loadChildren: () => import('../../user-management/user-managment.module').then(m => m.UserManagementModule)

    },
    {
        path: 'case-law',
        loadChildren: () => import('../../case-law/case-law.module').then(m => m.CaseLawModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'categories',
        loadChildren: () => import('../../categories/categories.component.module').then(m => m.CategoriesModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'counsellors',
        loadChildren: () => import('../../counsellors/counsellors.module').then(m => m.CounsellorsModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'glossary',
        loadChildren: () => import('../../glossary/glossary.module').then(m => m.GlossaryModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'family-lawyers',
        loadChildren: () => import('../../family-lawyers/family-lawyer.module').then(m => m.FamilyLawyerModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'imams',
        loadChildren: () => import('../../imams/imams.module').then(m => m.ImamsModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'lawyers',
        loadChildren: () => import('../../lawyers/lawyers.module').then(m => m.LawyersModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'case-law',
        loadChildren: () => import('../../case-law/case-law.module').then(m => m.CaseLawModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'courts',
        loadChildren: () => import('../../courts/courts.module').then(m => m.CourtsModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'venues',
        loadChildren: () => import('../../venues/venues.module').then(m => m.VenuesModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'admin-users',
        loadChildren: () => import('../../admin-users/admin-users.module').then(m => m.AdminUsersModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'components',
        loadChildren: () => import('../../components/components.module').then(m => m.ComponentsModule)
    },
    {
        path: 'form',
        loadChildren: () => import('../../form/form.module').then(m => m.FormModule)
    },
    {
        path: 'user-profile',
        loadChildren: () => import('../../user-profile/user-profile.module').then(m => m.UserProfileModule)

    },
   {
        path: 'guest',
        loadChildren: () => import('../../guest/guest.module').then(m => m.GuestModule)
    },

    {
        path: 'marriage-officers',
        loadChildren: () => import('../../marriage-officers/marriage-officers.module').then(m => m.MarriageOfficersModule)
    }
];