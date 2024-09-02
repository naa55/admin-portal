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
        path: 'application',
        loadChildren: () => import('../../application/application.module').then(m => m.ApplicationModule)

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
        path: 'contact',
        loadChildren: () => import('../../contact/contact.module').then(m => m.ContactModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'categories',
        loadChildren: () => import('../../categories/categories.component.module').then(m => m.CategoriesModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'councellors',
        loadChildren: () => import('../../councellors/councellors.module').then(m => m.CouncellorsModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'marriage-officers',
        loadChildren: () => import('../../marriage-officers/marriage-officers.module').then(m => m.MarriageOfficersModule),
        canActivate: [AuthGuard]

    },
    {
        path: 'family-lawyers',
        loadChildren: () => import('../../family-lawyers/family-lawyer.module').then(m => m.FamilyLawyerModule),
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
        path: 'widgets',
        loadChildren: () => import('../../widgets/widgets.module').then(m => m.WidgetsModule)

    },
    {
        path: 'ecommerce',
        loadChildren: () => import('../../ecommerce/ecommerce.module').then(m => m.EcommerceModule)

    },
    {
        path: 'admin-users',
        loadChildren: () => import('../../admin-users/admin-users.module').then(m => m.AdminUsersModule)

    },
    {
        path: 'components',
        loadChildren: () => import('../../components/components.module').then(m => m.ComponentsModule)
    },
    {
        path: 'content',
        loadChildren: () => import('../../content/content.module').then(m => m.ContentModule)
    },
    {
        path: 'icons',
        loadChildren: () => import('../../icons/icons.module').then(m => m.IconsModule)
    },
    {
        path: 'form',
        loadChildren: () => import('../../form/form.module').then(m => m.FormModule)
    },
    {
        path: 'table',
        loadChildren: () => import('../../table/table.module').then(m => m.TableModule)

    },
    {
        path: 'user-profile',
        loadChildren: () => import('../../user-profile/user-profile.module').then(m => m.UserProfileModule)

    },
    {
        path: 'faq',
        loadChildren: () => import('../../faq/faq.module').then(m => m.FaqModule)
    },
    {
        path: 'pricing',
        loadChildren: () => import('../../pricing/pricing.module').then(m => m.PricingModule)
    },
    {
        path: 'earnings',
        loadChildren: () => import('../../earnings/earnings.module').then(m => m.EarningsModule)
    },
    {
        path: 'downloads',
        loadChildren: () => import('../../downloads/downloads.module').then(m => m.DownloadsModule)
    },
    {
        path: 'timeline',
        loadChildren: () => import('../../timeline/timeline.module').then(m => m.TimelineModule)
    },
    {
        path: 'charts',
        loadChildren: () => import('../../charts/chart.module').then(m => m.ChartModule)
    },
    {
        path: 'maps',
        loadChildren: () => import('../../maps/maps.module').then(m => m.MapsModule)

    },{
        path: 'guest',
        loadChildren: () => import('../../guest/guest.module').then(m => m.GuestModule)
    }
];