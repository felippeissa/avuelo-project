import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
// dashboard
const EcommerceDashboard = React.lazy(() => import('../pages/dashboards/Ecommerce'));
const CRMDashboard = React.lazy(() => import('../pages/dashboards/CRM'));
const AnalyticsDashboard = React.lazy(() => import('../pages/dashboards/Analytics'));
const ProjectDashboard = React.lazy(() => import('../pages/dashboards/Project'));
// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
const Projects = React.lazy(() => import('../pages/apps/Projects/'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Projects/Detail/'));
const ProjectGannt = React.lazy(() => import('../pages/apps/Projects/Gantt/'));
const ProjectForm = React.lazy(() => import('../pages/apps/Projects/ProjectForm'));
// - ecommece pages
const EcommerceProducts = React.lazy(() => import('../pages/apps/Ecommerce/Products'));
const ProductDetails = React.lazy(() => import('../pages/apps/Ecommerce/ProductDetails'));
const Orders = React.lazy(() => import('../pages/apps/Ecommerce/Orders'));
const OrderDetails = React.lazy(() => import('../pages/apps/Ecommerce/OrderDetails'));
const Customers = React.lazy(() => import('../pages/apps/Ecommerce/Customers'));
const Cart = React.lazy(() => import('../pages/apps/Ecommerce/Cart'));
const Checkout = React.lazy(() => import('../pages/apps/Ecommerce/Checkout/'));
const Sellers = React.lazy(() => import('../pages/apps/Ecommerce/Sellers'));
// chat
const ChatApp = React.lazy(() => import('../pages/apps/Chat/'));
// social
const SocialFeed = React.lazy(() => import('../pages/apps/SocialFeed/'));
// tasks
const TaskList = React.lazy(() => import('../pages/apps/Tasks/List/'));
const Kanban = React.lazy(() => import('../pages/apps/Tasks/Board/'));

// - email
const Inbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));

// pages
const Starter = React.lazy(() => import('../pages/Starter'));
const Profile = React.lazy(() => import('../pages/profile'));
const ErrorPageNotFound = React.lazy(() => import('../pages/error/PageNotFound'));
const ServerError = React.lazy(() => import('../pages/error/ServerError'));

// - other
const Invoice = React.lazy(() => import('../pages/other/Invoice'));
const FAQ = React.lazy(() => import('../pages/other/FAQ'));
const Pricing = React.lazy(() => import('../pages/other/Pricing'));
const Timeline = React.lazy(() => import('../pages/other/Timeline'));

// uikit
const Accordions = React.lazy(() => import('../pages/uikit/Accordions'));
const Alerts = React.lazy(() => import('../pages/uikit/Alerts'));
const Badges = React.lazy(() => import('../pages/uikit/Badges'));
const Buttons = React.lazy(() => import('../pages/uikit/Buttons'));
const Cards = React.lazy(() => import('../pages/uikit/Cards'));
const Carousel = React.lazy(() => import('../pages/uikit/Carousel'));
const Dropdowns = React.lazy(() => import('../pages/uikit/Dropdowns'));
const ListGroups = React.lazy(() => import('../pages/uikit/ListGroups'));
const Modals = React.lazy(() => import('../pages/uikit/Modals'));
const Tabs = React.lazy(() => import('../pages/uikit/Tabs'));
const Toasts = React.lazy(() => import('../pages/uikit/Toasts'));
const Grid = React.lazy(() => import('../pages/uikit/Grid'));
const Popovers = React.lazy(() => import('../pages/uikit/Popovers'));
const Progress = React.lazy(() => import('../pages/uikit/Progress'));
const Ribbons = React.lazy(() => import('../pages/uikit/Ribbons'));
const Tooltips = React.lazy(() => import('../pages/uikit/Tooltips'));
const Typography = React.lazy(() => import('../pages/uikit/Typography'));
const Spinners = React.lazy(() => import('../pages/uikit/Spinners'));
const Widgets = React.lazy(() => import('../pages/uikit/Widgets'));
const DragDrop = React.lazy(() => import('../pages/uikit/DragDrop'));
const RangeSliders = React.lazy(() => import('../pages/uikit/RangeSliders'));
const Ratings = React.lazy(() => import('../pages/uikit/Ratings'));

const MDIIcons = React.lazy(() => import('../pages/uikit/MDIIcons'));
const Dripicons = React.lazy(() => import('../pages/uikit/Dripicons'));
const Unicons = React.lazy(() => import('../pages/uikit/Unicons'));
// forms
const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
const Editors = React.lazy(() => import('../pages/forms/Editors'));
// charts
const ApexChart = React.lazy(() => import('../pages/charts/Apex'));
const BriteChart = React.lazy(() => import('../pages/charts/Brite'));
const ChartJs = React.lazy(() => import('../pages/charts/ChartJs'));
// tables
const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));
// maps
const GoogleMaps = React.lazy(() => import('../pages/GoogleMaps'));

// handle auth and authorization

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            const loggedInUser = getLoggedInUser();
            // check if route is restricted by role
            if (roles && roles.indexOf(loggedInUser.role) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/' }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard/ecommerce" />,
    route: PrivateRoute,
};

// dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboards',
    icon: 'uil-home-alt',
    header: 'Navigation',
    children: [
        {
            path: '/dashboard/analytics',
            name: 'Analytics',
            component: AnalyticsDashboard,
            route: PrivateRoute,
        },
        {
            path: '/dashboard/crm',
            name: 'CRM',
            component: CRMDashboard,
            route: PrivateRoute,
        },
        {
            path: '/dashboard/ecommerce',
            name: 'Ecommerce',
            badge: {
                variant: 'success',
                text: '3',
            },
            component: EcommerceDashboard,
            route: PrivateRoute,
        },
        {
            path: '/dashboard/project',
            name: 'Project',
            component: ProjectDashboard,
            route: PrivateRoute,
        },
    ],
};

const calendarAppRoutes = {
    path: '/apps/calendar',
    name: 'Calendar',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-calender',
    component: CalendarApp,
    header: 'Apps',
};

const chatAppRoutes = {
    path: '/apps/chat',
    name: 'Chat',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-comments-alt',
    component: ChatApp,
};

const ecommerceAppRoutes = {
    path: '/apps/ecommerce',
    name: 'eCommerce',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-store',
    children: [
        {
            path: '/apps/ecommerce/products',
            name: 'Products',
            component: EcommerceProducts,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/details',
            name: 'Product Details',
            component: ProductDetails,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/orders',
            name: 'Orders',
            component: Orders,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/order/details',
            name: 'Order Details',
            component: OrderDetails,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/customers',
            name: 'Customers',
            component: Customers,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/shopping-cart',
            name: 'Shopping Cart',
            component: Cart,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/checkout',
            name: 'Checkout',
            component: Checkout,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/sellers',
            name: 'Sellers',
            component: Sellers,
            route: PrivateRoute,
        },
    ],
};

const emailAppRoutes = {
    path: '/apps/email',
    name: 'Email',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-envelope',
    children: [
        {
            path: '/apps/email/inbox',
            name: 'Inbox',
            component: Inbox,
            route: PrivateRoute,
        },
        {
            path: '/apps/email/details',
            name: 'Email Details',
            component: EmailDetail,
            route: PrivateRoute,
        },
    ],
};

const projectAppRoutes = {
    path: '/apps/projects',
    name: 'Projects',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-briefcase',

    children: [
        {
            path: '/apps/projects/list',
            name: 'List',
            component: Projects,
            route: PrivateRoute,
        },
        {
            path: '/apps/projects/:id/details',
            name: 'Detail',
            component: ProjectDetail,
            route: PrivateRoute,
        },
        {
            path: '/apps/projects/gantt',
            name: 'Gantt',
            component: ProjectGannt,
            route: PrivateRoute,
        },
        {
            path: '/apps/projects/new',
            name: 'Create Project',
            component: ProjectForm,
            route: PrivateRoute,
        },
    ],
};

const socialAppRoutes = {
    path: '/apps/social',
    name: 'Social Feed',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-rss',
    component: SocialFeed,
};

const taskAppRoutes = {
    path: '/apps/tasks',
    name: 'Tasks',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-clipboard-alt',
    children: [
        {
            path: '/apps/tasks/list',
            name: 'Task List',
            component: TaskList,
            route: PrivateRoute,
        },
        {
            path: '/apps/tasks/kanban',
            name: 'Kanban',
            component: Kanban,
            route: PrivateRoute,
        },
    ],
};

const appRoutes = [
    calendarAppRoutes,
    chatAppRoutes,
    ecommerceAppRoutes,
    emailAppRoutes,
    projectAppRoutes,
    socialAppRoutes,
    taskAppRoutes,
];

// pages
const pageRoutes = {
    path: '/pages',
    name: 'Pages',
    icon: 'uil-copy-alt',
    header: 'Custom',
    children: [
        {
            path: '/pages/starter',
            name: 'Starter',
            component: Starter,
            route: PrivateRoute,
        },
        {
            path: '/pages/profile',
            name: 'Profile',
            component: Profile,
            route: PrivateRoute,
        },
        {
            path: '/pages/invoice',
            name: 'Invoice',
            component: Invoice,
            route: PrivateRoute,
        },
        {
            path: '/pages/faq',
            name: 'FAQ',
            component: FAQ,
            route: PrivateRoute,
        },
        {
            path: '/pages/pricing',
            name: 'Pricing',
            component: Pricing,
            route: PrivateRoute,
        },
        {
            path: '/pages/error-404',
            name: 'Error - 404',
            component: ErrorPageNotFound,
            route: PrivateRoute,
        },
        {
            path: '/pages/error-500',
            name: 'Error - 500',
            component: ServerError,
            route: PrivateRoute,
        },
        {
            path: '/pages/timeline',
            name: 'Timeline',
            component: Timeline,
            route: PrivateRoute,
        },
    ],
};

// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: Register,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
            component: ForgetPassword,
            route: Route,
        },
    ],
};

// ui
const uiRoutes = {
    path: '/ui',
    name: 'Components',
    icon: 'uil-package',
    header: 'UI Elements',
    children: [
        {
            path: '/ui/base',
            name: 'Base UI',
            children: [
                {
                    path: '/ui/accordions',
                    name: 'Accordions',
                    component: Accordions,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/alerts',
                    name: 'Alerts',
                    component: Alerts,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/badges',
                    name: 'Badges',
                    component: Badges,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/buttons',
                    name: 'Buttons',
                    component: Buttons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/cards',
                    name: 'Cards',
                    component: Cards,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/carousel',
                    name: 'Carousel',
                    component: Carousel,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/dropdowns',
                    name: 'Dropdowns',
                    component: Dropdowns,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/grid',
                    name: 'Grid',
                    component: Grid,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/listgroups',
                    name: 'List Groups',
                    component: ListGroups,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/modals',
                    name: 'Modals',
                    component: Modals,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/popovers',
                    name: 'Popovers',
                    component: Popovers,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/progress',
                    name: 'Progress',
                    component: Progress,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/ribbons',
                    name: 'Ribbons',
                    component: Ribbons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/spinners',
                    name: 'Spinners',
                    component: Spinners,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/tabs',
                    name: 'Tabs',
                    component: Tabs,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/toasts',
                    name: 'Toasts',
                    component: Toasts,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/tooltips',
                    name: 'Tooltips',
                    component: Tooltips,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/typography',
                    name: 'Typography',
                    component: Typography,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/widgets',
                    name: 'Widgets',
                    component: Widgets,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/extended',
            name: 'Extended UI',
            children: [
                {
                    path: '/ui/dragdrop',
                    name: 'Drag and Drop',
                    component: DragDrop,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/rangesliders',
                    name: 'Range Sliders',
                    component: RangeSliders,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/ratings',
                    name: 'Ratings',
                    component: Ratings,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/icons',
            name: 'Icons',
            children: [
                {
                    path: '/ui/icons/dripicons',
                    name: 'Dripicons',
                    component: Dripicons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/icons/mdi',
                    name: 'Material Design',
                    component: MDIIcons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/icons/unicons',
                    name: 'Unicons',
                    component: Unicons,
                    route: Unicons,
                },
            ],
        },
        {
            path: '/ui/forms',
            name: 'Forms',
            children: [
                {
                    path: '/ui/forms/basic',
                    name: 'Basic Elements',
                    component: BasicForms,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/advanced',
                    name: 'Form Advanced',
                    component: FormAdvanced,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/validation',
                    name: 'Form Validation',
                    component: FormValidation,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/wizard',
                    name: 'Form Wizard',
                    component: FormWizard,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/upload',
                    name: 'File Upload',
                    component: FileUpload,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/editors',
                    name: 'Editors',
                    component: Editors,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/charts',
            name: 'Charts',
            children: [
                {
                    path: '/ui/charts/apex',
                    name: 'Apex',
                    component: ApexChart,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/charts/brite',
                    name: 'Brite',
                    component: BriteChart,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/charts/chartjs',
                    name: 'Chartjs',
                    component: ChartJs,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/tables',
            name: 'Tables',
            children: [
                {
                    path: '/ui/tables/basic',
                    name: 'Basic',
                    component: BasicTables,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/tables/advanced',
                    name: 'Advanced',
                    component: AdvancedTables,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/googlemaps',
            name: 'Google Maps',
            component: GoogleMaps,
            route: PrivateRoute,
        },
    ],
};

// flatten the list of all nested routes
const flattenRoutes = routes => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach(item => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [rootRoute, dashboardRoutes, ...appRoutes, authRoutes, pageRoutes, uiRoutes];

const authProtectedRoutes = [dashboardRoutes, ...appRoutes, pageRoutes, uiRoutes];

const allFlattenRoutes = flattenRoutes(allRoutes);

export { allRoutes, authProtectedRoutes, allFlattenRoutes };
